<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <div class="search">
        <el-form ref="searchList" label-width="80px">
          <el-form-item label="课程名" style="float: left">
            <el-select v-model="courseName" placeholder="--请选择--">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" round @click="SearchCourse()">查询所有选修此课程的学生成绩</el-button>
        </el-form>
      </div>
      <el-table :data="CourseData" style="width: 100%">
        <el-table-column label="学号" prop="student_no"></el-table-column>
        <el-table-column label="姓名" prop="student_name"></el-table-column>
        <el-table-column label="平时成绩" prop="daily">
          <template slot-scope="scope">
            <el-input v-if="editingPropId == scope.$index" size="small" v-model="scope.row.daily" @change="Edit(scope.$index, scope.row)"></el-input> <span @click="Edit(scope.$index, scope.row)" v-if="editingPropId !== scope.$index" style="width:5vw;">{{scope.row.daily}}</span>
          </template>
        </el-table-column>
        <el-table-column label="考试成绩" prop="grade">
          <template slot-scope="scope">
            <el-input v-if="editingPropId == scope.$index" size="small" v-model="scope.row.grade" @change="Edit(scope.$index, scope.row)"></el-input> <span @click="Edit(scope.$index, scope.row)" v-if="editingPropId !== scope.$index">{{scope.row.grade}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总评成绩" prop="zonghe"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">保存</el-button>
          </template>
         </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'grade',
  data () {
    return {
      SearchCourseID: '',
      courseName: '',
      term: '',
      editingPropId: -1,
      options: [],
      CourseData: []
    }
  },
  mounted () {
    this.GetTerm()
  },
  methods: {
    GetTerm () {
      let formdata = new FormData()
      formdata.append('teacher_no', '0101')
      this.$ajax({
        method: 'POST',
        url: '/Teacher/course',
        data: formdata
      })
        .then(response => {
          console.log(response)
          this.options = response.data.data.course
          this.term = response.data.data.term
        })
    },
    SearchCourse () {
      let formdata = new FormData()
      formdata.append('teacher_no', '0101')
      formdata.append('term', this.term)
      formdata.append('course_name', this.courseName)
      this.$ajax({
        method: 'POST',
        url: '/Teacher/grade',
        data: formdata
      })
        .then(response => {
          console.log(response)
          this.CourseData = response.data.data.CourseData
        })
    },
    Edit (index, row) {
      this.editingPropId = index
    },
    handleEdit (index, row) {
      row.zonghe = 0.5 * row.daily + 0.5 * row.grade
      this.$ajax({
        method: 'GET',
        url: '/Teacher/grade',
        params: { teacher_no: '0101',
          term: this.term,
          course_name: this.courseName,
          student_no: row.student_no,
          daily: row.daily,
          grade: row.grade }
      })
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>

<style lang="stylus">
.course
  width 700px
  margin 0 auto

.search
  width 100%
  margin 0 auto

.grid
  margin 0 auto

</style>

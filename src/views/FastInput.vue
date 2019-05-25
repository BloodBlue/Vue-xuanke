<template>
  <div>
    <el-select v-model="term" placeholder="--请选择学期--" style="margin-top: 5vh;margin-right: 3vw;">
        <el-option v-for="item in Selectlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button @click="GetCourse()">查看</el-button>
    <div v-show="isAvailable" class="notAvailable">
      <i class="el-icon-warning" style="font-size: 100px; font-weight: bold; margin: 0 auto"></i>
      <h1 style="margin: 0 auto">选课时间未到！</h1>
    </div>
    <div v-show="!isAvailable">
      <div class="searchForm">
        <span style="margin-right: 10px; font-size: 13px;">课程号 </span>
        <el-input v-model="SearchCourseID" placeholder="请输入课程号" style="width: 10vw;margin-right: 30px"></el-input>
        <el-button @click="SearchCourse()" style="width: 10vw margin-left: 2vw">查询</el-button>
      </div>
      <el-table :data="courseData" border style="width:700px; margin: 0 auto;">
        <el-table-column prop="course_no" label="课程号" width="100"></el-table-column>
        <el-table-column prop="course_name" label="课程名" width="150"></el-table-column>
        <el-table-column prop="credit" label="学分" width="80"></el-table-column>
        <el-table-column prop="teacher_no" label="教师号" width="100"></el-table-column>
        <el-table-column prop="teacher_name" label="教师名" width="100"></el-table-column>
        <el-table-column prop="now" label="当前人数" width="50"></el-table-column>
        <el-table-column prop="xian" label="限制人数" width="50"></el-table-column>
        <el-table-column fixed="right" label="操作" width="70">
          <template slot-scope="scope">
            <el-button @click="SubmitChoise(scope.row)" type="text" size="medium">选课</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'fastinput',
  data () {
    return {
      isAvailable: false,
      term: '',
      SearchCourseID: '',
      Selectlist: [
        { value: '2012-2013 冬季', label: '2012-2013 冬季' },
        { value: '2012-2013 秋季', label: '2012-2013 秋季' },
        { value: '2013-2014 冬季', label: '2013-2014 冬季' },
        { value: '2013-2014 秋季', label: '2013-2014 秋季' }
      ],
      courseData: []
    }
  },
  methods: {
    GetCourse () {
      let formdata = new FormData()
      formdata.append('term', this.term)
      this.$ajax({
        method: 'POST',
        url: '/Student/course',
        data: formdata
      })
        .then(response => {
          if (response.data.status === 200) {
            var Elective = response.data.data.Elective
            this.courseData = Elective
            this.isAvailable = false
          } else {
            this.isAvailable = true
          }
        })
    },
    SearchCourse () {
      this.$ajax({
        method: 'GET',
        url: '/Student/course',
        params: { course_no: this.SearchCourseID, term: this.term }
      })
        .then(response => {
          var Course = response.data.data.Course
          this.courseData = Course
        })
    },
    SubmitChoise (row) {
      console.log(row.course_no)
      console.log(row.teacher_no)
      let formdata = new FormData()
      formdata.append('course_no', row.course_no)
      formdata.append('term', this.term)
      formdata.append('student_id', '1102')
      formdata.append('teacher_id', row.teacher_no)
      this.$ajax({
        method: 'POST',
        url: '/Student/Elective',
        data: formdata
      })
        .then(response => {
          if (response.data.status === 200) {
            this.$message({
              message: '选课成功！',
              type: 'success'
            })
          } else {
            this.$message(response.data.msg)
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.notAvailable
  margin 0 auto
  width 40vw
  padding-top 10vh

.searchForm
  margin 0 auto
  width 40vw
  padding-top 5vh
  padding-bottom 2vh
</style>

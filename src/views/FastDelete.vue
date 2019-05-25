<template>
  <div>
    <el-select v-model="term" placeholder="--请选择学期--" style="margin-top: 5vh;margin-right: 3vw;">
        <el-option v-for="item in Selectlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button @click="GetCourse()">查看</el-button>
    <div v-show="isAvailable" class="notAvailable">
      <i class="el-icon-warning" style="font-size: 100px; font-weight: bold; margin: 0 auto"></i>
      <h1 style="margin: 0 auto">退课时间错误！</h1>
    </div>
    <div v-show="!isAvailable">
      <el-table :data="courseData" border style="width:600px; margin: 0 auto;">
        <el-table-column prop="course_no" label="课程号" width="100"></el-table-column>
        <el-table-column prop="course_name" label="课程名" width="150"></el-table-column>
        <el-table-column prop="credit" label="学分" width="80"></el-table-column>
        <el-table-column prop="teacher_no" label="教师号" width="100"></el-table-column>
        <el-table-column prop="teacher_name" label="教师名" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="70">
          <template slot-scope="scope">
            <el-button @click="DeleteChoise(scope.row)" type="text" size="medium">退课</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'fastdelete',
  data () {
    return {
      isAvailable: false,
      SearchCourseID: '',
      term: '',
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
      this.$ajax({
        method: 'GET',
        url: '/Student/Delete',
        params: { student_no: '1102', term: this.term }
      })
        .then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.courseData = response.data.data.selected
            this.isAvailable = false
          } else {
            this.isAvailable = true
          }
        })
    },
    DeleteChoise (row) {
      let formdata = new FormData()
      formdata.append('course_no', row.course_no)
      formdata.append('teacher_no', row.teacher_no)
      formdata.append('term', this.term)
      formdata.append('student_no', '1102')
      this.$ajax({
        method: 'POST',
        url: '/Student/Delete',
        data: formdata
      })
        .then(response => {
          if (response.data.data.status === 200) {
            this.$message({
              message: '退课成功！',
              type: 'success'
            })
          } else {
            this.$message(response.data.msg)
          }
        })
      console.log(this.term)
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

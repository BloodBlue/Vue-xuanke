<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <el-table :data="courseData" style="width: 570px; margin: 0 auto" max-height="600" :stripe="true" :border="true">
        <el-table-column prop="CourseId" label="课程号" width="100"></el-table-column>
        <el-table-column prop="CourseName" label="课程名" width="100"></el-table-column>
        <el-table-column prop="credit" label="学分" width="50"></el-table-column>
        <el-table-column prop="xs" label="学时" width="50"></el-table-column>
        <el-table-column prop="TeacherId" label="教师号" width="70"></el-table-column>
        <el-table-column prop="TeacherName" label="教师名" width="100"></el-table-column>
        <el-table-column prop="now" label="当前人数" width="50"></el-table-column>
        <el-table-column prop="xian" label="人数上限" width="50"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'course',
  data () {
    return {
      courseData: [],
      student: localStorage.getItem('user')
    }
  },
  methods: {
    test () {
      this.$ajax({
        method: 'GET',
        url: '/Student/Elective',
        params: { student_id: this.student }
      })
        .then(response => {
          var course = response.data.data.Course
          this.courseData = course
        })
    }
  },
  created () {
    this.test()
  }
}
</script>

<style lang="stylus">
.course
  width 700px
  margin 0 auto

</style>

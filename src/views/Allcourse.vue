<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <div style="width: 800px; margin: 0 auto">
        <el-form ref="searchList" label-width="80px">
          <el-form-item label="课程号" style="float: left">
            <el-input v-model="searchList.courseId" placeholder="请输入课程号" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="课程名" style="float: left">
            <el-input v-model="searchList.courseName" placeholder="请输入课程名" style="width: 200px"></el-input>
          </el-form-item>
          <el-button @click="test()">查询</el-button>
        </el-form>
      </div>
      <el-table :data="CourseData" style="width: 570px; margin: 0 auto" max-height="600" :stripe="true" :border="true">
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
      CourseData: [],
      searchList: [{
        courseId: '',
        courseName: ''
      }]
    }
  },
  methods: {
    test () {
      this.$ajax({
        method: 'GET',
        url: '/Student/Elective',
        params: { student_id: '1102' }
      })
        .then(response => {
          var course = response.data.data.Course
          this.CourseData = course
          console.log(course)
        })
    }
  },
  created: function () {
    this.test()
  }
}
</script>

<style lang="stylus">
.course
  width 700px
  margin 0 auto

</style>

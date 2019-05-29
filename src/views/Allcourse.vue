<template>
  <div style="width:100%">
    <div class="course">
      <div style="width: 800px; margin: 0 auto;">
        <span style="margin-right: 10px; font-size: 13px;">设置当前选课学期 </span>
        <el-select v-model="termChoice" placeholder="--请选择学期--" style="margin-top: 5vh;margin-right: 3vw;">
            <el-option v-for="item in Selectlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        <el-button @click="SetTerm()" style="width: 10vw margin-left: 2vw">设置</el-button>
      </div>
      <div style="width: 800px; margin: 0 auto; margin-bottom: 5vh;">
        <el-form ref="searchList" label-width="80px">
          <span style="margin-right: 10px; font-size: 13px;">选择查询学期 </span>
          <el-select v-model="term" placeholder="--请选择学期--" style="margin-top: 5vh;margin-right: 3vw;">
            <el-option v-for="item in Selectlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button @click="SearchTermCourse()">查询</el-button>
        </el-form>
      </div>
      <el-table :data="CourseData" style="width: 570px; margin: 0 auto" max-height="600" :stripe="true" :border="true">
        <el-table-column prop="course_no" label="课程号" width="100"></el-table-column>
        <el-table-column prop="course_name" label="课程名" width="100"></el-table-column>
        <el-table-column prop="credit" label="学分" width="50"></el-table-column>
        <el-table-column prop="xs" label="学时" width="50"></el-table-column>
        <el-table-column prop="teacher_no" label="教师号" width="70"></el-table-column>
        <el-table-column prop="teacher_name" label="教师名" width="100"></el-table-column>
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
      termChoice: '',
      term: '',
      Selectlist: [
        { value: '2012-2013 冬季', label: '2012-2013 冬季' },
        { value: '2012-2013 秋季', label: '2012-2013 秋季' },
        { value: '2013-2014 冬季', label: '2013-2014 冬季' },
        { value: '2013-2014 秋季', label: '2013-2014 秋季' }
      ]
    }
  },
  methods: {
    AllCourse () {
      this.$ajax({
        method: 'GET',
        url: '/Admin/course'
      })
        .then(response => {
          var course = response.data.data.course
          this.CourseData = course
        })
    },
    SearchTermCourse () {
      let formdata = new FormData()
      formdata.append('term', this.term)
      this.$ajax({
        method: 'POST',
        url: '/Admin/course',
        data: formdata
      })
        .then(response => {
          var course = response.data.data.course
          this.CourseData = course
        })
    },
    SetTerm () {
      this.$ajax({
        method: 'GET',
        url: '/Admin/term',
        params: { term: this.termChoice }
      })
        .then(response => {
          this.$message({
            message: response.data.msg,
            type: 'success'
          })
        })
    }
  },
  created: function () {
    this.AllCourse()
  }
}
</script>

<style lang="stylus">
.course
  width 700px
  margin 0 auto

</style>

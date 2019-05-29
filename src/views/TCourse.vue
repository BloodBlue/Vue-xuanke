<template>
  <div style="width:100%">
    <div class="course">
      <el-table :data="GradeData" class="grid" max-height="250" :stripe="true" :border="true">
        <el-table-column prop="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="course_no" label="课程号" width="100"></el-table-column>
        <el-table-column prop="course_name" label="课程名" width="150"></el-table-column>
        <el-table-column prop="credit" label="学分" width="100"></el-table-column>
      </el-table>
    </div>
    <br/>
    <el-button @click="drawBar()" v-show="isbutton">查看成绩直方图</el-button>
    <div v-show="isshow"><hr/>
    <div id="scoreBar" :style="{width: '400px', height: '300px'}"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tcourse',
  data () {
    return {
      isbutton: true,
      isshow: false,
      teacher: localStorage.getItem('user'),
      GradeData: [],
      CourseName: [],
      Grade: []
    }
  },
  methods: {
    GetData () {
      console.log(this.teacher)
      this.$ajax({
        method: 'GET',
        url: '/Teacher/course',
        params: { teacher_no: this.teacher }
      })
        .then(response => {
          var course = response.data.data.course
          this.GradeData = course
          var Xlabel = []
          var Ylabel = []
          for (var item in course) {
            Xlabel[item] = course[item]['course_name']
            Ylabel[item] = course[item]['grade']
          }
          this.CourseName = Xlabel
          this.Grade = Ylabel
        })
    },
    drawBar () {
      this.isbutton = false
      this.isshow = true
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('scoreBar'))
      // 绘制图表
      myChart.setOption({
        title: { text: '您当前所开设课程的平均成绩分布图' },
        tooltip: { trigger: 'item' },
        xAxis: {
          data: this.CourseName
        },
        yAxis: {},
        series: [{
          name: '成绩',
          type: 'bar',
          data: this.Grade
        }]
      })
    }
  },
  created () {
    this.GetData()
  }
}
</script>

<style lang="stylus">
.course
  width 800px
  margin 7vh auto

.search
  width 630px
  margin 0 auto

.grid
  width 450px
  margin 0 auto

#scoreBar
  margin 0 auto
</style>

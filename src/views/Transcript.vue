<template>
  <div style="width:100%">
    <div class="course">
      <br/>
      <el-table :data="GradeData" class="grid" max-height="250" :stripe="true" :border="true">
        <el-table-column prop="course_no" label="课程号" width="100"></el-table-column>
        <el-table-column prop="course_name" label="课程名" width="130"></el-table-column>
        <el-table-column prop="credit" label="学分" width="100"></el-table-column>
        <el-table-column prop="teacher_name" label="教师名" width="100"></el-table-column>
        <el-table-column prop="grade" label="成绩" width="100"></el-table-column>
      </el-table>
    </div>
    <br/>
    <el-button @click="drawBar()">查看成绩分布图</el-button>
    <div id="scoreBar" :style="{width: '630px', height: '300px'}"></div>
  </div>
</template>

<script>

export default {
  name: 'transcript',
  data () {
    return {
      GradeData: [],
      Xdata: [],
      Ydata: [],
      searchList: [{
        courseId: '',
        courseName: ''
      }]
    }
  },
  mounted () {
    this.test()
  },
  created () {
  },
  methods: {
    test () {
      this.$ajax({
        method: 'GET',
        url: '/Student/Script',
        params: { student_id: '1102' }
      })
        .then(response => {
          var scores = response.data.data.scores
          this.GradeData = scores
          console.log(scores)
          var Xlabel = []
          var Ylabel = []
          for (var item in scores) {
            Xlabel[item] = scores[item]['course_name']
            Ylabel[item] = scores[item]['grade']
          }
          this.Xdata = Xlabel
          this.Ydata = Ylabel
        })
    },
    drawBar () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('scoreBar'))
      // 绘制图表
      myChart.setOption({
        title: { text: '成绩分布图' },
        tooltip: { trigger: 'item' },
        xAxis: {
          data: this.Xdata
        },
        yAxis: {},
        series: [{
          name: '成绩',
          type: 'bar',
          data: this.Ydata
        }]
      })
    }
  }
}
</script>

<style lang="stylus">
.course
  width 800px
  margin 0 auto

.search
  width 530px
  margin 0 auto

.grid
  width 530px
  margin 0 auto

#scoreBar
  margin 0 auto
</style>

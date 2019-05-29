<template>
  <div style="width:100%">
    <div style="width: 755px;margin: 0 auto;">
      <br/>
      <div class="searchForm">
        <span style="margin-right: 10px; font-size: 13px;">学号 </span>
        <el-input v-model="SearchStudentId" placeholder="请输入学号" style="width: 10vw;margin-right: 30px"></el-input>
        <el-button @click="SearchStudent()" style="width: 10vw margin-left: 2vw">查询</el-button>
      </div>
      <el-table :data="StudentData" style="width: 755px">
        <el-table-column prop="student_no" label="学号" width="50"></el-table-column>
        <el-table-column prop="student_name" label="学生名" width="70"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50"></el-table-column>
        <el-table-column prop="birth" label="出生日期" width="170"></el-table-column>
        <el-table-column prop="jiguan" label="籍贯" width="80"></el-table-column>
        <el-table-column prop="phone" label="联系方式" width="135">
          <template slot-scope="scope">
            <el-input v-if="editingPropId == scope.$index" size="small" v-model="scope.row.phone" @change="Edit(scope.$index, scope.row)"></el-input> <span @click="Edit(scope.$index, scope.row)" v-if="editingPropId !== scope.$index">{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="yuan" label="院系" width="100"></el-table-column>
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
  name: 'smanage',
  data () {
    return {
      editingPropId: -1,
      SearchStudentId: '',
      StudentData: []
    }
  },
  created () {
    this.GetStudent()
  },
  methods: {
    GetStudent () {
      this.$ajax({
        method: 'GET',
        url: '/Admin/student'
      })
        .then(response => {
          console.log(response)
          this.StudentData = response.data.data.student
        })
    },
    SearchStudent () {
      if (this.SearchStudentId === '') {
        this.GetStudent()
      } else {
        let formdata = new FormData()
        formdata.append('student_no', this.SearchStudentId)
        this.$ajax({
          method: 'POST',
          url: '/Admin/student',
          data: formdata
        })
          .then(response => {
            if (response.data.status === 200) {
              this.StudentData = response.data.data.student
            } else {
              this.$message(response.data.msg)
              this.StudentData = []
            }
          })
      }
    },
    Edit (index, row) {
      this.editingPropId = index
    },
    handleEdit (index, row) {
      let formdata = new FormData()
      formdata.append('student_no', row.student_no)
      formdata.append('phone', row.phone)
      this.$ajax({
        method: 'POST',
        url: '/Admin/change',
        data: formdata
      })
        .then(response => {
          if (response.data.status === 200) {
            this.$message({
              message: response.data.msg,
              type: 'success'
            })
          } else {
            this.$message('数据库修改失败！')
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.course
  width 700px
  margin 0 auto
.searchForm
  margin 0 auto
  width 40vw
  padding-top 5vh
  padding-bottom 2vh
.search
  width 100%
  margin 0 auto
.grid
  margin 0 auto
</style>

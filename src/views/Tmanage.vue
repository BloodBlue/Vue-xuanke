<template>
  <div style="width:100%">
    <div style="width 750px;margin 0 auto;">
      <br/>
      <div class="searchForm">
        <el-select v-model="Department" placeholder="--请选择院系--" style="margin-top: 5vh;margin-right: 3vw;">
          <el-option v-for="item in Selectlist" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button @click="SearchTeacher()" style="width: 10vw margin-left: 2vw">查询</el-button>
      </div>
      <el-table :data="TeacherData" style="width: 750px; margin:0 auto;">
        <el-table-column prop="teacher_no" label="工号" width="80"></el-table-column>
        <el-table-column prop="teacher_name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50"></el-table-column>
        <el-table-column prop="birth" label="出生日期" width="170"></el-table-column>
        <el-table-column prop="xl" label="学历" width="80"></el-table-column>
        <el-table-column prop="salary" label="工资" width="100">
          <template slot-scope="scope">
            <el-input v-if="editingPropId == scope.$index" size="small" v-model="scope.row.salary" @change="Edit(scope.$index, scope.row)"></el-input> <span @click="Edit(scope.$index, scope.row)" v-if="editingPropId !== scope.$index" style="width:5vw;">{{scope.row.salary}}</span>
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
  name: 'tmanage',
  data () {
    return {
      Department: '',
      Selectlist: [
        { value: '计算机学院', label: '计算机学院' },
        { value: '通讯学院', label: '通讯学院' },
        { value: '材料学院', label: '材料学院' }
      ],
      TeacherData: [],
      editingPropId: -1
    }
  },
  created () {
    this.GetTeacher()
  },
  methods: {
    GetTeacher () {
      this.$ajax({
        method: 'GET',
        url: '/Admin/teacher'
      })
        .then(response => {
          var teacher = response.data.data.teacher
          this.TeacherData = teacher
        })
    },
    SearchTeacher () {
      let formdata = new FormData()
      formdata.append('Department', this.Department)
      this.$ajax({
        method: 'POST',
        url: '/Admin/teacher',
        data: formdata
      })
        .then(response => {
          var teacher = response.data.data.teacher
          this.TeacherData = teacher
        })
    },
    Edit (index, row) {
      this.editingPropId = index
    },
    handleEdit (index, row) {
      this.$ajax({
        method: 'GET',
        url: '/Admin/change',
        params: { teacher_no: row.teacher_no, salary: row.salary }
      })
        .then(response => {
          if (response.data.status) {
            this.$message({
              message: response.data.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: '数据库修改失败！'
            })
          }
        })
    }
  }
}
</script>

<style lang="stylus">
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

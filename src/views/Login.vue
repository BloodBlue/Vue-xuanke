<template>
  <div class="background">
    <div class="container">
      <div style="height:25%"></div>
      <div class="loginFormContainer">
        <h1 style="color: ">教务系统</h1>
        <el-form ref="serchList" class="loginForm" fix="center">
          <el-form-item prop="authority">
            <i class="iconfont" style="font-size: 28px;">&#xe62e; </i>
            <el-select v-model="loginForm.authority" style="width:200px">
              <el-option v-for="item in authorityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="userName">
            <i class="iconfont" style="font-size: 28px;">&#xe62e; </i>
            <el-input v-model="loginForm.userName" placeholder="请输入用户名" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <i class="iconfont" style="font-size: 28px; font-weight: bold;">&#xe665; </i>
            <el-input v-model="loginForm.passWord" placeholder="请输入密码" style="width:200px"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="login()" style="width:130px" type="primary" plain>
          <i class="iconfont" style="font-size: 18px;">&#xe622; </i>登 录 系 统 </el-button>
        <br/>
        <br/>
      </div>
      <p style="margin-top:25vh; color: gray">Copyright© Xw AllRightReserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        authority: '学生',
        userName: '',
        passWord: ''
      },
      authorityOptions: [
        { value: '学生', label: '学生' },
        { value: '教工', label: '教工' },
        { value: '管理员', label: '管理员' }
      ]
    }
  },
  methods: {
    login () {
      console.log('要登录了！')
      localStorage.setItem('isLogin', true)
    }
  }
}
</script>

<style  lang="stylus">
.background
  background url(../assets/img/background.jpg) no-repeat
  background-size 100%

.container
  width 100vw
  height 100vh

.loginFormContainer
  margin 0 auto
  width 30%
  border 2px solid #a1a1a1
  border-radius 25px
  background-color rgba(236, 240, 241, 0.7)

.loginForm
  margin 0 auto
</style>

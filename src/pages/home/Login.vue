<template>
  <div class="contain">
    <y-top title="首页"></y-top>
    <div class="login_b_1">
        <p>投资者教育平台   教您炒股    为您诊股</p>
        <div class="logo">
          <a href=""><img src='../../assets/yf_logo.png'/></a>
        </div>
    </div>
    <div class="login_b_2"></div>
    <p class="login_remin">请先登录一富财经再进行大赛报名</p>
    <el-form ref="form" :model="form" class="form" label-width="40px">
      <el-form-item label="账户">
        <el-input class="myInput"  v-model="form.name" placeholder="手机/用户名/邮箱" ></el-input>
      </el-form-item>
      <div class="warn"><p v-show="warnname"><i class="el-icon-circle-close"></i>请输入正确账号</p></div>
      <el-form-item label="密码">
        <el-input type="password" class="myInput" v-model="form.pwd" placeholder="请输入密码" ></el-input>
      </el-form-item>
      <div class="warn"><p v-show="warnpwd"><i class="el-icon-circle-close"></i>密码不能为空</p></div>      
      <el-button class="submit"   type="danger" @click="onSubmit">登录</el-button>  
    </el-form>
    <el-row class='my_href'>
        <el-col :span="15"><div class="go_reg">没有账号？<a @click="go('/home/reg')" >快去注册</a></div></el-col>
        <el-col :span="9"><div class="go_phone"><a @click="go('/home/phonelogin')">手机快捷登录</a></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      warnname: false,
      warnpwd: false,
      errormessage: '',
      form: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      const data = { name: this.form.name, pwd: this.form.pwd }
      // 验证
      if (!data.name) {
        this.warnname = true
        return false
      }
      if (!data.pwd) {
        this.warnpwd = true
        return false
      }
      if (data.name && data.pwd) {
        // 登陆
        this.login({
          username: data.name,
          password: data.pwd,
          type: 0
        }).then(token => {
          // 登陆结束业务
          this.go(this.returnPath || '/')
        })
      } else {
        this.$alert('请输入正确的账号和密码', '出错啦', { customClass: 'my' })
      }
    },
    go: function (path) {
      this.$router.push({ path: path })
    },
    ...mapActions([
      'login'
    ])
  },
  computed: {
    ...mapState({
      returnPath: state => state.user.returnPath
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contain {background: #FFFFFF; height: 100%;}
  .top{background: #1c1c20; color: #fff; font-size: 0.3rem;}
  .el-icon-more { }
  .grid-content{text-align: center; min-height: 0.88rem; line-height: 0.88rem;}
  .margR{ margin-right:0.14rem ;} 
  .login_b_1{width: 100%; height: 3.47rem; background: url(../../assets/login_b_1.jpg) no-repeat; background-size: cover; overflow:hidden ;}
  .login_b_1 p {font-size: 0.2rem; text-align: center; color: #fef7f5; margin-top:0.97rem ;}
  .login_b_1 .logo,.login_b_1 .logo a { width: 3.5rem; height: 1.29rem;margin: 0 auto; display: block; margin-top: 0.26rem;}
  .login_b_1 .logo a img{ width: 3.5rem; }
  .login_b_2 {width: 100%; height: 0.45rem;background: url(../../assets/login_b_2.jpg) no-repeat ; background-size: cover; }
  .login_remin {text-align: center; color:#a46d2d ; font-size: 0.26rem;}
  .form {margin-top: 0.94rem; padding:0 0.5rem; font-size: 0.28rem;}
  .submit { border-radius: 0; width: 100%; height: 0.88rem; margin-top: 0.64rem; background: #e43a3d; font-size: 0.38rem;}
  .my_href {height: 1.08rem; line-height: 1.08rem; font-size: 0.28rem; padding: 0 0.5rem; margin-bottom: 1.5rem;}
  /*.my_href .go_reg {text-indent: 0.5rem; }*/
  .my_href .go_reg a,.my_href .go_phone a { text-decoration: none ; color: #0c94ff; }
  .my_href .go_phone a {display: block; text-align: right;}
  
  .el-form-item { margin-bottom: 0;}
  .form .warn { line-height: 0.4rem ; height: 0.4rem; padding-left: 0.8rem; }
  .form .warn  p { color: #e63339;}
</style>


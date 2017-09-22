<template>
  <div class="contain">
    <y-top title="用户登录"></y-top>
    <div class="success_b_1"></div>
    <div class="success_b_2"></div>
    <div class="success_text">注册成功</div>
    <div class="success_title">
      <p class="p1">欢迎来到一富财经大家庭，请妥善</p>
      <p>保管您的用户名及密码，以防丢失</p>
    </div>
    <div class="button_wrap">
      <!--<el-button class="submit"   type="danger" @click="onSubmit">下一步</el-button>-->
      <el-button class="submit"   type="danger" @click="go">进入实盘大赛</el-button>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'loginsuccess',
  methods: {
    go: function () {
      this.$router.push(this.returnPath || '/')
    }
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
  .contain {background: #FFFFFF;}
  p {padding: 0; margin: 0;}
  .top{background: #1c1c20; color: #fff; font-size: 0.3rem;}
  .top a {display: block; color: #fff; text-decoration: none;}
  .grid-content{text-align: center; min-height: 0.88rem; line-height: 0.88rem;}
  .margR{ margin-right:0.14rem ;}
  .success_b_1 { height: 1.84rem; background: url(../../assets/success_b-1.jpg) no-repeat; background-size: cover; }
  .success_b_2 {height: 0.62rem; background: url(../../assets/success_b-2.jpg) no-repeat; background-size: cover;}
  .success_text {height: 1.02rem; background: ;text-align: center;line-height: 1.02rem; font-size: 0.46rem; color: #ff6f30;}
  .success_title {height: 1.56rem;padding-top: 0.18rem;}
  .success_title p { line-height: 0.44rem;height: 0.44rem; text-align: center; font-size: 0.28rem; color: #626868;}
  .success_title .p1 {margin-top: 0.18rem;}
  .button_wrap {padding: 0rem 0.48rem; height: 7.22rem;}
  .button_wrap .submit {border-radius: 0; width: 100%; height: 0.88rem; background: #e43a3d; font-size: 0.38rem;}
  .button_wrap .my_href {margin-top: 0.4rem; font-size: 0.24rem;}
  .my_href .title {line-height: 0.36rem; }
  .my_href .title a { text-decoration: none ; color: #0c94ff; } 
</style>

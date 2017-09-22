<template>
  <div class="contain">
    <y-top title="手机快捷登录"></y-top>
		<el-row class="remined">
		  <el-col :span="24" class="remined-div" v-show="!flag"><div class="remined_inner"><i class="el-icon-circle-close remined_icon"></i>手机号格式有误</div></el-col>
		</el-row>
		<el-row class="remined_next">
		  <el-col :span="24"><div class="remined_inner">我们将发验证码到您的手机</div></el-col>
		</el-row>
		<el-row class="phone">
		  <el-col :span="24"><div class="phone_inner">手机号 <input v-model='phone' class="phoneNum" placeholder="请输入您的手机号" /></div></el-col>
		</el-row>
		<div class="button_wrap">
			<el-button class="submit"   type="danger" @click="onSubmit">下一步</el-button>
			<!--<el-button class="submit"   type="danger" @click="go('/home/phoneloginfalse')">下一步</el-button>-->
			<el-row class='my_href'>
				  <el-col :span="24"><div class="title">若你输入的手机号未注册，将会进入注册流程。注册即视为同意<a @click="go('/home/reg')" >一富财经服务条款</a></div></el-col>
			</el-row>
		</div>
  </div>
</template>

<script>
import Api from '@/utils/Api'
import Auth from '@/utils/Auth'

export default {
  name: 'phonelogin',
  data () {
    return {
      msg: 'reg',
      flag: true,
      phone: ''
    }
  },
  methods: {
    onSubmit () {
      this.flag = /^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)
      if (!this.flag) {
        return false
      }
      const api = new Api('base')
      api.get('User/Verify', { type: 'phone', value: this.phone }).then(resp => {
        if (resp.used === '1') {
          console.log('112233')
          // 发送短信验证码，并到下一步
          Auth.sendSms(this.phone).then(resp => {
            this.go('/home/phonelogintrue')
          })
        } else {
//        此处判断出手机号未进行注册跳转注册页面
          this.go('/home/phoneloginfalse')
        }
      })
    },
    go: function (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.top{background: #1c1c20; color: #fff; font-size: 0.3rem;}
	.top a {display: block; color: #fff; text-decoration: none;}
	.grid-content{text-align: center; min-height: 0.88rem; line-height: 0.88rem;}
	.margR{ margin-right:0.14rem ;}
	.remined { height: 0.48rem;}
	.remined .remined-div { background: #F9FAC7;}
	.remined .remined_inner { height: 0.39rem; padding-top: 0.09rem; padding-left: 0.45rem; font-size: 0.24rem; color: red;}
	.remined .remined_icon{margin-right: 0.1rem;}
	.remined_next {height: 0.62rem; line-height: 0.62rem; background: #f3f4f6; padding-left: 0.49rem; font-size: 0.24rem; color: #666666;}
	.phone{ line-height: 1.04rem; border: 1px solid #efeef3;}
	.phone_inner {text-indent: 0.49rem; font-size: 0.32rem; color: #666;}
	.phone_inner .phoneNum {border: none; outline: none;}
	.button_wrap {padding: 0.57rem 0.48rem; height: 9.12rem; background: #f5f6f7;}
	.button_wrap .submit {border-radius: 0; width: 100%; height: 0.88rem;  background: #e43a3d; font-size: 0.38rem;}
	.button_wrap .my_href {margin-top: 0.4rem; font-size: 0.24rem;}
	.my_href .title {line-height: 0.36rem;}
	.my_href .title a { text-decoration: none ; color: #0c94ff; }
	
</style>

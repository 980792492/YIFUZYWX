<template>
  <div class="contain">
    <y-top title="手机快捷登录"></y-top>
		<el-row class="remined">
		  <el-col :span="24"><div v-show="flag" class="remined_inner"><i class="el-icon-circle-close remined_icon"></i>{{message}}</div></el-col>
		</el-row>
		<el-row class="phone">
		  <el-col :span="24"><div class="phone_inner">手机号 <input v-model='phone' class="phoneNum" placeholder="请输入您的手机号" /></div></el-col>
		</el-row>
		<el-row class="verify">
		  <el-col :span="15">
		  	<div  class="phone_inner">验证码 <input class="verify_num" v-model='code'  placeholder="请输入验证码" /></div>	
		  </el-col>
		  <el-col :span="9">
        <send-sms-button :phone='phone'></send-sms-button>
		  </el-col>
		</el-row>
		<div class="button_wrap">
			<el-button class="submit"   type="danger" @click="onSubmit">登录</el-button>
		</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SendSmsButton from '@/components/SendSmsButton'
import Auth from '@/utils/Auth'

export default {
  name: 'phonelogintrue',
  data () {
    return {
      msg: 'reg',
      flag: false,
      message: '',
      phone: '',
      code: ''
    }
  },
  created: function () {
//  获取存在Cache中的号码
    const phone = Auth.getSmsPhone()
    if (!phone) {
      this.$router.replace('/')
    }
    this.phone = phone
  },
  methods: {
    onSubmit () {
      this.login({
        username: this.phone,
        password: this.code,
        type: 1
      }).then(() => {
        this.go(this.returnPath || '/')
      }).catch(error => {
        this.flag = true
        this.message = error.message
      })
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
  },
  components: {
    SendSmsButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.top{background: #1c1c20; color: #fff; font-size: 0.3rem;}
	.top a {display: block; color: #fff; text-decoration: none;}
	.grid-content{text-align: center; min-height: 0.88rem; line-height: 0.88rem;}
	.margR{ margin-right:0.14rem ;}
	.remined { background: #f5f6f7; height: 0.48rem;}
	.remined .remined_inner { height: 0.48rem; line-height: 0.48rem; text-indent: 0.29rem; font-size: 0.24rem; color: red; background: #f9fac7;}	
	.remined .remined_icon{margin-right: 0.1rem;}
	.remined_next {height: 0.62rem; line-height: 0.62rem; background: #f3f4f6; padding-left: 0.49rem; font-size: 0.24rem; color: #666666;}
	.phone{ line-height: 1.04rem; border: 0.02rem solid #efeef3;}
	.phone_inner {text-indent: 0.49rem; font-size: 0.32rem; color: #666;}
	.phone_inner .phoneNum {border: none; outline: none;}
	.verify{ line-height: 1.04rem; border: 0.02rem solid #efeef3; margin-top: 0.17rem;}
	.verify .verify_num {width: 2rem; border: none; outline: none;}
	.verify_text {font-size: 0.32rem; color: #666; text-align: center; border-left: 0.02rem solid #efeef3; display: block; text-decoration: none;}
	.button_wrap {padding: 0.57rem 0.48rem; height: 8.5rem; background: #f5f6f7;}
	.button_wrap .submit {border-radius: 0; width: 100%; height: 0.88rem;}
	.myhref {color: #0C94FF;}
</style>

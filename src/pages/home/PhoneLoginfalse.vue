<template>
  <div class="contain">
    <y-top title="手机快捷登录"></y-top>
    <el-row class="remined">
      <el-col :span="24"><div v-show="flag" class="remined_inner"><i class="el-icon-circle-close remined_icon"></i>短信验证错误，请重试!</div></el-col>
    </el-row>
    <el-row class="phone">
      <el-col :span="24"><div class="phone_inner">手机号 <input v-model='data.phone' disabled="disabled" class="phoneNum" placeholder="请输入您的手机号" /></div></el-col>
    </el-row>
    <el-row class="verify">
      <el-col :span="15">
        <div  class="phone_inner">验证码 <input class="verify_num" v-model='data.code'  placeholder="请输入验证码" /></div>  
      </el-col>
      <el-col :span="9">
        <send-sms-button :phone='data.phone'></send-sms-button>
      </el-col>
    </el-row>
    <el-row class="verify">
      <el-col :span="24"><div class="phone_inner">昵称 <input @blur="onblur('nikename')" v-model='data.nickname' class="phoneNum" placeholder="不超过6个汉字或者12个字符" /></div></el-col>
    </el-row>
    <el-row class="verify">
      <el-col :span="24"><div class="phone_inner">密码 <input @blur="onblur('pwd')" v-model='data.password' class="password" placeholder="6-16个字符(区分大小写)" /></div></el-col>
    </el-row>
    <el-row class="verify">
      <el-col :span="24"><div class="phone_inner">邀请人 <input v-model='data.invite' class="phoneNum" placeholder="邀请你的人" /></div></el-col>
    </el-row>
    <div class="button_wrap">
      <!--<el-button class="submit"   type="danger" @click="onSubmit">登录</el-button>-->
      <el-button class="submit"   type="danger" @click="onSubmit">登录</el-button>   
      <!--<el-button class="submit"   type="danger" @click="go('/home/loginsuccess')">下一步</el-button>-->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SendSmsButton from '@/components/SendSmsButton'
import Auth from '@/utils/Auth'
import { dataLegal } from '@/utils/Filters'

export default {
  name: 'phoneloginfalse',
  data () {
    return {
      flag: false,
      msg: 'reg',
      data: {
        phone: '',
        code: '',
        nickname: '',
        password: '',
        invite: Auth.getInvite(),
        from: Auth.getFrom()
      }
    }
  },
  created: function () {
//  获取存在Cache中的号码
    const phone = Auth.getSmsPhone()
    if (!phone) {
      this.$router.replace('/home/reg')
    }

    this.data.phone = phone
  },
  methods: {
    onblur: function (str) {
      if (str === 'nikename') {
          // todo
        const nikevalue = this.data.nickname
        const nikeLen = dataLegal(nikevalue)
        if (nikeLen > 12) {
          this.$alert('昵称不得超过6个汉字或12个字符串', '出错啦', { customClass: 'my' })
          return false
        }
      }
      if (str === 'pwd') {
        if (this.data.password.length > 16 || this.data.password.length < 6) {
          this.$alert('密码请输入为6到16位的字符', '出错啦', { customClass: 'my' })
          return false
        }
      }
    },
    onSubmit () {
      this.register({
        phone: this.data.phone,
        nickname: this.data.nickname,
        password: this.data.password,
        code: this.data.code,
        invite: this.data.invite || 0,
        openid: Auth.getOpenid(),
        from: this.data.from || ''
      }).then(() => {
        this.go('/home/loginsuccess')
      }).catch(error => {
        console.log(error)
      })
    },
    go: function (path) {
      this.$router.push({ path: path })
    },
    ...mapActions([
      'register'
    ])
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
  .phone_inner .phoneNum {border: none; outline: none; background: #FFFFFF; padding-right: 0rem; width: 55%;}
  .verify{ line-height: 1.04rem; border: 0.02rem solid #efeef3; margin-top: 0.17rem;}
  .verify .password { border: none;}
  .verify .verify_num {width: 2rem; border: none; outline: none;}
  .button_wrap {padding: 0.57rem 0.48rem; height: 4.75rem; background: #f5f6f7;}
  .button_wrap .submit {border-radius: 0; width: 100%; height: 0.88rem; background: #e43a3d; font-size: 0.38rem;}
</style>

<template>
  <div class="contain">
    <y-top title="绑定手机"></y-top>
    <el-row class="remined">
      <el-col :span="24"><div v-show="!flag" class="remined_inner" ><i class="el-icon-circle-close remined_icon"></i><span v-text='message'></span></div></el-col>
    </el-row>
    <el-row class="remined_next_text">
      <el-col :span="24"><div class="remined_inner_text">为了保障安全及顺利授权,请先绑定手机</div></el-col>
    </el-row>
    <el-row class="remined_next">
      <el-col :span="24"><div class="remined_inner">我们将发验证码到您的手机</div></el-col>
    </el-row>
    <el-row class="phone">
      <el-col :span="24"><div class="phone_inner">手机号 <input v-model='phone' class="phoneNum" placeholder="请输入您的手机号" /></div></el-col>
    </el-row>
    <div class="button_wrap">
      <el-button class="submit"  type="danger" @click="onSubmit">下一步</el-button>
      <p class="changeaccount"><span @click="handleLogout">切换账号</span></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Api from '@/utils/Api'
import Auth from '@/utils/Auth'
import AuthMixin from '@/utils/AuthMixin'

export default {
  mixins: [AuthMixin],
  name: 'bindphone',
  data () {
    return {
      message: '',
      flag: true,
      phone: ''
    }
  },
  methods: {
    onSubmit () {
      this.flag = /^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)
      this.message = '手机号格式有误请重新输入'
      if (!this.flag) {
        return false
      }
      // 验证手机号是否已使用
      this.verfiyPhone()
    },
    go: function (path) {
      this.$router.push({ path: path })
    },
    verfiyPhone () {
      const api = new Api('base')
      api.get('User/Verify', { type: 'phone', value: this.phone }).then(resp => {
        if (resp.used === '1') {
          // 已使用，错误提示
          this.flag = false
          this.message = '该手机已被注册，请更换手机'
        } else {
          // 发送短信验证码，并到下一步
          Auth.sendSms(this.phone).then(resp => {
            this.go('/home/bindphonecode')
          })
        }
      })
    },
    handleLogout () {
      this.$confirm('您确定要注销账号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'my',
        type: 'warning'
      }).then(() => {
        // 确认操作
        this.logout({ token: this.authToken }).then(() => {
          this.go('/home/login')
        }).catch(() => {
          console.log('注销失败')
        })
      }).catch(() => {
        // 取消操作
      })
    },
    ...mapActions([
      'logout'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .remined { height: 0.48rem; background:#f3f4f6;}
  .remined_next_text .remined_inner_text { text-align: center; height: 0.6rem ;  background: #f3f4f6; line-height: 0.6rem; color: #7E5A3F; font-size: 0.3rem;}
  .remined .remined_inner {  background: #f9fac7; height: 0.48rem; line-height:0.48rem;text-indent: 0.25rem; font-size: 0.24rem; color: red;}
  .remined .remined_icon{margin-right: 0.1rem;}
  .remined_next {height: 0.62rem; line-height: 0.62rem; background: #f3f4f6; padding-left: 0.49rem; font-size: 0.24rem; color: #666666;}
  .phone{ line-height: 1.04rem; border: 1px solid #efeef3;}
  .phone_inner {text-indent: 0.49rem; font-size: 0.32rem; color: #666;}
  .phone_inner .phoneNum {border: none; outline: none;}
  .button_wrap {padding: 0.57rem 0.48rem; height: 8.52rem; background: #f5f6f7;}
  .button_wrap .submit {border-radius: 0; width: 100%; height: 0.88rem;  background: #e43a3d; font-size: 0.38rem;}
  .button_wrap .my_href {margin-top: 0.4rem; font-size: 0.24rem;}
  .button_wrap .changeaccount { text-align: center; margin-top: 15px;}
  
  .my_href .go_reg a,.my_href .go_phone a { text-decoration: none ; color: #0c94ff; }
  .my_href .go_phone {text-align: right;}
  .my_href1 {margin-top: 3.57rem; font-size: 0.28rem; text-align: right;}
  .my_href1 a {color: #0c94ff}
</style>

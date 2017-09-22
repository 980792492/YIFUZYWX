<template>
  <div class="contain">
    <y-top title="大赛报名"></y-top>
	  <el-row>
	    <el-col :span="24"><div class="grid-account">已有中银证券账户</div></el-col>
	  </el-row>
	  <el-row class="account">
	    <el-col :span="24" class="name-inner"><div class="account_inner">姓<span class="blank"></span>名 <input type="text" v-model='realname' class="account-num" placeholder="请输入您的真实姓名" /></div></el-col>
	    <el-col :span="24" class="name-inner"><div class="account_inner">资金账号 <input v-model='account' class="account-num" placeholder="请输入您的证券客户号" /></div></el-col>
	    <el-col :span="24"><div class="account_inner">身份证号 <input v-model='sfID' class="account-num" placeholder="请输入您的身份证号码" /></div></el-col>
	  </el-row>
	  <div class="btn-sure">
	    <p class="btn-text">请填写在<a v-text="name"></a>成功开户的客户号，其它营业厅暂时未参加此次活动，请见谅</p>
	    <el-button class="submit"   type="danger" @click="next">确认报名</el-button>
	    <p class="btn-warn">报名即表示已阅读并同意<router-link to="/rule">中富杯实盘大赛规则</router-link></p>
	  </div>
	  <div class="info">
	      <p class="title1">还没有中银证券账户</p>
	      <p class="title2">长按识别下方二维码急速开户</p>
	      <img class="jskh" src="../../assets/zyerweima.png" alt="急速开户扫描二维码" />
	      <p class="title3">中银证券杭州营业部</p>
	      <p class="title4">客服电话：87563388</p>
	      <p class="title5">开户时间：周一到周日: 7 * 24 小时</p>
	  </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Api from '@/utils/Api'
import Authverify from '@/utils/authVerify'

export default {
  name: 'join',
  data () {
    return {
      realname: '',
      account: '',
      sfID: '',
      name: '中银证券杭州营业厅'
    }
  },
  methods: {
    go: function (path) {
      this.$router.push({ path: path })
    },
    next () {
      if (this.realname && this.account) {
        if (this.account.length !== 8) {
          this.$alert('客户号为8位数字', '出错啦', { customClass: 'my' })
          return false
        }
//      华融判断以3301000开头的数字
//      if (!/^(3301000[0-9]{5})$/.test(this.account)) {
//        this.$alert('资金账号以3301000开头', '出错啦', { customClass: 'my' })
//        return false
//      }
//      判断身份证号码是否合法
        if (!Authverify.authVerify(this.sfID)) {
          this.$alert('该身份证号码违法！', '出错啦', { customClass: 'my' })
          return false
        }
        const api = new Api()
        const params = {}
        params.type = 'customer'
        params.value = this.account
        params.sndname = this.sfID
        api.post('/User/Verify', params).then(resp => {
          // console.log(resp)
          if (resp.used !== 0) {
            this.$alert('该资金账号已被使用', '出错啦', { customClass: 'my' })
            return false
          } else {
            this.setApplyData({
              realname: this.realname,
              customerid: this.account,
              sfid: this.sfID
            })
            this.go('/apply/joinchoice')
          }
        })
      } else {
        this.$alert('个人信息不能为空', '出错啦', { customClass: 'my' })
      }
    },
    ...mapActions(['setApplyData'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contain {background: #FFFFFF;flex-direction: column;}
  p {padding: 0; margin: 0;}
  .top{background: #1c1c20; color: #fff; font-size: 0.3rem;}
  .top a {display: block; color: #fff; text-decoration: none;}
  .grid-content{text-align: center; min-height: 0.88rem; line-height: 0.88rem;}
  .margR{ margin-right:0.14rem ;}
  .grid-account {line-height: 0.97rem; text-align: center;background: #e43a3d; font-size: 0.32rem; color: #f8ffff;}
  .account{ line-height: 1.04rem; border: 2px solid #efeef3;}
	.account .name-inner {border-bottom: 1px dashed #efeef3;}
  /*姓名的空白*/
  .account .blank { display: inline-block; width: 0.6rem;}
  .account_inner {text-indent: 0.49rem; font-size: 0.32rem; color: #666; }
  {border-bottom: 1px solid;}
  
  .account_inner .account-num {border: none; margin-left: 0.1rem; font-size: 15px; color: #666;}
  .btn-sure {padding: 0 0.49rem; height: 2.69rem; padding-top: 0.18rem;}
  .btn-sure .btn-text { font-size: 0.24rem; color: #686868; line-height: 0.36rem; }
  .btn-text a, .btn-warn a{text-decoration: none; color: #e13938;}
  .submit {width: 100%; border-radius: 0; background: #e43a3d; margin-top: 0.27rem;font-size: 0.38rem;height: 0.88rem;}
  .btn-sure .btn-warn { font-size: 0.24rem; color: #686868;margin-top: 0.2rem; margin-bottom: 0.1rem;}
  .info { background: url(../../assets/join-1.jpg) no-repeat; background-size: cover; padding-top: 0.5rem;}
  .info .title1 {width: 4.25rem; height: 0.64rem; background: url(../../assets/join-2.png); background-size: cover; text-align: center;line-height: 0.64rem; 
          font-size: 0.3rem; color: #fffbff; margin: 0.5rem 1.67rem; margin-bottom: 0; margin-top: 0;}
  .info .title2 {font-size: 0.26rem; text-align: center;color: #feda16; margin-top: 0.5rem;}        
  .info .jskh { width: 3rem; height: 3rem; margin: 0.5rem 2.25rem; margin-bottom: 0;}     
  .info .title3,.info .title4,.info .title5 {text-align: center; color: #fcfcff;}
  .info .title3 { font-size: 0.28rem; margin-top: 0.18rem;}
  .info .title4 { margin-top: 0.4rem;}
  .info .title5 {margin-top: 0.13rem; padding-bottom: 0.5rem;}
  .info .title4,.info .title5 { font-size: 0.24rem;}  
    
</style>

<template>
  <div class="contain">
    <y-top title="报名审核"></y-top>
    <div class="contain-inner">
      <div class="inner-1">
        <p class="p1">您已提交授权，</p>
        <p class="p2">预计将在2个工作日内完成审核，请耐心等待</p>
      </div>
      <div class="inner-2">
        <div class="mysteps">
          <div class="big big1">
            <div class="small small1"></div>
          </div>
          <div class="empty empty1"></div>
          <div class="big big2">
            <div class="small small1"></div>
          </div>
          <div class="empty empty2"></div>
          <div class="big big3">
            <div class="small small1"></div>
          </div>
          <div class="empty empty3"></div>
          <div class="big big4">
            <div class="small small4"></div>
          </div>
          <div class="empty empty4"></div>
          
          
        </div>
        <div class="inner-2-2">
          <p class="inner-top"><i class="el-icon-check"></i>开户</p>
          <div class="openacut">
            <p class="p1">您已成功开户，资金账号<span v-text="customerid"></span>,如资金账号有误，</p>
            <span class="span">请联系客服</span>
            <span class="span">客服电话：<a href="">0571-87119797</a></span>
            <span class="span">客服QQ群：<a href="">600300</a></span>
            <img src="../../assets/join-success-logo.jpg" />
          </div>
          <p class="inner-top  second"><i class="el-icon-check"></i>阵营</p>
          <div class="team-text">
            您已选择加入<span v-text='campname'></span>
          </div>
          <p class="inner-top  second"><i class="el-icon-check"></i>授权</p>
          <div class="team-tip">
            <p class="p1">您已提交报名申请，我们工作人员会尽快审核</p>
            <p>审核完毕后，我们会第一时间以短信的形式通知您，请耐心等待......</p>
          </div>
          <p class="inner-top  second inner-last"><i class="el-icon-time"></i>参赛</p>
          <div class="team-tip">
            <p class="p1">确保账户总资产高于1000元，并完成至少6笔交易，即表示参赛成功</p>
          </div>
        </div>
      </div>
      <div class="inner-3">
          <a class="gouser" @click="go('/')">返回首页</a>
          <p class="changeaccount"><span @click="handleLogout">切换账号</span></p>
      </div>
    </div>
  </div>
    
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'joinsuccess',
  methods: {
    go (path) {
      this.$router.push({ path: path })
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
  },
  computed: mapState({
    customerid (state) {
      return state.user.data ? state.user.data.customerid : null
    },
    campname (state) {
      return state.user.data ? state.user.data.campname : null
    }
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {margin: 0;padding: 0;font-size: 0.24rem;}
  .contain { display: flex;  flex-direction: column; }
  .contain .contain-inner { background:url(../../assets/join-success.jpg) repeat-x; padding-bottom: 20px;}
  .contain-inner .inner-1 {height: 1.21rem; padding-top: 0.49rem;}
  .inner-1 .p2 {margin-top: 0.21rem;}
  .inner-1 p{margin: 0; padding: 0; font-size: 0.27rem; text-align: center; color: #fdfffc;}
  .inner-2 {padding: 0 0.48rem; display: flex;display: -webkit-flex; padding-bottom: 0.48rem;} 
  .inner-2 .mysteps {width: 0.44rem;position: relative;}
  .mysteps .big {width: 0.44rem; height: 0.44rem; background: #e07e8b; border-radius: 50%;position: relative;}
  .mysteps .big2 {top: 2.68rem;}
  .mysteps .big3 {top: 4.15rem;}
  .mysteps .big4 {top: 6.2rem;}
  
  .mysteps .small { position: absolute; width: 0.25rem; height: 0.25rem; background: #ffff01;left: 0%; right: 0%; top: 0%; bottom: 0%; margin: auto; 
                  border-radius: 50%;}
  .big4 .small4 {background: #ffffff;}
  .mysteps .empty {width: 0; height: 2.61rem; border:1px solid #FFFF01;position: absolute;z-index: 999;}
  .mysteps .empty1 {left: 0.2rem; top: 0.1rem;}
  .mysteps .empty2 {left: 0.2rem; top: 2.67rem;}
  .mysteps .empty3 {left: 0.2rem; top: 3.9rem;}
  .mysteps .empty4 {left: 0.2rem; top: 6.5rem; border-color: #FFFFFF; height: 1.2rem;}
  
  
  
  .inner-2-2 {flex: 1;-webkit-flex: 1; padding-left: 0.21rem;}
  .inner-2-2 .inner-top { font-size: 0.27rem; color: #f9ff00; width: 1.4rem; height: 0.5rem; border-radius: 10rem; border:0.02rem solid #f9ff00;
              text-align: center; line-height: 0.5rem;}
  .inner-2-2 .inner-top i{ margin-right: 0.1rem;}           
  .inner-2-2 .openacut {position: relative; width: 5.92rem; height: 2.2rem; background:rgba(0,0,0,0.1);margin-top: 0.1rem; font-size: 0.2rem;color: #f9fff6; }
  .openacut .p1 {  font-size: 0.2rem; text-indent:0.30rem;  padding-top: 0.23rem; padding-right: 0.2rem;}
  .openacut .span {margin-left:0.28rem; margin-top: 0.13rem; display: block;}
  .openacut .span a {text-decoration: none; color: #fdff01;}
  .inner-2-2 .openacut img {position: absolute;top: 0.85rem;right: 0.3rem; width: 1rem; height: 1rem;}
  .inner-2-2 .second { margin-top: 0.26rem;}
  .inner-2-2 .team-text {text-indent: 0.3rem;margin-top: 0.16rem; font-size: 0.22rem; color: #fffdfe; line-height: 0.94rem; background: rgba(0,0,0,0.1);}
  .inner-2-2 .team-tip {padding-left: 0.36rem; margin-top: 0.16rem;padding-bottom: 0.15rem; background: rgba(0,0,0,0.1); color: #fffdfe; font-size: 0.22rem;}
  .inner-2-2 .team-tip p {line-height: 0.36rem;}
  .inner-2-2 .team-tip .p1{padding-top: 0.28rem;}
  .inner-2-2 .inner-last { border: 0.02rem solid #fefffd; color: #FEFFFD;}
  .inner-3 {height: 1.5rem; padding: 0  0.48rem;}
  .inner-3 .gouser {display: block; font-size: 0.26rem; text-align: center; line-height: 0.86rem; border: 0.02rem solid #feffff; color: #feffff;}  
  .inner-3 .changeaccount { text-align: center; margin-top: 12px; color: #feffff;}
</style>


<template>
  <div class="mydiv" id="app">
    <router-view></router-view>
    <y-loading></y-loading>
  </div>
</template>

<script>
import YLoading from '@/components/Loading'
import Weixin from '@/utils/Weixin'
import Auth from '@/utils/Auth'
import Constant from '@/utils/Constant'

export default {
  name: 'app',
  created () {
    // 邀请
    this.initInvite()
    this.initFrom()
    Weixin.initShare({
      title: '华富杯实盘大赛等你来战！',
      desc: '佣金仅万2.5，首创战队pk模式，现金大奖周周领！奖品多多、抢占先机、先到先得',
      imgUrl: location.origin + Constant.PUBLIC_PATH + 'static/share-hf.jpg',
      link: location.origin + Constant.PUBLIC_PATH,
      callback: function () {
        // this.shareflag = false
      },
      cancelCallback: function () {
        // this.shareflag = false
      }
    })
  },
  methods: {
    initInvite () {
      const inviteId = this.$route.query.invite || 0
      if (inviteId > 0) {
        Auth.setInvite(inviteId)
      }
    },
    initFrom () {
      const fromString = this.$route.query.from || null
      if (fromString) {
        Auth.setFrom(fromString)
      }
    }
  },
  components: {
    YLoading
  }
}
</script>

<style>
  @import '~normalize.css/normalize.css';
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;*/
  }

  .myInput > .el-input__inner {background: #f8f9fd ; border-radius: 0 ; }
  /*.mystep .is-finish {background-color: #ffff01 !important; border-color: #ffff01 !important;}*/

  * { margin: 0; padding: 0; -webkit-tap-highlight-color: rgba(0,0,0,0);}
  i,em{font-style: normal;}
  input {outline: none;}  
  #app { height: 100%;} 
  /*选择战队页面自定义样式*/
  .my {width: 7rem !important;}
  .el-step__line .is-vertical { left: 0.1rem;}      
      
  /*设置nav的样式*/
  .active1 { color:#FFFFFF !important;}
　  .unactive1 { color:#000 !important;}
　  .icon1 {　float: right; font-size:16px !important;}

  /*设置弹出框的点击效果的去除*/
  .el-message-box__close { -webkit-tap-highlight-color: rgba(0,0,0,0) !important;}  
  
  /*设置个人资料的canvas的旋转-180度*/
  .main canvas { transform: rotate(-180deg);}
  
  /*设置接口返回数据的提示信息*/ 
  .el-notification { background: rgba(0,0,0,0.8) !important; width: 80% !important; height: 2rem !important; top: 0 !important; left: 0 !important;
                    bottom: 0 !important;right: 0 !important; margin: auto !important;}
  .el-notification .el-notification__title { color: red !important; }
  .el-notification .el-notification__content {color: red !important;}
    
</style>

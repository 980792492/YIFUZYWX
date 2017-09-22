<template>
  <div class="contain">
    <y-top title="个人中心"></y-top>
    <div :class="'head' + authUser.camp">
      <div class="head-top">
        <div class="top-left">
        	<img @click="go('/')" src="../../assets/homebtn.png"/>
        </div>
        <div class="top-right">
          <img :src='authUser.headimg' alt="我是头像" />
		      <div class="teamname">
		      	<span class="headlogo"></span><span>{{authUser.campname}}</span>
		      </div>
        </div>
      </div>
      <p class="name">
        {{authUser.yfNick}}
        <span :class="isApplyUser ? 'success' : 'false'">
          <icon :name="isApplyUser ? 'check-circle' : 'exclamation-circle'"></icon>
          {{ statusName }}
        </span>
      </p>
      <p class="tel">手机号：<span>{{ authUser.phone | confuse(2, 2) }}</span>资金账号： <span>{{ authUser.customerid | confuse(2, 2) }}</span></p>
    </div>
    <!-- 获奖 -->
    <!--<y-win-rank></y-win-rank>-->
    <!-- 获奖over -->
    <div class="four-pie">
      <div class="wrap" v-for='item in rateData'>
        <pie v-bind:data="item.data" ></pie>
        <div class="add">
          <p class="p1">{{ item.name }}</p>
          <p class="p2">{{ item.rate | toNumber }}%</p>
          <p class="p1">排名{{ item.rank | toNumber }}</p>
        </div>
      </div>
    </div>
    <ul class="ul-list">
      <li @click="go(item.link)" v-for='item in menu'>
        <p><img :src="item.icon" alt="" />{{ item.name }}<a href="javascript:void(0)" >{{ item.value }}<i class="el-icon-arrow-right"></i></a></p>
      </li>
    </ul>
    <el-row>
      <el-col :span="24" class='dev'><a @click="handleLogout" class="grid-content">切换账号</a></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pie from '@/components/canvas'
import YWinRank from '@/components/user/WinRank'
import AuthMixin from '@/utils/AuthMixin'
import { toNumber, confuse } from '@/utils/Filters'

export default {
  mixins: [AuthMixin],
  name: 'usercenter',
  created: function () {
  },
  methods: {
    // 登出
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
    go: function (path) {
      this.$router.push({ path: path })
    },
    ...mapActions([
      'logout'
    ])
  },
  filters: {
    toNumber,
    confuse
  },
  computed: {
    statusName () {
      switch (this.authUser.status) {
        case 1:
          return '已报名(未达6笔交易)'
        case 2:
          return '已参赛'
        case 3:
          return '暂停比赛'
        case 4:
          return '已退赛'
        default:
          return '错误状态'
      }
    },
    // 排名和收益率数据
    rateData () {
      let yieldrate = this.authUser.yieldrate || 0
//    let monthrate = this.authUser.monthrate || 0
//    let weekrate = this.authUser.weekrate || 0
      let dayrate = this.authUser.dayrate || 0
      let totalrank = this.authUser.totalrank || 0
//    let monthrank = this.authUser.monthrank || 0
//    let weekrank = this.authUser.weekrank || 0
      let dayrank = this.authUser.dayrank || 0
      return [
        { name: '总收益', data: [yieldrate, 100 - yieldrate], rate: yieldrate, rank: totalrank },
//      { name: '月收益', data: [monthrate, 100 - monthrate], rate: monthrate, rank: monthrank },
//      { name: '周收益', data: [weekrate, 100 - weekrate], rate: weekrate, rank: weekrank },
        { name: '日收益', data: [dayrate, 100 - dayrate], rate: dayrate, rank: dayrank }
      ]
    },
    // 菜单
    menu () {
      return [
        { name: '战队排名', icon: require('../../assets/user-paihang.png'), value: this.authUser.teamrank, link: '/score' },
        { name: '荣誉记录', icon: require('../../assets/user-rongyu.png'), value: this.authUser.honors, link: '/user/honor' },
        { name: '鼓舞', icon: require('../../assets/user-gudui.png'), value: this.authUser.inspires, link: '/user/inspire' },
        { name: '邀请好友', icon: require('../../assets/user-person.png'), value: this.authUser.invites, link: '/user/invite' },
        { name: '战报', icon: require('../../assets/user-intell.png'), value: '', link: '/user/report' }
      ]
    },
    isApplyUser () {
      return this.authUser.status === 1 || this.authUser.status === 2
    },
    ...mapState({
      authUser: state => state.user.data,
      authToken: state => state.user.token
    })
  },
  components: {
    Pie,
    YWinRank
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*华融的头部样式*/
	.contain {background: #FFFFFF; height: 100%;}
	.contain .head1{ height: 3.46rem;background: url(../../assets/user-huarong.jpg) no-repeat; background-size: cover; padding: 0  0.26rem;}
	.head1 .head-top { height: 2.5rem; display: flex;}
	.head1 .head-top .top-left {position: relative; width: 1.6rem; height: 100%;float: left;  }
	.head1 .head-top .top-left img { position: absolute; top: 0.2rem; left: 0.14rem; width: 0.6rem; height: 0.6rem; }
	.head1 .head-top .top-right {position: relative; flex: 1; height: 100%;float: left;}
	.head1 .top-right> img {position: relative;background: #BE0A11; z-index: 10; width: 1.95rem; height: 1.95rem; border: 0.11rem solid #f3cfd1; border-radius: 50%; margin-top: 0.18rem;margin-left:0.8rem; }

  .head1 .top-right .teamname {position: absolute; padding-top: 0.05rem; top: 0.5rem;left: 2.5rem; padding-left: 0.35rem; width: 2rem; height: 0.45rem; border-radius: 15px; background: #FFFFFF;} 	
	.head1 .top-right .teamname span { vertical-align: middle;}
	.head1 .top-right .teamname  span:nth-child(1) { display: inline-block; width: 0.38rem; height: 0.38rem; background: url(../../assets/zhongyingheadlogo.png) no-repeat; background-size: cover;}
  .head1 .top-right .teamname  span:nth-child(2) {margin-left: 0.05rem; color:#E45908 ; font-size: 12px; font-weight: 600;}
  
	
	.head1 .name { line-height: 0.4rem; font-size: 0.3rem;}
	.head1 .name span {left: 2.65rem; font-size: 0.24rem; padding:0 0.23rem; border-radius: 15px; color: #ffffff; background: #9a33cc; display: inline-block; }	
	.head1 .name .success {background: #9a33cc;}
	.head1 .name .false { background: #999999;}
	.head1 p{ text-align: center; color: #ffffff;}
	.head1 .tel { line-height: 0.4rem;}
	.head1 .tel span { margin-right: 0.2rem;}
	
  
   /*一富的头部样式*/
  .contain .head2{ height: 3.46rem;background: url(../../assets/user-yifu.jpg) no-repeat; background-size: cover; padding: 0  0.26rem;}
  .head2 .head-top { height: 2.5rem; display: flex;}
  .head2 .head-top .top-left {position: relative; width: 1.6rem; height: 100%;float: left;  }
  .head2 .head-top .top-left img { position: absolute; top: 0.2rem; left: -0.1rem; width: 0.6rem; height: 0.6rem; }
  .head2 .head-top .top-right {position: relative; flex: 1; height: 100%;float: left;}
  .head2 .top-right>img {position: relative;background: #E15808; z-index: 10; width: 1.95rem; height: 1.95rem; border: 0.11rem solid #f3cfd1; border-radius: 50%; margin-top: 0.18rem;margin-left:0.8rem; }
  .head2 .top-right .teamname {position: absolute; padding-top: 0.05rem; top: 0.5rem;left: 2.5rem; padding-left: 0.35rem; width: 2rem; height: 0.45rem; border-radius: 15px; background: #FFFFFF;} 
	.head2 .top-right .teamname span { vertical-align: middle;}
	.head2 .top-right .teamname  span:nth-child(1) { display: inline-block; width: 0.38rem; height: 0.38rem; background: url(../../assets/yifuheadlogo.png) no-repeat; background-size: cover;}
  .head2 .top-right .teamname  span:nth-child(2) {margin-left: 0.05rem; color:#E45908 ; font-size: 12px; font-weight: 600;}
  
  .head2 .name { line-height: 0.4rem; font-size: 0.3rem;}
  .head2 .name span {left: 2.65rem; font-size: 0.24rem; padding:0 0.23rem; border-radius: 15px; color: #ffffff; background: #9a33cc; display: inline-block; }	
  .head2 .name .success {background: #9a33cc;}
  .head2 .name .false { background: #999999;}
  .head2 p{ text-align: center; color: #ffffff;}
  .head2 .tel { line-height: 0.4rem;}
  .head2 .tel span { margin-right: 0.2rem;}

  /* 图标 */
  .fa-icon {height: 0.4rem; vertical-align: bottom;}
  
  /*奖牌部分样式*/
  .contain .menu { height: 0.88rem; background: #c42209; position: relative;}
  .menu .menu-con { width: 100%; height: 0.88rem; position: relative;z-index: 2;}
  .menu-con p {background:rgba(202,56,31,0.8); overflow: hidden; padding-right: 0.68rem;}
  .overflow {overflow: hidden;}
  .menu-con p span {display: inline-block; height: 0.74rem; padding-top: 0.14rem; color: #FFFFFF; padding-left: 0.34rem;}
  .menu-con p span img { width: 0.49rem; height: 0.6rem; vertical-align: middle;}
  
  /*奖牌右侧按钮样式*/
  .menu .menu-direction { width: 0.6rem; height: 0.88rem; position: absolute; right: 0; top: 0;z-index: 9;}
  .menu .menu-direction span {display: block; width: 0.35rem; height: 0.35rem; border: 0.01rem solid #FFFFFF; border-radius:50%;text-align: center;line-height: 0.36rem;margin-top: 0.3rem; margin-left: 0.09rem; }
  .menu .menu-direction span i { color: #FFFFFF;}
  
  /*四个饼图样式*/
  .four-pie { height: 2.8rem; padding-top: 0.2rem;}
  .four-pie .wrap { width: 50%; position: relative; height: 100%; float: left;}
  .four-pie .wrap .paiming { line-height: 0.2rem; font-size: 0.2rem; text-align: center; color: #a77538; margin-top:-5px ;}
  .wrap .add{ position: absolute; width: 1.5rem; height: 1.5rem; display: inline-block;}
  .wrap .add p{width: 100%; text-align: center;}
  .wrap .add .p1{ width: 100%; color: #a97635; font-size: 0.14rem;}
  .wrap .add .p2{ width: 100%; height: 0.6rem; line-height: 0.6rem; color: #E1292E; font-size: 18px;  font-weight: 600; }
  /*媒体查询时饼图适配不同大小屏幕*/
  @media only screen and (max-width: 330px) {
  	.wrap .add {min-width: 0.85rem; position: absolute; left: 1.14rem; top: 28.5%; display: inline-block;  text-align: center; font-size: 16px; }
  }
  @media only screen and (min-width: 350px) {
  	.wrap .add {min-width: 0.85rem; position: absolute; left: 1.14rem; top: 29.5%; display: inline-block;  text-align: center; }
  }
  @media only screen and (min-width: 400px) {
  	.wrap .add {min-width: 0.85rem; position: absolute; left: 26.5%; top: 18.5%; display: inline-block;  text-align: center; }
  }
  
  
  
  
  /*.nav-content {height: 0.97rem; background: #e12a2c; color: #feffff; line-height: 0.97rem; padding: 0 0.26rem; font-size: 0.31rem;}*/
  /*下部战队排行样式*/
  .ul-list li {display: flex; padding: 0 0.7rem; padding-left: 0.4rem; border-bottom: 1px solid #e6cfaf;}
  .ul-list li p {line-height: 0.98rem; width: 100%; color: #c19a6f;font-size: 0.28rem;}
  .ul-list li p img {width: 0.46rem; height: 0.46rem; margin-right: 0.25rem; vertical-align: middle;}
  .ul-list li p  a { float: right; text-decoration: none; font-size: 0.3rem; color: #e02c2d; width: 50%; text-align: right;}
  .ul-list li p  a i{color: #c19a6f; font-size: 0.22rem;}
  .dev {padding: 0 0.8rem; margin-top: 0.5rem;}
  .grid-content { text-align: center; display: block; line-height: 0.88rem; background: #ed9c27; color: #FFFFFF; font-size: 0.3rem; margin-bottom: 0.6rem;}
</style>

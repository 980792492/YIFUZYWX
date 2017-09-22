<template>
  <div class="contain">
    <y-top title="Ta的个人中心"></y-top>
    <div :class="'head' + userData.camp">
      <div class="head-top">
        <div class="top-left">
        	<img @click="go('/')" src="../../assets/homebtn.png"/>
        </div>
        <div class="top-right">
          <img :src='userData.headimg' alt="我是头像" />
		      <div class="teamname">
		      	<span class="headlogo"></span><span>{{userData.campname}}</span>
		      </div>
        </div>
      </div>
      <p class="name">
          {{userData.yfNick}} <span :class="isApplyUser ? 'success' : 'false'"><i :class="isApplyUser ? 'el-icon-check' : 'el-icon-warning'"></i>{{ statusName }}</span>
      </p>
       <!--<p class="tel">数据更新时间为    <span>{{ userData | toDateTime}}</span></p>--> 
    </div>
    <div class="detail">
    	<div class="newreport">
    		<div class="newreport_top">
				<div class="newreport_top_left" >
					<span class="icon"></span>
					<span class="text">最新战报</span>
				</div>
				<div class="newreport_top_right" @click="go('/home/otheruserreport?id='+ userData.id)">
					<span>更多战报</span><i class="el-icon-arrow-right"></i>
				</div>
    		</div>
    		<div class="newreport_middle">
    		  <div class="info">
    		  	<p class="info_num">{{userData.dayrank}}</p>
    		  	<p class="info_title">排名</p>
    		  </div>
    		  <div class="border"></div>
    		  <div class="info">
    		  	<p class="info_num" :class="userData.dayrate < 0 ? 'blue' : 'red' ">{{userData.dayrate | toRate}}%</p>
    		  	<p class="info_title">当日收益</p>
    		  </div>
    		  <div class="border"></div>
    		  <div class="info">
    		  	<p class="info_num">{{userData.position | toNumber}}%</p>
    		  	<p class="info_title">仓位</p>
    		  </div>
    		</div>
    		<div class="newreport_bottom">
    			<p class="bottom_title">
    				<span>日终资产：{{userData.totalassets}}</span>
    				<span>日出入金：{{userData.withdraw}}</span>
    			</p>
    			<!--<div class="bottom_detail">
    				<div class="detail_left">当前持股：</div>
    				<div class="detail_right">
    					<span v-if= "!userData.holdstock" >空仓</span>
    					<span v-else v-for="item in userData.holdstock.split(',')">{{item}}</span>
    				</div>
    			</div>-->
    		</div>
    	</div>
    	<div class="teamscore">
    		<div class="teamscore_top">
				<div class="teamscore_top_left">
					<span class="icon"></span>
					<span class="text">TA的战队战绩</span>
				</div>
				<div class="teamscore_top_right" @click="go('/score?camp=' + userData.camp)">
					<span>战队实况</span><i class="el-icon-arrow-right"></i>
				</div>
    		</div>
    		<div class="teamscore_bottom">
    			<div class="info">
	    		  	<p class="info_num">{{userData.teamrank}}</p>
	    		  	<p class="info_title">战队排名</p>
	    		</div>
	    		<div class="border"></div>
	    		<div class="info">
	    		  	<p class="info_num">{{userData.honors}}</p>
	    		  	<p class="info_title">总荣誉值</p>
	    		</div>
    		    <div class="border"></div>
	    		<div class="info">
	    		  	<p class="info_num">{{userData.inspires}}</p>
	    		  	<p class="info_title">鼓舞</p>
	    		</div>
	    		<div class="border"></div>
	    		<div class="info">
	    		  	<p class="info_num">{{userData.invites}}</p>
	    		  	<p class="info_title">邀请好友</p>
	    		</div>
    		</div>
    	</div>
    </div>
    <div class="bgpic">
		<p class="guwu">
			<span @click="inspire"></span>
		</p>
		<p class="join">
			<span @click="join"></span>
		</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Api from '@/utils/Api'
import NormalMixin from '@/utils/NormalMixin'
import { toNumber, toDateTime, toRate } from '@/utils/Filters'

export default {
  mixins: [NormalMixin],
  name: 'otherusercenter',
  data () {
    return {
      isLoading: true,
      userData: {}
    }
  },
  created: function () {
    const api = new Api()
    const params = {}
    params.id = this.$route.query.id
    if (!params.id) {
      this.$router.replace('/')
    }
    if (this.authToken) {
      params.token = this.authToken
    }
    api.get('Rank/User', params).then(resp => {
      this.isLoading = false
      this.userData = resp
    }).catch(error => {
      this.isLoading = false
      console.log(error)
      this.$router.replace('/')
    })
  },
  methods: {
    inspire: function () {
      if (!this.authToken) {
        this.$confirm('只有登陆用户才能鼓舞哦，是否需要去登陆？', '提示', {
          confirmButtonText: '去登陆',
          customClass: 'my',
          type: 'warning'
        }).then(() => {
          this.setReturnPath(this.$route.fullPath)
          this.$router.push({ path: '/home/login' })
        })
        return false
      }
      const api = new Api()
      let params = {}
      params.id = this.$route.query.id
      params.token = this.authToken
      api.post('/User/Inspire', params).then(resp => {
        this.$alert('鼓舞成功', '提示', { customClass: 'my' })
      })
    },
    join: function () {
      // console.log('点击了我要参赛')
      this.$router.push({ path: '/', query: {invite: this.$route.query.id} })
    },
    go: function (path) {
      this.$router.push({ path: path })
    },
    ...mapActions(['setReturnPath'])
  },
  filters: {
    toNumber,
    toDateTime,
    toRate
  },
  watch: {
    isLoading (flag) {
      if (flag) {
        this.loadingInstance = this.$loading({
          body: true,
          lock: true,
          text: '努力加载中...'
        })
      } else if (this.loadingInstance) {
        this.loadingInstance.close()
      }
    }
  },
  computed: {
    statusName () {
      switch (this.userData.status) {
        case 1:
          return '已报名'
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
    isApplyUser () {
      return this.userData.status === 1 || this.userData.status === 2
    },
    ...mapState({
      authUser: state => state.user.data,
      authToken: state => state.user.token
    })
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
	.head1 .name span i {text-align:center; margin-right: 0.1rem; width: 0.32rem; height: 0.32rem; color: #9a33cc; background: #FFFFFF; border-radius: 50%; font-size:0.18rem; line-height: 0.32rem;}
	.head1 .name .success {background: #9a33cc;}
    .head1 .name .success i {text-align:center; margin-right: 0.1rem; width: 0.32rem; height: 0.32rem; color: #9a33cc; background: #FFFFFF; border-radius: 50%; font-size:0.18rem; line-height: 0.4rem;}
	.head1 .name .false { background: #999999;}
	.head1 .name .false i {margin-right: 0.1rem; background: #999999; width: 0.32rem; height: 0.32rem; border-radius: 50%; color: #FFFFFF; font-size:0.3rem; line-height: 0.32rem;}
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
  .head2 .name span i {text-align:center; margin-right: 0.1rem; width: 0.32rem; height: 0.32rem; color: #9a33cc; background: #FFFFFF; border-radius: 50%; font-size:0.18rem; line-height: 0.32rem;}  
  .head2 .name .success {background: #9a33cc;}
  .head2 .name .success i {text-align:center; margin-right: 0.1rem; width: 0.32rem; height: 0.32rem; color: #9a33cc; background: #FFFFFF; border-radius: 50%; font-size:0.18rem; line-height: 0.4rem;}
  .head2 .name .false { background: #999999;}
  .head2 .name .false i {margin-right: 0.1rem; background: #999999; width: 0.32rem; height: 0.32rem; border-radius: 50%; color: #FFFFFF; font-size:0.3rem; line-height: 0.32rem;}	
  .head2 p{ text-align: center; color: #ffffff;}
  .head2 .tel { line-height: 0.4rem;}
  .head2 .tel span { margin-right: 0.2rem;}
  
  
  .contain .detail { padding: 0 0.24rem; padding-top: 0.24rem; background: #ffd249;}
  .detail .newreport { background: #FFFFFF;  border-radius: 5px; padding: 0 0.16rem;}
  .detail .newreport> div {border-bottom: 1px dashed #e6cfb0; }
  .detail .newreport .newreport_top { height: 0.78rem; display: flex;}
  .newreport_top .newreport_top_left {flex: 1; padding-top: 0.23rem; }
  .newreport_top .newreport_top_left .icon {display: inline-block; vertical-align: middle; width:0.36rem; height: 0.42rem; background: url(../../assets/user-intell.png) no-repeat; background-size: cover;}
  .newreport_top .newreport_top_left .text {font-size: 0.28rem; color: #c09c79;}
  .newreport_top .newreport_top_right {width: 1.65rem; font-size: 10px; line-height: 0.78rem; }
  .newreport_top .newreport_top_right span { padding: 0 0.12rem; color: #8a8a8a;};
  .newreport_top .newreport_top_right i {color: #e6cfb0;};
  .detail .newreport .newreport_middle { height: 0.89rem; display: flex; padding-top: 0.14rem;}
  .newreport_middle  .info{ flex: 1;}
  .blue {color:#47BB51 !important;}
  .newreport_middle  .info p { text-align: center;}
  .newreport_middle  .info .info_num { color: #e12a2c; font-size: 0.26rem; font-weight: 600; line-height: 0.46rem;}
  .newreport_middle  .info .info_title { color: #c19e7c; font-size: 0.2rem;}
  .newreport_middle .border { width: 0px; height: 0.3rem; margin-top: 0.31rem; border-right: 1px solid #e6cfb0;}
  .detail .newreport .newreport_bottom { border: none;}
  .newreport .newreport_bottom .bottom_title { line-height:0.56rem ; color: #b0804b;}
  .bottom_title span:nth-child(1) { margin-right: 0.05rem;}
  .newreport_bottom .bottom_detail { display: flex; color: #b0804b;}
  .newreport_bottom .bottom_detail .detail_left { width: 1.41rem; padding-top: 0.2rem;}
  @media only screen and (min-width: 340px ) {
  	 .newreport_bottom .bottom_detail .detail_left { width: 1.2rem; padding-top: 0.2rem;}
  }
  .newreport_bottom .bottom_detail .detail_right { flex: 1;}
  .bottom_detail .detail_right span {display: block;float: left; padding: 0.1rem 0.1rem;margin:0.1rem 0.1rem ;  border: 1px solid #bc956d; border-radius: 5px;}
  
  /*战队战报部分*/
  .detail .teamscore { padding: 0 0.16rem; margin-top: 0.24rem; height: 2.12rem; background: #FFFFFF;  border-radius: 5px;}
  .teamscore .teamscore_top { display: flex; height: 0.78rem; border-bottom: 1px dashed #e6cfb0;}
  .teamscore .teamscore_top .teamscore_top_left { flex: 1;padding-top: 0.23rem; }
  .teamscore .teamscore_top_left .icon {display: inline-block; vertical-align: middle; width:0.42rem; height: 0.42rem; background: url(../../assets/user-paihang.png) no-repeat; background-size: cover;}
  .teamscore .teamscore_top_left .text {font-size: 0.28rem; color: #c09c79;}
  .teamscore .teamscore_top .teamscore_top_right {width: 1.65rem; font-size: 10px; line-height: 0.78rem;}
  .teamscore_top .teamscore_top_right span { padding: 0 0.12rem; color: #8a8a8a;};
  .teamscore_top .teamscore_top_right i {color: #e6cfb0;}
  
  
  .teamscore  .teamscore_bottom { display: flex;padding-top: 0.14rem; }
  .teamscore .teamscore_bottom .info { flex: 1;}
  .teamscore .teamscore_bottom .info p{text-align: center;}
  .teamscore .teamscore_bottom .border { width: 0px; height: 0.3rem; margin-top: 0.31rem; border-right: 1px solid #e6cfb0; }
  .teamscore_bottom  .info .info_num { color: #e12a2c; font-size: 0.26rem; font-weight: 600; line-height: 0.46rem;}
  .teamscore_bottom  .info .info_title { color: #c19e7c; font-size: 0.2rem;}
  
  
  .bgpic { height: 3.6rem; background: #ffd249; background: url(../../assets/other_gu.jpg) no-repeat; background-size: cover; padding-top: 1.33rem; }
  .bgpic p { height: 0.9rem; margin-bottom: 0.23rem;}
  .bgpic p span { display: block; width: 2.4rem; height: 100%; margin: 0 auto;}
  .bgpic .guwu span { background: url(../../assets/other_guwu.png) no-repeat; background-size: cover;}
  .bgpic .join span { background: url(../../assets/other_join.png) no-repeat; background-size: cover;}

  </style>

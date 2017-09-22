<template>
  <div class="contain">
    <y-top title="战队战绩"></y-top>
    <div class="main-top">
      <img @click="go('/')" src="../assets/homebtn.png"/>
    </div>
    <navlist></navlist>
    <y-team-pie></y-team-pie>
    <y-team-line></y-team-line>
    <div class="score-paiming">
      <div class="paiming-top">
        <div class="top-left">团队排名</div>
        <div class="top-right"><p @click='orderby'><i class="i-up"></i>{{ orderTitle }}</p></div> 
      </div>
      <ul>
        <li v-for="(item, key) in items">
          <div class="left-1">
            <span v-text='key + 1'></span>
          </div>
          <div class="left-2">
            <img :src="item.headimg" alt="我是头像" />
          </div>
          <div class="left-3">
            <p class="name">{{item.yfNick}}</p>
            <p class="text">贡献值: <span>{{item.honors}}</span></p>
          </div>
          <div class="left-4">
            <span :class="{bluecolor: (item.rate < 0)}">{{ item.rate | toRate }}%</span>
          </div>
        </li>
      </ul>
    </div>
		<y-pagination :status="pullStatus" v-on:pull="handlePull"></y-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navlist from '@/components/nav'
import YTeamPie from '@/components/team/Pie'
import YTeamLine from '@/components/team/Line'
import YPagination from '@/components/Pagination'
import Api from '@/utils/Api'
import NormalMixin from '@/utils/NormalMixin'
import { toRate } from '@/utils/Filters'

export default {
  name: 'score',
  mixins: [NormalMixin],
  data () {
    return {
      msg: 'msg',
      order: 'honors',
      isLoading: false,
      page: 1,
      num: 20,
      items: [],
      pullStatus: 0
    }
  },
  created: function () {
    // console.log(this.camp)
    this.loadData()
  },
  methods: {
    go: function (path) {
      this.$router.push({ path: path })
    },
    loadData: function (page = 1, order = 'honors', isAppend = false) {
      const api = new Api()
      const params = {}
      params.camp = this.camp
      params.order = order
      params.page = page
      params.num = this.num
      this.pullStatus = 1
      api.get('Rank/TeamList', params).then(resp => {
        this.page = page
        this.order = order
        this.pullStatus = resp.length < this.num ? 2 : 0
        this.items = isAppend ? this.items.concat(resp) : resp
      }).catch(error => {
        this.pullStatus = 0
        console.log(error)
      })
    },
    orderby: function () {
      let order = this.order === 'rate' ? 'honors' : 'rate'
      this.loadData(1, order, false)
    },
    handlePull () {
      this.loadData(this.page + 1, this.order, true)
    },
    goup: function () {
      document.body.scrollTop = 0
    }
  },
  filters: {
    toRate
  },
  computed: {
    orderTitle () {
      return this.order === 'rate' ? '收益率' : '贡献值'
    },
    camp () {
      if (this.$route.query.camp) {
        return this.$route.query.camp
      } else if (this.authUser) {
        return this.authUser.camp
      } else {
        return 1
      }
    },
    ...mapState({
      authUser: state => state.user.data
    })
  },
  components: {
    Navlist,
    YTeamPie,
    YTeamLine,
    YPagination
  }
}
</script>

<style scoped>
  ul,li { list-style: none;}
  /*.contain { background: #ff6600;}*/
  /*head样式*/
  .main-top {border-bottom: 0.02rem solid #f57f42; height: 2.78rem; background: url(../assets/team-score-bj.jpg) no-repeat; background-size: cover; }
  .main-top>img { width:0.6rem; height: 0.6rem; margin-top: 0.2rem; margin-left: 0.4rem;}
  

  
  /*排名样式*/
  .contain .score-paiming { padding: 0 0.56rem;}
  .score-paiming .paiming-top { height: 0.88rem; background: #ed9c27; display: flex;}
  .paiming-top div { flex:1; line-height:0.88rem;}
  .paiming-top .top-left { color:#ffffff; padding-left:0.3rem;}
  .paiming-top .top-right { color:#660500; font-size:0.25rem;text-align:right; padding-right:0.3rem; }
  .paiming-top .top-right p {display: inline-block;padding-left: 0.3rem;}
  .paiming-top .top-right i { vertical-align: middle; width:0.1rem; height:0.25rem; display: inline-block; background: url(../assets/score-up.jpg) no-repeat; background-size: cover; margin-right:0.1rem;}

  /*排名列表样式*/
  .bluecolor { color: #47BB51 !important; border-color: #47BB51 !important;}
  
  .score-paiming ul {}
  .score-paiming ul li { border-bottom:  1px dashed #dfd0bb; display: flex;}
  .score-paiming ul li .left-1 {width: 0.74rem; padding-top: 0.32rem; padding-left: 0.28rem; height: 0.92rem; }
  ul li .left-1 span { display: block; width: 0.6rem; height: 0.8rem; color: #b27532; text-align: center;  line-height:0.96rem;background: url(../assets/score-noarmal.png) no-repeat; background-size: contain;  }
  ul li:nth-child(1) .left-1 span {background: url(../assets/score-1.png) no-repeat; background-size: cover; color: #FFFFFF;}
  ul li:nth-child(2) .left-1 span {background: url(../assets/score-2.png) no-repeat; background-size: cover; color: #FFFFFF;}
  ul li:nth-child(3) .left-1 span {background: url(../assets/score-3.png) no-repeat; background-size: cover; color: #FFFFFF;}
  /*.paihang-detail ul li .left-1 { width: 0.74rem; padding-top: 0.32rem; padding-left: 0.28rem; height: 0.92rem;  }*/
  
  ul li .left-2 { width: 0.88rem; padding-top: 0.2rem;}
    ul li .left-2 img {width: 0.8rem;height: 0.8rem;border-radius: 0.5rem;}  
  ul li .left-3 {flex: 1; padding-top: 0.18rem;}
  li .left-3 .name { line-height: 0.4rem; color: #a8743b;  text-indent: 0.14rem;}
  li .left-3 .text { padding-top: 0.1rem;color: #e4bb8d; text-indent: 0.16rem;}
  li .left-4 { padding-top: 0.28rem; padding-right: 0.2rem;} 
  li .left-4  span {min-width:1rem ; text-align: center; float: left; border: 0.02rem solid #fe0000; border-radius: 0.5rem; padding: 0.16rem  0.22rem; color: #fe0000;}
  .icon-up { height: 0.66rem; padding-right: 0.2rem; padding-top: 0.52rem }
  .icon-up  .up { display: block; width:0.44rem ; height: 0.44rem; background: url(../assets/score-up.png) no-repeat; float: right; background-size: cover;}
</style>

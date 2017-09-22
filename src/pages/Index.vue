<template>
  <div class="contain">
    <y-top title="首页"></y-top>
    <div class="main-top">
      <p @click="go('/user/usercenter')" ></p>
    </div>
    <Navlist></Navlist>
    <div class="pkwrap">
      <div class="pk">
        <div class="pk-left">
          <p class="pk-title">中银荣誉值</p>
          <p class="pk-num pk-num1" v-text='hrhonors'></p>
        </div>
        <div class="pk-right">
          <p class="pk-title">一富荣誉值</p>
          <p class="pk-num pk-num2" v-text='yfhonors'></p>
        </div>        
      </div>
    </div>
    <div class="paihang">
      <div class="paihang-top">
        <ul class="paihang-list">
          <li v-for="v in groupList" @click="switchGroup(v.name)" :class="{mycolor:v.name == group}" >{{v.title}}</li>      
        </ul>
      </div>
      <div class="paihang-detail">
        <ul>
          <!--带参数的路由跳转-->
          <router-link v-for="(item, key) in items" :to="{ path: '/home/otherusercenter',query:{id: item.userId} }" target="_self" key="key">
            <div class="left-1">
              <span v-text='key + 1'></span>
            </div>
            <div class="left-2">
               <!-- <img src="../assets/head.jpg" alt="假装有头像" />  -->
              <img :src="item.headimg" alt="假装有头像" />
              <span class="teamlogo" :class="item.camp === 1 ? 'teamspan1' : 'teamspan2'"></span>
            </div>
            <div class="left-3">
              <p class="name">{{item.yfNick}}</p>
              <p class="text">仓位：<span>{{item.position}}%</span></p>
            </div>
            <div class="left-4">
              <span :class="{bluecolor:(item.rate < 0)}">{{ item.rate | toRate }}%</span>
            </div>
          </router-link>
        </ul>
		    <y-pagination :status="pullStatus" v-on:pull="handlePull"></y-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Navlist from '@/components/nav'
import YPagination from '@/components/Pagination'
import Api from '@/utils/Api'
import { toRate } from '@/utils/Filters'

export default {
  name: 'index',
  data () {
    return {
      groupList: [
        {title: '总排行', name: 'sum'},
//      {title: '月排行', name: 'month'},
//      {title: '周排行', name: 'week'},
        {title: '日排行', name: 'day'}
      ],
      group: 'sum',
      page: 1,
      num: 20,
      items: [],
      pullStatus: 0
    }
  },
  created: function () {
    if (this.teamData === null) {
      this.getTeamData()
    }
    this.api = new Api()
    this.loadData(this.group)
  },
  methods: {
//  开发获取数据有误的信息提示
    open (msg) {
      this.$notify({
        title: '提示',
        message: msg,
        duration: 0
      })
    },
//  获取后台数据方法
    loadData: function (group, page = 1, isAppend = false) {
      let params = {}
      params.group = group
      params.page = page
      params.num = this.num
      this.pullStatus = 1
      this.api.get('/Rank/List', params).then(resp => {
        this.page = page
        this.group = group
        this.pullStatus = resp.length < this.num ? 2 : 0
        this.items = isAppend ? this.items.concat(resp) : resp
      }).catch(error => {
//      todo错误提示
        this.pullStatus = 0
        this.open(error.message)
      })
    },
    handlePull () {
      this.loadData(this.group, this.page + 1, true)
    },
//  跳转路由
    go: function (path) {
      this.$router.push({ path: path })
    },
    switchGroup: function (group) {
      if (group !== this.group) {
        this.loadData(group, 1, false)
      }
    },
    ...mapActions(['getTeamData'])
  },
  filters: {
    toRate
  },
  computed: {
    hrhonors () {
      return this.teamData ? this.teamData.honors[0] : 0
    },
    yfhonors () {
      return this.teamData ? this.teamData.honors[1] : 0
    },
    ...mapState({
      teamData: state => state.team.data
    })
  },
  components: {
    Navlist,
    YPagination
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul,li { list-style: none;}
  .wrap {width: 25%; float: left; position: relative; height: 2.84rem;}
  
  .contain { background: #ff6600; background: #ff6501; padding-bottom: 0.25rem; height: 100vh;}
  /*head样式*/
  .main-top {border-bottom: 0.02rem solid #f57f42; height: 0.9rem; padding-left: 2.15rem; padding-top:1.75rem ; background: url(../assets/team-head.jpg) no-repeat; background-size: cover; font-size: 0;}
  .main-top p { width: 3.2rem; height: 0.77rem; border-radius: 35px;}
  .pkwrap { height: 1.49rem; padding-top: 0.2rem; padding-bottom: 0.21rem;}
  .pkwrap .pk { height: 100%;  background: url(../assets/pk.png) no-repeat; background-size: cover; display: flex; }
  .pk .pk-left { flex: 1; padding-left: 0.75rem;}
  .pk .pk-right { flex: 1; padding-right: 0.75rem; text-align: right;}
  .pk .pk-title { color: #FFFFFF; font-size: 0.2rem;padding-top: 0.4rem;}
  .pk .pk-num { color: #f8ff00; font-size: 0.26rem; line-height: 0.42rem;}
  .pk .pk-num1 {width:1.6rem; text-align: center;}
  .pk .pk-num2 {width:1.6rem; float: right; text-align: center;}
  .paihang {}
  .paihang .paihang-top { height: 1.1rem;  background: url(../assets/paihang-top.png) no-repeat; background-size: cover; padding: 0 0.6rem;}
  .paihang-top ul {height: 100%; display: flex; }
  .paihang-top ul li { flex: 1; text-align: center; line-height:1.1rem;}
  .paihang .paihang-detail { padding: 0 0.55rem; background: #ff6501; padding-bottom: 0.55rem;}
  .paihang .paihang-detail ul {background: #FFFFFF; padding-bottom: 0.18rem; padding-top: 0.25rem;}
  .paihang .paihang-detail ul a  {display: flex; border-bottom: 1px dashed #e1d3c6; }
  .paihang .paihang-detail ul a:nth-child(1) {background: #fef6e1; }
  
  .paihang-detail ul a .left-1 { width: 0.74rem; padding-top: 0.32rem; padding-left: 0.28rem; height: 0.92rem;  }
  ul a .left-1 span { display: block; width: 0.5rem; height: 0.6rem; color: #b27532; text-align: center;  line-height:0.5rem;}
  ul a:nth-child(1) .left-1 span {background: url(../assets/paihang-1.png) no-repeat; background-size: cover; color: #FFFFFF;}
  ul a:nth-child(2) .left-1 span {background: url(../assets/paihang-2.png) no-repeat; background-size: cover; color: #FFFFFF;}
  ul a:nth-child(3) .left-1 span {background: url(../assets/paihang-3.png) no-repeat; background-size: cover; color: #FFFFFF;}
  
  .paihang-detail ul a .left-2 { width: 0.88rem; padding-top: 0.2rem; position: relative;}
  .paihang-detail ul a .left-2  img { width: 0.88rem; height: 0.88rem; border-radius: 0.5rem;}
  .paihang-detail ul a .left-2  span {width: 0.31rem; height: 0.31rem; right: 0; top: 0.11rem; border-radius: 0.5rem; position: absolute;}
  .teamspan2 { background: url(../assets/yifuheadlogo.png) no-repeat; background-size: cover;}
  .teamspan1 { background: url(../assets/zhongyingheadlogo.png) no-repeat; background-size: cover;}
  .paihang-detail ul a .left-3 {flex: 1; padding-top: 0.18rem;}
  a .left-3 .name { line-height: 0.4rem; color: #a8743b;  text-indent: 0.14rem;}
  a .left-3 .text { padding-top: 0.1rem;color: #e4bb8d; text-indent: 0.16rem;}
  a .left-4 { padding-top: 0.28rem; padding-right: 0.2rem;} 
  a .left-4  span {float: left; min-width: 0.8rem; text-align: center; border: 0.02rem solid #fe0000; border-radius: 0.25rem; padding: 0.16rem  0.22rem; color: #fe0000;}
  a { text-decoration: none;} 
  .mycolor { color: #FFFFFF;}
  .bluecolor { color: #47BB51 !important; border-color: #47BB51 !important;}
  /*.active2 { color: red;}*/
</style>

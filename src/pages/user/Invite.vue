<template>
  <div class="contain">
    <div class="share" v-show='shareflag'>
      <img @click="share" src="../../assets/share.png"/>
    </div>
    <y-top title="我的邀请"></y-top>
    <div class="inspire-bj"></div>
    <div class="inspire-btn">
      <p class="detail">每邀请1个好友成功参赛，即可获得</p>
      <div class="award-detail">
        <div class="div1">
          <p class="p1">20<b>元</b></p>
          <p class="p2">现金奖励</p>
        </div>
        <span>+</span>
        <div class="div2">
          <p class="p1">30</p>
          <p class="p2">荣誉值</p>
        </div>
        <span>+</span>
        <div class="div3">
          <p class="p1">好友获得</p>
          <p class="p2">5<b>元</b></p>
          <p class="p3">现金奖励</p>
        </div>
      </div>
      <a class="btn-icon" @click="share" href="javascript:;">立即邀请，拿奖励</a>
      <div class="img-wrap">
      	<img src="../../assets/yifuerweima.png" alt="" />
      	<p class="erweima-text">领取奖励请识别此二维码</p>
      </div>
    </div>
    <el-row>
      <el-col :span="24"><div class="nav-content">邀请记录（{{ authUser.invites | toNumber }}）</div></el-col>
    </el-row>
    <ul class="ul-list">
      <li v-for='item in items'>
        <div class="li-left">
          <img :src="item.headimg" alt="假装此处有头像"/>
        </div>
        <div class="li-center">
          <p class="detail" v-text='item.inviteNick'></p>
          <p class="time">{{ item.created | toDateTime }}</p>
        </div>
        <y-inspire :id="item.inspireUserid" :num="item.inspires" :isForbidden="item.status != 2" :status="item.inspireStatus"></y-inspire>
      </li>
    </ul>
    <y-pagination :status="pullStatus" v-on:pull="handlePull"></y-pagination>
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import Api from '@/utils/Api'
import YInspire from '@/components/user/Inspire'
import YPagination from '@/components/Pagination'
import Weixin from '@/utils/Weixin'
import Constant from '@/utils/Constant'
import { toNumber, toDateTime } from '@/utils/Filters'

export default {
  name: 'invite',
  data () {
    return {
      shareflag: false,
      flag: false,
      items: [],
      page: 1,
      num: 20,
      pullStatus: 0
    }
  },
  created: function () {
    this.api = new Api()
    this.loadData()
    Weixin.initShare({
      title: '华富杯实盘大赛等你来战！',
      desc: '佣金仅万2.5，首创战队pk模式，现金大奖周周领！奖品多多、抢占先机、先到先得',
      imgUrl: location.origin + Constant.PUBLIC_PATH + 'static/share-hf.jpg',
      link: location.origin + Constant.PUBLIC_PATH + '?invite=' + this.authUser.id,
      callback: function () {
        this.shareflag = false
      },
      cancelCallback: function () {
        this.shareflag = false
      }
    })
  },
  methods: {
    share: function () {
      this.shareflag = !this.shareflag
    },
    moreinfo: function () {
      this.loadData(this.page + 1)
    },
    go: function (path) {
      this.$router.push({ path: path })
    },
    loadData (page = 1, isAppend = false) {
      const params = {
        token: this.authToken,
        page: page,
        num: this.num
      }
      this.pullStatus = 1
      this.api.get('User/Invite', params).then(resp => {
//      resp = [
//           {id: 1, inviteUserid: 6, headimg: '../../assets/headimg.png', inspires: 2000, InspireStatus: 0, status: 0, inviteNick: '唐俊豪', created: 1492355022000},
//           {id: 2, inviteUserid: 5, headimg: '../../assets/headimg.png', inspires: 100, InspireStatus: 1, status: 1, inviteNick: '孙颜颜', created: 1492355022000},
//           {id: 3, inviteUserid: 4, headimg: '../../assets/headimg.png', inspires: 50, InspireStatus: 2, status: 2, inviteNick: '卢超', created: 1492355022000},
//           {id: 4, inviteUserid: 3, headimg: '../../assets/headimg.png', inspires: 1, InspireStatus: 1, status: 3, inviteNick: '田士恩', created: 1492355022000},
//           {id: 5, inviteUserid: 2, headimg: '../../assets/headimg.png', inspires: 90, InspireStatus: 2, status: 4, inviteNick: '孙艳艳', created: 1492355022000},
//           {id: 6, inviteUserid: 1, headimg: '../../assets/headimg.png', inspires: 100, InspireStatus: 0, status: 0, inviteNick: '杨德龙', created: 1492355022000}
//      ]
        this.pullStatus = resp.length < this.num ? 2 : 0
        this.items = isAppend ? this.items.concat(resp) : resp
        this.page = page
      }).catch(error => {
        this.pullStatus = 0
        console.log(error)
      })
    },
    handlePull () {
      this.loadData(this.page + 1, true)
    }
  },
  filters: {
    toNumber,
    toDateTime
  },
  computed: {
    ...mapState({
      authUser: state => state.user.data,
      authToken: state => state.user.token
    })
  },
  components: {
    YInspire,
    YPagination
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contain {background: #FFFFFF; height: 100%; position: relative;}
  .share { height: 100vh; position: absolute; width: 100%; top: 0; z-index: 999;}
  .share img { width: 100%; height: 100%;}
  .contain .inspire-bj {height: 3.42rem; background:url(../../assets/inspirelink-bj.jpg) no-repeat; background-size: cover;}
  .contain .inspire-btn {  background: #f3cc43;}
  .inspire-btn .detail { padding-top: 0.16rem; text-align: center;font-size: 0.24rem; color: #990100;}
  .inspire-btn .award-detail { padding:0.1rem 1.11rem; overflow: hidden;}
  .award-detail div {display: block; float: left; width: 1.36rem; height: 1.36rem; border: 0.02rem solid #e2342d; border-radius: 50%;}
  .award-detail span {display: block;float: left; color: #FFFFFF; width: 0.36rem; height: 0.36rem; line-height: 0.31rem; background: #e22a2c; border-radius: 50%; text-align: center;
            margin: 0 0.08rem; margin-top: 0.55rem;}
  .award-detail div p {text-align: center; font-weight: 700;}
  .award-detail div .p1{font-size: 0.36rem; color: #e12a2c; margin-top: 0.36rem;}
  .award-detail .div1 .p1 b{font-size: 0.14rem;}
  .award-detail div .p2{font-size: 0.14rem;color: #e12a2c;}
  .award-detail .div3 p { color: #e12a2c;}
  .award-detail .div3 .p1{ font-size: 0.10rem; margin-top: 0.22rem;}
  .award-detail .div3 .p2 { font-size: 0.34rem;}
  .award-detail .div3 .p2 b { font-size: 0.12rem;}
  .inspire-btn .btn-icon { display: block; margin: 0.09rem auto; margin-bottom: 10px; width: 3.37rem; height: 0.67rem; background: url(../../assets/inspire_button.png) no-repeat;
              background-size: cover; line-height: 0.67rem ; text-align: center; text-decoration: none; font-size: 0.3rem; color: #ffff01; font-weight: 700;}
  .inspire-btn  .img-wrap img { display: block;	width: 1.79rem ; height: 1.79rem; margin: 0 auto; }
  .inspire-btn  .img-wrap .erweima-text { text-align: center; line-height: 0.44rem; font-size: 12px; color: #643501; padding-bottom: 10px;}
  
  
  .nav-content {height: 0.97rem; background: #e12a2c; color: #feffff; line-height: 0.97rem; padding: 0 0.26rem; font-size: 0.31rem;}  
  .ul-list li {display: flex; padding: 0 0.24rem; padding-top: 0.3rem; border-bottom: 1px solid #e6cfaf;}
  .ul-list li .li-left {width: 1rem;}
  .ul-list li .li-left img { display: block; width: 0.8rem; height: 0.8rem; border-radius: 50%; }
  .ul-list li .li-center {flex: 1;}
  .ul-list li .li-center p {color: #a87438; font-size: 0.3rem;}
  .ul-list li .li-center .time { line-height: 0.48rem; padding-bottom: 0.1rem; font-size: 0.16rem;}
  .ul-list li .li-right {padding-top: 0.1rem;}
  .li-right .right-inner { height:0.56rem; border: 1px solid #fe0000; border-radius: 15px; float: right;}
  .right-inner .inner-left { width: 0.36rem; height: 0.40rem; float: left; padding: 0.05rem 0.15rem;}
  .right-inner .inner-left img { width: 0.36rem; height: 0.40rem; }
  /*适应iphone5,此处最大的宽度1.6rem*/
  .right-inner .inner-right { width: 1.6rem; float: right; padding-top: 0.15rem; padding-right: 0.1rem; color: #ff0100;}
  .grid-content { text-align: center; display: block; line-height: 0.88rem;}
</style>

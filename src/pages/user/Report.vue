<template>
  <div class="contain">
    <y-top title="我的战报"></y-top>
    <el-row>
      <el-col :span="24"><div class="nav-content">我的战报（{{ total | toNumber }}）</div></el-col>
    </el-row>
    <ul class="ul-list">
      <li v-for='item in items' class="report-list">
        <p class="timer"><span>{{item.created | toDate}}</span>战报</p>
        <div class="rank">
          <div class="rank1">
            <p class="p1">{{item.rank | toNumber }}</p>
            <p class="p2">排名</p>
          </div>
          <div class="empty"></div>
          <div class="rank2">
            <p class="p1">{{item.rate | toNumber }}%</p>
            <p class="p2">当日收益</p>
          </div>
          <div class="empty"></div>
          <div class="rank3">
            <p class="p1">{{item.position | toNumber}}%</p>
            <p class="p2">仓位</p>
          </div>
        </div>
        <div class="info">
          <p class="info1">日终资产 : <span >{{ item.totalassets | toNumber }}元</span>日出入金 : <span>{{ item.withdraw | toNumber }}元</span></p>
          <div class="info2">
            <div class="now">当前持股 :</div>
            <div class="nowinfo">
            	<div v-if="item.holdstock === ''">空仓</div>
              <div v-else v-for='detail in item.holdstock.split(",")'>{{ detail }}</div>
            </div>  
          </div>
        </div>
      </li>
    </ul>
    <y-pagination :status="pullStatus" v-on:pull="handlePull"></y-pagination>
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import YPagination from '@/components/Pagination'
import Api from '@/utils/Api'
import { toNumber, toDateTime, toDate } from '@/utils/Filters'

export default {
  name: 'userreport',
  data () {
    return {
      total: 0,
      page: 1,
      num: 20,
      items: [],
      pullStatus: 0
    }
  },
  created: function () {
    this.api = new Api()
    this.loadData()
  },
  filters: {
    toNumber,
    toDateTime,
    toDate
  },
  methods: {
    loadData (page = 1, isAppend = false) {
      const params = {
        token: this.authToken,
        page: page,
        num: this.num
      }
      this.pullStatus = 1
      this.api.get('User/Info', params).then(resp => {
        this.pullStatus = resp.data.length < this.num ? 2 : 0
        this.page = page
        this.items = isAppend ? this.items.concat(resp.data) : resp.data
        this.total = resp.total
      }).catch(error => {
        this.pullStatus = 0
        console.log(error)
      })
    },
    handlePull () {
      this.loadData(this.page + 1, true)
    },
    go: function (path) {
      this.$router.push({ path: path })
    }
  },
  computed: {
    ...mapState({
      authUser: state => state.user.data,
      authToken: state => state.user.token
    })
  },
  components: {
    YPagination
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contain {background: #fef6e1; height: 100%;}
  .nav-content {height: 0.97rem; background: #e12a2c; color: #feffff; line-height: 0.97rem; padding: 0 0.26rem; font-size: 0.31rem;}
  .ul-list { border-bottom: 0.02rem solid #fef6e1;}
  .report-list {padding: 0 0.4rem; background: #FFFFFF; margin-bottom: 0.09rem;}
  .report-list .timer { border-bottom: 0.01rem dashed #e8cfb1; line-height: 0.53rem; color: #b3804b; font-size: 12px;}
  .report-list .rank { height: 1.03rem; border-bottom: 0.01rem dashed #e8cfb1;}
  .rank div { width: 33%; float: left; height: 100%; }
  .rank .empty { width: 0; border-right: 0.01rem solid #e6cfaf; height: 0.3rem; margin-top: 0.3rem;}
  .rank div p { text-align: center; font-weight: 600; line-height: 0.36rem;}
  .rank div .p1 { color: #e22a2a; font-size: 16px; padding-top: 0.19rem;}
  .rank div .p2 { color: #c6a989; font-size: 12px;}
  .info { padding-top: 0.06rem; overflow: hidden;}
  .info .info1 {line-height: 0.4rem; color: #b27f4a;}
  .info .info1 span { margin-right: 0.15rem;}
  .info .info2 { overflow: hidden; display: flex; padding-top: 0.11rem; font-size: 12px; color: #b27f4a; padding-bottom: 0.08rem;}
  .info .info2 .now {padding-top: 0.10rem;}
  .info .info2 .nowinfo { flex: 1;}
  .info .info2 .nowinfo div {padding: 0.09rem 0.11rem; border: 0.01rem solid #b27f4a; float: left; border-radius: 0.1rem; margin-bottom: 0.1rem; margin-left: 0.12rem;}
  /*.info .info2 .nowinfo div{border: 1px solid;  }*/
  
</style>

<template>
  <div class="contain">
    <y-top title="我的鼓舞"></y-top>
    <el-row>
      <el-col :span="24"><div class="nav-content">鼓舞记录（{{ authUser.inspires }}）</div></el-col>
    </el-row>
    <ul class="ul-list">
      <li class="list-li" v-for='item in items'>
        <div class="li-left">
          <img :src="item.headimg"/>
        </div>
        <div class="li-center">
          <p class="detail" v-text='item.inspireNick'></p>
          <p class="time">{{ item.created | toDateTime }}</p>
        </div>
        <div class="li-right">
          <y-inspire :id="item.inspireUserid" :num="item.inspires" :isForbidden="item.status != 2" :status="item.inspireStatus"></y-inspire>
        </div>
      </li>
    </ul>
    <y-pagination :status="pullStatus" v-on:pull="handlePull"></y-pagination>
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import YInspire from '@/components/user/Inspire'
import YPagination from '@/components/Pagination'
import Api from '@/utils/Api'
import { toDateTime } from '@/utils/Filters'

export default {
  name: 'inspire',
  data () {
    return {
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
  methods: {
    loadData (page = 1, isAppend = false) {
      const params = {
        token: this.authToken,
        page: page,
        num: this.num
      }
      this.pullStatus = 1
      this.api.get('/User/InspireList', params).then(resp => {
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
    toDateTime
  },
  computed: {
    more () {
      return this.isLoading ? '载入中' : '加载更多'
    },
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
  .contain {background: #FFFFFF; height: 100%;}
  .nav-content {height: 0.97rem; background: #e12a2c; color: #feffff; line-height: 0.97rem; padding: 0 0.26rem; font-size: 0.31rem;}  
  .ul-list li {display: flex; padding: 0 0.24rem; padding-top: 0.3rem; border-bottom: 1px solid #e6cfaf;}
  .ul-list li .li-left {width: 1rem;}
  .ul-list li .li-left img { display: block; width: 0.8rem; height: 0.8rem; border-radius: 50%; }
  
  .ul-list li .li-center {flex: 1;}
  .ul-list li .li-center p {color: #a87438; font-size: 0.3rem;}
  .ul-list li .li-center .time { line-height: 0.48rem; padding-bottom: 0.1rem; font-size: 0.16rem;}
  .ul-list li .li-right {padding-top: 0.1rem;}
  .li-right .right-inner { height:0.56rem; border-radius: 15px; float: right;}
  .border0 { border: 1px solid #DCDCDC; }
  .border1 { border: 1px solid #FF9A39; }
  .border2 { border: 1px solid #fe0000; }
  .fontcolor0 {color: #DCDCDC; }
  .fontcolor1 {color: #FF9A39; }
  .fontcolor2 {color: #fe0000; }
  
  
  .right-inner .inner-left { width: 0.36rem; height: 0.40rem; float: left; padding: 0.05rem 0.15rem;}
  .right-inner .inner-left img { width: 0.36rem; height: 0.40rem; }
  /*适应iphone5,此处最大的宽度1.6rem*/
  .right-inner .inner-right { width: 1.6rem; float: right; padding-top: 0.15rem; padding-right: 0.1rem; color: #ff0100;}
  
  .grid-content { text-align: center; display: block; line-height: 0.88rem;}
</style>

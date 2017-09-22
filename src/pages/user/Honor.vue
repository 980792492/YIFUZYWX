<template>
	<div class="contain">
		<y-top title="我的荣誉值"></y-top>
		<el-row>
		  <el-col :span="24"><div class="nav-content">荣誉值（{{ authUser.honors | toNumber }}）<a class="only" @click='toggle' href="javascript:void(0)">{{ title }}</a></div></el-col>
		</el-row>
		<ul class="ul-list">
			<li v-for='item in items'>
				<div class="li-left">+{{item.honor}}</div>
				<div class="li-right">
					<p class="detail" v-text='item.msg'></p>
					<p class="time" v-text=''>{{ item.created | toDateTime }}</p>
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
import { toNumber, toDateTime } from '@/utils/Filters'

export default {
  name: 'userhonor',
  data () {
    return {
      isToday: false,
      page: 1,
      num: 20,
      items: [],
      pullStatus: 0    // 下拉分页状态 0: 加载更多 1: 载入中 2: 没有下页
    }
  },
  created: function () {
    this.api = new Api()
    this.loadData()
  },
  methods: {
    toggle () {
      this.isToday = !this.isToday
    },
    loadData (page = 1, isToday = false, isAppend = false) {
      const params = {
        token: this.authToken,
        today: isToday ? 1 : 0,
        page: page,
        num: this.num
      }
      this.pullStatus = 1
      this.api.get('User/Honor', params).then(resp => {
        this.page = page
        this.pullStatus = resp.length < this.num ? 2 : 0
        this.items = isAppend ? this.items.concat(resp) : resp
      }).catch(error => {
        this.pullStatus = 0
        console.log(error)
      })
    },
    handlePull () {
      this.loadData(this.page + 1, this.isToday, true)
    },
    go: function (path) {
      this.$router.push({ path: path })
    }
  },
  filters: {
    toNumber,
    toDateTime
  },
  watch: {
    isToday (flag) {
      this.loadData(1, flag, false)
    }
  },
  computed: {
    title () {
      return this.isToday ? '查看全部' : '只看今日'
    },
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
	.contain {background: #FFFFFF; height: 100%;}
	.nav-content {height: 0.97rem; background: #e12a2c; color: #feffff; line-height: 0.97rem; padding: 0 0.26rem; font-size: 0.31rem;}
	.nav-content .only {display: block; width: 20%; float: right; text-decoration: none; color: #FFFBFF;}
	.ul-list li {display: flex; padding: 0 0.24rem; padding-top: 0.48rem; border-bottom: 0.01rem solid #e6cfaf;}
	.ul-list li .li-left {width: 1.8rem; color: #de2a2d; font-size: 0.38rem; font-weight: 600;}
	.ul-list li .li-right {flex: 1;}
	.ul-list li .li-right p { text-align: right;color: #a87438; font-size: 0.3rem;}
	.ul-list li .li-right .time { line-height: 0.48rem; padding-bottom: 0.1rem;}
</style>

<template>
	<div class="contain">
		<y-top title="用户登录"></y-top>
		<div class="main-top">
			<img class="home_btn" @click="go('/')" src="../assets/homebtn.png"/>
      		<p @click="go('/user/usercenter')" ></p>
		</div>
		<navlist></navlist>
		<div  class="award">
			<div class="big-award"></div>
			<div class="part-in-award"></div>
			<div class="popular-award"></div>
			<!--<div class="week-award"></div>-->
			<!--<div class="month-award"></div>-->
			<div class="within-team-award"></div>		
		</div>
	</div>
</template>

<script>
import Navlist from '@/components/nav'
export default {
  name: 'award',
  data () {
    return {
      msg: 'msg'
    }
  },
  methods: {
    go: function (path) {
      this.$router.push({path: path})
    }
  },
  components: {
    Navlist
  }
}
</script>

<style scoped>
	ul,li { list-style: none;}
	.contain { background: #ff6600;}
	/*head样式*/
	.main-top { position: relative; border-bottom: 0.02rem solid #f57f42; height: 0.9rem; padding-left: 2.15rem; padding-top:1.75rem ; background: url(../assets/team-head.jpg) no-repeat; background-size: cover; font-size: 0;}
	.main-top .home_btn { position: absolute; top: 0.2rem; left: 0.14rem; width: 0.6rem; height: 0.6rem;}
	.main-top >p  { width: 3.2rem; height: 0.77rem; border-radius: 35px;}	
	/*奖项设置模块的样式*/
	.award { width: 100%; background: #ff6501;}
	.award .big-award { height: 4.17rem ; background: url(../assets/team-big-award.jpg) no-repeat; background-size: cover;}
	.award .part-in-award { height: 2.29rem; background:url(../assets/partin-award.jpg) no-repeat; background-size: cover; }
	.award .popular-award { height: 3.09rem; background: url(../assets/popular-award.jpg) no-repeat; background-size: cover;}
	.award .week-award {height: 4.14rem; background: url(../assets/week-award.jpg) no-repeat; background-size: cover;}
	.award .month-award {height: 4.15rem; background: url(../assets/mouth-award.jpg) no-repeat; background-size: cover;}
	.award .within-team-award { height: 5.24rem; background: url(../assets/within-team-award.jpg) no-repeat; background-size: cover;}
</style>

<template>
	<div class="contain">
		<y-top title="用户登录"></y-top>
		<div class="main-top">
			<img class="home_btn" @click="go('/')" src="../assets/homebtn.png"/>
      		<p @click="go('/user/usercenter')" ></p>
		</div>
		<navlist></navlist>
		<div class="rule">
			<div class="rule-plan"></div>
			<div class="rule-timer"></div>
			<div class="plan-next">
				
				<div class="quality"></div>
				<div class="quali-text">
					<div class="left">
						<span>1</span>
					</div>
					<p>参赛者保证具有符合法律规定的证券投资入市条件和证券投资资格，遵守国家法律法规、证券监管部门、证券交易所、券商及主办方的相关法律及风险控制规定，不得使用证券账户参与任何非法、违规交易。</p>
				</div>
				<div class="quali-text">
					<div class="left">
						<span>2</span>
					</div>
					<p>参赛选手必须在中银证券指定营业部成功开设有效合格账户（包括已在中银证券指定营业部拥有股票账户、新开设股票账户）。中银证券对此条所涉及的第三方存管银行、佣金费率、开户费用享有最终解释权；</p>
				</div>
				<div class="quali-text">
					<div class="left">
						<span>3</span>
					</div>
					<p>参加实盘组比赛的选手股票账户日终清算后人民币总资产（资金及股票、权证、基金、国债等所有证券的总市值）≥1000元；</p>
				</div>
				<div class="quali-text">
					<div class="left">
						<span>4</span>
					</div>
					<p>比赛期间，参赛选手至少要有六次操作记录才算成绩有效，确认参赛后不足六次交易记录者不纳入比赛排名。</p>
				</div>
				<div class="kind"></div>
				
				<div class="quali-text">
					<div class="left">
						<span>1</span>
					</div>
					<p>比赛账户可正常操作，不设置仓位限制及交易品种，但比赛成绩只计算选手账户内的A股（含中小板和创业板）。IPO申购中签后不再参与比赛排名，增发上市首日的收益不计入成绩。</p>
				</div>
				<!--<div class="quali-text">
					<div class="left">
						<span>2</span>
					</div>
					<p>参赛选手必须在中银证券指定营业部成功开设有效合格账户（包括已在中银证券指定营业部拥有股票账户、新开设股票账户）。中银证券对此条所涉及的第三方存管银行、佣金费率、开户费用享有最终解释权；</p>
				</div>
				<div class="quali-text">
					<div class="left">
						<span>3</span>
					</div>
					<p>参加实盘组比赛的选手股票账户日终清算后人民币总资产（资金及股票、权证、基金、国债等所有证券的总市值）≥1000元；</p>
				</div>
				<div class="quali-text">
					<div class="left">
						<span>4</span>
					</div>
					<p>比赛期间，参赛选手至少要有六次操作记录才算成绩有效，确认参赛后不足六次交易记录者不纳入比赛排名。</p>
				</div>-->
				
			</div>
			<div class="btn-up">
				<a href="javascript:void(0)" @click="goup"></a>
			</div>
		</div>
	</div>
</template>

<script>
import Navlist from '@/components/nav'
export default {
  name: 'rule',
  data () {
    return {
      msg: 'msg'
    }
  },
  computed: {
    colorheight: function (type) {
      return !this.type1
    }
  },
  methods: {
    go: function (path) {
      this.$router.push({ path: path })
    },
    goup: function () {
      document.body.scrollTop = 0
    }
  },
  components: {
    Navlist
  }
}
</script>

<style scoped>
	.contain { background: #ff6600;}
	/*head样式*/
	.main-top {position: relative; border-bottom: 0.02rem solid #f57f42; height: 0.9rem; padding-left: 2.15rem; padding-top:1.75rem ; background: url(../assets/team-head.jpg) no-repeat; background-size: cover; font-size: 0;}
	.main-top .home_btn { width: 0.6rem; height: 0.6rem; position: absolute; top: 0.2rem; left: 0.14rem;}
	.main-top > p { width: 3.2rem; height: 0.77rem; border-radius: 35px;}
	/*导航菜单样式*/
	nav {height: 1.21rem;  background: #e52e32;}
	.nav-ul { width: 100%; height: 100%; display: flex; display: -webkit-flex;}
	.nav-ul li { flex: 1; text-align: center; border-bottom: 0.05rem solid #bc0a16;}
	.nav-ul li:nth-child(2) { border-color: #7e0202;}
	.normal { color: #eb7a2a;}
	.height { color: #FFFFFF;}
	
	
	
	
	
	/*.nav-ul li p { }*/
	/*比赛规则模块样式*/
	.rule { width: 100%; background: #fbea82;}
	.rule .rule-timer { height: 1.8rem; background: url(../assets/rule-timer.jpg) no-repeat; background-size: cover;}
	.rule-plan { height: 1.19rem; background: url(../assets/rule-plan.jpg) no-repeat; background-size: cover;}
	.rule .plan-next { padding: 0 0.44rem; overflow: auto; padding-bottom: 0.5rem;}
	.plan-next .plan-next-1,.plan-next .plan-next-2,.plan-next .plan-next-3 {margin-bottom: 0.15rem; display: flex; height: 0.9rem; padding-top: 0.1rem; background: #e64f3e; border-radius:0.5rem ; padding-left: 0.1rem; }
	.next-left { width: 0.8rem; height: 0.8rem; background: #b82e23; border-radius:0.5rem; line-height: 0.8rem; color: #ffebb9;text-align: center; font-size: 0.24rem; }
	.next-right { flex: 1;}
	.next-right>p { text-indent: 0.24rem;}
	.next-right .p1 { color: #fccd05; line-height: 0.38rem; font-size: 0.32rem;}
	.next-right .p2 { color: #FFFFFF; line-height: 0.44rem; font-size: 0.22rem;}
	.plan-next .down-empty { margin: 0 auto; width: 0; height: 0; border-top:0.2rem solid #bc800e; border-right:0.3rem solid transparent ; border-left: 0.3rem solid transparent ;
							 border-bottom: 0rem solid transparent; margin-bottom: 0.1rem; }
		/*参赛资格*/
	.plan-next .quality {height: 1.13rem; background: url(../assets/rule-2.jpg) no-repeat; background-size: cover;}
	 /*参赛资格text*/  
	.quali-text { display: flex; margin-bottom: 0.16rem;} 
	.quali-text .left { width:0.3rem; }
	.quali-text .left span { display: block; width: 0.3rem; height: 0.3rem; border-radius: 50%; color:#FFFFFF; background: #9e6c23; text-align: center; line-height: 0.3rem;}
	.quali-text p { flex: 1; padding-left: 0.08rem; line-height: 0.3rem; color: #9b7719;}
		/*交易种类*/
	.plan-next .kind { height: 1.16rem; background: url(../assets/kind.jpg) no-repeat; background-size: cover;}
	.rule .btn-up { height: 0.75rem; padding-top: 0.1rem;}
	.rule .btn-up a { display: block; width: 0.44rem; height: 0.44rem ; background: url(../assets/icon-up.jpg) no-repeat; background-size: cover; float: right; margin-right: 0.2rem;}
</style>


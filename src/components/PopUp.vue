<template>
	<div class="popup_wrap" >
		<div class="pop">
			<div class="pop_top" :class=" status.camp == 1 ? 'zhongyingbj' : 'yifubj' ">
				<img v-if="status.camp == 1 " src="../assets/zhongying-pop.png" alt="" />
				<img v-else src="../assets/yifu_pop.png" alt="" />
				<span class="pop_close" @click="closePop"></span>
				
			</div>
			<div class="pop_text" :class=" status.camp == 1 ? 'zhongyingbj' : 'yifubj' ">{{status.msg}}</div>
			<div class="pop_pic">
				<img src="../assets/zhanduijinagli.png"/>
			</div>
			<div class="pop_btn">
				<button :class="status.camp == 1 ? 'zhongyingbj' : 'yifubj' " @click="ensure()">{{status.btn}}</button>
			</div>
		</div>
		<div v-show="showWarn" class="warning_wrap">
			<div class="warning">
				<div class="warning_title">确认阵营</div>
				<div class="warning_text">确认阵营后无法修改，您确认加入{{status.title}}吗？</div>
				<div class="warning_action"><button @click="action(false)">取消</button><button @click="action(true)">确认</button></div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'pop-up',
  data () {
    return {
      msg: '',
      showWarn: false
    }
  },
  created () {
  },
  updata () {
//  console.log(this.status)
  },
  methods: {
    closePop () {
      this.$emit('child', this.showWarn)
    },
    ensure () {
      this.showWarn = true
    },
    action (str) {
      this.showWarn = false
      if (str === true) {
        this.setApplyData({ camp: this.status.camp })
        this.go('/apply/joinagree')
      }
    },
    go (path) {
      this.$router.push({ path: path })
    },
    ...mapActions(['setApplyData'])
  },
  props: {
    status: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
	.zhongyingbj { background: #e43a3d!important;}
    .yifubj { background: #FF9910!important;}	
	
	.popup_wrap { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 99; background: rgba(0,0,0,0.4);}
	.pop { width: 6.6rem;padding-bottom: 15px; background: #FFFFFF; position: absolute; left: 50%; top: 50%; margin-left: -3.3rem; margin-top: -3.75rem;}
	
	.pop_top { height: 0.82rem; background: #e43a3d; text-align: center; position: relative;}
	.pop_top img { width: 1.48rem; height: 1.48rem; margin-top: -0.8rem;}
	.pop_top .pop_close {position: absolute; right: 13px; top: 12px; width: 15px; height: 15px; background: url(../assets/pop-close.png) no-repeat; background-size: cover;}
	
	
	
	.pop_text {background: #e43a3d; padding: 0 0.4rem; padding-bottom: 10px;  color: #FFFFFF; font-size: 12px;}
	
	.pop_pic { height: 4.24rem;}
	.pop_pic img { width: 100%; height: 4.24rem;}
	.pop_btn { padding: 0 0.4rem;}
	.pop_btn button { width: 100%; height: 0.6rem; border: none; background: #e43a3d; color: #FFFFFF;}
	
	
	.warning_wrap { height: 100vh; position: fixed; top: 0; left: 0; width: 100%; background: rgba(0,0,0,0.7); }
	.warning_wrap .warning { position: absolute; width: 6rem; padding-top: 0.18rem; height: 4.37rem; background: #FFFFFF; top: 50%; left: 50%; margin-left: -3rem; margin-top: -2.25rem; }
	.warning_title { height: 1.58rem; line-height: 1.58rem; text-align: center; font-size: 0.4rem; font-weight: 600; color: #666666;}
	.warning_text { line-height: 0.42rem; padding: 0 0.5rem; padding-bottom:1rem; border-bottom: 1px solid #CCCCCC; font-size: 0.3rem; color: #666666; font-weight: 600;}
	.warning_action button { width: 50%; height: 0.95rem; border: none; background: #FFFFFF; outline: none;}
	.warning_action button:nth-child(1){ border-right: 1px solid #CCCCCC;}
	
</style>

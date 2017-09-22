<template>
	<div class="contain">
		<y-top title="选择阵营"></y-top>
		<div class="player">
			<div class="player-inner1"></div>
			<div class="player-inner2"></div>
			<div class="player-inner3">
				<!--<a href="javascript:void(0)"><img class="huarong" src="../../assets/huarong.jpg" /></a>-->
				 <el-button class="mybutton" type="text" @click="open('hr')">
				 	<img class="huarong" src="../../assets/zhongying.jpg" />
				 </el-button>
			     <el-button class="mybutton2" type="text" @click="open('yf')">
			 	   <img class="yifu" src="../../assets/yifu.jpg" />
			     </el-button>
				<!--<a href="javascript:void(0)""><img class="yifu" src="../../assets/yifu.jpg"  /></a>-->

			</div>
				<!--<span @click="dianji">点击我</span>-->
		</div>
		<pop-up :status="data" v-show="showPop" @child="listen"></pop-up>
	</div>
</template>

<script>
// import { mapActions } from 'vuex'
import PopUp from '@/components/PopUp'

const camp = {
  'hr': {
    title: '中银骑士团',
    msg: '实力打造传奇 王者绝非偶然！中银骑士团旨在为投资者提供高质量、专业化、多元化的投资平台。冲锋陷阵!勇往直前!来吧！中银的骑士们！我们是什么?战士!我们干什么?战斗!我们要什么?胜利!',
    btn: '加入中银骑士团',
    camp: 1
  },
  'yf': {
    title: '一富兄弟会',
    msg: '情深似海，义薄云天，来者皆兄弟。一富兄弟会将秉承一富财经打造靠谱的投资者教育平台，一家人一起富的宗旨。欢迎八方高手汇集，分享投资心得，传播投资智慧。来吧，一富财经的兄弟姐妹们，战起来!',
    btn: '加入一富兄弟会',
    camp: 2
  }
}

export default {
  name: 'joinchoice',
  data () {
    return {
      showPop: false,
      data: {}
    }
  },
  created () {
    if (!this.$store.state.apply.realname || !this.$store.state.apply.customerid) {
      this.$router.replace('/apply/join')
    }
  },
  components: {
    PopUp
  },
  methods: {
    listen (data) {
      this.showPop = data
    },
    open (name) {
      this.showPop = !this.showPop
      const data = camp[name]
      this.data = data
    }
//  go: function (path) {
//    this.$router.push({ path: path })
//  }
//  open (name) {
//    const data = camp[name]
//    this.$alert(data.msg, data.title, {
//      confirmButtonText: data.btn,
//      customClass: 'my',
//      callback: action => {
//        if (action === 'cancel') {
//          alert('直接关闭')
//        } else if (action === 'confirm') {
//          this.$alert('选择阵营后无法修改，请确认加入' + data.title, '注意', {
//            customClass: 'my',
//            callback: action => {
//              if (action === 'cancel') {
//              } else if (action === 'confirm') {
//                this.setApplyData({ camp: data.camp })
//                this.go('/apply/joinagree')
//              }
//            }
//          })
//        }
//      }
//    })
//  },
//  ...mapActions(['setApplyData'])
  }
}
</script>

<style scoped>
	.contain {background: #FFFFFF; display: flex; display: -webkit-flex; flex-direction: column; height: 100vh;}
	p {padding: 0; margin: 0;}
	.top{background: #1c1c20; color: #fff; font-size: 0.3rem;}
	.top a {display: block; color: #fff; text-decoration: none;}
	.grid-content{text-align: center; min-height: 0.88rem; line-height: 0.88rem;}
	.margR{ margin-right:0.14rem ;}
	.player {flex: 1; -webkit-flex: 1; display: flex;flex-direction: column;  background: url(../../assets/join-choice-b-1.jpg) repeat-x; background-size: contain;}
	.player-inner1 { height: 1.16rem;  background: url(../../assets/join-choice.jpg) no-repeat; background-size: cover;}
	.player-inner2 { height: 0.59rem;  background: url(../../assets/join-choice-1.jpg) no-repeat; background-size: cover;}	
	.player-inner3 { flex: 1; -webkit-flex: 1; padding: 0 0.62rem;}
	.player-inner3 a {display: inline-block; border: 1px solid #e98496; overflow: hidden; -webkit-tap-highlight-color: rgba(0,0,0,0);}
	.player-inner3  .huarong {display: block; width: 2.98rem; height: 4.48rem;}
	.player-inner3  .yifu {display: block; width: 2.98rem; height: 4.48rem;}
	.player-inner3 a:nth-child(2){ float: right;}
	/*.player-inner1 p {height: 4.6rem; padding-left: 0.66rem; padding-right: 0.4rem;}
	.player-inner1 p a {display:block;width: 3.1rem;border: 1px solid; height: 100%;}
	.player-inner1 .huarong { float: left;}
	.player-inner1 .yifu {float: right;}*/
	.mybutton {padding: 0; border: 1px solid #e98496; outline: none;-webkit-tap-highlight-color: rgba(0,0,0,0); }
	.mybutton2 {padding: 0; border: 1px solid #e98496; float: right; margin-left: 0 !important; -webkit-tap-highlight-color: rgba(0,0,0,0); }
	
	.el-button:hover { border-color: #FFFFFF !important;}
	.el-button-text:active { color: #FFFFFF !important; -webkit-tap-highlight-color: rgba(0,0,0,0);}
	.el-message-box__close { -webkit-tap-highlight-color: rgba(0,0,0,0) !important;}
</style>

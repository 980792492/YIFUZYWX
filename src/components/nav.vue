<template>
　　<div>
　　　　<ul>
<!--　　　<li @click="go('/rule')"><img src="../assets/rule-image.png" /><p>比赛规则</p></li>
　　　　　　<li @click="go('/award')"><img src="../assets/rule-img2.png"/><p>奖项设置</p></li>
　　　　　　<li @click="go('/score')"><img src="../assets/rule-img3.png"/><p>战队战绩</p></li>
　　　　　　<li @click="go('/user/usercenter')"><img src="../assets/rule-img4.png"/><p>个人中心</p></li>-->
		<router-link  v-for="(item, index) in items" :to="{path:item.to}" :key="index">
			<img :src="require(`../assets/rule-${item.img}.png`)" /><p>{{item.name}}</p>
		</router-link>
　　　　</ul>
　　</div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      active: false,
      items: [
        {select: '比赛规则', img: 'image', name: '比赛规则', to: 'rule'},
        {select: '奖项设置', img: 'img2', name: '奖项设置', to: 'award'},
        {select: '战队战绩', img: 'img3', name: '战队战绩', to: 'score'},
        {select: '个人中心', img: 'img4', name: '个人中心', to: 'user/usercenter'}
      ]
    }
  },
  methods: {
    go: function (path) {
      this.$router.push({ path: path })
    },
    selectStyle (item) {
      console.log(item)
      this.$nextTick(function () {
        this.items.forEach(function (item) {
//        console.log(item)
          Vue.set(item, 'active', false)
        })
//      console.log(item)
        Vue.set(item, 'active', true)
      })
    }
  }
}
</script>

<!-- 样式 -->
<style scoped>
	ul,li { list-style: none;}
	ul { height: 1.21rem; border-bottom: 0.05rem solid #bd0a10; background: #e32d2f;}
	ul a {display: block; float: left; width: 25%; height: 1.07rem; text-align: center; color: #fdb233; padding-top: 0.14rem; text-decoration: none;}
	ul a img { width: 0.52rem; height: 0.56rem;}
	
	/*.router-link-active { color: #FFFFFF;}*/
	
</style>

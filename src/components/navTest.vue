<template>
　　<div>
　　　　<ul>
　　　　　　<li v-for="item in items"  @click="selectStyle(item) " :class="{'active1':item.active,'unactive1':!item.active}" >{{item.select}} 			
　　　　　　</li>
　　　　</ul>
　　</div>
</template>
<script>
import Vue from 'vue'
export default{
  data () {
    return {
      active: false,
      items: [
        {select: '比赛规则'},
        {select: '奖项设置'},
        {select: '战队战绩'},
        {select: '个人中心'}
      ]
    }
  },
  methods: {
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
	ul { display: flex; height: 1.21rem; border-bottom: 0.05rem solid #bd0a10;}
	ul li { flex: 1; height: 1.21rem; text-align: center;}
　
</style>

<template>
  <div class="four-pie">
    <div class="wrap" v-for="v in data">
      <y-pie v-bind:data="v.data"></y-pie>
      <!--<div class="paiming">中银<span v-text='v.data[0] | toNormalnum'></span></div>
      <div class="paiming1">一富<span v-text='v.data[1] | toNormalnum'></span></div>-->
      <div class="paiming">中银<span>{{v.data[0]}}</span></div>
      <div class="paiming1">一富<span>{{v.data[1]}}</span></div>
      <div class="add">
        <p class="p1">{{ v.name }}</p>           
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { toNormalnum } from '@/utils/Filters'
import YPie from '../canvas'

export default {
  created () {
    if (this.teamData === null) {
      this.getTeamData()
    }
  },
  methods: {
    ...mapActions([
      'getTeamData'
    ])
  },
  computed: {
    data () {
      let result = {
        honors: { name: '贡献值', data: [0, 0] },
        rate: { name: '收益率', data: [5, -1] },
        inspires: { name: '士气', data: [0, 0] },
        userNum: { name: '人数', data: [0, 0] }
      }
      if (this.teamData !== null) {
        result.honors.data = this.teamData.honors
        result.rate.data = this.teamData.rate
        result.inspires.data = this.teamData.inspires
        result.userNum.data = this.teamData.userNum
      }
      return result
    },
    ...mapState({
      teamData: state => state.team.data
    })
  },
  filters: {
    toNormalnum
  },
  components: {
    YPie
  }
}
</script>

<style scoped>
  /*四个饼图样式*/
  .four-pie { height: 2.2rem; }
  .four-pie .wrap { width: 24%; position: relative; height: 100%; float: left;}
  .four-pie .wrap .paiming, .four-pie .wrap .paiming1 { line-height: 0.4rem; font-size: 0.2rem; text-align: center; color: #a77538;}
  .four-pie .wrap .paiming { margin-top: -8px;}
  .four-pie .wrap .paiming1 {}
  .four-pie .wrap .paiming span { color: #d4000a;}
  .four-pie .wrap .paiming1 span { color: #ff6300;}
  
  
  .wrap .add{ position: absolute; top: 0.7rem; width: 100%;}
  
  
  
  
  .wrap .add p{ text-align: center;}
  .wrap .add .p1{ color: #a97635; font-size: 0.16rem; line-height: 0.76rem;}
  .wrap .add .p2{ color: #a97635; font-size: 0.24rem;}
  /*.contain .line-chart { padding-left: 12px;}*/
  /*.contain .line-chart .line-wrap { }*/
  /*.line-wrap  .contain { width: 100%;}*/
</style>

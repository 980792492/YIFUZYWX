<template>
  <div class="line-chart">
    <div class="line-wrap">
      <y-line v-bind:data1="data.data1" v-bind:data2="data.data2" v-bind:data3="data.x"></y-line>
    </div>
  </div>
</template>

<script>
import YLine from '../line'
import Api from '@/utils/Api'
import { toDate } from '@/utils/Filters'
export default {
  data () {
    return {
      data: {
        data1: [],
        data2: [],
        x: []
      }
    }
  },
  created () {
    const api = new Api()
    api.get('Rank/TeamDataDetail').then(resp => {
      let updateData = this.data
      for (var i in resp) {
        if (resp[i].camp === 1) {
          updateData.x.push(toDate(resp[i].date))
          updateData.data1.push(resp[i].honors)
        } else {
          updateData.data2.push(resp[i].honors)
        }
      }
      this.data = Object.assign({}, this.data, updateData)
    }).catch(error => {
      console.log(error)
    })
  },
  components: {
    YLine
  }
}
</script>

<style scoped>
    /*奖牌部分样式*/
  .contain .menu { height: 0.88rem; background: #c42209; position: relative;}
  .menu .menu-con { width: 100%; height: 0.88rem; position: relative;z-index: 2;}
  .menu-con p {background:rgba(202,56,31,0.8); overflow: hidden; padding-right: 0.68rem;}
  .overflow {overflow: hidden;}
  .menu-con p span {display: inline-block; height: 0.74rem; padding-top: 0.14rem; color: #FFFFFF; padding-left: 0.34rem;}
  .menu-con p span img { width: 0.49rem; height: 0.6rem; vertical-align: middle;}
  
  /*奖牌右侧按钮样式*/
  .menu .menu-direction { width: 0.6rem; height: 0.88rem; position: absolute; right: 0; top: 0;z-index: 9;}
  .menu .menu-direction span {display: block; width: 0.35rem; height: 0.35rem; border: 0.01rem solid #FFFFFF; border-radius:50%;text-align: center;line-height: 0.36rem;margin-top: 0.3rem; margin-left: 0.09rem; }
  .menu .menu-direction span i { color: #FFFFFF;}
</style>

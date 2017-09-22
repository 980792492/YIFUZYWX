<template>
  <div class="menu" v-show="items.length > 0">
    <div v-bind:class="{overflow: hiddenPull}" class="menu-con">
      <p>
        <span :id='item.id' v-for='item in items'>
          <img :src="require('../../assets/' + item.type + item.rank + '.png')"/>
          <em>{{ item | spilt }}</em>
        </span>
      </p>
    </div>
    <div v-show="items.length > 3" class="menu-direction" @click="pull">
      <span>
        <i :class="hiddenPull ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Api from '@/utils/Api'

export default {
  data () {
    return {
      hiddenPull: true,
      items: []
    }
  },
  created () {
    const api = new Api()
    //  获取个人中心的获奖记录
    api.get('/User/WinRank', { token: this.authToken }).then(resp => {
      // 模拟数据
//    resp = [
//         {id: '1', type: 'total', rank: 1, num: '1'},
//         {id: '2', type: 'total', rank: 2, num: '2'},
//         {id: '3', type: 'total', rank: 3, num: '3'},
//         {id: '4', type: 'month', rank: 1, num: '1'},
//         {id: '5', type: 'month', rank: 2, num: '2'},
//         {id: '6', type: 'month', rank: 3, num: '3'},
//         {id: '7', type: 'week', rank: 1, num: '7'},
//         {id: '8', type: 'week', rank: 2, num: '8'},
//         {id: '9', type: 'week', rank: 3, num: '9'}
//    ]
      // 模拟数据over
      this.items = resp
    }).catch(() => {
      // 模拟数据
//    resp = [
//         {id: '1', type: 'total', rank: 1, num: '1'},
//         {id: '2', type: 'total', rank: 2, num: '2'},
//         {id: '3', type: 'total', rank: 3, num: '3'},
//         {id: '4', type: 'month', rank: 1, num: '1'},
//         {id: '5', type: 'month', rank: 2, num: '2'},
//         {id: '6', type: 'month', rank: 3, num: '3'},
//         {id: '7', type: 'week', rank: 3, num: '7'},
//         {id: '8', type: 'week', rank: 2, num: '8'},
//         {id: '9', type: 'week', rank: 1, num: '9'}
//    ]
      // 模拟数据over
    })
  },
  methods: {
    pull () {
      this.hiddenPull = !this.hiddenPull
    }
  },
  filters: {
    spilt (data) {
      const rankAssoc = ['冠军', '亚军', '季军']
      const typeAssoc = { month: '月', week: '周' }
      if (data.type === 'total') {
        return '总' + rankAssoc[data.rank - 1]
      } else {
        return '第' + data.num + typeAssoc[data.type] + rankAssoc[data.rank - 1]
      }
    }
  },
  computed: {
    ...mapState({
      authToken: state => state.user.token
    })
  }
}
</script>

<style scoped>
    /*奖牌部分样式*/
  .contain .menu { height: 0.88rem; background: #c42209; position: relative;}
  .menu .menu-con { width: 100%; height: 0.88rem; position: relative;z-index: 2;}
  .menu-con p {background:rgba(202,56,31,0.8); overflow: hidden; padding-right: 0.68rem;}
  .overflow {overflow: hidden;}
  .menu-con p span {display: inline-block; min-width: 1.9rem; height: 0.74rem; padding-top: 0.14rem; color: #FFFFFF; padding-left: 0.34rem;}
  .menu-con p span img { width: 0.49rem; height: 0.6rem; vertical-align: middle;}
  
  /*奖牌右侧按钮样式*/
  .menu .menu-direction { width: 0.6rem; height: 0.88rem; position: absolute; right: 0; top: 0;z-index: 9;}
  .menu .menu-direction span {display: block; width: 0.35rem; height: 0.35rem; border: 0.01rem solid #FFFFFF; border-radius:50%;text-align: center;line-height: 0.36rem;margin-top: 0.3rem; margin-left: 0.09rem; }
  .menu .menu-direction span i { color: #FFFFFF;}
</style>

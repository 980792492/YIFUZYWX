<template>
  <div class="contain">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AuthMixin from '@/utils/AuthMixin'
import Weixin from '@/utils/Weixin'
import Constant from '@/utils/Constant'

export default {
  mixins: [AuthMixin],
  created () {
    switch (this.authUser.status) {
      case -1:
        this.$router.replace('/apply/join')
        break
      case 0:
        this.$router.replace('/apply/joinsuccess')
        break
    }
    // 分享战报
    Weixin.initShare({
      title: '中银杯实盘大赛，俺今儿又赚了！',
      desc: '我正在参加中银杯实盘大赛，不吹牛X！实力说话！快看我的神操作>>',
      imgUrl: location.origin + Constant.PUBLIC_PATH + 'static/share-hf.jpg',
      link: location.origin + Constant.PUBLIC_PATH + 'home/otherusercenter?id=' + this.authUser.id,
      callback: function () {
        this.shareflag = false
      },
      cancelCallback: function () {
        this.shareflag = false
      }
    })
  },
  computed: {
    ...mapState({
      authUser: state => state.user.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>   
</style>

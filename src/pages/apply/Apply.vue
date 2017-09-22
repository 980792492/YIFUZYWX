<template>
  <div class="contain">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AuthMixin from '@/utils/AuthMixin'

export default {
  mixins: [AuthMixin],
  created () {
    // 绑定手机
    if (!this.authUser.phone) {
      this.$router.replace({ path: '/home/bindphone' })
    }
    const currentpPath = this.$router.currentRoute.path
    // 参赛状态
    if (this.authUser.status > 0) {
      this.$router.replace({ path: '/user/usercenter' })
    }
    // 等待审核状态
    if (this.authUser.status === 0 && currentpPath !== '/apply/joinsuccess') {
      this.$router.replace({ path: '/apply/joinsuccess' })
    }
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

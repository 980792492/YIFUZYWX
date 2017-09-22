<template>
  <div class='loading'></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  watch: {
    isLoading (flag) {
      console.log('isLoading')
      if (flag) {
        this.loadingInstance = this.$loading({
          body: true,
          lock: true,
          text: '努力加载中...'
        })
      } else if (this.loadingInstance) {
        this.loadingInstance.close()
      }
    }
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ])
  }
}
</script>

<style></style>

<template>
  <div class="message" @click="handleClick">
    <i v-show="status === 1" class="el-icon-loading"></i>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    status: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClick () {
      if (this.status === 0) {
        this.$emit('pull')
      }
    }
  },
  computed: {
    // 下拉分页状态 0: 加载更多 1: 载入中 2: 没有下页
    message () {
      switch (this.status) {
        case 0:
          return '加载更多'
        case 1:
          return '载入中'
        case 2:
          return '没有更多了'
      }
    }
  }
}
</script>

<style scoped>
  .message {text-align: center; font-size: 0.3rem; background: #FFFFFF; line-height: 0.6rem;}
</style>

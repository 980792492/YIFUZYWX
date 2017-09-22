<template>
  <div>
    <a v-show='!isShowTime' class="verify_text myhref" href="javascript:void(0)" @click='send'>重新发送</a>
    <div v-show='isShowTime'  class="verify_text"> {{ t }}S后重新获取</div>
  </div>
</template>

<script>
import Auth from '@/utils/Auth'

export default {
  interval: null,

  name: 'send-sms-button',
  props: {
    phone: {
      type: String,
      default: ''
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  data () {
    return {
      t: Auth.getSmsTime()
    }
  },
  methods: {
    init () {
      // 初始化组件，判断组件正确状态
      console.log(this.t)
      if (this.t > 0) {
        this.start()
      }
    },
    send () {
      Auth.sendSms(this.phone).then(() => {
        this.t = Auth.getSmsTime()
        this.start()
      })
    },
    start () {
      this.interval = setInterval(() => {
//      console.log(this.t)
        if (--this.t < 1) {
          clearInterval(this.interval)
        }
        Auth.setSmsTime(this.t)
      }, 1000)
    }
  },
  computed: {
    isShowTime: function () {
      return this.t > 0
    }
  }
}
</script>

<style scoped>
.verify_text {font-size: 0.32rem; color: #666; text-align: center; border-left: 0.02rem solid #efeef3; display: block; text-decoration: none;}
.myhref {color: #0C94FF;}
</style>

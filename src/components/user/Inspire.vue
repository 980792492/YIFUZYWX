<template>
  <div class="right-inner" :class="isForbidden ? 'border0' : inspireStatus === 0 ? 'border1' : 'border2' ">
    <div class="inner-left">
      <img :src="isForbidden ? require('../../assets/gunwu3.jpg') : inspireStatus === 0 ? require('../../assets/gunwu2.jpg') : require('../../assets/gunwu1.jpg') " />
    </div>
    <div class="inner-right"  > 
      <p  @click.stop='handleClick()' :class="isForbidden ? 'fontcolor0' : inspireStatus === 0 ? 'fontcolor1' : 'fontcolor2' " >鼓舞[{{ inspireNum }}]</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Api from '@/utils/Api'
export default {
  props: {
    // 鼓舞数量
    num: {
      type: Number,
      default: 0
    },
    // 该用户id
    id: {
      type: Number,
      default: 0
    },
    // 是否禁用
    isForbidden: {
      type: Boolean,
      default: false
    },
    // 样式状态 0: 未鼓舞 1: 已鼓舞 2: 已到上限
    status: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      inspireNum: this.num,
      inspireStatus: this.status,
      isLoading: false
    }
  },
  methods: {
    // 点击鼓舞事件
    handleClick () {
      // console.log(this.isForbidden, this.status)
      if (this.isForbidden || this.isLoading) {
        return false
      }
      const api = new Api()
      this.isLoading = true
      api.post('/User/Inspire', {token: this.authToken, id: this.id}).then(resp => {
        this.isLoading = false
        this.inspireNum++
        this.inspireStatus = 1
      }).catch(error => {
        console.log(error)
        this.isLoading = false
      })
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
  .right-inner { height:0.56rem; border-radius: 15px; float: right;}
  .border0 { border: 1px solid #DCDCDC; }
  .border1 { border: 1px solid #FF9A39; }
  .border2 { border: 1px solid #fe0000; }
  .fontcolor0 {color: #DCDCDC; }
  .fontcolor1 {color: #FF9A39; }
  .fontcolor2 {color: #fe0000; }
  
  
  .right-inner .inner-left { width: 0.36rem; height: 0.40rem; float: left; padding: 0.05rem 0.15rem;}
  .right-inner .inner-left img { width: 0.36rem; height: 0.40rem; }
  /*适应iphone5,此处最大的宽度1.6rem*/
  .right-inner .inner-right { width: 1.6rem; float: right; padding-top: 0.15rem; padding-right: 0.1rem; color: #ff0100;}
</style>

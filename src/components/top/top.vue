<template>
  <el-row class='top' v-if='isShow'>
    <el-col :span="4"><div class="grid-content bg-purple" @click="goBack()"><i class="el-icon-arrow-left margr"></i>返回</div></el-col>
    <el-col :span="16"><div class="grid-content bg-purple-light">{{ title }}</div></el-col>
    <el-col :span="4"><div class="grid-content bg-purple"><i class="el-icon-more"></i></div></el-col>
  </el-row>
</template>

<script>
import Weixin from '@/utils/Weixin'

export default {
  name: 'header',
  data () {
    return {
      isShow: !Weixin.isEnable()
    }
  },
  methods: {
    goBack: function () {
      this.$router.back()
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.top{background: #1c1c20; color: #fff; font-size: 0.3rem;}
.el-icon-more { }
.grid-content{text-align: center; min-height: 0.88rem; line-height: 0.88rem;}
.margr{ margin-right:0.14rem ;} 
</style>

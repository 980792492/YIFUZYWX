<template>
   <div class="content">  
        <div class="main"></div>  
    </div> 
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
    }
  },
  watch: {
    data: function (val, oldval) {
      this.drawGraph()
    }
  },
  created: function () {
// 因为echarts的渲染饼图存在负数会照成展示问题,此处将负数展示为0
    for (var v in this.data) {
      if (this.data[v] < 0) {
        this.data[v] = 0
      }
    }
  },
  update: function () {
    console.log('1')
  },
  methods: {
         // 绘图
    drawGraph () {
        // 绘图方法
      this.chart = echarts.init(this.$el.children[0])
      const option = {
        series: [{
          type: 'pie',
          radius: ['60%', '70%'],
//         设置组件颜色
//        color: ['#f5eede', '#e42a2f'],
          color: ['#e42a2f', '#ff9800'],
          label: {
            normal: {
              show: false
            }
          },
          data: this.data
        }]
      }
      this.chart.setOption(option)
    }
  },
// keypoint：执行方法
// “将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。”
  mounted () {
    this.$nextTick(function () {
//    console.log(this.$el.children)
//    this.drawGraph('main')
      this.drawGraph()
    })
  }
}
</script>  
</script>

<style scoped>
.content {  
    /*自行添加样式即可*/  
    margin: 0 auto;
    height: 100%;
} 
.main {  
    /*需要制定具体高度，以px为单位*/ 
    /*width: 100%;*/ 
    /*height: 80px;*/  
    height: 100%;
}
.main > div { height: 100%;}
canvas { transform: rotate(-180deg);}

</style>

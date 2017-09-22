<template>
   <div class="content">  
        <div id="myline"></div>  
    </div> 
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    data1: {
      type: Array,
      default: []
    },
    data2: {
      type: Array,
      default: []
    },
    data3: {
      type: Array,
      default: []
    }
  },
  data () {
    return {}
  },
  watch: {
    data1: function (val, oldval) {
      this.drawGraph()
    },
    data2: function (val, oldval) {
      this.drawGraph()
    },
    data3: function (val, oldval) {
      this.drawGraph()
    }
  },
  created: function () {
  },
  updata: function () {
  },
  methods: {
         // 绘图
    drawGraph () {
        // 绘图方法
      this.chart = echarts.init(document.getElementById('myline'))
      const option = {
        grid: {
          left: '13%'
        },
        xAxis: {
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#ecb161',
              fontSize: 12
            }
          },
          data: this.data3
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            interval: 0,
//          rotate: -60,
            textStyle: {
              color: '#ecb161',
              fontSize: 12
            }
          }
        },
        label: {
          normal: {
            textStyle: {
              color: 'red'
            }
          }
        },
        series: [
          {
            type: 'line',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#ff650c'
                }
              }
            },
            data: this.data1
          },
          {
            type: 'line',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#ba3428'
                }
              }
            },
            data: this.data2
          }
        ]
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
      this.drawGraph('myline')
    })
  }
}
</script>  
</script>

<style scoped>
.content {  
    /*自行添加样式即可*/  
    margin: 0 auto;
    /*padding: 0 0.5rem;*/
} 
#myline {  
    /*需要制定具体高度，以px为单位*/ 
    /*width: 100%;*/ 
    height: 300px;  
	/*width: 200px;*/
} 

</style>

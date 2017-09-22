import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// import el 组件(完整)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import weixin jssdk
// import Weixin from './utils/Weixin'
// import y-top 组件
import Top from './components/top'

// 移动端自适应工具
// import 'lib-flexible/flexible'
import './utils/rem'

// 导入字体图标
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
Vue.component('icon', Icon)

Vue.config.productionTip = false

// 加载全局组件
Vue.use(ElementUI)
Vue.use(Top)
// Vue.use(VueResource)

// Weixin.initJssdk()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

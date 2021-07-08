import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import SlideLoop from '@/components/SlideLoop'
import store from '@/store'

//引入Mock
import "@/mock/mockServer"

// 引入swipper的css
import "swiper/css/swiper.min.css"

//关闭生产提示
Vue.config.productionTip = false

//注册全局组件
Vue.component("TypeNav", TypeNav)
Vue.component("SlideLoop", SlideLoop)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

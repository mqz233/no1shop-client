import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import SlideLoop from '@/components/SlideLoop'
import Pagination from '@/components/Pagination'
import store from '@/store'

//引入Mock
import "@/mock/mockServer"

// 引入swipper的css
import "swiper/css/swiper.min.css"

//发送请求的另一种方式，引入api文件并绑定到Vue的原型上，
//这样所有vc都能直接拿到并发请求
import * as API from "@/api"

// 使用element-ui 按需引入
import { Button, MessageBox, Message, } from 'element-ui'

// 注册组件 
//方式1 Vue.use
Vue.use(Button)
// 方式2 绑定在Vue原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

//关闭生产提示
Vue.config.productionTip = false

//注册全局组件
Vue.component("TypeNav", TypeNav)
Vue.component("SlideLoop", SlideLoop)
Vue.component("Pagination", Pagination)

new Vue({
  beforeCreate() {
    // 注册全局事件总线（一种组件间通信方式，适合于任何组件之间通信，
    // 所有实例都可以通过this.$bus访问到总线(vm实例对象) ，再通过$emit和$on 来进行通信
    // 怎么做：数据代理完成前在Vue的原型对象上添加$bus属性，值为this
    Vue.prototype.$bus = this
    Vue.prototype.$api = API
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')

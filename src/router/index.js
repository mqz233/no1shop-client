import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Home from '@/pages/Home'
import Search from '@/pages/Search'

//修改push方法,解决连续搜索相同关键字时报错的问题
// 原因：重复点击 路径没有改变 会返回一个失败的promise
// 每次都用catch太麻烦，直接修改原型上的方法
const oldPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onResolved, onRejected) {
    if (onResolved === undefined && onRejected === undefined)
        // 不要忘记call调用 更改this指向
        return oldPush.call(this, location).catch((e) => {
            console.log(e.message);
        })
    else {
        return oldPush.call(this, location, onResolved, onRejected)
    }
}

const oldReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onResolved, onRejected) {
    if (onResolved === undefined && onRejected === undefined)
        // 不要忘记call调用 更改this指向
        return oldReplace.call(this, location).catch((e) => {
            console.log(e.message);
        })
    else {
        return oldReplace.call(this, location, onResolved, onRejected)
    }
}

const router = new VueRouter({
    routes: [

        {
            path: '/home',
            component: Home
        },
        {
            path: '/register',
            component: Register,
            // 元配置项
            meta: {
                // 是否隐藏Footer组件 配合v-show实现
                isHiddenFooter: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                isHiddenFooter: true
            }
        },
        {
            // params需要声明接受，匹配时会用到，
            //query不需要接收
            //在路由匹配得过程中，两种参数解析到$route对象中
            //展示组件时，会把route对象传到组件中

            //命名路由
            name: "search",
            path: '/search/:keyWord?', //加问号的话params参数可以传可不传
            component: Search
        },
        {
            // 重定向到home组件
            path: '/',
            redirect: '/home'
        }
    ]
})

export default router
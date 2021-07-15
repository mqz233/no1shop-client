import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import routes from './routes'
import store from '@/store'

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
    routes,
    // 跳转到一个新的路由时，滚轮的位置
    scrollBehavior() {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 }
    }
})

// 注册全局 前置导航守卫
// to from next
// next是执行的操作 next()无条件放行 next('/')跳转到指定页面 next(false)什么都不做，原地不动
router.beforeEach(async (to, from, next) => {
    // 首先获取token和userInfo
    const token = store.state.user.token
    const userInfo = store.state.user.userInfo.name
    // 如果用户有token
    if (token) {
        // 用户在登陆的情况下访问了登录页面
        if (to.path === "/login") {
            // 强制跳转到主页
            next("/")
        } else {
            // 判断是否已经获取用户信息了
            if (userInfo) {
                // 无条件放行
                next()
            }
            // 发请求获取用户信息,然后无条件放行
            else {
                try {
                    await store.dispatch("getUserInfo")
                    next()
                }
                // 如果获取用户信息失败，说明token失效需要清除
                // 然后跳转到登录页面重新登陆获取
                catch (error) {
                    store.dispatch("getLogout")
                    next("/login")
                }
            }
        }

    }
    // 用户没有登录
    else {
        next()
    }
})

export default router
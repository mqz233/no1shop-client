import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import routes from './routes'


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

export default router
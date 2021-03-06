import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Trade from '@/pages/Trade'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

export default [

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
    // 重定向到home组件
    {

        path: '/',
        redirect: '/home'
    },
    // 详情页
    {
        name: 'detail',
        path: '/detail/:goodsId',
        component: Detail
    },
    // 购物车添加成功页面
    {
        path: '/addcartsuccess',
        component: AddCartSuccess
    },
    // 购物车页面
    {
        path: '/shopcart',
        component: ShopCart
    },
    // 确认订单
    {
        path: '/trade',
        component: Trade
    },
    // 支付页面
    {
        path: '/pay',
        component: Pay
    },
    // 支付成功
    {
        path: '/paysuccess',
        component: PaySuccess
    },
    // 订单管理页面
    {
        path: '/center',
        component: Center,
        children: [
            {
                path: "groupOrder",
                component: GroupOrder
            },
            {
                path: "myOrder",
                component: MyOrder
            },
            {
                path: "",
                redirect: "/center/myorder"
            }
        ],

    }
]

import { reqAddShopCart, reqCartList, reqIsChecked } from '@/api'

const state = {
    cartList: []

}

const mutations = {
    RECEIVE_CARTLIST(state, cartList) {
        state.cartList = cartList
    }

}

const actions = {

    // 发请求异步 返回promise对象
    async addShopCart(context, { skuId, skuNum }) {
        const result = await reqAddShopCart(skuId, skuNum)
        if (result.code >= 200) {
            // 返回成功的promise
            return '添加成功'
        }
        else {
            // 返回失败的promise
            return Promise.reject(new Error("添加购物车失败"))
        }
    },

    async getCartList({ commit }) {
        const result = await reqCartList()
        if (result.code >= 200) {
            commit("RECEIVE_CARTLIST", result.data)
        }
    },
    // 更改单个复选框状态
    async getCartIsChecked(context, { skuId, isChecked }) {

        const result = await reqIsChecked(skuId, isChecked)
        if (result.code >= 200) {
            return '修改成功';
        }
        else {
            return Promise.reject(new Error("更改复选框状态失败"))
        }

    },
    // 更新全选框状态
    // 思路：通过getter得到商品列表，用foreach分别发送请求
    // 得到的promise对象形成数组，用Promise.all批量处理
    updateCartIsCheckedAll(context, val) {
        const { getters, dispatch } = context
        let promises = []
        getters.cartList.cartInfoList.forEach(element => {
            if (element.isChecked === val) return
            let promise = dispatch('getCartIsChecked', { skuId: element.skuId, isChecked: val })
            promises.push(promise)
        });
        return Promise.all(promises)
    }

}

const getters = {

    // 这个getter返回购物车信息列表
    cartList(state) {

        return state.cartList[0] || {}

    }

}

export default {
    state,
    mutations,
    actions,
    getters
}
import { reqAddShopCart } from '@/api'

const state = {

}

const mutations = {

}

const actions = {

    // 发请求异步 返回promise对象
    async addShopCart(context, { skuId, skuNum }) {
        const result = await reqAddShopCart(skuId, skuNum)
        if (result.code >= 200) {
            // 返回成功的promise
            return 'ok'
        }
        else {
            // 返回失败的promise
            return Promise.reject(new Error("添加购物车失败"))
        }
    }

}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}
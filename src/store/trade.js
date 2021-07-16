import { reqTrade } from '@/api'

const state = {
    tradeInfo: {}
}

const mutations = {

    RECEIVE_TRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    }

}

const actions = {

    // 获取订单交易信息
    async getTradeInfo({ commit }) {
        const result = await reqTrade()
        if (result.code === 200) {
            commit("RECEIVE_TRADEINFO", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("获取订单失败"))
        }

    }

}

const getters = {
    detailArrayList(state) {
        return state.tradeInfo.detailArrayList || []
    }

}

export default {
    state,
    mutations,
    actions,
    getters

}
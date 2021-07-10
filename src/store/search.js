import { reqSearchInfo } from '@/api'
const state = {
    searchInfo: {}
}
const mutations = {
    RECEIVE_SEARCHINFO(state, searchInfo) {
        state.searchInfo = searchInfo
    }
}
const actions = {
    // 用户传递过来参数 要放在默认参数的后面
    async getSearchInfo({ commit }, searchParams) {
        const result = await reqSearchInfo(searchParams)
        if (result.code >= 200)
            commit('RECEIVE_SEARCHINFO', result.data)
    }
}
const getters = {
    // 使用getters简化复杂的数据结构
    attrsList(state) {
        return state.searchInfo.attrsList || []
    },
    goodsList(state) {
        return state.searchInfo.goodsList || []
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || []
    },

}

export default {
    state,
    mutations,
    actions,
    getters
}
import { reqDetailInfo } from '@/api'

const state = {
    detailInfo: {}
}

const mutations = {
    RECEIVE_DETAILINFO(state, detailInfo) {
        state.detailInfo = detailInfo

    }
}

const actions = {
    async getDetailInfo({ commit }, skuId) {
        const result = await reqDetailInfo(skuId)
        if (result.code >= 200) {
            commit("RECEIVE_DETAILINFO", result.data)
        }
    }
}

const getters = {

    categoryView(state) {
        return state.detailInfo.categoryView || {}
    },
    spuSaleAttrList(state) {
        return state.detailInfo.spuSaleAttrList || []
    },
    skuInfo(state) {
        return state.detailInfo.skuInfo || {}
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}
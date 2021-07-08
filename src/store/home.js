// vuex的home模块
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api"

const state = {

    // 三级目录
    categoryList: [],
    bannerList: [],
    floorList: [],

}

const mutations = {

    //mutation直接操作state
    RECEIVE_CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    RECEIVE_BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    RECEIVE_FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}

const actions = {

    //action去发送请求获取数据，把数据commit给mutation

    //  async await处理promise
    // 参数:context 有commit方法 解构赋值得到

    //获取目录数据
    async getCategoryList({ commit }) {


        const result = await reqCategoryList()
        if (result.code >= 200) {
            commit("RECEIVE_CATEGORYLIST", result.data)
        }

    },

    async getBannerList({ commit }) {
        const result = await reqBannerList()
        if (result.code >= 200) {
            commit("RECEIVE_BANNERLIST", result.data)
        }
    },

    async getFloorList({ commit }) {
        const result = await reqFloorList()
        if (result.code >= 200) {
            commit("RECEIVE_FLOORLIST", result.data)
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
// vuex的home模块
import { reqCategoryList } from "@/api"

const state = {

    // 三级目录
    categoryList: []

}

const mutations = {

    // 修改三级目录
    RECEIVE_CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    }
}

const actions = {

    //  async await处理promise
    // 参数:context 有commit方法 解构赋值得到

    //获取目录数据
    async getCategoryList({ commit }) {


        const result = await reqCategoryList()
        if (result.code >= 200) {
            commit("RECEIVE_CATEGORYLIST", result.data)
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
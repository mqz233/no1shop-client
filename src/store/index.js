import Vue from "vue";
import Vuex from "vuex"
//引入home模块
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'

Vue.use(Vuex)
const state = {

}

const mutations = {

}

const actions = {

}

const getters = {

}
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    // 使用模块
    modules: {
        home,
        search,
        detail,
        shopcart,
        user
    }
})

export default store
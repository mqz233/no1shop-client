import { getUserTempId } from '@/utils/userabout'
import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'

const state = {
    // 用户临时id
    userTempId: getUserTempId(),
    // 验证码
    code: "",
    // token尝试从localStorage里取出来 如果取不到说明要登录
    token: localStorage.getItem("TOKEN_KEY"),
    // 用户信息
    userInfo: {}
}

const mutations = {
    RECEIVE_CODE(state, code) {
        state.code = code
    },
    RECEIVE_TOKEN(state, token) {
        state.token = token
    },
    RECEIVE_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 退出时重置用户信息 
    RESET_USER(state) {
        state.userInfo = {}
        state.token = ""
    }
}

const actions = {

    // 获取验证码 存储到vuex中
    async getCode({ commit }, phone) {

        const result = await reqCode(phone)
        if (result.code === 200) {
            commit("RECEIVE_CODE", result.data)
            return 'ok'
        }
        else {
            return Promise.reject(new Error("获取验证码失败"))
        }

    },

    // 进行注册
    async getRegister(context, userInfo) {
        const result = await reqRegister(userInfo)
        if (result.code === 200) {
            return "注册成功"
        }
        else {
            return Promise.reject(new Error("注册失败"))
        }
    },

    // 进行登录
    async getLogin({ commit }, userInfo) {
        const result = await reqLogin(userInfo)
        if (result.code === 200) {
            commit("RECEIVE_TOKEN", result.data.token)
            // 设置自动登录,把token保存到localStorage里面
            localStorage.setItem("TOKEN_KEY", result.data.token)
            return "ok"
        }
        else {
            return Promise.reject(new Error("登录失败"))
        }
    },

    // 根据token获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 200) {
            commit("RECEIVE_USERINFO", result.data)
            return "ok"
        }
        else {
            return Promise.reject(new Error("获取用户信息失败"))
        }
    },

    // 退出登录
    async getLogout({ commit }) {
        const result = await reqLogout()
        if (result.code === 200) {
            // 重置用户信息和token
            commit("RESET_USER")
            localStorage.removeItem("TOKEN_KEY")
            return 'ok'
        }
        else {
            return Promise.reject(new Error("退出失败"))
        }
    }


}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
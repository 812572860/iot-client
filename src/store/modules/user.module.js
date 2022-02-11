import axios from '@/utils/request'
import { login, logout, getNewToken } from '@/api/auth'
import { getToken, setToken, getRefreshToken, setRefreshToken, removeToken } from '@/utils/token'

const state = {
  token: getToken(),
  refreshToken: getRefreshToken(),
  info: null, // 登录用户信息
  tenantInfo: null, // 用户的租户信息
  roles: [],
  permissions: []
}

const getters = {}

const mutations = {
  setToken(state, { token, refreshToken }) {
    state.token = token
    state.refreshToken = refreshToken
    // 更新缓存
    setToken(token)
    setRefreshToken(refreshToken)
  },
  removeToken(state) {
    state.token = ''
    state.refreshToken = ''
    // 更新缓存
    removeToken()
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      login({ username, password })
        .then(res => {
          commit('setToken', {
            token: res.access_token,
            refreshToken: res.refresh_token
          })
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(res => {
          commit('removeToken')
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // token失效后根据refresfToken重新获取token后，再次发出原来的请求
  doRequest({ commit, state }, preRequest) {
    return new Promise((resolve, reject) => {
      getNewToken(state.refreshToken)
        .then(res => {
          commit('setToken', {
            token: res.access_token,
            refreshToken: res.refresh_token
          })
          resolve(axios(preRequest))
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 获取登录用户信息
  getUserInfo() {
    return Promise.resolve()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

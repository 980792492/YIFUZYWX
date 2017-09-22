import Api from '@/utils/Api'
import Auth from '@/utils/Auth'
import * as types from '../types'

// init user data
const state = {
  isLoading: false,
  message: null,
  data: null,
  token: null,
  returnPath: null
}

// getters
const getters = {
  // data: state => state.data
}

// actions
const actions = {
  login ({ commit }, { username, password, type }) {
    commit(types.LOGIN_ING)
    const api = new Api('base')
    return api.post('User/Login', {username: username, password: password, type: type})
      .then(data => {
        commit(types.LOGIN_SUCCESS, data.token)
        // 缓存24小时
        Auth.login(data.token)
        return Promise.resolve(data.token)
      }).catch(error => {
        commit(types.LOGIN_FAIL, error)
        return Promise.reject(error)
      })
  },
  register ({ commit }, { phone, nickname, password, code, invite, openid, from }) {
    commit(types.REGISTER_ING)
    const api = new Api('base')
    return api.post('User/Register', {
      phone: phone,
      nickname: nickname,
      password: password,
      code: code,
      invite: invite,
      openid: openid,
      from: from
    }).then(data => {
      commit(types.REGISTER_SUCCESS, data.token)
      // 缓存24小时
      Auth.login(data.token)
      return Promise.resolve(data.token)
    }).catch(error => {
      commit(types.REGISTER_FAIL, error)
      return Promise.reject(error)
    })
  },
  logout ({ commit }, { token }) {
    commit(types.LOGOUT_ING)
    const api = new Api('base')
    return api.post('User/Logout', { token: token })
      .then(() => {
        commit(types.LOGOUT_SUCCESS)
        // 清除缓存
        Auth.logout()
        return Promise.resolve()
      }).catch(error => {
        commit(types.LOGOUT_FAIL, error)
        return Promise.reject(error)
      })
  },
  getUser ({ commit, state }, { token }) {
    commit(types.RECEIVE_USER_ING)
    // 如果token没有，则初始化token
    state.token || commit(types.LOGIN_SUCCESS, token)
    // 远程调用获取用户数据
    const api = new Api()
    return api.get('User/Data', { token: token })
      .then(data => {
        commit(types.RECEIVE_USER_SUCCESS, data)
        return Promise.resolve(data)
      })
      .catch(error => {
        console.log(error)
        // 模拟数据
        // const data = {
        //   id: 1,
        //   yfUserid: 1,
        //   yfNick: 'kenshin',
        //   headimg: 'aaa',
        //   phone: '13675897772',
        //   customerid: '330100001234',
        //   camp: 2,
        //   campname: 'yifu',
        //   status: 1,
        //   yieldrate: 12,
        //   monthrate: 6,
        //   weekrate: -0.1,
        //   dayrate: -6.4,
        //   totalrank: 2,
        //   monthrank: 8,
        //   weekrank: 4,
        //   dayrank: 9,
        //   teamrank: 2,
        //   honors: 12345,
        //   inspires: 54321,
        //   invites: 10
        // }
        // commit(types.RECEIVE_USER_SUCCESS, data)
        // return Promise.resolve(data)
        // 模拟登陆over
        commit(types.RECEIVE_USER_FAIL, error)
        return Promise.reject(error)
      })
  }
}

// mutations
const mutations = {
  // 登陆
  [types.LOGIN_ING] (state) {
    state.isLoading = true
    state.token = null
    state.message = null
  },

  [types.LOGIN_SUCCESS] (state, token) {
    state.isLoading = false
    state.token = token
  },

  [types.LOGIN_FAIL] (state, error) {
    state.isLoading = false
    state.message = error.message
  },

  // 注册
  [types.REGISTER_ING] (state) {
    state.isLoading = true
    state.token = null
    state.message = null
  },

  [types.REGISTER_SUCCESS] (state, token) {
    state.isLoading = false
    state.token = token
  },

  [types.REGISTER_FAIL] (state, error) {
    state.isLoading = false
    state.message = error.message
  },

  // 注销
  [types.LOGOUT_ING] (state) {
    state.isLoading = true
    state.message = null
  },

  [types.LOGOUT_SUCCESS] (state) {
    state.isLoading = false
    state.token = null
    state.returnPath = null
    state.data = null
  },

  [types.LOGOUT_FAIL] (state, error) {
    state.isLoading = false
    state.message = error.message
  },

  // 获取用户数据
  [types.RECEIVE_USER_ING] (state) {
    state.isLoading = true
    state.data = null
    state.message = null
  },

  [types.RECEIVE_USER_SUCCESS] (state, data) {
    state.isLoading = false
    state.data = data
  },

  [types.RECEIVE_USER_FAIL] (state, error) {
    state.isLoading = false
    state.message = error.message
  },

  // 设置return path
  [types.SET_RETURN_PATH] (state, path) {
    state.returnPath = path
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

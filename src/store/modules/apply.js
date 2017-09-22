import * as types from '../types'
import Api from '@/utils/Api'
import Auth from '@/utils/Auth'

// init user data
const state = {
  isLoading: false,
  message: null,
  realname: null,
  customerid: null,
  camp: null,
  sfid: null
}

// getters
const getters = {
  // data: state => state.data
  usersfid: state => state.sfid || ''
}

// actions
const actions = {
  apply ({ commit, state, rootState }) {
    commit(types.APPLY_ING)
    const api = new Api()
    return api.post('User/Apply', {
      token: rootState.user.token,
      realname: state.realname,
      customerid: state.customerid,
      camp: state.camp,
      sndname: state.sfid,
      invite: Auth.getInvite()
    }).then(data => {
      commit(types.APPLY_SUCCESS)
      return Promise.resolve(data.token)
    }).catch(error => {
      commit(types.APPLY_FAIL, error)
      return Promise.reject(error)
    })
  }
}

// mutations
const mutations = {
  [types.SET_SFID] (state, sfid) {
    state.sfid = sfid
  },

  [types.SET_REALNAME] (state, realname) {
    state.realname = realname
  },

  [types.SET_CUSTOMERID] (state, customerid) {
    state.customerid = customerid
  },

  [types.SET_CAMP] (state, camp) {
    state.camp = camp
  },

  // 报名
  [types.APPLY_ING] (state) {
    state.isLoading = true
    state.message = null
  },

  [types.APPLY_SUCCESS] (state) {
    state.isLoading = false
  },

  [types.APPLY_FAIL] (state, error) {
    state.isLoading = false
    state.message = error.message
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

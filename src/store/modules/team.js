import * as types from '../types'
import Api from '@/utils/Api'

// init user data
const state = {
  isLoading: false,
  message: null,
  data: null
}

// getters
const getters = {
  // data: state => state.data
}

// actions
const actions = {
  getTeamData ({ commit, state }) {
    commit(types.GET_TEAM_DATA_ING)

    const api = new Api()
    api.get('Rank/TeamData').then(resp => {
      commit(types.GET_TEAM_DATA_SUCCESS, resp)
      return Promise.resolve()
    }).catch(error => {
      commit(types.GET_TEAM_DATA_FAIL, error)
      return Promise.reject(error)
    })
  }
}

// mutations
const mutations = {
  // 报名
  [types.GET_TEAM_DATA_ING] (state) {
    state.isLoading = true
    state.message = null
  },

  [types.GET_TEAM_DATA_SUCCESS] (state, data) {
    state.isLoading = false
    let team1 = data ? data[0] : {honors: 0, rate: 0, inspires: 0, userNum: 0}
    let team2 = data ? data[1] : {honors: 0, rate: 0, inspires: 0, userNum: 0}
    state.data = {
      honors: [team1.honors, team2.honors],
      rate: [team1.rate, team2.rate],
      inspires: [team1.inspires, team2.inspires],
      userNum: [team1.userNum, team2.userNum]
    }
  },

  [types.GET_TEAM_DATA_FAIL] (state, error) {
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

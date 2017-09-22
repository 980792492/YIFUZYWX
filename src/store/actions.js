import * as types from './types'

export const setApplyData = ({ commit }, { realname, customerid, camp, sfid }) => {
  realname && commit(types.SET_REALNAME, realname)
  customerid && commit(types.SET_CUSTOMERID, customerid)
  camp && commit(types.SET_CAMP, camp)
  sfid && commit(types.SET_SFID, sfid)
}

export const setReturnPath = ({ commit }, path) => {
  if (path) {
    commit(types.SET_RETURN_PATH, path)
  }
}

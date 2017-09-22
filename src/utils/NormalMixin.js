import Auth from './Auth'
import store from '@/store'

var NormalMixin = {
  beforeRouteEnter (to, from, next) {
    if (Auth.isLogin() && store.state.user.data === null) {
      store.dispatch('getUser', { token: Auth.getToken() })
      .then(data => {
        next()
      })
      .catch(() => {
        // console.log(error)
        next(false)
      })
    } else {
      next()
    }
  }
}

export default NormalMixin

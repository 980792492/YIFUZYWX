import Auth from './Auth'
import store from '@/store'

var AuthMixin = {
  beforeRouteEnter (to, from, next) {
    if (!Auth.isLogin()) {
      store.dispatch('setReturnPath', to.fullPath)
      next('/home/login')
    } else if (store.state.user.data === null) {
      store.dispatch('getUser', { token: Auth.getToken() })
        .then(data => {
          next()
        })
        .catch(() => {
//        console.log(error)
          next(false)
        })
    } else {
      next()
    }
  }
}

export default AuthMixin

import Cache from './Cache'
import Api from './Api'

const Auth = {
  token: null,
  data: null,
  joinparam: null,
  isLogin () {
    return !!Cache.get('token')
  },

  login (token) {
    this.setToken(token)
    this.token = token
  },

  logout () {
    Cache.clear('token')
    this.token = null
  },

  getToken () {
    return Cache.get('token')
  },

  setToken (token) {
    Cache.set('token', token, 3600 * 24)
  },

  // 发送验证短信
  sendSms (phone) {
    const api = new Api('base')
    return api.post('User/SendSms', { phone: phone }).then(resp => {
      this.setSmsTime(60)
      this.setSmsPhone(phone)
    })
  },

  setSmsPhone (phone) {
    Cache.set('smsLastPhone', phone, -1)
  },

  // 获取最后一次发送的手机号
  getSmsPhone () {
    return Cache.get('smsLastPhone')
  },

  setSmsTime (t = 60) {
    Cache.set('smsLastTime', t, -1)
  },

  // 获取记录的最后一次时间
  getSmsTime () {
    return Cache.get('smsLastTime')
  },

  getInvite () {
    return Cache.get('invite') > 0 ? Cache.get('invite') : 0
  },

  setInvite (id) {
    if (id > 0) {
      Cache.set('invite', id, 3600)
    } else {
      Cache.clear('invite')
    }
  },

  getFrom () {
    return Cache.get('from') > 0 ? Cache.get('from') : 0
  },

  setFrom (w) {
    if (w) {
      Cache.set('from', w, 3600)
    } else {
      Cache.clear('from')
    }
  },

  setOpenid (openid) {
    return openid ? Cache.set('openid', openid, -1) : Cache.clear('openid')
  },

  getOpenid () {
    return Cache.get('openid') || undefined
  }
  // 将即将参赛的用户名和客户号存储起来
  // setParams (params) {
  //   return Cache.set('paramsdata', params)
  // },
  // getParams () {
  //   return Cache.get('paramsdata')
  // }
}

export default Auth

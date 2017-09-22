import axios from 'axios'
import Jwt from 'jwt-simple'
import Qs from 'qs'
import { Notification } from 'element-ui'
import Router from '@/router'
import store from '@/store'
import Constant from './Constant'

const Payload = {
  iss: 'YFCJ',
  aud: 'http://wxapi.yifucj.com',
  nbf: 0,
  exp: 0
}

class Api {

  config = {
    baseURL: Constant.API_URL,
    timeout: 5000,
    responseType: 'json'
  }

  constructor (type = 'default') {
    this.config.baseURL = type === 'base' ? Constant.BASE_API_URL : Constant.API_URL
    this.link = axios.create(this.config)
  }

  static getAuthorization () {
    let t = parseInt(new Date().getTime() / 1000)
    Payload.nbf = t - 60
    Payload.exp = t + 60
    let authorization = Jwt.encode(Payload, Constant.JWT_SECRET)
    return authorization
  }

  handleResponse (resp) {
    if (resp.data.error > 0) {
      // 处理错误业务
      if (resp.data.error === 100) {
        // token无效或已过期，跳转到登陆页面
        store.dispatch('setReturnPath', Router.currentRoute.fullPath)
        Router.replace('/home/login')
      } else {
        // 其他错误处理
        Notification.error(resp.data.message)
        return Promise.reject(resp.data)
      }
    } else {
      return Promise.resolve(resp.data.data)
    }
  }

  get (url, data) {
    return this.link.get(url, {
      params: data,
      headers: { 'Authorization': Api.getAuthorization() }
    }).then(this.handleResponse)
  }

  post (url, data) {
    return this.link.post(url, Qs.stringify(data), {
      headers: { 'Authorization': Api.getAuthorization() }
    }).then(this.handleResponse)
  }
}

export default Api

// import Vue from 'vue'
import wx from 'weixin-js-sdk'
import Api from './Api'
import Cache from './Cache'
import Auth from './Auth'

const Weixin = {
  appId: null,
  api: null,

  handleCode (code) {
    this.api.get('Weixin/Openid', {code: code}).then(data => {
      if (data.token) {
        // 如果已绑定token，直接登陆
        Auth.login(data.token)
      } else if (data.openid) {
        // 存储openid，登陆使用
        Auth.setOpenid(data.openid)
      } else {
        alert('error data')
      }
    }).catch(error => {
      console.log(error.message)
    })
  },

  initOpenId () {
    if (Auth.isLogin()) {
      return true
    }
    if (!this.appId) {
      console.log('appId 不存在')
      return false
    }
    if (!Auth.getOpenid() && this.appId) {
      window.location.href = this.getCodeUrl()
    }
  },

  getCodeUrl () {
    let redirectUri = encodeURIComponent(location.href)
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=#wechat_redirect`
  },

  getOpenId () {
    return Cache.get('openId') || false
  },

  getQueryString (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return (r[2]); return null
  },

  // 判断浏览器是否为微信内置浏览器
  isEnable () {
    var ua = window.navigator.userAgent.toLowerCase()
    var result = ua.match(/MicroMessenger/i)
    return result === null ? false : result[0] === 'micromessenger'
  },

  initJssdk () {
    if (!this.isEnable()) {
      return false
    }

    this.api = new Api('base')

    // 如果有code处理code
    const code = this.getQueryString('code')
    if (code) {
      this.handleCode(code)
    }

    this.api.get('Weixin/Auth', {}).then(resp => {
      this.appId = resp.appId
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: resp.appId, // 必填，公众号的唯一标识
        timestamp: resp.timestamp, // 必填，生成签名的时间戳
        nonceStr: resp.noncestr, // 必填，生成签名的随机串
        signature: resp.signature, // 必填，签名，见附录1
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    })

    wx.ready(() => {
      // jssdk 初始化成功后执行
      this.initOpenId()
    })

    wx.error(res => {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log(res)
    })
  },

  initShare ({ title, link, imgUrl, desc, callback, cancelCallback }) {
    wx.ready(() => {
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: callback,
        cancel: cancelCallback
      })

      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        // type: '', // 分享类型,music、video或link，不填默认为link
        // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: callback,
        cancel: cancelCallback
      })
    })
  }
}

export default Weixin

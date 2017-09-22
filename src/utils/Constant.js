const Constant = {
// 曾令涛接口
// API_URL: 'http://192.168.3.159:8055/api/',
// 中富杯接口
// API_URL: 'http://stockapi.yifucj.com/api/',
// 中银接口
  API_URL: 'http://zfapi.yifucj.com/api/',
  BASE_API_URL: 'http://wxapi.yifucj.com/api/',
  // 图片地址
  IMG_URL: 'http://img1.yifucj.com/home/headimg/',

  // jwt密钥
  JWT_SECRET: 'jk~!@^xzb#%#$!fh%23$!$5(d6nf$%tdf!',

  // path
  PUBLIC_PATH: process.env.NODE_ENV === 'production' ? '/zfsg/' : '/'
}

export default Constant

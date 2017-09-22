// 数字转换
export const toNumber = function (num) {
  return num || 0
}

// 时间转换
export const toDateTime = function (timestamps) {
  const date = new Date(timestamps)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate()) + ' '
  const h = (date.getHours() + 1 < 10 ? '0' + (date.getHours() + 1) : date.getHours()) + ':'
  const m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes()) + ':'
  const s = (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds() + 1) : date.getSeconds())
// const D = date.getDate() + ' '
// const h = date.getHours() + ':'
// const m = date.getMinutes() + ':'
// const s = date.getSeconds()
  return (Y + M + D + h + m + s)
}

// 转换时间戳为日期
export const toDate = function (timestamps) {
  return new Date(timestamps).toLocaleString().replace('/', '-').replace('/', '-').substring(0, 9)
}

// 转换为收益率
export const toRate = function (rate) {
  return rate < 0 ? rate : '+' + rate
}

// 敏感数据加密
export const confuse = function (string, preNum = 4, suffixNum = 4) {
  string = string.toString()
  return string.substr(0, preNum) + '****' + string.substr(-suffixNum, suffixNum)
}

// 判断数据输入是否合法
export const dataLegal = function (datavalue) {
  let len = 0
  for (var i = 0; i < datavalue.length; i++) {
    if (datavalue.charCodeAt(i) > 127 || datavalue.charCodeAt(i) === 94) {
      len = len + 2
    } else {
      len = len + 1
    }
  }
  return len
}

// 设置战队战绩当某数值小于0时，使得在饼图中显示为0
export const toNormalnum = function (str) {
  console.log(str)
  if (str < 0) {
    str = 0
  }
}


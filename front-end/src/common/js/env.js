/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 * routerMode: 路由模式
 */

let baseUrl
let routerMode
const imgBaseUrl = ''
const loginUrl = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx456704171948ca47&redirect_uri=http%3A%2F%2Fwww.msoffice100.com%2Fuser%2Fwxlogin&response_type=code&scope=snsapi_login'
if (process.env.NODE_ENV === 'development') {
  baseUrl = ''
  routerMode = 'hash'
} else {
  baseUrl = ''
  routerMode = 'hash'
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl,
  loginUrl
}

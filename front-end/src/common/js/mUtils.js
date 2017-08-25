/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 存储cookie
 */
export const setCookie = (name, value, days) => {
  var d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
}

/**
 * 获取cookie
 */
export const getCookie = (name) => {
  var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}

/**
 * 删除cookie
 */
export const deleteCookie = (name) => {
  setCookie(name, '', -1)
}

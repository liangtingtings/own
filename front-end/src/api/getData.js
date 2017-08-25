/**
 *  create by kyltt 2017.7.28
 *  获取后端数据
 */
import axios from 'axios'
import {deleteCookie} from '../common/js/mUtils.js'
let base = '/home'

export function getMessage (statusCode, msg) {
  if (statusCode === 403) {
    deleteCookie('token')
    this.$router.push('/home')
  }
}
/**
 * 用户登录信息
 */
export function getProvinceData () {
  const url = base + '/user/infos'
  return axios.get(url, {
    params: ''
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}
/**
 * 邀请码提交
 */
export function inviteCodeSubmit (data) {
  const url = base + '/user/invite'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}
/**
 * 拿选择题题目目录
 */
export function getSelect () {
  const url = base + '/choice/question/catalogues'
  return axios.get(url, {
    params: ''
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}
/**
 * 拿操作题题目目录
 */
export function getAction () {
  const url = base + '/operation/question/catalogues'
  return axios.get(url, {
    params: ''
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}
/**
 * 拿操作题试题接口
 */
export function getOperationData (data) {
  const url = base + '/operation/question/list'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}
/**
 * 拿选择题题试题接口
 */
export function getSelectData (data) {
  const url = base + '/choice/question/list'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}
/**
 * 解锁试题
 */
export function unlock (data) {
  const url = base + '/user/unlock'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}
/**
 * 拿操作题题解析接口
 */
export function getOperaAnswer (data) {
  const url = base + '/operation/question/results'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}
/**
 * 拿选择题题解析接口
 */
export function getSelectAnswer (data) {
  const url = base + '/choice/question/results'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}

/**
 * 选择题提交答案
 */
export function Selectsubmit (data) {
  const url = base + '/choice/question/commit'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}

/**
 *  支付功能
 */
export function paysubmit (data) {
  const url = base + '/pay'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    getMessage(err.response.status, err.response.data.msg)
  })
}


import { getStore, setStore, removeStore } from './sessionStorage'

const TokenKey = 'ACCESS_TOKEN'
const RefreshTokenKey = 'REFRESH_TOKEN'

/**
 * 获取token
 * @returns
 */
export function getToken() {
  return getStore(TokenKey)
}
/**
 * 设置token
 * @param {*} token
 * @returns
 */
export function setToken(token) {
  return setStore(TokenKey, token)
}

/**
 * 删除token
 * @returns
 */
export function removeToken() {
  removeStore(TokenKey)
  removeStore(RefreshTokenKey)
}

/**
 * 获取refreshtoken
 * @returns
 */
export function getRefreshToken() {
  return getStore(RefreshTokenKey)
}
/**
 * 获取refreshtoken
 * @param {*} token
 * @returns
 */
export function setRefreshToken(token) {
  return setStore(RefreshTokenKey, token)
}

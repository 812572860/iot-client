/**
 * 存储sessionStorage
 */

export const setStore = (key, content) => {
  key && window.sessionStorage.setItem(key, content)
}

/**
 * 获取sessionStorage
 */
export const getStore = key => {
  if (!key) {
    return
  }
  const val = window.sessionStorage.getItem(key)
  return val
}

/**
 * 删除某个sessionStorage
 */
export const removeStore = key => {
  if (!key) return
  window.sessionStorage.removeItem(key)
}

/**
 * 路由授权
 */

import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由白名单
const whiteList = ['/login', '/demo']

router.beforeEach(to => {
  NProgress.start()
  console.log
  // 是否在白名单之列
  if (whiteList.indexOf(to.path) > -1) {
    // 在免登录白名单，直接进入
    return true
  } else {
    if (store.state.user.token) {
      // 判断当前用户权限，无权限则返回登录页
      if (store.state.user.roles.length < 1) {
        // 获取用户信息，包含角色、权限
        store
          .dispatch('user/getUserInfo')
          .then(() => {
            return to
          })
          .catch(err => {
            // 用户信息获取失败，返回登录
            store.dispatch('logout').then(() => {
              ElMessage.error(err)
              return { path: '/login' }
            })
          })
      } else {
        return true
      }
    } else {
      // 没有token
      NProgress.done()
      return { name: 'login' } // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

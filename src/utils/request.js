import axios from 'axios'
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import store from '@/store'
import router from '@/router'
import errorCode from '@/utils/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '', // process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10 * 1000
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 是否需要设置 token， 注册、退出等不需要token信息
    const isToken = (config.headers || {}).isToken === false
    if (store.state.user?.token && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + store.state.user.token // 让每个请求携带自定义token
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    // res.error !== null 则表示请求出错
    if (res.data.error) {
      const code = res.data.error.code || '200'
      if (code === '401') {
        console.log(res)
        return store.dispatch('doRequest', res.config)
      } else {
        ElNotification.error({
          title: res.data.error.message
        })
        return Promise.reject(res.data.error)
      }
    } else {
      return res.data
    }
  },
  error => {
    console.log('err info：', error)
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          return ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('logout').then(() => {
              router.push({
                path: '/login'
              })
            })
          })
        case 404:
          error.message = `${errorCode[error.response.status]}: ${error.response.config.url?.url}`
          break
        default:
          error.message = errorCode[error.response.status]
          break
      }
    }

    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

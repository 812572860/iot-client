/**
 * 登录授权相关接口
 */

import qs from 'qs'
import axios from '@/utils/request'

export const login = ({ username, password }) =>
  axios({
    url: '/api/oauth/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      username,
      password,
      client_id: 'myjszl',
      client_secret: '123',
      grant_type: 'password'
    })
  })

export const logout = () => Promise.resolve()

export const getNewToken = refreshToken =>
  axios({
    url: '/api/oauth/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      client_id: 'myjszl',
      client_secret: '123',
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  })

// export const doRequest = async preRequest => {
//   try {
//     const data = await getNewToken()
//     // 更新缓存
//     setToken(data.access_token)
//     setRefreshToken(data.refresh_token)

//     return axios(preRequest)
//   } catch (err) {
//     // Message({
//     //   message: '登录会话已过期，请重新登录',
//     //   type: 'error',
//     //   duration: 5 * 1000
//     // })
//     // sessionStorage.clear()
//     // router.replace({
//     //   path: '/login'
//     // })
//     return err
//   }
// }

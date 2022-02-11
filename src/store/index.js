import { createStore } from 'vuex'

// // 将modules文件夹中以 module.js结尾的js文件一并导入
// const moduleFiles = require.context('./modules', true, /\.module.js$/)
// const modules = moduleFiles.keys().reduce((pre, filePath) => {
//   // 取出 ./modules/name.module.js 中的name
//   const moduleName = filePath.replace(/^\.\/(.*)\.module.\w+$/, '$1')
//   pre[moduleName] = moduleFiles(filePath)
//   return pre
// }, {})

// console.log(modules)

import app from './modules/app.module'
import user from './modules/user.module'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    user
  }
})

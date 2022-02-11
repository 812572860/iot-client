import { createApp } from 'vue'

import 'element-plus/dist/index.css'
import './assets/style/main.scss'
// import 'animate.css'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from './router'
import store from './store'

// 注册指令
import installDirective from './directives'
// 路由授权
import './permission'

const app = createApp(App)

installDirective(app)

app
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(store)
  .use(router)
  .mount('#app')

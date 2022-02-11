import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import Login from '@/views/login'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/demo',
    children: [
      {
        path: 'demo',
        name: 'demo',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Demo')
      },
      {
        path: 'dictionary',
        name: 'dictionary',
        component: () => import(/* webpackChunkName: "dictionary" */ '../views/baseData/dictionary')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/system/user')
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: "menu" */ '../views/system/menu')
      },
      {
        path: 'department',
        name: 'department',
        component: () => import(/* webpackChunkName: "department" */ '../views/system/department')
      }
    ]
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "error" */ '../views/error/401')
  },
  {
    path: '/*',
    name: '404',
    component: () => import(/* webpackChunkName: "error" */ '../views/error/404')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

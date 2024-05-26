import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import StartInstall from '../views/start/StartInstall.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/*',
    redirect: {
      name: 'StartInstall'
    }
  },
  {
    path: '/',
    redirect: {
      name: 'StartInstall'
    }
  },
  {
    path: '/table/start/install',
    name: 'StartInstall',
    component: StartInstall
  },
  {
    path: '/component/toolbar',
    name: 'ToolbarTest',
    component: () => import('../views/toolbar/ToolbarTest.vue')
  },
  {
    path: '/component/table',
    name: 'TableTest',
    component: () => import('../views/table/TableTest.vue')
  },
  {
    path: '/component/grid',
    name: 'GridTest',
    component: () => import('../views/grid/GridTest.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

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
    path: '/component/table1',
    name: 'TableTest1',
    component: () => import('../views/table/TableTest1.vue')
  },
  {
    path: '/component/table2',
    name: 'TableTest2',
    component: () => import('../views/table/TableTest2.vue')
  },
  {
    path: '/component/table3',
    name: 'TableTest3',
    component: () => import('../views/table/TableTest3.vue')
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

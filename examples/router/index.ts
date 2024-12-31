import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import RouteLayout from '../views/layout/RouteLayout.vue'
import StartInstall from '../views/start/StartInstall.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '*',
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
    component: RouteLayout,
    children: [
      {
        path: 'table1',
        name: 'TableTest1',
        component: () => import('../views/table/TableTest1.vue')
      },
      {
        path: 'table2',
        name: 'TableTest2',
        component: () => import('../views/table/TableTest2.vue')
      },
      {
        path: 'table3',
        name: 'TableTest3',
        component: () => import('../views/table/TableTest3.vue')
      },
      {
        path: 'table4',
        name: 'TableTest4',
        component: () => import('../views/table/TableTest4.vue')
      },
      {
        path: 'table5',
        name: 'TableTest5',
        component: () => import('../views/table/TableTest5.vue')
      },
      {
        path: 'table6',
        name: 'TableTest6',
        component: () => import('../views/table/TableTest6.vue')
      },
      {
        path: 'table7',
        name: 'TableTest7',
        component: () => import('../views/table/TableTest7.vue')
      },
      {
        path: 'table8',
        name: 'TableTest8',
        component: () => import('../views/table/TableTest8.vue')
      },
      {
        path: 'table9',
        name: 'TableTest9',
        component: () => import('../views/table/TableTest9.vue')
      },
      {
        path: 'table10',
        name: 'TableTest10',
        component: () => import('../views/table/TableTest10.vue')
      }
    ]
  },
  {
    path: '/component/grid',
    name: 'GridTest',
    component: () => import('../views/grid/GridTest.vue')
  },
  {
    path: '/keepAlives',
    component: () => import('../views/keepAlives/TestKeepAlive.vue'),
    children: [
      {
        path: 'keepTest1',
        name: 'TestKeepTest1',
        component: () => import('../views/keepAlives/pages/TestTable1.vue')
      },
      {
        path: 'keepTest2',
        name: 'TestKeepTest2',
        component: () => import('../views/keepAlives/pages/TestTable2.vue')
      },
      {
        path: 'keepTest3',
        name: 'TestKeepTest3',
        component: () => import('../views/keepAlives/pages/TestTable3.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

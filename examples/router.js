import Vue from 'vue'
import Router from 'vue-router'

import TableTest from './views/TableTest.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: {
        name: 'TableTest'
      }
    },
    {
      path: '/',
      redirect: {
        name: 'TableTest'
      }
    },
    {
      path: '/table/test',
      name: 'TableTest',
      component: TableTest
    }
  ]
})

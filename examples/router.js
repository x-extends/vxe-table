import Vue from 'vue'
import Router from 'vue-router'

import Table1 from './views/Table1.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Table1',
      component: Table1
    }
  ]
})

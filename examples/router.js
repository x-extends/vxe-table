import Vue from 'vue'
import Router from 'vue-router'

import TableInstall from './views/table/start/Install.vue'
import TableBasic from './views/table/base/Basic.vue'
import TableSize from './views/table/base/Size.vue'
import TableStripe from './views/table/base/Stripe.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'TableInstall',
      component: TableInstall
    },
    {
      path: '/table/basic',
      name: 'TableBasic',
      component: TableBasic
    },
    {
      path: '/table/size',
      name: 'TableSize',
      component: TableSize
    },
    {
      path: '/table/stripe',
      name: 'TableStripe',
      component: TableStripe
    }
  ]
})

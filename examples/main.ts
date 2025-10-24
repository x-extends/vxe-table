import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

import VxeUIBase, { VxeUI } from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import enUS from 'vxe-pc-ui/packages/language/en-US'

import VxeUITable from '../packages'
import '../styles/all.scss'

import './style/index.scss'

VxeUI.setI18n('en-US', enUS)

Vue.use(VxeUIBase)
Vue.use(VxeUITable)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

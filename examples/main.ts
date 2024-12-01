import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

// import VxeUI from 'vxe-pc-ui'
// import 'vxe-pc-ui/lib/style.css'

// import enUS from 'vxe-pc-ui/packages/language/en-US'

import VxeTable from '../packages'
import '../styles/all.scss'

import './style/index.scss'

// VxeUI.setI18n('en-US', enUS)
// VxeUI.setLanguage((localStorage.getItem('VXE_LANGUAGE') as 'zh-CN' | 'en-US') || 'zh-CN')

// Vue.use(VxeUI)
Vue.use(VxeTable)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

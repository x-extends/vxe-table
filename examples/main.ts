import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import VxeUI from 'vxe-pc-ui'
// import 'vxe-pc-ui/lib/style.css'

// import enUS from 'vxe-pc-ui/packages/language/en-US'

import VxeTable from '../packages'
import '../styles/all.scss'

import './style/index.scss'

// VxeUI.setI18n('en-US', enUS)

createApp(App)
  .use(router)
  // .use(VxeUI)
  .use(VxeTable)
  .mount('#app')

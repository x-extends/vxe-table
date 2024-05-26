import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import VxeUI from 'vxe-pc-ui'
// import 'vxe-pc-ui/lib/style.css'

import VxeUITable from '../packages'
import '../styles/all.scss'

import './style/index.scss'

createApp(App)
  .use(router)
  // .use(VxeUI)
  .use(VxeUITable)
  .mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VxeUIBase from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import enUS from 'vxe-pc-ui/packages/language/en-US'

import VxeUITable from '../packages'
import '../styles/all.scss'

import './style/index.scss'

VxeUIBase.setI18n('en-US', enUS)

createApp(App)
  .use(router)
  .use(VxeUIBase)
  .use(VxeUITable)
  .mount('#app')

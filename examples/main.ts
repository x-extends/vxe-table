import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'

import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import enUS from 'vxe-pc-ui/packages/language/en-US'

import VxeTable from '../packages'
import '../styles/all.scss'

import './style/index.scss'

VxeUI.setI18n('en-US', enUS)

VxeUI.renderer.add('CellImage', {
  renderTableDefault (_renderOpts, params) {
    const { props } = _renderOpts
    const { column, row } = params
    return h(VxeUI.VxeImage, {
      width: '100%',
      ...props,
      src: row[column.field]
    })
  }
})

createApp(App)
  .use(router)
  .use(VxeUI)
  .use(VxeTable)
  .mount('#app')

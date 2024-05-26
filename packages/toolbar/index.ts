import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeToolbarComponent from './src/toolbar'

export const VxeToolbar = Object.assign({}, VxeToolbarComponent, {
  install (app: App) {
    app.component(VxeToolbarComponent.name as string, VxeToolbarComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.component(VxeToolbarComponent.name as string, VxeToolbarComponent)
}

export const Toolbar = VxeToolbar
export default VxeToolbar

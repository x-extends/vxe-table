import { VueConstructor } from 'vue'
import { VxeUI } from '../ui'
import VxeToolbarComponent from './src/toolbar'

export const VxeToolbar = Object.assign({}, VxeToolbarComponent, {
  install (app: VueConstructor) {
    app.component(VxeToolbarComponent.name as string, VxeToolbarComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.component(VxeToolbarComponent.name as string, VxeToolbarComponent)
}

VxeUI.component(VxeToolbarComponent)

export const Toolbar = VxeToolbar
export default VxeToolbar

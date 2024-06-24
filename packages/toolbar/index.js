import VxeToolbarComponent from './src/toolbar'
import VxeUI from '../v-x-e-table'

export const VxeToolbar = Object.assign(VxeToolbarComponent, {
  install (Vue) {
    Vue.component(VxeToolbarComponent.name, VxeToolbarComponent)
  }
})
VxeUI.component(VxeToolbarComponent)

export const Toolbar = VxeToolbar

export default VxeToolbar

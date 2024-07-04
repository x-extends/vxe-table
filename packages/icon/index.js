import VxeIconComponent from './src/icon'
import VxeUI from '../v-x-e-table'

export const VxeIcon = Object.assign(VxeIconComponent, {
  install (Vue) {
    Vue.component(VxeIconComponent.name, VxeIconComponent)
  }
})
VxeUI.component(VxeIconComponent)

export const Icon = VxeIcon

export default VxeIcon

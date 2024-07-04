import VxePulldownComponent from './src/pulldown'
import VxeUI from '../v-x-e-table'

export const VxePulldown = Object.assign(VxePulldownComponent, {
  install (Vue) {
    Vue.component(VxePulldownComponent.name, VxePulldownComponent)
  }
})
VxeUI.component(VxePulldownComponent)

export const Pulldown = VxePulldown

export default VxePulldown

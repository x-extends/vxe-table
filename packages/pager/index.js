import VxePagerComponent from './src/pager'
import VxeUI from '../v-x-e-table'

export const VxePager = Object.assign(VxePagerComponent, {
  install (Vue) {
    Vue.component(VxePagerComponent.name, VxePagerComponent)
  }
})
VxeUI.component(VxePagerComponent)

export const Pager = VxePager

export default VxePager

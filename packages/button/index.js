import VxeButtonComponent from './src/button'
import VxeUI from '../v-x-e-table'

export const VxeButton = Object.assign(VxeButtonComponent, {
  install (Vue) {
    Vue.component(VxeButtonComponent.name, VxeButtonComponent)
  }
})
VxeUI.component(VxeButtonComponent)

export const Button = VxeButton

export default VxeButton

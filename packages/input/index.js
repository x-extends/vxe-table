import VxeInputComponent from './src/input'
import VxeUI from '../v-x-e-table'

export const VxeInput = Object.assign(VxeInputComponent, {
  install (Vue) {
    Vue.component(VxeInputComponent.name, VxeInputComponent)
  }
})
VxeUI.component(VxeInputComponent)

export const Input = VxeInput

export default VxeInput

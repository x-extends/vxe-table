import VxeInputComponent from './src/input'

export const VxeInput = Object.assign(VxeInputComponent, {
  install (Vue) {
    Vue.component(VxeInputComponent.name, VxeInputComponent)
  }
})

export const Input = VxeInput

export default VxeInput

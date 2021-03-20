import VxeInput from './src/input'

export const Input = Object.assign(VxeInput, {
  install (Vue) {
    Vue.component(VxeInput.name, VxeInput)
  }
})

export default Input

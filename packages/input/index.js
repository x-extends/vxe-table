import VxeInput from './src/input'

VxeInput.install = function (Vue) {
  Vue.component(VxeInput.name, VxeInput)
}

export const Input = VxeInput
export default VxeInput

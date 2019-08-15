import VxeInput from './src/input'
import VxeTextarea from './src/textarea'

VxeInput.install = function (Vue) {
  Vue.component(VxeInput.name, VxeInput)
  Vue.component(VxeTextarea.name, VxeTextarea)
}

export const Input = VxeInput
export default VxeInput

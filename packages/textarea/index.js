import VxeTextarea from './src/textarea'

VxeTextarea.install = function (Vue) {
  Vue.component(VxeTextarea.name, VxeTextarea)
}

export const Textarea = VxeTextarea
export default VxeTextarea

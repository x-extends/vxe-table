import VxeCheckbox from './src/checkbox'

VxeCheckbox.install = function (Vue) {
  Vue.component(VxeCheckbox.name, VxeCheckbox)
}

export const Checkbox = VxeCheckbox
export default VxeCheckbox

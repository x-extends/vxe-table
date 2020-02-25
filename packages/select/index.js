import VxeSelect from './src/select'
import VxeOption from './src/option'
import VxeOptgroup from './src/optgroup'

VxeSelect.install = function (Vue) {
  Vue.component(VxeSelect.name, VxeSelect)
  Vue.component(VxeOption.name, VxeOption)
  Vue.component(VxeOptgroup.name, VxeOptgroup)
}

export const Select = VxeSelect
export default VxeSelect

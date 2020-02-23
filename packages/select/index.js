import VxeSelect from './src/select'
import VxeOption from './src/option'
import VxeOptionGroup from './src/option-group'

VxeSelect.install = function (Vue) {
  Vue.component(VxeSelect.name, VxeSelect)
  Vue.component(VxeOption.name, VxeOption)
  Vue.component(VxeOptionGroup.name, VxeOptionGroup)
}

export const Pager = VxeSelect
export default VxeSelect

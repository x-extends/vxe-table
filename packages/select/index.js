import VxeSelect from './src/select'
import VxeOption from './src/option'
import VxeOptgroup from './src/optgroup'

export const Select = Object.assign(VxeSelect, {
  Option: VxeOption,
  Optgroup: VxeOptgroup,
  install (Vue) {
    Vue.component(VxeSelect.name, VxeSelect)
    Vue.component(VxeOption.name, VxeOption)
    Vue.component(VxeOptgroup.name, VxeOptgroup)
  }
})

export default Select

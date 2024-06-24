import VxeSelectComponent from './src/select'
import VxeOptionComponent from './src/option'
import VxeOptgroupComponent from './src/optgroup'
import VxeUI from '../v-x-e-table'

export const VxeSelect = Object.assign(VxeSelectComponent, {
  Option: VxeOptionComponent,
  Optgroup: VxeOptgroupComponent,
  install (Vue) {
    Vue.component(VxeSelectComponent.name, VxeSelectComponent)
    Vue.component(VxeOptionComponent.name, VxeOptionComponent)
    Vue.component(VxeOptgroupComponent.name, VxeOptgroupComponent)
  }
})
VxeUI.component(VxeSelectComponent)

export const Select = VxeSelect

export default VxeSelect

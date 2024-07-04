import VxeButtonGroupComponent from '../button/src/group'
import VxeUI from '../v-x-e-table'

export const VxeButtonGroup = Object.assign(VxeButtonGroupComponent, {
  install (Vue) {
    Vue.component(VxeButtonGroupComponent.name, VxeButtonGroupComponent)
  }
})
VxeUI.component(VxeButtonGroupComponent)

export const ButtonGroup = VxeButtonGroup

export default VxeButtonGroup

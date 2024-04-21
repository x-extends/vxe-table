import VxeButtonGroupComponent from '../button/src/group'

export const VxeButtonGroup = Object.assign(VxeButtonGroupComponent, {
  install (Vue) {
    Vue.component(VxeButtonGroupComponent.name, VxeButtonGroupComponent)
  }
})

export const ButtonGroup = VxeButtonGroup

export default VxeButtonGroup

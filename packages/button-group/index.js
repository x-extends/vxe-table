import VxeButtonGroup from '../button/src/group'

export const ButtonGroup = Object.assign(VxeButtonGroup, {
  install (Vue) {
    Vue.component(VxeButtonGroup.name, VxeButtonGroup)
  }
})

export default ButtonGroup

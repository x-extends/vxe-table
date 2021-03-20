import VxeCheckboxGroup from '../checkbox/src/group'

export const CheckboxGroup = Object.assign(VxeCheckboxGroup, {
  install (Vue) {
    Vue.component(VxeCheckboxGroup.name, VxeCheckboxGroup)
  }
})

export default CheckboxGroup

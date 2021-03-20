import VxeCheckbox from './src/checkbox'

export const Checkbox = Object.assign(VxeCheckbox, {
  install (Vue) {
    Vue.component(VxeCheckbox.name, VxeCheckbox)
  }
})

export default Checkbox

import VxeOption from '../select/src/option'

export const Option = Object.assign(VxeOption, {
  install (Vue) {
    Vue.component(VxeOption.name, VxeOption)
  }
})

export default Option

import VxeIcon from './src/icon'

export const Icon = Object.assign(VxeIcon, {
  install (Vue) {
    Vue.component(VxeIcon.name, VxeIcon)
  }
})

export default Icon

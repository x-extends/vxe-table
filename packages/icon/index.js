import VxeIconComponent from './src/icon'

export const VxeIcon = Object.assign(VxeIconComponent, {
  install (Vue) {
    Vue.component(VxeIconComponent.name, VxeIconComponent)
  }
})

export const Icon = VxeIcon

export default VxeIcon

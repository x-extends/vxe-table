import VxeToolbarComponent from './src/toolbar'

export const VxeToolbar = Object.assign(VxeToolbarComponent, {
  install (Vue) {
    Vue.component(VxeToolbarComponent.name, VxeToolbarComponent)
  }
})

export const Toolbar = VxeToolbar

export default VxeToolbar

import VxeToolbar from './src/toolbar'

export const Toolbar = Object.assign(VxeToolbar, {
  install (Vue) {
    Vue.component(VxeToolbar.name, VxeToolbar)
  }
})

export default Toolbar

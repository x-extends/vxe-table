import VxeToolbar from './src/toolbar'

VxeToolbar.install = function (Vue) {
  Vue.component(VxeToolbar.name, VxeToolbar)
}

export const Toolbar = VxeToolbar
export default VxeToolbar

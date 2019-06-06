import VxePager from './src/pager'

VxePager.install = function (Vue) {
  Vue.component(VxePager.name, VxePager)
}

export const Pager = VxePager
export default VxePager

import VxePager from './src/pager'

export const Pager = Object.assign(VxePager, {
  install (Vue) {
    Vue.component(VxePager.name, VxePager)
  }
})

export default Pager

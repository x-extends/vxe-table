import VxePagerComponent from './src/pager'

export const VxePager = Object.assign(VxePagerComponent, {
  install (Vue) {
    Vue.component(VxePagerComponent.name, VxePagerComponent)
  }
})

export const Pager = VxePager

export default VxePager

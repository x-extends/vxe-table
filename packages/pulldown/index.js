import VxePulldownComponent from './src/pulldown'

export const VxePulldown = Object.assign(VxePulldownComponent, {
  install (Vue) {
    Vue.component(VxePulldownComponent.name, VxePulldownComponent)
  }
})

export const Pulldown = VxePulldown

export default VxePulldown

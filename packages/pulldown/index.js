import VxePulldown from './src/pulldown'

export const Pulldown = Object.assign(VxePulldown, {
  install (Vue) {
    Vue.component(VxePulldown.name, VxePulldown)
  }
})

export default Pulldown

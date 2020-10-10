import VxePulldown from './src/pulldown'

VxePulldown.install = function (Vue) {
  Vue.component(VxePulldown.name, VxePulldown)
}

export const Pulldown = VxePulldown
export default VxePulldown

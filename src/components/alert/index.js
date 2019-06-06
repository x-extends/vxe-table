import VxeAlert from './src/alert'

VxeAlert.install = function (Vue) {
  Vue.component(VxeAlert.name, VxeAlert)
}

export const Button = VxeAlert
export default VxeAlert

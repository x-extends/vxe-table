import VxeButton from './src/button'

VxeButton.install = function (Vue) {
  Vue.component(VxeButton.name, VxeButton)
}

export const Button = VxeButton
export default VxeButton

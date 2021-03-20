import VxeButton from './src/button'

export const Button = Object.assign(VxeButton, {
  install (Vue) {
    Vue.component(VxeButton.name, VxeButton)
  }
})

export default Button

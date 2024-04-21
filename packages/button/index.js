import VxeButtonComponent from './src/button'

export const VxeButton = Object.assign(VxeButtonComponent, {
  install (Vue) {
    Vue.component(VxeButtonComponent.name, VxeButtonComponent)
  }
})

export const Button = VxeButton

export default VxeButton

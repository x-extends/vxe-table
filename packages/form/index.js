import VxeFormComponent from './src/form'

export const VxeForm = Object.assign(VxeFormComponent, {
  install (Vue) {
    Vue.component(VxeFormComponent.name, VxeFormComponent)
  }
})

export const Form = VxeForm

export default VxeForm

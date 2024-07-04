import VxeFormComponent from './src/form'
import VxeUI from '../v-x-e-table'

export const VxeForm = Object.assign(VxeFormComponent, {
  install (Vue) {
    Vue.component(VxeFormComponent.name, VxeFormComponent)
  }
})
VxeUI.component(VxeFormComponent)

export const Form = VxeForm

export default VxeForm

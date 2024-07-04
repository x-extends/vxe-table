import VxeTextareaComponent from './src/textarea'
import VxeUI from '../v-x-e-table'

export const VxeTextarea = Object.assign(VxeTextareaComponent, {
  install (Vue) {
    Vue.component(VxeTextareaComponent.name, VxeTextareaComponent)
  }
})
VxeUI.component(VxeTextareaComponent)

export const Textarea = VxeTextarea

export default VxeTextarea

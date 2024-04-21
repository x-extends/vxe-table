import VxeTextareaComponent from './src/textarea'

export const VxeTextarea = Object.assign(VxeTextareaComponent, {
  install (Vue) {
    Vue.component(VxeTextareaComponent.name, VxeTextareaComponent)
  }
})

export const Textarea = VxeTextarea

export default VxeTextarea

import VxeTextarea from './src/textarea'

export const Textarea = Object.assign(VxeTextarea, {
  install (Vue) {
    Vue.component(VxeTextarea.name, VxeTextarea)
  }
})

export default Textarea

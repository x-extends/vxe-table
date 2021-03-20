import VxeForm from './src/form'

export const Form = Object.assign(VxeForm, {
  install (Vue) {
    Vue.component(VxeForm.name, VxeForm)
  }
})

export default Form

import VxeFormGather from '../form/src/form-gather'

export const FormGather = Object.assign(VxeFormGather, {
  install (Vue) {
    Vue.component(VxeFormGather.name, VxeFormGather)
  }
})

export default FormGather

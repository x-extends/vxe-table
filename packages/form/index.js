import VxeForm from './src/form'
import VxeFormItem from './src/form-item'

export const Form = Object.assign(VxeForm, {
  Item: VxeFormItem,
  install (Vue) {
    Vue.component(VxeForm.name, VxeForm)
    Vue.component(VxeFormItem.name, VxeFormItem)
  }
})

export default VxeForm

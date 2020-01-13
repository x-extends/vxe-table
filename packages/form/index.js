import VxeForm from './src/form'
import VxeFormItem from './src/form-item'

VxeForm.install = function (Vue) {
  Vue.component(VxeForm.name, VxeForm)
  Vue.component(VxeFormItem.name, VxeFormItem)
}

export const Form = VxeForm
export default VxeForm

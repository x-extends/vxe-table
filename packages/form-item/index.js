import VxeFormItem from '../form/src/form-item'

export const FormItem = Object.assign(VxeFormItem, {
  install (Vue) {
    Vue.component(VxeFormItem.name, VxeFormItem)
  }
})

export default FormItem

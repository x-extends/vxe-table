import VxeFormItemComponent from '../form/src/form-item'

export const VxeFormItem = Object.assign(VxeFormItemComponent, {
  install (Vue) {
    Vue.component(VxeFormItemComponent.name, VxeFormItemComponent)
  }
})

export const FormItem = VxeFormItem

export default VxeFormItem

import VxeFormItemComponent from '../form/src/form-item'
import VxeUI from '../v-x-e-table'

export const VxeFormItem = Object.assign(VxeFormItemComponent, {
  install (Vue) {
    Vue.component(VxeFormItemComponent.name, VxeFormItemComponent)
  }
})
VxeUI.component(VxeFormItemComponent)

export const FormItem = VxeFormItem

export default VxeFormItem

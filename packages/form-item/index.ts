import { App } from 'vue'
import VxeFormItemComponent from '../form/src/form-item'
import { dynamicApp } from '../dynamics'

export const VxeFormItem = Object.assign(VxeFormItemComponent, {
  install (app: App) {
    app.component(VxeFormItemComponent.name, VxeFormItemComponent)
  }
})

export const FormItem = VxeFormItem

dynamicApp.component(VxeFormItemComponent.name, VxeFormItemComponent)

export default VxeFormItem

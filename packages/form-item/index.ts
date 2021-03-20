import { App } from 'vue'
import VxeFormItemComponent from '../form/src/form-item'
import { dynamicApp } from '../dynamics'

export const FormItem = Object.assign(VxeFormItemComponent, {
  install (app: App) {
    dynamicApp.component(VxeFormItemComponent.name, VxeFormItemComponent)
    app.component(VxeFormItemComponent.name, VxeFormItemComponent)
  }
})

export default FormItem

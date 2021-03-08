import { App } from 'vue'
import VxeFormComponent from './src/form'
import VxeFormItemComponent from './src/form-item'
import { dynamicApp } from '../dynamics'

export const Form = Object.assign(VxeFormComponent, {
  Item: VxeFormItemComponent,
  install (app: App) {
    dynamicApp.component(VxeFormComponent.name, VxeFormComponent)
    dynamicApp.component(VxeFormItemComponent.name, VxeFormItemComponent)
    app.component(VxeFormComponent.name, VxeFormComponent)
    app.component(VxeFormItemComponent.name, VxeFormItemComponent)
  }
})

export default Form

import { App } from 'vue'
import VxeFormComponent from './src/form'
import { dynamicApp } from '../dynamics'

export const Form = Object.assign(VxeFormComponent, {
  install (app: App) {
    dynamicApp.component(VxeFormComponent.name, VxeFormComponent)
    app.component(VxeFormComponent.name, VxeFormComponent)
  }
})

export default Form

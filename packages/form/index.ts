import { App } from 'vue'
import VxeFormComponent from './src/form'
import VxeFormItemComponent from './src/form-item'

export const Form = {
  install (app: App) {
    app.component(VxeFormComponent.name, VxeFormComponent)
    app.component(VxeFormItemComponent.name, VxeFormItemComponent)
  }
}

export default Form

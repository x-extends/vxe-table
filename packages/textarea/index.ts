import { App } from 'vue'
import VxeTextareaComponent from './src/textarea'
import { dynamicApp } from '../dynamics'

export const Textarea = Object.assign(VxeTextareaComponent, {
  install: function (app: App) {
    app.component(VxeTextareaComponent.name, VxeTextareaComponent)
  }
})

dynamicApp.component(VxeTextareaComponent.name, VxeTextareaComponent)

export default Textarea

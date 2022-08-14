import { App } from 'vue'
import VxeTextareaComponent from './src/textarea'
import { dynamicApp } from '../dynamics'

export const VxeTextarea = Object.assign(VxeTextareaComponent, {
  install: function (app: App) {
    app.component(VxeTextareaComponent.name, VxeTextareaComponent)
  }
})

export const Textarea = VxeTextarea

dynamicApp.component(VxeTextareaComponent.name, VxeTextareaComponent)

export default VxeTextarea

import { App } from 'vue'
import VxeTextareaComponent from './src/textarea'

export const Textarea = {
  install: function (app: App) {
    app.component(VxeTextareaComponent.name, VxeTextareaComponent)
  }
}

export default Textarea

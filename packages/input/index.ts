import { App } from 'vue'
import VxeInputConstructor from './src/input'

export const Input = {
  install (app: App) {
    app.component(VxeInputConstructor.name, VxeInputConstructor)
  }
}

export default Input

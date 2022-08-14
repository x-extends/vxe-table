import { App } from 'vue'
import VxeInputConstructor from './src/input'
import { dynamicApp } from '../dynamics'

export const VxeInput = Object.assign(VxeInputConstructor, {
  install (app: App) {
    app.component(VxeInputConstructor.name, VxeInputConstructor)
  }
})

export const Input = VxeInput

dynamicApp.component(VxeInputConstructor.name, VxeInputConstructor)

export default VxeInput

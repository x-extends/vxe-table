import { App } from 'vue'
import VxeInputConstructor from './src/input'
import { dynamicApp } from '../dynamics'

export const Input = Object.assign(VxeInputConstructor, {
  install (app: App) {
    app.component(VxeInputConstructor.name, VxeInputConstructor)
  }
})

dynamicApp.component(VxeInputConstructor.name, VxeInputConstructor)

export default Input

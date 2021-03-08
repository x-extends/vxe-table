import { App } from 'vue'
import VxeInputConstructor from './src/input'
import { dynamicApp } from '../dynamics'

export const Input = Object.assign(VxeInputConstructor, {
  install (app: App) {
    dynamicApp.component(VxeInputConstructor.name, VxeInputConstructor)
    app.component(VxeInputConstructor.name, VxeInputConstructor)
  }
})

export default Input

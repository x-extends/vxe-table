import { App } from 'vue'
import VxeFormGatherComponent from '../form/src/form-gather'
import { dynamicApp } from '../dynamics'

export const FormGather = Object.assign(VxeFormGatherComponent, {
  install (app: App) {
    dynamicApp.component(VxeFormGatherComponent.name, VxeFormGatherComponent)
    app.component(VxeFormGatherComponent.name, VxeFormGatherComponent)
  }
})

export default FormGather

import { App } from 'vue'
import VxeFormGatherComponent from '../form/src/form-gather'
import { dynamicApp } from '../dynamics'

export const VxeFormGather = Object.assign(VxeFormGatherComponent, {
  install (app: App) {
    app.component(VxeFormGatherComponent.name, VxeFormGatherComponent)
  }
})

export const FormGather = VxeFormGather

dynamicApp.component(VxeFormGatherComponent.name, VxeFormGatherComponent)

export default VxeFormGather

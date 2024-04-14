import { App } from 'vue'
import VxeButtonGroupComponent from '../button/src/group'
import { dynamicApp } from '../dynamics'

export const VxeButtonGroup = Object.assign(VxeButtonGroupComponent, {
  install (app: App) {
    app.component(VxeButtonGroupComponent.name, VxeButtonGroupComponent)
  }
})

export const ButtonGroup = VxeButtonGroup

dynamicApp.component(VxeButtonGroupComponent.name, VxeButtonGroupComponent)

export default VxeButtonGroup

import { App } from 'vue'
import VxeTooltipComponent from './src/tooltip'
import { dynamicApp } from '../dynamics'

export const Tooltip = Object.assign(VxeTooltipComponent, {
  install: function (app: App) {
    dynamicApp.component(VxeTooltipComponent.name, VxeTooltipComponent)
    app.component(VxeTooltipComponent.name, VxeTooltipComponent)
  }
})

export default Tooltip

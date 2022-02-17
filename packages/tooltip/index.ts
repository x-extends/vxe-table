import { App } from 'vue'
import { VXETable } from '../v-x-e-table'
import VxeTooltipComponent from './src/tooltip'
import { dynamicApp } from '../dynamics'

export const Tooltip = Object.assign(VxeTooltipComponent, {
  install: function (app: App) {
    VXETable.tooltip = true
    app.component(VxeTooltipComponent.name, VxeTooltipComponent)
  }
})

dynamicApp.component(VxeTooltipComponent.name, VxeTooltipComponent)

export default Tooltip

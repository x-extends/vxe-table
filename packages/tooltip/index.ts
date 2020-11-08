import { App } from 'vue'
import VxeTooltipComponent from './src/tooltip'

export const Tooltip = {
  install: function (app: App) {
    app.component(VxeTooltipComponent.name, VxeTooltipComponent)
  }
}

export default Tooltip

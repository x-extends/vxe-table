import VxeTooltipComponent from './src/tooltip'
import VxeUI from '../v-x-e-table'

export const VxeTooltip = Object.assign(VxeTooltipComponent, {
  install (Vue) {
    VxeUI._tooltip = 1
    Vue.component(VxeTooltipComponent.name, VxeTooltipComponent)
  }
})
VxeUI.component(VxeTooltipComponent)

export const Tooltip = VxeTooltip

export default VxeTooltip

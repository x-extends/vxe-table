import VxeTooltipComponent from './src/tooltip'
import VXETable from '../v-x-e-table'

export const VxeTooltip = Object.assign(VxeTooltipComponent, {
  install (Vue) {
    VXETable._tooltip = 1
    Vue.component(VxeTooltipComponent.name, VxeTooltipComponent)
  }
})

export const Tooltip = VxeTooltip

export default VxeTooltip

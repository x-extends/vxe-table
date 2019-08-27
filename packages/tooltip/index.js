import VxeTooltip from './src/tooltip'
import VXETable from '../v-x-e-table'

VxeTooltip.install = function (Vue) {
  VXETable._tooltip = 1
  Vue.component(VxeTooltip.name, VxeTooltip)
}

export const Tooltip = VxeTooltip
export default VxeTooltip

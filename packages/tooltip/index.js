import VxeTooltip from './src/tooltip'
import VXETable from '../v-x-e-table'

export const Tooltip = Object.assign(VxeTooltip, {
  install (Vue) {
    VXETable._tooltip = 1
    Vue.component(VxeTooltip.name, VxeTooltip)
  }
})

export default Tooltip

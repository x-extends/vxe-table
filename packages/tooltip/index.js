import VxeTooltip from './src/tooltip'
import GlobalConfig from '../conf'

VxeTooltip.install = function (Vue) {
  GlobalConfig._tip = 1
  Vue.component(VxeTooltip.name, VxeTooltip)
}

export const Tooltip = VxeTooltip
export default VxeTooltip

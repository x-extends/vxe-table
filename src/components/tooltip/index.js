import VxeTooltip from './src/tooltip'

VxeTooltip.install = function (Vue) {
  Vue.component(VxeTooltip.name, VxeTooltip)
}

export const Tooltip = VxeTooltip
export default VxeTooltip

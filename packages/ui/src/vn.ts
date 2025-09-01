import XEUtils from 'xe-utils'

import type { VxeGlobalRendererHandles } from 'vxe-pc-ui'
import type { VxeComponentSlotType } from '../../../types'

export function getOnName (type: string) {
  return XEUtils.kebabCase(type)
}

export function getModelEvent (renderOpts: VxeGlobalRendererHandles.RenderOptions) {
  switch (renderOpts.name) {
    case 'VxeInput':
    case 'VxeTextarea':
    case 'VxeNumberInput':
    case 'VxePasswordInput':
    case 'VxeSelect':
    case 'VxeTreeSelect':
    case 'VxeTableSelect':
    case 'VxeDatePicker':
    case 'VxeDateRangePicker':
    case 'VxeIconPicker':
    case 'VxeColorPicker':
    case 'VxeSlider':
    case 'VxeUpload':
      return 'modelValue'
    case 'select':
      return 'change'
  }
  return 'input'
}

export function getChangeEvent (renderOpts: VxeGlobalRendererHandles.RenderOptions) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
    case 'VxeInput':
    case 'VxeTextarea':
    case '$input':// 已废弃
    case '$textarea':// 已废弃
      return 'input'
  }
  return 'change'
}

export function getSlotVNs (vns: VxeComponentSlotType | VxeComponentSlotType[] | undefined) {
  if (vns === null || vns === undefined) {
    return []
  }
  if (XEUtils.isArray(vns)) {
    return vns
  }
  return [vns]
}

import XEUtils from 'xe-utils'

import type { VxeGlobalRendererHandles } from 'vxe-pc-ui'
import type { VxeComponentSlotType } from '../../../types'

export function getOnName (type: string) {
  return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1)
}

export function getModelEvent (renderOpts: VxeGlobalRendererHandles.RenderOptions) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
      return 'input'
    case 'select':
      return 'change'
  }
  return 'update:modelValue'
}

export function getChangeEvent (renderOpts: VxeGlobalRendererHandles.RenderOptions) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
    case 'VxeInput':
    case 'VxeNumberInput':
    case 'VxeTextarea':
    case '$input':
    case '$textarea':
      return 'input'
  }
  return 'change'
}

export function hasInputType (renderOpts: VxeGlobalRendererHandles.RenderOptions) {
  switch (renderOpts.name) {
    case 'VxeInput':
    case 'VxeNumberInput':
    case 'VxeTextarea':
    case '$input':
    case '$textarea':
      return true
  }
  return false
}

export function getSlotVNs (vns: VxeComponentSlotType | VxeComponentSlotType[]) {
  if (vns === null || vns === undefined) {
    return []
  }
  if (XEUtils.isArray(vns)) {
    return vns
  }
  return [vns]
}

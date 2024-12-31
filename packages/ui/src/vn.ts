import XEUtils from 'xe-utils'

import type { VxeComponentSlotType } from '../../../types'

export function getOnName (type: string) {
  return XEUtils.kebabCase(type)
}

export function getModelEvent (renderOpts: any) {
  switch (renderOpts.name) {
    case 'input':
    case 'textarea':
      return 'input'
    case 'select':
      return 'change'
  }
  return 'modelValue'
}

export function getChangeEvent (renderOpts: any) {
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

export function getSlotVNs (vns: VxeComponentSlotType | VxeComponentSlotType[] | undefined) {
  if (vns === null || vns === undefined) {
    return []
  }
  if (XEUtils.isArray(vns)) {
    return vns
  }
  return [vns]
}

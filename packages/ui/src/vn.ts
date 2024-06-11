import XEUtils from 'xe-utils'

import type { VxeComponentSlotType } from '../../../types'

export function getOnName (type: string) {
  return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1)
}

export function getSlotVNs (vns: VxeComponentSlotType | VxeComponentSlotType[]) {
  if (XEUtils.isArray(vns)) {
    return vns
  }
  return [vns]
}

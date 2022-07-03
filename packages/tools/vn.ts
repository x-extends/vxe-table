import XEUtils from 'xe-utils'
import { SlotVNodeType } from '../../types/all'

export function getOnName (type: string) {
  return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1)
}

export function getSlotVNs (vns: SlotVNodeType | SlotVNodeType[]) {
  if (XEUtils.isArray(vns)) {
    return vns
  }
  return [vns]
}

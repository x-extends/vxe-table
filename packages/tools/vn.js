import XEUtils from 'xe-utils'

export function getSlotVNs (vns) {
  if (XEUtils.isArray(vns)) {
    return vns
  }
  return [vns]
}

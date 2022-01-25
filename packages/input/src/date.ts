import XEUtils from 'xe-utils'

import { VxeInputPropTypes } from '../../../types/all'

export function toStringTimeDate (str: VxeInputPropTypes.ModelValue) {
  if (str) {
    const rest = new Date()
    let h = 0
    let m = 0
    let s = 0
    if (XEUtils.isDate(str)) {
      h = str.getHours()
      m = str.getMinutes()
      s = str.getSeconds()
    } else {
      str = XEUtils.toValueString(str)
      const parses = str.match(/^(\d{1,2})(:(\d{1,2}))?(:(\d{1,2}))?/)
      if (parses) {
        h = XEUtils.toNumber(parses[1])
        m = XEUtils.toNumber(parses[3])
        s = XEUtils.toNumber(parses[5])
      }
    }
    rest.setHours(h)
    rest.setMinutes(m)
    rest.setSeconds(s)
    return rest
  }
  return new Date('')
}

export function getDateQuarter (date: Date) {
  const month = date.getMonth()
  if (month < 3) {
    return 1
  } else if (month < 6) {
    return 2
  } else if (month < 9) {
    return 3
  }
  return 4
}

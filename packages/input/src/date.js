import XEUtils from 'xe-utils'

export function toStringTimeDate (str) {
  if (str) {
    const rest = new Date()
    let h, m, s
    if (XEUtils.isDate(str)) {
      h = str.getHours()
      m = str.getMinutes()
      s = str.getSeconds()
    } else {
      str = XEUtils.toValueString(str)
      const parses = str.match(/^(\d{1,2})(:(\d{1,2}))?(:(\d{1,2}))?/)
      if (parses) {
        h = parses[1]
        m = parses[3]
        s = parses[5]
      }
    }
    rest.setHours(h || 0)
    rest.setMinutes(m || 0)
    rest.setSeconds(s || 0)
    return rest
  }
  return new Date('')
}

export function getDateQuarter (date) {
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

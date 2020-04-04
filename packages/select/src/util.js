import XEUtils from 'xe-utils/methods/xe-utils'

export function getOptkey (_vm) {
  return _vm.optId || '_XID'
}

export function getOptid (_vm, option) {
  const optid = option[getOptkey(_vm)]
  return optid ? encodeURIComponent(optid) : ''
}

export function getOptUniqueId () {
  return XEUtils.uniqueId('opt_')
}

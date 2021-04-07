import XEUtils from 'xe-utils'

export class OptionInfo {
  constructor ($xeselect: any, _vm: any) {
    Object.assign(this, {
      id: XEUtils.uniqueId('option_'),
      value: _vm.value,
      label: _vm.label,
      visible: _vm.visible,
      className: _vm.className,
      disabled: _vm.disabled
    })
  }

  update (name: any, value: any) {
    this[name] = value
  }

  [key: string]: any
}

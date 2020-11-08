export class OptionInfo {
  constructor ($xeselect: any, _vm: any) {
    Object.assign(this, {
      value: _vm.value,
      label: _vm.label,
      visible: _vm.visible,
      disabled: _vm.disabled
    })
  }

  update (name: any, value: any) {
    this[name] = value
  }

  [key: string]: any
}

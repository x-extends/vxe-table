import XEUtils from 'xe-utils/ctor'

class OptionConfig {
  constructor ($xeselect, _vm) {
    Object.assign(this, {
      value: _vm.value,
      label: _vm.label,
      visible: _vm.visible,
      disabled: _vm.disabled
    })
  }

  update (name, value) {
    this[name] = value
  }
}

export function isOption (option) {
  return option instanceof OptionConfig
}

export function getOptionConfig ($xeselect, _vm, options) {
  return isOption(_vm) ? _vm : new OptionConfig($xeselect, _vm, options)
}

export function createOption ($xeselect, _vm) {
  return getOptionConfig($xeselect, _vm)
}

export function destroyOption (_vm) {
  const { $xeselect, optionConfig } = _vm
  const matchObj = XEUtils.findTree($xeselect.collectOption, option => option === optionConfig)
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1)
  }
}

export function assemOption (_vm) {
  const { $el, $xeselect, $xeoptgroup, optionConfig } = _vm
  const groupConfig = $xeoptgroup ? $xeoptgroup.optionConfig : null
  optionConfig.slots = _vm.$scopedSlots
  if (groupConfig) {
    if (!groupConfig.options) {
      groupConfig.options = []
    }
    groupConfig.options.splice([].indexOf.call($xeoptgroup.$el.children, $el), 0, optionConfig)
  } else {
    $xeselect.collectOption.splice([].indexOf.call($xeselect.$refs.hideOption.children, $el), 0, optionConfig)
  }
}

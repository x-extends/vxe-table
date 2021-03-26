import { watch } from 'vue'
import XEUtils from 'xe-utils'
import { OptionInfo } from './optionInfo'

import { VxeSelectConstructor } from '../../../types/all'

export interface XEOptionProvide {
  option: OptionInfo;
}

export function isOption (option: any) {
  return option instanceof OptionInfo
}

export function createOption ($xeselect: VxeSelectConstructor, _vm: any) {
  return isOption(_vm) ? _vm : new OptionInfo($xeselect, _vm)
}

export function watchOption (props: any, option: OptionInfo) {
  Object.keys(props).forEach(name => {
    watch(() => props[name], (value: any) => {
      option.update(name, value)
    })
  })
}

export function assemOption ($xeselect: VxeSelectConstructor, el: HTMLDivElement, option: OptionInfo, optgroup?: XEOptionProvide | null) {
  const { reactData } = $xeselect
  const { staticOptions } = reactData
  const parentElem = el.parentNode
  const parentOption = optgroup ? optgroup.option : null
  const parentCols = parentOption ? parentOption.options : staticOptions
  if (parentElem && parentCols) {
    parentCols.splice(XEUtils.arrayIndexOf(parentElem.children, el), 0, option)
    reactData.staticOptions = staticOptions.slice(0)
  }
}

export function destroyOption ($xeselect: VxeSelectConstructor, option: OptionInfo) {
  const { reactData } = $xeselect
  const { staticOptions } = reactData
  const matchObj = XEUtils.findTree(staticOptions, (item) => item.id === option.id, { children: 'options' })
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1)
  }
  reactData.staticOptions = staticOptions.slice(0)
}

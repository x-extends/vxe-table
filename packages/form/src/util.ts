import { watch } from 'vue'
import XEUtils from 'xe-utils/ctor'
import { ItemInfo } from './itemInfo'

import { VxeFormConstructor } from '../../../types/vxe-table'

export function isFormItem (item: any): item is ItemInfo {
  return item instanceof ItemInfo
}

export function createItem ($xeform: VxeFormConstructor, _vm: any) {
  return isFormItem(_vm) ? _vm : new ItemInfo($xeform, _vm)
}

export function watchItem (props: any, formItem: ItemInfo) {
  Object.keys(props).forEach(name => {
    watch(() => props[name], (value: any) => {
      formItem.update(name, value)
    })
  })
}

export function assemItem ($xeform: VxeFormConstructor, el: HTMLDivElement, formItem: ItemInfo) {
  const { reactData } = $xeform
  const { staticItems } = reactData
  const parentElem = el.parentNode
  if (parentElem) {
    staticItems.splice(XEUtils.arrayIndexOf(parentElem.children, el), 0, formItem)
    reactData.staticItems = staticItems.slice(0)
  }
}

export function destroyItem ($xeform: VxeFormConstructor, formItem: ItemInfo) {
  const { reactData } = $xeform
  const { staticItems } = reactData
  const index = XEUtils.findIndexOf(staticItems, item => item.id === formItem.id)
  if (index > -1) {
    staticItems.splice(index, 1)
  }
  reactData.staticItems = staticItems.slice(0)
}

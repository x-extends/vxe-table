import { watch } from 'vue'
import { VXETable } from '../../v-x-e-table'
import XEUtils from 'xe-utils'
import { ItemInfo } from './itemInfo'
import { isEnableConf } from '../../tools/utils'

import { VxeFormConstructor, VxeFormDefines } from '../../../types/all'

export interface XEFormItemProvide {
  formItem: ItemInfo;
}

export function isFormItem (item: any): item is ItemInfo {
  return item instanceof ItemInfo
}

export function createItem ($xeform: VxeFormConstructor, _vm: any) {
  return isFormItem(_vm) ? _vm : new ItemInfo($xeform, _vm)
}

export function handleFieldOrItem ($xeform: VxeFormConstructor, fieldOrItem: string | VxeFormDefines.ItemInfo) {
  if (fieldOrItem) {
    return XEUtils.isString(fieldOrItem) ? $xeform.getItemByField(fieldOrItem) : fieldOrItem
  }
  return null
}

export function isHiddenItem ($xeform: VxeFormConstructor, formItem: VxeFormDefines.ItemInfo) {
  const { reactData } = $xeform
  const { collapseAll } = reactData
  const { folding, visible } = formItem
  return visible === false || (folding && collapseAll)
}

export function isActivetem ($xeform: VxeFormConstructor, formItem: VxeFormDefines.ItemInfo) {
  let { visibleMethod, itemRender, visible, field } = formItem
  if (visible === false) {
    return visible
  }
  const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
  if (!visibleMethod && compConf && compConf.itemVisibleMethod) {
    visibleMethod = compConf.itemVisibleMethod
  }
  if (!visibleMethod) {
    return true
  }
  const { data } = $xeform.props
  return visibleMethod({ data, field, property: field, item: formItem, $form: $xeform, $grid: $xeform.xegrid })
}

export function watchItem (props: any, formItem: ItemInfo) {
  Object.keys(props).forEach(name => {
    watch(() => props[name], (value: any) => {
      formItem.update(name, value)
    })
  })
}

export function assemItem ($xeform: VxeFormConstructor, el: HTMLDivElement, formItem: ItemInfo, formGather: XEFormItemProvide | null) {
  const { reactData } = $xeform
  const { staticItems } = reactData
  const parentElem = el.parentNode
  const parentItem = formGather ? formGather.formItem : null
  const parentItems = parentItem ? parentItem.children : staticItems
  if (parentElem) {
    parentItems.splice(XEUtils.arrayIndexOf(parentElem.children, el), 0, formItem)
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

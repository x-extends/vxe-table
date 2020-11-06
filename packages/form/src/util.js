import XEUtils from 'xe-utils/ctor'
import VXETable from '../../v-x-e-table'
import { UtilTools } from '../../tools'

class ItemConfig {
  constructor ($xeform, _vm) {
    Object.assign(this, {
      id: XEUtils.uniqueId('item_'),
      title: _vm.title,
      field: _vm.field,
      span: _vm.span,
      align: _vm.align,
      titleAlign: _vm.titleAlign,
      titleWidth: _vm.titleWidth,
      titlePrefix: _vm.titlePrefix,
      titleSuffix: _vm.titleSuffix,
      resetValue: _vm.resetValue,
      visible: _vm.visible,
      visibleMethod: _vm.visibleMethod,
      folding: _vm.folding,
      collapseNode: _vm.collapseNode,
      itemRender: _vm.itemRender,
      // 渲染属性
      showError: false,
      errRule: null,
      slots: _vm.slots
    })
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      const compConf = _vm.itemRender ? VXETable.renderer.get(_vm.itemRender.name) : null
      if (compConf && compConf.renderItem) {
        UtilTools.warn('vxe.error.delProp', ['item-render.renderItem', 'item-render.renderItemContent'])
      }
    }
  }

  update (name, value) {
    this[name] = value
  }
}

export function isItem (option) {
  return option instanceof ItemConfig
}

export function getItemConfig ($xeform, _vm, options) {
  return isItem(_vm) ? _vm : new ItemConfig($xeform, _vm, options)
}

export function createItem ($xeform, _vm) {
  return getItemConfig($xeform, _vm)
}

export function destroyItem (_vm) {
  const { $xeform, itemConfig } = _vm
  const matchObj = XEUtils.findTree($xeform.staticItems, option => option === itemConfig)
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1)
  }
}

export function assemItem (_vm) {
  const { $el, $xeform, itemConfig } = _vm
  itemConfig.slots = _vm.$scopedSlots
  $xeform.staticItems.splice([].indexOf.call($xeform.$refs.hideItem.children, $el), 0, itemConfig)
}

import XEUtils from 'xe-utils'
import VXETable from '../../v-x-e-table'
import { UtilTools } from '../../tools'

class ItemConfig {
  constructor ($xeform, item) {
    Object.assign(this, {
      id: XEUtils.uniqueId('item_'),
      title: item.title,
      field: item.field,
      span: item.span,
      align: item.align,
      titleAlign: item.titleAlign,
      titleWidth: item.titleWidth,
      titlePrefix: item.titlePrefix,
      titleSuffix: item.titleSuffix,
      titleOverflow: item.titleOverflow,
      resetValue: item.resetValue,
      visible: item.visible,
      visibleMethod: item.visibleMethod,
      folding: item.folding,
      collapseNode: item.collapseNode,
      className: item.className,
      itemRender: item.itemRender,
      // 渲染属性
      showError: false,
      errRule: null,
      slots: item.slots,
      children: []
    })
    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      const compConf = item.itemRender ? VXETable.renderer.get(item.itemRender.name) : null
      if (compConf && !compConf.renderItemContent && compConf.renderItem) {
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
  const { $el, $xeform, xeformgather, itemConfig } = _vm
  const itemGather = xeformgather ? xeformgather.itemConfig : null
  itemConfig.slots = _vm.$scopedSlots
  if (itemGather) {
    if (!itemGather.children) {
      itemGather.children = []
    }
    itemGather.children.splice([].indexOf.call(xeformgather.$el.children, $el), 0, itemConfig)
  } else {
    $xeform.staticItems.splice([].indexOf.call($xeform.$refs.hideItem.children, $el), 0, itemConfig)
  }
}

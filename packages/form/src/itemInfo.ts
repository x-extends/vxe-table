import XEUtils from 'xe-utils'

export class ItemInfo {
  constructor ($xeform: any, item: any) {
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
      visibleMethod: item.visibleMethod,
      visible: item.visible,
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
  }

  update (name: string, value: any) {
    this[name] = value
  }

  [key: string]: any;
}

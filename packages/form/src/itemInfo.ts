import XEUtils from 'xe-utils/ctor'

export class ItemInfo {
  constructor ($xeform: any, _vm: any) {
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
      visibleMethod: _vm.visibleMethod,
      visible: _vm.visible,
      folding: _vm.folding,
      collapseNode: _vm.collapseNode,
      itemRender: _vm.itemRender,
      // 渲染属性
      showError: false,
      errRule: null,
      slots: _vm.slots
    })
  }

  update (name: any, value: any) {
    this[name] = value
  }

  [key: string]: any;
}

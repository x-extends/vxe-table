import XEUtils from 'xe-utils'

const Tools = {
  browse: XEUtils.browse(),
  isPx (val) {
    return val && /^\d+(px)?$/.test(val)
  },
  isScale (val) {
    return val && /^\d+%$/.test(val)
  },
  // 触发事件
  emitEvent (_vm, type, args) {
    if (_vm.$listeners[type]) {
      _vm.$emit.apply(_vm, [].concat.apply([type], args))
    }
  },
  // 获取所有的列，排除分组
  getColumnList (columns) {
    let result = []
    columns.forEach(column => {
      if (column.children && column.children.length) {
        result.push.apply(result, Tools.getColumnList(column.children))
      } else {
        result.push(column)
      }
    })
    return result
  },
  getColumnConfig (_vm, { renderHeader, renderCell } = {}) {
    return {
      // 基本属性
      type: _vm.type,
      property: _vm.prop,
      label: _vm.label,
      width: _vm.width,
      minWidth: _vm.minWidth,
      fixed: _vm.fixed,
      align: _vm.align,
      headerAlign: _vm.headerAlign,
      ellipsis: _vm.ellipsis,
      showTitle: _vm.showOverflowTitle,
      showTooltip: _vm.showOverflowTooltip,
      indexMethod: _vm.indexMethod,
      formatter: _vm.formatter,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      filters: (_vm.filters || []).map(({ label, value }) => ({ label, value, checked: false })),
      filterMultiple: _vm.filterMultiple,
      filterMethod: _vm.filterMethod,
      columnKey: _vm.columnKey,
      // 渲染属性
      visible: true,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      order: null,
      renderWidth: 0,
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell
    }
  },
  // 组装列配置
  assemColumn (_vm) {
    let { $table, $parent, columnConfig } = _vm
    let parentColumnConfig = $parent.columnConfig
    if (parentColumnConfig && $parent.$children.length > 0) {
      if (!parentColumnConfig.children) {
        parentColumnConfig.children = []
      }
      parentColumnConfig.children.splice([].indexOf.call($parent.$el.children, _vm.$el), 0, columnConfig)
    } else {
      $table.collectColumn.splice([].indexOf.call($table.$refs.hideColumn.children, _vm.$el), 0, columnConfig)
    }
  },
  getDomScrollTop () {
    return document.documentElement.scrollTop || document.body.scrollTop
  },
  getDomScrollLeft () {
    return document.documentElement.scrollLeft || document.body.scrollLeft
  },
  hasClass (elem, cls) {
    return elem && elem.className && elem.className.split && elem.className.split(' ').indexOf(cls) > -1
  },
  /**
   * 获取绝对位置
   */
  getOffset (elem) {
    return getNodeOffset(elem, { left: 0, top: 0 })
  }
}

function getNodeOffset (elem, rest) {
  if (elem) {
    rest.top += elem.offsetTop
    rest.left += elem.offsetLeft
    if (elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, rest)
    }
  }
  return rest
}

export default Tools

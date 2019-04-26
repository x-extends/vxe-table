import XEUtils from 'xe-utils'

const browse = XEUtils.browse()
const HandleFunc = {
  browse,
  wheelType: /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel',
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
  getColumnList (columns) {
    let result = []
    columns.forEach(column => {
      if (column.children && column.children.length) {
        result.push.apply(result, HandleFunc.getColumnList(column.children))
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
      sortBy: _vm.sortBy,
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
  // 处理固定列的显示状态
  checkScrolling (bodyElem, leftBody, rightBody) {
    if (leftBody) {
      HandleFunc.updateScrolling(leftBody.$el.parentNode, bodyElem.scrollLeft)
    }
    if (rightBody) {
      HandleFunc.updateScrolling(rightBody.$el.parentNode, bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft)
    }
  },
  updateScrolling (wrapperElem, isMiddle) {
    let className = wrapperElem.className
    if (isMiddle) {
      className = className.replace('scrolling--none', 'scrolling--middle')
    } else {
      className = className.replace('scrolling--middle', 'scrolling--none')
    }
    wrapperElem.className = className
  }
}

export default HandleFunc

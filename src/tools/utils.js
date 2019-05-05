import XEUtils from 'xe-utils'

var columnId = 0

const UtilTools = {
  // 触发事件
  emitEvent (_vm, type, args) {
    if (_vm.$listeners[type]) {
      _vm.$emit.apply(_vm, [type].concat(args))
    }
  },
  // 获取所有的列，排除分组
  getColumnList (columns) {
    let result = []
    columns.forEach(column => {
      if (column.children && column.children.length) {
        result.push.apply(result, UtilTools.getColumnList(column.children))
      } else {
        result.push(column)
      }
    })
    return result
  },
  getCellValue (row, prop) {
    return XEUtils.get(row, prop)
  },
  setCellValue (row, prop, value) {
    return XEUtils.set(row, prop, value)
  },
  getColumnConfig (_vm, { renderHeader, renderCell, renderData } = {}) {
    return {
      // 基本属性
      id: `col--${_vm.$table.id}_${++columnId}`,
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
      editRender: _vm.editRender,
      // 渲染属性
      visible: true,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      order: null,
      renderWidth: 0,
      resizeWidth: 0,
      renderLeft: 0,
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderData: renderData
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
  hasChildrenList (item) {
    return item && item.children && item.children.length > 0
  }
}

export default UtilTools

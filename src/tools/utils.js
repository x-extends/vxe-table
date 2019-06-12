import XEUtils from 'xe-utils'

var columnUniqueId = 0

const UtilTools = {
  getSize ({ size, $parent }) {
    return size || ($parent && ['medium', 'small', 'mini'].indexOf($parent.size) > -1 ? $parent.size : null)
  },
  getRowKey ($table) {
    let { rowKey, selectConfig = {}, treeConfig = {}, expandConfig = {}, editConfig = {} } = $table
    if (!rowKey) {
      rowKey = selectConfig.key || treeConfig.key || expandConfig.key || editConfig.key
    }
    return rowKey
  },
  getRowId ($table, row, rowIndex) {
    let rowKey = UtilTools.getRowKey($table)
    return `${encodeURIComponent(rowKey ? XEUtils.get(row, rowKey) : rowIndex)}`
  },
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
  formatText (value) {
    return '' + (value === null || value === void 0 ? '' : value)
  },
  getCellValue (row, column) {
    return XEUtils.get(row, column.property)
  },
  getCellLabel (row, column, params) {
    let cellValue = XEUtils.get(row, column.property)
    return params && column.formatter ? column.formatter(Object.assign({ cellValue }, params)) : cellValue
  },
  setCellValue (row, column, value) {
    return XEUtils.set(row, column.property, value)
  },
  getColumnConfig (_vm, { renderHeader, renderCell, renderData } = {}) {
    return {
      // 基本属性
      id: `col--${++columnUniqueId}`,
      type: _vm.type,
      property: _vm.prop,
      label: _vm.label,
      width: _vm.width,
      minWidth: _vm.minWidth,
      resizable: _vm.resizable,
      fixed: _vm.fixed,
      align: _vm.align,
      headerAlign: _vm.headerAlign,
      showOverflow: _vm.showOverflow,
      showHeaderOverflow: _vm.showHeaderOverflow,
      indexMethod: _vm.indexMethod,
      formatter: _vm.formatter,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      remoteSort: _vm.remoteSort,
      filters: (_vm.filters || []).map(({ label, value }) => ({ label, value, checked: false })),
      filterMultiple: _vm.filterMultiple,
      filterMethod: _vm.filterMethod,
      remoteFilter: _vm.remoteFilter,
      treeNode: _vm.treeNode,
      columnKey: _vm.columnKey,
      editRender: _vm.editRender,
      // 渲染属性
      visible: true,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      order: null,
      renderWidth: 0,
      renderHeight: 0,
      resizeWidth: 0,
      renderLeft: 0,
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: _vm.slots,
      origin: _vm
    }
  },
  // 组装列配置
  assemColumn (_vm) {
    let { $table, $parent, columnConfig } = _vm
    let parentColumnConfig = $parent.columnConfig
    columnConfig.slots = _vm.$scopedSlots
    if (parentColumnConfig && $parent.$children.length > 0) {
      if (!parentColumnConfig.children) {
        parentColumnConfig.children = []
      }
      parentColumnConfig.children.splice([].indexOf.call($parent.$el.children, _vm.$el), 0, columnConfig)
    } else {
      $table.collectColumn.splice([].indexOf.call($table.$refs.hideColumn.children, _vm.$el), 0, columnConfig)
    }
  },
  // 销毁列
  destroyColumn (_vm) {
    let { $table, columnConfig } = _vm
    let matchObj = XEUtils.findTree($table.collectColumn, column => column === columnConfig)
    if (matchObj) {
      matchObj.items.splice(matchObj.index, 1)
    }
  },
  hasChildrenList (item) {
    return item && item.children && item.children.length > 0
  }
}

export default UtilTools

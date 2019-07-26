import XEUtils from 'xe-utils'

var columnUniqueId = 0

class ColumnConfig {
  constructor (_vm, { renderHeader, renderCell, renderData } = {}) {
    Object.assign(this, {
      // 基本属性
      id: `cid_${++columnUniqueId}`,
      type: _vm.type,
      prop: _vm.prop,
      property: _vm.field || _vm.prop,
      title: _vm.title,
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
      filters: (_vm.filters || []).map(({ label, value, data }) => ({ label, value, data, _data: data, checked: false })),
      filterMultiple: XEUtils.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
      filterMethod: _vm.filterMethod,
      filterRender: _vm.filterRender,
      treeNode: _vm.treeNode,
      editRender: _vm.editRender,
      // 自定义参数
      params: _vm.params,
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
      model: {},
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: _vm.slots,
      own: _vm
    })
  }
}

export const UtilTools = {
  getSize ({ size, $parent }) {
    return size || ($parent && ['medium', 'small', 'mini'].indexOf($parent.size) > -1 ? $parent.size : null)
  },
  // 行主键 key
  getRowkey ($table) {
    return $table.rowId
  },
  // 行主键 value
  getRowid ($table, row) {
    let rowId = XEUtils.get(row, UtilTools.getRowkey($table))
    return rowId ? encodeURIComponent(rowId) : ''
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
  formatText (value, placeholder) {
    return '' + (value === null || value === void 0 ? (placeholder ? '　' : '') : value)
  },
  getCellValue (row, column) {
    return XEUtils.get(row, column.property)
  },
  getCellLabel (row, column, params) {
    let { formatter } = column
    let cellValue = UtilTools.getCellValue(row, column)
    let cellLabel = cellValue
    if (params && formatter) {
      let { $table } = params
      if ($table) {
        let formatData = $table.fullDataRowMap.get(row).formatData
        if (formatData && formatData.value === cellValue) {
          return formatData.label
        }
      }
      if (XEUtils.isString(formatter)) {
        cellLabel = XEUtils[formatter](cellValue)
      } else if (XEUtils.isArray(formatter)) {
        cellLabel = XEUtils[formatter[0]].apply(XEUtils, [cellValue].concat(formatter.slice(1)))
      } else {
        cellLabel = formatter(Object.assign({ cellValue }, params))
      }
      if ($table) {
        $table.fullDataRowMap.get(row).formatData = { value: cellValue, label: cellLabel }
      }
    }
    return cellLabel
  },
  setCellValue (row, column, value) {
    return XEUtils.set(row, column.property, value)
  },
  getColumnConfig (_vm, options) {
    return _vm instanceof ColumnConfig ? _vm : new ColumnConfig(_vm, options)
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

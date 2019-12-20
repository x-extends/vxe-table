import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'

var zindexIndex = 0
var lastZindex = 0
var columnUniqueId = 0

class ColumnConfig {
  constructor ($table, _vm, { renderHeader, renderCell, renderData } = {}) {
    let formatter = _vm.formatter
    if (_vm.cellRender && _vm.editRender) {
      UtilTools.warn('vxe.error.cellEditRender')
    }
    if (_vm.type === 'index') {
      UtilTools.warn('vxe.error.delProp', ['index', 'seq'])
    } else if (_vm.type === 'selection') {
      UtilTools.warn('vxe.error.delProp', ['selection', 'checkbox'])
    } else if (_vm.type === 'expand') {
      if ($table.treeConfig && $table.treeOpts.line) {
        UtilTools.error('vxe.error.treeLineExpand')
      }
      if (_vm.slots && !_vm.slots.content && _vm.slots.default) {
        UtilTools.warn('vxe.error.expandContent')
      }
    }
    if (formatter) {
      if (XEUtils.isString(formatter)) {
        if (!XEUtils.isFunction(XEUtils[formatter])) {
          UtilTools.error('vxe.error.notFunc', [formatter])
        }
      } else if (XEUtils.isArray(formatter)) {
        if (!XEUtils.isFunction(XEUtils[formatter[0]])) {
          UtilTools.error('vxe.error.notFunc', [formatter[0]])
        }
      }
    }
    Object.assign(this, {
      // 基本属性
      id: `col_${++columnUniqueId}`,
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
      footerAlign: _vm.footerAlign,
      showOverflow: _vm.showOverflow,
      showHeaderOverflow: _vm.showHeaderOverflow,
      className: _vm.class || _vm.className,
      headerClassName: _vm.headerClassName,
      footerClassName: _vm.footerClassName,
      indexMethod: _vm.indexMethod,
      formatter: formatter,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      sortMethod: _vm.sortMethod,
      remoteSort: _vm.remoteSort,
      filters: UtilTools.getFilters(_vm.filters),
      filterMultiple: XEUtils.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
      filterMethod: _vm.filterMethod,
      filterRender: _vm.filterRender,
      treeNode: _vm.treeNode,
      cellRender: _vm.cellRender,
      editRender: _vm.editRender,
      // 自定义参数
      params: _vm.params,
      // 渲染属性
      visible: XEUtils.isBoolean(_vm.visible) ? _vm.visible : true,
      checked: false,
      disabled: false,
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
  getTitle () {
    // 在 v3.0 中废弃 label、type=index
    return UtilTools.getFuncText(this.own.title || this.own.label || (this.type === 'seq' || this.type === 'index' ? GlobalConfig.i18n('vxe.table.seqTitle') : ''))
  }
  update (name, value) {
    // 不支持双向的属性
    if (['filters'].indexOf(name) === -1) {
      this[name] = value
    }
  }
}

function outLog (type) {
  return function (message, params) {
    let msg = UtilTools.getLog(message, params)
    console[type](msg)
    return msg
  }
}

export const UtilTools = {
  warn: outLog('warn'),
  error: outLog('error'),
  getLog (message, params) {
    return `[vxe-table] ${XEUtils.template(GlobalConfig.i18n(message), params)}`
  },
  getSize ({ size, $parent }) {
    return size || ($parent && ['medium', 'small', 'mini'].indexOf($parent.size) > -1 ? $parent.size : null)
  },
  getFuncText (content) {
    return XEUtils.isFunction(content) ? content() : (GlobalConfig.translate ? GlobalConfig.translate(content) : content)
  },
  nextZIndex ($table) {
    if ($table && $table.zIndex) {
      return $table.zIndex
    }
    lastZindex = GlobalConfig.zIndex + zindexIndex++
    return lastZindex
  },
  getLastZIndex () {
    return lastZindex
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
      result.push.apply(result, column.children && column.children.length ? UtilTools.getColumnList(column.children) : [column])
    })
    return result
  },
  getClass (property, params) {
    return property ? XEUtils.isFunction(property) ? property(params) : property : ''
  },
  getFilters (filters) {
    return (filters || []).map(({ label, value, data, checked }) => ({ label, value, data, _data: data, checked: !!checked }))
  },
  formatText (value, placeholder) {
    return '' + (value === null || value === void 0 ? (placeholder ? GlobalConfig.emptyCell : '') : value)
  },
  getCellValue (row, column) {
    return XEUtils.get(row, column.property)
  },
  getCellLabel (row, column, params) {
    let { formatter } = column
    let cellValue = UtilTools.getCellValue(row, column)
    let cellLabel = cellValue
    if (params && formatter) {
      let rest, formatData
      let { $table } = params
      let colid = column.id
      let fullAllDataRowMap = $table.fullAllDataRowMap
      let cacheFormat = fullAllDataRowMap.has(row)
      if (cacheFormat) {
        rest = fullAllDataRowMap.get(row)
        formatData = rest.formatData
        if (!formatData) {
          formatData = fullAllDataRowMap.get(row).formatData = {}
        }
      }
      if (rest && formatData[colid]) {
        if (formatData[colid].value === cellValue) {
          return formatData[colid].label
        }
      }
      if (XEUtils.isString(formatter)) {
        cellLabel = XEUtils[formatter] ? XEUtils[formatter](cellValue) : ''
      } else if (XEUtils.isArray(formatter)) {
        cellLabel = XEUtils[formatter[0]] ? XEUtils[formatter[0]].apply(XEUtils, [cellValue].concat(formatter.slice(1))) : ''
      } else {
        cellLabel = formatter(Object.assign({ cellValue }, params))
      }
      if (formatData) {
        formatData[colid] = { value: cellValue, label: cellLabel }
      }
    }
    return cellLabel
  },
  setCellValue (row, column, value) {
    return XEUtils.set(row, column.property, value)
  },
  getColumnConfig ($table, _vm, options) {
    return _vm instanceof ColumnConfig ? _vm : new ColumnConfig($table, _vm, options)
  },
  // 组装列配置
  assemColumn (_vm) {
    let { $table, $column, columnConfig } = _vm
    let groupConfig = $column ? $column.columnConfig : null
    columnConfig.slots = _vm.$scopedSlots
    if (groupConfig && $column.$children.length > 0) {
      if (!groupConfig.children) {
        groupConfig.children = []
      }
      groupConfig.children.splice([].indexOf.call($column.$el.children, _vm.$el), 0, columnConfig)
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
  },
  parseFile (file) {
    const name = file.name
    const tIndex = XEUtils.lastIndexOf(name, '.')
    const type = name.substring(tIndex + 1, name.length)
    const filename = name.substring(0, tIndex)
    return { filename, type }
  }
}

export default UtilTools

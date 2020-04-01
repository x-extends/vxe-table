import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import formats from '../../v-x-e-table/src/formats'

let zindexIndex = 0
let lastZindex = 0

function getColFuncWidth (isExists, defaultWidth = 16) {
  return isExists ? defaultWidth : 0
}

class ColumnConfig {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  constructor ($xetable, _vm, { renderHeader, renderCell, renderFooter, renderData } = {}) {
    const $xegrid = $xetable.$xegrid
    const proxyOpts = $xegrid ? $xegrid.proxyOpts : null
    const formatter = _vm.formatter
    const visible = XEUtils.isBoolean(_vm.visible) ? _vm.visible : true
    if (_vm.cellRender && _vm.editRender) {
      UtilTools.warn('vxe.error.cellEditRender')
    }
    if (_vm.type === 'index') {
      UtilTools.warn('vxe.error.delProp', ['index', 'seq'])
    } else if (_vm.type === 'selection') {
      UtilTools.warn('vxe.error.delProp', ['selection', 'checkbox'])
    } else if (_vm.type === 'expand') {
      if ($xetable.treeConfig && $xetable.treeOpts.line) {
        UtilTools.error('vxe.error.treeLineExpand')
      }
      if (_vm.slots && !_vm.slots.content && _vm.slots.default) {
        UtilTools.warn('vxe.error.expandContent')
      }
    }
    if (formatter) {
      if (XEUtils.isString(formatter)) {
        const globalFunc = formats.get(formatter) || XEUtils[formatter]
        if (!XEUtils.isFunction(globalFunc)) {
          UtilTools.error('vxe.error.notFunc', [formatter])
        }
      } else if (XEUtils.isArray(formatter)) {
        const globalFunc = formats.get(formatter[0]) || XEUtils[formatter[0]]
        if (!XEUtils.isFunction(globalFunc)) {
          UtilTools.error('vxe.error.notFunc', [formatter[0]])
        }
      }
    }
    Object.assign(this, {
      // 基本属性
      id: XEUtils.uniqueId('col_'),
      type: _vm.type,
      // 在 v3.0 中废弃 prop
      prop: _vm.prop,
      property: _vm.field || _vm.prop,
      title: _vm.title,
      // 在 v3.0 中废弃 label
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
      showFooterOverflow: _vm.showFooterOverflow,
      className: _vm.class || _vm.className,
      headerClassName: _vm.headerClassName,
      footerClassName: _vm.footerClassName,
      indexMethod: _vm.indexMethod,
      seqMethod: _vm.seqMethod,
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
      contentRender: _vm.contentRender,
      // 自定义参数
      params: _vm.params,
      // 渲染属性
      visible,
      defaultVisible: visible,
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
      renderArgs: [], // 渲染参数可用于扩展
      model: {},
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderFooter: renderFooter || _vm.renderFooter,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: _vm.slots,
      own: _vm
    })
    if (proxyOpts && proxyOpts.beforeColumn) {
      proxyOpts.beforeColumn({ $grid: $xegrid, column: this })
    }
  }

  getTitle () {
    // 在 v3.0 中废弃 label、type=index
    return UtilTools.getFuncText(this.own.title || this.own.label || (this.type === 'seq' || this.type === 'index' ? GlobalConfig.i18n('vxe.table.seqTitle') : ''))
  }

  getKey () {
    return this.property || (this.type ? `type=${this.type}` : null)
  }

  getMinWidth () {
    const { type, filters, sortable, remoteSort, editRender } = this
    return 40 + getColFuncWidth(type === 'checkbox' || type === 'selection', 18) + getColFuncWidth(filters) + getColFuncWidth(sortable || remoteSort) + getColFuncWidth(editRender, 32)
  }

  update (name, value) {
    // 不支持双向的属性
    if (name !== 'filters') {
      this[name] = value
    }
  }
}

function outLog (type) {
  return function (message, params) {
    const msg = UtilTools.getLog(message, params)
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
  nextZIndex ($xetable) {
    if ($xetable && $xetable.zIndex) {
      return $xetable.zIndex
    }
    lastZindex = GlobalConfig.zIndex + zindexIndex++
    return lastZindex
  },
  getLastZIndex () {
    return lastZindex
  },
  // 行主键 key
  getRowkey ($xetable) {
    return $xetable.rowId || '_XID'
  },
  // 行主键 value
  getRowid ($xetable, row) {
    const rowId = XEUtils.get(row, UtilTools.getRowkey($xetable))
    return rowId ? encodeURIComponent(rowId) : ''
  },
  // 触发事件
  emitEvent (_vm, type, args) {
    if (_vm.$listeners[type]) {
      _vm.$emit(...([type].concat(args)))
    }
  },
  // 获取所有的列，排除分组
  getColumnList (columns) {
    const result = []
    columns.forEach(column => {
      result.push(...(column.children && column.children.length ? UtilTools.getColumnList(column.children) : [column]))
    })
    return result
  },
  getClass (property, params) {
    return property ? XEUtils.isFunction(property) ? property(params) : property : ''
  },
  getFilters (filters) {
    if (filters && XEUtils.isArray(filters)) {
      return filters.map(({ label, value, data, resetValue, checked }) => ({ label, value, data, resetValue, checked: !!checked }))
    }
    return filters
  },
  formatText (value, placeholder) {
    return '' + (value === '' || value === null || value === undefined ? (placeholder ? GlobalConfig.emptyCell : '') : value)
  },
  getCellValue (row, column) {
    return XEUtils.get(row, column.property)
  },
  getCellLabel (row, column, params) {
    const { formatter } = column
    const cellValue = UtilTools.getCellValue(row, column)
    let cellLabel = cellValue
    if (params && formatter) {
      let rest, formatData
      const { $table } = params
      const colid = column.id
      const fullAllDataRowMap = $table.fullAllDataRowMap
      const cacheFormat = fullAllDataRowMap.has(row)
      if (cacheFormat) {
        rest = fullAllDataRowMap.get(row)
        formatData = rest.formatData
        if (!formatData) {
          formatData = fullAllDataRowMap.get(row).formatData = {}
        }
        if (rest && formatData[colid]) {
          if (formatData[colid].value === cellValue) {
            return formatData[colid].label
          }
        }
      }
      if (XEUtils.isString(formatter)) {
        if (XEUtils[formatter]) {
          cellLabel = XEUtils[formatter](cellValue)
        } else if (formats.get(formatter)) {
          cellLabel = formats.get(formatter)({ cellValue, row, column })
        } else {
          cellLabel = ''
        }
      } else if (XEUtils.isArray(formatter)) {
        if (XEUtils[formatter[0]]) {
          cellLabel = XEUtils[formatter[0]](cellValue, ...formatter.slice(1))
        } else if (formats.get(formatter[0])) {
          cellLabel = formats.get(formatter[0])({ cellValue, row, column }, ...formatter.slice(1))
        } else {
          cellLabel = ''
        }
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
  getColumnConfig ($xetable, _vm, options) {
    return _vm instanceof ColumnConfig ? _vm : new ColumnConfig($xetable, _vm, options)
  },
  // 组装列配置
  assemColumn (_vm) {
    const { $el, $xetable, $xecolumn, columnConfig } = _vm
    const groupConfig = $xecolumn ? $xecolumn.columnConfig : null
    columnConfig.slots = _vm.$scopedSlots
    if (groupConfig && $xecolumn.$children.length > 0) {
      if (!groupConfig.children) {
        groupConfig.children = []
      }
      groupConfig.children.splice([].indexOf.call($xecolumn.$el.children, $el), 0, columnConfig)
    } else {
      $xetable.collectColumn.splice([].indexOf.call($xetable.$refs.hideColumn.children, $el), 0, columnConfig)
    }
  },
  // 销毁列
  destroyColumn (_vm) {
    const { $xetable, columnConfig } = _vm
    const matchObj = XEUtils.findTree($xetable.collectColumn, column => column === columnConfig)
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

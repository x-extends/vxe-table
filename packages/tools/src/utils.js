import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { formats } from '../../v-x-e-table/src/formats'

let zindexIndex = 0
let lastZindex = 1

class ColumnInfo {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  constructor ($xetable, _vm, { renderHeader, renderCell, renderFooter, renderData } = {}) {
    const $xegrid = $xetable.$xegrid
    const proxyOpts = $xegrid ? $xegrid.proxyOpts : null
    const formatter = _vm.formatter
    const visible = XEUtils.isBoolean(_vm.visible) ? _vm.visible : true

    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      const types = ['seq', 'checkbox', 'radio', 'expand', 'html']
      if (_vm.type && types.indexOf(_vm.type) === -1) {
        UtilTools.warn('vxe.error.errProp', [`type=${_vm.type}`, types.join(', ')])
      }
      if (XEUtils.isBoolean(_vm.cellRender) || (_vm.cellRender && !XEUtils.isObject(_vm.cellRender))) {
        UtilTools.warn('vxe.error.errProp', [`column.cell-render=${_vm.cellRender}`, 'column.cell-render={}'])
      }
      if (XEUtils.isBoolean(_vm.editRender) || (_vm.editRender && !XEUtils.isObject(_vm.editRender))) {
        UtilTools.warn('vxe.error.errProp', [`column.edit-render=${_vm.editRender}`, 'column.edit-render={}'])
      }
      if (_vm.cellRender && _vm.editRender) {
        UtilTools.warn('vxe.error.errConflicts', ['column.cell-render', 'column.edit-render'])
      }
      if (_vm.type === 'expand') {
        if ($xetable.treeConfig && $xetable.treeOpts.line) {
          UtilTools.error('vxe.error.errConflicts', ['tree-config.line', 'column.type=expand'])
        }
      }
      if (_vm.remoteSort) {
        UtilTools.warn('vxe.error.delProp', ['column.remote-sort', 'sort-config.remote'])
      }
      if (_vm.sortMethod) {
        UtilTools.warn('vxe.error.delProp', ['column.sort-method', 'sort-config.sortMethod'])
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
    }

    Object.assign(this, {
      // 基本属性
      type: _vm.type,
      property: _vm.field,
      title: _vm.title,
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
      className: _vm.className,
      headerClassName: _vm.headerClassName,
      footerClassName: _vm.footerClassName,
      formatter: formatter,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      sortType: _vm.sortType,
      sortMethod: _vm.sortMethod,
      remoteSort: _vm.remoteSort,
      filters: UtilTools.getFilters(_vm.filters),
      filterMultiple: XEUtils.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
      filterMethod: _vm.filterMethod,
      filterResetMethod: _vm.filterResetMethod,
      filterRecoverMethod: _vm.filterRecoverMethod,
      filterRender: _vm.filterRender,
      treeNode: _vm.treeNode,
      cellType: _vm.cellType,
      cellRender: _vm.cellRender,
      editRender: _vm.editRender,
      contentRender: _vm.contentRender,
      exportMethod: _vm.exportMethod,
      footerExportMethod: _vm.footerExportMethod,
      titleHelp: _vm.titleHelp,
      // 自定义参数
      params: _vm.params,
      // 渲染属性
      id: _vm.colId || XEUtils.uniqueId('col_'),
      parentId: null,
      visible,
      // 内部属性（一旦被使用，将导致不可升级版本）
      halfVisible: false,
      defaultVisible: visible,
      checked: false,
      halfChecked: false,
      disabled: false,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      order: null,
      sortTime: 0,
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
      slots: _vm.slots
    })
    if (proxyOpts && proxyOpts.beforeColumn) {
      proxyOpts.beforeColumn({ $grid: $xegrid, column: this })
    }
  }

  getTitle () {
    return UtilTools.getFuncText(this.title || (this.type === 'seq' ? GlobalConfig.i18n('vxe.table.seqTitle') : ''))
  }

  getKey () {
    return this.property || (this.type ? `type=${this.type}` : null)
  }

  update (name, value) {
    // 不支持双向的属性
    if (name !== 'filters') {
      if (name === 'field') {
        this.property = value
      } else {
        this[name] = value
      }
    }
  }
}

export function isEnableConf (conf) {
  return conf && conf.enabled !== false
}

function outLog (type) {
  return function (message, params) {
    const msg = UtilTools.getLog(message, params)
    console[type](msg)
    return msg
  }
}

/**
 * 判断值为：'' | null | undefined 时都属于空值
 */
export function eqEmptyValue (cellValue) {
  return cellValue === '' || XEUtils.eqNull(cellValue)
}

export const UtilTools = {
  warn: outLog('warn'),
  error: outLog('error'),
  getLog (message, args) {
    return `[vxe-table] ${GlobalConfig.i18n(message, args)}`
  },
  getFuncText (content) {
    return XEUtils.isFunction(content) ? content() : (GlobalConfig.translate ? GlobalConfig.translate(content) : content)
  },
  nextZIndex () {
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
    return XEUtils.eqNull(rowId) ? '' : encodeURIComponent(rowId)
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
      return filters.map(({ label, value, data, resetValue, checked }) => {
        return { label, value, data, resetValue, checked: !!checked, _checked: !!checked }
      })
    }
    return filters
  },
  formatText (value, placeholder) {
    return '' + (value === '' || value === null || value === undefined ? (placeholder ? GlobalConfig.emptyCell : '') : value)
  },
  getCellValue (row, column) {
    return XEUtils.get(row, column.property)
  },
  setCellValue (row, column, value) {
    return XEUtils.set(row, column.property, value)
  },
  isColumn (column) {
    return column instanceof ColumnInfo
  },
  getColumnConfig ($xetable, _vm, options) {
    return UtilTools.isColumn(_vm) ? _vm : new ColumnInfo($xetable, _vm, options)
  },
  // 组装列配置
  assemColumn (_vm) {
    const { $el, $xetable, $xecolumn, columnConfig } = _vm
    const groupConfig = $xecolumn ? $xecolumn.columnConfig : null
    columnConfig.slots = _vm.$scopedSlots
    if (groupConfig) {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if ($xecolumn.$options._componentTag === 'vxe-table-column') {
          UtilTools.error('vxe.error.groupTag', [`<vxe-table-colgroup title=${$xecolumn.title} ...>`, `<vxe-table-column title=${$xecolumn.title} ...>`])
        } else if ($xecolumn.$options._componentTag === 'vxe-column') {
          UtilTools.warn('vxe.error.groupTag', [`<vxe-colgroup title=${$xecolumn.title} ...>`, `<vxe-column title=${$xecolumn.title} ...>`])
        }
      }
      if (!groupConfig.children) {
        groupConfig.children = []
      }
      groupConfig.children.splice([].indexOf.call($xecolumn.$el.children, $el), 0, columnConfig)
    } else {
      $xetable.staticColumns.splice([].indexOf.call($xetable.$refs.hideColumn.children, $el), 0, columnConfig)
    }
  },
  // 销毁列
  destroyColumn (_vm) {
    const { $xetable, columnConfig } = _vm
    const matchObj = XEUtils.findTree($xetable.staticColumns, column => column === columnConfig)
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
  },
  isNumVal (num) {
    return !isNaN(parseFloat('' + num))
  }
}

export default UtilTools

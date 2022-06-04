import XEUtils from 'xe-utils'
import GlobalConfig from '../v-x-e-table/src/conf'
import { warnLog, errLog } from '../tools/log'

let zindexIndex = 0
let lastZindex = 1

export function isEnableConf (conf) {
  return conf && conf.enabled !== false
}

/**
 * 判断值为：'' | null | undefined 时都属于空值
 */
export function eqEmptyValue (cellValue) {
  return cellValue === '' || XEUtils.eqNull(cellValue)
}

export function getFuncText (content) {
  return XEUtils.isFunction(content) ? content() : (GlobalConfig.translate ? GlobalConfig.translate(content) : content)
}

// 获取所有的列，排除分组
export function getColumnList (columns) {
  const result = []
  columns.forEach(column => {
    result.push(...(column.children && column.children.length ? getColumnList(column.children) : [column]))
  })
  return result
}

export const UtilTools = {
  nextZIndex () {
    lastZindex = GlobalConfig.zIndex + zindexIndex++
    return lastZindex
  },
  getLastZIndex () {
    return lastZindex
  },
  getColumnList,
  getClass (property, params) {
    return property ? XEUtils.isFunction(property) ? property(params) : property : ''
  },
  formatText (value, placeholder) {
    return '' + (value === '' || value === null || value === undefined ? (placeholder ? GlobalConfig.emptyCell : '') : value)
  },
  getCellValue (row, column) {
    return XEUtils.get(row, column.field)
  },
  setCellValue (row, column, value) {
    return XEUtils.set(row, column.field, value)
  },
  // 组装列配置
  assemColumn (_vm) {
    const { $el, $xetable, $xecolumn, columnConfig } = _vm
    const groupConfig = $xecolumn ? $xecolumn.columnConfig : null
    columnConfig.slots = _vm.$scopedSlots
    if (groupConfig) {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if ($xecolumn.$options._componentTag === 'vxe-table-column') {
          errLog('vxe.error.groupTag', [`<vxe-table-colgroup title=${$xecolumn.title} ...>`, `<vxe-table-column title=${$xecolumn.title} ...>`])
        } else if ($xecolumn.$options._componentTag === 'vxe-column') {
          warnLog('vxe.error.groupTag', [`<vxe-colgroup title=${$xecolumn.title} ...>`, `<vxe-column title=${$xecolumn.title} ...>`])
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

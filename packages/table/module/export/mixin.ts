import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { isColumnInfo, mergeBodyMethod, getCellValue } from '../../src/util'
import { parseFile, formatText, eqEmptyValue } from '../../../ui/src/utils'
import { createHtmlPage, getExportBlobByContent } from './util'
import { warnLog, errLog } from '../../../ui/src/log'

import type { VxeTablePropTypes, VxeGridConstructor, VxeTableDefines, TableReactData, TableInternalData, GridReactData, VxeColumnPropTypes, VxeTableConstructor } from '../../../../types'

const { getI18n, renderer } = VxeUI

let htmlCellElem: any

// 导入
let fileForm: any
let fileInput: any

const csvBOM = '\ufeff'
const enterSymbol = '\r\n'

function hasTreeChildren ($xeTable: VxeTableConstructor, row: any) {
  const treeOpts = $xeTable.computeTreeOpts
  const childrenField = treeOpts.children || treeOpts.childrenField
  return row[childrenField] && row[childrenField].length
}

function getSeq ($xeTable: VxeTableConstructor, cellValue: any, row: any, $rowIndex: any, column: any, $columnIndex: any) {
  const seqOpts = $xeTable.computeSeqOpts
  const seqMethod = seqOpts.seqMethod || column.seqMethod
  if (seqMethod) {
    return seqMethod({
      row,
      rowIndex: $xeTable.getRowIndex(row),
      $rowIndex,
      column,
      columnIndex: $xeTable.getColumnIndex(column),
      $columnIndex
    })
  }
  return cellValue
}

function defaultFilterExportColumn (column: any) {
  return column.field || ['seq', 'checkbox', 'radio'].indexOf(column.type) > -1
}

function toTableBorder (border: any) {
  if (border === true) {
    return 'full'
  }
  if (border) {
    return border
  }
  return 'default'
}

function toBooleanValue (cellValue: any) {
  return XEUtils.isBoolean(cellValue) ? (cellValue ? 'TRUE' : 'FALSE') : cellValue
}

const toStringValue = (cellValue: any) => {
  return eqEmptyValue(cellValue) ? '' : `${cellValue}`
}

function getBodyLabelData ($xeTable: VxeTableConstructor, opts: VxeTablePropTypes.ExportHandleOptions, columns: VxeTableDefines.ColumnInfo[], datas: any[]) {
  const props = $xeTable

  const { isAllExpand, mode } = opts
  const { treeConfig } = props
  const radioOpts = $xeTable.computeRadioOpts
  const checkboxOpts = $xeTable.computeCheckboxOpts
  const treeOpts = $xeTable.computeTreeOpts
  const columnOpts = $xeTable.computeColumnOpts
  if (!htmlCellElem) {
    htmlCellElem = document.createElement('div')
  }
  if (treeConfig) {
    const childrenField = treeOpts.children || treeOpts.childrenField
    // 如果是树表格只允许导出数据源
    const rest: any[] = []
    const expandMaps: Map<any, number> = new Map()
    XEUtils.eachTree(datas, (item, $rowIndex, items, path, parent, nodes) => {
      const row = item._row || item
      const parentRow = parent && parent._row ? parent._row : parent
      if ((isAllExpand || !parentRow || (expandMaps.has(parentRow) && $xeTable.isTreeExpandByRow(parentRow)))) {
        const hasRowChild = hasTreeChildren($xeTable, row)
        const item: any = {
          _row: row,
          _level: nodes.length - 1,
          _hasChild: hasRowChild,
          _expand: hasRowChild && $xeTable.isTreeExpandByRow(row)
        }
        columns.forEach((column, $columnIndex) => {
          let cellValue: string | number | boolean | null = ''
          const renderOpts = column.editRender || column.cellRender
          let bodyExportMethod: VxeColumnPropTypes.ExportMethod | undefined = column.exportMethod || columnOpts.exportMethod
          if (!bodyExportMethod && renderOpts && renderOpts.name) {
            const compConf = renderer.get(renderOpts.name)
            if (compConf) {
              bodyExportMethod = compConf.tableExportMethod || compConf.exportMethod
            }
          }
          if (!bodyExportMethod) {
            bodyExportMethod = columnOpts.exportMethod
          }
          if (bodyExportMethod) {
            cellValue = bodyExportMethod({ $table: $xeTable, row, column, options: opts })
          } else {
            switch (column.type) {
              case 'seq': {
                const seqVal = path.map((num, i) => i % 2 === 0 ? (Number(num) + 1) : '.').join('')
                cellValue = mode === 'all' ? seqVal : getSeq($xeTable, seqVal, row, $rowIndex, column, $columnIndex)
                break
              }
              case 'checkbox':
                cellValue = toBooleanValue($xeTable.isCheckedByCheckboxRow(row))
                item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : ''
                item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ row })
                break
              case 'radio':
                cellValue = toBooleanValue($xeTable.isCheckedByRadioRow(row))
                item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : ''
                item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ row })
                break
              default:
                if (opts.original) {
                  cellValue = getCellValue(row, column)
                } else {
                  cellValue = $xeTable.getCellLabel(row, column)
                  if (column.type === 'html') {
                    htmlCellElem.innerHTML = cellValue
                    cellValue = htmlCellElem.innerText.trim()
                  } else {
                    const cell = $xeTable.getCellElement(row, column)
                    if (cell) {
                      cellValue = cell.innerText.trim()
                    }
                  }
                }
            }
          }
          item[column.id] = toStringValue(cellValue)
        })
        expandMaps.set(row, 1)
        rest.push(Object.assign(item, row))
      }
    }, { children: childrenField })
    return rest
  }
  return datas.map((row, $rowIndex) => {
    const item: any = {
      _row: row
    }
    columns.forEach((column, $columnIndex) => {
      let cellValue: string | number | boolean | null = ''
      const renderOpts = column.editRender || column.cellRender
      let bodyExportMethod: VxeColumnPropTypes.ExportMethod | undefined = column.exportMethod || columnOpts.exportMethod
      if (!bodyExportMethod && renderOpts && renderOpts.name) {
        const compConf = renderer.get(renderOpts.name)
        if (compConf) {
          bodyExportMethod = compConf.tableExportMethod || compConf.exportMethod
        }
      }
      if (bodyExportMethod) {
        cellValue = bodyExportMethod({ $table: $xeTable, row, column, options: opts })
      } else {
        switch (column.type) {
          case 'seq': {
            const seqValue = $rowIndex + 1
            cellValue = mode === 'all' ? seqValue : getSeq($xeTable, seqValue, row, $rowIndex, column, $columnIndex)
            break
          }
          case 'checkbox':
            cellValue = toBooleanValue($xeTable.isCheckedByCheckboxRow(row))
            item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : ''
            item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ row })
            break
          case 'radio':
            cellValue = toBooleanValue($xeTable.isCheckedByRadioRow(row))
            item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : ''
            item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ row })
            break
          default:
            if (opts.original) {
              cellValue = getCellValue(row, column)
            } else {
              cellValue = $xeTable.getCellLabel(row, column)
              if (column.type === 'html') {
                htmlCellElem.innerHTML = cellValue
                cellValue = htmlCellElem.innerText.trim()
              } else {
                const cell = $xeTable.getCellElement(row, column)
                if (cell) {
                  cellValue = cell.innerText.trim()
                }
              }
            }
        }
      }
      item[column.id] = toStringValue(cellValue)
    })
    return item
  })
}

function getExportData ($xetable: any, opts: VxeTablePropTypes.ExportHandleOptions) {
  const { columns, dataFilterMethod } = opts
  let datas = opts.data
  if (dataFilterMethod) {
    datas = datas.filter((row: any, index: any) => dataFilterMethod({ row, $rowIndex: index }))
  }
  return getBodyLabelData($xetable, opts, columns, datas)
}

function getBooleanValue (cellValue: any) {
  return cellValue === 'TRUE' || cellValue === 'true' || cellValue === true
}

function getHeaderTitle ($xetable: any, opts: any, column: any) {
  const { columnOpts } = $xetable
  const headExportMethod = column.headerExportMethod || columnOpts.headerExportMethod
  return headExportMethod ? headExportMethod({ column, options: opts, $table: $xetable }) : ((opts.original ? column.field : column.getTitle()) || '')
}

function getFooterCellValue ($xetable: any, opts: any, row: any, column: any) {
  const { columnOpts } = $xetable
  const renderOpts = column.editRender || column.cellRender
  let footLabelMethod = column.footerExportMethod
  if (!footLabelMethod && renderOpts && renderOpts.name) {
    const compConf = renderer.get(renderOpts.name)
    if (compConf) {
      footLabelMethod = compConf.tableFooterExportMethod || compConf.footerExportMethod || (compConf as any).footerCellExportMethod
    }
  }
  if (!footLabelMethod) {
    footLabelMethod = columnOpts.footerExportMethod
  }
  const _columnIndex = $xetable.getVTColumnIndex(column)
  if (footLabelMethod) {
    return footLabelMethod({ $table: $xetable, items: row, itemIndex: _columnIndex, row, _columnIndex, column, options: opts })
  }
  // 兼容老模式
  if (XEUtils.isArray(row)) {
    return XEUtils.toValueString(row[_columnIndex])
  }
  return XEUtils.get(row, column.field)
}

function getFooterData (opts: any, footerTableData: any) {
  const { footerFilterMethod } = opts
  return footerFilterMethod ? footerTableData.filter((items: any, index: any) => footerFilterMethod({ items, $rowIndex: index })) : footerTableData
}

function getCsvCellTypeLabel (column: any, cellValue: any) {
  if (cellValue) {
    if (column.type === 'seq') {
      return `\t${cellValue}`
    }
    switch (column.cellType) {
      case 'string':
        if (!isNaN(cellValue)) {
          return `\t${cellValue}`
        }
        break
      case 'number':
        break
      default:
        if (cellValue.length >= 12 && !isNaN(cellValue)) {
          return `\t${cellValue}`
        }
        break
    }
  }
  return cellValue
}

function toTxtCellLabel (val: any) {
  if (/[",\s\n]/.test(val)) {
    return `"${val.replace(/"/g, '""')}"`
  }
  return val
}

function toCsv ($xetable: any, opts: any, columns: any[], datas: any[]) {
  let content = csvBOM
  if (opts.isHeader) {
    content += columns.map(column => toTxtCellLabel(getHeaderTitle($xetable, opts, column))).join(',') + enterSymbol
  }
  datas.forEach(row => {
    content += columns.map(column => toTxtCellLabel(getCsvCellTypeLabel(column, row[column.id]))).join(',') + enterSymbol
  })
  if (opts.isFooter) {
    const footerTableData = $xetable.footerTableData
    const footers = getFooterData(opts, footerTableData)
    footers.forEach((row: any) => {
      content += columns.map(column => toTxtCellLabel(getFooterCellValue($xetable, opts, row, column))).join(',') + enterSymbol
    })
  }
  return content
}

function toTxt ($xetable: any, opts: any, columns: any[], datas: any[]) {
  let content = ''
  if (opts.isHeader) {
    content += columns.map(column => toTxtCellLabel(getHeaderTitle($xetable, opts, column))).join('\t') + enterSymbol
  }
  datas.forEach(row => {
    content += columns.map(column => toTxtCellLabel(row[column.id])).join('\t') + enterSymbol
  })
  if (opts.isFooter) {
    const footerTableData = $xetable.footerTableData
    const footers = getFooterData(opts, footerTableData)
    footers.forEach((row: any) => {
      content += columns.map(column => toTxtCellLabel(getFooterCellValue($xetable, opts, row, column))).join('\t') + enterSymbol
    })
  }
  return content
}

function hasEllipsis ($xetable: any, column: any, property: any, allColumnOverflow: any) {
  const columnOverflow = column[property]
  const headOverflow = XEUtils.isUndefined(columnOverflow) || XEUtils.isNull(columnOverflow) ? allColumnOverflow : columnOverflow
  const showEllipsis = headOverflow === 'ellipsis'
  const showTitle = headOverflow === 'title'
  const showTooltip = headOverflow === true || headOverflow === 'tooltip'
  let isEllipsis = showTitle || showTooltip || showEllipsis
  // 虚拟滚动不支持动态高度
  if (($xetable.scrollXLoad || $xetable.scrollYLoad) && !isEllipsis) {
    isEllipsis = true
  }
  return isEllipsis
}

function toHtml ($xetable: any, opts: any, columns: any[], datas: any[]) {
  const { id, border, treeConfig, treeOpts, isAllSelected, isIndeterminate, headerAlign: allHeaderAlign, align: allAlign, footerAlign: allFooterAlign, showOverflow: allColumnOverflow, showHeaderOverflow: allColumnHeaderOverflow, mergeList } = $xetable
  const { print: isPrint, isHeader, isFooter, isColgroup, isMerge, colgroups, original } = opts
  const allCls = 'check-all'
  const clss = [
    'vxe-table',
    `border--${toTableBorder(border)}`,
    isPrint ? 'is--print' : '',
    isHeader ? 'is--header' : ''
  ].filter(cls => cls)
  const tables = [
    `<table class="${clss.join(' ')}" border="0" cellspacing="0" cellpadding="0">`,
    `<colgroup>${columns.map(column => `<col style="width:${column.renderWidth}px">`).join('')}</colgroup>`
  ]
  if (isHeader) {
    tables.push('<thead>')
    if (isColgroup && !original) {
      colgroups.forEach((cols: any[]) => {
        tables.push(
          `<tr>${cols.map(column => {
            const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign
            const classNames = hasEllipsis($xetable, column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : []
            const cellTitle = getHeaderTitle($xetable, opts, column)
            let childWidth = 0
            let countChild = 0
            XEUtils.eachTree([column], item => {
              if (!item.childNodes || !column.childNodes.length) {
                countChild++
              }
              childWidth += item.renderWidth
            }, { children: 'childNodes' })
            const cellWidth = childWidth - countChild
            if (headAlign) {
              classNames.push(`col--${headAlign}`)
            }
            if (column.type === 'checkbox') {
              return `<th class="${classNames.join(' ')}" colspan="${column._colSpan}" rowspan="${column._rowSpan}"><div ${isPrint ? '' : `style="width: ${cellWidth}px"`}><input type="checkbox" class="${allCls}" ${isAllSelected ? 'checked' : ''}><span>${cellTitle}</span></div></th>`
            }
            return `<th class="${classNames.join(' ')}" colspan="${column._colSpan}" rowspan="${column._rowSpan}" title="${cellTitle}"><div ${isPrint ? '' : `style="width: ${cellWidth}px"`}><span>${formatText(cellTitle, true)}</span></div></th>`
          }).join('')}</tr>`
        )
      })
    } else {
      tables.push(
        `<tr>${columns.map(column => {
          const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign
          const classNames = hasEllipsis($xetable, column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : []
          const cellTitle = getHeaderTitle($xetable, opts, column)
          if (headAlign) {
            classNames.push(`col--${headAlign}`)
          }
          if (column.type === 'checkbox') {
            return `<th class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" class="${allCls}" ${isAllSelected ? 'checked' : ''}><span>${cellTitle}</span></div></th>`
          }
          return `<th class="${classNames.join(' ')}" title="${cellTitle}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><span>${formatText(cellTitle, true)}</span></div></th>`
        }).join('')}</tr>`
      )
    }
    tables.push('</thead>')
  }
  if (datas.length) {
    tables.push('<tbody>')
    if (treeConfig) {
      datas.forEach(item => {
        tables.push(
          '<tr>' + columns.map(column => {
            const cellAlign = column.align || allAlign
            const classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
            const cellValue = item[column.id]
            if (cellAlign) {
              classNames.push(`col--${cellAlign}`)
            }
            if (column.treeNode) {
              let treeIcon = ''
              if (item._hasChild) {
                treeIcon = `<i class="${item._expand ? 'vxe-table--tree-fold-icon' : 'vxe-table--tree-unfold-icon'}"></i>`
              }
              classNames.push('vxe-table--tree-node')
              if (column.type === 'radio') {
                return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell"><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._radioLabel}</span></div></div></div></td>`
              } else if (column.type === 'checkbox') {
                return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell"><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></div></div></td>`
              }
              return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell">${cellValue}</div></div></div></td>`
            }
            if (column.type === 'radio') {
              return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._radioLabel}</span></div></td>`
            } else if (column.type === 'checkbox') {
              return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></td>`
            }
            return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${formatText(cellValue, true)}</div></td>`
          }).join('') + '</tr>'
        )
      })
    } else {
      datas.forEach(item => {
        tables.push(
          '<tr>' + columns.map(column => {
            const cellAlign = column.align || allAlign
            const classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
            const cellValue = item[column.id]
            let rowSpan = 1
            let colSpan = 1
            if (isMerge && mergeList.length) {
              const _rowIndex = $xetable.getVTRowIndex(item._row)
              const _columnIndex = $xetable.getVTColumnIndex(column)
              const spanRest = mergeBodyMethod(mergeList, _rowIndex, _columnIndex)
              if (spanRest) {
                const { rowspan, colspan } = spanRest
                if (!rowspan || !colspan) {
                  return ''
                }
                if (rowspan > 1) {
                  rowSpan = rowspan
                }
                if (colspan > 1) {
                  colSpan = colspan
                }
              }
            }
            if (cellAlign) {
              classNames.push(`col--${cellAlign}`)
            }
            if (column.type === 'radio') {
              return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._radioLabel}</span></div></td>`
            } else if (column.type === 'checkbox') {
              return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></td>`
            }
            return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${formatText(cellValue, true)}</div></td>`
          }).join('') + '</tr>'
        )
      })
    }
    tables.push('</tbody>')
  }
  if (isFooter) {
    const footerTableData = $xetable.footerTableData
    const footers = getFooterData(opts, footerTableData)
    if (footers.length) {
      tables.push('<tfoot>')
      footers.forEach((row: any) => {
        tables.push(
          `<tr>${columns.map(column => {
            const footAlign = column.footerAlign || column.align || allFooterAlign || allAlign
            const classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
            const cellValue = getFooterCellValue($xetable, opts, row, column)
            if (footAlign) {
              classNames.push(`col--${footAlign}`)
            }
            return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${formatText(cellValue, true)}</div></td>`
          }).join('')}</tr>`
        )
      })
      tables.push('</tfoot>')
    }
  }
  // 是否半选状态
  const script = !isAllSelected && isIndeterminate ? `<script>(function(){var a=document.querySelector(".${allCls}");if(a){a.indeterminate=true}})()</script>` : ''
  tables.push('</table>', script)
  return isPrint ? tables.join('') : createHtmlPage(opts, tables.join(''))
}

function toXML ($xetable: any, opts: any, columns: any[], datas: any[]) {
  let xml = [
    '<?xml version="1.0"?>',
    '<?mso-application progid="Excel.Sheet"?>',
    '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">',
    '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">',
    '<Version>16.00</Version>',
    '</DocumentProperties>',
    '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">',
    '<WindowHeight>7920</WindowHeight>',
    '<WindowWidth>21570</WindowWidth>',
    '<WindowTopX>32767</WindowTopX>',
    '<WindowTopY>32767</WindowTopY>',
    '<ProtectStructure>False</ProtectStructure>',
    '<ProtectWindows>False</ProtectWindows>',
    '</ExcelWorkbook>',
    `<Worksheet ss:Name="${opts.sheetName}">`,
    '<Table>',
    columns.map(column => `<Column ss:Width="${column.renderWidth}"/>`).join('')
  ].join('')
  if (opts.isHeader) {
    xml += `<Row>${columns.map(column => `<Cell><Data ss:Type="String">${getHeaderTitle($xetable, opts, column)}</Data></Cell>`).join('')}</Row>`
  }
  datas.forEach(row => {
    xml += '<Row>' + columns.map(column => `<Cell><Data ss:Type="String">${row[column.id]}</Data></Cell>`).join('') + '</Row>'
  })
  if (opts.isFooter) {
    const footerTableData = $xetable.footerTableData
    const footers = getFooterData(opts, footerTableData)
    footers.forEach((row: any) => {
      xml += `<Row>${columns.map(column => `<Cell><Data ss:Type="String">${getFooterCellValue($xetable, opts, row, column)}</Data></Cell>`).join('')}</Row>`
    })
  }
  return `${xml}</Table></Worksheet></Workbook>`
}

function getContent ($xetable: any, opts: any, columns: any[], datas: any[]) {
  if (columns.length) {
    switch (opts.type) {
      case 'csv':
        return toCsv($xetable, opts, columns, datas)
      case 'txt':
        return toTxt($xetable, opts, columns, datas)
      case 'html':
        return toHtml($xetable, opts, columns, datas)
      case 'xml':
        return toXML($xetable, opts, columns, datas)
    }
  }
  return ''
}

/**
 * 保存文件到本地
 * @param {*} options 参数
 */
export function saveLocalFile (options: any) {
  const { filename, type, content } = options
  const name = `${filename}.${type}`
  if (window.Blob) {
    const blob = content instanceof Blob ? content : getExportBlobByContent(XEUtils.toValueString(content), options)
    if ((navigator as any).msSaveBlob) {
      (navigator as any).msSaveBlob(blob, name)
    } else {
      const url = URL.createObjectURL(blob as any)
      const linkElem = document.createElement('a')
      linkElem.target = '_blank'
      linkElem.download = name
      linkElem.href = url
      document.body.appendChild(linkElem)
      linkElem.click()
      document.body.removeChild(linkElem)
      requestAnimationFrame(() => {
        if (linkElem.parentNode) {
          linkElem.parentNode.removeChild(linkElem)
        }
        URL.revokeObjectURL(url)
      })
    }
    return Promise.resolve()
  }
  return Promise.reject(new Error(getI18n('vxe.error.notExp')))
}

function downloadFile ($xetable: any, opts: any, content: any) {
  const { filename, type, download } = opts
  if (!download) {
    const blob = getExportBlobByContent(content, opts)
    return Promise.resolve({ type, content, blob })
  }
  saveLocalFile({ filename, type, content }).then(() => {
    if (opts.message !== false) {
      // 检测弹窗模块
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (!VxeUI.modal) {
          errLog('vxe.error.reqModule', ['Modal'])
        }
      }
      VxeUI.modal.message({ content: getI18n('vxe.table.expSuccess'), status: 'success' })
    }
  })
}

function clearColumnConvert (columns: any) {
  XEUtils.eachTree(columns, column => {
    delete column._level
    delete column._colSpan
    delete column._rowSpan
    delete column._children
    delete column.childNodes
  }, { children: 'children' })
}

function handleExport ($xeTable: any, opts: VxeTablePropTypes.ExportHandleOptions) {
  const $xeGrid = $xeTable.$xeGrid

  const { remote, columns, colgroups, exportMethod, afterExportMethod } = opts
  return new Promise(resolve => {
    if (remote) {
      const params = { options: opts, $table: $xeTable, $grid: $xeGrid }
      resolve(exportMethod ? exportMethod(params) : params)
    } else {
      const datas = getExportData($xeTable, opts)
      resolve(
        $xeTable.preventEvent(null, 'event.export', { options: opts, columns, colgroups, datas }, () => {
          return downloadFile($xeTable, opts, getContent($xeTable, opts, columns, datas))
        })
      )
    }
  }).then((params) => {
    clearColumnConvert(columns)
    if (!opts.print) {
      if (afterExportMethod) {
        afterExportMethod({ status: true, options: opts, $table: $xeTable, $grid: $xeGrid })
      }
    }
    return Object.assign({ status: true }, params)
  }).catch(() => {
    clearColumnConvert(columns)
    if (!opts.print) {
      if (afterExportMethod) {
        afterExportMethod({ status: false, options: opts, $table: $xeTable, $grid: $xeGrid })
      }
    }
    const params = { status: false }
    return Promise.reject(params)
  })
}

function getElementsByTagName (elem: any, qualifiedName: any) {
  return elem.getElementsByTagName(qualifiedName)
}

function getTxtCellKey (now: any) {
  return `#${now}@${XEUtils.uniqueId()}`
}

function replaceTxtCell (cell: any, vMaps: any) {
  return cell.replace(/#\d+@\d+/g, (key: any) => XEUtils.hasOwnProp(vMaps, key) ? vMaps[key] : key)
}

function getTxtCellValue (val: any, vMaps: any) {
  const rest = replaceTxtCell(val, vMaps)
  return rest.replace(/^"+$/g, (qVal: any) => '"'.repeat(Math.ceil(qVal.length / 2)))
}

function parseCsvAndTxt (columns: any, content: any, cellSeparator: any) {
  const list = content.split(enterSymbol)
  const rows: any[] = []
  let fields : any[] = []
  if (list.length) {
    const vMaps: any = {}
    const now = Date.now()
    list.forEach((rVal: any) => {
      if (rVal) {
        const item: any = {}
        rVal = rVal.replace(/("")|(\n)/g, (text: any, dVal: any) => {
          const key = getTxtCellKey(now)
          vMaps[key] = dVal ? '"' : '\n'
          return key
        }).replace(/"(.*?)"/g, (text: any, cVal: any) => {
          const key = getTxtCellKey(now)
          vMaps[key] = replaceTxtCell(cVal, vMaps)
          return key
        })
        const cells = rVal.split(cellSeparator)
        if (!fields.length) {
          fields = cells.map((val: any) => getTxtCellValue(val.trim(), vMaps))
        } else {
          cells.forEach((val: any, colIndex: any) => {
            if (colIndex < fields.length) {
              item[fields[colIndex]] = getTxtCellValue(val, vMaps)
            }
          })
          rows.push(item)
        }
      }
    })
  }
  return { fields, rows }
}

function parseCsv (columns: any, content: any) {
  return parseCsvAndTxt(columns, content, ',')
}

function parseTxt (columns: any, content: any) {
  return parseCsvAndTxt(columns, content, '\t')
}

function parseHTML (columns: any, content: any) {
  const domParser = new DOMParser()
  const xmlDoc = domParser.parseFromString(content, 'text/html')
  const bodyNodes = getElementsByTagName(xmlDoc, 'body')
  const rows : any[] = []
  const fields: any[] = []
  if (bodyNodes.length) {
    const tableNodes = getElementsByTagName(bodyNodes[0], 'table')
    if (tableNodes.length) {
      const theadNodes = getElementsByTagName(tableNodes[0], 'thead')
      if (theadNodes.length) {
        XEUtils.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), (rowNode: any) => {
          XEUtils.arrayEach(getElementsByTagName(rowNode, 'th'), (cellNode: any) => {
            fields.push(cellNode.textContent)
          })
        })
        const tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody')
        if (tbodyNodes.length) {
          XEUtils.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), rowNode => {
            const item : any = {}
            XEUtils.arrayEach(getElementsByTagName(rowNode, 'td'), (cellNode: any, colIndex) => {
              if (fields[colIndex]) {
                item[fields[colIndex]] = cellNode.textContent || ''
              }
            })
            rows.push(item)
          })
        }
      }
    }
  }
  return { fields, rows }
}

function parseXML (columns: any, content: any) {
  const domParser = new DOMParser()
  const xmlDoc = domParser.parseFromString(content, 'application/xml')
  const sheetNodes = getElementsByTagName(xmlDoc, 'Worksheet')
  const rows: any[] = []
  const fields : any[] = []
  if (sheetNodes.length) {
    const tableNodes = getElementsByTagName(sheetNodes[0], 'Table')
    if (tableNodes.length) {
      const rowNodes = getElementsByTagName(tableNodes[0], 'Row')
      if (rowNodes.length) {
        XEUtils.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), (cellNode: any) => {
          fields.push(cellNode.textContent)
        })
        XEUtils.arrayEach(rowNodes, (rowNode, index) => {
          if (index) {
            const item : any = {}
            const cellNodes = getElementsByTagName(rowNode, 'Cell')
            XEUtils.arrayEach(cellNodes, (cellNode: any, colIndex: any) => {
              if (fields[colIndex]) {
                item[fields[colIndex]] = cellNode.textContent
              }
            })
            rows.push(item)
          }
        })
      }
    }
  }
  return { fields, rows }
}

/**
 * 检查导入的列是否完整
 * @param {Array} fields 字段名列表
 * @param {Array} rows 数据列表
 */
function checkImportData (columns: any[], fields: any[]) {
  const tableFields: any[] = []
  columns.forEach((column) => {
    const field = column.field
    if (field) {
      tableFields.push(field)
    }
  })
  return fields.some(field => tableFields.indexOf(field) > -1)
}

function handleImport ($xetable: any, content: any, opts: any) {
  const { tableFullColumn, _importResolve, _importReject } = $xetable
  let rest: any = { fields: [], rows: [] }
  switch (opts.type) {
    case 'csv':
      rest = parseCsv(tableFullColumn, content)
      break
    case 'txt':
      rest = parseTxt(tableFullColumn, content)
      break
    case 'html':
      rest = parseHTML(tableFullColumn, content)
      break
    case 'xml':
      rest = parseXML(tableFullColumn, content)
      break
  }
  const { fields, rows } = rest
  const status = checkImportData(tableFullColumn, fields)
  if (status) {
    $xetable.createData(rows)
      .then((data: any) => {
        let loadRest
        if (opts.mode === 'insert' || opts.mode === 'insertBottom') {
          loadRest = $xetable.insertAt(data, -1)
        } if (opts.mode === 'insertTop') {
          loadRest = $xetable.insert(data)
        } else {
          loadRest = $xetable.reloadData(data)
        }
        if (opts.message !== false) {
          // 检测弹窗模块
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            if (!VxeUI.modal) {
              errLog('vxe.error.reqModule', ['Modal'])
            }
          }
          VxeUI.modal.message({ content: getI18n('vxe.table.impSuccess', [rows.length]), status: 'success' })
        }
        return loadRest.then(() => {
          if (_importResolve) {
            _importResolve({ status: true })
          }
        })
      })
  } else if (opts.message !== false) {
    // 检测弹窗模块
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      if (!VxeUI.modal) {
        errLog('vxe.error.reqModule', ['Modal'])
      }
    }
    VxeUI.modal.message({ content: getI18n('vxe.error.impFields'), status: 'error' })
    if (_importReject) {
      _importReject({ status: false })
    }
  }
}

function handleFileImport ($xetable: any, file: any, opts: any) {
  const { importOpts } = $xetable
  const { importMethod, afterImportMethod } = opts
  const { type, filename } = parseFile(file)

  // 检查类型，如果为自定义导出，则不需要校验类型
  if (!importMethod && !XEUtils.includes(XEUtils.keys(importOpts._typeMaps), type)) {
    if (opts.message !== false) {
      // 检测弹窗模块
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (!VxeUI.modal) {
          errLog('vxe.error.reqModule', ['Modal'])
        }
      }
      VxeUI.modal.message({ content: getI18n('vxe.error.notType', [type]), status: 'error' })
    }
    const params = { status: false }
    return Promise.reject(params)
  }

  const rest = new Promise((resolve, reject) => {
    const _importResolve = (params: any) => {
      resolve(params)
      $xetable._importResolve = null
      $xetable._importReject = null
    }
    const _importReject = (params: any) => {
      reject(params)
      $xetable._importResolve = null
      $xetable._importReject = null
    }
    $xetable._importResolve = _importResolve
    $xetable._importReject = _importReject
    if (window.FileReader) {
      const options = Object.assign({ mode: 'insertTop' }, opts, { type, filename })
      if (options.remote) {
        if (importMethod) {
          Promise.resolve(importMethod({ file, options, $table: $xetable })).then(() => {
            _importResolve({ status: true })
          }).catch(() => {
            _importResolve({ status: true })
          })
        } else {
          _importResolve({ status: true })
        }
      } else {
        $xetable.preventEvent(null, 'event.import', { file, options, columns: $xetable.tableFullColumn }, () => {
          const reader = new FileReader()
          reader.onerror = () => {
            errLog('vxe.error.notType', [type])
            _importReject({ status: false })
          }
          reader.onload = (e: any) => {
            handleImport($xetable, e.target.result, options)
          }
          reader.readAsText(file, options.encoding || 'UTF-8')
        })
      }
    } else {
      // 不支持的浏览器
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        errLog('vxe.error.notExp')
      }
      _importResolve({ status: true })
    }
  })

  return rest.then(() => {
    if (afterImportMethod) {
      afterImportMethod({ status: true, options: opts, $table: $xetable })
    }
  }).catch((e) => {
    if (afterImportMethod) {
      afterImportMethod({ status: false, options: opts, $table: $xetable })
    }
    return Promise.reject(e)
  })
}

function handleCloseExport () {
  if (VxeUI.modal) {
    return VxeUI.modal.close('VXE_EXPORT_MODAL')
  }
  return Promise.resolve()
}

/**
 * 读取本地文件
 * @param {*} options 参数
 */
export function readLocalFile (options: any = {}) {
  if (!fileForm) {
    fileForm = document.createElement('form')
    fileInput = document.createElement('input')
    fileForm.className = 'vxe-table--file-form'
    fileInput.name = 'file'
    fileInput.type = 'file'
    fileForm.appendChild(fileInput)
    document.body.appendChild(fileForm)
  }
  return new Promise((resolve, reject) => {
    const types = options.types || []
    const isAllType = !types.length || types.some((type: any) => type === '*')
    fileInput.multiple = !!options.multiple
    fileInput.accept = isAllType ? '' : `.${types.join(', .')}`
    fileInput.onchange = (evnt: any) => {
      const { files } = evnt.target
      const file = files[0]
      let errType
      // 校验类型
      if (!isAllType) {
        for (let fIndex = 0; fIndex < files.length; fIndex++) {
          const { type } = parseFile(files[fIndex])
          if (!XEUtils.includes(types, type)) {
            errType = type
            break
          }
        }
      }
      if (!errType) {
        resolve({ status: true, files, file })
      } else {
        if (options.message !== false) {
          // 检测弹窗模块
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            if (!VxeUI.modal) {
              errLog('vxe.error.reqModule', ['Modal'])
            }
          }
          VxeUI.modal.message({ content: getI18n('vxe.error.notType', [errType]), status: 'error' })
        }
        const params = { status: false, files, file }
        reject(params)
      }
    }
    fileForm.reset()
    fileInput.click()
  })
}

function handleExportAndPrint ($xeTable: VxeTableConstructor, options: VxeTablePropTypes.ExportOpts | VxeTablePropTypes.ExportConfig, isPrint?: any) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData
  const $xeGrid = $xeTable.$xeGrid

  const { treeConfig, showHeader, showFooter } = props
  const { initStore, mergeList, mergeFooterList, isGroup, footerTableData, exportStore, exportParams } = reactData
  const { collectColumn } = internalData
  const exportOpts = $xeTable.computeExportOpts
  const hasTree = treeConfig
  const customOpts = $xeTable.computeCustomOpts
  const selectRecords = $xeTable.getCheckboxRecords()
  const proxyOpts = $xeGrid ? $xeGrid.computeProxyOpts : {}
  const hasFooter = !!footerTableData.length
  const hasMerge = !!(mergeList.length || mergeFooterList.length)
  const defOpts = Object.assign({
    message: true,
    isHeader: showHeader,
    isFooter: showFooter,
    isColgroup: isGroup,
    isMerge: hasMerge,
    useStyle: true,
    current: 'current',
    modes: ['current', 'selected'].concat(proxyOpts.ajax && proxyOpts.ajax.queryAll ? ['all'] : [])
  }, options)
  const types = defOpts.types || XEUtils.keys(exportOpts._typeMaps)
  const modes = defOpts.modes || []
  const checkMethod = customOpts.checkMethod
  const exportColumns = collectColumn.slice(0)
  const { columns } = defOpts
  // 处理类型
  const typeList = types.map((value) => {
    return {
      value,
      label: getI18n(`vxe.export.types.${value}`)
    }
  })
  const modeList = modes.map((item: any) => {
    if (item && item.value) {
      return {
        value: item.value,
        label: item.label || item.value
      }
    }
    return {
      value: item,
      label: getI18n(`vxe.export.modes.${item}`)
    }
  })
  // 默认选中
  XEUtils.eachTree(exportColumns, (column, index, items, path, parent) => {
    const isColGroup = column.children && column.children.length
    if (isColGroup || defaultFilterExportColumn(column)) {
      column.checked = columns
        ? columns.some((item: any) => {
          if (isColumnInfo(item)) {
            return column.id === (item as any).id
          } else if (XEUtils.isString(item)) {
            return column.field === item
          } else {
            const colid = item.id || item.colId
            const type = item.type
            const field = item.field
            if (colid) {
              return column.id === colid
            } else if (field && type) {
              return column.field === field && column.type === type
            } else if (field) {
              return column.field === field
            } else if (type) {
              return column.type === type
            }
          }
          return false
        })
        : column.visible
      column.halfChecked = false
      column.disabled = (parent && parent.disabled) || (checkMethod ? !checkMethod({ column }) : false)
    }
  })
  // 更新条件
  Object.assign(exportStore, {
    columns: exportColumns,
    typeList,
    modeList,
    hasFooter,
    hasMerge,
    hasTree,
    isPrint,
    hasColgroup: isGroup,
    visible: true
  })
  // 默认参数
  Object.assign(exportParams, {
    mode: selectRecords.length ? 'selected' : 'current'
  }, defOpts)
  const { filename, sheetName, mode, type } = exportParams
  if (filename) {
    if (XEUtils.isFunction(filename)) {
      exportParams.filename = filename({
        options: defOpts,
        $table: $xeTable,
        $grid: $xeGrid
      })
    } else {
      exportParams.filename = `${filename}`
    }
  }
  if (sheetName) {
    if (XEUtils.isFunction(sheetName)) {
      exportParams.sheetName = sheetName({
        options: defOpts,
        $table: $xeTable,
        $grid: $xeGrid
      })
    } else {
      exportParams.sheetName = `${sheetName}`
    }
  }
  if (!modeList.some(item => item.value === mode)) {
    exportParams.mode = modeList[0].value
  }
  if (!typeList.some(item => item.value === type)) {
    exportParams.type = typeList[0].value
  }
  initStore.export = true
  return $xeTable.$nextTick()
}

const getConvertColumns = (columns: any[]) => {
  const result: any[] = []
  columns.forEach((column) => {
    if (column.childNodes && column.childNodes.length) {
      result.push(column)
      result.push(...getConvertColumns(column.childNodes))
    } else {
      result.push(column)
    }
  })
  return result
}

const convertToRows = (originColumns: any[]) => {
  let maxLevel = 1
  const traverse = (column: any, parent?: any) => {
    if (parent) {
      column._level = parent._level + 1
      if (maxLevel < column._level) {
        maxLevel = column._level
      }
    }
    if (column.childNodes && column.childNodes.length) {
      let colSpan = 0
      column.childNodes.forEach((subColumn: any) => {
        traverse(subColumn, column)
        colSpan += subColumn._colSpan
      })
      column._colSpan = colSpan
    } else {
      column._colSpan = 1
    }
  }

  originColumns.forEach((column) => {
    column._level = 1
    traverse(column)
  })

  const rows: any[] = []
  for (let i = 0; i < maxLevel; i++) {
    rows.push([])
  }

  const allColumns = getConvertColumns(originColumns)

  allColumns.forEach((column) => {
    if (column.childNodes && column.childNodes.length) {
      column._rowSpan = 1
    } else {
      column._rowSpan = maxLevel - column._level + 1
    }
    rows[column._level - 1].push(column)
  })

  return rows
}

export default {
  methods: {
    /**
     * 导出文件，支持 csv/html/xml/txt
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数转换数据
     * @param {Object} options 参数
     */
    _exportData (options: any) {
      const $xeTable = this
      const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor

      const { isGroup, tableGroupColumn, tableFullColumn, afterFullData, treeConfig, treeOpts, exportOpts } = this
      const opts = Object.assign({
        // filename: '',
        // sheetName: '',
        // original: false,
        // message: false,
        isHeader: true,
        isFooter: true,
        isColgroup: true,
        isMerge: false,
        isAllExpand: false,
        download: true,
        type: 'csv',
        mode: 'current'
        // data: null,
        // remote: false,
        // dataFilterMethod: null,
        // footerFilterMethod: null,
        // exportMethod: null,
        // columnFilterMethod: null,
        // beforeExportMethod: null,
        // afterExportMethod: null
      }, exportOpts, {
        print: false
      }, options)
      const { filename, sheetName, type, mode, columns, original, columnFilterMethod, beforeExportMethod, includeFields, excludeFields } = opts
      let groups = []
      const customCols = columns && columns.length ? columns : null
      const handleOptions: VxeTablePropTypes.ExportHandleOptions = Object.assign({ } as { data: any[], colgroups: any[], columns: any[] }, opts, { filename: '', sheetName: '' })
      // 如果设置源数据，则默认导出设置了字段的列
      if (!customCols && !columnFilterMethod) {
        handleOptions.columnFilterMethod = ({ column }) => {
          if (excludeFields) {
            if (XEUtils.includes(excludeFields, column.field)) {
              return false
            }
          }
          if (includeFields) {
            if (XEUtils.includes(includeFields, column.field)) {
              return true
            }
            return false
          }
          return original ? column.field : defaultFilterExportColumn(column)
        }
      }
      if (customCols) {
        handleOptions._isCustomColumn = true
        groups = XEUtils.searchTree(
          XEUtils.mapTree(customCols, (item) => {
            let targetColumn
            if (item) {
              if (isColumnInfo(item)) {
                targetColumn = item
              } else if (XEUtils.isString(item)) {
                targetColumn = $xeTable.getColumnByField(item)
              } else {
                const colid = item.id || item.colId
                const type = item.type
                const field = item.field
                if (colid) {
                  targetColumn = $xeTable.getColumnById(colid)
                } else if (field && type) {
                  targetColumn = tableFullColumn.find((column: VxeTableDefines.ColumnInfo) => column.field === field && column.type === type)
                } else if (field) {
                  targetColumn = $xeTable.getColumnByField(field)
                } else if (type) {
                  targetColumn = tableFullColumn.find((column: VxeTableDefines.ColumnInfo) => column.type === type)
                }
              }
              return targetColumn || {}
            }
          }, {
            children: 'childNodes',
            mapChildren: '_children'
          }),
          (column, index) => isColumnInfo(column) && (!columnFilterMethod || columnFilterMethod({ column: column as any, $columnIndex: index })),
          {
            children: '_children',
            mapChildren: 'childNodes',
            original: true
          }
        )
      } else {
        groups = XEUtils.searchTree(isGroup ? tableGroupColumn : tableFullColumn, (column, index) => column.visible && (!columnFilterMethod || columnFilterMethod({ column, $columnIndex: index })), { children: 'children', mapChildren: 'childNodes', original: true })
      }
      // 获取所有列
      const cols: VxeTableDefines.ColumnInfo[] = []
      XEUtils.eachTree(groups, column => {
        const isColGroup = column.children && column.children.length
        if (!isColGroup) {
          cols.push(column)
        }
      }, { children: 'childNodes' })
      // 构建分组层级
      handleOptions.columns = cols
      handleOptions.colgroups = convertToRows(groups)
      if (filename) {
        if (XEUtils.isFunction(filename)) {
          handleOptions.filename = filename({
            options: opts,
            $table: $xeTable,
            $grid: $xeGrid
          })
        } else {
          handleOptions.filename = `${filename}`
        }
      }
      if (!handleOptions.filename) {
        handleOptions.filename = getI18n(handleOptions.original ? 'vxe.table.expOriginFilename' : 'vxe.table.expFilename', [XEUtils.toDateString(Date.now(), 'yyyyMMddHHmmss')])
      }

      if (sheetName) {
        if (XEUtils.isFunction(sheetName)) {
          handleOptions.sheetName = sheetName({
            options: opts,
            $table: $xeTable,
            $grid: $xeGrid
          })
        } else {
          handleOptions.sheetName = `${sheetName}`
        }
      }
      if (!handleOptions.sheetName) {
        handleOptions.sheetName = document.title || ''
      }

      // 检查类型，如果为自定义导出，则不需要校验类型
      if (!handleOptions.exportMethod && !XEUtils.includes(XEUtils.keys(exportOpts._typeMaps), type)) {
        errLog('vxe.error.notType', [type])
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (['xlsx', 'pdf'].includes(type)) {
            warnLog('vxe.error.reqPlugin', [4, 'plugin-export-xlsx'])
          }
        }
        const params = { status: false }
        return Promise.reject(params)
      }

      if (!handleOptions.print) {
        if (beforeExportMethod) {
          beforeExportMethod({ options: handleOptions, $table: $xeTable, $grid: $xeGrid })
        }
      }

      if (!opts.data) {
        handleOptions.data = []
        if (mode === 'selected') {
          const selectRecords = $xeTable.getCheckboxRecords()
          if (['html', 'pdf'].indexOf(type) > -1 && treeConfig) {
            opts.data = XEUtils.searchTree($xeTable.getTableData().fullData, item => $xeTable.findRowIndexOf(selectRecords, item) > -1, Object.assign({}, treeOpts, { data: '_row' }))
          } else {
            opts.data = selectRecords
          }
        } else if (mode === 'all') {
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            if (!$xeGrid) {
              warnLog('vxe.error.errProp', ['all', 'mode=current,selected'])
            }
          }

          if ($xeGrid && !handleOptions.remote) {
            const gridReactData = $xeGrid as unknown as GridReactData
            const proxyOpts = $xeGrid.computeProxyOpts
            const { sortData } = gridReactData
            const { beforeQueryAll, afterQueryAll, ajax = {} } = proxyOpts
            const resConfigs = proxyOpts.response || proxyOpts.props || {}
            const ajaxMethods = ajax.queryAll
            const queryAllSuccessMethods = ajax.queryAllSuccess
            const queryAllErrorMethods = ajax.queryAllError

            if (process.env.VUE_APP_VXE_ENV === 'development') {
              if (!ajaxMethods) {
                warnLog('vxe.error.notFunc', ['proxy-config.ajax.queryAll'])
              }
            }

            if (ajaxMethods) {
              const params = {
                $table: $xeTable,
                $grid: $xeGrid,
                sort: sortData.length ? sortData[0] : {} as any,
                sorts: sortData as any[],
                filters: gridReactData.filterData,
                form: gridReactData.formData,
                options: handleOptions
              }
              return Promise.resolve((beforeQueryAll || ajaxMethods)(params))
                .then(rest => {
                  const listProp = resConfigs.list
                  handleOptions.data = (listProp ? (XEUtils.isFunction(listProp) ? listProp({ data: rest, $grid: $xeGrid }) : XEUtils.get(rest, listProp)) : rest) || []
                  if (afterQueryAll) {
                    afterQueryAll(params)
                  }
                  if (queryAllSuccessMethods) {
                    queryAllSuccessMethods({ ...params, response: rest })
                  }
                  return handleExport($xeTable, handleOptions)
                })
                .catch((rest) => {
                  if (queryAllErrorMethods) {
                    queryAllErrorMethods({ ...params, response: rest })
                  }
                })
            }
          }
        } else if (mode === 'current') {
          handleOptions.data = afterFullData
        }
      }
      return handleExport($xeTable, opts)
    },
    _importByFile (file: any, options: any) {
      const opts = Object.assign({}, options)
      const { beforeImportMethod } = opts
      if (beforeImportMethod) {
        beforeImportMethod({ options: opts, $table: this })
      }
      return handleFileImport(this, file, opts)
    },
    _importData (options: any) {
      const { importOpts } = this
      const opts = Object.assign({
        types: XEUtils.keys(importOpts._typeMaps)
        // beforeImportMethod: null,
        // afterImportMethod: null
      }, importOpts, options)
      const { beforeImportMethod, afterImportMethod } = opts
      if (beforeImportMethod) {
        beforeImportMethod({ options: opts, $table: this })
      }
      return readLocalFile(opts).catch(e => {
        if (afterImportMethod) {
          afterImportMethod({ status: false, options: opts, $table: this })
        }
        return Promise.reject(e)
      }).then((params: any) => {
        const { file } = params
        return handleFileImport(this, file, opts)
      })
    },
    _saveFile (options: any) {
      return saveLocalFile(options)
    },
    _readFile (options: any) {
      return readLocalFile(options)
    },
    _print (options: any) {
      const $xeTable = this
      const $xeGrid = $xeTable.$xeGrid

      const opts = Object.assign({
        original: false
        // beforePrintMethod
      }, this.printOpts, options, {
        type: 'html',
        download: false,
        remote: false,
        print: true
      })
      const { sheetName } = opts
      let printTitle = ''

      if (sheetName) {
        if (XEUtils.isFunction(sheetName)) {
          printTitle = sheetName({
            options: opts,
            $table: $xeTable,
            $grid: $xeGrid
          })
        } else {
          printTitle = `${sheetName}`
        }
      }
      if (!printTitle) {
        printTitle = document.title || ''
      }

      const beforePrintMethod = opts.beforePrintMethod
      const tableHtml = opts.html || opts.content
      return new Promise((resolve, reject) => {
        if (VxeUI.print) {
          if (tableHtml) {
            resolve(
              VxeUI.print({
                title: printTitle,
                html: tableHtml,
                customStyle: opts.style,
                beforeMethod: beforePrintMethod
                  ? ({ html }) => {
                      return beforePrintMethod({
                        html,
                        content: html,
                        options: opts,
                        $table: $xeTable
                      })
                    }
                  : undefined
              })
            )
          } else {
            resolve(
              $xeTable.exportData(opts).then(({ content }: any) => {
                return VxeUI.print({
                  title: printTitle,
                  html: content,
                  customStyle: opts.style,
                  beforeMethod: beforePrintMethod
                    ? ({ html }) => {
                        return beforePrintMethod({
                          html,
                          content: html,
                          options: opts,
                          $table: $xeTable
                        })
                      }
                    : undefined
                })
              })
            )
          }
        } else {
          const e = { status: false }
          reject(e)
        }
      })
    },
    _getPrintHtml (options: VxeTablePropTypes.PrintConfig) {
      const $xeTable = this

      const printOpts = $xeTable.computePrintOpts
      const opts = Object.assign({
        original: false
        // beforePrintMethod
      }, printOpts, options, {
        type: 'html',
        download: false,
        remote: false,
        print: true
      })
      return $xeTable.exportData(opts).then(({ content }: any) => {
        return {
          html: content
        }
      })
    },
    _closeImport () {
      if (VxeUI.modal) {
        return VxeUI.modal.close('VXE_IMPORT_MODAL')
      }
      return Promise.resolve()
    },
    _openImport (options: any) {
      const { importOpts } = this
      const defOpts = Object.assign({
        mode: 'insertTop',
        message: true,
        types: XEUtils.keys(importOpts._typeMaps),
        modes: ['insertTop', 'covering']
      }, options, importOpts)
      const types = defOpts.types || []
      const modes = defOpts.modes || []
      const isTree = !!this.getTreeStatus()
      if (isTree) {
        if (defOpts.message) {
          VxeUI.modal.message({ content: getI18n('vxe.error.treeNotImp'), status: 'error' })
        }
        return
      }
      if (!this.importConfig) {
        errLog('vxe.error.reqProp', ['import-config'])
      }
      // 处理类型
      const typeList = types.map((value: any) => {
        return {
          value,
          label: getI18n(`vxe.export.types.${value}`)
        }
      })
      const modeList = modes.map((item: any) => {
        if (item && item.value) {
          return {
            value: item.value,
            label: item.label || item.value
          }
        }
        return {
          value: item,
          label: getI18n(`vxe.import.modes.${item}`)
        }
      })
      Object.assign(this.importStore, {
        file: null,
        type: '',
        filename: '',
        modeList,
        typeList,
        visible: true
      })
      Object.assign(this.importParams, defOpts)
      if (!modeList.some((item: any) => item.value === this.importParams.mode)) {
        this.importParams.mode = modeList[0].value
      }
      this.initStore.import = true
    },
    _closeExport: handleCloseExport,
    _openExport (options: any) {
      const { exportOpts } = this
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (!this.exportConfig) {
          errLog('vxe.error.reqProp', ['export-config'])
        }
      }
      return handleExportAndPrint(this, Object.assign({}, exportOpts, options))
    },
    _closePrint: handleCloseExport,
    _openPrint (options: any) {
      const { printOpts } = this
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (!this.printConfig) {
          errLog('vxe.error.reqProp', ['print-config'])
        }
      }
      return handleExportAndPrint(this, Object.assign({}, printOpts, options), true)
    }
  } as any
} as any

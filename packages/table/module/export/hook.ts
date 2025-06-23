import { inject, nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { isColumnInfo, getCellValue, createHandleGetRowId } from '../../src/util'
import { parseFile, formatText, eqEmptyValue } from '../../../ui/src/utils'
import { hasClass } from '../../../ui/src/dom'
import { createHtmlPage, getExportBlobByContent } from './util'
import { warnLog, errLog } from '../../../ui/src/log'

import type { VxeGridConstructor, VxeGridPrivateMethods, VxeTablePropTypes, VxeColumnPropTypes, TableExportMethods, VxeGridPropTypes, VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods } from '../../../../types'

const { getI18n, hooks, renderer } = VxeUI

let htmlCellElem: any

const csvBOM = '\ufeff'
const enterSymbol = '\r\n'

function defaultFilterExportColumn (column: VxeTableDefines.ColumnInfo) {
  return !!column.field || ['seq', 'checkbox', 'radio'].indexOf(column.type || '') === -1
}

const getConvertColumns = (columns: any) => {
  const result: any = []
  columns.forEach((column: any) => {
    if (column.childNodes && column.childNodes.length) {
      result.push(column)
      result.push(...getConvertColumns(column.childNodes))
    } else {
      result.push(column)
    }
  })
  return result
}

const convertToRows = (originColumns: any): any[][] => {
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

  originColumns.forEach((column: any) => {
    column._level = 1
    traverse(column)
  })

  const rows: any = []
  for (let i = 0; i < maxLevel; i++) {
    rows.push([])
  }

  const allColumns = getConvertColumns(originColumns)

  allColumns.forEach((column: any) => {
    if (column.childNodes && column.childNodes.length) {
      column._rowSpan = 1
    } else {
      column._rowSpan = maxLevel - column._level + 1
    }
    rows[column._level - 1].push(column)
  })

  return rows
}

function toTableBorder (border: VxeTablePropTypes.Border | undefined) {
  if (border === true) {
    return 'full'
  }
  if (border) {
    return border
  }
  return 'default'
}

function getBooleanValue (cellValue: any) {
  return cellValue === 'TRUE' || cellValue === 'true' || cellValue === true
}

function getFooterData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, opts: VxeTablePropTypes.ExportHandleOptions, footerTableData: any[]) {
  const { footerFilterMethod } = opts
  return footerFilterMethod ? footerTableData.filter((items, index) => footerFilterMethod({ $table: $xeTable, items, $rowIndex: index })) : footerTableData
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

function getElementsByTagName (elem: any, qualifiedName: any) {
  return elem.getElementsByTagName(qualifiedName) as HTMLElement[]
}

function getTxtCellKey (now: number) {
  return `#${now}@${XEUtils.uniqueId()}`
}

function replaceTxtCell (cell: any, vMaps: any) {
  return cell.replace(/#\d+@\d+/g, (key: any) => XEUtils.hasOwnProp(vMaps, key) ? vMaps[key] : key)
}

function getTxtCellValue (val: any, vMaps: any) {
  const rest = replaceTxtCell(val, vMaps)
  return rest.replace(/^"+$/g, (qVal: any) => '"'.repeat(Math.ceil(qVal.length / 2)))
}

function toExportField (tableConf: {
  fieldMaps: Record<string, VxeTableDefines.ColumnInfo>
  titleMaps: Record<string, VxeTableDefines.ColumnInfo>
}, field: string) {
  const { fieldMaps, titleMaps } = tableConf
  // title 转 field
  if (!fieldMaps[field]) {
    const teCol = titleMaps[field]
    if (teCol && teCol.field) {
      field = teCol.field
    }
  }
  return field
}

function parseCsvAndTxt (tableConf: {
  fieldMaps: Record<string, VxeTableDefines.ColumnInfo>
  titleMaps: Record<string, VxeTableDefines.ColumnInfo>
}, content: string, cellSeparator: string) {
  const list = content.split(enterSymbol)
  const rows: any[] = []
  let fields: string[] = []
  if (list.length) {
    const vMaps: any = {}
    const now = Date.now()
    list.forEach((rVal) => {
      if (rVal) {
        const item: any = {}
        rVal = rVal.replace(/("")|(\n)/g, (text: string, dVal: string) => {
          const key = getTxtCellKey(now)
          vMaps[key] = dVal ? '"' : '\n'
          return key
        }).replace(/"(.*?)"/g, (text: string, cVal: string) => {
          const key = getTxtCellKey(now)
          vMaps[key] = replaceTxtCell(cVal, vMaps)
          return key
        })
        const cells: string[] = rVal.split(cellSeparator)
        if (!fields.length) {
          fields = cells.map((val: string) => toExportField(tableConf, getTxtCellValue(val.trim(), vMaps)))
        } else {
          cells.forEach((val, colIndex) => {
            if (colIndex < fields.length) {
              item[fields[colIndex]] = getTxtCellValue(val.trim(), vMaps)
            }
          })
          rows.push(item)
        }
      }
    })
  }
  return { fields, rows }
}

function parseCsv (tableConf: {
  fieldMaps: Record<string, VxeTableDefines.ColumnInfo>
  titleMaps: Record<string, VxeTableDefines.ColumnInfo>
}, content: string) {
  return parseCsvAndTxt(tableConf, content, ',')
}

function parseTxt (tableConf: {
  fieldMaps: Record<string, VxeTableDefines.ColumnInfo>
  titleMaps: Record<string, VxeTableDefines.ColumnInfo>
}, content: string) {
  return parseCsvAndTxt(tableConf, content, '\t')
}

function parseHTML (tableConf: {
  fieldMaps: Record<string, VxeTableDefines.ColumnInfo>
  titleMaps: Record<string, VxeTableDefines.ColumnInfo>
}, content: string) {
  const domParser = new DOMParser()
  const xmlDoc = domParser.parseFromString(content, 'text/html')
  const bodyNodes = getElementsByTagName(xmlDoc, 'body')
  const rows: any[] = []
  const fields: string[] = []
  if (bodyNodes.length) {
    const tableNodes = getElementsByTagName(bodyNodes[0], 'table')
    if (tableNodes.length) {
      const theadNodes = getElementsByTagName(tableNodes[0], 'thead')
      if (theadNodes.length) {
        XEUtils.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), rowNode => {
          XEUtils.arrayEach(getElementsByTagName(rowNode, 'th'), cellNode => {
            fields.push(toExportField(tableConf, cellNode.textContent || ''))
          })
        })
        const tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody')
        if (tbodyNodes.length) {
          XEUtils.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), rowNode => {
            const item: any = {}
            XEUtils.arrayEach(getElementsByTagName(rowNode, 'td'), (cellNode, colIndex) => {
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

function parseXML (tableConf: {
  fieldMaps: Record<string, VxeTableDefines.ColumnInfo>
  titleMaps: Record<string, VxeTableDefines.ColumnInfo>
}, content: string) {
  const domParser = new DOMParser()
  const xmlDoc = domParser.parseFromString(content, 'application/xml')
  const sheetNodes = getElementsByTagName(xmlDoc, 'Worksheet')
  const rows: any[] = []
  const fields: string[] = []
  if (sheetNodes.length) {
    const tableNodes = getElementsByTagName(sheetNodes[0], 'Table')
    if (tableNodes.length) {
      const rowNodes = getElementsByTagName(tableNodes[0], 'Row')
      if (rowNodes.length) {
        XEUtils.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), cellNode => {
          fields.push(toExportField(tableConf, cellNode.textContent || ''))
        })
        XEUtils.arrayEach(rowNodes, (rowNode, index) => {
          if (index) {
            const item: any = {}
            const cellNodes = getElementsByTagName(rowNode, 'Cell')
            XEUtils.arrayEach(cellNodes, (cellNode, colIndex) => {
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

function clearColumnConvert (columns: any) {
  XEUtils.eachTree(columns, (column: any) => {
    delete column._level
    delete column._colSpan
    delete column._rowSpan
    delete column._children
    delete column.childNodes
  }, { children: 'children' })
}

const tableExportMethodKeys: (keyof TableExportMethods)[] = ['exportData', 'importByFile', 'importData', 'saveFile', 'readFile', 'print', 'getPrintHtml', 'openImport', 'closeImport', 'openExport', 'closeExport', 'openPrint', 'closePrint']

hooks.add('tableExportModule', {
  setupTable ($xeTable) {
    const { props, reactData, internalData } = $xeTable
    const { computeTreeOpts, computePrintOpts, computeExportOpts, computeImportOpts, computeCustomOpts, computeSeqOpts, computeRadioOpts, computeCheckboxOpts, computeColumnOpts } = $xeTable.getComputeMaps()

    const $xeGrid = inject('$xeGrid', null as (VxeGridConstructor & VxeGridPrivateMethods) | null)

    const hasTreeChildren = (row: any) => {
      const treeOpts = computeTreeOpts.value
      const childrenField = treeOpts.children || treeOpts.childrenField
      return row[childrenField] && row[childrenField].length
    }

    const getSeq = (cellValue: any, row: any, $rowIndex: number, column: VxeTableDefines.ColumnInfo, $columnIndex: number) => {
      const seqOpts = computeSeqOpts.value
      const seqMethod = seqOpts.seqMethod || (column as any).seqMethod
      if (seqMethod) {
        return seqMethod({
          $table: $xeTable,
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

    function getHeaderTitle (opts: VxeTablePropTypes.ExportHandleOptions, column: VxeTableDefines.ColumnInfo) {
      const columnOpts = computeColumnOpts.value
      const headExportMethod = column.headerExportMethod || columnOpts.headerExportMethod
      return headExportMethod ? headExportMethod({ column, options: opts, $table: $xeTable }) : ((opts.isTitle ? column.getTitle() : column.field) || '')
    }

    const toBooleanValue = (cellValue: any) => {
      return XEUtils.isBoolean(cellValue) ? (cellValue ? 'TRUE' : 'FALSE') : cellValue
    }

    const toStringValue = (cellValue: any) => {
      return eqEmptyValue(cellValue) ? '' : `${cellValue}`
    }

    const getBodyLabelData = (opts: VxeTablePropTypes.ExportHandleOptions, columns: VxeTableDefines.ColumnInfo[], datas: any[]) => {
      const { isAllExpand, mode } = opts
      const { treeConfig } = props
      const radioOpts = computeRadioOpts.value
      const checkboxOpts = computeCheckboxOpts.value
      const treeOpts = computeTreeOpts.value
      const columnOpts = computeColumnOpts.value
      if (!htmlCellElem) {
        htmlCellElem = document.createElement('div')
      }
      if (treeConfig) {
        const childrenField = treeOpts.children || treeOpts.childrenField
        // 如果是树表格只允许导出数据源
        const rest: any[] = []
        const expandMaps: Record<string, boolean> = {}
        const useMaps: Record<string, boolean> = {}
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        XEUtils.eachTree(datas, (item, $rowIndex, items, path, parent, nodes) => {
          const row = item._row || item
          const rowid = handleGetRowId(row)
          if (useMaps[rowid]) {
            return
          }
          const parentRow = parent && parent._row ? parent._row : parent
          const pRowid = parentRow ? handleGetRowId(parentRow) : ''
          if ((isAllExpand || !parentRow || (expandMaps[pRowid] && $xeTable.isTreeExpandByRow(parentRow)))) {
            const hasRowChild = hasTreeChildren(row)
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
                    cellValue = mode === 'all' ? seqVal : getSeq(seqVal, row, $rowIndex, column, $columnIndex)
                    break
                  }
                  case 'checkbox':
                    cellValue = toBooleanValue($xeTable.isCheckedByCheckboxRow(row))
                    item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : ''
                    item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ $table: $xeTable, row })
                    break
                  case 'radio':
                    cellValue = toBooleanValue($xeTable.isCheckedByRadioRow(row))
                    item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : ''
                    item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ $table: $xeTable, row })
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
                        if (cell && !hasClass(cell, 'is--progress')) {
                          cellValue = cell.innerText.trim()
                        }
                      }
                    }
                }
              }
              item[column.id] = toStringValue(cellValue)
            })
            useMaps[rowid] = true
            if (pRowid) {
              expandMaps[pRowid] = true
            }
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
                cellValue = mode === 'all' ? seqValue : getSeq(seqValue, row, $rowIndex, column, $columnIndex)
                break
              }
              case 'checkbox':
                cellValue = toBooleanValue($xeTable.isCheckedByCheckboxRow(row))
                item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : ''
                item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ $table: $xeTable, row })
                break
              case 'radio':
                cellValue = toBooleanValue($xeTable.isCheckedByRadioRow(row))
                item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : ''
                item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ $table: $xeTable, row })
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
                    if (cell && !hasClass(cell, 'is--progress')) {
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

    const getExportData = (opts: VxeTablePropTypes.ExportHandleOptions) => {
      const { columns, dataFilterMethod } = opts
      let datas = opts.data
      if (dataFilterMethod) {
        datas = datas.filter((row, index) => dataFilterMethod({ $table: $xeTable, row, $rowIndex: index }))
      }
      return getBodyLabelData(opts, columns, datas)
    }

    const getFooterCellValue = (opts: VxeTablePropTypes.ExportHandleOptions, row: any, column: VxeTableDefines.ColumnInfo) => {
      const columnOpts = computeColumnOpts.value
      const renderOpts = column.editRender || column.cellRender
      let footLabelMethod: VxeColumnPropTypes.FooterExportMethod | undefined = column.footerExportMethod
      if (!footLabelMethod && renderOpts && renderOpts.name) {
        const compConf = renderer.get(renderOpts.name)
        if (compConf) {
          footLabelMethod = compConf.tableFooterExportMethod || compConf.footerExportMethod
        }
      }
      if (!footLabelMethod) {
        footLabelMethod = columnOpts.footerExportMethod
      }
      const _columnIndex = $xeTable.getVTColumnIndex(column)
      if (footLabelMethod) {
        return footLabelMethod({ $table: $xeTable, items: row, itemIndex: _columnIndex, row, _columnIndex, column, options: opts })
      }
      // 兼容老模式
      if (XEUtils.isArray(row)) {
        return XEUtils.toValueString(row[_columnIndex])
      }
      return XEUtils.get(row, column.field)
    }

    const toCsv = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, opts: VxeTablePropTypes.ExportHandleOptions, columns: VxeTableDefines.ColumnInfo[], datas: any[]) => {
      let content = csvBOM
      if (opts.isHeader) {
        content += columns.map((column) => toTxtCellLabel(getHeaderTitle(opts, column))).join(',') + enterSymbol
      }
      datas.forEach((row) => {
        content += columns.map((column) => toTxtCellLabel(getCsvCellTypeLabel(column, row[column.id]))).join(',') + enterSymbol
      })
      if (opts.isFooter) {
        const { footerTableData } = reactData
        const footers = getFooterData($xeTable, opts, footerTableData)
        footers.forEach((row) => {
          content += columns.map((column: any) => toTxtCellLabel(getFooterCellValue(opts, row, column))).join(',') + enterSymbol
        })
      }
      return content
    }

    const toTxt = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, opts: VxeTablePropTypes.ExportHandleOptions, columns: VxeTableDefines.ColumnInfo[], datas: any[]) => {
      let content = ''
      if (opts.isHeader) {
        content += columns.map((column) => toTxtCellLabel(getHeaderTitle(opts, column))).join('\t') + enterSymbol
      }
      datas.forEach((row) => {
        content += columns.map((column) => toTxtCellLabel(row[column.id])).join('\t') + enterSymbol
      })
      if (opts.isFooter) {
        const { footerTableData } = reactData
        const footers = getFooterData($xeTable, opts, footerTableData)
        footers.forEach((row) => {
          content += columns.map((column: any) => toTxtCellLabel(getFooterCellValue(opts, row, column))).join('\t') + enterSymbol
        })
      }
      return content
    }

    const hasEllipsis = (column: VxeTableDefines.ColumnInfo, property: 'showOverflow' | 'showHeaderOverflow', allColumnOverflow: VxeTablePropTypes.ShowOverflow | undefined) => {
      const columnOverflow = column[property]
      const headOverflow = XEUtils.isUndefined(columnOverflow) || XEUtils.isNull(columnOverflow) ? allColumnOverflow : columnOverflow
      const showEllipsis = headOverflow === 'ellipsis'
      const showTitle = headOverflow === 'title'
      const showTooltip = headOverflow === true || headOverflow === 'tooltip'
      let isEllipsis = showTitle || showTooltip || showEllipsis
      // 虚拟滚动不支持动态高度
      const { scrollXLoad, scrollYLoad } = reactData
      if ((scrollXLoad || scrollYLoad) && !isEllipsis) {
        isEllipsis = true
      }
      return isEllipsis
    }

    const toHtml = (opts: VxeTablePropTypes.ExportHandleOptions, columns: VxeTableDefines.ColumnInfo[], datas: any[]) => {
      const { id, border, treeConfig, headerAlign: allHeaderAlign, align: allAlign, footerAlign: allFooterAlign, showOverflow: allColumnOverflow, showHeaderOverflow: allColumnHeaderOverflow } = props
      const { isAllSelected, isIndeterminate } = reactData
      const { mergeBodyCellMaps } = internalData
      const treeOpts = computeTreeOpts.value
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
        `<colgroup>${columns.map((column: any) => `<col style="width:${column.renderWidth}px">`).join('')}</colgroup>`
      ]
      if (isHeader) {
        tables.push('<thead>')
        if (isColgroup && !original) {
          colgroups.forEach((cols: any) => {
            tables.push(
              `<tr>${cols.map((column: any) => {
                const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign
                const classNames = hasEllipsis(column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : []
                const cellTitle = getHeaderTitle(opts, column)
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
            `<tr>${columns.map((column: any) => {
              const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign
              const classNames = hasEllipsis(column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : []
              const cellTitle = getHeaderTitle(opts, column)
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
          datas.forEach((item: any) => {
            tables.push(
              '<tr>' + columns.map((column: any) => {
                const colid = column.id
                const cellAlign = column.align || allAlign
                const classNames = hasEllipsis(column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
                const cellValue = item[colid]
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
          datas.forEach((item) => {
            tables.push(
              '<tr>' + columns.map((column) => {
                const cellAlign = column.align || allAlign
                const classNames = hasEllipsis(column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
                const cellValue = item[column.id]
                let rowSpan = 1
                let colSpan = 1
                if (isMerge) {
                  const _rowIndex = $xeTable.getVTRowIndex(item._row)
                  const _columnIndex = $xeTable.getVTColumnIndex(column)
                  const spanRest = mergeBodyCellMaps[`${_rowIndex}:${_columnIndex}`]
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
        const { footerTableData } = reactData
        const footers = getFooterData($xeTable, opts, footerTableData)
        if (footers.length) {
          tables.push('<tfoot>')
          footers.forEach((row: any) => {
            tables.push(
              `<tr>${columns.map((column: any) => {
                const footAlign = column.footerAlign || column.align || allFooterAlign || allAlign
                const classNames = hasEllipsis(column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
                const cellValue = getFooterCellValue(opts, row, column)
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

    const toXML = (opts: any, columns: any, datas: any) => {
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
        columns.map((column: any) => `<Column ss:Width="${column.renderWidth}"/>`).join('')
      ].join('')
      if (opts.isHeader) {
        xml += `<Row>${columns.map((column: any) => `<Cell><Data ss:Type="String">${getHeaderTitle(opts, column)}</Data></Cell>`).join('')}</Row>`
      }
      datas.forEach((row: any) => {
        xml += '<Row>' + columns.map((column: any) => `<Cell><Data ss:Type="String">${row[column.id]}</Data></Cell>`).join('') + '</Row>'
      })
      if (opts.isFooter) {
        const { footerTableData } = reactData
        const footers = getFooterData($xeTable, opts, footerTableData)
        footers.forEach((row: any) => {
          xml += `<Row>${columns.map((column: any) => `<Cell><Data ss:Type="String">${getFooterCellValue(opts, row, column)}</Data></Cell>`).join('')}</Row>`
        })
      }
      return `${xml}</Table></Worksheet></Workbook>`
    }

    const getContent = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, opts: VxeTablePropTypes.ExportHandleOptions, columns: VxeTableDefines.ColumnInfo[], datas: any[]) => {
      if (columns.length) {
        switch (opts.type) {
          case 'csv':
            return toCsv($xeTable, opts, columns, datas)
          case 'txt':
            return toTxt($xeTable, opts, columns, datas)
          case 'html':
            return toHtml(opts, columns, datas)
          case 'xml':
            return toXML(opts, columns, datas)
        }
      }
      return ''
    }

    const downloadFile = (opts: any, content: any) => {
      const { filename, type, download } = opts
      if (!download) {
        const blob = getExportBlobByContent(content, opts)
        return Promise.resolve({ type, content, blob })
      }
      if (VxeUI.saveFile) {
        VxeUI.saveFile({ filename, type, content }).then(() => {
          if (opts.message !== false) {
            if (VxeUI.modal) {
              VxeUI.modal.message({ content: getI18n('vxe.table.expSuccess'), status: 'success' })
            }
          }
        })
      }
    }

    const handleExport = (opts: VxeTablePropTypes.ExportHandleOptions) => {
      const { remote, columns, colgroups, exportMethod, afterExportMethod } = opts
      return new Promise(resolve => {
        if (remote) {
          const params = { options: opts, $table: $xeTable, $grid: $xeGrid }
          resolve(exportMethod ? exportMethod(params) : params)
        } else {
          const datas = getExportData(opts)
          resolve(
            $xeTable.preventEvent(null, 'event.export', { options: opts, columns, colgroups, datas }, () => {
              return downloadFile(opts, getContent($xeTable, opts, columns, datas))
            })
          )
        }
      }).then((params: any) => {
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

    const handleImport = (content: any, opts: any) => {
      const { tableFullColumn, _importResolve, _importReject } = internalData
      let rest: {
        fields: string[];
        rows: any[];
      } = { fields: [], rows: [] }
      const tableFieldMaps: Record<string, VxeTableDefines.ColumnInfo> = {}
      const tableTitleMaps: Record<string, VxeTableDefines.ColumnInfo> = {}
      tableFullColumn.forEach((column) => {
        const field = column.field
        const title = column.getTitle()
        if (field) {
          tableFieldMaps[field] = column
        }
        if (title) {
          tableTitleMaps[column.getTitle()] = column
        }
      })
      const tableConf = {
        fieldMaps: tableFieldMaps,
        titleMaps: tableTitleMaps
      }
      switch (opts.type) {
        case 'csv':
          rest = parseCsv(tableConf, content)
          break
        case 'txt':
          rest = parseTxt(tableConf, content)
          break
        case 'html':
          rest = parseHTML(tableConf, content)
          break
        case 'xml':
          rest = parseXML(tableConf, content)
          break
      }
      const { fields, rows } = rest
      const status = fields.some(field => tableFieldMaps[field] || tableTitleMaps[field])
      if (status) {
        $xeTable.createData(rows)
          .then((data: any) => {
            let loadRest
            if (opts.mode === 'insert' || opts.mode === 'insertBottom') {
              loadRest = $xeTable.insertAt(data, -1)
            } if (opts.mode === 'insertTop') {
              loadRest = $xeTable.insert(data)
            } else {
              loadRest = $xeTable.reloadData(data)
            }
            if (opts.message !== false) {
              if (VxeUI.modal) {
                VxeUI.modal.message({ content: getI18n('vxe.table.impSuccess', [rows.length]), status: 'success' })
              }
            }
            return loadRest.then(() => {
              if (_importResolve) {
                _importResolve({ status: true })
              }
            })
          })
      } else if (opts.message !== false) {
        if (VxeUI.modal) {
          VxeUI.modal.message({ content: getI18n('vxe.error.impFields'), status: 'error' })
        }
        if (_importReject) {
          _importReject({ status: false })
        }
      }
    }

    const handleFileImport = (file: File, opts: any) => {
      const { importMethod, afterImportMethod } = opts
      const { type, filename } = parseFile(file)
      const importOpts = computeImportOpts.value

      // 检查类型，如果为自定义导出，则不需要校验类型
      if (!importMethod && !XEUtils.includes(XEUtils.keys(importOpts._typeMaps), type)) {
        if (opts.message !== false) {
          if (VxeUI.modal) {
            VxeUI.modal.message({ content: getI18n('vxe.error.notType', [type]), status: 'error' })
          }
        }
        const params = { status: false }
        return Promise.reject(params)
      }

      const rest = new Promise((resolve, reject) => {
        const _importResolve = (params?: any) => {
          resolve(params)
          internalData._importResolve = null
          internalData._importReject = null
        }
        const _importReject = (params?: any) => {
          reject(params)
          internalData._importResolve = null
          internalData._importReject = null
        }
        internalData._importResolve = _importResolve
        internalData._importReject = _importReject
        if (window.FileReader) {
          const options = Object.assign({ mode: 'insertTop' }, opts, { type, filename })
          if (options.remote) {
            if (importMethod) {
              Promise.resolve(importMethod({ file, options, $table: $xeTable })).then(() => {
                _importResolve({ status: true })
              }).catch(() => {
                _importResolve({ status: true })
              })
            } else {
              _importResolve({ status: true })
            }
          } else {
            const { tableFullColumn } = internalData
            $xeTable.preventEvent(null, 'event.import', { file, options, columns: tableFullColumn }, () => {
              const reader = new FileReader()
              reader.onerror = () => {
                errLog('vxe.error.notType', [type])
                _importReject({ status: false })
              }
              reader.onload = (e: any) => {
                handleImport(e.target.result, options)
              }
              reader.readAsText(file, options.encoding || 'UTF-8')
            })
          }
        } else {
          // 不支持的浏览器
          errLog('vxe.error.notExp')
          _importResolve({ status: true })
        }
      })

      return rest.then(() => {
        if (afterImportMethod) {
          afterImportMethod({ status: true, options: opts, $table: $xeTable })
        }
      }).catch((e) => {
        if (afterImportMethod) {
          afterImportMethod({ status: false, options: opts, $table: $xeTable })
        }
        return Promise.reject(e)
      })
    }

    const handleFilterColumns = (exportOpts: VxeTablePropTypes.ExportConfig, column: VxeTableDefines.ColumnInfo, columns: VxeTableDefines.ColumnInfo[] | VxeTablePropTypes.ExportOrPrintColumnOption[]) => {
      return columns.some((item: any) => {
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
    }

    const handleFilterFields = (exportOpts: VxeTablePropTypes.ExportConfig, column: VxeTableDefines.ColumnInfo, includeFields: string[] | undefined, excludeFields: string[] | undefined) => {
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
      return exportOpts.original ? !!column.field : defaultFilterExportColumn(column)
    }

    const handleExportAndPrint = (options: VxeTablePropTypes.ExportOpts | VxeTablePropTypes.ExportConfig, isPrint?: boolean) => {
      const { treeConfig, showHeader, showFooter } = props
      const { initStore, isGroup, footerTableData, exportStore, exportParams } = reactData
      const { collectColumn, mergeBodyList, mergeFooterList } = internalData
      const exportOpts = computeExportOpts.value
      const hasTree = treeConfig
      const customOpts = computeCustomOpts.value
      const selectRecords = $xeTable.getCheckboxRecords()
      const proxyOpts = $xeGrid ? $xeGrid.getComputeMaps().computeProxyOpts.value : {} as VxeGridPropTypes.ProxyOpts
      const hasFooter = !!footerTableData.length
      const hasMerge = !!(mergeBodyList.length || mergeFooterList.length)
      const defOpts = Object.assign({
        message: true,
        isHeader: showHeader,
        isTitle: showHeader,
        isFooter: showFooter,
        isColgroup: isGroup,
        isMerge: hasMerge,
        useStyle: true,
        current: 'current',
        modes: (proxyOpts.ajax && proxyOpts.ajax.queryAll ? ['all'] : []).concat(['current', 'selected', 'empty'])
      }, options)
      const types: string[] = defOpts.types || XEUtils.keys(exportOpts._typeMaps)
      const modes: string[] = defOpts.modes || []
      const checkMethod = customOpts.checkMethod
      const exportColumns = collectColumn.slice(0)
      const { columns, excludeFields, includeFields } = defOpts
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
        const isColGroup = column.children && column.children.length > 0
        let isChecked = false
        if (columns && columns.length) {
          isChecked = handleFilterColumns(defOpts, column, columns)
        } else if (excludeFields || includeFields) {
          isChecked = handleFilterFields(defOpts, column, includeFields, excludeFields)
        } else {
          isChecked = column.visible && (isColGroup || defaultFilterExportColumn(column))
        }
        column.checked = isChecked
        column.halfChecked = false
        column.disabled = (parent && parent.disabled) || (checkMethod ? !checkMethod({ $table: $xeTable, column }) : false)
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
      return nextTick()
    }

    const handleCloseExport = () => {
      if (VxeUI.modal) {
        return VxeUI.modal.close('VXE_EXPORT_MODAL')
      }
      return Promise.resolve()
    }

    const exportMethods: TableExportMethods = {
      /**
       * 导出文件，支持 csv/html/xml/txt
       * 如果是树表格，则默认是导出所有节点
       * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数转换数据
       * @param {Object} options 参数
       */
      exportData (options) {
        const { treeConfig, showHeader, showFooter } = props
        const { isGroup } = reactData
        const { tableFullColumn, afterFullData, afterTreeFullData, collectColumn, mergeBodyList, mergeFooterList } = internalData
        const exportOpts = computeExportOpts.value
        const treeOpts = computeTreeOpts.value
        const proxyOpts = $xeGrid ? $xeGrid.getComputeMaps().computeProxyOpts.value : {} as VxeGridPropTypes.ProxyOpts
        const hasMerge = !!(mergeBodyList.length || mergeFooterList.length)
        const opts = Object.assign({
          message: true,
          isHeader: showHeader,
          isTitle: showHeader,
          isFooter: showFooter,
          isColgroup: isGroup,
          isMerge: hasMerge,
          useStyle: true,
          current: 'current',
          modes: (proxyOpts.ajax && proxyOpts.ajax.queryAll ? ['all'] : []).concat(['current', 'selected', 'empty']),
          download: true,
          type: 'csv'
          // filename: '',
          // sheetName: '',
          // original: false,
          // isAllExpand: false,
          // data: null,
          // remote: false,
          // dataFilterMethod: null,
          // footerFilterMethod: null,
          // exportMethod: null,
          // columnFilterMethod: null,
          // beforeExportMethod: null,
          // afterExportMethod: null
        }, exportOpts, options)
        let { filename, sheetName, type, mode, columns, original, columnFilterMethod, beforeExportMethod, includeFields, excludeFields } = opts
        let groups: any[] = []
        const selectRecords = $xeTable.getCheckboxRecords()
        if (!mode) {
          mode = selectRecords.length ? 'selected' : 'current'
        }
        let isCustomCol = false
        let customCols = []
        if (columns && columns.length) {
          isCustomCol = true
          customCols = columns
        } else {
          customCols = XEUtils.searchTree(collectColumn, column => {
            const isColGroup = column.children && column.children.length > 0
            let isChecked = false
            if (columns && columns.length) {
              isChecked = handleFilterColumns(opts, column, columns)
            } else if (excludeFields || includeFields) {
              isChecked = handleFilterFields(opts, column, includeFields, excludeFields)
            } else {
              isChecked = column.visible && (isColGroup || defaultFilterExportColumn(column))
            }
            return isChecked
          }, { children: 'children', mapChildren: 'childNodes', original: true })
        }
        const handleOptions: VxeTablePropTypes.ExportHandleOptions = Object.assign({ } as { data: any[], colgroups: any[], columns: any[] }, opts, { filename: '', sheetName: '' })
        // 如果设置源数据，则默认导出设置了字段的列
        if (!isCustomCol && !columnFilterMethod) {
          columnFilterMethod = ({ column }) => {
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
            return original ? !!column.field : defaultFilterExportColumn(column)
          }
          handleOptions.columnFilterMethod = columnFilterMethod
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
                    targetColumn = tableFullColumn.find((column) => column.field === field && column.type === type)
                  } else if (field) {
                    targetColumn = $xeTable.getColumnByField(field)
                  } else if (type) {
                    targetColumn = tableFullColumn.find((column) => column.type === type)
                  }
                }
                return targetColumn || {}
              }
            }, {
              children: 'childNodes',
              mapChildren: '_children'
            }),
            (column, index) => isColumnInfo(column) && (!columnFilterMethod || columnFilterMethod({ $table: $xeTable, column: column as any, $columnIndex: index })),
            {
              children: '_children',
              mapChildren: 'childNodes',
              original: true
            }
          )
        } else {
          groups = XEUtils.searchTree(isGroup ? collectColumn : tableFullColumn, (column, index) => column.visible && (!columnFilterMethod || columnFilterMethod({ $table: $xeTable, column, $columnIndex: index })), { children: 'children', mapChildren: 'childNodes', original: true })
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
          if (['xlsx', 'pdf'].includes(type)) {
            warnLog('vxe.error.reqPlugin', [4, 'plugin-export-xlsx'])
          }
          const params = { status: false }
          return Promise.reject(params)
        }

        if (!handleOptions.print) {
          if (beforeExportMethod) {
            beforeExportMethod({ options: handleOptions, $table: $xeTable, $grid: $xeGrid })
          }
        }
        if (!handleOptions.data) {
          handleOptions.data = []
          if (mode === 'selected') {
            if (['html', 'pdf'].indexOf(type) > -1 && treeConfig) {
              handleOptions.data = XEUtils.searchTree($xeTable.getTableData().fullData, item => $xeTable.findRowIndexOf(selectRecords, item) > -1, Object.assign({}, treeOpts, { data: '_row' }))
            } else {
              handleOptions.data = selectRecords
            }
          } else if (mode === 'all') {
            if (!$xeGrid) {
              errLog('vxe.error.errProp', ['all', 'mode=current,selected'])
            }

            if ($xeGrid && !handleOptions.remote) {
              const gridReactData = $xeGrid.reactData
              const { computeProxyOpts } = $xeGrid.getComputeMaps()
              const proxyOpts = computeProxyOpts.value
              const { sortData } = gridReactData
              const { beforeQueryAll, afterQueryAll, ajax = {} } = proxyOpts
              const resConfigs = proxyOpts.response || proxyOpts.props || {}
              const ajaxMethods = ajax.queryAll
              const queryAllSuccessMethods = ajax.queryAllSuccess
              const queryAllErrorMethods = ajax.queryAllError

              if (!ajaxMethods) {
                errLog('vxe.error.notFunc', ['proxy-config.ajax.queryAll'])
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
                    return handleExport(handleOptions)
                  })
                  .catch((rest) => {
                    if (queryAllErrorMethods) {
                      queryAllErrorMethods({ ...params, response: rest })
                    }
                  })
              }
            }
          } if (mode === 'current') {
            handleOptions.data = treeConfig ? afterTreeFullData : afterFullData
          }
        } else {
          handleOptions._isCustomData = true
        }
        return handleExport(handleOptions)
      },
      importByFile (file, options) {
        const opts = Object.assign({}, options)
        const { beforeImportMethod } = opts
        if (beforeImportMethod) {
          beforeImportMethod({ options: opts, $table: $xeTable })
        }
        return handleFileImport(file, opts)
      },
      importData (options) {
        const importOpts = computeImportOpts.value
        const opts = Object.assign({
          types: XEUtils.keys(importOpts._typeMaps)
          // beforeImportMethod: null,
          // afterImportMethod: null
        }, importOpts, options)
        const { beforeImportMethod, afterImportMethod } = opts
        if (beforeImportMethod) {
          beforeImportMethod({ options: opts, $table: $xeTable })
        }
        return VxeUI.readFile(opts).catch(e => {
          if (afterImportMethod) {
            afterImportMethod({ status: false, options: opts, $table: $xeTable })
          }
          return Promise.reject(e)
        }).then((params) => {
          const { file } = params
          return handleFileImport(file, opts)
        })
      },
      saveFile (options) {
        return VxeUI.saveFile(options)
      },
      readFile (options) {
        return VxeUI.readFile(options)
      },
      print (options) {
        const printOpts = computePrintOpts.value
        const opts = Object.assign({
          original: false
          // beforePrintMethod
        }, printOpts, options, {
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
                exportMethods.exportData(opts).then(({ content }: any) => {
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
      getPrintHtml (options) {
        const printOpts = computePrintOpts.value
        const opts = Object.assign({
          original: false
          // beforePrintMethod
        }, printOpts, options, {
          type: 'html',
          download: false,
          remote: false,
          print: true
        })
        return $xeTable.exportData(opts).then(({ content }) => {
          return {
            html: content
          }
        })
      },
      closeImport () {
        if (VxeUI.modal) {
          return VxeUI.modal.close('VXE_IMPORT_MODAL')
        }
        return Promise.resolve()
      },
      openImport (options) {
        const { treeConfig, importConfig } = props
        const { initStore, importStore, importParams } = reactData
        const importOpts = computeImportOpts.value
        const defOpts = Object.assign({
          mode: 'insertTop',
          message: true,
          types: XEUtils.keys(importOpts._typeMaps),
          modes: ['insertTop', 'covering']
        }, importOpts, options)
        const types = defOpts.types || []
        const modes = defOpts.modes || []
        const isTree = !!treeConfig
        if (isTree) {
          if (defOpts.message) {
            if (VxeUI.modal) {
              VxeUI.modal.message({ content: getI18n('vxe.error.treeNotImp'), status: 'error' })
            }
          }
          return
        }
        if (!importConfig) {
          errLog('vxe.error.reqProp', ['import-config'])
        }
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
            label: getI18n(`vxe.import.modes.${item}`)
          }
        })
        Object.assign(importStore, {
          file: null,
          type: '',
          filename: '',
          modeList,
          typeList,
          visible: true
        })
        Object.assign(importParams, defOpts)
        if (!modeList.some(item => item.value === importParams.mode)) {
          importParams.mode = modeList[0].value
        }
        initStore.import = true
      },
      closeExport: handleCloseExport,
      openExport (options) {
        const exportOpts = computeExportOpts.value
        const defOpts = Object.assign({
          message: true,
          types: XEUtils.keys(exportOpts._typeMaps)
        }, exportOpts, options)
        if (!props.exportConfig) {
          errLog('vxe.error.reqProp', ['export-config'])
        }
        return handleExportAndPrint(defOpts)
      },
      closePrint: handleCloseExport,
      openPrint (options) {
        const printOpts = computePrintOpts.value
        const defOpts = Object.assign({
          message: true
        }, printOpts, options)
        if (!props.printConfig) {
          errLog('vxe.error.reqProp', ['print-config'])
        }
        return handleExportAndPrint(defOpts, true)
      }
    }

    return exportMethods
  },
  setupGrid ($xeGrid) {
    return $xeGrid.extendTableMethods(tableExportMethodKeys)
  }
})

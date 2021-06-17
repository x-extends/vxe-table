import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VXETable from '../../v-x-e-table'
import { UtilTools } from '../../tools'
import { mergeBodyMethod } from '../../table/src/util'
import { browse } from '../../tools/src/dom'

const { formatText } = UtilTools

// 默认导出或打印的 HTML 样式
const defaultHtmlStyle = 'body{margin:0;color:#333333;font-size:14px;font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu}body *{-webkit-box-sizing:border-box;box-sizing:border-box}.vxe-table{border-collapse:collapse;text-align:left;border-spacing:0}.vxe-table:not(.is--print){table-layout:fixed}.vxe-table,.vxe-table th,.vxe-table td,.vxe-table td{border-color:#D0D0D0;border-style:solid;border-width:0}.vxe-table.is--print{width:100%}.border--default,.border--full,.border--outer{border-top-width:1px}.border--default,.border--full,.border--outer{border-left-width:1px}.border--outer,.border--default th,.border--default td,.border--full th,.border--full td,.border--outer th,.border--inner th,.border--inner td{border-bottom-width:1px}.border--default,.border--outer,.border--full th,.border--full td{border-right-width:1px}.border--default th,.border--full th,.border--outer th{background-color:#f8f8f9}.vxe-table td>div,.vxe-table th>div{padding:.5em .4em}.col--center{text-align:center}.col--right{text-align:right}.vxe-table:not(.is--print) .col--ellipsis>div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:break-all}.vxe-table--tree-node{text-align:left}.vxe-table--tree-node-wrapper{position:relative}.vxe-table--tree-icon-wrapper{position:absolute;top:50%;width:1em;height:1em;text-align:center;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vxe-table--tree-unfold-icon,.vxe-table--tree-fold-icon{position:absolute;width:0;height:0;border-style:solid;border-width:.5em;border-right-color:transparent;border-bottom-color:transparent}.vxe-table--tree-unfold-icon{left:.3em;top:0;border-left-color:#939599;border-top-color:transparent}.vxe-table--tree-fold-icon{left:0;top:.3em;border-left-color:transparent;border-top-color:#939599}.vxe-table--tree-cell{display:block;padding-left:1.5em}.vxe-table input[type="checkbox"]{margin:0}.vxe-table input[type="checkbox"],.vxe-table input[type="radio"],.vxe-table input[type="checkbox"]+span,.vxe-table input[type="radio"]+span{vertical-align:middle;padding-left:0.4em}'

let htmlCellElem

// 导入
let fileForm
let fileInput

// 打印
let printFrame

const csvBOM = '\ufeff'
const enterSymbol = '\r\n'

function createFrame () {
  const frame = document.createElement('iframe')
  frame.className = 'vxe-table--print-frame'
  return frame
}

function getExportBlobByContent (content, options) {
  if (window.Blob) {
    return new Blob([content], { type: `text/${options.type};charset=utf-8;` })
  }
  return null
}

function hasTreeChildren ($xetable, row) {
  const treeOpts = $xetable.treeOpts
  return row[treeOpts.children] && row[treeOpts.children].length > 0
}

function getSeq ($xetable, row, rowIndex, column, columnIndex) {
  const seqOpts = $xetable.seqOpts
  const seqMethod = seqOpts.seqMethod || column.seqMethod
  return seqMethod ? seqMethod({ row, rowIndex, column, columnIndex }) : (seqOpts.startIndex + rowIndex + 1)
}

function defaultFilterExportColumn (column) {
  return column.property || ['seq', 'checkbox', 'radio'].indexOf(column.type) > -1
}

function toTableBorder (border) {
  if (border === true) {
    return 'full'
  }
  if (border) {
    return border
  }
  return 'default'
}

function toBooleanValue (cellValue) {
  return XEUtils.isBoolean(cellValue) ? (cellValue ? 'TRUE' : 'FALSE') : cellValue
}

function getLabelData ($xetable, opts, columns, datas) {
  const { isAllExpand } = opts
  const { treeConfig, treeOpts, radioOpts, checkboxOpts } = $xetable
  if (!htmlCellElem) {
    htmlCellElem = document.createElement('div')
  }
  if (treeConfig) {
    // 如果是树表格只允许导出数据源
    const rest = []
    XEUtils.eachTree(datas, (item, rowIndex, items, path, parent, nodes) => {
      const row = item._row || item
      const parentRow = parent && parent._row ? parent._row : parent
      if ((isAllExpand || !parentRow || $xetable.isTreeExpandByRow(parentRow))) {
        const hasRowChild = hasTreeChildren($xetable, row)
        const item = {
          _row: row,
          _level: nodes.length - 1,
          _hasChild: hasRowChild,
          _expand: hasRowChild && $xetable.isTreeExpandByRow(row)
        }
        columns.forEach((column, columnIndex) => {
          let cellValue = ''
          const renderOpts = column.editRender || column.cellRender
          let exportLabelMethod = column.exportMethod
          if (!exportLabelMethod && renderOpts && renderOpts.name) {
            const compConf = VXETable.renderer.get(renderOpts.name)
            if (compConf) {
              exportLabelMethod = compConf.exportMethod || compConf.cellExportMethod
            }
          }
          if (exportLabelMethod) {
            cellValue = exportLabelMethod({ $table: $xetable, row, column, options: opts })
          } else {
            switch (column.type) {
              case 'seq':
                cellValue = getSeq($xetable, row, rowIndex, column, columnIndex)
                break
              case 'checkbox':
                cellValue = toBooleanValue($xetable.isCheckedByCheckboxRow(row))
                item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : ''
                item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ row })
                break
              case 'radio':
                cellValue = toBooleanValue($xetable.isCheckedByRadioRow(row))
                item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : ''
                item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ row })
                break
              default:
                if (opts.original) {
                  cellValue = UtilTools.getCellValue(row, column)
                } else {
                  cellValue = $xetable.getCellLabel(row, column)
                  if (column.type === 'html') {
                    htmlCellElem.innerHTML = cellValue
                    cellValue = htmlCellElem.innerText.trim()
                  } else {
                    const cell = $xetable.getCell(row, column)
                    if (cell) {
                      cellValue = cell.innerText.trim()
                    }
                  }
                }
            }
          }
          item[column.id] = XEUtils.toValueString(cellValue)
        })
        rest.push(Object.assign(item, row))
      }
    }, treeOpts)
    return rest
  }
  return datas.map((row, rowIndex) => {
    const item = {
      _row: row
    }
    columns.forEach((column, columnIndex) => {
      let cellValue = ''
      const renderOpts = column.editRender || column.cellRender
      let exportLabelMethod = column.exportMethod
      if (!exportLabelMethod && renderOpts && renderOpts.name) {
        const compConf = VXETable.renderer.get(renderOpts.name)
        if (compConf) {
          exportLabelMethod = compConf.exportMethod || compConf.cellExportMethod
        }
      }
      if (exportLabelMethod) {
        cellValue = exportLabelMethod({ $table: $xetable, row, column, options: opts })
      } else {
        switch (column.type) {
          case 'seq':
            cellValue = getSeq($xetable, row, rowIndex, column, columnIndex)
            break
          case 'checkbox':
            cellValue = toBooleanValue($xetable.isCheckedByCheckboxRow(row))
            item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : ''
            item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ row })
            break
          case 'radio':
            cellValue = toBooleanValue($xetable.isCheckedByRadioRow(row))
            item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : ''
            item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ row })
            break
          default:
            if (opts.original) {
              cellValue = UtilTools.getCellValue(row, column)
            } else {
              cellValue = $xetable.getCellLabel(row, column)
              if (column.type === 'html') {
                htmlCellElem.innerHTML = cellValue
                cellValue = htmlCellElem.innerText.trim()
              } else {
                const cell = $xetable.getCell(row, column)
                if (cell) {
                  cellValue = cell.innerText.trim()
                }
              }
            }
        }
      }
      item[column.id] = XEUtils.toValueString(cellValue)
    })
    return item
  })
}

function getExportData ($xetable, opts) {
  const { columns, dataFilterMethod } = opts
  let datas = opts.data
  if (dataFilterMethod) {
    datas = datas.filter((row, index) => dataFilterMethod({ row, $rowIndex: index }))
  }
  return getLabelData($xetable, opts, columns, datas)
}

function getBooleanValue (cellValue) {
  return cellValue === 'TRUE' || cellValue === 'true' || cellValue === true
}

function getHeaderTitle (opts, column) {
  return (opts.original ? column.property : column.getTitle()) || ''
}

function getFooterCellValue ($xetable, opts, items, column) {
  const renderOpts = column.editRender || column.cellRender
  let exportLabelMethod = column.footerExportMethod
  if (!exportLabelMethod && renderOpts && renderOpts.name) {
    const compConf = VXETable.renderer.get(renderOpts.name)
    if (compConf) {
      exportLabelMethod = compConf.footerExportMethod || compConf.footerCellExportMethod
    }
  }
  const _columnIndex = $xetable.getVTColumnIndex(column)
  const cellValue = exportLabelMethod ? exportLabelMethod({ $table: $xetable, items, itemIndex: _columnIndex, _columnIndex, column, options: opts }) : XEUtils.toValueString(items[_columnIndex])
  return cellValue
}

function getFooterData (opts, footerTableData) {
  const { footerFilterMethod } = opts
  return footerFilterMethod ? footerTableData.filter((items, index) => footerFilterMethod({ items, $rowIndex: index })) : footerTableData
}

function getCsvCellTypeLabel (column, cellValue) {
  if (cellValue) {
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

function toTxtCellLabel (val) {
  if (/[",\s\n]/.test(val)) {
    return `"${val.replace(/"/g, '""')}"`
  }
  return val
}

function toCsv ($xetable, opts, columns, datas) {
  let content = csvBOM
  if (opts.isHeader) {
    content += columns.map(column => toTxtCellLabel(getHeaderTitle(opts, column))).join(',') + enterSymbol
  }
  datas.forEach(row => {
    content += columns.map(column => toTxtCellLabel(getCsvCellTypeLabel(column, row[column.id]))).join(',') + enterSymbol
  })
  if (opts.isFooter) {
    const footerTableData = $xetable.footerTableData
    const footers = getFooterData(opts, footerTableData)
    footers.forEach(rows => {
      content += columns.map(column => toTxtCellLabel(getFooterCellValue($xetable, opts, rows, column))).join(',') + enterSymbol
    })
  }
  return content
}

function toTxt ($xetable, opts, columns, datas) {
  let content = ''
  if (opts.isHeader) {
    content += columns.map(column => toTxtCellLabel(getHeaderTitle(opts, column))).join('\t') + enterSymbol
  }
  datas.forEach(row => {
    content += columns.map(column => toTxtCellLabel(row[column.id])).join('\t') + enterSymbol
  })
  if (opts.isFooter) {
    const footerTableData = $xetable.footerTableData
    const footers = getFooterData(opts, footerTableData)
    footers.forEach(rows => {
      content += columns.map(column => toTxtCellLabel(getFooterCellValue($xetable, opts, rows, column))).join(',') + enterSymbol
    })
  }
  return content
}

function hasEllipsis ($xetable, column, property, allColumnOverflow) {
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

function createHtmlPage (opts, content) {
  const { style } = opts
  return [
    '<!DOCTYPE html><html>',
    '<head>',
    '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">',
    `<title>${opts.sheetName}</title>`,
    `<style>${defaultHtmlStyle}</style>`,
    style ? `<style>${style}</style>` : '',
    '</head>',
    `<body>${content}</body>`,
    '</html>'
  ].join('')
}

function toHtml ($xetable, opts, columns, datas) {
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
      colgroups.forEach(cols => {
        tables.push(
          `<tr>${cols.map(column => {
            const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign
            const classNames = hasEllipsis($xetable, column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : []
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
        `<tr>${columns.map(column => {
          const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign
          const classNames = hasEllipsis($xetable, column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : []
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
      footers.forEach(rows => {
        tables.push(
          `<tr>${columns.map(column => {
            const footAlign = column.footerAlign || column.align || allFooterAlign || allAlign
            const classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
            const cellValue = getFooterCellValue($xetable, opts, rows, column)
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

function toXML ($xetable, opts, columns, datas) {
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
    xml += `<Row>${columns.map(column => `<Cell><Data ss:Type="String">${getHeaderTitle(opts, column)}</Data></Cell>`).join('')}</Row>`
  }
  datas.forEach(row => {
    xml += '<Row>' + columns.map(column => `<Cell><Data ss:Type="String">${row[column.id]}</Data></Cell>`).join('') + '</Row>'
  })
  if (opts.isFooter) {
    const footerTableData = $xetable.footerTableData
    const footers = getFooterData(opts, footerTableData)
    footers.forEach(rows => {
      xml += `<Row>${columns.map(column => `<Cell><Data ss:Type="String">${getFooterCellValue($xetable, opts, rows, column)}</Data></Cell>`).join('')}</Row>`
    })
  }
  return `${xml}</Table></Worksheet></Workbook>`
}

function getContent ($xetable, opts, columns, datas) {
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
export function saveLocalFile (options) {
  const { filename, type, content } = options
  const name = `${filename}.${type}`
  if (window.Blob) {
    const blob = content instanceof Blob ? content : getExportBlobByContent(XEUtils.toValueString(content), options)
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, name)
    } else {
      const linkElem = document.createElement('a')
      linkElem.target = '_blank'
      linkElem.download = name
      linkElem.href = URL.createObjectURL(blob)
      document.body.appendChild(linkElem)
      linkElem.click()
      document.body.removeChild(linkElem)
    }
    return Promise.resolve()
  }
  return Promise.reject(new Error(UtilTools.getLog('vxe.error.notExp')))
}

function downloadFile ($xetable, opts, content) {
  const { filename, type, download } = opts
  if (!download) {
    const blob = getExportBlobByContent(content, opts)
    return Promise.resolve({ type, content, blob })
  }
  saveLocalFile({ filename, type, content }).then(() => {
    if (opts.message !== false) {
      VXETable.modal.message({ content: GlobalConfig.i18n('vxe.table.expSuccess'), status: 'success' })
    }
  })
}

function clearColumnConvert (columns) {
  XEUtils.eachTree(columns, column => {
    delete column._level
    delete column._colSpan
    delete column._rowSpan
    delete column._children
    delete column.childNodes
  }, { children: 'children' })
}

function handleExport ($xetable, opts) {
  const { remote, columns, colgroups, exportMethod, afterExportMethod } = opts
  return new Promise(resolve => {
    if (remote) {
      const params = { options: opts, $table: $xetable, $grid: $xetable.$xegrid }
      resolve(exportMethod ? exportMethod(params) : params)
    } else {
      const datas = getExportData($xetable, opts)
      resolve(
        $xetable.preventEvent(null, 'event.export', { options: opts, columns, colgroups, datas }, () => {
          return downloadFile($xetable, opts, getContent($xetable, opts, columns, datas))
        })
      )
    }
  }).then((params) => {
    clearColumnConvert(columns)
    if (!opts.print) {
      if (afterExportMethod) {
        afterExportMethod({ status: true, options: opts, $table: $xetable, $grid: $xetable.$xegrid })
      }
    }
    return Object.assign({ status: true }, params)
  }).catch(() => {
    clearColumnConvert(columns)
    if (!opts.print) {
      if (afterExportMethod) {
        afterExportMethod({ status: false, options: opts, $table: $xetable, $grid: $xetable.$xegrid })
      }
    }
    const params = { status: false }
    return Promise.reject(params)
  })
}

function getElementsByTagName (elem, qualifiedName) {
  return elem.getElementsByTagName(qualifiedName)
}

function getTxtCellKey (now) {
  return `#${now}@${XEUtils.uniqueId()}`
}

function replaceTxtCell (cell, vMaps) {
  return cell.replace(/#\d+@\d+/g, (key) => XEUtils.hasOwnProp(vMaps, key) ? vMaps[key] : key)
}

function getTxtCellValue (val, vMaps) {
  const rest = replaceTxtCell(val, vMaps)
  return rest.replace(/^"+$/g, (qVal) => '"'.repeat(Math.ceil(qVal.length / 2)))
}

function parseCsvAndTxt (columns, content, cellSeparator) {
  const list = content.split(enterSymbol)
  const rows = []
  let fields = []
  if (list.length) {
    const vMaps = {}
    const now = Date.now()
    list.forEach((rVal) => {
      if (rVal) {
        const item = {}
        rVal = rVal.replace(/("")|(\n)/g, (text, dVal) => {
          const key = getTxtCellKey(now)
          vMaps[key] = dVal ? '"' : '\n'
          return key
        }).replace(/"(.*?)"/g, (text, cVal) => {
          const key = getTxtCellKey(now)
          vMaps[key] = replaceTxtCell(cVal, vMaps)
          return key
        })
        const cells = rVal.split(cellSeparator)
        if (!fields.length) {
          fields = cells.map((val) => getTxtCellValue(val.trim(), vMaps))
        } else {
          cells.forEach((val, colIndex) => {
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

function parseCsv (columns, content) {
  return parseCsvAndTxt(columns, content, ',')
}

function parseTxt (columns, content) {
  return parseCsvAndTxt(columns, content, '\t')
}

function parseHTML (columns, content) {
  const domParser = new DOMParser()
  const xmlDoc = domParser.parseFromString(content, 'text/html')
  const bodyNodes = getElementsByTagName(xmlDoc, 'body')
  const rows = []
  const fields = []
  if (bodyNodes.length) {
    const tableNodes = getElementsByTagName(bodyNodes[0], 'table')
    if (tableNodes.length) {
      const theadNodes = getElementsByTagName(tableNodes[0], 'thead')
      if (theadNodes.length) {
        XEUtils.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), rowNode => {
          XEUtils.arrayEach(getElementsByTagName(rowNode, 'th'), cellNode => {
            fields.push(cellNode.textContent)
          })
        })
        const tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody')
        if (tbodyNodes.length) {
          XEUtils.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), rowNode => {
            const item = {}
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

function parseXML (columns, content) {
  const domParser = new DOMParser()
  const xmlDoc = domParser.parseFromString(content, 'application/xml')
  const sheetNodes = getElementsByTagName(xmlDoc, 'Worksheet')
  const rows = []
  const fields = []
  if (sheetNodes.length) {
    const tableNodes = getElementsByTagName(sheetNodes[0], 'Table')
    if (tableNodes.length) {
      const rowNodes = getElementsByTagName(tableNodes[0], 'Row')
      if (rowNodes.length) {
        XEUtils.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), cellNode => {
          fields.push(cellNode.textContent)
        })
        XEUtils.arrayEach(rowNodes, (rowNode, index) => {
          if (index) {
            const item = {}
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

/**
 * 检查导入的列是否完整
 * @param {Array} fields 字段名列表
 * @param {Array} rows 数据列表
 */
function checkImportData (columns, fields) {
  const tableFields = []
  columns.forEach((column) => {
    const field = column.property
    if (field) {
      tableFields.push(field)
    }
  })
  return fields.some(field => tableFields.indexOf(field) > -1)
}

function handleImport ($xetable, content, opts) {
  const { tableFullColumn, _importResolve, _importReject } = $xetable
  let rest = { fields: [], rows: [] }
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
      .then((data) => {
        let loadRest
        if (opts.mode === 'insert') {
          loadRest = $xetable.insert(data)
        } else {
          loadRest = $xetable.reloadData(data)
        }
        if (opts.message !== false) {
          VXETable.modal.message({ content: GlobalConfig.i18n('vxe.table.impSuccess', [rows.length]), status: 'success' })
        }
        return loadRest.then(() => {
          if (_importResolve) {
            _importResolve({ status: true })
          }
        })
      })
  } else if (opts.message !== false) {
    VXETable.modal.message({ content: GlobalConfig.i18n('vxe.error.impFields'), status: 'error' })
    if (_importReject) {
      _importReject({ status: false })
    }
  }
}

function handleFileImport ($xetable, file, opts) {
  const { importMethod, afterImportMethod } = opts
  const { type, filename } = UtilTools.parseFile(file)

  // 检查类型，如果为自定义导出，则不需要校验类型
  if (!importMethod && !XEUtils.includes(VXETable.config.importTypes, type)) {
    if (opts.message !== false) {
      VXETable.modal.message({ content: GlobalConfig.i18n('vxe.error.notType', [type]), status: 'error' })
    }
    const params = { status: false }
    return Promise.reject(params)
  }

  const rest = new Promise((resolve, reject) => {
    const _importResolve = (params) => {
      resolve(params)
      $xetable._importResolve = null
      $xetable._importReject = null
    }
    const _importReject = (params) => {
      reject(params)
      $xetable._importResolve = null
      $xetable._importReject = null
    }
    $xetable._importResolve = _importResolve
    $xetable._importReject = _importReject
    if (window.FileReader) {
      const options = Object.assign({ mode: 'insert' }, opts, { type, filename })
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
            UtilTools.error('vxe.error.notType', [type])
            _importReject({ status: false })
          }
          reader.onload = (e) => {
            handleImport($xetable, e.target.result, options)
          }
          reader.readAsText(file, 'UTF-8')
        })
      }
    } else {
      // 不支持的浏览器
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        UtilTools.error('vxe.error.notExp')
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

/**
 * 读取本地文件
 * @param {*} options 参数
 */
export function readLocalFile (options = {}) {
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
    const isAllType = !types.length || types.some((type) => type === '*')
    fileInput.multiple = !!options.multiple
    fileInput.accept = isAllType ? '' : `.${types.join(', .')}`
    fileInput.onchange = (evnt) => {
      const { files } = evnt.target
      const file = files[0]
      let errType
      // 校验类型
      if (!isAllType) {
        for (let fIndex = 0; fIndex < files.length; fIndex++) {
          const { type } = UtilTools.parseFile(files[fIndex])
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
          VXETable.modal.message({ content: GlobalConfig.i18n('vxe.error.notType', [errType]), status: 'error' })
        }
        const params = { status: false, files, file }
        reject(params)
      }
    }
    fileForm.reset()
    fileInput.click()
  })
}

function removePrintFrame () {
  if (printFrame) {
    if (printFrame.parentNode) {
      try {
        printFrame.contentDocument.write('')
      } catch (e) { }
      printFrame.parentNode.removeChild(printFrame)
    }
    printFrame = null
  }
}

function appendPrintFrame () {
  if (!printFrame.parentNode) {
    document.body.appendChild(printFrame)
  }
}

function afterPrintEvent () {
  requestAnimationFrame(removePrintFrame)
}

export function handlePrint ($xetable, opts, content) {
  const { beforePrintMethod } = opts
  if (beforePrintMethod) {
    content = beforePrintMethod({ content, options: opts, $table: $xetable }) || ''
  }
  content = createHtmlPage(opts, content)
  const blob = getExportBlobByContent(content, opts)
  if (browse.msie) {
    removePrintFrame()
    printFrame = createFrame()
    appendPrintFrame()
    printFrame.contentDocument.write(content)
    printFrame.contentDocument.execCommand('print')
  } else {
    if (!printFrame) {
      printFrame = createFrame()
      printFrame.onload = (evnt) => {
        if (evnt.target.src) {
          evnt.target.contentWindow.onafterprint = afterPrintEvent
          evnt.target.contentWindow.print()
        }
      }
    }
    appendPrintFrame()
    printFrame.src = URL.createObjectURL(blob)
  }
}

function handleExportAndPrint ($xetable, options, isPrint) {
  const { initStore, customOpts, collectColumn, footerTableData, treeConfig, mergeList, isGroup, exportParams } = $xetable
  const selectRecords = $xetable.getCheckboxRecords()
  const hasFooter = !!footerTableData.length
  const hasTree = treeConfig
  const hasMerge = !hasTree && mergeList.length
  const defOpts = Object.assign({ message: true, isHeader: true }, options)
  const types = defOpts.types || VXETable.config.exportTypes
  const modes = defOpts.modes
  const checkMethod = customOpts.checkMethod
  const exportColumns = collectColumn.slice(0)
  const { columns } = defOpts
  // 处理类型
  const typeList = types.map(value => {
    return {
      value,
      label: `vxe.export.types.${value}`
    }
  })
  const modeList = modes.map(value => {
    return {
      value,
      label: `vxe.export.modes.${value}`
    }
  })
  // 默认选中
  XEUtils.eachTree(exportColumns, (column, index, items, path, parent) => {
    const isColGroup = column.children && column.children.length
    if (isColGroup || defaultFilterExportColumn(column)) {
      column.checked = columns ? columns.some((item) => {
        if (UtilTools.isColumn(item)) {
          return column === item
        } else if (XEUtils.isString(item)) {
          return column.field === item
        } else {
          const colid = item.id || item.colId
          const type = item.type
          const field = item.property || item.field
          if (colid) {
            return column.id === colid
          } else if (field && type) {
            return column.property === field && column.type === type
          } else if (field) {
            return column.property === field
          } else if (type) {
            return column.type === type
          }
        }
      }) : column.visible
      column.halfChecked = false
      column.disabled = (parent && parent.disabled) || (checkMethod ? !checkMethod({ column }) : false)
    }
  })
  // 更新条件
  Object.assign($xetable.exportStore, {
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
  if (!initStore.export) {
    Object.assign(exportParams, {
      mode: selectRecords.length ? 'selected' : 'current'
    }, defOpts)
  }
  if (modes.indexOf(exportParams.mode) === -1) {
    exportParams.mode = modes[0]
  }
  if (types.indexOf(exportParams.type) === -1) {
    exportParams.type = types[0]
  }
  initStore.export = true
  return $xetable.$nextTick()
}

const getConvertColumns = (columns) => {
  const result = []
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

const convertToRows = (originColumns) => {
  let maxLevel = 1
  const traverse = (column, parent) => {
    if (parent) {
      column._level = parent._level + 1
      if (maxLevel < column._level) {
        maxLevel = column._level
      }
    }
    if (column.childNodes && column.childNodes.length) {
      let colSpan = 0
      column.childNodes.forEach((subColumn) => {
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

  const rows = []
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
     * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     * @param {Object} options 参数
     */
    _exportData (options) {
      const { $xegrid, isGroup, tableGroupColumn, tableFullColumn, afterFullData, treeConfig, treeOpts, exportOpts } = this
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
      const { type, mode, columns, original, beforeExportMethod } = opts
      let groups = []
      const customCols = columns && columns.length ? columns : null
      // 如果设置源数据，则默认导出设置了字段的列
      let columnFilterMethod = opts.columnFilterMethod
      if (!customCols && !columnFilterMethod) {
        columnFilterMethod = original ? ({ column }) => column.property : ({ column }) => defaultFilterExportColumn(column)
      }
      if (customCols) {
        groups = XEUtils.searchTree(
          XEUtils.mapTree(customCols, item => {
            let targetColumn
            if (item) {
              if (UtilTools.isColumn(item)) {
                targetColumn = item
              } else if (XEUtils.isString(item)) {
                targetColumn = this.getColumnByField(item)
              } else {
                const colid = item.id || item.colId
                const type = item.type
                const field = item.property || item.field
                if (colid) {
                  targetColumn = this.getColumnById(colid)
                } else if (field && type) {
                  targetColumn = tableFullColumn.find((column) => column.property === field && column.type === type)
                } else if (field) {
                  targetColumn = this.getColumnByField(field)
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
          (column, index) => UtilTools.isColumn(column) && (!columnFilterMethod || columnFilterMethod({ column, $columnIndex: index })),
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
      const cols = []
      XEUtils.eachTree(groups, column => {
        const isColGroup = column.children && column.children.length
        if (!isColGroup) {
          cols.push(column)
        }
      }, { children: 'childNodes' })
      // 构建分组层级
      opts.columns = cols
      opts.colgroups = convertToRows(groups)
      if (!opts.filename) {
        opts.filename = GlobalConfig.i18n(opts.original ? 'vxe.table.expOriginFilename' : 'vxe.table.expFilename', [XEUtils.toDateString(Date.now(), 'yyyyMMddHHmmss')])
      }
      if (!opts.sheetName) {
        opts.sheetName = document.title
      }

      // 检查类型，如果为自定义导出，则不需要校验类型
      if (!opts.exportMethod && !XEUtils.includes(VXETable.config.exportTypes, type)) {
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          UtilTools.error('vxe.error.notType', [type])
        }
        const params = { status: false }
        return Promise.reject(params)
      }

      if (!opts.print) {
        if (beforeExportMethod) {
          beforeExportMethod({ options: opts, $table: this, $grid: $xegrid })
        }
      }

      if (!opts.data) {
        opts.data = afterFullData
        if (mode === 'selected') {
          const selectRecords = this.getCheckboxRecords()
          if (['html', 'pdf'].indexOf(type) > -1 && treeConfig) {
            opts.data = XEUtils.searchTree(this.getTableData().fullData, (item) => selectRecords.indexOf(item) > -1, Object.assign({}, treeOpts, { data: '_row' }))
          } else {
            opts.data = selectRecords
          }
        } else if (mode === 'all') {
          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
            if (!$xegrid) {
              UtilTools.warn('vxe.error.errProp', ['all', 'mode=current,selected'])
            }
          }

          if ($xegrid && !opts.remote) {
            const { beforeQueryAll, afterQueryAll, ajax = {}, props = {} } = $xegrid.proxyOpts
            const ajaxMethods = ajax.queryAll

            if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
              if (!ajaxMethods) {
                UtilTools.warn('vxe.error.notFunc', ['proxy-config.ajax.queryAll'])
              }
            }

            if (ajaxMethods) {
              const params = {
                $table: this,
                $grid: $xegrid,
                sort: $xegrid.sortData,
                filters: $xegrid.filterData,
                form: $xegrid.formData,
                target: ajaxMethods,
                options: opts
              }
              return Promise.resolve((beforeQueryAll || ajaxMethods)(params))
                .catch(e => e)
                .then(rest => {
                  opts.data = (props.list ? XEUtils.get(rest, props.list) : rest) || []
                  if (afterQueryAll) {
                    afterQueryAll(params)
                  }
                  return handleExport(this, opts)
                })
            }
          }
        }
      }
      return handleExport(this, opts)
    },
    _importByFile (file, options) {
      const opts = Object.assign({}, options)
      const { beforeImportMethod } = opts
      if (beforeImportMethod) {
        beforeImportMethod({ options: opts, $table: this })
      }
      return handleFileImport(this, file, opts)
    },
    _importData (options) {
      const opts = Object.assign({
        types: VXETable.config.importTypes
        // beforeImportMethod: null,
        // afterImportMethod: null
      }, this.importOpts, options)
      const { beforeImportMethod, afterImportMethod } = opts
      if (beforeImportMethod) {
        beforeImportMethod({ options: opts, $table: this })
      }
      return readLocalFile(opts).catch(e => {
        if (afterImportMethod) {
          afterImportMethod({ status: false, options: opts, $table: this })
        }
        return Promise.reject(e)
      }).then((params) => {
        const { file } = params
        return handleFileImport(this, file, opts)
      })
    },
    _saveFile (options) {
      return saveLocalFile(options)
    },
    _readFile (options) {
      return readLocalFile(options)
    },
    _print (options) {
      const opts = Object.assign({
        original: false
        // beforePrintMethod
      }, this.printOpts, options, {
        type: 'html',
        download: false,
        remote: false,
        print: true
      })
      if (!opts.sheetName) {
        opts.sheetName = document.title
      }
      return new Promise(resolve => {
        if (opts.content) {
          resolve(handlePrint(this, opts, opts.content))
        } else {
          resolve(
            this.exportData(opts).then(({ content }) => {
              return handlePrint(this, opts, content)
            })
          )
        }
      })
    },
    _openImport (options) {
      const defOpts = Object.assign({ mode: 'insert', message: true, types: VXETable.config.importTypes }, options, this.importOpts)
      const { types } = defOpts
      const isTree = !!this.getTreeStatus()
      if (isTree) {
        if (defOpts.message) {
          VXETable.modal.message({ content: GlobalConfig.i18n('vxe.error.treeNotImp'), status: 'error' })
        }
        return
      }
      if (!this.importConfig) {
        UtilTools.error('vxe.error.reqProp', ['import-config'])
      }
      // 处理类型
      const typeList = types.map(value => {
        return {
          value,
          label: `vxe.export.types.${value}`
        }
      })
      const modeList = defOpts.modes.map(value => {
        return {
          value,
          label: `vxe.import.modes.${value}`
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
      this.initStore.import = true
    },
    _openExport (options) {
      const { exportOpts } = this
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (!this.exportConfig) {
          UtilTools.error('vxe.error.reqProp', ['export-config'])
        }
      }
      return handleExportAndPrint(this, Object.assign({}, exportOpts, options))
    },
    _openPrint (options) {
      const { printOpts } = this
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (!this.printConfig) {
          UtilTools.error('vxe.error.reqProp', ['print-config'])
        }
      }
      return handleExportAndPrint(this, Object.assign({}, printOpts, options), true)
    }
  }
}

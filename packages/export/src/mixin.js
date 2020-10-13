import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'
import { mergeBodyMethod } from '../../table/src/util'

const { formatText } = UtilTools

// 默认导出或打印的 HTML 样式
const defaultHtmlStyle = 'body{margin:0}body *{-webkit-box-sizing:border-box;box-sizing:border-box}.vxe-table{border:0;border-collapse:separate;text-align:left;font-size:14px;border-spacing:0}.vxe-table:not(.is--print){table-layout:fixed}.vxe-table.is--print{width:100%}.vxe-table.border--default,.vxe-table.border--full,.vxe-table.border--outer{border-top:1px solid #e8eaec}.vxe-table.border--default,.vxe-table.border--full,.vxe-table.border--outer{border-left:1px solid #e8eaec}.vxe-table.border--outer,.vxe-table.border--default th,.vxe-table.border--default td,.vxe-table.border--full th,.vxe-table.border--full td,.vxe-table.border--outer th,.vxe-table.border--inner th,.vxe-table.border--inner td{border-bottom:1px solid #e8eaec}.vxe-table.border--default,.vxe-table.border--outer,.vxe-table.border--full th,.vxe-table.border--full td{border-right:1px solid #e8eaec}.vxe-table.border--default th,.vxe-table.border--full th,.vxe-table.border--outer th{background-color:#f8f8f9}.vxe-table td>div,.vxe-table th>div{padding:.5em .4em}.col--center{text-align:center}.col--right{text-align:right}.vxe-table:not(.is--print) .col--ellipsis>div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:break-all}.vxe-table--tree-node{text-align:left}.vxe-table--tree-node-wrapper{position:relative}.vxe-table--tree-icon-wrapper{position:absolute;top:50%;width:1em;height:1em;text-align:center;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vxe-table--tree-icon{position:absolute;left:0;top:.3em;width:0;height:0;border-style:solid;border-width:.5em;border-top-color:#939599;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vxe-table--tree-cell{display:block;padding-left:1.5em}.vxe-table input[type="checkbox"]{margin:0}.vxe-table input[type="checkbox"],.vxe-table input[type="radio"],.vxe-table input[type="checkbox"]+span,.vxe-table input[type="radio"]+span{vertical-align:middle;padding-left: 0.4em}'

let htmlCellElem

// 导入
let fileForm
let fileInput

// 打印
let printFrame

function createFrame () {
  const frame = document.createElement('iframe')
  frame.className = 'vxe-table--print-frame'
  return frame
}

function getExportBlobByContent (content, options) {
  if (window.Blob) {
    return new Blob([content], { type: `text/${options.type}` })
  }
  return null
}

function hasTreeChildren ($xetable, row) {
  const treeOpts = $xetable.treeOpts
  return row[treeOpts.children] && row[treeOpts.children].length
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

function getLabelData ($xetable, opts, columns, datas) {
  const { treeConfig, treeOpts, radioOpts, checkboxOpts } = $xetable
  if (!htmlCellElem) {
    htmlCellElem = document.createElement('div')
  }
  if (treeConfig) {
    // 如果是树表格只允许导出数据源
    const rest = []
    XEUtils.eachTree(datas, (row, rowIndex, items, path, parent, nodes) => {
      const item = {
        _row: row,
        _level: nodes.length - 1,
        _hasChild: hasTreeChildren($xetable, row)
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
          cellValue = exportLabelMethod({ $table: $xetable, row, column })
        } else {
          switch (column.type) {
            case 'seq':
              cellValue = getSeq($xetable, row, rowIndex, column, columnIndex)
              break
            case 'checkbox':
              cellValue = $xetable.isCheckedByCheckboxRow(row)
              item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : ''
              item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ row })
              break
            case 'radio':
              cellValue = $xetable.isCheckedByRadioRow(row)
              item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : ''
              item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ row })
              break
            default:
              if (opts.original) {
                cellValue = UtilTools.getCellValue(row, column)
              } else {
                cellValue = UtilTools.getCellLabel(row, column, { $table: $xetable })
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
        item[column.id] = XEUtils.toString(cellValue)
      })
      rest.push(Object.assign(item, row))
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
        cellValue = exportLabelMethod({ $table: $xetable, row, column })
      } else {
        switch (column.type) {
          case 'seq':
            cellValue = getSeq($xetable, row, rowIndex, column, columnIndex)
            break
          case 'checkbox':
            cellValue = $xetable.isCheckedByCheckboxRow(row)
            item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : ''
            item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ row })
            break
          case 'radio':
            cellValue = $xetable.isCheckedByRadioRow(row)
            item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : ''
            item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ row })
            break
          default:
            if (opts.original) {
              cellValue = UtilTools.getCellValue(row, column)
            } else {
              cellValue = UtilTools.getCellLabel(row, column, { $table: $xetable })
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
      item[column.id] = XEUtils.toString(cellValue)
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
  const _columnIndex = $xetable._getColumnIndex(column)
  const cellValue = exportLabelMethod ? exportLabelMethod({ $table: $xetable, items, itemIndex: _columnIndex, _columnIndex, column }) : XEUtils.toString(items[_columnIndex])
  return cellValue
}

function getFooterData (opts, footerData) {
  const { footerFilterMethod } = opts
  return footerFilterMethod ? footerData.filter((items, index) => footerFilterMethod({ items, $rowIndex: index })) : footerData
}

function getCsvCellTypeLabel (column, cellValue) {
  if (cellValue) {
    switch (column.cellType) {
      case 'string':
        if (!isNaN(cellValue)) {
          return '\t' + cellValue
        }
        break
      case 'number':
        break
      default:
        if (cellValue.length >= 12 && !isNaN(cellValue)) {
          return '\t' + cellValue
        }
        break
    }
  }
  return cellValue
}

function toTxtCellLabel (val) {
  if (/"/.test(val)) {
    return `"${val.replace(/"/g, '""')}"`
  }
  return val
}

function toCsv ($xetable, opts, columns, datas) {
  let content = '\ufeff'
  if (opts.isHeader) {
    content += columns.map(column => toTxtCellLabel(getHeaderTitle(opts, column))).join(',') + '\n'
  }
  datas.forEach(row => {
    content += columns.map(column => toTxtCellLabel(getCsvCellTypeLabel(column, row[column.id]))).join(',') + '\n'
  })
  if (opts.isFooter) {
    const footerData = $xetable.footerData
    const footers = getFooterData(opts, footerData)
    footers.forEach(rows => {
      content += columns.map(column => toTxtCellLabel(getFooterCellValue($xetable, opts, rows, column))).join(',') + '\n'
    })
  }
  return content
}

function toTxt ($xetable, opts, columns, datas) {
  let content = ''
  if (opts.isHeader) {
    content += columns.map(column => toTxtCellLabel(getHeaderTitle(opts, column))).join('\t') + '\n'
  }
  datas.forEach(row => {
    content += columns.map(column => toTxtCellLabel(row[column.id])).join('\t') + '\n'
  })
  if (opts.isFooter) {
    const footerData = $xetable.footerData
    const footers = getFooterData(opts, footerData)
    footers.forEach(rows => {
      content += columns.map(column => toTxtCellLabel(getFooterCellValue($xetable, opts, rows, column))).join(',') + '\n'
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
    isHeader ? 'show--head' : ''
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
                treeIcon = '<i class="vxe-table--tree-icon"></i>'
              }
              classNames.push('vxe-table--tree-node')
              if (column.type === 'radio') {
                return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell"><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._radioLabel}</span></div></div></div></td>`
              } else if (column.type === 'checkbox') {
                return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell"><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></div></div></td>`
              }
              return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell">${cellValue}</div></div></div></td>`
            }
            if (column.type === 'radio') {
              return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._radioLabel}</span></div></td>`
            } else if (column.type === 'checkbox') {
              return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></td>`
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
              const _rowIndex = $xetable._getRowIndex(item._row)
              const _columnIndex = $xetable._getColumnIndex(column)
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
              return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._radioLabel}</span></div></td>`
            } else if (column.type === 'checkbox') {
              return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></td>`
            }
            return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${formatText(cellValue, true)}</div></td>`
          }).join('') + '</tr>'
        )
      })
    }
    tables.push('</tbody>')
  }
  if (isFooter) {
    const footerData = $xetable.footerData
    const footers = getFooterData(opts, footerData)
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
    const footerData = $xetable.footerData
    const footers = getFooterData(opts, footerData)
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

function downloadFile ($xetable, opts, content) {
  const { filename, type, download } = opts
  const name = `${filename}.${type}`
  if (window.Blob) {
    const blob = getExportBlobByContent(content, opts)
    if (!download) {
      return Promise.resolve({ type, content, blob })
    }
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
    if (opts.message !== false) {
      VXETable.modal.message({ message: GlobalConfig.i18n('vxe.table.expSuccess'), status: 'success' })
    }
  } else {
    UtilTools.error('vxe.error.notExp')
  }
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
  const { remote, columns, colgroups, exportMethod } = opts
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
    return params
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
  const list = content.split('\n')
  const rows = []
  let fields = []
  if (list.length) {
    const vMaps = {}
    const now = Date.now()
    list.forEach(rVal => {
      if (rVal) {
        const item = {}
        rVal = rVal.replace(/""/g, () => {
          const key = getTxtCellKey(now)
          vMaps[key] = '"'
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
  columns.forEach(column => {
    const field = column.property
    if (field) {
      tableFields.push(field)
    }
  })
  return tableFields.every(field => fields.indexOf(field) > -1)
}

function handleImport ($xetable, content, opts) {
  const { tableFullColumn, _importResolve } = $xetable
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
      .then(data => {
        if (opts.mode === 'insert') {
          $xetable.insert(data)
        } else {
          $xetable.reloadData(data)
        }
      })
    if (opts.message !== false) {
      VXETable.modal.message({ message: GlobalConfig.i18n('vxe.table.impSuccess', [rows.length]), status: 'success' })
    }
  } else if (opts.message !== false) {
    VXETable.modal.message({ message: GlobalConfig.i18n('vxe.error.impFields'), status: 'error' })
  }
  if (_importResolve) {
    _importResolve(status)
    $xetable._importResolve = null
  }
}

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
  let fileResolve
  let fileReject
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
      fileResolve({ files, file })
    } else {
      if (options.message !== false) {
        VXETable.modal.message({ message: GlobalConfig.i18n('vxe.error.notType', [errType]), status: 'error' })
      }
      fileReject({ files, file })
    }
  }
  fileForm.reset()
  fileInput.click()
  return new Promise((resolve, reject) => {
    fileResolve = resolve
    fileReject = reject
  })
}

export function handlePrint ($xetable, opts, content) {
  const { beforePrintMethod } = opts
  if (beforePrintMethod) {
    content = beforePrintMethod({ content, options: opts, $table: $xetable }) || ''
  }
  content = createHtmlPage(opts, content)
  const blob = getExportBlobByContent(content, opts)
  if (DomTools.browse.msie) {
    if (printFrame) {
      try {
        printFrame.contentDocument.write('')
        printFrame.contentDocument.clear()
      } catch (e) { }
      document.body.removeChild(printFrame)
    }
    printFrame = createFrame()
    document.body.appendChild(printFrame)
    printFrame.contentDocument.write(content)
    printFrame.contentDocument.execCommand('print')
  } else {
    if (!printFrame) {
      printFrame = createFrame()
      printFrame.onload = evnt => {
        if (evnt.target.src) {
          evnt.target.contentWindow.print()
        }
      }
      document.body.appendChild(printFrame)
    }
    printFrame.src = URL.createObjectURL(blob)
  }
}

function handleExportAndPrint ($xetable, options, isPrint) {
  const { customOpts, collectColumn, footerData, treeConfig, mergeList, isGroup } = $xetable
  const selectRecords = $xetable.getCheckboxRecords()
  const hasFooter = !!footerData.length
  const hasMerge = !treeConfig && mergeList.length
  const defOpts = Object.assign({ message: true, isHeader: true }, options)
  const types = defOpts.types || VXETable.exportTypes
  const checkMethod = customOpts.checkMethod
  const exportColumns = collectColumn.slice(0)
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
      label: `vxe.export.modes.${value}`
    }
  })
  // 默认选中
  XEUtils.eachTree(exportColumns, (column, index, items, path, parent) => {
    const isColGroup = column.children && column.children.length
    if (isColGroup || defaultFilterExportColumn(column)) {
      column.checked = column.visible
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
    isPrint,
    hasColgroup: isGroup,
    visible: true
  })
  // 重置参数
  Object.assign($xetable.exportParams, {
    filename: defOpts.filename || '',
    sheetName: defOpts.sheetName || '',
    type: defOpts.type || typeList[0].value,
    mode: selectRecords.length ? 'selected' : 'current',
    original: defOpts.original,
    message: defOpts.message,
    isHeader: defOpts.isHeader,
    isFooter: hasFooter && (XEUtils.isBoolean(defOpts.isFooter) ? defOpts.isFooter : true),
    isColgroup: XEUtils.isBoolean(defOpts.isColgroup) ? defOpts.isColgroup : true,
    isMerge: hasMerge && defOpts.isMerge,
    isPrint: defOpts.isPrint
  })
  $xetable.initStore.export = true
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
      const { $xegrid, tableGroupColumn, tableFullColumn, tableFullData, treeConfig, treeOpts, exportOpts } = this
      const opts = Object.assign({
        // filename: '',
        // sheetName: '',
        // original: false,
        // message: false,
        isHeader: true,
        isFooter: true,
        isColgroup: true,
        isMerge: false,
        download: true,
        type: 'csv',
        mode: 'current'
        // data: null,
        // remote: false,
        // dataFilterMethod: null,
        // footerFilterMethod: null,
        // exportMethod: null,
        // columnFilterMethod: null
      }, exportOpts, {
        print: false
      }, options)
      const { type, mode, columns, original } = opts
      let groups = []
      const customCols = columns && columns.length ? columns : null
      let columnFilterMethod = opts.columnFilterMethod
      // 如果设置源数据，则默认导出设置了字段的列
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
                const colid = item.id
                const type = item.type
                const field = item.property || item.field
                if (colid) {
                  targetColumn = this.getColumnById(colid)
                } else if (field) {
                  targetColumn = this.getColumnByField(field)
                } else if (type) {
                  targetColumn = tableFullColumn.find(column => column.type === type)
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
        groups = XEUtils.searchTree(tableGroupColumn, (column, index) => column.visible && (!columnFilterMethod || columnFilterMethod({ column, $columnIndex: index })), { children: 'children', mapChildren: 'childNodes', original: true })
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

      // 检查类型
      if (!XEUtils.includes(VXETable.exportTypes, type)) {
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          UtilTools.error('vxe.error.notType', [type])
        }
        return Promise.resolve()
      }

      if (!opts.data) {
        opts.data = tableFullData
        if (mode === 'selected') {
          const selectRecords = this.getCheckboxRecords()
          if (['html', 'pdf'].indexOf(type) > -1 && treeConfig) {
            opts.data = XEUtils.searchTree(this.getTableData().fullData, item => selectRecords.indexOf(item) > -1, treeOpts)
          } else {
            opts.data = selectRecords
          }
        } else if (mode === 'all') {
          if ($xegrid && !opts.remote) {
            const { beforeQueryAll, afterQueryAll, ajax = {}, props = {} } = $xegrid.proxyOpts
            const ajaxMethods = ajax.queryAll
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
    _importByFile (file, opts) {
      const { type, filename } = UtilTools.parseFile(file)

      // 检查类型
      if (!XEUtils.includes(VXETable.importTypes, type)) {
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          UtilTools.error('vxe.error.notType', [type])
        }
        return Promise.resolve()
      }

      if (window.FileReader) {
        const options = Object.assign({ mode: 'insert' }, opts, { type, filename })
        if (options.remote) {
          const params = { file, options, $table: this }
          if (options.importMethod) {
            return options.importMethod(params)
          }
          return Promise.resolve(params)
        }
        this.preventEvent(null, 'event.import', { file, options, columns: this.tableFullColumn }, () => {
          const reader = new FileReader()
          reader.onerror = () => {
            UtilTools.error('vxe.error.notType', [type])
          }
          reader.onload = e => {
            handleImport(this, e.target.result, options)
          }
          reader.readAsText(file, 'UTF-8')
        })
      } else {
        // 不支持的浏览器
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          UtilTools.error('vxe.error.notExp')
        }
      }
      return Promise.resolve()
    },
    _importData (options) {
      const opts = Object.assign({ types: VXETable.importTypes }, this.importOpts, options)
      const rest = new Promise((resolve, reject) => {
        this._importResolve = resolve
        this._importReject = reject
      })
      readLocalFile(opts).then((params) => {
        const { file } = params
        this.importByFile(file, opts)
      }).catch(params => {
        this._importReject(params)
        this._importReject = null
      })
      return rest
    },
    _readFile (options) {
      return readLocalFile(options)
    },
    _print (options) {
      const opts = Object.assign({
        original: false
      }, this.printOpts, options, {
        type: 'html',
        download: false,
        remote: false,
        print: true
      })
      if (!opts.sheetName) {
        opts.sheetName = document.title
      }
      if (opts.content) {
        handlePrint(this, opts, opts.content)
      } else {
        this.exportData(opts).then(({ content }) => {
          handlePrint(this, opts, content)
        })
      }
    },
    _openImport (options) {
      const defOpts = Object.assign({ mode: 'insert', message: true }, options, this.importOpts)
      const types = defOpts.types || VXETable.exportTypes
      const isTree = !!this.getTreeStatus()
      if (isTree) {
        if (defOpts.message) {
          VXETable.modal.message({ message: GlobalConfig.i18n('vxe.error.treeNotImp'), status: 'error' })
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

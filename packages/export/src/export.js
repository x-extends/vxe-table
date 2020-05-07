import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'
import VXETable from '../../v-x-e-table'

// 默认导出或打印的 HTML 样式
const defaultHtmlStyle = 'body{margin:0;}body *{-webkit-box-sizing:border-box;box-sizing:border-box}.vxe-table{border:0;border-collapse:separate;text-align:left;font-size:14px;border-spacing:0}.vxe-table:not(.is--print ){table-layout:fixed;}.vxe-table.is--print{width:100%}.vxe-table.border--default,.vxe-table.border--full,.vxe-table.border--outer{border-top:1px solid #e8eaec;}.vxe-table.border--default,.vxe-table.border--full,.vxe-table.border--outer{border-left:1px solid #e8eaec;}.vxe-table.border--outer,.vxe-table.border--default th,.vxe-table.border--default td,.vxe-table.border--full th,.vxe-table.border--full td,.vxe-table.border--outer th,.vxe-table.border--inner th,.vxe-table.border--inner td{border-bottom:1px solid #e8eaec}.vxe-table.border--default,.vxe-table.border--outer,.vxe-table.border--full th,.vxe-table.border--full td{border-right:1px solid #e8eaec}.vxe-table.border--default th,.vxe-table.border--full th,.vxe-table.border--outer th{background-color:#f8f8f9;}.vxe-table td>div,.vxe-table th>div{padding:.5em .4em}.col--center{text-align:center}.col--right{text-align:right}.vxe-table:not(.is--print ) .col--ellipsis>div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:break-all}.vxe-table--tree-node{text-align:left}.vxe-table--tree-node-wrapper{position:relative}.vxe-table--tree-icon-wrapper{position:absolute;top:50%;width:1em;height:1em;text-align:center;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.vxe-table--tree-icon{position:absolute;left:0;top:.3em;width:0;height:0;border-style:solid;border-width:.5em;border-top-color:#939599;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vxe-table--tree-cell{display:block;padding-left:1.5em}.vxe-table input[type="checkbox"],.vxe-table input[type="radio"],.vxe-table input[type="checkbox"]+span,.vxe-table input[type="radio"]+span{vertical-align:middle;}'

function hasTreeChildren ($xetable, row) {
  const treeOpts = $xetable.treeOpts
  return row[treeOpts.children] && row[treeOpts.children].length
}

function getSeq ($xetable, row, rowIndex, column, columnIndex) {
  // 在 v3.0 中废弃 startIndex、indexMethod
  const seqOpts = $xetable.seqOpts
  const seqMethod = seqOpts.seqMethod || column.seqMethod || column.indexMethod
  return seqMethod ? seqMethod({ row, rowIndex, column, columnIndex }) : ((seqOpts.startIndex || $xetable.startIndex) + rowIndex + 1)
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
  const { treeConfig, treeOpts, scrollXLoad, scrollYLoad, radioOpts, checkboxOpts } = $xetable
  if (treeConfig) {
    // 如果是树表格只允许导出数据源
    const rest = []
    XEUtils.eachTree(datas, (row, rowIndex, items, path, parent, nodes) => {
      const item = {
        _level: nodes.length - 1,
        _hasChild: hasTreeChildren($xetable, row)
      }
      columns.forEach((column, columnIndex) => {
        let cellValue = ''
        switch (column.type) {
          // v3.0 废弃 type=index
          case 'seq':
          case 'index':
            cellValue = getSeq($xetable, row, rowIndex, column, columnIndex)
            break
          // v3.0 废弃 type=selection
          case 'selection':
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
              const { cellRender, editRender } = column
              let exportLabelMethod
              if (editRender && editRender.name) {
                const compConf = VXETable.renderer.get(editRender.name)
                if (compConf) {
                  exportLabelMethod = compConf.editCellExportMethod
                }
              } else if (cellRender && cellRender.name) {
                const compConf = VXETable.renderer.get(cellRender.name)
                if (compConf) {
                  exportLabelMethod = compConf.cellExportMethod
                }
              }
              cellValue = exportLabelMethod ? exportLabelMethod({ $table: $xetable, row, column }) : UtilTools.getCellLabel(row, column, { $table: $xetable })
            }
        }
        item[column.id] = XEUtils.toString(cellValue)
      })
      rest.push(Object.assign(item, row))
    }, treeOpts)
    return rest
  }
  return datas.map((row, rowIndex) => {
    const item = {}
    columns.forEach((column, columnIndex) => {
      let cellValue = ''
      switch (column.type) {
        // v3.0 废弃 type=index
        case 'seq':
        case 'index':
          cellValue = getSeq($xetable, row, rowIndex, column, columnIndex)
          break
        // v3.0 废弃 type=selection
        case 'selection':
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
          } else if (scrollXLoad || scrollYLoad) {
            // 如果是虚拟滚动
            const { cellRender, editRender } = column
            let exportLabelMethod
            if (editRender && editRender.name) {
              const compConf = VXETable.renderer.get(editRender.name)
              if (compConf) {
                exportLabelMethod = compConf.editCellExportMethod
              }
            } else if (cellRender && cellRender.name) {
              const compConf = VXETable.renderer.get(cellRender.name)
              if (compConf) {
                exportLabelMethod = compConf.cellExportMethod
              }
            }
            cellValue = exportLabelMethod ? exportLabelMethod({ $table: $xetable, row, column }) : UtilTools.getCellLabel(row, column, { $table: $xetable })
          } else {
            const cell = DomTools.getCell($xetable, { row, column })
            cellValue = cell ? cell.innerText.trim() : UtilTools.getCellLabel(row, column, { $table: $xetable })
          }
      }
      item[column.id] = XEUtils.toString(cellValue)
    })
    return item
  })
}

function getExportData ($xetable, opts) {
  let columns = opts.columns
  let datas = opts.data
  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod)
  }
  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod)
  }
  return { columns, datas: getLabelData($xetable, opts, columns, datas) }
}

function getHeaderTitle (opts, column) {
  return (opts.original ? column.property : column.getTitle()) || ''
}

function getFooterCellValue ($xetable, opts, items, column) {
  const { cellRender, editRender } = column
  let exportLabelMethod
  if (editRender && editRender.name) {
    const compConf = VXETable.renderer.get(editRender.name)
    if (compConf) {
      exportLabelMethod = compConf.footerCellExportMethod
    }
  } else if (cellRender && cellRender.name) {
    const compConf = VXETable.renderer.get(cellRender.name)
    if (compConf) {
      exportLabelMethod = compConf.footerCellExportMethod
    }
  }
  const _columnIndex = $xetable._getColumnIndex(column)
  const cellValue = exportLabelMethod ? exportLabelMethod({ $table: $xetable, items, itemIndex: _columnIndex, _columnIndex, column }) : XEUtils.toString(items[_columnIndex])
  return cellValue
}

function toCsv ($xetable, opts, columns, datas) {
  let content = '\ufeff'
  if (opts.isHeader) {
    content += columns.map(column => `"${getHeaderTitle(opts, column)}"`).join(',') + '\n'
  }
  datas.forEach(row => {
    content += columns.map(column => `"${row[column.id]}"`).join(',') + '\n'
  })
  if (opts.isFooter) {
    const footerData = $xetable.footerData
    const footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    footers.forEach(rows => {
      content += columns.map(column => `"${getFooterCellValue($xetable, opts, rows, column)}"`).join(',') + '\n'
    })
  }
  return content
}

function toTxt ($xetable, opts, columns, datas) {
  let content = ''
  if (opts.isHeader) {
    content += columns.map(column => `${getHeaderTitle(opts, column)}`).join('\t') + '\n'
  }
  datas.forEach(row => {
    content += columns.map(column => `${row[column.id]}`).join('\t') + '\n'
  })
  if (opts.isFooter) {
    const footerData = $xetable.footerData
    const footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    footers.forEach(rows => {
      content += columns.map(column => `${getFooterCellValue($xetable, opts, rows, column)}`).join(',') + '\n'
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

function toHtml ($xetable, opts, columns, datas) {
  const { id, border, treeConfig, treeOpts, isAllSelected, headerAlign: allHeaderAlign, align: allAlign, footerAlign: allFooterAlign, showOverflow: allColumnOverflow, showHeaderOverflow: allColumnHeaderOverflow } = $xetable
  const isPrint = opts.print
  const clss = [
    'vxe-table',
    `border--${toTableBorder(border)}`,
    isPrint ? 'is--print' : '',
    opts.isHeader ? 'show--head' : ''
  ].filter(cls => cls)
  let html = [
    '<html>',
    '<head>',
    `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"><title>${opts.sheetName}</title>`,
    `<style>${opts.style || defaultHtmlStyle}</style>`,
    '</head>',
    '<body>',
    `<table class="${clss.join(' ')}" border="0" cellspacing="0" cellpadding="0">`,
    `<colgroup>${columns.map(column => `<col style="width:${column.renderWidth}px">`).join('')}</colgroup>`
  ].join('')
  if (opts.isHeader) {
    html += `<thead><tr>${columns.map(column => {
      const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign
      const classNames = hasEllipsis($xetable, column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : []
      const cellTitle = getHeaderTitle(opts, column)
      if (headAlign) {
        classNames.push(`col--${headAlign}`)
      }
      if (column.type === 'checkbox' || column.type === 'selection') {
        return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" ${isAllSelected ? 'checked' : ''}><span>${cellTitle}</span></div></td>`
      }
      return `<th class="${classNames.join(' ')}" title="${cellTitle}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><span>${cellTitle}</span></div></th>`
    }).join('')}</tr></thead>`
  }
  if (datas.length) {
    html += '<tbody>'
    if (treeConfig) {
      datas.forEach(item => {
        html += '<tr>' + columns.map(column => {
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
            } else if (column.type === 'checkbox' || column.type === 'selection') {
              return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell"><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></div></div></td>`
            }
            return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${item._level * treeOpts.indent}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell">${cellValue}</div></div></div></td>`
          }
          if (column.type === 'radio') {
            return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._radioLabel}</span></div></td>`
          } else if (column.type === 'checkbox' || column.type === 'selection') {
            return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></td>`
          }
          return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${cellValue}</div></td>`
        }).join('') + '</tr>'
      })
    } else {
      datas.forEach(item => {
        html += '<tr>' + columns.map(column => {
          const cellAlign = column.align || allAlign
          const classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
          const cellValue = item[column.id]
          if (cellAlign) {
            classNames.push(`col--${cellAlign}`)
          }
          if (column.type === 'radio') {
            return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._radioLabel}</span></div></td>`
          } else if (column.type === 'checkbox' || column.type === 'selection') {
            return `<td class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${cellValue === true || cellValue === 'true' ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></td>`
          }
          return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${cellValue}</div></td>`
        }).join('') + '</tr>'
      })
    }
    html += '</tbody>'
  }
  if (opts.isFooter) {
    const footerData = $xetable.footerData
    const footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    if (footers.length) {
      html += '<tfoot>'
      footers.forEach(rows => {
        html += `<tr>${columns.map(column => {
          const footAlign = column.footerAlign || column.align || allFooterAlign || allAlign
          const classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
          const cellValue = getFooterCellValue($xetable, opts, rows, column)
          if (footAlign) {
            classNames.push(`col--${footAlign}`)
          }
          return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${cellValue}</div></td>`
        }).join('')}</tr>`
      })
      html += '</tfoot>'
    }
  }
  return html + '</table></body></html>'
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
    const footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    footers.forEach(rows => {
      xml += `<Row>${columns.map(column => `<Cell><Data ss:Type="String">${getFooterCellValue($xetable, opts, rows, column)}</Data></Cell>`).join('')}</Row>`
    })
  }
  return `${xml}</Table></Worksheet></Workbook>`
}

function getContent ($xetable, opts, columns, datas) {
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
  return ''
}

function downloadFile ($xetable, opts, content) {
  const { filename, type, download } = opts
  const name = `${filename}.${type}`
  if (window.Blob) {
    const blob = new Blob([content], { type: `text/${type}` })
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

function getElementsByTagName (elem, qualifiedName) {
  return elem.getElementsByTagName(qualifiedName)
}

function replaceDoubleQuotation (val) {
  return val.replace(/^"/, '').replace(/"$/, '')
}

function parseCsv (columns, content) {
  const list = content.split('\n')
  const rows = []
  let fields = []
  if (list.length) {
    const rList = list.slice(1)
    fields = list[0].split(',').map(replaceDoubleQuotation)
    rList.forEach(r => {
      if (r) {
        const item = {}
        r.split(',').forEach((val, colIndex) => {
          if (fields[colIndex]) {
            item[fields[colIndex]] = replaceDoubleQuotation(val)
          }
        })
        rows.push(item)
      }
    })
  }
  return { fields, rows }
}

function parseTxt (columns, content) {
  const list = content.split('\n')
  const rows = []
  let fields = []
  if (list.length) {
    const rList = list.slice(1)
    fields = list[0].split('\t')
    rList.forEach(r => {
      if (r) {
        const item = {}
        r.split('\t').forEach((val, colIndex) => {
          if (fields[colIndex]) {
            item[fields[colIndex]] = replaceDoubleQuotation(val)
          }
        })
        rows.push(item)
      }
    })
  }
  return { fields, rows }
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

export default {
  handleExport ($xetable, opts) {
    const { columns, datas } = getExportData($xetable, opts)
    return Promise.resolve(
      $xetable.preventEvent(null, 'event.export', { options: opts, columns, datas }, () => {
        return downloadFile($xetable, opts, getContent($xetable, opts, columns, datas))
      })
    )
  },
  handleImport ($xetable, content, opts) {
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
    const status = checkImportData(tableFullColumn, fields, rows)
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
        VXETable.modal.message({ message: XEUtils.template(GlobalConfig.i18n('vxe.table.impSuccess'), [rows.length]), status: 'success' })
      }
    } else if (opts.message !== false) {
      VXETable.modal.message({ message: GlobalConfig.i18n('vxe.error.impFields'), status: 'error' })
    }
    if (_importResolve) {
      _importResolve(status)
      $xetable._importResolve = null
    }
  }
}

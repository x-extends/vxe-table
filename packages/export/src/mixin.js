import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'

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
  // 在 v3.0 中废弃 startIndex、indexMethod
  const seqOpts = $xetable.seqOpts
  const seqMethod = seqOpts.seqMethod || column.seqMethod || column.indexMethod
  return seqMethod ? seqMethod({ row, rowIndex, column, columnIndex }) : ((seqOpts.startIndex || $xetable.startIndex) + rowIndex + 1)
}

function defaultFilterExportColumn (column) {
  return column.property || ['seq', 'index', 'checkbox', 'selection', 'radio'].indexOf(column.type) > -1
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
                cellValue = UtilTools.getCellLabel(row, column, { $table: $xetable })
                if (column.type === 'html') {
                  htmlCellElem.innerHTML = cellValue
                  cellValue = htmlCellElem.innerText.trim()
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
    const item = {}
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
              cellValue = UtilTools.getCellLabel(row, column, { $table: $xetable })
              if (column.type === 'html') {
                htmlCellElem.innerHTML = cellValue
                cellValue = htmlCellElem.innerText.trim()
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
  const { columnFilterMethod, dataFilterMethod } = opts
  let columns = opts.columns
  let datas = opts.data
  if (columnFilterMethod) {
    columns = columns.filter((column, index) => columnFilterMethod({ column, $columnIndex: index }))
  }
  if (dataFilterMethod) {
    datas = datas.filter((row, index) => dataFilterMethod({ row, $rowIndex: index }))
  }
  return { columns, datas: getLabelData($xetable, opts, columns, datas) }
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
    const footers = getFooterData(opts, footerData)
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
    const footers = getFooterData(opts, footerData)
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
    `<body>${XEUtils.toString(content)}</body>`,
    '</html>'
  ].join('')
}

function toHtml ($xetable, opts, columns, datas) {
  const { id, border, treeConfig, treeOpts, isAllSelected, isIndeterminate, headerAlign: allHeaderAlign, align: allAlign, footerAlign: allFooterAlign, showOverflow: allColumnOverflow, showHeaderOverflow: allColumnHeaderOverflow } = $xetable
  const { print: isPrint, isHeader, isFooter } = opts
  const allCls = 'check-all'
  const clss = [
    'vxe-table',
    `border--${toTableBorder(border)}`,
    isPrint ? 'is--print' : '',
    isHeader ? 'show--head' : ''
  ].filter(cls => cls)
  let body = [
    `<table class="${clss.join(' ')}" border="0" cellspacing="0" cellpadding="0">`,
    `<colgroup>${columns.map(column => `<col style="width:${column.renderWidth}px">`).join('')}</colgroup>`
  ].join('')
  if (isHeader) {
    body += `<thead><tr>${columns.map(column => {
      const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign
      const classNames = hasEllipsis($xetable, column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : []
      const cellTitle = getHeaderTitle(opts, column)
      if (headAlign) {
        classNames.push(`col--${headAlign}`)
      }
      if (column.type === 'checkbox' || column.type === 'selection') {
        return `<th class="${classNames.join(' ')}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><input type="checkbox" class="${allCls}" ${isAllSelected ? 'checked' : ''}><span>${cellTitle}</span></div></th>`
      }
      return `<th class="${classNames.join(' ')}" title="${cellTitle}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}><span>${UtilTools.formatText(cellTitle, true)}</span></div></th>`
    }).join('')}</tr></thead>`
  }
  if (datas.length) {
    body += '<tbody>'
    if (treeConfig) {
      datas.forEach(item => {
        body += '<tr>' + columns.map(column => {
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
          return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${UtilTools.formatText(cellValue, true)}</div></td>`
        }).join('') + '</tr>'
      })
    } else {
      datas.forEach(item => {
        body += '<tr>' + columns.map(column => {
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
          return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${UtilTools.formatText(cellValue, true)}</div></td>`
        }).join('') + '</tr>'
      })
    }
    body += '</tbody>'
  }
  if (isFooter) {
    const footerData = $xetable.footerData
    const footers = getFooterData(opts, footerData)
    if (footers.length) {
      body += '<tfoot>'
      footers.forEach(rows => {
        body += `<tr>${columns.map(column => {
          const footAlign = column.footerAlign || column.align || allFooterAlign || allAlign
          const classNames = hasEllipsis($xetable, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
          const cellValue = getFooterCellValue($xetable, opts, rows, column)
          if (footAlign) {
            classNames.push(`col--${footAlign}`)
          }
          return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${isPrint ? '' : `style="width: ${column.renderWidth}px"`}>${UtilTools.formatText(cellValue, true)}</div></td>`
        }).join('')}</tr>`
      })
      body += '</tfoot>'
    }
  }
  // 是否半选状态
  const script = !isAllSelected && isIndeterminate ? `<script>(function(){var a=document.querySelector(".${allCls}");if(a){a.indeterminate=true}})()</script>` : ''
  body += '</table>' + script
  return isPrint ? body : createHtmlPage(opts, body)
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

function handleExport ($xetable, opts) {
  if (opts.remote) {
    const params = { options: opts, $table: $xetable, $grid: $xetable.$xegrid }
    if (opts.exportMethod) {
      return opts.exportMethod(params)
    }
    return Promise.resolve(params)
  }
  const { columns, datas } = getExportData($xetable, opts)
  return Promise.resolve(
    $xetable.preventEvent(null, 'event.export', { options: opts, columns, datas }, () => {
      return downloadFile($xetable, opts, getContent($xetable, opts, columns, datas))
    })
  )
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

export default {
  methods: {
    // 在 v3.0 中废弃 exportCsv 方法
    _exportCsv (options) {
      UtilTools.warn('vxe.error.delFunc', ['exportCsv', 'exportData'])
      return this.exportData(options)
    },
    /**
     * 导出文件，支持 csv/html/xml/txt
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     * @param {Object} options 参数
     */
    _exportData (options) {
      const { $xegrid, visibleColumn, tableFullColumn, tableFullData, treeConfig, treeOpts, exportOpts } = this
      const columns = options && options.columns
      let expColumns = []
      if (columns && columns.length) {
        columns.forEach(item => {
          let targetColumn
          if (item) {
            if (UtilTools.isColumn(item)) {
              targetColumn = item
            } else if (XEUtils.isString(item)) {
              targetColumn = this.getColumnByField(item)
            } else {
              const type = item.type
              const field = item.property || item.field
              if (field && type) {
                targetColumn = tableFullColumn.find(column => column.property === field && column.type === type)
              } else if (field) {
                targetColumn = this.getColumnByField(field)
              } else if (type) {
                targetColumn = tableFullColumn.find(column => column.type === type)
              }
            }
            if (targetColumn) {
              expColumns.push(targetColumn)
            }
          }
        })
      } else {
        expColumns = visibleColumn
      }
      const opts = Object.assign({
        // filename: '',
        // sheetName: '',
        // original: false,
        // message: false,
        isHeader: true,
        isFooter: true,
        download: true,
        type: 'csv',
        mode: 'current',
        // data: null,
        // remote: false,
        // dataFilterMethod: null,
        // footerFilterMethod: null,
        // exportMethod: null,
        columnFilterMethod: columns && columns.length ? null : ({ column }) => defaultFilterExportColumn(column)
      }, exportOpts, {
        print: false
      }, options, {
        columns: expColumns
      })
      if (!opts.filename) {
        opts.filename = XEUtils.template(GlobalConfig.i18n(opts.original ? 'vxe.table.expOriginFilename' : 'vxe.table.expFilename'), [XEUtils.toDateString(Date.now(), 'yyyyMMddHHmmss')])
      }
      if (!opts.sheetName) {
        opts.sheetName = document.title
      }
      if (VXETable.exportTypes.indexOf(opts.type) === -1) {
        throw new Error(UtilTools.getLog('vxe.error.notType', [opts.type]))
      }
      if (!opts.data) {
        opts.data = tableFullData
        if (opts.mode === 'selected') {
          const selectRecords = this.getCheckboxRecords()
          if (['html', 'pdf'].indexOf(opts.type) > -1 && treeConfig) {
            opts.data = XEUtils.searchTree(this.getTableData().fullData, item => selectRecords.indexOf(item) > -1, treeOpts)
          } else {
            opts.data = selectRecords
          }
        } else if (opts.mode === 'all') {
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
      if (window.FileReader) {
        const { type, filename } = UtilTools.parseFile(file)
        const options = Object.assign({ mode: 'insert' }, opts, { type, filename })
        const types = options.types || VXETable.importTypes
        if (types.indexOf(type) > -1) {
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
              handleImport(this, e.target.result.trim(), options)
            }
            reader.readAsText(file, 'UTF-8')
          })
        } else {
          UtilTools.error('vxe.error.notType', [type])
        }
      } else {
        UtilTools.error('vxe.error.notExp')
      }
      return Promise.resolve()
    },
    _importData (options) {
      const opts = Object.assign({}, this.importOpts, options)
      const rest = new Promise((resolve, reject) => {
        this._importResolve = resolve
        this._importReject = reject
      })
      this.readFile(opts)
        .then(evnt => this.importByFile(evnt.target.files[0], opts))
        .catch(evnt => {
          this._importReject(evnt)
          this._importReject = null
        })
      return rest
    },
    _readFile (options = {}) {
      if (!fileForm) {
        fileForm = document.createElement('form')
        fileInput = document.createElement('input')
        fileForm.className = 'vxe-table--file-form'
        fileInput.name = 'file'
        fileInput.type = 'file'
        fileForm.appendChild(fileInput)
        document.body.appendChild(fileForm)
      }
      const types = options.types || VXETable.importTypes
      if (options.multiple) {
        fileInput.multiple = 'multiple'
      }
      fileInput.accept = `.${types.join(', .')}`
      fileInput.onchange = evnt => {
        const { type } = UtilTools.parseFile(evnt.target.files[0])
        if (types.indexOf(type) > -1) {
          this._fileResolve(evnt)
        } else {
          if (options.message !== false) {
            VXETable.modal.message({ message: XEUtils.template(GlobalConfig.i18n('vxe.error.notType'), [type]), status: 'error' })
          }
          this._fileReject(evnt)
        }
        this._fileResolve = null
      }
      fileForm.reset()
      fileInput.click()
      return new Promise((resolve, reject) => {
        this._fileResolve = resolve
        this._fileReject = reject
      })
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
    },
    _openExport (options) {
      const { $toolbar, exportConfig, customOpts, exportOpts, collectColumn, footerData } = this
      const selectRecords = this.getCheckboxRecords()
      const hasFooter = !!footerData.length
      const defOpts = Object.assign({ message: true, isHeader: true }, exportOpts, options)
      const types = defOpts.types || VXETable.exportTypes
      const checkMethod = customOpts.checkMethod || ($toolbar ? $toolbar.customOpts.checkMethod : null)
      const exportColumns = collectColumn.slice(0)
      if (!exportConfig) {
        UtilTools.error('vxe.error.reqProp', ['export-config'])
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
      Object.assign(this.exportStore, {
        columns: exportColumns,
        typeList,
        modeList,
        hasFooter: hasFooter,
        visible: true
      })
      // 重置参数
      Object.assign(this.exportParams, {
        filename: defOpts.filename || '',
        sheetName: defOpts.sheetName || '',
        type: defOpts.type || typeList[0].value,
        mode: selectRecords.length ? 'selected' : 'current',
        original: defOpts.original,
        message: defOpts.message,
        isHeader: defOpts.isHeader,
        isFooter: hasFooter && (XEUtils.isBoolean(exportOpts.isFooter) ? exportOpts.isFooter : true),
        isPrint: defOpts.isPrint
      })
      return this.$nextTick()
    }
  }
}

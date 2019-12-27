import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

// 默认导出或打印的 HTML 样式
const defaultHtmlStyle = 'body{margin:0}body *{-webkit-box-sizing:border-box;box-sizing:border-box;}table{font-size:14px;text-align:left;border-width:1px 0 0 1px}table,td,th{border-style:solid;border-color:#e8eaec}tfoot,thead{background-color:#f8f8f9}td,th{border-width:0 1px 1px 0}td>div,th>div{padding:.5em .4em;}.col--center{text-align:center}.col--right {text-align:right}.col--ellipsis>div{overflow:hidden;text-overflow:ellipsis;white-space: nowrap;word-break:break-all}.tree-icon-wrapper{position:relative;display:inline-block;vertical-align:middle;width:1.2em}.tree-icon{position:absolute;top:-.3em;left:0;width:0;height:0;border-style:solid;border-width:.5em;border-top-color:#939599;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.tree-node{text-align:left}.tree-indent{display:inline-block}'

// 导入
const fileForm = document.createElement('form')
const fileInput = document.createElement('input')
fileForm.className = 'vxe-table--import-form'
fileInput.name = 'file'
fileInput.type = 'file'
fileForm.appendChild(fileInput)

function hasTreeChildren ($table, row) {
  const treeOpts = $table.treeOpts
  return row[treeOpts.children] && row[treeOpts.children].length
}

function getContent ($table, opts, columns, datas) {
  switch (opts.type) {
    case 'csv':
      return toCsv($table, opts, columns, datas)
    case 'txt':
      return toTxt($table, opts, columns, datas)
    case 'html':
      return toHtml($table, opts, columns, datas)
    case 'xml':
      return toXML($table, opts, columns, datas)
  }
  return ''
}

function getSeq ($table, row, rowIndex, column, columnIndex) {
  // 在 v3.0 中废弃 startIndex、indexMethod
  let seqOpts = $table.seqOpts
  let seqMethod = seqOpts.seqMethod || column.indexMethod
  return seqMethod ? seqMethod({ row, rowIndex, column, columnIndex }) : ((seqOpts.startIndex || $table.startIndex) + rowIndex + 1)
}

function getHeaderTitle (opts, column) {
  return (opts.original ? column.property : column.getTitle()) || ''
}

function toCsv ($table, opts, columns, datas) {
  let content = '\ufeff'
  if (opts.isHeader) {
    content += columns.map(column => `"${getHeaderTitle(opts, column)}"`).join(',') + '\n'
  }
  datas.forEach((row, rowIndex) => {
    content += columns.map(column => `"${row[column.id]}"`).join(',') + '\n'
  })
  if (opts.isFooter) {
    const footerData = $table.footerData
    const footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    footers.forEach(rows => {
      content += columns.map(column => `"${rows[$table.$getColumnIndex(column)] || ''}"`).join(',') + '\n'
    })
  }
  return content
}

function toTxt ($table, opts, columns, datas) {
  let content = ''
  if (opts.isHeader) {
    content += columns.map(column => `${getHeaderTitle(opts, column)}`).join('\t') + '\n'
  }
  datas.forEach((row, rowIndex) => {
    content += columns.map(column => `${row[column.id]}`).join('\t') + '\n'
  })
  if (opts.isFooter) {
    const footerData = $table.footerData
    const footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    footers.forEach(rows => {
      content += columns.map(column => `${rows[$table.$getColumnIndex(column)] || ''}`).join(',') + '\n'
    })
  }
  return content
}

function hasEllipsis ($table, column, property, allColumnOverflow) {
  let columnOverflow = column[property]
  let headOverflow = XEUtils.isUndefined(columnOverflow) || XEUtils.isNull(columnOverflow) ? allColumnOverflow : columnOverflow
  let showEllipsis = headOverflow === 'ellipsis'
  let showTitle = headOverflow === 'title'
  let showTooltip = headOverflow === true || headOverflow === 'tooltip'
  let isEllipsis = showTitle || showTooltip || showEllipsis
  // 虚拟滚动不支持动态高度
  if (($table.scrollXLoad || $table.scrollYLoad) && !isEllipsis) {
    isEllipsis = true
  }
  return isEllipsis
}

function toHtml ($table, opts, columns, datas) {
  const { treeConfig, treeOpts, headerAlign: allHeaderAlign, align: allAlign, footerAlign: allFooterAlign, showOverflow: allShowOverflow, showAllOverflow: oldShowAllOverflow, showHeaderOverflow: allHeaderOverflow, showHeaderAllOverflow: oldHeaderOverflow } = $table
  // v2.0 废弃属性，保留兼容
  let allColumnOverflow = XEUtils.isBoolean(oldShowAllOverflow) ? oldShowAllOverflow : allShowOverflow
  let allColumnHeaderOverflow = XEUtils.isBoolean(oldHeaderOverflow) ? oldHeaderOverflow : allHeaderOverflow
  let html = [
    '<html>',
    `<head>`,
    `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"><title>${opts.sheetName}</title>`,
    `<style>${opts.style || defaultHtmlStyle}</style>`,
    '</head>',
    '<body>',
    `<table border="1" cellspacing="0" cellpadding="0">`,
    `<colgroup>${columns.map(column => `<col style="width:${column.renderWidth}px">`).join('')}</colgroup>`
  ].join('')
  if (opts.isHeader) {
    html += `<thead><tr>${columns.map(column => {
      let headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign
      let classNames = hasEllipsis($table, column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : []
      let cellTitle = getHeaderTitle(opts, column)
      if (headAlign) {
        classNames.push(`col--${headAlign}`)
      }
      return `<th class="${classNames.join(' ')}" title="${cellTitle}"><div style="width: ${column.renderWidth}px">${cellTitle}</div></th>`
    }).join('')}</tr></thead>`
  }
  if (datas.length) {
    html += '<tbody>'
    if (treeConfig) {
      datas.forEach(row => {
        html += '<tr>' + columns.map(column => {
          let cellAlign = column.align || allAlign
          let classNames = hasEllipsis($table, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
          let cellValue = row[column.id]
          if (cellAlign) {
            classNames.push(`col--${cellAlign}`)
          }
          if (column.treeNode) {
            let treeIcon = ''
            if (row._hasChild) {
              treeIcon = `<i class="tree-icon"></i>`
            }
            classNames.push('tree-node')
            return `<td class="${classNames.join(' ')}" title="${cellValue}"><div style="width: ${column.renderWidth}px"><span class="tree-indent" style="width: ${row._level * treeOpts.indent}px"></span><span class="tree-icon-wrapper">${treeIcon}</span>${cellValue}</div></td>`
          }
          return `<td class="${classNames.join(' ')}" title="${cellValue}"><div style="width: ${column.renderWidth}px">${cellValue}</div></td>`
        }).join('') + '</tr>'
      })
    } else {
      datas.forEach(row => {
        html += '<tr>' + columns.map(column => {
          let cellAlign = column.align || allAlign
          let classNames = hasEllipsis($table, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
          let cellValue = row[column.id]
          if (cellAlign) {
            classNames.push(`col--${cellAlign}`)
          }
          return `<td class="${classNames.join(' ')}" title="${cellValue}"><div style="width: ${column.renderWidth}px">${cellValue}</div></td>`
        }).join('') + '</tr>'
      })
    }
    html += '</tbody>'
  }
  if (opts.isFooter) {
    const footerData = $table.footerData
    const footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    if (footers.length) {
      html += '<tfoot>'
      footers.forEach(rows => {
        html += `<tr>${columns.map(column => {
          let footAlign = column.footerAlign || column.align || allFooterAlign || allAlign
          let classNames = hasEllipsis($table, column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : []
          let cellValue = XEUtils.toString(rows[$table.$getColumnIndex(column)])
          if (footAlign) {
            classNames.push(`col--${footAlign}`)
          }
          return `<td class="${classNames.join(' ')}" title="${cellValue}"><div style="width: ${column.renderWidth}px">${cellValue}</div></td>`
        }).join('')}</tr>`
      })
      html += '</tfoot>'
    }
  }
  return html + '</table></body></html>'
}

function toXML ($table, opts, columns, datas) {
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
  datas.forEach((row, rowIndex) => {
    xml += '<Row>' + columns.map(column => `<Cell><Data ss:Type="String">${row[column.id]}</Data></Cell>`).join('') + '</Row>'
  })
  if (opts.isFooter) {
    const footerData = $table.footerData
    const footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    footers.forEach(rows => {
      xml += `<Row>${columns.map(column => `<Cell><Data ss:Type="String">${rows[$table.$getColumnIndex(column) || '']}</Data></Cell>`).join('')}</Row>`
    })
  }
  return `${xml}</Table></Worksheet></Workbook>`
}

function downloadFile ($table, opts, content) {
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
      $table.$XModal.message({ message: GlobalConfig.i18n('vxe.table.expSuccess'), status: 'success' })
    }
  } else {
    UtilTools.error('vxe.error.notExp')
  }
}

function getLabelData ($table, columns, datas) {
  const { treeConfig, treeOpts, scrollXLoad, scrollYLoad } = $table
  if (treeConfig) {
    // 如果是树表格只允许导出数据源
    const rest = []
    XEUtils.eachTree(datas, (row, rowIndex, items, path, parent, nodes) => {
      let item = {
        _level: nodes.length - 1,
        _hasChild: hasTreeChildren($table, row)
      }
      columns.forEach((column, columnIndex) => {
        // v3.0 废弃 type=index
        item[column.id] = XEUtils.toString(['seq', 'index'].indexOf(column.type) > -1 ? getSeq($table, row, rowIndex, column, columnIndex) : XEUtils.get(row, column.property))
      })
      rest.push(Object.assign(item, row))
    }, treeOpts)
    return rest
  }
  return datas.map((row, rowIndex) => {
    let item = {}
    columns.forEach((column, columnIndex) => {
      // 如果是启用虚拟滚动后只允许导出数据源
      if (scrollXLoad || scrollYLoad) {
        // v3.0 废弃 type=index
        item[column.id] = XEUtils.toString(['seq', 'index'].indexOf(column.type) > -1 ? getSeq($table, row, rowIndex, column, columnIndex) : row[column.property])
      } else {
        let cell = DomTools.getCell($table, { row, column })
        item[column.id] = cell ? cell.innerText.trim() : ''
      }
    })
    return item
  })
}

function getExportData ($table, opts, fullData, oColumns) {
  let columns = opts.columns ? opts.columns : oColumns
  let datas = opts.data || fullData
  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod)
  }
  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod)
  }
  return { columns, datas: getLabelData($table, columns, datas) }
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
  let fields = []
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
  let fields = []
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

function getElementsByTagName (elem, qualifiedName) {
  return elem.getElementsByTagName(qualifiedName)
}

/**
 * 检查导入的列是否完整
 * @param {Array} fields 字段名列表
 * @param {Array} rows 数据列表
 */
function checkImportData (columns, fields, rows) {
  let tableFields = []
  columns.forEach(column => {
    let field = column.property
    if (field) {
      tableFields.push(field)
    }
  })
  return tableFields.every(field => fields.indexOf(field) > -1)
}

export default {
  handleExport ($table, opts, oColumns, fullData) {
    const { columns, datas } = getExportData($table, opts, fullData, oColumns)
    return $table.preventEvent(null, 'event.export', { $table, options: opts, columns, datas }, () => {
      return downloadFile($table, opts, getContent($table, opts, columns, datas))
    })
  },
  handleImport ($table, content, opts) {
    const { tableFullColumn, _importResolve } = $table
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
      $table.createData(rows)
        .then(data => {
          if (opts.mode === 'append') {
            $table.insertAt(data, -1)
          } else {
            $table.reloadData(data)
          }
        })
      if (opts.message !== false) {
        $table.$XModal.message({ message: GlobalConfig.i18n('vxe.table.impSuccess'), status: 'success' })
      }
    } else if (opts.message !== false) {
      $table.$XModal.message({ message: GlobalConfig.i18n('vxe.error.impFields'), status: 'error' })
    }
    if (_importResolve) {
      _importResolve(status)
      $table._importResolve = null
    }
  }
}

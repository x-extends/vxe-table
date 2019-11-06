import XEUtils from 'xe-utils'
import { UtilTools, DomTools } from '../../tools'

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

function getHeaderTitle (opts, column) {
  return opts.original ? column.property : column.getTitle()
}

function toCsv ($table, opts, columns, datas) {
  const isOriginal = opts.original
  let content = '\ufeff'
  if (opts.isHeader) {
    content += columns.map(column => `"${getHeaderTitle(opts, column)}"`).join(',') + '\n'
  }
  datas.forEach((row, rowIndex) => {
    if (isOriginal) {
      content += columns.map(column => {
        if (column.type === 'index') {
          return `"${column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1}"`
        }
        return `"${UtilTools.getCellValue(row, column) || ''}"`
      }).join(',') + '\n'
    } else {
      content += columns.map(column => `"${row[column.id]}"`).join(',') + '\n'
    }
  })
  if (opts.isFooter) {
    let footerData = $table.footerData
    let footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    let filterMaps = $table.tableColumn.map(column => columns.includes(column))
    footers.forEach(rows => {
      content += rows.filter((val, colIndex) => `"${filterMaps[colIndex]}"`).join(',') + '\n'
    })
  }
  return content
}

function toTxt ($table, opts, columns, datas) {
  const isOriginal = opts.original
  let content = ''
  if (opts.isHeader) {
    content += columns.map(column => `${getHeaderTitle(opts, column)}`).join('\t') + '\n'
  }
  datas.forEach((row, rowIndex) => {
    if (isOriginal) {
      content += columns.map(column => {
        if (column.type === 'index') {
          return `${column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1}`
        }
        return `${UtilTools.getCellValue(row, column) || ''}`
      }).join('\t') + '\n'
    } else {
      content += columns.map(column => `${row[column.id]}`).join('\t') + '\n'
    }
  })
  if (opts.isFooter) {
    let footerData = $table.footerData
    let footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    let filterMaps = $table.tableColumn.map(column => columns.includes(column))
    footers.forEach(rows => {
      content += rows.filter((val, colIndex) => `${filterMaps[colIndex]}`).join('\t') + '\n'
    })
  }
  return content
}

function toHtml ($table, opts, columns, datas) {
  const isOriginal = opts.original
  let html = [
    '<!DOCTYPE html>',
    '<html>',
    `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"><title>${opts.sheetName}</title></head>`,
    '<body>',
    '<table border="1" cellspacing="0" cellpadding="0">',
    `<colgroup>${columns.map(column => `<col width="${column.renderWidth}">`).join('')}</colgroup>`
  ].join('')
  if (opts.isHeader) {
    html += `<thead><tr>${columns.map(column => `<th>${getHeaderTitle(opts, column)}</th>`).join('')}</tr></thead>`
  }
  if (datas.length) {
    html += '<tbody>'
    datas.forEach((row, rowIndex) => {
      html += '<tr>'
      if (isOriginal) {
        html += columns.map(column => {
          if (column.type === 'index') {
            return `<td>${column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1}</td>`
          }
          return `<td>${UtilTools.getCellValue(row, column) || ''}</td>`
        }).join('')
      } else {
        html += columns.map(column => `<td>${row[column.id]}</td>`).join('')
      }
      html += '</tr>'
    })
    html += '</tbody>'
  }
  if (opts.isFooter) {
    let footerData = $table.footerData
    let footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    let filterMaps = $table.tableColumn.map(column => columns.includes(column))
    if (footers.length) {
      html += '<tfoot>'
      footers.forEach(rows => {
        html += `<tr>${rows.filter((val, colIndex) => `<td>${filterMaps[colIndex]}</td>`).join('')}</tr>`
      })
      html += '</tfoot>'
    }
  }
  return html + '</table></body></html>'
}

function toXML ($table, opts, columns, datas) {
  const isOriginal = opts.original
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
    xml += '<Row>'
    if (isOriginal) {
      xml += columns.map(column => {
        if (column.type === 'index') {
          return `<Cell><Data ss:Type="String">${column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1}</Data></Cell>`
        }
        return `<Cell><Data ss:Type="String">${UtilTools.getCellValue(row, column) || ''}</Data></Cell>`
      }).join('')
    } else {
      xml += columns.map(column => `<Cell><Data ss:Type="String">${row[column.id]}</Data></Cell>`).join('')
    }
    xml += '</Row>'
  })
  if (opts.isFooter) {
    let footerData = $table.footerData
    let footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData
    let filterMaps = $table.tableColumn.map(column => columns.includes(column))
    if (footers.length) {
      footers.forEach(rows => {
        xml += `<Row>${rows.filter((val, colIndex) => `<Cell><Data ss:Type="String">${filterMaps[colIndex]}</Data></Cell>`).join('')}</Row>`
      })
    }
  }
  return `${xml}</Table></Worksheet></Workbook>`
}

function downloadFile (opts, content) {
  const { filename, type, download } = opts
  const name = `${filename}.${type}`
  if (!download) {
    return Promise.resolve(content)
  }
  if (window.Blob) {
    const blob = new Blob([content], { type: `text/${type}` })
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
  } else {
    UtilTools.error('vxe.error.notExp')
  }
}

function getLabelData ($table, columns, datas) {
  return datas.map(row => {
    let item = {}
    columns.forEach(column => {
      let cell = DomTools.getCell($table, { row, column })
      item[column.id] = cell ? cell.innerText.trim() : ''
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
  return { columns, datas: opts.original ? datas : getLabelData($table, columns, datas) }
}

function replaceDoubleQuotation (val) {
  return val.replace(/^"/, '').replace(/"$/, '')
}

function parseCsv (columns, content) {
  const list = content.split('\n')
  const fields = []
  const rows = []
  if (list.length) {
    const rList = list.slice(1)
    list[0].split(',').forEach(val => {
      const field = replaceDoubleQuotation(val)
      if (field) {
        fields.push(field)
      }
    })
    rList.forEach(r => {
      if (r) {
        const item = {}
        r.split(',').forEach((val, colIndex) => {
          item[fields[colIndex]] = replaceDoubleQuotation(val)
        })
        rows.push(item)
      }
    })
  }
  return { fields, rows }
}

function parseTxt (columns, content) {
  const list = content.split('\n')
  const fields = []
  const rows = []
  if (list.length) {
    const rList = list.slice(1)
    list[0].split('\t').forEach(field => {
      if (field) {
        fields.push(field)
      }
    })
    rList.forEach(r => {
      if (r) {
        const item = {}
        r.split('\t').forEach((val, colIndex) => {
          item[fields[colIndex]] = replaceDoubleQuotation(val)
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
  const bodyNodes = xmlDoc.getElementsByTagName('body')
  const fields = []
  const rows = []
  if (bodyNodes.length) {
    const tableNodes = bodyNodes[0].getElementsByTagName('table')
    if (tableNodes.length) {
      const theadNodes = tableNodes[0].getElementsByTagName('thead')
      if (theadNodes.length) {
        XEUtils.arrayEach(theadNodes[0].getElementsByTagName('tr'), rowNode => {
          XEUtils.arrayEach(rowNode.getElementsByTagName('th'), cellNode => {
            const field = cellNode.textContent
            if (field) {
              fields.push(field)
            }
          })
        })
        const tbodyNodes = tableNodes[0].getElementsByTagName('tbody')
        if (tbodyNodes.length) {
          XEUtils.arrayEach(tbodyNodes[0].getElementsByTagName('tr'), rowNode => {
            const item = {}
            XEUtils.arrayEach(rowNode.getElementsByTagName('td'), (cellNode, colIndex) => {
              item[fields[colIndex]] = cellNode.textContent || ''
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
  const sheetNodes = xmlDoc.getElementsByTagName('Worksheet')
  const fields = []
  const rows = []
  if (sheetNodes.length) {
    const tableNodes = sheetNodes[0].getElementsByTagName('Table')
    if (tableNodes.length) {
      const rowNodes = tableNodes[0].getElementsByTagName('Row')
      if (rowNodes.length) {
        XEUtils.arrayEach(rowNodes[0].getElementsByTagName('Cell'), cellNode => {
          const field = cellNode.textContent
          if (field) {
            fields.push(field)
          }
        })
        XEUtils.arrayEach(rowNodes, (rowNode, index) => {
          if (index) {
            const item = {}
            const cellNodes = rowNode.getElementsByTagName('Cell')
            XEUtils.arrayEach(cellNodes, (cellNode, colIndex) => {
              item[fields[colIndex]] = cellNode.textContent
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
function checkImportData (columns, fields, rows) {
  let tableFields = []
  columns.forEach(column => {
    let field = column.property
    if (field) {
      tableFields.push(field)
    }
  })
  return tableFields.every(field => fields.includes(field))
}

export default {
  handleExport ($table, opts, oColumns, fullData) {
    const { columns, datas } = getExportData($table, opts, fullData, oColumns)
    return $table.preventEvent(null, 'event.export', { $table, options: opts, columns, datas }, () => {
      return downloadFile(opts, getContent($table, opts, columns, datas))
    })
  },
  handleImport ($table, content, opts) {
    const { tableFullColumn, importCallback } = $table
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
        .then(data => $table.reloadData(data))
    } else if (!importCallback) {
      UtilTools.error('vxe.error.impFields')
    }
    if (importCallback) {
      importCallback(status)
    }
  }
}

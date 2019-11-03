import { UtilTools, DomTools } from '../../tools'

function toCsv ($table, opts, columns, datas) {
  const isOriginal = opts.original
  let content = '\ufeff'
  if (opts.isHeader) {
    content += columns.map(({ own }) => `"${UtilTools.getFuncText(own.title || own.label)}"`).join(',') + '\n'
  }
  if (datas.length) {
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
  }
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

function toHtml ($table, opts, columns, datas) {
  const isOriginal = opts.original
  let html = [
    '<!DOCTYPE html>',
    '<html>',
    `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"><title>${opts.filename}</title></head>`,
    '<body>',
    '<table border="1" cellspacing="0" cellpadding="0">',
    `<colgroup>${columns.map(column => `<col width="${column.renderWidth}">`).join('')}</colgroup>`
  ].join('')
  if (opts.isHeader) {
    html += `<thead><tr>${columns.map(({ own }) => `<th>${UtilTools.getFuncText(own.title || own.label)}</th>`).join('')}</tr></thead>`
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
    `<Worksheet ss:Name="${opts.filename}">`,
    '<Table>',
    columns.map(column => `<Column ss:Width="${column.renderWidth}"/>`).join('')
  ].join('')
  if (opts.isHeader) {
    xml += `<Row>${columns.map(({ own }) => `<Cell><Data ss:Type="String">${UtilTools.getFuncText(own.title || own.label)}</Data></Cell>`).join('')}</Row>`
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

function getDownloadUrl (opts, content) {
  switch (opts.type) {
    case 'csv':
    case 'html':
    case 'xml':
      return getAttachmentUrl(opts, content)
  }
  return ''
}

function getAttachmentUrl ({ type }, content) {
  if (window.Blob && window.URL && window.URL.createObjectURL && !DomTools.browse.safari) {
    return URL.createObjectURL(new Blob([content], { type: `text/${type}` }))
  }
  return `data:attachment/${type};charset=utf-8,${encodeURIComponent(content)}`
}

export default {
  getCsvContent ($table, opts, oColumns, fullData) {
    const { type } = opts
    const { columns, datas } = getExportData($table, opts, fullData, oColumns)
    if (type === 'csv') {
      return toCsv($table, opts, columns, datas)
    } else if (type === 'html') {
      return toHtml($table, opts, columns, datas)
    } else if (type === 'xml') {
      return toXML($table, opts, columns, datas)
    }
    return ''
  },
  downloadCsc (opts, content) {
    const { filename, type, download } = opts
    const name = `${filename}.${type}`
    if (!download) {
      return Promise.resolve(content)
    }
    if (navigator.msSaveBlob && window.Blob) {
      navigator.msSaveBlob(new Blob([content], { type: `text/${type}` }), name)
    } else if (DomTools.browse['-ms']) {
      var win = window.top.open('about:blank', '_blank')
      win.document.charset = 'utf-8'
      win.document.write(content)
      win.document.close()
      win.document.execCommand('SaveAs', name)
      win.close()
    } else {
      var linkElem = document.createElement('a')
      linkElem.target = '_blank'
      linkElem.download = name
      linkElem.href = getDownloadUrl(opts, content)
      document.body.appendChild(linkElem)
      linkElem.click()
      document.body.removeChild(linkElem)
    }
  }
}

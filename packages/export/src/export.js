import { UtilTools, DomTools } from '../../tools'

export default {
  getCsvContent ($table, opts, oColumns, fullData) {
    let isOriginal = opts.original
    let { columns, datas } = getCsvData($table, opts, fullData, oColumns)
    let content = '\ufeff'
    if (opts.isHeader) {
      content += columns.map(({ own }) => UtilTools.getFuncText(own.title || own.label)).join(',') + '\n'
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
        content += rows.filter((val, colIndex) => filterMaps[colIndex]).join(',') + '\n'
      })
    }
    return content
  },
  downloadCsc (opts, content) {
    if (!opts.download) {
      return Promise.resolve(content)
    }
    if (navigator.msSaveBlob && window.Blob) {
      navigator.msSaveBlob(new Blob([content], { type: 'text/csv' }), opts.filename)
    } else if (DomTools.browse['-ms']) {
      var win = window.top.open('about:blank', '_blank')
      win.document.charset = 'utf-8'
      win.document.write(content)
      win.document.close()
      win.document.execCommand('SaveAs', opts.filename)
      win.close()
    } else {
      var linkElem = document.createElement('a')
      linkElem.target = '_blank'
      linkElem.download = opts.filename
      linkElem.href = getCsvUrl(opts, content)
      document.body.appendChild(linkElem)
      linkElem.click()
      document.body.removeChild(linkElem)
    }
  }
}

function getCsvLabelData ($table, columns, datas) {
  return datas.map(row => {
    let item = {}
    columns.forEach(column => {
      let cell = DomTools.getCell($table, { row, column })
      item[column.id] = cell ? cell.innerText.trim() : ''
    })
    return item
  })
}

function getCsvData ($table, opts, fullData, oColumns) {
  let columns = opts.columns ? opts.columns : oColumns
  let datas = opts.data || fullData
  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod)
  }
  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod)
  }
  return { columns, datas: opts.original ? datas : getCsvLabelData($table, columns, datas) }
}

function getCsvUrl (opts, content) {
  if (window.Blob && window.URL && window.URL.createObjectURL && !DomTools.browse.safari) {
    return URL.createObjectURL(new Blob([content], { type: 'text/csv' }))
  }
  return `data:attachment/csv;charset=utf-8,${encodeURIComponent(content)}`
}

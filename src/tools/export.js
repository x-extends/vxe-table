import UtilTools from './utils'
import DomTools from './dom'

const ExportTools = {
  getCsvContent (opts, oData, oColumns, tableElem) {
    let isOriginal = opts.original
    let { columns, datas } = getCsvData(opts, oData, oColumns, tableElem)
    let content = '\ufeff'
    if (opts.isHeader) {
      content += columns.map(column => column.label).join(',') + '\n'
    }
    datas.forEach((record, rowIndex) => {
      if (isOriginal) {
        content += columns.map(column => {
          if (column.type === 'index') {
            return `"${column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1}"`
          }
          return `"${UtilTools.getCellValue(record, column) || ''}"`
        }).join(',') + '\n'
      } else {
        content += columns.map(column => `"${record[column.id]}"`).join(',') + '\n'
      }
    })
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

function getCsvLabelData (columns, oData, tableElem) {
  let trElemList = tableElem.querySelectorAll('.vxe-table--body-wrapper.body--wrapper .vxe-body--row')
  return Array.from(trElemList).map(trElem => {
    let item = {}
    columns.forEach(column => {
      let cell = trElem.querySelector(`.${column.id}`)
      item[column.id] = cell ? cell.innerText.trim() : ''
    })
    return item
  })
}

function getCsvData (opts, oData, oColumns, tableElem) {
  let isOriginal = opts.original
  let columns = opts.columns ? opts.columns : oColumns
  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod)
  }
  let datas = opts.data ? opts.data : (isOriginal ? oData : getCsvLabelData(columns, oData, tableElem))
  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod)
  }
  return { columns, datas }
}

function getCsvUrl (opts, content) {
  if (window.Blob && window.URL && window.URL.createObjectURL && !DomTools.browse.safari) {
    return URL.createObjectURL(new Blob([content], { type: 'text/csv' }))
  }
  return `data:attachment/csv;charset=utf-8,${encodeURIComponent(content)}`
}

export default ExportTools

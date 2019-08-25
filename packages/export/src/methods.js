import XEUtils from 'xe-utils'
import { UtilTools, DomTools } from '../../tools'

function getCsvContent ($table, opts, oColumns, oData) {
  let isOriginal = opts.original
  let tableElem = $table.$el
  let { columns, datas } = getCsvData(opts, oData, oColumns, tableElem)
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
    $table.footerData.forEach(rows => {
      content += rows.join(',') + '\n'
    })
  }
  return content
}

function downloadCsc (opts, content) {
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

const ExportMethods = {
  /**
     * 导出 csv 文件
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了可视渲染，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     */
  exportCsv (options) {
    let { visibleColumn, scrollXLoad, scrollYLoad, treeConfig } = this
    let opts = Object.assign({
      filename: 'table.csv',
      original: !!treeConfig,
      isHeader: true,
      isFooter: true,
      download: true,
      data: null,
      columns: null,
      columnFilterMethod: column => ['index', 'selection', 'radio'].indexOf(column.type) === -1 && column.property,
      dataFilterMethod: null
    }, options)
    if (opts.filename.indexOf('.csv') === -1) {
      opts.filename += '.csv'
    }
    if (!opts.original) {
      if (scrollXLoad || scrollYLoad) {
        opts.original = true
        UtilTools.warn('vxe.error.scrollOriginal')
      }
    }
    let columns = visibleColumn
    let oData = this.tableFullData
    if (treeConfig) {
      oData = XEUtils.toTreeArray(oData, treeConfig)
    }
    return downloadCsc(opts, getCsvContent(this, opts, columns, oData))
  }
}

export default ExportMethods

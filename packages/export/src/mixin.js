import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'

function getFileTypes () {
  return Object.keys(VXETable.types)
}

function handleExport ($table, opts, oColumns, fullData) {
  const { columns, datas } = getExportData($table, opts, fullData, oColumns)
  return $table.preventEvent(null, 'event.export', { $table, options: opts, columns, datas }, () => {
    return downloadFile($table, opts, getContent($table, opts, columns, datas))
  })
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
      content += rows.map((val, colIndex) => `"${filterMaps[colIndex]}"`).join(',') + '\n'
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
      content += rows.map((val, colIndex) => `${filterMaps[colIndex]}`).join('\t') + '\n'
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
        html += `<tr>${rows.map((val, colIndex) => `<td>${filterMaps[colIndex]}</td>`).join('')}</tr>`
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
        xml += `<Row>${rows.map((val, colIndex) => `<Cell><Data ss:Type="String">${filterMaps[colIndex]}</Data></Cell>`).join('')}</Row>`
      })
    }
  }
  return `${xml}</Table></Worksheet></Workbook>`
}

function downloadFile ($table, opts, content) {
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
    if (opts.message) {
      $table.$XModal.message({ message: GlobalConfig.i18n('vxe.table.expSuccess'), status: 'success' })
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
  const bodyNodes = getElementsByTagName(xmlDoc, 'body')
  const fields = []
  const rows = []
  if (bodyNodes.length) {
    const tableNodes = getElementsByTagName(bodyNodes[0], 'table')
    if (tableNodes.length) {
      const theadNodes = getElementsByTagName(tableNodes[0], 'thead')
      if (theadNodes.length) {
        XEUtils.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), rowNode => {
          XEUtils.arrayEach(getElementsByTagName(rowNode, 'th'), cellNode => {
            const field = cellNode.textContent
            if (field) {
              fields.push(field)
            }
          })
        })
        const tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody')
        if (tbodyNodes.length) {
          XEUtils.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), rowNode => {
            const item = {}
            XEUtils.arrayEach(getElementsByTagName(rowNode, 'td'), (cellNode, colIndex) => {
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
  const sheetNodes = getElementsByTagName(xmlDoc, 'Worksheet')
  const fields = []
  const rows = []
  if (sheetNodes.length) {
    const tableNodes = getElementsByTagName(sheetNodes[0], 'Table')
    if (tableNodes.length) {
      const rowNodes = getElementsByTagName(tableNodes[0], 'Row')
      if (rowNodes.length) {
        XEUtils.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), cellNode => {
          const field = cellNode.textContent
          if (field) {
            fields.push(field)
          }
        })
        XEUtils.arrayEach(rowNodes, (rowNode, index) => {
          if (index) {
            const item = {}
            const cellNodes = getElementsByTagName(rowNode, 'Cell')
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
  return tableFields.every(field => fields.includes(field))
}

function handleImport ($table, content, opts) {
  const { tableFullColumn, _importCallback } = $table
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
    if (opts.message) {
      $table.$XModal.message({ message: GlobalConfig.i18n('vxe.table.impSuccess'), status: 'success' })
    }
  } else if (opts.message) {
    $table.$XModal.message({ message: GlobalConfig.i18n('vxe.error.impFields'), status: 'error' })
  }
  if (_importCallback) {
    _importCallback(status)
  }
}

export default {
  methods: {
    // 在 v3.0 中废弃 exportCsv 方法
    _exportCsv (options) {
      UtilTools.warn('vxe.error.delFunc', ['exportCsv', 'exportData'])
      return this.exportData(options)
    },
    _openExport (options) {
      if (this.$toolbar) {
        return this.$toolbar.openExport(options)
      }
      throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
    },
    /**
     * 导出文件，支持 csv/html/xml
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     * @param {Object} options 参数
     */
    _exportData (options) {
      let { visibleColumn, scrollXLoad, scrollYLoad, treeConfig } = this
      let types = Object.keys(VXETable.types)
      let opts = Object.assign({
        filename: '',
        sheetName: '',
        original: !!treeConfig,
        message: false,
        isHeader: true,
        isFooter: true,
        download: true,
        type: 'csv',
        data: null,
        columns: null,
        columnFilterMethod: null,
        dataFilterMethod: null,
        footerFilterMethod: null
      }, options)
      if (!opts.filename) {
        opts.filename = 'export'
      }
      if (!opts.sheetName) {
        opts.sheetName = 'Sheet1'
      }
      if (!types.includes(opts.type)) {
        throw new Error(UtilTools.getLog('vxe.error.notType', [opts.type]))
      }
      if (!opts.original) {
        if (scrollXLoad || scrollYLoad) {
          opts.original = true
          UtilTools.warn('vxe.error.scrollOriginal')
        }
      }
      if (!options || !options.columns) {
        // 在 v3.0 中废弃 type=selection
        opts.columnFilterMethod = column => column.property && ['index', 'checkbox', 'selection', 'radio'].indexOf(column.type) === -1
      }
      let columns = visibleColumn
      let fullData = this.tableFullData
      if (treeConfig) {
        fullData = XEUtils.toTreeArray(fullData, treeConfig)
      }
      return handleExport(this, opts, columns, fullData)
    },
    _openImport (options) {
      if (this.$toolbar) {
        return this.$toolbar.openImport(options)
      }
      throw new Error(UtilTools.getLog('vxe.error.barUnableLink'))
    },
    _importByFile (file, opts) {
      if (window.FileReader) {
        const { type, filename } = UtilTools.parseFile(file)
        const options = Object.assign({ mode: 'covering' }, opts, { type, filename })
        if (getFileTypes().includes(type)) {
          this.preventEvent(null, 'event.import', { $table: this, file, options, columns: this.tableFullColumn }, () => {
            const reader = new FileReader()
            reader.onerror = e => {
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
    },
    _importData (options) {
      this.readFile()
        .then(evnt => this.importByFile(evnt.target.files[0], options))
      return new Promise(resolve => {
        this._importCallback = resolve
      })
    },
    _readFile () {
      const { impForm, impInput } = this.$refs
      impInput.accept = `.${getFileTypes().join(', .')}`
      impForm.reset()
      impInput.click()
      return new Promise(resolve => {
        this._fileCallback = resolve
      })
    },
    fileChangeEvent (evnt) {
      this._fileCallback(evnt)
      this._fileCallback = null
    }
  }
}

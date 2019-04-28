import XEUtils from 'xe-utils'

var columnId = 0
const browse = XEUtils.browse()
const Tools = {
  browse,
  isPx (val) {
    return val && /^\d+(px)?$/.test(val)
  },
  isScale (val) {
    return val && /^\d+%$/.test(val)
  },
  // 触发事件
  emitEvent (_vm, type, args) {
    if (_vm.$listeners[type]) {
      _vm.$emit.apply(_vm, [type].concat(args))
    }
  },
  // 获取所有的列，排除分组
  getColumnList (columns) {
    let result = []
    columns.forEach(column => {
      if (column.children && column.children.length) {
        result.push.apply(result, Tools.getColumnList(column.children))
      } else {
        result.push(column)
      }
    })
    return result
  },
  getColumnConfig (_vm, { renderHeader, renderCell } = {}) {
    return {
      // 基本属性
      id: `col--${_vm.$table.id}_${++columnId}`,
      type: _vm.type,
      property: _vm.prop,
      label: _vm.label,
      width: _vm.width,
      minWidth: _vm.minWidth,
      fixed: _vm.fixed,
      align: _vm.align,
      headerAlign: _vm.headerAlign,
      ellipsis: _vm.ellipsis,
      showTitle: _vm.showOverflowTitle,
      showTooltip: _vm.showOverflowTooltip,
      indexMethod: _vm.indexMethod,
      formatter: _vm.formatter,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      filters: (_vm.filters || []).map(({ label, value }) => ({ label, value, checked: false })),
      filterMultiple: _vm.filterMultiple,
      filterMethod: _vm.filterMethod,
      columnKey: _vm.columnKey,
      // 渲染属性
      visible: true,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      order: null,
      renderWidth: 0,
      resizeWidth: 0,
      renderLeft: 0,
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell
    }
  },
  // 组装列配置
  assemColumn (_vm) {
    let { $table, $parent, columnConfig } = _vm
    let parentColumnConfig = $parent.columnConfig
    if (parentColumnConfig && $parent.$children.length > 0) {
      if (!parentColumnConfig.children) {
        parentColumnConfig.children = []
      }
      parentColumnConfig.children.splice([].indexOf.call($parent.$el.children, _vm.$el), 0, columnConfig)
    } else {
      $table.collectColumn.splice([].indexOf.call($table.$refs.hideColumn.children, _vm.$el), 0, columnConfig)
    }
  },
  getDomScrollTop () {
    return document.documentElement.scrollTop || document.body.scrollTop
  },
  getDomScrollLeft () {
    return document.documentElement.scrollLeft || document.body.scrollLeft
  },
  hasClass (elem, cls) {
    return elem && elem.className && elem.className.split && elem.className.split(' ').indexOf(cls) > -1
  },
  /**
   * 获取元素绝对位置
   */
  getOffset (elem, container) {
    return getNodeOffset(elem, container, { left: 0, top: 0 })
  },
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
            return column.index ? column.index(rowIndex) : rowIndex + 1
          }
          return XEUtils.get(record, column.property) || ''
        }).join(',') + '\n'
      } else {
        content += columns.map(column => record[column.id]).join(',') + '\n'
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
    } else if (browse['-ms']) {
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
  let trElemList = tableElem.querySelectorAll('.vxe-table--body-wrapper .vxe-body--row')
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
  if (window.Blob && window.URL && window.URL.createObjectURL && !browse.safari) {
    return URL.createObjectURL(new Blob([content], { type: 'text/csv' }))
  }
  return `data:attachment/csv;charset=utf-8,${encodeURIComponent(content)}`
}

function getNodeOffset (elem, container, rest) {
  if (elem) {
    rest.top += elem.offsetTop
    rest.left += elem.offsetLeft
    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest)
    }
  }
  return rest
}

export default Tools

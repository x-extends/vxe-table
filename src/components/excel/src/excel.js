import TableProps from '../../table/src/props'
import funs from '../../table/src/func'

const excelContextMenu = {
  header: {
    options: [
      [
        {
          code: 'exportAll',
          name: '隐藏列'
        },
        {
          code: 'exportAll',
          name: '取消所有隐藏'
        }
      ]
    ]
  },
  body: {
    options: [
      [
        {
          code: 'clip',
          name: '剪贴'
        },
        {
          code: 'copy',
          name: '复制'
        },
        {
          code: 'paste',
          name: '粘贴'
        }
      ],
      [
        {
          code: 'insert',
          name: '插入'
        },
        {
          code: 'remove',
          name: '删除'
        },
        {
          code: 'clearData',
          name: '清除内容'
        }
      ],
      [
        // {
        //   code: 'filter',
        //   name: '筛选',
        //   children: [
        //     {
        //       code: 'clearFilter',
        //       name: '清除筛选'
        //     },
        //     {
        //       code: 'filterSelect',
        //       name: '按所选单元格的值筛选'
        //     }
        //   ]
        // },
        {
          code: 'sort',
          name: '排序',
          children: [
            {
              code: 'clearSort',
              name: '清除排序'
            },
            {
              code: 'sortAsc',
              name: '升序'
            },
            {
              code: 'sortDesc',
              name: '倒序'
            }
          ]
        }
      ],
      [
        {
          code: 'exportAll',
          name: '导出数据.cvs'
        }
      ]
    ]
  }
}

const methods = {}

const excelEditConfig = {
  trigger: 'dblclick',
  mode: 'cell',
  showIcon: false,
  showStatus: false
}

function buildColumns (h, columns) {
  return columns ? columns.map(props => h('vxe-table-column', { props }, buildColumns(h, props.children))) : []
}

function buildProps (h, _vm, props = {}) {
  let { editConfig, contextMenu } = props
  return Object.assign({}, props, {
    border: true,
    resizable: true,
    showAllOverflow: null,
    headerCellClassName: _vm.handleHeaderCellClassName,
    cellClassName: _vm.handleCellClassName,
    contextMenu: Object.assign({}, contextMenu, excelContextMenu),
    mouseConfig: { selected: true, checked: true },
    keyboardConfig: { isArray: true, isTab: true, isCut: true, isEdit: true },
    editConfig: editConfig ? Object.assign({}, excelEditConfig, editConfig) : excelEditConfig
  })
}

funs.forEach(name => {
  methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments)
  }
})

export default {
  name: 'VxeExcel',
  props: {
    columns: Array,
    ...TableProps
  },
  data () {
    return {
      excelStore: {
        uploadRows: []
      }
    }
  },
  render (h) {
    return h('vxe-table', {
      class: 'vxe-excel',
      props: buildProps(h, this, this.$props),
      on: {
        ...this.$listeners,
        'cell-click': this.cellClickEvent,
        'header-cell-click': this.headerCellClickEvent,
        'context-menu-link': this.contextMenuLinkEvent
      },
      ref: 'xTable'
    }, buildColumns(h, this.columns))
  },
  methods: {
    ...methods,
    handleHeaderCellClassName ({ column, columnIndex, $table }) {
      let { editStore } = $table
      let { selected, actived } = editStore
      if (columnIndex > 0) {
        if (selected.column === column || actived.column === column) {
          return 'vxe-excel--column-selected'
        }
      }
    },
    handleCellClassName ({ row, column, columnIndex, $table }) {
      let { editStore } = $table
      let { selected, actived } = editStore
      if (columnIndex === 0) {
        if (selected.row === row || actived.row === row) {
          return 'vxe-excel--index-selected'
        }
      }
    },
    cellClickEvent ({ row, rowIndex, columnIndex, $table }, evnt) {
      let { $refs, visibleColumn, handleSelected, handleChecked } = $table
      if (columnIndex === 0) {
        columnIndex += 1
        let tableBodyElem = $refs.tableBody.$el
        let column = visibleColumn[columnIndex]
        let trElemList = tableBodyElem.querySelectorAll('.vxe-body--row')
        let trElem = trElemList[rowIndex]
        let cell = trElem.querySelector(`.${column.id}`)
        handleSelected({ row, rowIndex, column, columnIndex, cell, $table }, evnt).then(() => {
          handleChecked({ rowIndex, columnIndex }, { rowIndex, columnIndex: visibleColumn.length - 1 }, evnt)
        })
      }
    },
    headerCellClickEvent ({ column, columnIndex, $table }, evnt) {
      let { $refs, tableData, handleSelected, handleChecked } = $table
      if (tableData.length) {
        let tableBodyElem = $refs.tableBody.$el
        let rowIndex = 0
        let row = tableData[rowIndex]
        let trElemList = tableBodyElem.querySelectorAll('.vxe-body--row')
        let trElem = trElemList[rowIndex]
        let cell = trElem.querySelector(`.${column.id}`)
        handleSelected({ row, rowIndex, column, columnIndex, cell, $table }, evnt).then(() => {
          handleChecked({ rowIndex, columnIndex }, { rowIndex: tableData.length - 1, columnIndex }, evnt)
        })
      }
    },
    contextMenuLinkEvent ({ menu, row, column }, evnt) {
      let $table = this.$refs.xTable
      let { property } = column
      switch (menu.code) {
        case 'clip':
          $table.handleCopyed(true, evnt)
          break
        case 'copy':
          $table.handleCopyed(false, evnt)
          break
        case 'paste':
          $table.handlePaste(evnt)
          break
        case 'insert':
          $table.insertAt({}, row)
          break
        case 'remove':
          $table.remove(row)
          break
        case 'clearData':
          $table.clearData(row, property)
          break
        case 'clearFilter':
          $table.clearFilter()
          break
        case 'clearSort':
          $table.clearSort()
          break
        case 'sortAsc':
          $table.sort(property, 'asc')
          break
        case 'sortDesc':
          $table.sort(property, 'desc')
          break
        case 'exportAll':
          $table.exportCsv({ isHeader: false })
          break
      }
    }
  }
}

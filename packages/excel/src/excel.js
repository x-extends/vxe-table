import Table from '../../table'

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
          name: '导出数据.csv'
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
  const { editConfig, contextMenu } = props
  return Object.assign({}, props, {
    border: true,
    resizable: true,
    showOverflow: null,
    headerCellClassName: _vm.handleHeaderCellClassName,
    cellClassName: _vm.handleCellClassName,
    contextMenu: Object.assign({}, contextMenu, excelContextMenu),
    mouseConfig: { selected: true, checked: true },
    keyboardConfig: { isArrow: true, isDel: true, isTab: true, isCut: true, isEdit: true },
    editConfig: editConfig ? Object.assign({}, excelEditConfig, editConfig) : excelEditConfig
  })
}

Object.keys(Table.methods).forEach(name => {
  methods[name] = function (...args) {
    return this.$refs.xTable && this.$refs.xTable[name](...args)
  }
})

export default {
  name: 'VxeExcel',
  props: {
    columns: Array,
    ...Table.props
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
        'context-menu-click': this.contextMenuClickEvent
      },
      ref: 'xTable'
    }, buildColumns(h, this.columns))
  },
  methods: {
    ...methods,
    handleHeaderCellClassName ({ column, columnIndex, $table }) {
      const { editStore } = $table
      const { selected, actived } = editStore
      if (columnIndex > 0) {
        if (selected.column === column || actived.column === column) {
          return 'vxe-excel--column-selected'
        }
      }
    },
    handleCellClassName ({ row, columnIndex, $table }) {
      const { editStore } = $table
      const { selected, actived } = editStore
      if (columnIndex === 0) {
        if (selected.row === row || actived.row === row) {
          return 'vxe-excel--index-selected'
        }
      }
    },
    cellClickEvent ({ row, rowIndex, columnIndex, $table }, evnt) {
      const { $refs, visibleColumn, handleSelected, handleChecked } = $table
      if (columnIndex === 0) {
        columnIndex += 1
        const tableBodyElem = $refs.tableBody.$el
        const column = visibleColumn[columnIndex]
        const trElemList = tableBodyElem.querySelectorAll('.vxe-body--row')
        const trElem = trElemList[rowIndex]
        const cell = trElem.querySelector(`.${column.id}`)
        handleSelected({ row, rowIndex, column, columnIndex, cell, $table }, evnt).then(() => {
          handleChecked({ rowIndex, columnIndex }, { rowIndex, columnIndex: visibleColumn.length - 1 }, evnt)
        })
      }
    },
    headerCellClickEvent ({ column, columnIndex, $table }, evnt) {
      const { $refs, tableData, handleSelected, handleChecked } = $table
      if (tableData.length) {
        const tableBodyElem = $refs.tableBody.$el
        const rowIndex = 0
        const row = tableData[rowIndex]
        const trElemList = tableBodyElem.querySelectorAll('.vxe-body--row')
        const trElem = trElemList[rowIndex]
        const cell = trElem.querySelector(`.${column.id}`)
        handleSelected({ row, rowIndex, column, columnIndex, cell, $table }, evnt).then(() => {
          handleChecked({ rowIndex, columnIndex }, { rowIndex: tableData.length - 1, columnIndex }, evnt)
        })
      }
    },
    contextMenuClickEvent ({ menu, row, column }, evnt) {
      const $table = this.$refs.xTable
      const { property } = column
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
          $table.exportData({ isHeader: false })
          break
      }
    }
  }
}

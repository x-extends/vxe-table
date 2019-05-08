import VxeTable from './table'
import VxeTableColumn from './column'
import TableProps from './props'

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
        {
          code: 'filter',
          name: '筛选',
          children: [
            {
              code: 'clearFilter',
              name: '清除筛选'
            },
            {
              code: 'filterSelect',
              name: '按所选单元格的值筛选'
            }
          ]
        },
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
    headerCellClassName: _vm.handleHeaderCellClassName,
    cellClassName: _vm.handleCellClassName,
    contextMenu: Object.assign({}, contextMenu, excelContextMenu),
    mouseConfig: { selected: true, checked: true },
    keyboardConfig: { isArray: true, isTab: true, isCut: true, isEdit: true },
    editConfig: editConfig ? Object.assign({}, excelEditConfig, editConfig) : excelEditConfig
  })
}

export default {
  name: 'VxeExcel',
  props: {
    columns: Array,
    ...TableProps
  },
  components: {
    VxeTable,
    VxeTableColumn
  },
  render (h) {
    return h('vxe-table', {
      class: 'vxe-excel',
      props: buildProps(h, this, this.$props),
      on: this.$listeners
    }, buildColumns(h, this.columns))
  },
  methods: {
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
    }
  }
}

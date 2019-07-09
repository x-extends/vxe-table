import Table from '../../table'

const methods = {}

const excelEditConfig = {
  trigger: 'dblclick',
  mode: 'cell',
  showIcon: false,
  showStatus: false
}

Object.keys(Table.methods).forEach(name => {
  methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments)
  }
})

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
  computed: {
    tableProps () {
      let { $props, editConfig } = this
      return {
        ...$props,
        border: true,
        resizable: true,
        showOverflow: null,
        contextMenu: excelContextMenu,
        mouseConfig: { selected: true, checked: true },
        keyboardConfig: { isArrow: true, isDel: true, isTab: true, isCut: true, isEdit: true },
        editConfig: Object.assign({}, excelEditConfig, editConfig),
        optimization: {
          scrollX: {
            gt: 100,
            oSize: 6,
            rSize: 20
          },
          scrollY: {
            gt: 100,
            oSize: 30,
            rSize: 80
          }
        }
      }
    }
  },
  watch: {
    columns (value) {
      this.loadColumn(value)
    }
  },
  mounted () {
    let { columns } = this
    if (columns && columns.length) {
      this.loadColumn(this.columns)
    }
  },
  render (h) {
    let { $slots, $listeners, tableProps } = this
    return h('vxe-table', {
      class: 'vxe-excel',
      props: tableProps,
      on: {
        ...$listeners,
        'context-menu-click': this.contextMenuClickEvent
      },
      ref: 'xTable'
    }, $slots.default)
  },
  methods: {
    ...methods,
    contextMenuClickEvent ({ menu, row, column }, evnt) {
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

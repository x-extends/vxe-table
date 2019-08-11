<template>
  <div>
    <p>右键快捷菜单，支持表头菜单、内容菜单、表尾菜单</p>
    <p>通过 <table-api-link prop="visibleMethod"/> 和 <table-api-link prop="visible"/> | <table-api-link prop="disabled"/> 属性来控制菜单选项的操作权限</p>

    <vxe-table
      border
      show-footer
      highlight-current-row
      highlight-current-column
      ref="xTable"
      :footer-method="footerMethod"
      :data.sync="tableData"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, footer: {options: footerMenus}, visibleMethod}"
      @header-cell-context-menu="headerCellContextMenuEvent"
      @cell-context-menu="cellContextMenuEvent"
      @context-menu-click="contextMenuClickEvent">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="time" title="Time"></vxe-table-column>
    </vxe-table>

    <pre>
      <code>
        | Arrow Up ↑ | 移动到上一个菜单选项 |
        | Arrow Down ↓ | 移动到下一个菜单选项 |
        | Arrow Left ← | 关闭二级菜单 |
        | Arrow Right → | 打开二级菜单 |
        | Esc | 关闭菜单选项 |
        | Enter | 选中当前菜单选项 |
        | Spacebar | 选中当前菜单选项 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import XEUtils from 'xe-utils'
import XEClipboard from 'xe-clipboard'

export default {
  data () {
    return {
      tableData: [],
      headerMenus: [
        [
          {
            code: 'exportAll',
            name: '导出所有.csv',
            visible: true,
            disabled: false
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'copy',
            name: '复制内容',
            prefixIcon: 'fa fa-copy',
            visible: true,
            disabled: false
          },
          {
            code: 'clear',
            name: '清除内容',
            prefixIcon: 'fa fa-copy',
            visible: true,
            disabled: false
          }
        ],
        [
          {
            code: 'remove',
            name: '删除',
            visible: true,
            disabled: false
          },
          {
            code: 'filter',
            name: '筛选',
            visible: true,
            disabled: false,
            children: [
              {
                code: 'clearFilter',
                name: '清除筛选',
                visible: true,
                disabled: false
              },
              {
                code: 'filterSelect',
                name: '按所选单元格的值筛选',
                visible: true,
                disabled: false
              }
            ]
          },
          {
            code: 'sort',
            name: '排序',
            visible: true,
            disabled: false,
            children: [
              {
                code: 'clearSort',
                name: '清除排序',
                visible: true,
                disabled: false
              },
              {
                code: 'sortAsc',
                name: '升序',
                visible: true,
                disabled: false
              },
              {
                code: 'sortDesc',
                name: '倒序',
                visible: true,
                disabled: false
              }
            ]
          },
          {
            code: 'print',
            name: '打印',
            disabled: true
          }
        ]
      ],
      footerMenus: [
        [
          {
            code: 'clearAll',
            name: '清空数据',
            visible: true,
            disabled: false
          }
        ]
      ],
      demoCodes: [
        `
        <vxe-table
          border
          show-footer
          highlight-current-row
          highlight-current-column
          ref="xTable"
          :footer-method="footerMethod"
          :data.sync="tableData"
          :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, footer: {options: footerMenus}, visibleMethod}"
          @header-cell-context-menu="headerCellContextMenuEvent"
          @cell-context-menu="cellContextMenuEvent"
          @context-menu-click="contextMenuClickEvent">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="time" title="Time"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              headerMenus: [
                [
                  {
                    code: 'exportAll',
                    name: '导出所有.csv',
                    visible: true,
                    disabled: false
                  }
                ]
              ],
              bodyMenus: [
                [
                  {
                    code: 'copy',
                    name: '复制内容',
                    prefixIcon: 'fa fa-copy',
                    visible: true,
                    disabled: false
                  },
                  {
                    code: 'clear',
                    name: '清除内容',
                    prefixIcon: 'fa fa-copy',
                    visible: true,
                    disabled: false
                  }
                ],
                [
                  {
                    code: 'remove',
                    name: '删除',
                    visible: true,
                    disabled: false
                  },
                  {
                    code: 'filter',
                    name: '筛选',
                    visible: true,
                    disabled: false,
                    children: [
                      {
                        code: 'clearFilter',
                        name: '清除筛选',
                        visible: true,
                        disabled: false
                      },
                      {
                        code: 'filterSelect',
                        name: '按所选单元格的值筛选',
                        visible: true,
                        disabled: false
                      }
                    ]
                  },
                  {
                    code: 'sort',
                    name: '排序',
                    visible: true,
                    disabled: false,
                    children: [
                      {
                        code: 'clearSort',
                        name: '清除排序',
                        visible: true,
                        disabled: false
                      },
                      {
                        code: 'sortAsc',
                        name: '升序',
                        visible: true,
                        disabled: false
                      },
                      {
                        code: 'sortDesc',
                        name: '倒序',
                        visible: true,
                        disabled: false
                      }
                    ]
                  },
                  {
                    code: 'print',
                    name: '打印',
                    disabled: true
                  }
                ]
              ],
              footerMenus: [
                [
                  {
                    code: 'clearAll',
                    name: '清空数据',
                    visible: true,
                    disabled: false
                  }
                ]
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            headerCellContextMenuEvent ({ column }) {
              this.$refs.xTable.setCurrentColumn(column)
            },
            cellContextMenuEvent ({ row }) {
              this.$refs.xTable.setCurrentRow(row)
            },
            visibleMethod ({ type, column }) {
              // 示例：只有 name 列允许操作，清除按钮只能在 age 才显示
              // 显示之前处理按钮的操作权限
              let isDisabled = !column || column.property !== 'name'
              let isVisible = column && column.property === 'age'
              this.bodyMenus.forEach(list => {
                list.forEach(item => {
                  if (['copy'].includes(item.code)) {
                    item.disabled = isDisabled
                  }
                  if (['clear'].includes(item.code)) {
                    item.visible = isVisible
                  }
                })
              })
              return true
            },
            contextMenuClickEvent ({ menu, row, column }) {
              switch (menu.code) {
                case 'copy':
                  // 示例
                  if (row && column) {
                    if (XEClipboard.copy(row[column.property])) {
                      this.$XMsg.message({ message: '已复制到剪贴板！', status: 'success' })
                    }
                  }
                  break
                default:
                  this.$XMsg.message(\`点击了 \${menu.name} 选项\`)
              }
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.mean(data, column.property)
                  }
                  return null
                })
              ]
            }
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    headerCellContextMenuEvent ({ column }) {
      this.$refs.xTable.setCurrentColumn(column)
    },
    cellContextMenuEvent ({ row }) {
      this.$refs.xTable.setCurrentRow(row)
    },
    visibleMethod ({ type, column }) {
      // 示例：只有 name 列允许操作，清除按钮只能在 age 才显示
      // 显示之前处理按钮的操作权限
      let isDisabled = !column || column.property !== 'name'
      let isVisible = column && column.property === 'age'
      this.bodyMenus.forEach(list => {
        list.forEach(item => {
          if (['copy', 'remove'].includes(item.code)) {
            item.disabled = isDisabled
          }
          if (['clear'].includes(item.code)) {
            item.visible = isVisible
          }
        })
      })
      return true
    },
    contextMenuClickEvent ({ menu, row, column }) {
      switch (menu.code) {
        case 'copy':
          // 示例
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              this.$XMsg.message({ message: '已复制到剪贴板！', status: 'success' })
            }
          }
          break
        default:
          this.$XMsg.message(`点击了 ${menu.name} 选项`)
      }
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>

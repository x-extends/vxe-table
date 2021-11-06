<template>
  <div>
    <p class="tip">右键快捷菜单，支持表头菜单、内容菜单、表尾菜单，通过 <table-api-link prop="visibleMethod"/> 和 <table-api-link prop="visible"/> | <table-api-link prop="disabled"/> 属性来控制菜单选项的操作权限</p>

    <vxe-table
      border
      show-footer
      highlight-current-row
      highlight-current-column
      ref="xTable"
      height="400"
      :footer-method="footerMethod"
      :data="tableData"
      :menu-config="tableMenu"
      @header-cell-menu="headerCellContextMenuEvent"
      @cell-menu="cellContextMenuEvent"
      @menu-click="contextMenuClickEvent">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="time" title="Time"></vxe-column>
    </vxe-table>

    <pre>
      <pre-code>
        | Arrow Up ↑ | 移动到上一个菜单选项 |
        | Arrow Down ↓ | 移动到下一个菜单选项 |
        | Arrow Left ← | 关闭二级菜单 |
        | Arrow Right → | 打开二级菜单 |
        | Esc | 关闭菜单选项 |
        | Enter | 选中当前菜单选项 |
        | Spacebar | 选中当前菜单选项 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEClipboard from 'xe-clipboard'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' }
      ],
      tableMenu: {
        header: {
          options: [
            [
              { code: 'exportAll', name: '导出所有.csv', visible: true, disabled: false }
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'details', name: '查看详情', prefixIcon: 'fa fa-link', visible: true, disabled: false }
            ],
            [
              { code: 'copy', name: 'app.body.label.copy', prefixIcon: 'fa fa-copy', visible: true, disabled: false },
              { code: 'clear', name: '清除内容', prefixIcon: 'fa fa-copy', visible: true, disabled: false }
            ],
            [
              { code: 'remove', name: '删除', visible: true, disabled: false },
              {
                code: 'filter',
                name: 'app.body.label.filter',
                visible: true,
                disabled: false,
                children: [
                  { code: 'clearFilter', name: '清除筛选', visible: true, disabled: false },
                  { code: 'filterSelect', name: '按所选单元格的值筛选', visible: true, disabled: false }
                ]
              },
              {
                code: 'sort',
                name: 'app.body.label.sort',
                visible: true,
                disabled: false,
                children: [
                  { code: 'clearSort', name: '清除排序', visible: true, disabled: false },
                  { code: 'sortAsc', name: '升序', visible: true, disabled: false },
                  { code: 'sortDesc', name: '倒序', visible: true, disabled: false }
                ]
              },
              { code: 'print', name: '打印', disabled: true }
            ]
          ]
        },
        footer: {
          options: [
            [
              { code: 'clearAll', name: '清空数据', visible: true, disabled: false }
            ]
          ]
        },
        visibleMethod: this.visibleMethod
      },
      demoCodes: [
        `
        <vxe-table
          border
          show-footer
          highlight-current-row
          highlight-current-column
          ref="xTable"
          height="400"
          :footer-method="footerMethod"
          :data="tableData"
          :menu-config="tableMenu"
          @header-cell-menu="headerCellContextMenuEvent"
          @cell-menu="cellContextMenuEvent"
          @menu-click="contextMenuClickEvent">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" sortable></vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
          <vxe-column field="time" title="Time"></vxe-column>
        </vxe-table>
        `,
        `
        import XEClipboard from 'xe-clipboard'

        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' }
              ],
              tableMenu: {
                header: {
                  options: [
                    [
                      { code: 'exportAll', name: '导出所有.csv', visible: true, disabled: false }
                    ]
                  ]
                },
                body: {
                  options: [
                    [
                      { code: 'details', name: '查看详情', prefixIcon: 'fa fa-link', visible: true, disabled: false }
                    ],
                    [
                      { code: 'copy', name: 'app.body.label.copy', prefixIcon: 'fa fa-copy', visible: true, disabled: false },
                      { code: 'clear', name: '清除内容', prefixIcon: 'fa fa-copy', visible: true, disabled: false }
                    ],
                    [
                      { code: 'remove', name: '删除', visible: true, disabled: false },
                      {
                        code: 'filter',
                        name: 'app.body.label.filter',
                        visible: true,
                        disabled: false,
                        children: [
                          { code: 'clearFilter', name: '清除筛选', visible: true, disabled: false },
                          { code: 'filterSelect', name: '按所选单元格的值筛选', visible: true, disabled: false }
                        ]
                      },
                      {
                        code: 'sort',
                        name: 'app.body.label.sort',
                        visible: true,
                        disabled: false,
                        children: [
                          { code: 'clearSort', name: '清除排序', visible: true, disabled: false },
                          { code: 'sortAsc', name: '升序', visible: true, disabled: false },
                          { code: 'sortDesc', name: '倒序', visible: true, disabled: false }
                        ]
                      },
                      { code: 'print', name: '打印', disabled: true }
                    ]
                  ]
                },
                footer: {
                  options: [
                    [
                      { code: 'clearAll', name: '清空数据', visible: true, disabled: false }
                    ]
                  ]
                },
                visibleMethod: this.visibleMethod
              }
            }
          },
          methods: {
            headerCellContextMenuEvent ({ column }) {
              this.$refs.xTable.setCurrentColumn(column)
            },
            cellContextMenuEvent ({ row }) {
              this.$refs.xTable.setCurrentRow(row)
            },
            visibleMethod ({ options, column }) {
              // 示例：只有 name 列允许操作，清除按钮只能在 age 才显示
              // 显示之前处理按钮的操作权限
              const isDisabled = !column || column.property !== 'name'
              const isVisible = column && column.property === 'age'
              options.forEach(list => {
                list.forEach(item => {
                  if (column) {
                    item.disabled = false
                    if (['copy', 'remove'].includes(item.code)) {
                      item.disabled = isDisabled
                    }
                    if (['details'].includes(item.code)) {
                      item.visible = column.property === 'name'
                    } else if (['clear', 'filter'].includes(item.code)) {
                      item.visible = isVisible
                    }
                  } else {
                    item.disabled = true
                  }
                  if (item.children) {
                    item.children.forEach(childItem => {
                      childItem.disabled = item.disabled
                    })
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
                      this.$XModal.message({ content: '已复制到剪贴板！', status: 'success' })
                    }
                  }
                  break
                default:
                  this.$XModal.message({ content: \`点击了 "\${menu.name}"\`, status: 'info' })
              }
            },
            meanNum (list, field) {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count / list.length
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return parseInt(this.meanNum(data, column.property))
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
  methods: {
    headerCellContextMenuEvent ({ column }) {
      this.$refs.xTable.setCurrentColumn(column)
    },
    cellContextMenuEvent ({ row }) {
      this.$refs.xTable.setCurrentRow(row)
    },
    visibleMethod ({ options, column }) {
      // 示例：只有 name 列允许操作，清除按钮只能在 age 才显示
      // 显示之前处理按钮的操作权限
      const isDisabled = !column || column.property !== 'name'
      const isVisible = column && column.property === 'age'
      options.forEach(list => {
        list.forEach(item => {
          if (column) {
            item.disabled = false
            if (['copy', 'remove'].includes(item.code)) {
              item.disabled = isDisabled
            }
            if (['details'].includes(item.code)) {
              item.visible = column.property === 'name'
            } else if (['clear', 'filter'].includes(item.code)) {
              item.visible = isVisible
            }
          } else {
            item.disabled = true
          }
          if (item.children) {
            item.children.forEach(childItem => {
              childItem.disabled = item.disabled
            })
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
              this.$XModal.message({ content: '已复制到剪贴板！', status: 'success' })
            }
          }
          break
        default:
          this.$XModal.message({ content: `点击了 "${menu.name}"`, status: 'info' })
      }
    },
    meanNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return parseInt(this.meanNum(data, column.property))
          }
          return null
        })
      ]
    }
  }
}
</script>

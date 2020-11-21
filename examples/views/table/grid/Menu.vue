<template>
  <div>
    <p class="tip">快捷菜单，实现对按钮的控制，通过 <table-api-link prop="visibleMethod"/> 和 <table-api-link prop="visible"/> | <table-api-link prop="disabled"/> 属性来控制菜单选项的操作权限</p>

    <vxe-grid
      border
      resizable
      show-footer
      highlight-current-row
      ref="xGrid"
      :footer-method="footerMethod"
      :columns="tableColumn"
      :data="tableData"
      :menu-config="tableMenu"
      @cell-menu="cellContextMenuEvent"
      @menu-click="contextMenuClickEvent"></vxe-grid>

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
import XEUtils from 'xe-utils'
import XEClipboard from 'xe-clipboard'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ],
      tableColumn: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'age', title: 'app.body.label.age' },
        { field: 'nickname', title: 'Nickname', showOverflow: true }
      ],
      tableMenu: {
        header: {
          options: [
            [
              { code: 'exportAll', name: '导出所有.csv', prefixIcon: 'fa fa-download', visible: true, disabled: false }
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'copy', name: '复制内容', prefixIcon: 'fa fa-copy', visible: true, disabled: false },
              { code: 'clear', name: '清除内容', visible: true, disabled: false },
              { code: 'reload', name: '刷新表格', visible: true, disabled: false }
            ],
            [
              { code: 'myPrint', name: '打印', prefixIcon: 'fa fa-print', visible: true, disabled: false },
              { code: 'myExport', name: '导出.csv', prefixIcon: 'fa fa-download', visible: true, disabled: false }
            ]
          ]
        },
        footer: {
          options: [
            [
              { code: 'exportAll', name: '导出所有.csv', prefixIcon: 'fa fa-download', visible: true, disabled: false }
            ]
          ]
        },
        visibleMethod: this.visibleMethod
      },
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          show-footer
          highlight-current-row
          ref="xGrid"
          :footer-method="footerMethod"
          :columns="tableColumn"
          :data="tableData"
          :menu-config="tableMenu"
          @cell-menu="cellContextMenuEvent"
          @menu-click="contextMenuClickEvent"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ],
              tableColumn: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'app.body.label.name' },
                { field: 'age', title: 'app.body.label.age' },
                { field: 'nickname', title: 'Nickname', showOverflow: true }
              ],
              tableMenu: {
                header: {
                  options: [
                    [
                      { code: 'exportAll', name: '导出所有.csv', prefixIcon: 'fa fa-download', visible: true, disabled: false }
                    ]
                  ]
                },
                body: {
                  options: [
                    [
                      { code: 'copy', name: '复制内容', prefixIcon: 'fa fa-copy', visible: true, disabled: false },
                      { code: 'clear', name: '清除内容', visible: true, disabled: false },
                      { code: 'reload', name: '刷新表格', visible: true, disabled: false }
                    ],
                    [
                      { code: 'myPrint', name: '打印', prefixIcon: 'fa fa-print', visible: true, disabled: false },
                      { code: 'myExport', name: '导出.csv', prefixIcon: 'fa fa-download', visible: true, disabled: false }
                    ]
                  ]
                },
                footer: {
                  options: [
                    [
                      { code: 'exportAll', name: '导出所有.csv', prefixIcon: 'fa fa-download', visible: true, disabled: false }
                    ]
                  ]
                },
                visibleMethod: this.visibleMethod
              }
            }
          },
          methods: {
            visibleMethod ({ type, options, column }) {
              // 示例：只有 name 列允许操作，清除按钮只能在 age 才显示
              // 显示之前处理按钮的操作权限
              let isDisabled = !column || column.property !== 'name'
              let isVisible = column && column.property === 'age'
              options.forEach(list => {
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
            cellContextMenuEvent ({ row }) {
              this.$refs.xGrid.setCurrentRow(row)
            },
            contextMenuClickEvent ({ menu, row, column }) {
              let xGrid = this.$refs.xGrid
              switch (menu.code) {
                case 'copy':
                  if (row && column) {
                    if (XEClipboard.copy(row[column.property])) {
                      this.$XModal.message({ message: '已复制到剪贴板！', status: 'success' })
                    }
                  }
                  break
                case 'clear':
                  xGrid.clearData(row, column.property)
                  break
                case 'myPrint':
                  xGrid.print()
                  break
                case 'myExport':
                  xGrid.exportData()
                  break
              }
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
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
    visibleMethod ({ options, column }) {
      // 示例：只有 name 列允许操作，清除按钮只能在 age 才显示
      // 显示之前处理按钮的操作权限
      const isDisabled = !column || column.property !== 'name'
      const isVisible = column && column.property === 'age'
      options.forEach(list => {
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
    cellContextMenuEvent ({ row }) {
      this.$refs.xGrid.setCurrentRow(row)
    },
    contextMenuClickEvent ({ menu, row, column }) {
      const xGrid = this.$refs.xGrid
      switch (menu.code) {
        case 'copy':
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              this.$XModal.message({ message: '已复制到剪贴板！', status: 'success' })
            }
          }
          break
        case 'clear':
          xGrid.clearData(row, column.property)
          break
        case 'myPrint':
          xGrid.print()
          break
        case 'myExport':
          xGrid.exportData()
          break
      }
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>

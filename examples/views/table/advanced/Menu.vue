<template>
  <div>
    <p class="tip">右键快捷菜单，支持表头菜单、内容菜单、表尾菜单，自定义样式，配置项 <table-api-link prop="menu-config"/>={header,body,footer}</p>

    <vxe-table
      border
      show-footer
      highlight-current-row
      highlight-current-column
      ref="xTable"
      :footer-method="footerMethod"
      :data="tableData"
      :menu-config="tableMenu"
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
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
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
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'test abc' }
      ],
      tableMenu: {
        className: 'my-menus',
        header: {
          options: [
            [
              { code: 'exportAll', name: '导出所有.csv' }
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'copy', name: 'app.body.label.copy', prefixIcon: 'fa fa-copy', className: 'my-copy-item' }
            ],
            [
              { code: 'remove', name: '删除', prefixIcon: 'fa fa-trash-o color-red' },
              {
                name: '筛选',
                children: [
                  { code: 'clearFilter', name: '清除筛选' },
                  { code: 'filterSelect', name: '按所选单元格的值筛选' }
                ]
              },
              {
                code: 'sort',
                name: '排序',
                prefixIcon: 'fa fa-sort color-blue',
                children: [
                  { code: 'clearSort', name: '清除排序' },
                  { code: 'sortAsc', name: '升序', prefixIcon: 'fa fa-sort-alpha-asc color-orange' },
                  { code: 'sortDesc', name: '倒序', prefixIcon: 'fa fa-sort-alpha-desc color-orange' }
                ]
              },
              { code: 'print', name: '打印', disabled: true }
            ]
          ]
        },
        footer: {
          options: [
            [
              { code: 'clearAll', name: '清空数据' }
            ]
          ]
        }
      },
      demoCodes: [
        `
        <vxe-table
          border
          show-footer
          highlight-current-row
          highlight-current-column
          ref="xTable"
          :footer-method="footerMethod"
          :data="tableData"
          :menu-config="tableMenu"
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
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'test abc' }
              ],
              tableMenu: {
                className: 'my-menus',
                header: {
                  options: [
                    [
                      { code: 'exportAll', name: '导出所有.csv' }
                    ]
                  ]
                },
                body: {
                  options: [
                    [
                      { code: 'copy', name: 'app.body.label.copy', prefixIcon: 'fa fa-copy', className: 'my-copy-item' }
                    ],
                    [
                      { code: 'remove', name: '删除', prefixIcon: 'fa fa-trash-o color-red' },
                      {
                        name: '筛选',
                        children: [
                          { code: 'clearFilter', name: '清除筛选' },
                          { code: 'filterSelect', name: '按所选单元格的值筛选' }
                        ]
                      },
                      {
                        code: 'sort',
                        name: '排序',
                        prefixIcon: 'fa fa-sort color-blue',
                        children: [
                          { code: 'clearSort', name: '清除排序' },
                          { code: 'sortAsc', name: '升序', prefixIcon: 'fa fa-sort-alpha-asc color-orange' },
                          { code: 'sortDesc', name: '倒序', prefixIcon: 'fa fa-sort-alpha-desc color-orange' }
                        ]
                      },
                      { code: 'print', name: '打印', disabled: true }
                    ]
                  ]
                },
                footer: {
                  options: [
                    [
                      { code: 'clearAll', name: '清空数据' }
                    ]
                  ]
                }
              }
            }
          },
          methods: {
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
                  this.$XModal.message(\`点击了 \${menu.name} 选项\`)
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
        `,
        `
        .my-menus {
          background-color: #F8F8F9;
        }
        .my-menus .vxe-ctxmenu--link {
          width: 200px;
        }
        .my-copy-item {
          font-weight: 700;
          font-style: oblique;
        }
        .color-red {
          color: red;
        }
        .color-blue {
          color: blue;
        }
        .color-orange {
          color: orange;
        }
        `
      ]
    }
  },
  methods: {
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
          this.$XModal.message(`点击了 ${menu.name} 选项`)
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

<style>
.my-menus {
  background-color: #F8F8F9;
}
.my-menus .vxe-ctxmenu--link {
  width: 200px;
}
.my-copy-item {
  font-weight: 700;
  font-style: oblique;
}
.color-red {
  color: red;
}
.color-blue {
  color: blue;
}
.color-orange {
  color: orange;
}
</style>

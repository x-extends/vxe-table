<template>
  <div>
    <p class="tip">右键快捷菜单，支持表头菜单、内容菜单、表尾菜单，配置项 <table-api-link prop="context-menu"/>={header,body,footer}</p>

    <vxe-table
      border
      show-footer
      highlight-current-row
      highlight-current-column
      ref="xTable"
      :footer-method="footerMethod"
      :data="tableData"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, footer: {options: footerMenus}}"
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
import XEClipboard from 'xe-clipboard'

export default {
  data () {
    return {
      tableData: [],
      headerMenus: [
        [
          {
            code: 'exportAll',
            name: '导出所有.csv'
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'copy',
            name: 'app.body.label.copy',
            prefixIcon: 'fa fa-copy'
          }
        ],
        [
          {
            code: 'remove',
            name: '删除'
          },
          {
            code: 'filter',
            name: 'app.body.label.filter',
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
            name: 'app.body.label.sort',
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
            name: '清空数据'
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
          :data="tableData"
          :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, footer: {options: footerMenus}}"
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
                    name: '导出所有.csv'
                  }
                ]
              ],
              bodyMenus: [
                [
                  {
                    code: 'copy',
                    name: 'app.body.label.copy',
                    prefixIcon: 'fa fa-copy'
                  }
                ],
                [
                  {
                    code: 'remove',
                    name: '删除'
                  },
                  {
                    code: 'filter',
                    name: 'app.body.label.filter',
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
                    name: 'app.body.label.sort',
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
                    name: '清空数据'
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
            contextMenuClickEvent ({ menu, row, column }) {
              switch (menu.code) {
                case 'copy':
                  // 示例
                  if (row && column) {
                    if (XEClipboard.copy(row[column.property])) {
                      this.$XModal.message({ message: '已复制到剪贴板！', status: 'success' })
                    }
                  }
                  break
                default:
                  this.$XModal.message(\`点击了 \${menu.name} 选项\`)
              }
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return this.$utils.mean(data, column.property)
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
    contextMenuClickEvent ({ menu, row, column }) {
      switch (menu.code) {
        case 'copy':
          // 示例
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              this.$XModal.message({ message: '已复制到剪贴板！', status: 'success' })
            }
          }
          break
        default:
          this.$XModal.message(`点击了 ${menu.name} 选项`)
      }
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return this.$utils.mean(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>

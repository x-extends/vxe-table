<template>
  <div>
    <p class="tip">具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-menus" target="_blank">vxe-table-plugin-menus</a> 插件的 API</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      show-footer
      :footer-method="footerMethod"
      :data.sync="tableData"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, footer: {options: footerMenus}}"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable :filters="[{ data: [] }]" :filter-render="{name: 'input'}" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" sortable></vxe-table-column>
    </vxe-table>

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

export default {
  data () {
    return {
      tableData: [],
      headerMenus: [
        [
          {
            code: 'HIDDEN_COLUMN',
            name: '隐藏'
          },
          {
            code: 'RESET_COLUMN',
            name: '取消隐藏'
          },
          {
            code: 'RESET_ALL',
            name: '重置个性化数据',
            prefixIcon: 'fa fa-undo'
          }
        ],
        [
          {
            code: 'EXPORT_ALL',
            name: '导出数据.csv',
            prefixIcon: 'fa fa-download'
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'INSERT_AT_ACTIVED_ROW',
            name: '插入'
          },
          {
            code: 'DELETE_ROW',
            name: '删除'
          },
          {
            code: 'CLEAR_CELL',
            name: '清除内容'
          }
        ],
        [
          {
            name: '筛选',
            prefixIcon: 'fa fa-filter',
            children: [
              {
                code: 'CLEAR_FILTER',
                name: '清除筛选'
              },
              {
                code: 'CLEAR_ALL_FILTER',
                name: '重置所有筛选'
              },
              {
                code: 'FILTER_CELL',
                name: '按所选单元格的值筛选'
              }
            ]
          },
          {
            name: '排序',
            children: [
              {
                code: 'SORT_ASC',
                name: '升序',
                prefixIcon: 'fa fa-sort-alpha-desc'
              },
              {
                code: 'SORT_DESC',
                name: '倒序',
                prefixIcon: 'fa fa-sort-alpha-desc'
              },
              {
                code: 'CLEAR_SORT',
                name: '清除排序'
              }
            ]
          }
        ],
        [
          {
            code: 'EXPORT_ALL',
            name: '导出数据.csv',
            prefixIcon: 'fa fa-download'
          }
        ]
      ],
      footerMenus: [
        [
          {
            code: 'EXPORT_ALL',
            name: '导出数据.csv',
            prefixIcon: 'fa fa-download'
          }
        ]
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          show-footer
          :footer-method="footerMethod"
          :data.sync="tableData"
          :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, footer: {options: footerMenus}}"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable :filters="[{ data: [] }]" :filter-render="{name: 'input'}" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" sortable></vxe-table-column>
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
                    code: 'HIDDEN_COLUMN',
                    name: '隐藏'
                  },
                  {
                    code: 'RESET_COLUMN',
                    name: '取消隐藏'
                  },
                  {
                    code: 'RESET_ALL',
                    name: '重置个性化数据',
                    prefixIcon: 'fa fa-undo'
                  }
                ],
                [
                  {
                    code: 'EXPORT_ALL',
                    name: '导出表格.csv',
                    prefixIcon: 'fa fa-download'
                  }
                ]
              ],
              bodyMenus: [
                [
                  {
                    code: 'INSERT_AT_ACTIVED_ROW',
                    name: '插入'
                  },
                  {
                    code: 'DELETE_ROW',
                    name: '删除'
                  },
                  {
                    code: 'CLEAR_CELL',
                    name: '清除内容'
                  }
                ],
                [
                  {
                    name: '筛选',
                    prefixIcon: 'fa fa-filter',
                    children: [
                      {
                        code: 'CLEAR_FILTER',
                        name: '清除筛选'
                      },
                      {
                        code: 'CLEAR_ALL_FILTER',
                        name: '重置所有筛选'
                      },
                      {
                        code: 'FILTER_CELL',
                        name: '按所选单元格的值筛选'
                      }
                    ]
                  },
                  {
                    name: '排序',
                    children: [
                      {
                        code: 'SORT_ASC',
                        name: '升序',
                        prefixIcon: 'fa fa-sort-alpha-desc'
                      },
                      {
                        code: 'SORT_DESC',
                        name: '倒序',
                        prefixIcon: 'fa fa-sort-alpha-desc'
                      },
                      {
                        code: 'CLEAR_SORT',
                        name: '清除排序'
                      }
                    ]
                  }
                ],
                [
                  {
                    code: 'EXPORT_ALL',
                    name: '导出数据.csv',
                    prefixIcon: 'fa fa-download'
                  }
                ]
              ],
              footerMenus: [
                [
                  {
                    code: 'EXPORT_ALL',
                    name: '导出表格.csv',
                    prefixIcon: 'fa fa-download'
                  }
                ]
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 5)
          },
          methods: {
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
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
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 5)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>

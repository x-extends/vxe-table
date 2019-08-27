<template>
  <div>
    <p class="tip">具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-charts" target="_blank">vxe-table-plugin-charts</a> 插件的 API</p>

    <vxe-table
      border
      resizable
      height="500"
      :data.sync="tableData"
      :mouse-config="{ selected: true, checked: true }"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}}"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="nickname" title="Nickname" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
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

export default {
  data () {
    return {
      tableData: [],
      headerMenus: [
        [
          {
            code: 'HIDDEN_COLUMN',
            name: '隐藏'
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
            name: 'app.body.label.delete'
          },
          {
            code: 'CLEAR_CELL',
            name: '清除内容'
          }
        ],
        [
          {
            name: '创建图表',
            prefixIcon: 'fa fa-area-chart',
            children: [
              {
                code: 'CHART_BAR_X',
                name: '横向柱状图',
                prefixIcon: 'fa fa-bar-chart'
              },
              {
                code: 'CHART_BAR_Y',
                name: '纵向柱状图',
                prefixIcon: 'fa fa-bar-chart'
              },
              {
                code: 'CHART_PIE',
                name: '饼图',
                prefixIcon: 'fa fa-pie-chart'
              },
              {
                code: 'CHART_LINE',
                name: '折线图',
                prefixIcon: 'fa fa-line-chart'
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
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          height="500"
          :data.sync="tableData"
          :mouse-config="{ selected: true, checked: true }"
          :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}}"
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
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
                    name: 'app.body.label.delete'
                  },
                  {
                    code: 'CLEAR_CELL',
                    name: '清除内容'
                  }
                ],
                [
                  {
                    name: '图表工具',
                    children: [
                      {
                        code: 'CHART_BAR_X',
                        name: '横向柱状图'
                      },
                      {
                        code: 'CHART_BAR_Y',
                        name: '纵向柱状图'
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
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>

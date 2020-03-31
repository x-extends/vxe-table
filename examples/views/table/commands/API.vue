<template>
  <div>
    <h1>{{ $t('app.aside.nav.commands') }}</h1>
    <p class="tip">你可以很简单的将工具栏按钮或数据代理中常用的指令注册成全局可复用</p>
    <vxe-table
      resizable
      highlight-current-row
      highlight-hover-row
      highlight-current-column
      :data="tableData">
      <vxe-table-column field="name" title="app.api.title.prop" min-width="280" tree-node></vxe-table-column>
      <vxe-table-column field="desc" title="app.api.title.desc" min-width="200"></vxe-table-column>
      <vxe-table-column field="type" title="app.api.title.type" min-width="140"></vxe-table-column>
      <vxe-table-column field="enum" title="app.api.title.enum" min-width="150"></vxe-table-column>
      <vxe-table-column field="defVal" title="app.api.title.defVal" min-width="160"></vxe-table-column>
    </vxe-table>
    <h2>示例</h2>
    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="html">{{ demoCodes[1] }}</code>
      <code class="javascript">{{ demoCodes[2] }}</code>
      <code class="html">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        {
          name: 'add(code, callback)',
          desc: '添加一个',
          version: '',
          type: '',
          enum: '',
          defVal: 'code, callback',
          list: []
        },
        {
          name: 'mixin(map)',
          desc: '添加多个',
          version: '',
          type: '',
          enum: '',
          defVal: 'map',
          list: []
        },
        {
          name: 'delete(code)',
          desc: '删除',
          version: '',
          type: '',
          enum: '',
          defVal: 'name',
          list: []
        }
      ],
      demoCodes: [
        `
        <vxe-toolbar :buttons="toolbarButtons"></vxe-toolbar>

        <vxe-table
          border
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        VXETable.commands.add('exportBtn', (params) => {
          let { $table, code, button } = params
          $table.exportData()
        })

        export default {
          data () {
            return {
              tableData: [],
              toolbarButtons: [
                {
                  code: 'exportBtn',
                  name: '导出.csv'
                }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
        }
        `,
        `
        <button @click="printEvent">打印</button>
        <vxe-grid
          border
          resizable
          ref="xGrid"
          height="300"
          :columns="tableColumn"
          :data="tableData">
        </vxe-grid>
        `,
        `
        VXETable.commands.add('myPrint', (params) => {
          let { $table, code, button } = params
          $table.print()
        })

        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'Name' },
                { field: 'sex', title: 'Sex' },
                { field: 'address', title: 'Address' }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            printEvent () {
              this.$refs.xGrid.commitProxy('myPrint')
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>

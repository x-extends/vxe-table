<template>
  <div>
    <h2>全局工具栏按钮注册器</h2>
    <p class="tip">你可以很简单的将工具栏中常用的按钮注册成全局可复用的</p>
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
    <h3>示例</h3>
    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="html">{{ demoCodes[1] }}</code>
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
          desc: '添加',
          type: '',
          enum: '',
          defVal: 'code, callback',
          list: []
        },
        {
          name: 'mixin(map)',
          desc: '混合多个',
          type: '',
          enum: '',
          defVal: 'map',
          list: []
        },
        {
          name: 'delete(code)',
          desc: '删除',
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
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        VXETable.buttons.add('exportCSV', (params) => {
          let { $table } = params
          $table.exportCsv()
        })

        export default {
          data () {
            return {
              tableData: [],
              toolbarButtons: [
                {
                  code: 'exportCSV',
                  name: '导出.csv'
                }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
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

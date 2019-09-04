<template>
  <div>
    <p class="tip">树表格，使用自定义模板渲染</p>

    <vxe-table
      border
      resizable
      :tree-config="{children: 'children'}"
      :data="tableData">
      <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type">
        <template v-slot="{ row }">
          <span>{{ `类型：${row.type || '无'}` }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="date" title="Date" tree-node>
        <template v-slot="{ row }">
          <span>{{ $utils.toDateString(row.date, 'yyyy-MM-dd HH:mm:ss.S') }}</span>
        </template>
      </vxe-table-column>
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
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          :tree-config="{children: 'children'}"
          :data="tableData">
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type">
            <template v-slot="{ row }">
              <span>{{ \`类型：\${row.type || '无'}\` }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="date" title="Date" tree-node>
            <template v-slot="{ row }">
              <span>{{ $utils.toDateString(row.date, 'yyyy-MM-dd HH:mm:ss.S') }}</span>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = this.$utils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>

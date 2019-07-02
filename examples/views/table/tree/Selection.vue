<template>
  <div>
    <p>多选树表格</p>

    <vxe-table
      resizable
      :tree-config="{key: 'id', children: 'children'}"
      :data.sync="tableData"
      @select-change="selectChangeEvent">
      <vxe-table-column type="selection" prop="checked" width="120" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
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
          resizable
          :tree-config="{key: 'id', children: 'children'}"
          :data.sync="tableData"
          @select-change="selectChangeEvent">
          <vxe-table-column type="selection" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
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
          },
          methods: {
            selectChangeEvent ({ selection }) {
              console.info(\`勾选\${selection.length}个树形节点\`, selection)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    selectChangeEvent ({ selection }) {
      console.info(`勾选${selection.length}个树形节点`, selection)
    }
  }
}
</script>

<template>
  <div>
    <p>树表格，通过配置 <table-api-link prop="tree-config"/> 和指定列 <table-column-api-link prop="tree-node"/> 属性来开启树表格</p>
    <p>还可以通过 <table-api-link prop="trigger"/> 指定触发方式</p>

    <vxe-table
      border
      resizable
      :tree-config="{key: 'id', children: 'children'}"
      :data.sync="tableData">
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="size" label="Size"></vxe-table-column>
      <vxe-table-column prop="type" label="Type"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" tree-node></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>默认展开所有树节点，通过 <table-api-link prop="expand-config"/> 参数设置默认展开树节点</p>

    <vxe-table
      :data.sync="tableData"
      :tree-config="{key: 'id', children: 'children', expandAll: true}">
      <vxe-table-column type="index" width="160" label="序号" tree-node></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="size" label="Size"></vxe-table-column>
      <vxe-table-column prop="type" label="Type"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
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
          :tree-config="{key: 'id', children: 'children'}"
          :data.sync="tableData">
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="size" label="Size"></vxe-table-column>
          <vxe-table-column prop="type" label="Type"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" tree-node></vxe-table-column>
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
        `,
        `
        <vxe-table
          :data.sync="tableData"
          :tree-config="{key: 'id', children: 'children', expandAll: true}">
          <vxe-table-column type="index" width="120" label="序号" tree-node></vxe-table-column>
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="size" label="Size"></vxe-table-column>
          <vxe-table-column prop="type" label="Type"></vxe-table-column>
          <vxe-table-column prop="date" label="Date"></vxe-table-column>
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
    this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>

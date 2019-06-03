<template>
  <div>
    <p>可编辑树表格，还可以通过手动调用展开收起</p>

    <vxe-table-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTree.toggleTreeExpansion(tableData[0], true)">切换第一个</vxe-button>
        <vxe-button @click="$refs.xTree.setTreeExpansion(tableData[2], true)">展开第三个</vxe-button>
        <vxe-button @click="$refs.xTree.setAllTreeExpansion(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-table-toolbar>

    <vxe-table
      ref="xTree"
      :tree-config="{key: 'id', children: 'children'}"
      :edit-config="{trigger: 'click', mode: 'row'}"
      :data.sync="tableData">
      <vxe-table-column type="selection" width="120" tree-node></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="size" label="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="type" label="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">显示代码</p>

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
        <vxe-table-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTree.toggleTreeExpansion(tableData[0], true)">切换第一个</vxe-button>
            <vxe-button @click="$refs.xTree.setTreeExpansion(tableData[2], true)">展开第三个</vxe-button>
            <vxe-button @click="$refs.xTree.setAllTreeExpansion(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-table-toolbar>

        <vxe-table
          ref="xTree"
          :tree-config="{key: 'id', children: 'children'}"
          :edit-config="{trigger: 'click', mode: 'row'}"
          :data.sync="tableData">
          <vxe-table-column type="selection" width="120" tree-node></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="size" label="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="type" label="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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

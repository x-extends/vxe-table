<template>
  <div>
    <p class="tip">可编辑树表格，还可以通过手动调用展开收起<br><span class="red">注：树形结构默认不支持 insert 相关方法，如果要往子节点插入数据，你可以把表格当成一个子组件进行封装，自行操作数据源即可</span></p>

    <vxe-virtual-tree
      resizable
      row-key
      toolbar
      ref="xTree"
      row-id="id"
      :tree-config="{children: 'children'}"
      :edit-config="{trigger: 'click', mode: 'row'}"
      :checkbox-config="{labelField: 'id'}"
      :columns="tableColumn"
      :data="tableData">
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTree.toggleTreeExpansion(tableData[0], true)">切换第一个</vxe-button>
        <vxe-button @click="$refs.xTree.setTreeExpansion(tableData[2], true)">展开第三个</vxe-button>
        <vxe-button @click="$refs.xTree.setAllTreeExpansion(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-virtual-tree>

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
      tableColumn: [
        { type: 'checkbox', title: 'ID', treeNode: true },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        { field: 'size', title: 'Size', editRender: { name: 'input' } },
        { field: 'type', title: 'Type', editRender: { name: 'input' } },
        { field: 'date', title: 'Date', editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          resizable
          row-key
          toolbar
          ref="xTree"
          row-id="id"
          :tree-config="{children: 'children'}"
          :edit-config="{trigger: 'click', mode: 'row'}"
          :checkbox-config="{labelField: 'id'}"
          :columns="tableColumn"
          :data="tableData">
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTree.toggleTreeExpansion(tableData[0], true)">切换第一个</vxe-button>
            <vxe-button @click="$refs.xTree.setTreeExpansion(tableData[2], true)">展开第三个</vxe-button>
            <vxe-button @click="$refs.xTree.setAllTreeExpansion(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'checkbox', title: 'ID', treeNode: true },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                { field: 'size', title: 'Size', editRender: { name: 'input' } },
                { field: 'type', title: 'Type', editRender: { name: 'input' } },
                { field: 'date', title: 'Date', editRender: { name: 'input' } }
              ]
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

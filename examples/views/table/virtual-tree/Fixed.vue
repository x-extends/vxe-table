<template>
  <div>
    <p class="tip">树表格，固定列</p>

    <vxe-virtual-tree
      border
      resizable
      row-key
      ref="xVTree"
      row-id="id"
      :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
      :tree-config="{children: 'children'}"
      :checkbox-config="{labelField: 'id', checkField: 'checked', halfField: 'indeterminate'}"
      :columns="tableColumn"
      :data="tableData">
      <template v-slot:toolbar_buttons>
        <vxe-button @click="$refs.xVTree.toggleTreeExpand(tableData[0], true)">切换第一个</vxe-button>
        <vxe-button @click="$refs.xVTree.setTreeExpand(tableData[2], true)">展开第三个</vxe-button>
        <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xVTree.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      tableColumn: [
        { type: 'checkbox', title: 'ID', fixed: 'left', width: 280, treeNode: true },
        { field: 'name', title: 'Name', width: 300 },
        { field: 'size', title: 'Size', width: 300 },
        { field: 'type', title: 'Type', width: 300 },
        { field: 'date', title: 'Date', width: 300 }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          border
          resizable
          row-key
          ref="xVTree"
          row-id="id"
          :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
          :tree-config="{children: 'children'}"
          :checkbox-config="{labelField: 'id', checkField: 'checked', halfField: 'indeterminate'}"
          :columns="tableColumn"
          :data="tableData">
          <template v-slot:toolbar_buttons>
            <vxe-button @click="$refs.xVTree.toggleTreeExpand(tableData[0], true)">切换第一个</vxe-button>
            <vxe-button @click="$refs.xVTree.setTreeExpand(tableData[2], true)">展开第三个</vxe-button>
            <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xVTree.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'checkbox', title: 'ID', fixed: 'left', width: 280, treeNode: true },
                { field: 'name', title: 'Name', width: 300 },
                { field: 'size', title: 'Size', width: 300 },
                { field: 'type', title: 'Type', width: 300 },
                { field: 'date', title: 'Date', width: 300 }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  }
}
</script>

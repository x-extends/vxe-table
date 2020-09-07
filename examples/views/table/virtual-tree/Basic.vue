<template>
  <div>
    <p class="tip">
      虚拟树表格，具体兼容性看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-virtual-tree" target="_blank">vxe-table-plugin-virtual-tree</a> 插件的 API<br>
      <span class="red">(实现原理就是把一颗树结构平铺进行渲染，可以支持虚拟滚动，但是会失去部分功能)</span><br>
      通过配置 <virtual-tree-api-link prop="tree-config"/> 和指定列 <table-column-api-link prop="tree-node"/> 属性来开启树表格
    </p>

    <vxe-virtual-tree
      border
      resizable
      row-key
      toolbar
      ref="xVTree"
      :tree-config="{children: 'children'}"
      :columns="tableColumn1"
      :data="tableData1">
      <template v-slot:buttons>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xVTree.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">默认展开所有树节点，通过 <virtual-tree-api-link prop="tree-config"/>={<virtual-tree-api-link prop="expandAll"/>: true} 参数设置默认展开所有树节点</p>

    <vxe-virtual-tree
      border
      row-key
      row-id="id"
      :data="tableData2"
      :tree-config="{children: 'children', expandAll: true}"
      :columns="tableColumn2">
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData1: [],
      tableData2: [],
      tableColumn1: [
        { field: 'name', title: 'Name', treeNode: true },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      tableColumn2: [
        { type: 'seq', title: '序号', width: 280, treeNode: true },
        { field: 'name', title: 'Name' },
        {
          title: '基本信息',
          children: [
            { field: 'size', title: 'Size' },
            { field: 'type', title: 'Type' }
          ]
        },
        { field: 'date', title: 'Date' }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          border
          resizable
          row-key
          toolbar
          ref="xVTree"
          :tree-config="{children: 'children'}"
          :columns="tableColumn1"
          :data="tableData">
          <template v-slot:buttons>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
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
              tableColumn1: [
                { field: 'name', title: 'Name', treeNode: true },
                { field: 'size', title: 'Size' },
                { field: 'type', title: 'Type' },
                { field: 'date', title: 'Date' }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST
          },
          methods: {
            getTreeExpansionEvent () {
              let treeExpandRecords = this.$refs.xVTree.getTreeExpandRecords()
              this.$XModal.alert(treeExpandRecords.length)
            }
          }
        }
        `,
        `
        <vxe-virtual-tree
          border
          row-key
          row-id="id"
          :data="tableData"
          :tree-config="{children: 'children', expandAll: true}"
          :columns="tableColumn">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'seq', title: '序号', width: 280, treeNode: true },
                { field: 'name', title: 'Name' },
                {
                  title: '基本信息',
                  children: [
                    { field: 'size', title: 'Size' },
                    { field: 'type', title: 'Type' }
                  ]
                },
                { field: 'date', title: 'Date' }
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
    this.tableData1 = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
    this.tableData2 = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    getTreeExpansionEvent () {
      const treeExpandRecords = this.$refs.xVTree.getTreeExpandRecords()
      this.$XModal.alert(treeExpandRecords.length)
    }
  }
}
</script>

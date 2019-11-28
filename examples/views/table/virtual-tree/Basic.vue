<template>
  <div>
    <p class="tip">树表格（适用于大数据树结构），通过配置 <table-api-link prop="tree-config"/> 和指定列 <table-column-api-link prop="tree-node"/> 属性来开启树表格</p>

    <vxe-virtual-tree
      border
      resizable
      row-key
      toolbar
      ref="xTree"
      :tree-config="{children: 'children'}"
      :columns="tableColumn1"
      :data="tableData">
      <template v-slot:buttons>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xTree.setAllTreeExpansion(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">默认展开所有树节点，通过 <table-api-link prop="tree-config"/>={<table-api-link prop="expandAll"/>: true} 参数设置默认展开所有树节点</p>

    <vxe-virtual-tree
      border
      row-key
      row-id="id"
      :data="tableData"
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
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      tableColumn1: [
        { field: 'name', title: 'Name' },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date', treeNode: true }
      ],
      tableColumn2: [
        { type: 'index', title: '序号', width: 280, treeNode: true },
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
          ref="xTree"
          :tree-config="{children: 'children'}"
          :columns="tableColumn1"
          :data="tableData">
          <template v-slot:buttons>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
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
              tableColumn1: [
                { field: 'name', title: 'Name' },
                { field: 'size', title: 'Size' },
                { field: 'type', title: 'Type' },
                { field: 'date', title: 'Date', treeNode: true }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          },
          methods: {
            getTreeExpansionEvent () {
              let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
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
                { type: 'index', title: '序号', width: 280, treeNode: true },
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
  },
  methods: {
    getTreeExpansionEvent () {
      let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
      this.$XModal.alert(treeExpandRecords.length)
    }
  }
}
</script>

<template>
  <div>
    <p class="tip">
      树表格，通过配置 <table-api-link prop="tree-config"/> 和指定列 <table-column-api-link prop="tree-node"/> 属性来开启树表格，通过 <table-api-link prop="row-id"/> 指定主键，还可以通过 <table-api-link prop="trigger"/> 指定触发方式<br>
      <span class="red">(注：不支持大量数据，大数据你可以将树结构铺平为列表进行展示)</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xTree.setAllTreeExpansion(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      tree-config
      border="none"
      ref="xTree"
      :data="tableData"
      @toggle-tree-expand="toggleExpandChangeEvent">
      <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">默认展开树节点，通过 <table-api-link prop="tree-config"/>={<table-api-link prop="expandRowKeys"/>: []} 设置默认展开树节点的主键</p>

    <vxe-table
      resizable
      row-id="id"
      :tree-config="{children: 'children', expandRowKeys: defaultExpandKeys}"
      :data="tableData">
      <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">默认展开所有树节点，通过 <table-api-link prop="tree-config"/>={<table-api-link prop="expandAll"/>: true} 设置默认展开所有树节点</p>

    <vxe-table
      border
      row-id="id"
      :data="tableData"
      :tree-config="{children: 'children', expandAll: true}">
      <vxe-table-column type="seq" width="180" title="序号" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
      <vxe-table-column title="基本信息">
        <vxe-table-column field="size" title="Size"></vxe-table-column>
        <vxe-table-column field="type" title="Type"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      defaultExpandKeys: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
            <vxe-button @click="$refs.xTree.setAllTreeExpansion(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          tree-config
          border="none"
          ref="xTree"
          :data="tableData"
          @toggle-tree-expand="toggleExpandChangeEvent">
          <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
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
            toggleExpandChangeEvent ({ row, expanded }) {
              console.log('节点展开事件' + expanded)
            },
            getTreeExpansionEvent () {
              let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
              this.$XModal.alert(treeExpandRecords.length)
            }
          }
        }
        `,
        `
        <vxe-table
          resizable
          row-id="id"
          :tree-config="{children: 'children', expandRowKeys: defaultExpandKeys}"
          :data="tableData">
          <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              defaultExpandKeys: [],
            }
          },
          created () {
            this.defaultExpandKeys = ['30000']
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          }
        }
        `,
        `
        <vxe-table
          border
          row-id="id"
          :data="tableData"
          :tree-config="{children: 'children', expandAll: true}">
          <vxe-table-column type="seq" width="180" title="序号" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-column title="基本信息">
            <vxe-table-column field="size" title="Size"></vxe-table-column>
            <vxe-table-column field="type" title="Type"></vxe-table-column>
          </vxe-table-column>
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
          }
        }
        `
      ]
    }
  },
  created () {
    this.defaultExpandKeys = ['30000']
    this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    toggleExpandChangeEvent ({ row, expanded }) {
      console.log('节点展开事件' + expanded)
    },
    getTreeExpansionEvent () {
      let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
      this.$XModal.alert(treeExpandRecords.length)
    }
  }
}
</script>

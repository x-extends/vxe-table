<template>
  <div>
    <p>插入数据：树形结构默认不支持子节点插入</p>
    <p>如果要往子节点插入数据，你可以把表格当成一个子组件进行封装，自行操作数据源即可</p>

    <vxe-toolbar :data="tableData" :setting="{storage: false}">
      <template v-slot:buttons>
        <vxe-button @click="insertEvent()">插入第一行</vxe-button>
        <vxe-button @click="insertAtEvent()">插入指定行</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      ref="xTree"
      :tree-config="treeConfig"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data.sync="tableData">
      <vxe-table-column type="selection" width="120" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      treeConfig: {
        children: 'children'
      },
      demoCodes: [
        `
        <vxe-toolbar :data="tableData" :setting="{storage: false}">
          <template v-slot:buttons>
            <vxe-button @click="insertEvent()">插入第一行</vxe-button>
            <vxe-button @click="insertAtEvent()">插入指定行</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          ref="xTree"
          :tree-config="treeConfig"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data.sync="tableData">
          <vxe-table-column type="selection" width="120" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              treeConfig: {
                children: 'children'
              }
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          },
          methods: {
            insertEvent () {
              let xTree = this.$refs.xTree
              let row = xTree.createRow({
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd'),
                isNew: true
              })
              // 插入到第一行
              this.tableData.unshift(row)
            },
            insertAtEvent () {
              let xTree = this.$refs.xTree
              let row = xTree.createRow({
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd'),
                isNew: true
              })
              // 插入到 id 为 11000 的节点位置中
              let rowNode = XEUtils.findTree(this.tableData, row => row.id === '11000', this.treeConfig)
              if (rowNode) {
                rowNode.items.splice(rowNode.index, 0, row)
              }
            },
            getInsertEvent () {
              let insertRecords = XEUtils.filterTree(this.tableData, row => row.isNew, this.treeConfig)
              this.$XMsg.alert(insertRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    insertEvent () {
      let xTree = this.$refs.xTree
      let row = xTree.createRow({
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd'),
        isNew: true
      })
      // 插入到第一行
      this.tableData.unshift(row)
      xTree.refreshData().then(() => xTree.setActiveRow(row))
    },
    insertAtEvent () {
      let xTree = this.$refs.xTree
      let row = xTree.createRow({
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd'),
        isNew: true
      })
      // 插入到 id 为 11000 的节点位置中
      let rowNode = XEUtils.findTree(this.tableData, row => row.id === '11000', this.treeConfig)
      if (rowNode) {
        rowNode.items.splice(rowNode.index, 0, row)
        xTree.refreshData().then(() => xTree.setActiveRow(row))
      }
    },
    getInsertEvent () {
      let insertRecords = XEUtils.filterTree(this.tableData, row => row.isNew, this.treeConfig)
      this.$XMsg.alert(insertRecords.length)
    }
  }
}
</script>

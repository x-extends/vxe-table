<template>
  <div>
    <p class="tip">插入数据，简单的实现示例</p>

    <vxe-virtual-tree
      resizable
      row-key
      export-config
      ref="xVTree"
      row-id="id"
      :toolbar="{custom: true, slots: {buttons: 'toolbar_buttons'}}"
      :tree-config="{children: 'children'}"
      :edit-config="{trigger: 'click', mode: 'row'}"
      :data="tableData"
      :columns="tableColumn">
      <template v-slot:toolbar_buttons>
        <vxe-button @click="insertEvent()">插入第一行</vxe-button>
        <vxe-button @click="insertAtEvent()">插入指定行</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getSelectEvent">获取选中</vxe-button>
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
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      tableColumn: [
        { type: 'seq', width: 120, treeNode: true },
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
          export-config
          ref="xVTree"
          row-id="id"
          :toolbar="{custom: true, slots: {buttons: 'toolbar_buttons'}}"
          :tree-config="{children: 'children'}"
          :edit-config="{trigger: 'click', mode: 'row'}"
          :data="tableData"
          :columns="tableColumn">
          <template v-slot:toolbar_buttons>
            <vxe-button @click="insertEvent()">插入第一行</vxe-button>
            <vxe-button @click="insertAtEvent()">插入指定行</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getSelectEvent">获取选中</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'seq', width: 120, treeNode: true },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                { field: 'size', title: 'Size', editRender: { name: 'input' } },
                { field: 'type', title: 'Type', editRender: { name: 'input' } },
                { field: 'date', title: 'Date', editRender: { name: 'input' } }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST
          },
          methods: {
            insertEvent () {
              let xVTree = this.$refs.xVTree
              let record = {
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              xVTree.insert(record).then(({ row }) => xVTree.setActiveRow(row))
            },
            insertAtEvent () {
              let xVTree = this.$refs.xVTree
              let record = {
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              // 插入到第 3 行第 2 个子节点位置中
              xVTree.insertAt(record, this.tableData[2].children[1]).then(({ row }) => xVTree.setActiveRow(row))
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xVTree.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getSelectEvent () {
              let selectRecords = this.$refs.xVTree.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
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
      const xVTree = this.$refs.xVTree
      const record = {
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      xVTree.insert(record).then(({ row }) => xVTree.setActiveRow(row))
    },
    insertAtEvent () {
      const xVTree = this.$refs.xVTree
      const record = {
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      // 插入到第 3 行第 2 个子节点位置中
      xVTree.insertAt(record, this.tableData[2].children[1]).then(({ row }) => xVTree.setActiveRow(row))
    },
    getInsertEvent () {
      const insertRecords = this.$refs.xVTree.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getSelectEvent () {
      const selectRecords = this.$refs.xVTree.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    }
  }
}
</script>

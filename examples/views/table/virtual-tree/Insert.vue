<template>
  <div>
    <p class="tip">插入数据，简单的实现示例</p>

    <vxe-virtual-tree
      resizable
      row-key
      ref="xTree"
      row-id="id"
      :toolbar="{export: true, zoom: true, custom: true}"
      :tree-config="{children: 'children'}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data="tableData"
      :columns="tableColumn">
      <template v-slot:buttons>
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
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      tableColumn: [
        { type: 'checkbox', width: 120, treeNode: true },
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
          ref="xTree"
          row-id="id"
          :toolbar="{export: true, zoom: true, custom: true}"
          :tree-config="{children: 'children'}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data="tableData"
          :columns="tableColumn">
          <template v-slot:buttons>
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
                { type: 'checkbox', width: 120, treeNode: true },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                { field: 'size', title: 'Size', editRender: { name: 'input' } },
                { field: 'type', title: 'Type', editRender: { name: 'input' } },
                { field: 'date', title: 'Date', editRender: { name: 'input' } }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          },
          methods: {
            insertEvent () {
              let xTree = this.$refs.xTree
              let record = {
                name: '新数据',
                date: this.$utils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              xTree.insert(record).then(({ row }) => xTree.setActiveRow(row))
            },
            insertAtEvent () {
              let xTree = this.$refs.xTree
              let record = {
                name: '新数据',
                date: this.$utils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              // 插入到第 3 行第 2 个子节点位置中
              xTree.insertAt(record, this.tableData[2].children[1]).then(({ row }) => xTree.setActiveRow(row))
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTree.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getSelectEvent () {
              let selectRecords = this.$refs.xTree.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
            }
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
    insertEvent () {
      let xTree = this.$refs.xTree
      let record = {
        name: '新数据',
        date: this.$utils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      xTree.insert(record).then(({ row }) => xTree.setActiveRow(row))
    },
    insertAtEvent () {
      let xTree = this.$refs.xTree
      let record = {
        name: '新数据',
        date: this.$utils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      // 插入到第 3 行第 2 个子节点位置中
      xTree.insertAt(record, this.tableData[2].children[1]).then(({ row }) => xTree.setActiveRow(row))
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTree.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getSelectEvent () {
      let selectRecords = this.$refs.xTree.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    }
  }
}
</script>

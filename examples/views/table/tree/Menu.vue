<template>
  <div>
    <p>插入数据：树形结构默认不支持子节点插入</p>
    <p>如果要往子节点插入数据，你可以把表格当成一个子组件进行封装，自行操作数据源即可</p>

    <vxe-toolbar :data="tableData" :setting="{storage: false}">
      <template v-slot:buttons>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      ref="xTree"
      :tree-config="treeConfig"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data.sync="tableData"
      @context-menu-click="contextMenuClickEvent">
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
      headerMenus: [
        [
          {
            code: 'hideColumn',
            name: '隐藏列'
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'insertAt',
            name: '插入一行'
          }
        ]
      ],
      demoCodes: [
        `
        <vxe-toolbar :data="tableData" :setting="{storage: false}">
          <template v-slot:buttons>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          ref="xTree"
          :tree-config="treeConfig"
          :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data.sync="tableData"
          @context-menu-click="contextMenuClickEvent">
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
              },
              headerMenus: [
                [
                  {
                    code: 'hideColumn',
                    name: '隐藏列'
                  }
                ]
              ],
              bodyMenus: [
                [
                  {
                    code: 'insertAt',
                    name: '插入一行'
                  }
                ]
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          },
          methods: {
            insertAtEvent (row, column) {
              let xTree = this.$refs.xTree
              let newRow = xTree.createRow({
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd'),
                isNew: true
              })
              // 插入到指定节点位置中
              let rowNode = XEUtils.findTree(this.tableData, item => item === row, this.treeConfig)
              if (rowNode) {
                rowNode.items.splice(rowNode.index, 0, newRow)
                xTree.refreshData().then(() => xTree.setActiveCell(newRow, column.property))
              }
            },
            getInsertEvent () {
              let insertRecords = XEUtils.filterTree(this.tableData, item => item.isNew, this.treeConfig)
              this.$XMsg.alert(insertRecords.length)
            },
            contextMenuClickEvent ({ menu, row, column }) {
              let xTree = this.$refs.xTree
              switch (menu.code) {
                case 'hideColumn':
                  xTree.hideColumn(column)
                  break
                case 'insertAt':
                  this.insertAtEvent(row, column)
                  break
              }
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
    insertAtEvent (row, column) {
      let xTree = this.$refs.xTree
      let newRow = xTree.createRow({
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd'),
        isNew: true
      })
      // 插入到指定节点位置中
      let rowNode = XEUtils.findTree(this.tableData, item => item === row, this.treeConfig)
      if (rowNode) {
        rowNode.items.splice(rowNode.index, 0, newRow)
        xTree.refreshData().then(() => xTree.setActiveCell(newRow, column.property))
      }
    },
    getInsertEvent () {
      let insertRecords = XEUtils.filterTree(this.tableData, item => item.isNew, this.treeConfig)
      this.$XMsg.alert(insertRecords.length)
    },
    contextMenuClickEvent ({ menu, row, column }) {
      let xTree = this.$refs.xTree
      switch (menu.code) {
        case 'hideColumn':
          xTree.hideColumn(column)
          break
        case 'insertAt':
          this.insertAtEvent(row, column)
          break
      }
    }
  }
}
</script>

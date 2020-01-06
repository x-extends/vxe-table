<template>
  <div>
    <p class="tip">快捷菜单操作</p>

    <vxe-virtual-tree
      resizable
      row-key
      ref="xTree"
      row-id="id"
      :toolbar="{custom: true}"
      :tree-config="{children: 'children'}"
      :checkbox-config="{labelField: 'id'}"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, visibleMethod}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data="tableData"
      :columns="tableColumn"
      @context-menu-click="contextMenuClickEvent">
      <template v-slot:buttons>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
      </template>
    </vxe-virtual-tree>

    <pre>
      <code>
        | Arrow Up ↑ | 移动到上一个菜单选项 |
        | Arrow Down ↓ | 移动到下一个菜单选项 |
        | Arrow Left ← | 关闭二级菜单 |
        | Arrow Right → | 打开二级菜单 |
        | Esc | 关闭菜单选项 |
        | Enter | 选中当前菜单选项 |
        | Spacebar | 选中当前菜单选项 |
      </code>
    </pre>

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
        { type: 'checkbox', title: 'ID', width: 280, treeNode: true },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        { field: 'size', title: 'Size', editRender: { name: 'input' } },
        { field: 'type', title: 'Type', editRender: { name: 'input' } },
        { field: 'date', title: 'Date', editRender: { name: 'input' } }
      ],
      headerMenus: [
        [
          {
            code: 'hideColumn',
            name: '隐藏列',
            disabled: false
          },
          {
            code: 'showAllColumn',
            name: '取消所有隐藏列',
            disabled: false
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'insertAt',
            name: '插入一行',
            disabled: false
          },
          {
            code: 'expand',
            name: '展开节点',
            disabled: false
          },
          {
            code: 'contract',
            name: '收缩节点',
            disabled: false
          }
        ]
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          resizable
          row-key
          ref="xTree"
          row-id="id"
          :toolbar="{custom: true}"
          :tree-config="{children: 'children'}"
          :checkbox-config="{labelField: 'id'}"
          :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, visibleMethod}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data="tableData"
          :columns="tableColumn"
          @context-menu-click="contextMenuClickEvent">
          <template v-slot:buttons>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'checkbox', title: 'ID', width: 280, treeNode: true },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                { field: 'size', title: 'Size', editRender: { name: 'input' } },
                { field: 'type', title: 'Type', editRender: { name: 'input' } },
                { field: 'date', title: 'Date', editRender: { name: 'input' } }
              ],
              headerMenus: [
                [
                  {
                    code: 'hideColumn',
                    name: '隐藏列',
                    disabled: false
                  },
                  {
                    code: 'showAllColumn',
                    name: '取消所有隐藏列',
                    disabled: false
                  }
                ]
              ],
              bodyMenus: [
                [
                  {
                    code: 'insertAt',
                    name: '插入一行',
                    disabled: false
                  },
                  {
                    code: 'expand',
                    name: '展开节点',
                    disabled: false
                  },
                  {
                    code: 'contract',
                    name: '收缩节点',
                    disabled: false
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
              let record = {
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              // 插入到指定节点位置中
              xTree.insertAt(record, row).then(({ row }) => xTree.setActiveRow(row))
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTree.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            visibleMethod  ({ row, type }) {
              let xTree = this.$refs.xTree
              if (type === 'body') {
                this.bodyMenus.forEach(list => {
                  list.forEach(item => {
                    if (['expand', 'contract'].includes(item.code)) {
                      if (row.children && row.children.length) {
                        let isExpand = xTree.isTreeExpandByRow(row)
                        item.disabled = ['expand'].includes(item.code) ? isExpand : !isExpand
                      } else {
                        item.disabled = true
                      }
                    }
                  })
                })
              }
              return true
            },
            contextMenuClickEvent ({ menu, row, column }) {
              let xTree = this.$refs.xTree
              switch (menu.code) {
                case 'hideColumn':
                  xTree.hideColumn(column)
                  break
                case 'showAllColumn':
                  xTree.resetColumn()
                  break
                case 'insertAt':
                  this.insertAtEvent(row, column)
                  break
                case 'expand':
                  xTree.setTreeExpansion(row, true)
                  break
                case 'contract':
                  xTree.setTreeExpansion(row, false)
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
      let record = {
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      // 插入到指定节点位置中
      xTree.insertAt(record, row).then(({ row }) => xTree.setActiveRow(row))
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTree.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    visibleMethod  ({ row, type }) {
      let xTree = this.$refs.xTree
      if (type === 'body') {
        this.bodyMenus.forEach(list => {
          list.forEach(item => {
            if (['expand', 'contract'].includes(item.code)) {
              if (row.children && row.children.length) {
                let isExpand = xTree.isTreeExpandByRow(row)
                item.disabled = ['expand'].includes(item.code) ? isExpand : !isExpand
              } else {
                item.disabled = true
              }
            }
          })
        })
      }
      return true
    },
    contextMenuClickEvent ({ menu, row, column }) {
      let xTree = this.$refs.xTree
      switch (menu.code) {
        case 'hideColumn':
          xTree.hideColumn(column)
          break
        case 'showAllColumn':
          xTree.resetColumn()
          break
        case 'insertAt':
          this.insertAtEvent(row, column)
          break
        case 'expand':
          xTree.setTreeExpansion(row, true)
          break
        case 'contract':
          xTree.setTreeExpansion(row, false)
          break
      }
    }
  }
}
</script>

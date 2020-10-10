<template>
  <div>
    <p class="tip">快捷菜单操作</p>

    <vxe-toolbar custom></vxe-toolbar>

    <vxe-table
      resizable
      show-overflow
      keep-source
      ref="xTree"
      :tree-config="treeConfig"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, visibleMethod}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data="tableData"
      @context-menu-click="contextMenuClickEvent">
      <vxe-table-column type="checkbox" width="120" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

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
      treeConfig: {
        children: 'children'
      },
      headerMenus: [
        [
          { code: 'hideColumn', name: '隐藏列', disabled: false },
          { code: 'showAllColumn', name: '取消所有隐藏列', disabled: false }
        ]
      ],
      bodyMenus: [
        [
          { code: 'expand', name: '展开节点', disabled: false },
          { code: 'contract', name: '收缩节点', disabled: false }
        ]
      ],
      demoCodes: [
        `
        <vxe-toolbar custom></vxe-toolbar>

        <vxe-table
          resizable
          show-overflow
          keep-source
          ref="xTree"
          :tree-config="treeConfig"
          :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}, visibleMethod}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data="tableData"
          @context-menu-click="contextMenuClickEvent">
          <vxe-table-column type="checkbox" width="120" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
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
                  { code: 'hideColumn', name: '隐藏列', disabled: false },
                  { code: 'showAllColumn', name: '取消所有隐藏列', disabled: false }
                ]
              ],
              bodyMenus: [
                [
                  { code: 'expand', name: '展开节点', disabled: false },
                  { code: 'contract', name: '收缩节点', disabled: false }
                ]
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST
          },
          methods: {
            visibleMethod  ({ row, type }) {
              let xTree = this.$refs.xTree
              let treeConfig = this.treeConfig
              if (type === 'body') {
                this.bodyMenus.forEach(list => {
                  list.forEach(item => {
                    if (['expand', 'contract'].includes(item.code)) {
                      if (row[treeConfig.children] && row[treeConfig.children].length) {
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
                case 'expandOrFold':
                  xTree.toggleTreeExpand(row)
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
    visibleMethod  ({ row, type }) {
      const xTree = this.$refs.xTree
      const treeConfig = this.treeConfig
      if (type === 'body') {
        this.bodyMenus.forEach(list => {
          list.forEach(item => {
            if (['expand', 'contract'].includes(item.code)) {
              if (row[treeConfig.children] && row[treeConfig.children].length) {
                const isExpand = xTree.isTreeExpandByRow(row)
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
      const xTree = this.$refs.xTree
      switch (menu.code) {
        case 'hideColumn':
          xTree.hideColumn(column)
          break
        case 'showAllColumn':
          xTree.resetColumn()
          break
        case 'expand':
          xTree.setTreeExpand(row, true)
          break
        case 'contract':
          xTree.setTreeExpand(row, false)
          break
      }
    }
  }
}
</script>

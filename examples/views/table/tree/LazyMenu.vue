<template>
  <div>
    <p class="tip">
      树表格的懒加载和快捷菜单，通过调用 <table-api-link prop="clearTreeExpandLoaded"/> 方法清除加载完成状态，通过调用 <table-api-link prop="reloadTreeChilds"/> 方法重新加载子节点
    </p>

    <vxe-table
      border
      resizable
      ref="xTree"
      row-id="id"
      :loading="loading"
      :context-menu="{body: {options: bodyMenus}, visibleMethod}"
      :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
      :data="tableData"
      @context-menu-click="contextMenuClickEvent">
      <vxe-table-column field="name" title="Name" width="400" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      bodyMenus: [
        [
          {
            code: 'clearLoaded',
            name: '清除加载状态',
            disabled: false
          },
          {
            code: 'reloadNodes',
            name: '重新加载子节点',
            disabled: false
          },
          {
            code: 'expand',
            name: '展开节点',
            disabled: false
          },
          {
            code: 'contract',
            name: '收起节点',
            disabled: false
          }
        ]
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          ref="xTree"
          row-id="id"
          :loading="loading"
          :context-menu="{body: {options: bodyMenus}, visibleMethod}"
          :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
          :data="tableData"
          @context-menu-click="contextMenuClickEvent">
          <vxe-table-column field="name" title="Name" width="400" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              bodyMenus: [
                [
                  {
                    code: 'clearLoaded',
                    name: '清除加载状态',
                    disabled: false
                  },
                  {
                    code: 'reloadNodes',
                    name: '重新加载子节点',
                    disabled: false
                  },
                  {
                    code: 'expand',
                    name: '展开节点',
                    disabled: false
                  },
                  {
                    code: 'contract',
                    name: '收起节点',
                    disabled: false
                  }
                ]
              ]
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              XEAjax.get('/api/file/node/list', { parentId: null }).then(data => {
                this.tableData = data
                this.loading = false
              })
            },
            loadChildrenMethod ({ row }) {
              // 异步加载子节点
              return XEAjax.get('/api/file/node/list', { parentId: row.id })
            },
            visibleMethod  ({ row, type }) {
              let xTree = this.$refs.xTree
              if (type === 'body') {
                this.bodyMenus.forEach(list => {
                  list.forEach(item => {
                    if (['clearLoaded', 'reloadNodes'].includes(item.code)) {
                      item.disabled = !row.hasChild || !xTree.isTreeExpandLoaded(row)
                    } else if (['expand', 'contract'].includes(item.code)) {
                      if (row.hasChild) {
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
                case 'clearLoaded':
                  xTree.clearTreeExpandLoaded(row)
                  break
                case 'reloadNodes':
                  xTree.reloadTreeChilds(row)
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
        `
      ]
    }
  },
  created () {
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      XEAjax.get('/api/file/node/list', { parentId: null }).then(data => {
        this.tableData = data
        this.loading = false
      })
    },
    loadChildrenMethod ({ row }) {
      // 异步加载子节点
      return XEAjax.get('/api/file/node/list', { parentId: row.id })
    },
    visibleMethod  ({ row, type }) {
      const xTree = this.$refs.xTree
      if (type === 'body') {
        this.bodyMenus.forEach(list => {
          list.forEach(item => {
            if (['clearLoaded', 'reloadNodes'].includes(item.code)) {
              item.disabled = !row.hasChild || !xTree.isTreeExpandLoaded(row)
            } else if (['expand', 'contract'].includes(item.code)) {
              if (row.hasChild) {
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
    contextMenuClickEvent ({ menu, row }) {
      const xTree = this.$refs.xTree
      switch (menu.code) {
        case 'clearLoaded':
          xTree.clearTreeExpandLoaded(row)
          break
        case 'reloadNodes':
          xTree.reloadTreeChilds(row)
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

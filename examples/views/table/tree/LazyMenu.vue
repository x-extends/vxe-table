<template>
  <div>
    <p class="tip">
      树表格的懒加载和右键菜单，通过调用 <table-api-link prop="clearTreeExpandLoaded"/> 方法清除加载完成状态，通过调用 <table-api-link prop="reloadTreeExpand"/> 方法重新加载子节点
    </p>

    <vxe-table
      border
      resizable
      ref="xTree"
      row-id="id"
      :menu-config="{body: {options: bodyMenus}, visibleMethod}"
      :tree-config="{transform: true, lazy: true, hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
      :data="tableData"
      @menu-click="contextMenuClickEvent">
      <vxe-column field="name" title="Name" width="400" tree-node></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="type" title="Type"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
        { id: 23666, parentId: null, name: 'Test23', type: 'mp4', size: null, date: '2021-01-02', hasChild: true },
        { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
      ],
      bodyMenus: [
        [
          { code: 'clearLoaded', name: '清除加载状态', disabled: false },
          { code: 'reloadNodes', name: '重新加载子节点', disabled: false },
          { code: 'expand', name: '展开节点', disabled: false },
          { code: 'contract', name: '收起节点', disabled: false }
        ]
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          ref="xTree"
          row-id="id"
          :menu-config="{body: {options: bodyMenus}, visibleMethod}"
          :tree-config="{transform: true, lazy: true, hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
          :data="tableData"
          @menu-click="contextMenuClickEvent">
          <vxe-column field="name" title="Name" width="400" tree-node></vxe-column>
          <vxe-column field="size" title="Size"></vxe-column>
          <vxe-column field="type" title="Type"></vxe-column>
          <vxe-column field="date" title="Date"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
                { id: 23666, parentId: null, name: 'Test23', type: 'mp4', size: null, date: '2021-01-02', hasChild: true },
                { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
              ],
              bodyMenus: [
                [
                  { code: 'clearLoaded', name: '清除加载状态', disabled: false },
                  { code: 'reloadNodes', name: '重新加载子节点', disabled: false },
                  { code: 'expand', name: '展开节点', disabled: false },
                  { code: 'contract', name: '收起节点', disabled: false }
                ]
              ]
            }
          },
          methods: {
            loadChildrenMethod ({ row }) {
              // 异步加载子节点
              return new Promise(resolve => {
                setTimeout(() => {
                  const childs = [
                    { id: row.id + 100000, parentId: row.id, name: row.name + 'Test45', type: 'mp4', size: null, date: '2021-10-03', hasChild: true },
                    { id: row.id + 150000, parentId: row.id, name: row.name + 'Test56', type: 'mp3', size: null, date: '2021-07-09', hasChild: false }
                  ]
                  resolve(childs)
                }, 500)
              })
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
                  xTree.reloadTreeExpand(row)
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
  methods: {
    loadChildrenMethod ({ row }) {
      // 异步加载子节点
      return new Promise(resolve => {
        setTimeout(() => {
          const childs = [
            { id: row.id + 100000, parentId: row.id, name: row.name + 'Test45', type: 'mp4', size: null, date: '2021-10-03', hasChild: true },
            { id: row.id + 150000, parentId: row.id, name: row.name + 'Test56', type: 'mp3', size: null, date: '2021-07-09', hasChild: false }
          ]
          resolve(childs)
        }, 500)
      })
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
          xTree.reloadTreeExpand(row)
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

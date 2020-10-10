<template>
  <div>
    <p class="tip">懒加载树表格、数据代理、快捷菜单</p>

    <vxe-grid
      border
      show-overflow
      resizable
      keep-source
      ref="xGrid"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="{slots: {buttons: 'toolbar_buttons'}}"
      :context-menu="{body: {options: bodyMenus}, visibleMethod}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
      @context-menu-click="contextMenuClickEvent">
      <template v-slot:toolbar_buttons>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableProxy: {
        ajax: {
          // 查询根节点
          query: () => XEAjax.get('/api/file/node/list', { parentId: null })
        }
      },
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
      tableColumn: [
        { field: 'id', title: 'ID', width: 180, treeNode: true },
        { field: 'name', title: '名称', editRender: { name: 'input' } },
        { field: 'size', title: '大小', editRender: { name: 'input' } },
        { field: 'createTime', title: '创建时间', formatter: this.formatterDate },
        { field: 'updateTime', title: '修改时间', formatter: this.formatterDate }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          show-overflow
          resizable
          keep-source
          ref="xGrid"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="{slots: {buttons: 'toolbar_buttons'}}"
          :context-menu="{body: {options: bodyMenus}, visibleMethod}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
          @context-menu-click="contextMenuClickEvent">
          <template v-slot:toolbar_buttons>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                ajax: {
                  // 查询根节点
                  query: () => XEAjax.get('/api/file/node/list', { parentId: null })
                }
              },
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
              tableColumn: [
                { field: 'id', title: 'ID', width: 180, treeNode: true },
                { field: 'name', title: '名称', editRender: { name: 'input' } },
                { field: 'size', title: '大小', editRender: { name: 'input' } },
                { field: 'createTime', title: '创建时间', formatter: this.formatterDate },
                { field: 'updateTime', title: '修改时间', formatter: this.formatterDate }
              ]
            }
          },
          methods: {
            formatterDate ({ cellValue }) {
              return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
            },
            loadChildrenMethod ({ row }) {
              // 异步加载子节点
              return XEAjax.get('/api/file/node/list', { parentId: row.id })
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xGrid.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
            },
            visibleMethod  ({ row, type }) {
              let xGrid = this.$refs.xGrid
              if (type === 'body') {
                this.bodyMenus.forEach(list => {
                  list.forEach(item => {
                    if (['clearLoaded', 'reloadNodes'].includes(item.code)) {
                      item.disabled = !row.hasChild || !xGrid.isTreeExpandLoaded(row)
                    } else if (['expand', 'contract'].includes(item.code)) {
                      if (row.hasChild) {
                        let isExpand = xGrid.isTreeExpandByRow(row)
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
              let xGrid = this.$refs.xGrid
              switch (menu.code) {
                case 'clearLoaded':
                  xGrid.clearTreeExpandLoaded(row)
                  break
                case 'reloadNodes':
                  xGrid.reloadTreeChilds(row)
                  break
                case 'expand':
                  xGrid.setTreeExpand(row, true)
                  break
                case 'contract':
                  xGrid.setTreeExpand(row, false)
                  break
              }
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatterDate ({ cellValue }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
    },
    loadChildrenMethod ({ row }) {
      // 异步加载子节点
      return XEAjax.get('/api/file/node/list', { parentId: row.id })
    },
    getUpdateEvent () {
      const updateRecords = this.$refs.xGrid.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    },
    visibleMethod  ({ row, type }) {
      const xGrid = this.$refs.xGrid
      if (type === 'body') {
        this.bodyMenus.forEach(list => {
          list.forEach(item => {
            if (['clearLoaded', 'reloadNodes'].includes(item.code)) {
              item.disabled = !row.hasChild || !xGrid.isTreeExpandLoaded(row)
            } else if (['expand', 'contract'].includes(item.code)) {
              if (row.hasChild) {
                const isExpand = xGrid.isTreeExpandByRow(row)
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
      const xGrid = this.$refs.xGrid
      switch (menu.code) {
        case 'clearLoaded':
          xGrid.clearTreeExpandLoaded(row)
          break
        case 'reloadNodes':
          xGrid.reloadTreeChilds(row)
          break
        case 'expand':
          xGrid.setTreeExpand(row, true)
          break
        case 'contract':
          xGrid.setTreeExpand(row, false)
          break
      }
    }
  }
}
</script>

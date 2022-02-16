<template>
  <div>
    <p class="tip">
      树表格的懒加载和右键菜单，通过调用 <table-api-link prop="clearTreeExpandLoaded"/> 方法清除加载完成状态，通过调用 <table-api-link prop="reloadTreeExpand"/> 方法重新加载子节点
    </p>

    <vxe-table
      border
      resizable
      ref="xTree1"
      :row-config="{keyField: 'id'}"
      :menu-config="demo1.tableMenu"
      :tree-config="demo1.treeConfig"
      :data="demo1.tableData"
      @menu-click="contextMenuClickEvent">
      <vxe-column field="name" title="Name" width="400" tree-node></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="type" title="Type"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance, VxeTablePropTypes, VxeTableEvents } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTree1 = ref({} as VxeTableInstance)

    const demo1 = reactive({
      treeConfig: {
        lazy: true,
        transform: true,
        hasChild: 'hasChild',
        loadMethod ({ row }) {
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
        }
      } as VxeTablePropTypes.TreeConfig,
      tableMenu: {
        body: {
          options: [
            [
              { code: 'clearLoaded', name: '清除加载状态', disabled: false },
              { code: 'reloadNodes', name: '重新加载子节点', disabled: false },
              { code: 'expand', name: '展开节点', disabled: false },
              { code: 'contract', name: '收起节点', disabled: false }
            ]
          ]
        },
        visibleMethod ({ row, type, options }) {
          const $table = xTree1.value
          if (type === 'body') {
            options.forEach(list => {
              list.forEach(item => {
                if (item.code === 'expand' || item.code === 'contract') {
                  if (row && row.hasChild) {
                    const isExpand = $table.isTreeExpandByRow(row)
                    item.disabled = item.code === 'expand' ? isExpand : !isExpand
                  } else {
                    item.disabled = true
                  }
                }
              })
            })
          }
          return true
        }
      } as VxeTablePropTypes.MenuConfig,
      tableData: [
        { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
        { id: 23666, parentId: null, name: 'Test23', type: 'mp4', size: null, date: '2021-01-02', hasChild: true },
        { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
      ] as any[]
    })

    const contextMenuClickEvent: VxeTableEvents.MenuClick = ({ menu, row }) => {
      const $table = xTree1.value
      switch (menu.code) {
        case 'clearLoaded':
          $table.clearTreeExpandLoaded(row)
          break
        case 'reloadNodes':
          $table.reloadTreeExpand(row)
          break
        case 'expand':
          $table.setTreeExpand(row, true)
          break
        case 'contract':
          $table.setTreeExpand(row, false)
          break
      }
    }

    return {
      xTree1,
      demo1,
      contextMenuClickEvent,
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          ref="xTree1"
          row-id="id"
          :menu-config="demo1.tableMenu"
          :tree-config="demo1.treeConfig"
          :data="demo1.tableData"
          @menu-click="contextMenuClickEvent">
          <vxe-column field="name" title="Name" width="400" tree-node></vxe-column>
          <vxe-column field="size" title="Size"></vxe-column>
          <vxe-column field="type" title="Type"></vxe-column>
          <vxe-column field="date" title="Date"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeTablePropTypes, VxeTableEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTree1 = ref({} as VxeTableInstance)

            const demo1 = reactive({
              treeConfig: {
                lazy: true,
                transform: true,
                hasChild: 'hasChild',
                loadMethod ({ row }) {
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
                }
              } as VxeTablePropTypes.TreeConfig,
              tableMenu: {
                body: {
                  options: [
                    [
                      { code: 'clearLoaded', name: '清除加载状态', disabled: false },
                      { code: 'reloadNodes', name: '重新加载子节点', disabled: false },
                      { code: 'expand', name: '展开节点', disabled: false },
                      { code: 'contract', name: '收起节点', disabled: false }
                    ]
                  ]
                },
                visibleMethod ({ row, type, options }) {
                  const $table = xTree1.value
                  const treeConfig = demo1.treeConfig
                  if (type === 'body') {
                    options.forEach(list => {
                      list.forEach(item => {
                        if (item.code === 'expand' || item.code === 'contract') {
                          if (row && treeConfig.children && row[treeConfig.children] && row[treeConfig.children].length) {
                            const isExpand = $table.isTreeExpandByRow(row)
                            item.disabled = item.code === 'expand' ? isExpand : !isExpand
                          } else {
                            item.disabled = true
                          }
                        }
                      })
                    })
                  }
                  return true
                }
              } as VxeTablePropTypes.MenuConfig,
              tableData: [
                { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
                { id: 23666, parentId: null, name: 'Test23', type: 'mp4', size: null, date: '2021-01-02', hasChild: true },
                { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
              ] as any[]
            })

            const contextMenuClickEvent: VxeTableEvents.MenuClick = ({ menu, row }) => {
              const $table = xTree1.value
              switch (menu.code) {
                case 'clearLoaded':
                  $table.clearTreeExpandLoaded(row)
                  break
                case 'reloadNodes':
                  $table.reloadTreeExpand(row)
                  break
                case 'expand':
                  $table.setTreeExpand(row, true)
                  break
                case 'contract':
                  $table.setTreeExpand(row, false)
                  break
              }
            }

            return {
              xTree1,
              demo1,
              contextMenuClickEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>

<template>
  <div>
    <p class="tip">懒加载树表格、数据代理、右键菜单</p>

    <vxe-grid ref="xGrid" v-bind="gridOptions" @menu-click="contextMenuClickEvent">
      <template #toolbar_buttons>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-grid>

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
    let dataId = 1
    return {
      gridOptions: {
        border: true,
        showOverflow: true,
        resizable: true,
        keepSource: true,
        toolbarConfig: {
          slots: {
            buttons: 'toolbar_buttons'
          }
        },
        menuConfig: {
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
          visibleMethod: this.visibleMethod
        },
        editConfig: {
          trigger: 'click',
          mode: 'row',
          showStatus: true
        },
        treeConfig: {
          lazy: true,
          children: 'children',
          hasChild: 'hasChild', // 设置是否有子节点标识
          loadMethod ({ row }) {
            // 模拟后台接口
            return new Promise(resolve => {
              setTimeout(() => {
                dataId++
                const list = [
                  { id: row.id + dataId + 1, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                  { id: row.id + dataId + 2, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true }
                ]
                resolve(list)
              }, 500)
            })
          }
        },
        proxyConfig: {
          ajax: {
            query: () => {
              // 模拟后台接口
              return new Promise(resolve => {
                setTimeout(() => {
                  const list = [
                    { id: 10000000, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                    { id: 20000000, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
                    { id: 30000000, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01', hasChild: true },
                    { id: 40000000, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
                  ]
                  resolve(list)
                }, 500)
              })
            }
          }
        },
        columns: [
          { field: 'id', title: 'ID', treeNode: true },
          { field: 'name', title: '名称', width: 300, editRender: { name: 'input' } },
          { field: 'size', title: '大小', width: 100, editRender: { name: 'input' } },
          { field: 'type', title: '类型', width: 100, editRender: { name: 'input' } },
          { field: 'date', title: '时间', width: 200 }
        ]
      },
      demoCodes: [
        `
        <vxe-grid ref="xGrid" v-bind="gridOptions" @menu-click="contextMenuClickEvent">
          <template #toolbar_buttons>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            let dataId = 1
            return {
              gridOptions: {
                border: true,
                showOverflow: true,
                resizable: true,
                keepSource: true,
                toolbarConfig: {
                  slots: {
                    buttons: 'toolbar_buttons'
                  }
                },
                menuConfig: {
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
                  visibleMethod: this.visibleMethod
                },
                editConfig: {
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true
                },
                treeConfig: {
                  lazy: true,
                  children: 'children',
                  hasChild: 'hasChild', // 设置是否有子节点标识
                  loadMethod ({ row }) {
                    // 模拟后台接口
                    return new Promise(resolve => {
                      setTimeout(() => {
                        dataId++
                        const list = [
                          { id: row.id + dataId + 1, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                          { id: row.id + dataId + 2, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true }
                        ]
                        resolve(list)
                      }, 500)
                    })
                  }
                },
                proxyConfig: {
                  ajax: {
                    query: () => {
                      // 模拟后台接口
                      return new Promise(resolve => {
                        setTimeout(() => {
                          const list = [
                            { id: 10000000, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                            { id: 20000000, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
                            { id: 30000000, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01', hasChild: true },
                            { id: 40000000, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
                          ]
                          resolve(list)
                        }, 500)
                      })
                    }
                  }
                },
                columns: [
                  { field: 'id', title: 'ID', treeNode: true },
                  { field: 'name', title: '名称', width: 300, editRender: { name: 'input' } },
                  { field: 'size', title: '大小', width: 100, editRender: { name: 'input' } },
                  { field: 'type', title: '类型', width: 100, editRender: { name: 'input' } },
                  { field: 'date', title: '时间', width: 200 }
                ]
              }
            }
          },
          methods: {
            getUpdateEvent () {
              const $grid = this.$refs.xGrid
              const updateRecords = $grid.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
            },
            visibleMethod  ({ row, type }) {
              const $grid = this.$refs.xGrid
              if (type === 'body') {
                this.bodyMenus.forEach(list => {
                  list.forEach(item => {
                    if (['clearLoaded', 'reloadNodes'].includes(item.code)) {
                      item.disabled = !row.hasChild || !$grid.isTreeExpandLoaded(row)
                    } else if (['expand', 'contract'].includes(item.code)) {
                      if (row.hasChild) {
                        const isExpand = $grid.isTreeExpandByRow(row)
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
              const $grid = this.$refs.xGrid
              switch (menu.code) {
                case 'clearLoaded':
                  $grid.clearTreeExpandLoaded(row)
                  break
                case 'reloadNodes':
                  $grid.reloadTreeExpand(row)
                  break
                case 'expand':
                  $grid.setTreeExpand(row, true)
                  break
                case 'contract':
                  $grid.setTreeExpand(row, false)
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
    getUpdateEvent () {
      const $grid = this.$refs.xGrid
      const updateRecords = $grid.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    },
    visibleMethod  ({ row, type }) {
      const $grid = this.$refs.xGrid
      if (type === 'body') {
        this.bodyMenus.forEach(list => {
          list.forEach(item => {
            if (['clearLoaded', 'reloadNodes'].includes(item.code)) {
              item.disabled = !row.hasChild || !$grid.isTreeExpandLoaded(row)
            } else if (['expand', 'contract'].includes(item.code)) {
              if (row.hasChild) {
                const isExpand = $grid.isTreeExpandByRow(row)
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
      const $grid = this.$refs.xGrid
      switch (menu.code) {
        case 'clearLoaded':
          $grid.clearTreeExpandLoaded(row)
          break
        case 'reloadNodes':
          $grid.reloadTreeExpand(row)
          break
        case 'expand':
          $grid.setTreeExpand(row, true)
          break
        case 'contract':
          $grid.setTreeExpand(row, false)
          break
      }
    }
  }
}
</script>

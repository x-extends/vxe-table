<template>
  <div>
    <p class="tip">懒加载树表格、数据代理</p>

    <vxe-grid v-bind="gridOptions"></vxe-grid>

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
        resizable: true,
        treeConfig: {
          lazy: true,
          transform: true,
          rowField: 'id',
          parentField: 'parentId',
          hasChild: 'hasChild', // 设置是否有子节点标识
          loadMethod ({ row }) {
            // 模拟后台接口
            return new Promise(resolve => {
              setTimeout(() => {
                dataId++
                const list = [
                  { id: row.id + dataId + 1, parentId: row.id, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                  { id: row.id + dataId + 2, parentId: row.id, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true }
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
                    { id: 10000000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                    { id: 20000000, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
                    { id: 30000000, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01', hasChild: true },
                    { id: 40000000, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
                  ]
                  resolve(list)
                }, 500)
              })
            }
          }
        },
        columns: [
          { field: 'id', title: 'ID', treeNode: true },
          { field: 'name', title: '名称', width: 300 },
          { field: 'size', title: '大小', width: 100 },
          { field: 'type', title: '类型', width: 100 },
          { field: 'date', title: '时间', width: 200 }
        ]
      },
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions"></vxe-grid>
        `,
        `
        export default {
          data () {
            let dataId = 1
            return {
              gridOptions: {
                border: true,
                resizable: true,
                treeConfig: {
                  lazy: true,
                  transform: true,
                  rowField: 'id',
                  parentField: 'parentId',
                  hasChild: 'hasChild', // 设置是否有子节点标识
                  loadMethod ({ row }) {
                    // 模拟后台接口
                    return new Promise(resolve => {
                      setTimeout(() => {
                        dataId++
                        const list = [
                          { id: row.id + dataId + 1, parentId: row.id, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                          { id: row.id + dataId + 2, parentId: row.id, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true }
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
                            { id: 10000000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                            { id: 20000000, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
                            { id: 30000000, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01', hasChild: true },
                            { id: 40000000, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
                          ]
                          resolve(list)
                        }, 500)
                      })
                    }
                  }
                },
                columns: [
                  { field: 'id', title: 'ID', treeNode: true },
                  { field: 'name', title: '名称', width: 300 },
                  { field: 'size', title: '大小', width: 100 },
                  { field: 'type', title: '类型', width: 100 },
                  { field: 'date', title: '时间', width: 200 }
                ]
              }
            }
          }
        }
        `
      ]
    }
  }
}
</script>

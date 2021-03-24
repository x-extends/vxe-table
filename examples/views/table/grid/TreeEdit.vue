<template>
  <div>
    <p class="tip">树表格、工具栏</p>

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
    return {
      gridOptions: {
        resizable: true,
        showOverflow: true,
        highlightHoverRow: true,
        keepSource: true,
        rowId: 'id',
        treeConfig: {},
        exportConfig: {},
        toolbarConfig: {
          buttons: [
            { code: 'reload', name: 'app.body.button.refresh' },
            { code: 'mark_cancel', name: 'app.body.button.markCancel' },
            { code: 'save', name: 'app.body.button.save' }
          ],
          export: true,
          zoom: true,
          custom: true
        },
        checkboxConfig: {
          labelField: 'id'
        },
        editConfig: {
          trigger: 'click',
          mode: 'row',
          showStatus: true
        },
        proxyConfig: {
          props: {
            message: 'msg' // 设置保存成功后提示消息字段
          },
          ajax: {
            query: () => {
              // 模拟后台接口
              return new Promise(resolve => {
                setTimeout(() => {
                  const list = [
                    { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
                    {
                      id: 1005,
                      name: 'Test2',
                      type: 'mp4',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                        { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
                        {
                          id: 10053,
                          name: 'vxe-table 从入门到放弃96',
                          type: 'avi',
                          size: null,
                          date: '2021-04-01',
                          children: [
                            { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                            { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                            { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                          ]
                        }
                      ]
                    },
                    { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                    { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
                  ]
                  resolve(list)
                }, 500)
              })
            },
            save: ({ body }) => {
              const { updateRecords, pendingRecords } = body
              // 模拟后台接口
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve({
                    msg: `保存成功，修改 ${updateRecords.length} 条，标记删除 ${pendingRecords.length} 条`
                  })
                }, 500)
              })
            }
          }
        },
        columns: [
          { type: 'checkbox', title: '全选', width: 120 },
          { field: 'name', title: '名称', width: 220, treeNode: true, editRender: { name: 'input' } },
          { field: 'size', title: '大小', editRender: { name: 'input' } },
          { field: 'createTime', title: 'app.body.label.createTime', editRender: { name: '$input', props: { type: 'date', labelFormat: 'yyyy-MM-dd HH:mm:ss' } } },
          { field: 'updateTime', title: 'app.body.label.updateTime', editRender: { name: '$input', props: { type: 'date', labelFormat: 'yyyy-MM-dd HH:mm:ss' } } }
        ]
      },
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              gridOptions: {
                resizable: true,
                showOverflow: true,
                highlightHoverRow: true,
                keepSource: true,
                rowId: 'id',
                treeConfig: {},
                exportConfig: {},
                toolbarConfig: {
                  buttons: [
                    { code: 'reload', name: 'app.body.button.refresh' },
                    { code: 'mark_cancel', name: 'app.body.button.markCancel' },
                    { code: 'save', name: 'app.body.button.save' }
                  ],
                  export: true,
                  zoom: true,
                  custom: true
                },
                checkboxConfig: {
                  labelField: 'id'
                },
                editConfig: {
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true
                },
                proxyConfig: {
                  props: {
                    message: 'msg' // 设置保存成功后提示消息字段
                  },
                  ajax: {
                    query: () => {
                      // 模拟后台接口
                      return new Promise(resolve => {
                        setTimeout(() => {
                          const list = [
                            { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
                            {
                              id: 1005,
                              name: 'Test2',
                              type: 'mp4',
                              size: null,
                              date: '2021-04-01',
                              children: [
                                { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                                { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
                                {
                                  id: 10053,
                                  name: 'vxe-table 从入门到放弃96',
                                  type: 'avi',
                                  size: null,
                                  date: '2021-04-01',
                                  children: [
                                    { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                                    { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                                    { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                                  ]
                                }
                              ]
                            },
                            { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                            { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
                          ]
                          resolve(list)
                        }, 500)
                      })
                    },
                    save: ({ body }) => {
                      const { updateRecords, pendingRecords } = body
                      // 模拟后台接口
                      return new Promise(resolve => {
                        setTimeout(() => {
                          resolve({
                            msg: \`保存成功，修改 \${updateRecords.length} 条，标记删除 \${pendingRecords.length} 条\`
                          })
                        }, 500)
                      })
                    }
                  }
                },
                columns: [
                  { type: 'checkbox', title: '全选', width: 120 },
                  { field: 'name', title: '名称', width: 220, treeNode: true, editRender: { name: 'input' } },
                  { field: 'size', title: '大小', editRender: { name: 'input' } },
                  { field: 'createTime', title: 'app.body.label.createTime', editRender: { name: '$input', props: { type: 'date', labelFormat: 'yyyy-MM-dd HH:mm:ss' } } },
                  { field: 'updateTime', title: 'app.body.label.updateTime', editRender: { name: '$input', props: { type: 'date', labelFormat: 'yyyy-MM-dd HH:mm:ss' } } }
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

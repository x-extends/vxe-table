<template>
  <div>
    <p class="tip">自定义工具栏按钮图标，可以局部替换也可以 <router-link :to="{name: 'StartIcons'}">全部替换</router-link></p>

    <vxe-grid
      border
      resizable
      height="500"
      :pager-config="tablePage"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tablePage: {
        pageSize: 15
      },
      tableProxy: {
        props: {
          result: 'data.result',
          total: 'data.page.total'
        },
        ajax: {
          // page 对象： { pageSize, currentPage }
          query: ({ page }) => this.$ajax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`),
          // body 对象： { removeRecords }
          delete: ({ body }) => this.$ajax.post('/api/user/save', body),
          // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
          save: ({ body }) => this.$ajax.post('/api/user/save', body)
        }
      },
      tableToolbar: {
        buttons: [
          { code: 'insert_actived', name: '新增', icon: 'fa fa-plus' },
          {
            code: 'mark_cancel',
            name: 'app.body.button.markCancel',
            icon: 'fa fa-bookmark-o',
            dropdowns: [
              { code: 'delete_selection', name: 'app.body.button.deleteSelectedRecords', icon: 'fa fa-trash-o' },
              { code: 'remove_selection', name: '移除数据', icon: 'fa fa-remove' }
            ]
          },
          { code: 'save', name: 'app.body.button.save', icon: 'fa fa-save' },
          {
            name: '导入导出',
            icon: 'fa fa-file',
            dropdowns: [
              { code: 'import', name: '高级导入', icon: 'fa fa-cloud-upload' },
              { code: 'export', name: '高级导出', icon: 'fa fa-cloud-download' }
            ]
          }
        ],
        resizable: true,
        refresh: {
          icon: 'fa fa-refresh',
          iconLoading: 'fa fa-spinner fa-spin'
        },
        import: {
          icon: 'fa fa-upload'
        },
        export: {
          icon: 'fa fa-download'
        },
        zoom: {
          iconIn: 'fa fa-arrows-alt',
          iconOut: 'fa fa-expand'
        },
        setting: {
          icon: 'fa fa-cog'
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'index', width: 60 },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
        { field: 'role', title: 'Role', editRender: { name: 'input' } },
        { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          height="500"
          :pager-config="tablePage"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="tableToolbar"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tablePage: {
                pageSize: 15
              },
              tableProxy: {
                // 配置响应的数据属性
                props: {
                  result: 'data.result',
                  total: 'data.page.total'
                },
                ajax: {
                  // page 对象： { pageSize, currentPage }
                  query: ({ page }) => this.$ajax.get(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`), // 模拟请求
                  // body 对象： { removeRecords }
                  delete: ({ body }) => this.$ajax.post('/api/user/save', body),
                  // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
                  save: ({ body }) => this.$ajax.post('/api/user/save', body)
                }
              },
              tableToolbar: {
                buttons: [
                  { code: 'insert_actived', name: '新增', icon: 'fa fa-plus' },
                  {
                    code: 'mark_cancel',
                    name: 'app.body.button.markCancel',
                    icon: 'fa fa-bookmark-o',
                    dropdowns: [
                      { code: 'delete_selection', name: 'app.body.button.deleteSelectedRecords', icon: 'fa fa-trash-o' },
                      { code: 'remove_selection', name: '移除数据', icon: 'fa fa-remove' }
                    ]
                  },
                  { code: 'save', name: 'app.body.button.save', icon: 'fa fa-save' },
                  {
                    name: '导入导出',
                    icon: 'fa fa-file',
                    dropdowns: [
                      { code: 'import', name: '高级导入', icon: 'fa fa-cloud-upload' },
                      { code: 'export', name: '高级导出', icon: 'fa fa-cloud-download' }
                    ]
                  }
                ],
                resizable: true,
                refresh: {
                  icon: 'fa fa-refresh',
                  iconLoading: 'fa fa-spinner fa-spin'
                },
                import: {
                  icon: 'fa fa-upload'
                },
                export: {
                  icon: 'fa fa-download'
                },
                zoom: {
                  iconIn: 'fa fa-arrows-alt',
                  iconOut: 'fa fa-expand'
                },
                setting: {
                  icon: 'fa fa-cog'
                }
              },
              tableColumn: [
                { type: 'checkbox', width: 50 },
                { type: 'index', width: 60 },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
                { field: 'role', title: 'Role', editRender: { name: 'input' } },
                { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
              ]
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
  }
}
</script>

<template>
  <div>
    <p class="tip">工具栏：通过 <grid-api-link prop="toolbar"/> 属性配置，支持显示/隐藏列、列宽拖动状态的保存功能，可以通过 <toolbar-api-link prop="storage"/> 开启将列个性化的设置状态保存到本地</p>

    <vxe-grid
      border
      resizable
      height="530"
      :pager-config="tablePage"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @toolbar-button-click="toolbarButtonClickEvent"></vxe-grid>

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
          query: ({ page }) => this.$ajax.doGet(`/api/user/page/list/${page.pageSize}/${page.currentPage}`),
          // body 对象： { removeRecords }
          delete: ({ body }) => this.$ajax.doPost('/api/user/save', body),
          // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
          save: ({ body }) => this.$ajax.doPost('/api/user/save', body)
        }
      },
      tableToolbar: {
        id: 'toolbar_demo_1',
        buttons: [
          { code: 'insert_actived', name: '新增' },
          {
            code: 'mark_cancel',
            name: 'app.body.button.markCancel',
            dropdowns: [
              { code: 'delete_selection', name: 'app.body.button.deleteSelectedRecords' },
              { code: 'remove_selection', name: '移除数据' }
            ]
          },
          { code: 'save', name: 'app.body.button.save' },
          {
            name: '数据导出',
            dropdowns: [
              { code: 'open_import', name: '高级导入' },
              { code: 'open_export', name: '高级导出' }
            ]
          },
          { code: 'exportData111', name: '自定义按钮' }
        ],
        export: true,
        refresh: true,
        resizable: {
          storage: true
        },
        setting: {
          storage: true
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
          height="530"
          :pager-config="tablePage"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="tableToolbar"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          @toolbar-button-click="toolbarButtonClickEvent"></vxe-grid>
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
                  query: ({ page }) => this.$ajax.doGet(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`), // 模拟请求
                  // body 对象： { removeRecords }
                  delete: ({ body }) => this.$ajax.doPost('/api/user/save', body),
                  // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
                  save: ({ body }) => this.$ajax.doPost('/api/user/save', body)
                }
              },
              tableToolbar: {
                buttons: [
                  { code: 'insert_actived', name: '新增' },
                  {
                    code: 'mark_cancel',
                    name: 'app.body.button.markCancel',
                    dropdowns: [
                      { code: 'delete_selection', name: 'app.body.button.deleteSelectedRecords' },
                      { code: 'remove_selection', name: '移除数据' }
                    ]
                  },
                  { code: 'save', name: 'app.body.button.save' },
                  {
                    name: '数据导出',
                    dropdowns: [
                      { code: 'open_import', name: '高级导入' },
                      { code: 'open_export', name: '高级导出' }
                    ]
                  },
                  { code: 'myBtn', name: '自定义按钮' }
                ],
                export: true,
                refresh: true,
                resizable: {
                  storage: true
                },
                setting: {
                  storage: true
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
          },
          methods: {
            toolbarButtonClickEvent ({ code }, event) {
              switch (code) {
                case 'myBtn':
                  this.$XModal.alert(code)
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
    toolbarButtonClickEvent ({ code }, event) {
      switch (code) {
        case 'myBtn':
          this.$XModal.alert(code)
          break
      }
    }
  }
}
</script>

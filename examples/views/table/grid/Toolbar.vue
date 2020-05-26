<template>
  <div>
    <p class="tip">工具栏：通过 <grid-api-link prop="toolbar"/> 属性配置，支持显示/隐藏列、列宽拖动状态的保存功能，可以通过表格的 <table-api-link prop="custom-config"/> 参数开启将列个性化的设置状态保存到本地</p>

    <vxe-grid
      border
      resizable
      export-config
      import-config
      keep-source
      id="toolbar_demo_1"
      height="530"
      :pager-config="tablePage"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :custom-config="{storage: true}"
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
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tablePage: {
        pageSize: 15
      },
      tableProxy: {
        props: {
          result: 'result',
          total: 'page.total'
        },
        ajax: {
          // page 对象： { pageSize, currentPage }
          query: ({ page }) => XEAjax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`),
          // body 对象： { removeRecords }
          delete: ({ body }) => XEAjax.post('/api/user/save', body),
          // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
          save: ({ body }) => XEAjax.post('/api/user/save', body)
        }
      },
      tableToolbar: {
        buttons: [
          { code: 'insert_actived', name: '新增' },
          {
            code: 'mark_cancel',
            name: 'app.body.button.markCancel',
            dropdowns: [
              { code: 'delete', name: 'app.body.button.deleteSelectedRecords', type: 'text' },
              { code: 'remove', name: '移除数据', type: 'text' }
            ]
          },
          { code: 'save', name: 'app.body.button.save', status: 'success' },
          {
            name: '数据导出',
            dropdowns: [
              { code: 'open_import', name: '高级导入', type: 'text' },
              { code: 'open_export', name: '高级导出', type: 'text' }
            ]
          },
          { code: 'exportData111', name: '自定义按钮', type: 'text', status: 'warning' },
          {
            name: '禁用按钮',
            disabled: false,
            dropdowns: [
              { code: 'other1', name: '下拉的按钮1', type: 'text', disabled: false },
              { code: 'other2', name: '下拉的按钮2', type: 'text', disabled: true },
              { code: 'other3', name: '下拉的按钮3', type: 'text', disabled: false }
            ]
          }
        ],
        refresh: true,
        import: true,
        export: true,
        print: true,
        zoom: true,
        custom: true
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        {
          title: '分类',
          children: [
            { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
            { field: 'role', title: 'Role', editRender: { name: 'input' } }
          ]
        },
        { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          export-config
          import-config
          keep-source
          id="toolbar_demo_1"
          height="530"
          :pager-config="tablePage"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="tableToolbar"
          :custom-config="{storage: true}"
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
                props: {
                  result: 'result',
                  total: 'page.total'
                },
                ajax: {
                  // page 对象： { pageSize, currentPage }
                  query: ({ page }) => XEAjax.get(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`),
                  // body 对象： { removeRecords }
                  delete: ({ body }) => XEAjax.post('/api/user/save', body),
                  // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
                  save: ({ body }) => XEAjax.post('/api/user/save', body)
                }
              },
              tableToolbar: {
                buttons: [
                  { code: 'insert_actived', name: '新增' },
                  {
                    code: 'mark_cancel',
                    name: 'app.body.button.markCancel',
                    dropdowns: [
                      { code: 'delete', name: 'app.body.button.deleteSelectedRecords', type: 'text' },
                      { code: 'remove', name: '移除数据', type: 'text' }
                    ]
                  },
                  { code: 'save', name: 'app.body.button.save', status: 'success' },
                  {
                    name: '数据导出',
                    dropdowns: [
                      { code: 'open_import', name: '高级导入', type: 'text' },
                      { code: 'open_export', name: '高级导出', type: 'text' }
                    ]
                  },
                  { code: 'exportData111', name: '自定义按钮', type: 'text', status: 'warning' },
                  {
                    name: '禁用按钮',
                    disabled: false,
                    dropdowns: [
                      { code: 'other1', name: '下拉的按钮1', type: 'text', disabled: false },
                      { code: 'other2', name: '下拉的按钮2', type: 'text', disabled: true },
                      { code: 'other3', name: '下拉的按钮3', type: 'text', disabled: false }
                    ]
                  }
                ],
                refresh: true,
                import: true,
                export: true,
                print: true,
                zoom: true,
                custom: true
              },
              tableColumn: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                {
                  title: '分类',
                  children: [
                    { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
                    { field: 'role', title: 'Role', editRender: { name: 'input' } }
                  ]
                },
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
    toolbarButtonClickEvent ({ code }) {
      switch (code) {
        case 'myBtn':
          this.$XModal.alert(code)
          break
      }
    }
  }
}
</script>

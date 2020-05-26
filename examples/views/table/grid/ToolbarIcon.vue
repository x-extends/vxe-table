<template>
  <div>
    <p class="tip">自定义工具栏按钮图标，可以局部替换也可以 <router-link :to="{name: 'StartIcons'}">全部替换</router-link></p>

    <vxe-grid
      border
      resizable
      export-config
      import-config
      keep-source
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
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tablePage: {
        perfect: true,
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
          { code: 'insert_actived', name: '新增', status: 'perfect', icon: 'fa fa-plus vxe-primary-color' },
          { code: 'mark_cancel', name: 'app.body.button.markCancel', status: 'perfect', icon: 'fa fa-trash-o vxe-danger-color' },
          { code: 'save', name: 'app.body.button.save', status: 'perfect', icon: 'fa fa-save vxe-success-color' }
        ],
        perfect: true,
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
        print: {
          icon: 'fa fa-print'
        },
        zoom: {
          iconIn: 'fa fa-arrows-alt',
          iconOut: 'fa fa-expand'
        },
        custom: {
          icon: 'fa fa-cog'
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
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
          export-config
          import-config
          keep-source
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
                perfect: true,
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
                  { code: 'insert_actived', name: '新增', status: 'perfect', icon: 'fa fa-plus vxe-primary-color' },
                  { code: 'mark_cancel', name: 'app.body.button.markCancel', status: 'perfect', icon: 'fa fa-trash-o vxe-danger-color' },
                  { code: 'save', name: 'app.body.button.save', status: 'perfect', icon: 'fa fa-save vxe-success-color' }
                ],
                perfect: true,
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
                print: {
                  icon: 'fa fa-print'
                },
                zoom: {
                  iconIn: 'fa fa-arrows-alt',
                  iconOut: 'fa fa-expand'
                },
                custom: {
                  icon: 'fa fa-cog'
                }
              },
              tableColumn: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
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

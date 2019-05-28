<template>
  <div>
    <p>工具栏：通过 toolbar 属性配置</p>

    <vxe-grid
      border
      height="530"
      :page-config="{pageSize: 10}"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="toolbar"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row'}"></vxe-grid>

    <p class="demo-code">显示代码</p>

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
      tableProxy: {
        props: {
          data: 'data.result',
          total: 'data.page.total'
        },
        ajax: {
          // page 对象： { pageSize, currentPage }
          query: ({ page }) => XEAjax.doGet(`/api/user/page/list/${page.pageSize}/${page.currentPage}`),
          // body 对象： { removeRecords }
          delete: ({ body }) => XEAjax.doPost('/api/user/save', body),
          // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
          save: ({ body }) => XEAjax.doPost('/api/user/save', body)
        }
      },
      toolbar: {
        buttons: [
          { code: 'reload', name: '刷新' },
          { code: 'insert', name: '新增' },
          { code: 'insert_actived', name: '新增并激活' },
          { code: 'delete_pending', name: '标记/取消' },
          { code: 'delete_selection', name: '删除选中' },
          { code: 'delete_rows', name: '移除' },
          { code: 'save', name: '保存' },
          { code: 'export', name: '导出.csv' }
        ],
        setting: true
      },
      tableColumn: [
        { type: 'selection', width: 50 },
        { type: 'index', width: 60 },
        { prop: 'name', label: 'Name', editRender: { name: 'input' } },
        { prop: 'nickname', label: 'Nickname', editRender: { name: 'input' } },
        { prop: 'role', label: 'Role', editRender: { name: 'input' } },
        { prop: 'describe', label: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          height="530"
          :page-config="{pageSize: 10}"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="toolbar"
          :edit-config="{key: 'id', trigger: 'click', mode: 'row'}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                props: {
                  data: 'data.result',
                  total: 'data.page.total'
                },
                ajax: {
                  // page 对象： { pageSize, currentPage }
                  query: ({ page }) => XEAjax.doGet(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`),
                  // body 对象： { removeRecords }
                  delete: ({ body }) => XEAjax.doPost('/api/user/save', body),
                  // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
                  save: ({ body }) => XEAjax.doPost('/api/user/save', body)
                }
              },
              toolbar: {
                buttons: [
                  { code: 'reload', name: '刷新' },
                  { code: 'insert', name: '新增' },
                  { code: 'insert_actived', name: '新增并激活' },
                  { code: 'delete_pending', name: '标记/取消' },
                  { code: 'delete_selection', name: '删除选中' },
                  { code: 'delete_rows', name: '移除' },
                  { code: 'save', name: '保存' },
                  { code: 'export', name: '导出.csv' }
                ],
                setting: true
              },
              tableColumn: [
                { type: 'selection', width: 50 },
                { type: 'index', width: 60 },
                { prop: 'name', label: 'Name', editRender: { name: 'input' } },
                { prop: 'nickname', label: 'Nickname', editRender: { name: 'input' } },
                { prop: 'role', label: 'Role', editRender: { name: 'input' } },
                { prop: 'describe', label: 'Describe', showOverflow: true, editRender: { name: 'input' } }
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

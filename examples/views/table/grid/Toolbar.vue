<template>
  <div>
    <p>工具栏、数据代理配置</p>
    <p>save 默认提交的数据结构：{ insertRecords, updateRecords, removeRecords, pendingRecords}</p>

    <vxe-grid
      border
      height="530"
      :page-config="{pageSize: 10}"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="toolbar"
      :edit-config="{trigger: 'click', mode: 'row'}"></vxe-grid>

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
          list: 'data.result',
          total: 'data.page.total'
        },
        ajax: {
          query: ({ params, page }) => XEAjax.doGet(`/api/user/page/list/${page.pageSize}/${page.currentPage}`),
          delete: ({ body }) => XEAjax.doPost('/api/user/save', body),
          save: ({ body }) => XEAjax.doPost('/api/user/save', body)
        }
      },
      toolbar: {
        buttons: ['add', 'pending', 'save', 'reload', 'export']
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
          :loading="loading"
          :columns="tableColumn"
          :data.sync="tableData"
          :toolbar="toolbar"
          :edit-config="{trigger: 'click', mode: 'row'}"></vxe-grid>
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
                  query: ({ params, page }) => XEAjax.doGet(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`),
                  delete: ({ body }) => XEAjax.doPost('/api/user/save', body),
                  save: ({ body }) => XEAjax.doPost('/api/user/save', body)
                }
              },
              toolbar: {
                buttons: ['add', 'pending', 'save', 'reload', 'export']
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

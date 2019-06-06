<template>
  <div>
    <p>查询代理、服务端排序代理、服务端筛选代理、分页代理、增删改查</p>
    <p>由 <grid-api-link name="vxe-grid"/> 代理数据转换，只需要配置好数据源即可；非常简单就可以渲染一个表格，从重复写冗余的代码中解放出来</p>

    <vxe-grid
      border
      highlight-hover-row
      height="530"
      :pager-config="tablePage"
      :toolbar="toolbar"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>

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
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tablePage: {
        pageSize: 15
      },
      tableProxy: {
        sort: true, // 启用排序代理
        filter: true, // 启用筛选代理
        ajax: {
          query: ({ page, sort, filter }) => {
            // 根据不同逻辑处理参数
            let formData = {
              sort: sort.prop,
              order: sort.order,
              ...XEUtils.objectMap(filter, values => values.join(','))
            }
            return XEAjax.getJSON(`/api/user/page/list/${page.pageSize}/${page.currentPage}`, formData)
          },
          save: ({ body }) => XEAjax.doPost('/api/user/save', body)
        }
      },
      toolbar: {
        buttons: [
          { code: 'reload', name: '刷新' },
          { code: 'insert_actived', name: '新增' },
          { code: 'delete_pending', name: '标记/取消' },
          { code: 'delete_rows', name: '移除' },
          { code: 'save', name: '保存' },
          { code: 'export', name: '导出.csv' }
        ],
        setting: true
      },
      tableColumn: [
        { type: 'selection', width: 50 },
        { type: 'index', width: 60 },
        { prop: 'name', label: 'Name', remoteSort: true, editRender: { name: 'input' } },
        { prop: 'nickname', label: 'Nickname', editRender: { name: 'input' } },
        {
          prop: 'role',
          label: 'Role',
          remoteSort: true,
          width: 200,
          filters: [
            { label: '前端', value: '前端' },
            { label: '后端', value: '后端' },
            { label: '测试', value: '测试' }
          ],
          filterMultiple: false,
          remoteFilter: true,
          editRender: { name: 'input' }
        },
        { prop: 'describe', label: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          highlight-hover-row
          height="530"
          :pager-config="tablePage"
          :toolbar="toolbar"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :edit-config="{key: 'id', trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tablePage: {
                pageSize: 15
              },
              tableProxy: {
                sort: true, // 启用排序代理
                filter: true, // 启用筛选代理
                ajax: {
                  query: ({ page, sort, filter }) => {
                    // 根据不同逻辑处理参数
                    let formData = {
                      sort: sort.prop,
                      order: sort.order,
                      ...XEUtils.objectMap(filter, values => values.join(','))
                    }
                    return XEAjax.getJSON(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`, formData)
                  },
                  save: ({ body }) => XEAjax.doPost('/api/user/save', body)
                }
              },
              toolbar: {
                buttons: [
                  { code: 'reload', name: '刷新' },
                  { code: 'insert_actived', name: '新增' },
                  { code: 'delete_pending', name: '标记/取消' },
                  { code: 'delete_rows', name: '移除' },
                  { code: 'save', name: '保存' },
                  { code: 'export', name: '导出.csv' }
                ],
                setting: {
                  immediate: true
                }
              },
              tableColumn: [
                { type: 'selection', width: 50 },
                { type: 'index', width: 60 },
                { prop: 'name', label: 'Name', remoteSort: true, editRender: { name: 'input' } },
                { prop: 'nickname', label: 'Nickname', editRender: { name: 'input' } },
                {
                  prop: 'role',
                  label: 'Role',
                  remoteSort: true,
                  width: 200,
                  filters: [
                    { label: '前端', value: '前端' },
                    { label: '后端', value: '后端' },
                    { label: '测试', value: '测试' }
                  ],
                  filterMultiple: false,
                  remoteFilter: true,
                  editRender: { name: 'input' }
                },
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

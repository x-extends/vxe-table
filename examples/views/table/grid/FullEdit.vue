<template>
  <div>
    <p>查询代理、服务端排序代理、服务端筛选代理、分页代理、增删改查</p>
    <p>对于分页场景下，如果想要保留选中状态，可以通过设置 <table-api-link prop="select-config"/> 的 <table-api-link prop="reserve"/> 属性</p>
    <p>由 <grid-api-link name="vxe-grid"/> 代理数据转换，只需要配置好数据源即可；非常简单就可以渲染一个表格，从重复写冗余的代码中解放出来</p>

    <vxe-grid
      border
      resizable
      highlight-hover-row
      remote-filter
      height="530"
      row-id="id"
      :pager-config="{pageSize: 15}"
      :toolbar="toolbar"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :select-config="{reserve: true}"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
    </vxe-grid>

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
      validRules: {
        name: [
          { required: true, message: '名称必须填写' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        role: [
          { required: true, message: '角色必须填写' }
        ]
      },
      tableProxy: {
        index: true, // 启用动态序号代理
        sort: true, // 启用排序代理
        filter: true, // 启用筛选代理
        ajax: {
          query: ({ page, sort, filters }) => {
            // 处理排序条件
            let formData = {
              sort: sort.property,
              order: sort.order
            }
            // 处理筛选条件
            filters.forEach(({ column, property, values }) => {
              formData[property] = values.join(',')
            })
            return XEAjax.getJSON(`/api/user/page/list/${page.pageSize}/${page.currentPage}`, formData)
          },
          save: ({ body }) => XEAjax.doPost('/api/user/save', body)
        }
      },
      toolbar: {
        id: 'full_edit_1',
        buttons: [
          { code: 'reload', name: '刷新' },
          { code: 'insert_actived', name: '新增' },
          { code: 'mark_cancel', name: '标记/取消' },
          { code: 'remove_selection', name: '移除' },
          { code: 'save', name: '保存' },
          { code: 'export', name: '导出.csv' }
        ],
        resizable: {
          storage: true
        },
        setting: {
          storage: true
        }
      },
      tableColumn: [
        { type: 'selection', width: 50 },
        { type: 'index', width: 60 },
        { field: 'name', title: 'Name', remoteSort: true, editRender: { name: 'input' } },
        { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
        {
          field: 'role',
          title: 'Role',
          remoteSort: true,
          width: 200,
          filters: [
            { label: '前端', value: '前端' },
            { label: '后端', value: '后端' },
            { label: '测试', value: '测试' }
          ],
          filterMultiple: false,
          editRender: { name: 'input' }
        },
        { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          highlight-hover-row
          remote-filter
          height="530"
          row-id="id"
          :pager-config="{pageSize: 15}"
          :toolbar="toolbar"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :select-config="{reserve: true}"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                index: true, // 启用动态序号代理
                sort: true, // 启用排序代理
                filter: true, // 启用筛选代理
                ajax: {
                  query: ({ page, sort, filters }) => {
                    // 处理排序条件
                    let formData = {
                      sort: sort.property,
                      order: sort.order
                    }
                    // 处理筛选条件
                    filters.forEach(({ column, property, values }) => {
                      formData[property] = values.join(',')
                    })
                    return XEAjax.getJSON(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`, formData)
                  },
                  save: ({ body }) => XEAjax.doPost('/api/user/save', body)
                }
              },
              toolbar: {
                id: 'full_edit_1',
                buttons: [
                  { code: 'reload', name: '刷新' },
                  { code: 'insert_actived', name: '新增' },
                  { code: 'mark_cancel', name: '标记/取消' },
                  { code: 'remove_selection', name: '移除' },
                  { code: 'save', name: '保存' },
                  { code: 'export', name: '导出.csv' }
                ],
                resizable: {
                  storage: true
                },
                setting: {
                  storage: true
                }
              },
              tableColumn: [
                { type: 'selection', width: 50 },
                { type: 'index', width: 60 },
                { field: 'name', title: 'Name', remoteSort: true, editRender: { name: 'input' } },
                { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
                {
                  field: 'role',
                  title: 'Role',
                  remoteSort: true,
                  width: 200,
                  filters: [
                    { label: '前端', value: '前端' },
                    { label: '后端', value: '后端' },
                    { label: '测试', value: '测试' }
                  ],
                  filterMultiple: false,
                  editRender: { name: 'input' }
                },
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

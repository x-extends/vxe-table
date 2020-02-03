<template>
  <div>
    <p class="tip">进阶封装实现，<a class="link" href="https://github.com/xuliangzhan/vxe-table-demo/tree/master/vxe-table-by-vue-grid-proxy">查看配置式代理项目使用示例</a>，只需要一个 json 数据就可以非常简单的渲染一个支持 CRUD 功能完整的表格</p>

    <vxe-grid
      resizable
      keep-source
      height="528"
      :filter-config="{remote: true}"
      :toolbar="tableToolbar"
      :pager-config="tablePage"
      :columns="tableColumn"
      :proxy-config="tableProxy"
      :checkbox-config="{labelField: 'id', highlight: true, range: true}"
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
      tablePage: {
        pageSize: 15,
        pageSizes: [5, 10, 20, 50, 100, 200, 500, 1000]
      },
      tableProxy: {
        sort: true,
        filter: true,
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
            return XEAjax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`, formData)
          },
          delete: ({ body }) => XEAjax.post('/api/user/save', body),
          save: ({ body }) => XEAjax.post('/api/user/save', body)
        }
      },
      tableToolbar: {
        buttons: [
          { code: 'insert_actived', name: 'Add', icon: 'fa fa-plus' },
          { code: 'mark_cancel', name: 'Mark', icon: 'fa fa-bookmark-o' },
          { code: 'save', name: 'Save', icon: 'fa fa-save' }
        ],
        refresh: true,
        custom: true
      },
      tableColumn: [
        { type: 'seq', width: 60, fixed: 'left' },
        { type: 'checkbox', title: 'ID', width: 140, fixed: 'left' },
        { field: 'name', title: 'Name', remoteSort: true, editRender: { name: 'input' } },
        { field: 'age', title: 'Age', remoteSort: true, editRender: { name: 'input' } },
        {
          field: 'status',
          title: 'Status',
          editRender: {
            name: 'select',
            options: [
              { value: '1', label: '红' },
              { value: '2', label: '黄' },
              { value: '3', label: '蓝' },
              { value: '4', label: '绿' },
              { value: '5', label: '青' }
            ]
          }
        },
        {
          field: 'sex',
          title: 'Sex',
          editRender: {
            name: 'select',
            options: [
              { value: '', label: '' },
              { value: '0', label: '女' },
              { value: '1', label: '男' }
            ]
          }
        },
        {
          field: 'role',
          title: 'Role',
          remoteSort: true,
          width: 200,
          filters: [
            { label: '前端开发', value: '前端' },
            { label: '后端开发', value: '后端' },
            { label: '测试', value: '测试' },
            { label: '程序员鼓励师', value: '程序员鼓励师' }
          ],
          filterMultiple: false,
          editRender: { name: 'input' }
        },
        { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-grid v-bind="xGridOptions"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              xGridOptions: {
                resizable: true,
                height: 528,
                filterConfig: {
                  remote: true
                },
                checkboxConfig: {
                  labelField: 'id',
                  highlight: true,
                  range: true
                },
                editConfig: {
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true
                },
                editRules: {
                  name: [
                    { required: true, message: '名称必须填写' },
                    { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
                  ],
                  role: [
                    { required: true, message: '角色必须填写' }
                  ]
                },
                pagerConfig: {
                  pageSize: 15,
                  pageSizes: [5, 10, 20, 50, 100, 200, 500, 1000]
                },
                proxyConfig: {
                  sort: true,
                  filter: true,
                  ajax: {
                    query: '/api/user/page/list/{{page.pageSize}}/{{page.currentPage}}',
                    delete: '/api/user/save',
                    save: '/api/user/save'
                  }
                },
                toolbar: {
                  buttons: [
                    { code: 'insert_actived', name: 'Add', icon: 'fa fa-plus' },
                    { code: 'mark_cancel', name: 'Mark', icon: 'fa fa-bookmark-o' },
                    { code: 'save', name: 'Save', icon: 'fa fa-save' }
                  ],
                  refresh: true,
                  custom: true
                },
                columns: [
                  { type: 'seq', width: 60, fixed: 'left' },
                  { type: 'checkbox', title: 'ID', width: 140, fixed: 'left' },
                  { field: 'name', title: 'Name', remoteSort: true, editRender: { name: 'input' } },
                  { field: 'age', title: 'Age', remoteSort: true, editRender: { name: 'input' } },
                  // 单元格渲染，自动读取字典配置
                  { field: 'status', title: 'Status', editRender: { name: 'select', options: '$COLOR_STATUS' } },
                  // 单元格渲染，自动请求异步配置
                  { field: 'sex', title: 'Sex', remoteSort: true, editRender: { name: 'select', options: '/api/conf/sex/list' } },
                  // 筛选渲染，自动请求异步配置
                  { field: 'role', title: 'Role', remoteSort: true, width: 200, filters: '/api/conf/role/list', filterMultiple: false, editRender: { name: 'input' } },
                  { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
                ]
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
  }
}
</script>

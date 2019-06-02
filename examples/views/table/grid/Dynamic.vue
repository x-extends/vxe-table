<template>
  <div>
    <p>实现可配置动态列、数据代理、工具栏、增删改查</p>

    <vxe-grid
      border
      height="306"
      :page-config="tablePage"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="toolbar"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>

    <p class="demo-code">显示代码</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>级联动态列渲染，可以非常简单的实现功能复杂的可配置动态列</p>

    <vxe-grid
      border
      height="290"
      :loading="loading2"
      :page-config="tablePage2"
      :proxy-config="tableProxy2"
      :columns="tableColumn2"
      :toolbar="toolbar2"
      :edit-rules="validRules2"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row', showStatus: true}"
      @toolbar-button-click="toolbarButtonClickEvent"></vxe-grid>

    <p class="demo-code">显示代码</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tablePage: {
        pageSize: 5,
        pageSizes: [5, 10, 15, 20, 50]
      },
      tableProxy: {
        props: {
          data: 'data.result',
          total: 'data.page.total'
        },
        ajax: {
          query: ({ page }) => XEAjax.doGet(`/api/column/page/list/${page.pageSize}/${page.currentPage}`, { sort: 'seq', order: 'asc' }),
          delete: ({ body }) => XEAjax.doPost('/api/column/save', body),
          save: ({ body }) => XEAjax.doPost('/api/column/save', body)
        }
      },
      toolbar: {
        buttons: [
          { code: 'reload', name: '刷新' },
          { code: 'insert_actived', name: '新增' },
          { code: 'delete_pending', name: '标记/取消' },
          { code: 'save', name: '保存' },
          { code: 'export', name: '导出.csv' }
        ],
        setting: true
      },
      tableColumn: [
        { type: 'selection', width: 50 },
        { prop: 'seq', label: '排序', width: 80, editRender: { name: 'input' } },
        { prop: 'key', label: '列键值', width: 100, editRender: { name: 'input' } },
        { prop: 'name', label: '列名称', width: 100, editRender: { name: 'input' } },
        { prop: 'type', label: '列类型', width: 100, editRender: { name: 'input' } },
        { prop: 'width', label: '列宽度', width: 100, editRender: { name: 'input' } },
        { prop: 'isEdit', label: '是否编辑', width: 100, editRender: { name: 'input' } },
        { prop: 'required', label: '是否必填', width: 140, editRender: { name: 'input' } },
        { prop: 'validator', label: '校验规则', width: 140, editRender: { name: 'input' } },
        { prop: 'validMsg', label: '校验提示消息', width: 150, editRender: { name: 'input' } },
        { prop: 'describe', label: '描述', width: 200, showOverflow: true, editRender: { name: 'input' } },
        { prop: 'createTime', label: '创建时间', width: 200, showOverflow: true, formatter: this.formatterDate, editRender: { name: 'input' } },
        { prop: 'updateTime', label: '更新时间', width: 200, showOverflow: true, formatter: this.formatterDate, editRender: { name: 'input' } }
      ],
      loading2: false,
      tablePage2: {
        pageSize: 10
      },
      tableProxy2: {
        props: {
          data: 'data.result',
          total: 'data.page.total'
        },
        ajax: {
          query: ({ page }) => XEAjax.doGet(`/api/user/page/list/${page.pageSize}/${page.currentPage}`),
          delete: ({ body }) => XEAjax.doPost('/api/user/save', body),
          save: ({ body }) => XEAjax.doPost('/api/user/save', body)
        }
      },
      toolbar2: {
        buttons: [
          { code: 'reloadColumn', name: '刷新列配置' },
          { code: 'reload', name: '刷新数据' },
          { code: 'insert_actived', name: '新增' },
          { code: 'delete_pending', name: '标记/取消' },
          { code: 'save', name: '保存' },
          { code: 'export', name: '导出.csv' }
        ],
        setting: true
      },
      validRules2: null,
      tableColumn2: [],
      demoCodes: [
        `
        <vxe-grid
          border
          height="306"
          :page-config="tablePage"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="toolbar"
          :edit-config="{key: 'id', trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tablePage: {
                pageSize: 5,
                pageSizes: [5, 10, 15, 20, 50]
              },
              tableProxy: {
                props: {
                  data: 'data.result',
                  total: 'data.page.total'
                },
                ajax: {
                  query: ({ page }) => XEAjax.doGet(\`/api/column/page/list/\${page.pageSize}/\${page.currentPage}\`, { sort: 'seq', order: 'asc' }),
                  delete: ({ body }) => XEAjax.doPost('/api/column/save', body),
                  save: ({ body }) => XEAjax.doPost('/api/column/save', body)
                }
              },
              toolbar: {
                buttons: [
                  { code: 'reload', name: '刷新' },
                  { code: 'insert_actived', name: '新增' },
                  { code: 'delete_pending', name: '标记/取消' },
                  { code: 'save', name: '保存' },
                  { code: 'export', name: '导出.csv' }
                ],
                setting: true
              },
              tableColumn: [
                { type: 'selection', width: 50 },
                { prop: 'seq', label: '排序', width: 80, editRender: { name: 'input' } },
                { prop: 'key', label: '列键值', width: 100, editRender: { name: 'input' } },
                { prop: 'name', label: '列名称', width: 100, editRender: { name: 'input' } },
                { prop: 'type', label: '列类型', width: 100, editRender: { name: 'input' } },
                { prop: 'width', label: '列宽度', width: 100, editRender: { name: 'input' } },
                { prop: 'isEdit', label: '是否编辑', width: 100, editRender: { name: 'input' } },
                { prop: 'required', label: '是否必填', width: 140, editRender: { name: 'input' } },
                { prop: 'validator', label: '校验规则', width: 140, editRender: { name: 'input' } },
                { prop: 'validMsg', label: '校验提示消息', width: 150, editRender: { name: 'input' } },
                { prop: 'describe', label: '描述', width: 200, showOverflow: true, editRender: { name: 'input' } },
                { prop: 'createTime', label: '创建时间', width: 200, showOverflow: true, formatter: this.formatterDate, editRender: { name: 'input' } },
                { prop: 'updateTime', label: '更新时间', width: 200, showOverflow: true, formatter: this.formatterDate, editRender: { name: 'input' } }
              ]
            }
          },
          methods: {
            formatterDate ({ cellValue }) {
              return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
            }
          }
        }
        `,
        `
        <vxe-grid
          border
          height="530"
          :loading="loading"
          :page-config="tablePage"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="toolbar"
          :edit-config="{key: 'id', trigger: 'click', mode: 'row', showStatus: true}"
          @toolbar-button-click="toolbarButtonClickEvent"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tablePage: {
                pageSize: 10
              },
              tableProxy: {
                props: {
                  data: 'data.result',
                  total: 'data.page.total'
                },
                ajax: {
                  query: ({ page }) => XEAjax.doGet(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`),
                  delete: ({ body }) => XEAjax.doPost('/api/user/save', body),
                  save: ({ body }) => XEAjax.doPost('/api/user/save', body)
                }
              },
              toolbar: {
                buttons: [
                  { code: 'reloadColumn', name: '刷新列配置' },
                  { code: 'reload', name: '刷新数据' },
                  { code: 'insert_actived', name: '新增' },
                  { code: 'delete_pending', name: '标记/取消' },
                  { code: 'save', name: '保存' },
                  { code: 'export', name: '导出.csv' }
                ],
                setting: true
              },
              validRules: null,
              tableColumn: [],
            }
          },
          created () {
            this.findColumn()
          },
          methods: {
            findColumn () {
              this.loading = true
              XEAjax.getJSON('/api/column/list', { sort: 'seq', order: 'asc' }).then(data => {
                let validRules = {}
                this.tableColumn = data.map(item => {
                  // 动态生成校验
                  if (item.required) {
                    validRules[item.key] = [
                      { required: true, message: \`请填写\${item.name}\` }
                    ]
                  }
                  if (item.validator) {
                    if (validRules[item.key]) {
                      validRules[item.key].push({ pattern: new RegExp(item.validator), message: item.validMsg || \`\${item.name}校验不通过，请重新填写\` })
                    } else {
                      validRules[item.key] = [
                        { pattern: new RegExp(item.validator), message: item.validMsg || \`\${item.name}校验不通过，请重新填写\` }
                      ]
                    }
                  }
                  // 动态生成列
                  if (item.type) {
                    return {
                      label: item.name,
                      width: item.width,
                      type: item.type
                    }
                  }
                  return {
                    prop: item.key,
                    label: item.name,
                    width: item.width,
                    editRender: { name: 'input' }
                  }
                })
                this.validRules = validRules
                this.loading = false
              })
            },
            formatterDate ({ cellValue }) {
              return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
            },
            toolbarButtonClickEvent ({ button }, event) {
              switch (button.code) {
                case 'reloadColumn':
                  this.findColumn()
                  break
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findColumn()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findColumn () {
      this.loading2 = true
      XEAjax.getJSON('/api/column/list', { sort: 'seq', order: 'asc' }).then(data => {
        let validRules = {}
        this.tableColumn2 = data.map(item => {
          // 动态生成校验
          if (item.required) {
            validRules[item.key] = [
              { required: true, message: `请填写${item.name}` }
            ]
          }
          if (item.validator) {
            if (validRules[item.key]) {
              validRules[item.key].push({ pattern: new RegExp(item.validator), message: item.validMsg || `${item.name}校验不通过，请重新填写` })
            } else {
              validRules[item.key] = [
                { pattern: new RegExp(item.validator), message: item.validMsg || `${item.name}校验不通过，请重新填写` }
              ]
            }
          }
          // 动态生成列
          if (item.type) {
            return {
              label: item.name,
              width: item.width,
              type: item.type
            }
          }
          return {
            prop: item.key,
            label: item.name,
            width: item.width,
            editRender: { name: 'input' }
          }
        })
        this.validRules2 = validRules
        this.loading2 = false
      })
    },
    formatterDate ({ cellValue }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
    },
    toolbarButtonClickEvent ({ button }, event) {
      switch (button.code) {
        case 'reloadColumn':
          this.findColumn()
          break
      }
    }
  }
}
</script>

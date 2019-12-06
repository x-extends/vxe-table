<template>
  <div>
    <p class="tip">实现可配置动态列、数据代理、工具栏、增删改查</p>

    <vxe-grid
      border
      resizable
      show-overflow
      height="306"
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

    <p class="tip">级联动态列渲染，可以非常简单的实现功能复杂的可配置动态列</p>

    <vxe-grid
      border
      show-overflow
      height="290"
      :loading="loading2"
      :pager-config="tablePage2"
      :proxy-config="tableProxy2"
      :columns="tableColumn2"
      :toolbar="tableToolbar2"
      :edit-rules="validRules2"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @toolbar-button-click="toolbarButtonClickEvent"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
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
          result: 'data.result',
          total: 'data.page.total'
        },
        ajax: {
          query: ({ page }) => this.$ajax.get(`/api/column/page/list/${page.pageSize}/${page.currentPage}`, { sort: 'seq', order: 'asc' }),
          delete: ({ body }) => this.$ajax.post('/api/column/save', body),
          save: ({ body }) => this.$ajax.post('/api/column/save', body)
        }
      },
      tableToolbar: {
        buttons: [
          { code: 'reload', name: '刷新' },
          { code: 'insert_actived', name: '新增' },
          { code: 'mark_cancel', name: '标记/取消' },
          { code: 'save', name: '保存' },
          { code: 'export', name: '导出.csv' }
        ],
        refresh: true,
        setting: true
      },
      tableColumn: [
        { type: 'checkbox', width: 50 },
        { field: 'seq', title: '排序', width: 80, editRender: { name: 'input' } },
        { field: 'key', title: '列键值', width: 100, editRender: { name: 'input' } },
        { field: 'name', title: '列名称', width: 100, editRender: { name: 'input' } },
        { field: 'type', title: '列类型', width: 100, editRender: { name: 'input' } },
        { field: 'width', title: '列宽度', width: 100, editRender: { name: 'input' } },
        { field: 'link', title: '是否链接', width: 150, editRender: { name: 'input' } },
        { field: 'isEdit', title: '是否编辑', width: 100, editRender: { name: 'input' } },
        { field: 'required', title: '是否必填', width: 140, editRender: { name: 'input' } },
        { field: 'validator', title: '校验规则', width: 140, editRender: { name: 'input' } },
        { field: 'validMsg', title: '校验提示消息', width: 150, editRender: { name: 'input' } },
        { field: 'describe', title: '描述', width: 200, showOverflow: true, editRender: { name: 'input' } },
        { field: 'createTime', title: '创建时间', width: 100, showOverflow: true, formatter: this.formatterDate, editRender: { name: 'input' } },
        { field: 'updateTime', title: '更新时间', width: 200, showOverflow: true, formatter: this.formatterDate, editRender: { name: 'input' } }
      ],
      loading2: false,
      tablePage2: {
        pageSize: 10
      },
      tableProxy2: {
        props: {
          result: 'data.result',
          total: 'data.page.total'
        },
        ajax: {
          query: ({ page }) => this.$ajax.get(`/api/user/page/list/${page.pageSize}/${page.currentPage}`),
          delete: ({ body }) => this.$ajax.post('/api/user/save', body),
          save: ({ body }) => this.$ajax.post('/api/user/save', body)
        }
      },
      tableToolbar2: {
        buttons: [
          { code: 'reloadColumn', name: '刷新列配置' },
          { code: 'reload', name: '刷新数据' },
          { code: 'insert_actived', name: '新增' },
          { code: 'mark_cancel', name: '标记/取消' },
          { code: 'save', name: '保存' },
          { code: 'export', name: '导出.csv' }
        ],
        refresh: true,
        setting: true
      },
      validRules2: null,
      tableColumn2: [],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          show-overflow
          height="306"
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
                pageSize: 5,
                pageSizes: [5, 10, 15, 20, 50]
              },
              tableProxy: {
                props: {
                  result: 'data.result',
                  total: 'data.page.total'
                },
                ajax: {
                  query: ({ page }) => this.$ajax.get(\`/api/column/page/list/\${page.pageSize}/\${page.currentPage}\`, { sort: 'seq', order: 'asc' }),
                  delete: ({ body }) => this.$ajax.post('/api/column/save', body),
                  save: ({ body }) => this.$ajax.post('/api/column/save', body)
                }
              },
              tableToolbar: {
                buttons: [
                  { code: 'reload', name: '刷新' },
                  { code: 'insert_actived', name: '新增' },
                  { code: 'mark_cancel', name: '标记/取消' },
                  { code: 'save', name: '保存' },
                  { code: 'export', name: '导出.csv' }
                ],
                refresh: true,
                setting: true
              },
              tableColumn: [
                { type: 'checkbox', width: 50 },
                { field: 'seq', title: '排序', width: 80, editRender: { name: 'input' } },
                { field: 'key', title: '列键值', width: 100, editRender: { name: 'input' } },
                { field: 'name', title: '列名称', width: 100, editRender: { name: 'input' } },
                { field: 'type', title: '列类型', width: 100, editRender: { name: 'input' } },
                { field: 'width', title: '列宽度', width: 100, editRender: { name: 'input' } },
                { field: 'link', title: '是否链接', width: 150, editRender: { name: 'input' } },
                { field: 'isEdit', title: '是否编辑', width: 100, editRender: { name: 'input' } },
                { field: 'required', title: '是否必填', width: 140, editRender: { name: 'input' } },
                { field: 'validator', title: '校验规则', width: 140, editRender: { name: 'input' } },
                { field: 'validMsg', title: '校验提示消息', width: 150, editRender: { name: 'input' } },
                { field: 'describe', title: '描述', width: 200, showOverflow: true, editRender: { name: 'input' } },
                { field: 'createTime', title: '创建时间', width: 200, showOverflow: true, formatter: this.formatterDate, editRender: { name: 'input' } },
                { field: 'updateTime', title: '更新时间', width: 200, showOverflow: true, formatter: this.formatterDate, editRender: { name: 'input' } }
              ]
            }
          },
          methods: {
            formatterDate ({ cellValue }) {
              return this.$utils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
            }
          }
        }
        `,
        `
        <vxe-grid
          border
          show-overflow
          height="530"
          :loading="loading"
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
              loading: false,
              tablePage: {
                pageSize: 10
              },
              tableProxy: {
                props: {
                  result: 'data.result',
                  total: 'data.page.total'
                },
                ajax: {
                  query: ({ page }) => this.$ajax.get(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`),
                  delete: ({ body }) => this.$ajax.post('/api/user/save', body),
                  save: ({ body }) => this.$ajax.post('/api/user/save', body)
                }
              },
              tableToolbar: {
                buttons: [
                  { code: 'reloadColumn', name: '刷新列配置' },
                  { code: 'reload', name: '刷新数据' },
                  { code: 'insert_actived', name: '新增' },
                  { code: 'mark_cancel', name: '标记/取消' },
                  { code: 'save', name: '保存' },
                  { code: 'export', name: '导出.csv' }
                ],
                refresh: true,
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
              this.$ajax.get('/api/column/list', { sort: 'seq', order: 'asc' }).then(data => {
                let validRules = {}
                this.tableColumn2 = data.map(item => {
                  let config = {
                    title: item.name,
                    width: item.width,
                    slots: {
                      default: ({ row, column }) => {
                        // 渲染链接
                        if (item.link) {
                          return [
                            <a class="link" href={ item.link }>{ row[column.property] }</a>
                          ]
                        }
                        // 渲染文本
                        return [
                          <span>{ row[column.property] }</span>
                        ]
                      }
                    }
                  }
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
                  if (item.key) {
                    config.field = item.key
                  }
                  if (item.type) {
                    config.type = item.type
                  }
                  if (item.isEdit) {
                    config.editRender = { name: 'input' }
                  }
                  return config
                })
            },
            formatterDate ({ cellValue }) {
              return this.$utils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
            },
            toolbarButtonClickEvent ({ code }, event) {
              switch (code) {
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
      this.$ajax.get('/api/column/list', { sort: 'seq', order: 'asc' }).then(data => {
        let validRules = {}
        this.tableColumn2 = data.map(item => {
          let config = {
            title: item.name,
            width: item.width
          }
          if (item.type) {
            Object.assign(config, {
              type: item.type
            })
          } else {
            Object.assign(config, {
              slots: {
                default: ({ row, column }) => {
                  // 渲染链接
                  if (item.link) {
                    return [
                      <a class="link" href={ item.link }>{ row[column.property] }</a>
                    ]
                  }
                  // 渲染文本
                  return [
                    <span>{ row[column.property] }</span>
                  ]
                }
              }
            })
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
            if (item.key) {
              config.field = item.key
            }
            if (item.isEdit) {
              config.editRender = { name: 'input' }
            }
          }
          return config
        })
        this.validRules2 = validRules
        this.loading2 = false
      })
    },
    formatterDate ({ cellValue }) {
      return this.$utils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
    },
    toolbarButtonClickEvent ({ code }, event) {
      switch (code) {
        case 'reloadColumn':
          this.findColumn()
          break
      }
    }
  }
}
</script>

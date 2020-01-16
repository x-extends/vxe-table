<template>
  <div>
    <p class="tip">表单，可以通过设置 <grid-api-link prop="form-config"/>={data, items} 渲染表单</p>

    <vxe-grid
      resizable
      export-config
      border
      height="400"
      :loading="loading"
      :form-config="tableForm"
      :toolbar="tableToolbar"
      :data="tableData"
      :columns="tableColumn"
      @form-submit="findList">
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
      loading: false,
      tableData: [],
      tableForm: {
        data: {
          name: '',
          sex: ''
        },
        items: [
          { field: 'name', title: 'app.body.label.name', itemRender: { name: 'input', attrs: { placeholder: '请输入名称' } } },
          { field: 'sex', title: '性别', titlePrefix: { message: '帮助信息！！！', icon: 'fa fa-info-circle' }, itemRender: { name: 'select', options: [] } },
          { itemRender: { name: 'input', attrs: { type: 'submit', value: '查询' } } },
          { itemRender: { name: 'input', attrs: { type: 'reset', value: '重置' } } }
        ]
      },
      tableToolbar: {
        export: true,
        custom: true
      },
      tableColumn: [
        { type: 'seq', width: 60 },
        { type: 'checkbox', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'nickname', title: 'Nickname' },
        { field: 'age', title: 'Age' },
        { field: 'sex', title: 'Sex' },
        { field: 'describe', title: 'Describe', showOverflow: true }
      ],
      demoCodes: [
        `
        <vxe-grid
          resizable
          export-config
          border
          height="400"
          :loading="loading"
          :form-config="tableForm"
          :toolbar="tableToolbar"
          :data="tableData"
          :columns="tableColumn"
          @form-submit="findList">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              tableForm: {
                data: {
                  name: '',
                  sex: ''
                },
                items: [
                  { field: 'name', title: 'app.body.label.name', itemRender: { name: 'input', attrs: { placeholder: '请输入名称' } } },
                  { field: 'sex', title: '性别', titlePrefix: { message: '帮助信息！！！', icon: 'fa fa-info-circle' }, itemRender: { name: 'select', options: [] } },
                  { itemRender: { name: 'input', attrs: { type: 'submit', value: '查询' } } },
                  { itemRender: { name: 'input', attrs: { type: 'reset', value: '重置' } } }
                ]
              },
              tableToolbar: {
                export: true,
                custom: true
              },
              tableColumn: [
                { type: 'seq', width: 60 },
                { type: 'checkbox', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'nickname', title: 'Nickname' },
                { field: 'age', title: 'Age' },
                { field: 'sex', title: 'Sex' },
                { field: 'describe', title: 'Describe', showOverflow: true }
              ]
            }
          },
          created () {
            this.findList()
            this.findSexList()
          },
          methods: {
            findList () {
              this.loading = true
              XEAjax.get('/api/user/list', this.tableForm.data).then(data => {
                this.tableData = data
                this.loading = false
              })
            },
            async findSexList () {
              const sexList = await XEAjax.get('/api/conf/sex/list')
              // 异步更新下拉选项
              this.tableForm.items[1].itemRender.options = sexList
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
  created () {
    this.findList()
    this.findSexList()
  },
  methods: {
    findList () {
      this.loading = true
      XEAjax.get('/api/user/list', this.tableForm.data).then(data => {
        this.tableData = data
        this.loading = false
      })
    },
    async findSexList () {
      const sexList = await XEAjax.get('/api/conf/sex/list')
      // 异步更新下拉选项
      this.tableForm.items[1].itemRender.options = sexList
    }
  }
}
</script>

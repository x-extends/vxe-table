<template>
  <div>
    <p class="tip">表单</p>

    <vxe-form :data="formData" @submit="findList">
      <vxe-form-item title="app.body.label.name" field="name">
        <vxe-input v-model="formData.name" placeholder="请输入名称"></vxe-input>
      </vxe-form-item>
      <vxe-form-item title="性别" field="sex">
        <select v-model="formData.sex" class="vxe-select">
          <option value="0"></option>
          <option value="1">女</option>
          <option value="2">男</option>
        </select>
      </vxe-form-item>
      <vxe-form-item>
        <vxe-button type="submit" status="primary">查询</vxe-button>
        <vxe-button type="reset">重置</vxe-button>
      </vxe-form-item>
    </vxe-form>

    <vxe-table
      show-overflow
      height="400"
      :loading="loading"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
    </vxe-table>

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
      formData: {
        name: '',
        sex: ''
      },
      tableData: [],
      demoCodes: [
        `
        <vxe-form :data="formData" @submit="findList">
          <vxe-form-item title="app.body.label.name" field="name">
            <vxe-input v-model="formData.name" placeholder="请输入名称"></vxe-input>
          </vxe-form-item>
          <vxe-form-item title="性别" field="sex">
            <select v-model="formData.sex" class="vxe-select">
              <option value="0"></option>
              <option value="1">女</option>
              <option value="2">男</option>
            </select>
          </vxe-form-item>
          <vxe-form-item>
            <vxe-button type="submit" status="primary">查询</vxe-button>
            <vxe-button type="reset">重置</vxe-button>
          </vxe-form-item>
        </vxe-form>

        <vxe-table
          show-overflow
          height="400"
          :loading="loading"
          :data="tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              formData: {
                name: '',
                sex: ''
              },
              tableData: []
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              XEAjax.get('/api/user/list', this.formData).then(data => {
                this.tableData = data
                this.loading = false
              })
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
  },
  methods: {
    findList () {
      this.loading = true
      XEAjax.get('/api/user/list', this.formData).then(data => {
        this.tableData = data
        this.loading = false
      })
    }
  }
}
</script>

<template>
  <div>
    <p class="tip">表单</p>

    <vxe-form :data="formData" @submit="findList">
      <vxe-form-item title="app.body.label.name" field="name">
        <vxe-input v-model="formData.name" placeholder="请输入名称"></vxe-input>
      </vxe-form-item>
      <vxe-form-item title="性别" field="sex">
        <vxe-select v-model="formData.sex" placeholder="请选择性别">
          <vxe-option v-for="(item, index) in sexList" :key="index" :value="item.value" :label="item.label"></vxe-option>
        </vxe-select>
      </vxe-form-item>
      <vxe-form-item>
        <vxe-button type="submit" status="primary">查询</vxe-button>
        <vxe-button type="reset">重置</vxe-button>
      </vxe-form-item>
    </vxe-form>

    <vxe-table
      border
      resizable
      :loading="loading"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input', attrs: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="date2" title="Date" :edit-render="{name: 'input', attrs: {type: 'date'}}"></vxe-table-column>
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
      sexList: [],
      tableData: [],
      demoCodes: [
        `
        <vxe-form :data="formData" @submit="findList">
          <vxe-form-item title="app.body.label.name" field="name">
            <vxe-input v-model="formData.name" placeholder="请输入名称"></vxe-input>
          </vxe-form-item>
          <vxe-form-item title="性别" field="sex">
            <vxe-select v-model="formData.sex" placeholder="请选择性别">
              <vxe-option v-for="(item, index) in sexList" :key="index" :value="item.value" :label="item.label"></vxe-option>
            </vxe-select>
          </vxe-form-item>
          <vxe-form-item>
            <vxe-button type="submit" status="primary">查询</vxe-button>
            <vxe-button type="reset">重置</vxe-button>
          </vxe-form-item>
        </vxe-form>

        <vxe-table
          border
          resizable
          :loading="loading"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'input', attrs: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="date2" title="Date" :edit-render="{name: 'input', attrs: {type: 'date'}}"></vxe-table-column>
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
              sexList: [],
              tableData: []
            }
          },
          created () {
            this.findList()
            this.findSexList()
          },
          methods: {
            findList () {
              this.loading = true
              XEAjax.get('/api/user/list', this.formData).then(data => {
                this.tableData = data
                this.loading = false
              })
            },
            async findSexList () {
              this.sexList = await XEAjax.get('/api/conf/sex/list')
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
      XEAjax.get('/api/user/list', this.formData).then(data => {
        this.tableData = data
        this.loading = false
      })
    },
    async findSexList () {
      this.sexList = await XEAjax.get('/api/conf/sex/list')
    }
  }
}
</script>

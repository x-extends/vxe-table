<template>
  <div>
    <p>使用自带的分页 <pager-api-link name="vxe-pager"/></p>
    <p>如果要支持动态序号，可以通过 <table-api-link prop="start-index"/> 属性设置起始值</p>
    <p>如果要支持保留选中状态，可以通过设置 <table-api-link prop="select-config"/> 的 <table-api-link prop="reserve"/> 属性</p>
    <p class="red">设置 reserve 需要指定 <table-api-link prop="row-key"/> 或者 ( <table-api-link prop="select-config"/>、<table-api-link prop="tree-config"/>、<table-api-link prop="expand-config"/>、<table-api-link prop="edit-config"/> ) 中的 key 任意配置一个即可</p>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="460"
      :loading="loading"
      :start-index="(tablePage.currentPage - 1) * tablePage.pageSize"
      :select-config="{key: 'id', reserve: true}"
      :data.sync="tableData">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <vxe-table-column type="index" label="序号" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate"></vxe-table-column>
    </vxe-table>

    <vxe-pager
      :loading="loading"
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager>

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
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          ref="xTable"
          height="460"
          :loading="loading"
          :start-index="(tablePage.currentPage - 1) * tablePage.pageSize"
          :select-config="{key: 'id', reserve: true}"
          :data.sync="tableData">
          <vxe-table-column type="selection" width="60"></vxe-table-column>
          <vxe-table-column type="index" label="序号" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
          <vxe-table-column prop="rate" label="Rate"></vxe-table-column>
        </vxe-table>

        <vxe-pager
          :loading="loading"
          :current-page="tablePage.currentPage"
          :page-size="tablePage.pageSize"
          :total="tablePage.totalResult"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange">
        </vxe-pager>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              tablePage: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
              }
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              XEAjax.doGet(\`/api/user/page/list/\${this.tablePage.pageSize}/\${this.tablePage.currentPage}\`, this.formData).then(response => {
                let { page, result } = response.data
                this.tableData = result
                this.tablePage.totalResult = page.totalResult
                this.loading = false
              }).catch(e => {
                this.loading = false
              })
            },
            handlePageChange ({ currentPage, pageSize }) {
              this.tablePage.currentPage = currentPage
              this.tablePage.pageSize = pageSize
              this.findList()
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      XEAjax.doGet(`/api/user/page/list/${this.tablePage.pageSize}/${this.tablePage.currentPage}`, this.formData).then(response => {
        let { page, result } = response.data
        this.tableData = result
        this.tablePage.totalResult = page.totalResult
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.findList()
    }
  }
}
</script>

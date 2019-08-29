<template>
  <div>
    <p class="tip">通过配置 <grid-api-link prop="pager-config"/> 参数开启分页功能，对于分页场景下，如果要实现分页动态序号，可以通过 <table-api-link prop="start-index"/> 属性设置起始值</p>

    <vxe-grid
      border
      resizable
      height="530"
      :loading="loading"
      :start-index="(tablePage.currentPage - 1) * tablePage.pageSize"
      :pager-config="tablePage"
      :columns="tableColumn"
      :data="tableData"
      @page-change="handlePageChange"></vxe-grid>

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
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100, 200, 500]
      },
      tableColumn: [
        { type: 'index', width: 60 },
        { type: 'selection', width: 50 },
        { field: 'name', title: 'Name' },
        { field: 'nickname', title: 'Nickname' },
        { field: 'role', title: 'Role' },
        { field: 'describe', title: 'Describe', showOverflow: true }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          height="530"
          :loading="loading"
          :start-index="(tablePage.currentPage - 1) * tablePage.pageSize"
          :pager-config="tablePage"
          :columns="tableColumn"
          :data="tableData"
          @page-change="handlePageChange"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tablePage: {
                total: 0,
                currentPage: 1,
                pageSize: 10
              },
              tableColumn: [
                { type: 'index', width: 60 },
                { type: 'selection', width: 50 },
                { field: 'name', title: 'Name' },
                { field: 'nickname', title: 'Nickname' },
                { field: 'role', title: 'Role' },
                { field: 'describe', title: 'Describe', showOverflow: true }
              ],
              tableData: []
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              // 模拟后台接口
              this.loading = true
              XEAjax.doGet(\`/api/user/page/list/\${this.tablePage.pageSize}/\${this.tablePage.currentPage}\`).then(response => {
                let { page, result } = response.data
                this.tableData = result
                this.tablePage.total = page.total
                this.loading = false
              }).catch(e => {
                this.loading = false
              })
            },
            searchEvent () {
              this.tablePage.currentPage = 1
              this.findList()
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
      // 模拟后台接口
      this.loading = true
      XEAjax.doGet(`/api/user/page/list/${this.tablePage.pageSize}/${this.tablePage.currentPage}`).then(response => {
        let { page, result } = response.data
        this.tableData = result
        this.tablePage.total = page.total
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    searchEvent () {
      this.tablePage.currentPage = 1
      this.findList()
    },
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.findList()
    }
  }
}
</script>

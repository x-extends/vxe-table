<template>
  <div>
    <p>通过配置 page-config 参数开启分页功能</p>

    <vxe-grid
      border
      height="530"
      :loading="loading"
      :page-config="tablePage"
      :columns="tableColumn"
      :data.sync="tableData"
      @current-page-change="handleCurrentChange"
      @page-size-change="handleSizeChange"></vxe-grid>

    <p class="demo-code">显示代码</p>

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
        { prop: 'name', label: 'Name' },
        { prop: 'nickname', label: 'Nickname' },
        { prop: 'role', label: 'Role' },
        { prop: 'describe', label: 'Describe', showOverflow: true }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          height="530"
          :loading="loading"
          :page-config="tablePage"
          :columns="tableColumn"
          :data.sync="tableData"
          @current-page-change="handleCurrentChange"
          @page-size-change="handleSizeChange"></vxe-grid>
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
                { prop: 'name', label: 'Name' },
                { prop: 'nickname', label: 'Nickname' },
                { prop: 'role', label: 'Role' },
                { prop: 'describe', label: 'Describe', showOverflow: true }
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
            handleSizeChange (pageSize) {
              this.tablePage.pageSize = pageSize
              this.searchEvent()
            },
            handleCurrentChange (currentPage) {
              this.tablePage.currentPage = currentPage
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
    handleSizeChange (pageSize) {
      this.tablePage.pageSize = pageSize
      this.searchEvent()
    },
    handleCurrentChange (currentPage) {
      this.tablePage.currentPage = currentPage
      this.findList()
    }
  }
}
</script>

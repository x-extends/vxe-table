<template>
  <div>
    <p class="tip">可编辑表格</p>

    <vxe-grid
      border
      resizable
      ref="xGrid"
      height="530"
      :loading="loading"
      :pager-config="tablePage"
      :columns="tableColumn"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @page-change="handlePageChange"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
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
        { type: 'seq', width: 60 },
        { type: 'checkbox', width: 50 },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
        { field: 'sex', title: 'Sex', editRender: { name: 'select', options: [] } },
        { field: 'role', title: 'Role', editRender: { name: 'input' } },
        { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          ref="xGrid"
          height="530"
          :loading="loading"
          :pager-config="tablePage"
          :columns="tableColumn"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
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
                { type: 'seq', width: 60 },
                { type: 'checkbox', width: 50 },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
                { field: 'sex', title: 'Sex', editRender: { name: 'select', options: [] } },
                { field: 'role', title: 'Role', editRender: { name: 'input' } },
                { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } }
              ],
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
              this.$ajax.get(\`/api/user/page/list/\${this.tablePage.pageSize}/\${this.tablePage.currentPage}\`)then(({ page, result }) => {
                this.tableData = result
                this.tablePage.total = page.total
                this.loading = false
              }).catch(e => {
                this.loading = false
              })
            },
            findSexList () {
              return this.$ajax.get('/api/conf/sex/list').then(data => {
                // 异步更新下拉选项
                let column = this.$refs.xGrid.getColumnByField('sex')
                column.editRender.options = data
              })
            },
            searchEvent () {
              this.tablePage.currentPage = 1
              this.findList()
            },
            handlePageChange ({currentPage, pageSize}) {
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
    this.findSexList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      this.$ajax.get(`/api/user/page/list/${this.tablePage.pageSize}/${this.tablePage.currentPage}`).then(({ page, result }) => {
        this.tableData = result
        this.tablePage.total = page.total
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    findSexList () {
      return this.$ajax.get('/api/conf/sex/list').then(data => {
        // 异步更新下拉选项
        let column = this.$refs.xGrid.getColumnByField('sex')
        column.editRender.options = data
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

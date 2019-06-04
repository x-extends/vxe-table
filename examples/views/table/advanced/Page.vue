<template>
  <div>
    <p>使用自带的分页 <pager-api-link name="vxe-pager"/></p>

    <vxe-table
      border
      show-all-overflow
      ref="xTable"
      height="460"
      :loading="loading"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate"></vxe-table-column>
    </vxe-table>

    <vxe-pager
      :loading="loading"
      :current-page="pageVO.currentPage"
      :page-size="pageVO.pageSize"
      :total="pageVO.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
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
      pageVO: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      demoCodes: [
        `
          <vxe-table
            border
            show-all-overflow
            ref="xTable"
            height="460"
            :loading="loading"
            :data.sync="tableData">
            <vxe-table-column type="index" width="60"></vxe-table-column>
            <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
            <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
            <vxe-table-column prop="age" label="Age"></vxe-table-column>
            <vxe-table-column prop="rate" label="Rate"></vxe-table-column>
          </vxe-table>

          <vxe-pager
            :loading="loading"
            :current-page="pageVO.currentPage"
            :page-size="pageVO.pageSize"
            :total="pageVO.totalResult"
            :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
          </vxe-pager>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              pageVO: {
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
              XEAjax.doGet(\`/api/user/page/list/\${this.pageVO.pageSize}/\${this.pageVO.currentPage}\`, this.formData).then(response => {
                let { page, result } = response.data
                this.tableData = result
                this.pageVO.totalResult = page.totalResult
                this.loading = false
              }).catch(e => {
                this.loading = false
              })
            },
            searchEvent () {
              this.pageVO.currentPage = 1
              this.findList()
            },
            handleSizeChange (pageSize) {
              this.pageVO.pageSize = pageSize
              this.searchEvent()
            },
            handleCurrentChange (currentPage) {
              this.pageVO.currentPage = currentPage
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
      XEAjax.doGet(`/api/user/page/list/${this.pageVO.pageSize}/${this.pageVO.currentPage}`, this.formData).then(response => {
        let { page, result } = response.data
        this.tableData = result
        this.pageVO.totalResult = page.totalResult
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    searchEvent () {
      this.pageVO.currentPage = 1
      this.findList()
    },
    handleSizeChange (pageSize) {
      this.pageVO.pageSize = pageSize
      this.searchEvent()
    },
    handleCurrentChange (currentPage) {
      this.pageVO.currentPage = currentPage
      this.findList()
    }
  }
}
</script>

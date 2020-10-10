<template>
  <div>
    <p class="tip">使用自带的分页 <pager-api-link name="vxe-pager"/></p>

    <p class="tip">默认样式</p>

    <vxe-table
      show-overflow
      height="200"
      row-id="id"
      :loading="loading1"
      :data="tableData1">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
    </vxe-table>

    <vxe-pager
      :loading="loading1"
      :current-page="tablePage1.currentPage"
      :page-size="tablePage1.pageSize"
      :total="tablePage1.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange1">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">设置分页 border 样式</p>

    <vxe-table
      border
      show-overflow
      height="200"
      row-id="id"
      size="medium"
      :loading="loading2"
      :data="tableData2">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
    </vxe-table>

    <vxe-pager
      border
      size="medium"
      :loading="loading2"
      :current-page="tablePage2.currentPage"
      :page-size="tablePage2.pageSize"
      :total="tablePage2.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange2">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">设置分页 background 样式，自定义每页大小</p>

    <vxe-table
      border
      show-overflow
      height="200"
      row-id="id"
      size="small"
      :loading="loading3"
      :data="tableData3">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
    </vxe-table>

    <vxe-pager
      background
      size="small"
      :loading="loading3"
      :current-page="tablePage3.currentPage"
      :page-size="tablePage3.pageSize"
      :total="tablePage3.totalResult"
      :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange3">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>

    <p class="tip">
      如果要支持动态序号，可以通过 <table-api-link prop="seq-config"/>={<table-api-link prop="startIndex"/>} 属性设置起始值<br>
      如果要支持保留选中状态，可以通过设置 <table-api-link prop="checkbox-config"/> 的 <table-api-link prop="reserve"/> 属性<br>
      启用 reserve 功能需要有 row-id 唯一主键，可以通过调用 <table-api-link prop="getCheckboxReserveRecords"/> 方法获取获取已保留选中的行数据
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button size="mini" @click="getSelectReserveEvent">获取已保留选中的行数据</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      ref="xTable4"
      height="200"
      row-id="id"
      size="mini"
      :loading="loading4"
      :seq-config="{startIndex: (tablePage4.currentPage - 1) * tablePage4.pageSize}"
      :checkbox-config="{reserve: true}"
      :data="tableData4">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
    </vxe-table>

    <vxe-pager
      perfect
      size="mini"
      :loading="loading4"
      :current-page="tablePage4.currentPage"
      :page-size="tablePage4.pageSize"
      :total="tablePage4.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange4">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tablePage1: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      tablePage2: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      tablePage3: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      tablePage4: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      demoCodes: [
        `
        <vxe-table
          show-overflow
          height="200"
          row-id="id"
          :loading="loading1"
          :data="tableData1">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>

        <vxe-pager
          :loading="loading1"
          :current-page="tablePage1.currentPage"
          :page-size="tablePage1.pageSize"
          :total="tablePage1.totalResult"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange1">
        </vxe-pager>
        `,
        `
        export default {
          data () {
            return {
              loading1: false,
              tableData1: [],
              tablePage1: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
              }
            }
          },
          created () {
            this.findList1()
          },
          methods: {
            findList1 () {
              this.loading = true
              XEAjax.get(\`/api/user/page/list/\${this.tablePage1.pageSize}/\${this.tablePage1.currentPage}\`)then(({ page, result }) => {
                this.tableData1 = result
                this.tablePage1.totalResult = page.totalResult
                this.loading1 = false
              }).catch(e => {
                this.loading1 = false
              })
            },
            handlePageChange1 ({ currentPage, pageSize }) {
              this.tablePage1.currentPage = currentPage
              this.tablePage1.pageSize = pageSize
              this.findList1()
            }
          }
        }
        `,
        `
        <vxe-table
          border
          show-overflow
          height="200"
          row-id="id"
          size="medium"
          :loading="loading2"
          :data="tableData2">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>

        <vxe-pager
          border
          size="medium"
          :loading="loading2"
          :current-page="tablePage2.currentPage"
          :page-size="tablePage2.pageSize"
          :total="tablePage2.totalResult"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange2">
        </vxe-pager>
        `,
        `
        export default {
          data () {
            return {
              loading2: false,
              tableData2: [],
              tablePage2: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
              }
            }
          },
          created () {
            this.findList2()
          },
          methods: {
            findList2 () {
              this.loading = true
              XEAjax.get(\`/api/user/page/list/\${this.tablePage2.pageSize}/\${this.tablePage2.currentPage}\`)then(({ page, result }) => {
                this.tableData2 = result
                this.tablePage2.totalResult = page.totalResult
                this.loading2 = false
              }).catch(e => {
                this.loading2 = false
              })
            },
            handlePageChange2 ({ currentPage, pageSize }) {
              this.tablePage2.currentPage = currentPage
              this.tablePage2.pageSize = pageSize
              this.findList2()
            }
          }
        }
        `,
        `
        <vxe-table
          border
          show-overflow
          height="200"
          row-id="id"
          size="small"
          :loading="loading3"
          :data="tableData3">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>

        <vxe-pager
          background
          size="small"
          :loading="loading3"
          :current-page="tablePage3.currentPage"
          :page-size="tablePage3.pageSize"
          :total="tablePage3.totalResult"
          :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange3">
        </vxe-pager>
        `,
        `
        export default {
          data () {
            return {
              loading3: false,
              tableData3: [],
              tablePage3: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
              }
            }
          },
          created () {
            this.findList3()
          },
          methods: {
            findList3 () {
              this.loading3 = true
              XEAjax.get(\`/api/user/page/list/\${this.tablePage3.pageSize}/\${this.tablePage3.currentPage}\`)then(({ page, result }) => {
                this.tableData3 = result
                this.tablePage3.totalResult = page.totalResult
                this.loading3 = false
              }).catch(e => {
                this.loading3 = false
              })
            },
            handlePageChange3 ({ currentPage, pageSize }) {
              this.tablePage3.currentPage = currentPage
              this.tablePage3.pageSize = pageSize
              this.findList3()
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button size="mini" @click="getSelectReserveEvent">获取已保留选中的行数据</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          ref="xTable4"
          height="200"
          row-id="id"
          size="mini"
          :loading="loading4"
          :seq-config="{startIndex: (tablePage4.currentPage - 1) * tablePage4.pageSize}"
          :checkbox-config="{reserve: true}"
          :data="tableData4">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>

        <vxe-pager
          perfect
          size="mini"
          :loading="loading"
          :current-page="tablePage4.currentPage"
          :page-size="tablePage4.pageSize"
          :total="tablePage4.totalResult"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange4">
        </vxe-pager>
        `,
        `
        export default {
          data () {
            return {
              loading4: false,
              tableData4: [],
              tablePage4: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
              }
            }
          },
          created () {
            this.findList4()
          },
          methods: {
            findList4 () {
              this.loading = true
              XEAjax.get(\`/api/user/page/list/\${this.tablePage4.pageSize}/\${this.tablePage4.currentPage}\`)then(({ page, result }) => {
                this.tableData4 = result
                this.tablePage4.totalResult = page.totalResult
                this.loading4 = false
              }).catch(() => {
                this.loading4 = false
              })
            },
            handlePageChange4 ({ currentPage, pageSize }) {
              this.tablePage4.currentPage = currentPage
              this.tablePage4.pageSize = pageSize
              this.findList4()
            },
            getSelectReserveEvent () {
              const selectReserveRecords = this.$refs.xTable4.getCheckboxReserveRecords()
              this.$XModal.alert(selectReserveRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList1()
    this.findList2()
    this.findList3()
    this.findList4()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList1 () {
      this.loading1 = true
      XEAjax.get(`/api/user/page/list/${this.tablePage1.pageSize}/${this.tablePage1.currentPage}`).then(({ page, result }) => {
        this.tableData1 = result
        this.tablePage1.totalResult = page.totalResult
        this.loading1 = false
      }).catch(() => {
        this.loading1 = false
      })
    },
    findList2 () {
      this.loading2 = true
      XEAjax.get(`/api/user/page/list/${this.tablePage2.pageSize}/${this.tablePage2.currentPage}`).then(({ page, result }) => {
        this.tableData2 = result
        this.tablePage2.totalResult = page.totalResult
        this.loading2 = false
      }).catch(() => {
        this.loading2 = false
      })
    },
    findList3 () {
      this.loading3 = true
      XEAjax.get(`/api/user/page/list/${this.tablePage3.pageSize}/${this.tablePage3.currentPage}`).then(({ page, result }) => {
        this.tableData3 = result
        this.tablePage3.totalResult = page.totalResult
        this.loading3 = false
      }).catch(() => {
        this.loading3 = false
      })
    },
    findList4 () {
      this.loading4 = true
      XEAjax.get(`/api/user/page/list/${this.tablePage4.pageSize}/${this.tablePage4.currentPage}`).then(({ page, result }) => {
        this.tableData4 = result
        this.tablePage4.totalResult = page.totalResult
        this.loading4 = false
      }).catch(() => {
        this.loading4 = false
      })
    },
    handlePageChange1 ({ currentPage, pageSize }) {
      this.tablePage1.currentPage = currentPage
      this.tablePage1.pageSize = pageSize
      this.findList1()
    },
    handlePageChange2 ({ currentPage, pageSize }) {
      this.tablePage2.currentPage = currentPage
      this.tablePage2.pageSize = pageSize
      this.findList2()
    },
    handlePageChange3 ({ currentPage, pageSize }) {
      this.tablePage3.currentPage = currentPage
      this.tablePage3.pageSize = pageSize
      this.findList3()
    },
    handlePageChange4 ({ currentPage, pageSize }) {
      this.tablePage4.currentPage = currentPage
      this.tablePage4.pageSize = pageSize
      this.findList4()
    },
    getSelectReserveEvent () {
      const selectReserveRecords = this.$refs.xTable4.getCheckboxReserveRecords()
      this.$XModal.alert(selectReserveRecords.length)
    }
  }
}
</script>

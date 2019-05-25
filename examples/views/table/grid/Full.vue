<template>
  <div>
    <p>固定列、服务端排序、服务端筛选、服务端分页</p>

    <vxe-grid
      border
      height="548"
      :loading="loading"
      :pages="tablePage"
      :columns="tableColumn"
      :data.sync="tableData"
      @sort-change="sortChangeEvent"
      @filter-change="filterChangeEvent"
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
      formData: {
        sort: '',
        order: ''
      },
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        background: true
      },
      tableColumn: [
        {
          type: 'selection',
          width: 50,
          fixed: 'left'
        },
        {
          type: 'index',
          width: 60,
          fixed: 'left'
        },
        {
          prop: 'id',
          label: 'ID',
          width: 100,
          sortable: 'custom'
        },
        {
          prop: 'name',
          label: 'Name',
          width: 300,
          sortable: 'custom'
        },
        {
          prop: 'nickname',
          label: 'Nickname',
          sortable: 'custom',
          width: 300
        },
        {
          prop: 'age',
          label: 'Age',
          sortable: 'custom',
          width: 100
        },
        {
          prop: 'role',
          label: 'Role',
          sortable: 'custom',
          width: 200,
          filters: [
            { label: '前端', value: '前端' },
            { label: '后端', value: '后端' },
            { label: '测试', value: '测试' }
          ],
          filterMultiple: false,
          filterMethod: 'custom'
        },
        {
          prop: 'describe',
          label: 'Describe',
          width: 300,
          showOverflow: true
        }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          height="548"
          :loading="loading"
          :pages="tablePage"
          :columns="tableColumn"
          :data.sync="tableData"
          @sort-change="sortChangeEvent"
          @filter-change="filterChangeEvent"
          @current-page-change="handleCurrentChange"
          @page-size-change="handleSizeChange"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              formData: {
                sort: '',
                order: ''
              },
              tablePage: {
                total: 0,
                currentPage: 1,
                pageSize: 10,
                background: true
              },
              tableColumn: [
                {
                  type: 'selection',
                  width: 50,
                  fixed: 'left'
                },
                {
                  type: 'index',
                  width: 50,
                  fixed: 'left'
                },
                {
                  prop: 'id',
                  label: 'ID',
                  width: 100,
                  sortable: 'custom'
                },
                {
                  prop: 'name',
                  label: 'Name',
                  width: 300,
                  sortable: 'custom'
                },
                {
                  prop: 'nickname',
                  label: 'Nickname',
                  sortable: 'custom',
                  width: 300
                },
                {
                  prop: 'age',
                  label: 'Age',
                  sortable: 'custom',
                  width: 100
                },
                {
                  prop: 'role',
                  label: 'Role',
                  sortable: 'custom',
                  width: 200,
                  filters: [
                    { label: '前端', value: '前端' },
                    { label: '后端', value: '后端' },
                    { label: '测试', value: '测试' }
                  ],
                  filterMultiple: false,
                  filterMethod: 'custom'
                },
                {
                  prop: 'describe',
                  label: 'Describe',
                  width: 300,
                  showOverflow: true
                }
              ]
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              // 模拟后台接口
              this.loading = true
              XEAjax.doGet(\`/api/user/page/list/\${this.tablePage.pageSize}/\${this.tablePage.currentPage}\`, this.formData).then(response => {
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
            },
            sortChangeEvent ({ column, prop, order }) {
              this.formData.sort = prop
              this.formData.order = order
              this.findList()
            },
            filterChangeEvent ({ column, prop, values }) {
              this.formData = {
                [prop]: values[0]
              }
              this.searchEvent()
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
      XEAjax.doGet(`/api/user/page/list/${this.tablePage.pageSize}/${this.tablePage.currentPage}`, this.formData).then(response => {
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
    },
    sortChangeEvent ({ column, prop, order }) {
      this.formData.sort = prop
      this.formData.order = order
      this.findList()
    },
    filterChangeEvent ({ column, prop, values }) {
      this.formData = {
        [prop]: values[0]
      }
      this.searchEvent()
    }
  }
}
</script>

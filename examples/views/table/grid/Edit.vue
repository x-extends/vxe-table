<template>
  <div>
    <p class="tip">可编辑表格</p>

    <vxe-grid
      border
      resizable
      keep-source
      ref="xGrid"
      height="530"
      :loading="loading"
      :pager-config="tablePage"
      :columns="tableColumn"
      :data="tableData"
      :edit-config="{trigger: 'manual', mode: 'row', showStatus: true, icon: 'fa fa-file-text-o'}"
      @page-change="handlePageChange">
      <template v-slot:operate="{ row }">
        <template v-if="$refs.xGrid.isActiveByRow(row)">
          <vxe-button icon="fa fa-save" status="primary" title="保存" circle @click="saveRowEvent(row)"></vxe-button>
        </template>
        <template v-else>
          <vxe-button icon="fa fa-edit" title="编辑" circle @click="editRowEvent(row)"></vxe-button>
        </template>
        <vxe-button icon="fa fa-trash" title="删除" circle @click="removeRowEvent(row)"></vxe-button>
        <vxe-button icon="fa fa-eye" title="查看" circle></vxe-button>
        <vxe-button icon="fa fa-gear" title="设置" circle></vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'

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
        { field: 'sex', title: 'Sex', editRender: { name: '$select', options: [] } },
        { field: 'role', title: 'Role', editRender: { name: 'input' } },
        { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } },
        { title: '操作', width: 200, slots: { default: 'operate' } }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          keep-source
          ref="xGrid"
          height="530"
          :loading="loading"
          :pager-config="tablePage"
          :columns="tableColumn"
          :data="tableData"
          :edit-config="{trigger: 'manual', mode: 'row', showStatus: true, icon: 'fa fa-file-text-o'}"
          @page-change="handlePageChange">
          <template v-slot:operate="{ row }">
            <template v-if="$refs.xGrid.isActiveByRow(row)">
              <vxe-button icon="fa fa-save" status="primary" title="保存" circle @click="saveRowEvent(row)"></vxe-button>
            </template>
            <template v-else>
              <vxe-button icon="fa fa-edit" title="编辑" circle @click="editRowEvent(row)"></vxe-button>
            </template>
            <vxe-button icon="fa fa-trash" title="删除" circle @click="removeRowEvent(row)"></vxe-button>
            <vxe-button icon="fa fa-eye" title="查看" circle></vxe-button>
            <vxe-button icon="fa fa-gear" title="设置" circle></vxe-button>
          </template>
        </vxe-grid>
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
                { field: 'sex', title: 'Sex', editRender: { name: '$select', options: [] } },
                { field: 'role', title: 'Role', editRender: { name: 'input' } },
                { field: 'describe', title: 'Describe', showOverflow: true, editRender: { name: 'input' } },
                { title: '操作', width: 200, slots: { default: 'operate' } }
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
              XEAjax.get(\`/api/user/page/list/\${this.tablePage.pageSize}/\${this.tablePage.currentPage}\`)then(({ page, result }) => {
                this.tableData = result
                this.tablePage.total = page.total
                this.loading = false
              }).catch(e => {
                this.loading = false
              })
            },
            findSexList () {
              return XEAjax.get('/api/conf/sex/list').then(data => {
                // 异步更新下拉选项
                if (this.$refs.xGrid) {
                  const column = this.$refs.xGrid.getColumnByField('sex')
                  column.editRender.options = data
                }
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
            },
            editRowEvent (row) {
              this.$refs.xGrid.setActiveRow(row)
            },
            saveRowEvent () {
              this.$refs.xGrid.clearActived().then(() => {
                this.loading = true
                setTimeout(() => {
                  this.loading = false
                  this.$XModal.message({ message: '保存成功！', status: 'success' })
                }, 300)
              })
            },
            removeRowEvent (row) {
              this.$XModal.confirm('您确定要删除该数据?').then(type => {
                if (type === 'confirm') {
                  this.$refs.xGrid.remove(row)
                }
              })
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
  methods: {
    findList () {
      this.loading = true
      XEAjax.get(`/api/user/page/list/${this.tablePage.pageSize}/${this.tablePage.currentPage}`).then(({ page, result }) => {
        this.tableData = result
        this.tablePage.total = page.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    findSexList () {
      return XEAjax.get('/api/conf/sex/list').then(data => {
        // 异步更新下拉选项
        if (this.$refs.xGrid) {
          const column = this.$refs.xGrid.getColumnByField('sex')
          column.editRender.options = data
        }
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
    },
    editRowEvent (row) {
      this.$refs.xGrid.setActiveRow(row)
    },
    saveRowEvent () {
      this.$refs.xGrid.clearActived().then(() => {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$XModal.message({ message: '保存成功！', status: 'success' })
        }, 300)
      })
    },
    removeRowEvent (row) {
      this.$XModal.confirm('您确定要删除该数据?').then(type => {
        if (type === 'confirm') {
          this.$refs.xGrid.remove(row)
        }
      })
    }
  }
}
</script>

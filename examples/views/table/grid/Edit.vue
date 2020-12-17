<template>
  <div>
    <p class="tip">可编辑表格</p>

    <vxe-grid
      border
      resizable
      keep-source
      show-overflow
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
          show-overflow
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
            setTimeout(() => {
              // 异步更新下拉选项
              if (this.$refs.xGrid) {
                const column = this.$refs.xGrid.getColumnByField('sex')
                column.editRender.options = [
                  { value: '1', label: '男' },
                  { value: '0', label: '女' }
                ]
              }
            }, 300)
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              setTimeout(() => {
                this.loading = false
                this.tablePage.total = 10
                this.tableData = [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Develop', sex: '0', age: 27, address: 'Shanghai' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '1', age: 29, address: 'Shenzhen' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
                  { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', age: 30, address: 'Shenzhen' },
                  { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' }
                ]
              }, 300)
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
    setTimeout(() => {
      // 异步更新下拉选项
      if (this.$refs.xGrid) {
        const column = this.$refs.xGrid.getColumnByField('sex')
        column.editRender.options = [
          { value: '1', label: '男' },
          { value: '0', label: '女' }
        ]
      }
    }, 300)
    this.findList()
  },
  methods: {
    findList () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.tablePage.total = 10
        this.tableData = [
          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
          { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
          { id: 10006, name: 'Test6', nickname: 'T6', role: 'Develop', sex: '0', age: 27, address: 'Shanghai' },
          { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '1', age: 29, address: 'Shenzhen' },
          { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
          { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', age: 30, address: 'Shenzhen' },
          { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' }
        ]
      }, 300)
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

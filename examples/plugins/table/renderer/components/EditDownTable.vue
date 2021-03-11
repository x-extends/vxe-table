<template>
  <div class="edit-down-table">
    <vxe-pulldown class="edit-down-pulldown" ref="xDown" transfer>
      <template>
        <vxe-input class="edit-down-input" v-model="row[column.property]" suffix-icon="fa fa-caret-down" @keyup="keyupEvent" @click="clickEvent" @suffix-click="suffixClick"></vxe-input>
      </template>
      <template v-slot:dropdown>
        <div class="edit-down-wrapper">
          <vxe-grid
            highlight-hover-row
            auto-resize
            height="auto"
            :loading="loading"
            :pager-config="tablePage"
            :data="tableData"
            :columns="tableColumn"
            @cell-click="selectEvent"
            @page-change="pageChangeEvent">
          </vxe-grid>
        </div>
      </template>
    </vxe-pulldown>
  </div>
</template>

<script>
export default {
  name: 'EditDownTable',
  props: {
    params: Object
  },
  data () {
    return {
      row: null,
      column: null,
      loading: false,
      tableData: [],
      tableColumn: [
        { type: 'seq' },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex' }
      ],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      const { row, column } = this.params
      this.row = row
      this.column = column
      this.getData().then(data => {
        this.tableData = data
      })
    },
    getData () {
      return new Promise(resolve => {
        setTimeout(() => {
          const list = [
            { name: 'Test1', role: '前端', sex: '男' },
            { name: 'Test2', role: '后端', sex: '男' },
            { name: 'Test3', role: '测试', sex: '男' },
            { name: 'Test4', role: '设计师', sex: '女' },
            { name: 'Test5', role: '前端', sex: '男' },
            { name: 'Test6', role: '前端', sex: '男' },
            { name: 'Test7', role: '前端', sex: '男' }
          ]
          resolve(list)
        }, 100)
      })
    },
    clickEvent () {
      this.$refs.xDown.showPanel()
    },
    keyupEvent () {
      const { row, column } = this
      const cellValue = row[column.property]
      this.loading = true
      this.getData().then(data => {
        this.loading = false
        if (cellValue) {
          this.tableData = data.filter(item => item.name.indexOf(cellValue) > -1)
        } else {
          this.tableData = data
        }
      })
    },
    suffixClick () {
      this.$refs.xDown.togglePanel()
    },
    pageChangeEvent ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.loading = true
      this.getData().then(data => {
        this.loading = false
        this.tableData = data
      })
    },
    selectEvent (params) {
      const { row, column } = this
      row[column.property] = params.row.name
      this.$refs.xDown.hidePanel()
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-down-pulldown {
  width: 100%;
}
.edit-down-wrapper {
  width: 600px;
  height: 300px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
}
</style>

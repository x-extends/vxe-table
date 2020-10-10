<template>
  <div class="edit-down-modal">
    <vxe-input class="edit-down-input" v-model="row[column.property]" @keyup="keyupEvent"></vxe-input>
    <vxe-button class="edit-popup-button" status="primary" @click="popupEvent">选择</vxe-button>
    <vxe-modal
      show-footer
      class="vxe-table--ignore-clear edit-popup-box"
      title="选择多条"
      width="800"
      height="400"
      v-model="modalVisible"
      @confirm="confirmEvent">
      <template v-slot>
        <vxe-grid
          highlight-hover-row
          auto-resize
          ref="xGrid"
          height="auto"
          :loading="loading"
          :pager-config="tablePage"
          :data="tableData"
          :columns="tableColumn"
          @page-change="pageChangeEvent">
        </vxe-grid>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
export default {
  name: 'EditDownModal',
  props: {
    params: Object
  },
  data () {
    return {
      row: null,
      column: null,
      modalVisible: false,
      loading: false,
      tableData: [],
      tableColumn1: [
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex' }
      ],
      tableColumn: [
        { type: 'checkbox', width: 80 },
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
    popupEvent () {
      this.modalVisible = true
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
    confirmEvent () {
      const { row, column } = this
      const selectRecords = this.$refs.xGrid.getCheckboxRecords()
      row[column.property] = `${selectRecords.length}条`
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-down-modal {
  display: flex;
  align-items: center;
}
.edit-down-pulldown {
  width: auto;
  flex-grow: 1;
}
.edit-down-input {
   /deep/ .vxe-input--inner {
    border-radius: 4px 0 0 4px;
  }
}
.edit-popup-button.vxe-button {
  flex-shrink: 0;
  border-radius: 0 4px 4px 0;
}
</style>

<template>
  <div>
    <p>加载 1 万行 1 万列</p>

    <vxe-table-config
      border
      resizable
      height="600"
      :columns="tableColumn"
      :loading="loading"
      :data.sync="tableData">
    </vxe-table-config>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableColumn: [],
      tableData: []
    }
  },
  created () {
    this.loading = true
    this.tableData = []
    setTimeout(() => {
      let list = window.MOCK_DATA_LIST.slice(0, 10000)
      this.tableData = list
      this.tableColumn = window.MOCK_COLUMN_LIST.slice(0, 10000)
      this.loading = false
    }, 500)
  }
}
</script>

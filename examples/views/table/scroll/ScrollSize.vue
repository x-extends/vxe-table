<template>
  <div>
    <p>加载 {{ $route.params.size }} 条</p>

    <vxe-table
      border
      resizable
      height="600"
      :loading="loading"
      :data.sync="tableData">
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  created () {
    this.loading = true
    this.tableData = []
    setTimeout(() => {
      let size = this.$route.params.size
      let list = window.CACHE_DATA_LIST.slice(0, size)
      this.tableData = list
      this.loading = false
    }, 500)
  }
}
</script>

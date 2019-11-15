<template>
  <div>
    <p>子路由 3</p>

    <vxe-table
      border
      height="400"
      :loading="loading"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="nickname" title="nickname"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="date12" title="Date"></vxe-table-column>
      <vxe-table-column field="region" title="Region"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
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
    setTimeout(() => {
      this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
      this.loading = false
    }, 300)
  }
}
</script>

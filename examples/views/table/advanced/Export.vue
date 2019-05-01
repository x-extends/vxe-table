<template>
  <div>
    <p>通过调用 exportCsv 函数可以直接将表格导出为 .cvs 格式的文件；</p>

    <button @click="$refs.vTable.exportCsv()">导出</button>
    <vxe-table
      ref="vTable"
      highlight-hover-row
      height="400"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
      <vxe-table-column prop="address" label="Address"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    let list = window.CACHE_DATA_LIST.slice(0, 50)
    this.tableData = list
  }
}
</script>

<template>
  <div>
    <p>当一个表格高度需要自适应的时候可以设置为流体高度</p>

    <vxe-table
      border
      highlight-hover-row
      max-height="200"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p>如果设置 <table-api-link prop="max-height"/>，当内容为达到最大高度时会自适应</p>

    <vxe-table
      border
      highlight-hover-row
      max-height="200"
      :data.sync="tableData2">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      tableData2: []
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 50)
    this.tableData = list
    this.tableData2 = window.MOCK_DATA_LIST.slice(0, 2)
  }
}
</script>

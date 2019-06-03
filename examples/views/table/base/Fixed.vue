<template>
  <div>
    <p>固定列，通过设置 <table-column-api-link prop="fixed"/> 参数</p>
    <p>当横向内容过多时，将列固定在左右两侧</p>

    <vxe-table
      border
      show-all-overflow
      :data.sync="tableData">
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" width="300"></vxe-table-column>
      <vxe-table-column prop="role" label="Role" width="300"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" width="300"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" width="300"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" fixed="right" width="300"></vxe-table-column>
    </vxe-table>

    <p>如果列宽足够的情况下，固定列不会浮动</p>

    <vxe-table
      border
      show-all-overflow
      :data.sync="tableData">
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="role" label="Role"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" fixed="right" width="300"></vxe-table-column>
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
    let list = window.MOCK_DATA_LIST.slice(0, 4)
    this.tableData = list
  }
}
</script>

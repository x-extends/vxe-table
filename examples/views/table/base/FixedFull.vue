<template>
  <div>
    <p>横纵内容过多时，同时固定列和表头</p>

    <vxe-table
      border
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" width="300"></vxe-table-column>
      <vxe-table-column prop="role" label="Role" width="300"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" width="300"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" width="300"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" fixed="right" width="300" show-overflow-tooltip></vxe-table-column>
    </vxe-table>

    <p>使用 optimized 参数可以使固定列的节点减到最少，并将所有单元格设置为禁止换行</p>

    <vxe-table
      border
      optimized
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" width="300"></vxe-table-column>
      <vxe-table-column prop="role" label="Role" width="300"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" width="300"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" width="300"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" fixed="right" width="300" show-overflow-tooltip></vxe-table-column>
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
    let list = window.MOCK_DATA_LIST.slice(0, 50)
    this.tableData = list
  }
}
</script>

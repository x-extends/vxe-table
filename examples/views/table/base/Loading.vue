<template>
  <div>
    <p>通过设置 loading 属性可以使用自带的加载效果</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow-tooltip></vxe-table-column>
    </vxe-table>

    <p>加载中</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :loading="loading"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow-tooltip></vxe-table-column>
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
    this.loading = true
    setTimeout(() => {
      let list = window.MOCK_DATA_LIST.slice(0, 50)
      this.tableData = list
      this.loading = false
    }, 3000)
  }
}
</script>

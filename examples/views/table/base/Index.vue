<template>
  <div>
    <p>默认的序号从 1 开始，你也可以自定义 indexMethod 函数</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
      <vxe-table-column prop="address" label="Address"></vxe-table-column>
    </vxe-table>

    <p>使用 indexMethod 自定义序号</p>

    <vxe-table
      border
      height="300"
      :data.sync="tableData2">
      <vxe-table-column type="index" width="60" :index-method="indexMethod"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
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
      tableData: [],
      tableData2: []
    }
  },
  created () {
    let list = window.CACHE_DATA_LIST.slice(0, 4)
    this.tableData = list
    this.tableData2 = window.CACHE_DATA_LIST.slice(0, 50)
  },
  methods: {
    indexMethod ({ rowIndex }) {
      return rowIndex * 2
    }
  }
}
</script>

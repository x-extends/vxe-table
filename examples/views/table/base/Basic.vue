<template>
  <div>
    <p>基础使用</p>

    <vxe-table
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
    </vxe-table>

    <p>ellipsis 当内容超过时显示为省略号</p>
    <p>show-overflow-title 当内容超过时显示为省略号和原生 title 显示</p>
    <p>show-overflow-tooltip 当内容超过隐藏时显示为省略号并 tooltip 显示</p>
    <p>使用 highlight-hover-row 属性启用 hover 行高亮</p>

    <vxe-table
      highlight-hover-row
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
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
    let list = window.CACHE_DATA_LIST.slice(0, 6)
    this.tableData = list
  }
}
</script>

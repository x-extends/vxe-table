<template>
  <div>
    <p>滚动渲染</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow-tooltip></vxe-table-column>
    </vxe-table>

    <p>高级配置项</p>
    <p>参数 scroll: {gt: 500, oSize: 30, rSize: 120}，当超过 500 条时自动启用滚动渲染</p>
    <p>gt大于条数时启用，oSize低于剩余条数重新渲染r，Size渲染条数</p>
    <p>优点可以非常流畅支持海量数据；缺点是通过滚动条拖动时无法实时显示效果</p>

    <vxe-table
      border
      height="300"
      :data.sync="tableData2">
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
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
      tableData: [],
      tableData2: []
    }
  },
  created () {
    let list = window.CACHE_DATA_LIST.slice(0, 200)
    this.tableData = list
    this.tableData2 = window.CACHE_DATA_LIST.slice(0, 1000)
  }
}
</script>

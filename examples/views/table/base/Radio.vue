<template>
  <div>
    <p>使用 highlight-current-row 方式；选项改变触发事件select-change</p>

    <vxe-table
      border
      highlight-current-row
      height="300"
      :data.sync="tableData">
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p>使用 radio 方式</p>

    <vxe-table
      border
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p>当然也可以两种方式同时使用</p>

    <button class="btn" @click="$refs.xTable.setCurrentRow(tableData[1])">设置第二行选中</button>
    <vxe-table
      ref="xTable"
      border
      highlight-current-row
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
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
      tableData: []
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  }
}
</script>

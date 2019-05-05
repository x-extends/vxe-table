<template>
  <div>
    <p>设置 edit-config={trigger: 'click', mode: 'cell'} 启用单元格点击编辑的功能</p>

    <vxe-table
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{type: 'default'}"></vxe-table-column>
    </vxe-table>

    <p>设置 edit-config={trigger: 'click', mode: 'row'} 启用行点击编辑的功能</p>

    <vxe-table
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow-tooltip :edit-render="{type: 'default'}"></vxe-table-column>
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

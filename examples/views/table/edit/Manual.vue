<template>
  <div>
    <p>设置 edit-config={trigger: 'manual', mode: 'cell'} 启用单元格编辑的功能</p>

    <vxe-table
      ref="vTable1"
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'manual', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
      <vxe-table-column label="操作">
        <template v-slot="{ row }">
          <button @click="$refs.vTable1.setActiveCell(row, 'name')">编辑</button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p>设置 edit-config={trigger: 'manual', mode: 'row'} 启用行编辑的功能</p>

    <vxe-table
      ref="vTable2"
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'manual', mode: 'row'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow-tooltip></vxe-table-column>
      <vxe-table-column label="操作">
        <template v-slot="{ row }">
          <button @click="$refs.vTable2.setActiveRow(row)">编辑</button>
        </template>
      </vxe-table-column>
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

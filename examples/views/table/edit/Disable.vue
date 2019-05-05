<template>
  <div>
    <p>设置 edit-config 的 activeMethod 方法判断是否禁用</p>

    <vxe-table
      ref="xTable"
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', activeMethod}"
      @edit-disabled="editDisabledEvent">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{type: 'default'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{type: 'default'}"></vxe-table-column>
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
  },
  methods: {
    activeMethod ({ row, rowIndex }) {
      return rowIndex !== 1
    },
    editDisabledEvent () {
      alert('禁止编辑')
    }
  }
}
</script>

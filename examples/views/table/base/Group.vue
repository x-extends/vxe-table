<template>
  <div>
    <p>当数据结构比较复杂的时候，可以使用多级表头显示更加直观</p>

    <vxe-table
      border
      height="400"
      :data.sync="tableData">
      <vxe-table-column label="基本信息">
        <vxe-table-column type="index" width="60"></vxe-table-column>
        <vxe-table-column prop="name" label="Name"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column label="更多信息">
        <vxe-table-column prop="role" label="Role"></vxe-table-column>
        <vxe-table-column label="详细信息">
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="date" label="Date"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column prop="address" label="Address"></vxe-table-column>
    </vxe-table>

    <p>如果使用了分组表头情，则需要按组来设置固定列</p>

    <vxe-table
      border
      height="400"
      :data.sync="tableData">
      <vxe-table-column label="基本信息">
        <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
        <vxe-table-column prop="name" label="Name" fixed="left" width="100"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column label="更多信息">
        <vxe-table-column prop="role" label="Role" width="300"></vxe-table-column>
        <vxe-table-column prop="sex" label="Sex" width="300"></vxe-table-column>
        <vxe-table-column label="详细信息">
          <vxe-table-column prop="sex" label="Sex" width="300"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" width="300"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column prop="address" label="Address" width="300" fixed="right"></vxe-table-column>
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
    let list = window.CACHE_DATA_LIST.slice(0, 50)
    this.tableData = list
  }
}
</script>

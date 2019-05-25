<template>
  <div>
    <p>加载 1 万行，左右固定列</p>

    <vxe-table
      ref="xTable"
      border
      resizable
      show-all-overflow
      height="600"
      :loading="loading"
      :optimized="{scrollY: {gt: 500, oSize: 20, rSize: 60}}">>
      <vxe-table-column type="index" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable width="200"></vxe-table-column>
      <vxe-table-column prop="age" label="Age" width="200"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" width="200"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200"></vxe-table-column>
      <vxe-table-column prop="region" label="Region" width="200"></vxe-table-column>
      <vxe-table-column prop="time" label="Time" width="200"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" width="300" show-overflow></vxe-table-column>
      <vxe-table-column prop="updateTime" label="UpdateTime" width="200"></vxe-table-column>
      <vxe-table-column prop="createTime" label="CreateTime" width="200"></vxe-table-column>
      <vxe-table-column prop="attr1" label="Attr1" width="200"></vxe-table-column>
      <vxe-table-column prop="attr2" label="Attr2" width="200"></vxe-table-column>
      <vxe-table-column prop="attr3" label="Attr3" width="200"></vxe-table-column>
      <vxe-table-column prop="attr4" label="Attr4" width="200"></vxe-table-column>
      <vxe-table-column prop="attr5" label="Attr5" width="200"></vxe-table-column>
      <vxe-table-column prop="attr6" label="Attr6" width="200"></vxe-table-column>
      <vxe-table-column prop="attr7" label="Attr7" width="200"></vxe-table-column>
      <vxe-table-column prop="attr8" label="Attr8" width="200"></vxe-table-column>
      <vxe-table-column prop="attr9" label="Attr9" width="200"></vxe-table-column>
      <vxe-table-column prop="createTime" label="CreateTime" width="200" fixed="right"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.loading = true
    this.$nextTick(() => {
      this.$refs.xTable.reloadData([])
      setTimeout(() => {
        if (this.$refs.xTable) {
          this.tableData = window.MOCK_DATA_LIST.slice(0, 10000)
          this.$refs.xTable.reloadData(this.tableData)
        }
        this.loading = false
      }, 500)
    })
  }
}
</script>

<template>
  <div>
      <vxe-table
        border
        :data="tableData">
        <vxe-column  type="checkbox" width="60"></vxe-column>
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>

      </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      gridOptions: {
        virtualYConfig: {
          enabled: true,
          gt: 0
        },
        virtualXConfig: {
          enabled: true,
          gt: 0
        },
        columns: [
          { type: 'seq', width: 60, fixed: 'left' },
          { field: 'name', title: 'Name', width: '100px' },
          { field: 'sex', title: 'Sex', minWidth: '100px' },
          { field: 'date', title: 'Date', minWidth: '100px' },
          { field: 'address', title: 'Address', minWidth: '100px' },
          { type: 'seq', width: 60, fixed: 'right' }
        ],
        data: [],
        height: '114px'
      }
    }
  },
  created () {
    const list1 = []
    const list2 = []
    for (let index = 0; index < 3; index++) {
      list2.push({
        name: 'test' + index,
        role: 'developer',
        sex: 'Man',
        date: '2019-05-01',
        time: 1556677810888 + index * 500,
        region: 'ShenZhen',
        address: 'address abc' + index
      })
    }
    this.gridOptions.data = list2
  },
  methods: {
    remove () {
      const last = this.$refs.$ref.getTableData().fullData[0]
      this.$refs.$ref.remove(last)
    }
  }
}
</script>

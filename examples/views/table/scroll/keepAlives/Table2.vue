<template>
  <div>
    <p>子路由 2</p>

    <vxe-table
      border
      show-overflow
      height="400"
      :loading="loading"
      :data="tableData">
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column field="role" title="Rolw"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="num" title="Num"></vxe-table-column>
      <vxe-table-column field="date12" title="Date"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.tableData = this.mockList(1000)
      this.loading = false
    }, 300)
  },
  methods: {
    mockList (size) {
      const list = []
      for (let index = 0; index < size; index++) {
        list.push({
          name: `名称${index}`,
          sex: '0',
          num: 123,
          age: 18,
          num2: 234,
          rate: 3,
          address: 'shenzhen'
        })
      }
      return list
    }
  }
}
</script>

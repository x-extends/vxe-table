<template>
  <div>
    <p>Grid 演示</p>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gridOptions: {
        border: 'inner',
        columnConfig: { resizable: true },
        columns: [
          { type: 'seq', width: 60 },
          { field: 'name', title: 'Name' },
          { field: 'sex', title: 'Sex' },
          { field: 'date', title: 'Date' },
          { field: 'address', title: 'Address' }
        ],
        data: []
      }
    }
  },
  mounted () {
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
  }
}
</script>

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
      tableData: [],
      gridOptions: {
        editConfig: {
          trigger: 'click',
          mode: 'row',
          enabled: false
        },
        border: true,
        columns: [
          { type: 'seq', width: 60 },
          { field: 'name', title: 'Name' },
          {
            field: 'sex',
            title: 'Sex',
            editRender: {
              name: 'VxeNumberInput',
              props: { placeholder: '请输入计划支付金额' }
            },
            formatter: (params) => {
              return params.cellValue + 'formatter'
            }
          },
          { field: 'date', title: 'Date' },
          { field: 'address', title: 'Address' }
        ],
        data: []
      }
    }
  },
  created () {
    const list1 = []
    const list2 = []
    for (let index = 0; index < 3; index++) {
      list1.push({
        name: 'test' + index,
        role: 'developer',
        sex: 3,
        date: '2019-05-01',
        time: 1556677810888 + index * 500,
        region: 'ShenZhen',
        address: 'address abc' + index
      })
      list2.push({
        name: 'test' + index,
        role: 'developer',
        sex: 2,
        date: '2019-05-01',
        time: 1556677810888 + index * 500,
        region: 'ShenZhen',
        address: 'address abc' + index
      })
    }
    this.tableData = list1
    this.gridOptions.data = list2
  }
}
</script>

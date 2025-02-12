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
        border: true,
        pagerConfig: {
          total: 0,
          currentPage: 1,
          pageSize: 200
        },
        height: 500,
        scrollY: {
          gt: 300
        },
        columns: [
          { type: 'seq', width: 60 },
          { field: 'name', title: 'Name', width: 100 },
          { field: 'sex', title: 'Sex', width: 100 },
          { field: 'date', title: 'Date', width: 100 },
          { field: 'address', title: 'Address', width: 100 },
          { field: 'address1', title: 'Address1', width: 100 },
          { field: 'address2', title: 'Address2', width: 100 },
          { field: 'address3', title: 'Address3', width: 100 },
          { field: 'address4', title: 'Address4', width: 100 },
          { field: 'address5', title: 'Address5', width: 100 },
          { field: 'address6', title: 'Address6', width: 100 },
          { field: 'address7', title: 'Address7', width: 100 },
          { field: 'address8', title: 'Address8', width: 100 },
          { field: 'address9', title: 'Address9', width: 100 },
          { field: 'address10', title: 'Address10', width: 100 },
          { field: 'address11', title: 'Address12', width: 100 },
          { field: 'address12', title: 'Address13', width: 100 },
          { field: 'address13', title: 'Address14', width: 100 },
          { field: 'address14', title: 'Address15', width: 100 }
        ],
        data: []
      }
    }
  },
  created () {
    const list2 = []
    for (let index = 0; index < 200; index++) {
      list2.push({
        name: 'test' + index,
        role: 'developer',
        sex: 'Man',
        date: '2019-05-01',
        time: 1556677810888 + index * 500,
        region: 'ShenZhen',
        address: 'address abc' + index,
        address1: 'address abc' + index,
        address2: 'address abc' + index,
        address3: 'address abc' + index,
        address4: 'address abc' + index,
        address5: 'address abc' + index,
        address6: 'address abc' + index,
        address7: 'address abc' + index,
        address8: 'address abc' + index,
        address9: 'address abc' + index,
        address10: 'address abc' + index,
        address11: 'address abc' + index,
        address12: 'address abc' + index,
        address13: 'address abc' + index,
        address14: 'address abc' + index
      })
    }
    this.gridOptions.data = list2
  }
}
</script>

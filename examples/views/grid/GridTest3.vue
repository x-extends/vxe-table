<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script>
export default {
  data () {
    const gridOptions = {
      border: true,
      showCustomHeader: true,
      height: 400,
      columnConfig: {
        resizable: true
      },
      columns: [
        {
          title: '基本信息',
          children: [
            { type: 'seq', width: 70 },
            { field: 'name', title: 'Name' }
          ]
        },
        {
          title: '更多信息',
          children: [
            { field: 'role', title: 'Role' },
            {
              title: '详细信息',
              children: [
                { field: 'sex', title: 'Sex' },
                { field: 'age', title: 'Age' }
              ]
            }
          ]
        },
        {
          title: '分类信息',
          children: [
            { field: 'date3', title: 'Date' }
          ]
        },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      data: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ]
    }
    return {
      gridOptions
    }
  }
}
</script>

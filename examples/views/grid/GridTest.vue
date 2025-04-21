<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script>
export default {
  data () {
    const sexOptions = [
      { label: '女', value: '0' },
      { label: '男', value: '1' }
    ]
    const ageOptions = [
      { label: '大于16岁', value: 16 },
      { label: '大于26岁', value: 26 },
      { label: '大于30岁', value: 30 }
    ]
    const gridOptions = {
      border: true,
      stripe: true,
      loading: false,
      height: 400,
      columnConfig: {
        resizable: true
      },
      rowConfig: {
        isHover: true
      },
      rowGroupConfig: {
        groupFields: ['sex', 'age'],
        showTotal: true
      },
      checkboxConfig: {
        labelField: 'id',
        highlight: true,
        range: true
      },
      columns: [
        { type: 'seq', width: 70 },
        { type: 'checkbox', title: 'ID', width: 140 },
        { field: 'name', title: 'Name', sortable: true, rowGroupNode: true },
        {
          field: 'sex',
          title: 'Sex',
          filters: sexOptions,
          filterMultiple: false,
          formatter ({ cellValue }) {
            const item = sexOptions.find(item => item.value === cellValue)
            return item ? item.label : ''
          }
        },
        {
          field: 'age',
          title: 'Age',
          filters: ageOptions,
          filterMethod ({ value, row }) {
            return row.age >= value
          },
          sortable: true
        },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      data: []
    }
    return {
      gridOptions
    }
  },
  created () {
    this.gridOptions.loading = true
    setTimeout(() => {
      this.gridOptions.data = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: '0', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: '0', age: 35, address: 'test abc' },
        { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 21, address: 'test abc' },
        { id: 10010, name: 'Test10', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10011, name: 'Test11', role: 'Test', sex: '0', age: 29, address: 'test abc' },
        { id: 10012, name: 'Test12', role: 'Develop', sex: '1', age: 27, address: 'test abc' },
        { id: 10013, name: 'Test13', role: 'Test', sex: '0', age: 24, address: 'test abc' },
        { id: 10014, name: 'Test14', role: 'Develop', sex: '1', age: 34, address: 'test abc' },
        { id: 10015, name: 'Test15', role: 'Test', sex: '1', age: 21, address: 'test abc' },
        { id: 10016, name: 'Test16', role: 'Develop', sex: '0', age: 20, address: 'test abc' },
        { id: 10017, name: 'Test17', role: 'Test', sex: '1', age: 31, address: 'test abc' },
        { id: 10018, name: 'Test18', role: 'Develop', sex: '0', age: 32, address: 'test abc' },
        { id: 10019, name: 'Test19', role: 'Test', sex: '1', age: 37, address: 'test abc' },
        { id: 10020, name: 'Test20', role: 'Develop', sex: '1', age: 41, address: 'test abc' }
      ]
      this.gridOptions.loading = false
    }, 500)
  }
}
</script>

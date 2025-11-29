<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { VxeGridProps } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  num: number
  age: number
  date: string
  address: string
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  height: 500,
  showOverflow: true,
  aggregateConfig: {
    groupFields: ['role', 'name'],
    calcValuesMethod ({ column, children }) {
      if (column.field === 'num') {
        let numSum = 0
        children.forEach(item => {
          numSum += item.num
        })
        return numSum
      }
      if (column.field === 'age') {
        let ageCount = 0
        children.forEach(item => {
          ageCount += item.age
        })
        return Math.floor(ageCount / children.length)
      }
      return 0
    }
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name', minWidth: 300, rowGroupNode: true },
    { field: 'role', title: 'Role' },
    { field: 'num', title: 'Num', sortable: true, aggFunc: true },
    { field: 'age', title: 'Age', sortable: true, aggFunc: true },
    { field: 'address', title: 'Address' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Woman', age: 28, num: 63, date: '2025-02-01', address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', age: 22, num: 63, date: '2025-01-01', address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Woman', age: 32, num: 10, date: '2025-05-01', address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Man', age: 32, num: 24, date: '2025-01-01', address: 'test abc' },
    { id: 10005, name: 'Test5', role: 'Develop', sex: 'Man', age: 30, num: 98, date: '2025-01-01', address: 'Shanghai' },
    { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 30, num: 46, date: '2025-03-01', address: 'test abc' },
    { id: 10007, name: 'Test7', role: 'Test', sex: 'Woman', age: 29, num: 35, date: '2025-05-01', address: 'test abc' },
    { id: 10008, name: 'Test8', role: 'PM', sex: 'Woman', age: 35, num: 84, date: '2025-11-01', address: 'test abc' },
    { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 21, num: 25, date: '2025-05-01', address: 'test abc' },
    { id: 10010, name: 'Test10', role: 'PM', sex: 'Woman', age: 28, num: 32, date: '2025-03-01', address: 'test abc' },
    { id: 10011, name: 'Test11', role: 'Test', sex: 'Woman', age: 29, num: 24, date: '2025-03-01', address: 'test abc' },
    { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 37, num: 28, date: '2025-10-01', address: 'test abc' },
    { id: 10013, name: 'Test13', role: 'Test', sex: 'Woman', age: 24, num: 38, date: '2025-02-01', address: 'test abc' },
    { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, num: 46, date: '2025-08-01', address: 'test abc' },
    { id: 10015, name: 'Test15', role: 'Designer', sex: 'Man', age: 21, num: 48, date: '2025-05-01', address: 'test abc' },
    { id: 10016, name: 'Test16', role: 'Designer', sex: 'Woman', age: 21, num: 59, date: '2025-10-01', address: 'test abc' },
    { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, num: 81, date: '2025-12-01', address: 'test abc' },
    { id: 10018, name: 'Test18', role: 'Develop', sex: 'Woman', age: 32, num: 75, date: '2025-10-01', address: 'test abc' },
    { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, num: 80, date: '2025-02-01', address: 'test abc' },
    { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, num: 60, date: '2025-03-01', address: 'test abc' }
  ]
})
</script>

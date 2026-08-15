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
  age: number
  address: string
  date: string
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showOverflow: true,
  height: 500,
  mouseConfig: {
    selected: true
  },
  keyboardConfig: {
    isEdit: true,
    isArrow: true,
    isEnter: true,
    isTab: true,
    isDel: true,
    isBack: true,
    isEsc: true
  },
  editConfig: {
    trigger: 'dblclick',
    mode: 'cell'
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name', editRender: { name: 'input' } },
    { field: 'sex', title: 'Sex', editRender: { name: 'VxeInput' } },
    { field: 'age', title: 'Age', editRender: { name: 'VxeInput' } },
    { field: 'date', title: 'Date', editRender: { name: 'VxeDatePicker' } }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', date: '' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', date: '' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', date: '' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc', date: '' },
    { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai', date: '' },
    { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc', date: '' },
    { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc', date: '' },
    { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc', date: '' },
    { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 26, address: 'test abc', date: '' },
    { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 38, address: 'test abc', date: '' },
    { id: 10011, name: 'Test11', role: 'Test', sex: 'Women', age: 29, address: 'test abc', date: '' },
    { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 27, address: 'test abc', date: '' },
    { id: 10013, name: 'Test13', role: 'Test', sex: 'Women', age: 24, address: 'test abc', date: '' },
    { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, address: 'test abc', date: '' },
    { id: 10015, name: 'Test15', role: 'Test', sex: 'Man', age: 21, address: 'test abc', date: '' },
    { id: 10016, name: 'Test16', role: 'Develop', sex: 'Women', age: 20, address: 'test abc', date: '' },
    { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, address: 'test abc', date: '' },
    { id: 10018, name: 'Test18', role: 'Develop', sex: 'Women', age: 32, address: 'test abc', date: '' },
    { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, address: 'test abc', date: '' },
    { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, address: 'test abc', date: '' }
  ]
})
</script>

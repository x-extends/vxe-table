<template>
  <div>
    显示图标按钮：<vxe-switch v-model="filterConfig.showIcon"></vxe-switch>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { VxeGridProps, VxeTablePropTypes, VxeColumnPropTypes } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  date: string
}

const filterConfig = reactive<VxeTablePropTypes.FilterConfig<RowVO>>({
  showIcon: true
})

const sexFilterRender = reactive<VxeColumnPropTypes.FilterRender>({
  name: 'VxeSelect',
  props: {
    clearable: true
  },
  options: [
    { label: 'Man', value: 'Man' },
    { label: 'Woman', value: 'Woman' }
  ]
})

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  height: 400,
  filterConfig,
  floatingFilterConfig: {
    enabled: true
  },
  columns: [
    { field: 'name', title: 'Name', filterRender: { name: 'VxeInput', props: { clearable: true } } },
    { field: 'sex', title: 'Sex', filterRender: sexFilterRender },
    { field: 'age', title: 'Age', filterRender: { name: 'VxeNumberInput', props: { clearable: true } } },
    { field: 'date', title: 'Date', filterRender: { name: 'VxeDatePicker', props: { clearable: true } } }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Woman', age: 28, date: '2025-10-01' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', age: 22, date: '2025-10-02' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Woman', age: 32, date: '2025-10-05' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Man', age: 54, date: '2025-10-14' },
    { id: 10005, name: 'Test5', role: 'Develop', sex: 'Man', age: 44, date: '2025-09-01' },
    { id: 10006, name: 'Test6', role: 'Develop', sex: 'Woman', age: 24, date: '2025-08-15' },
    { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 52, date: '2025-11-12' },
    { id: 10008, name: 'Test8', role: 'PM', sex: 'Woman', age: 34, date: '2025-11-27' },
    { id: 10009, name: 'Test9', role: 'PM', sex: 'Man', age: 24, date: '2025-10-18' },
    { id: 100010, name: 'Test10', role: 'Develop', sex: 'Woman', age: 24, date: '2025-10-25' }
  ]
})
</script>

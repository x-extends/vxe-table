<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const gridOptions = reactive({
  border: true,
  showOverflow: true,
  rowConfig: {
    keyField: 'id'
  },
  editConfig: {
    trigger: 'click',
    mode: 'row'
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name', minWidth: 180, editRender: { name: 'VxeInput' } },
    {
      field: 'date',
      title: '日期',
      width: 180,
      editRender: { name: 'VxeDatePicker', props: { type: 'date' } }
    },
    {
      field: 'year',
      title: '年份',
      width: 180,
      editRender: { name: 'VxeDatePicker', props: { type: 'year' } }
    },
    {
      field: 'quarter',
      title: '季度',
      width: 180,
      editRender: { name: 'VxeDatePicker', props: { type: 'quarter' } }
    },
    {
      field: 'month',
      title: '月份',
      width: 180,
      editRender: { name: 'VxeDatePicker', props: { type: 'month' } }
    },
    {
      field: 'week',
      title: '周',
      width: 180,
      editRender: { name: 'VxeDatePicker', props: { type: 'week' } }
    },
    {
      field: 'time',
      title: '时间',
      width: 180,
      editRender: { name: 'VxeDatePicker', props: { type: 'time' } }
    },
    {
      field: 'datetime',
      title: '日期带时间',
      width: 180,
      editRender: { name: 'VxeDatePicker', props: { type: 'datetime' } }
    }
  ],
  data: [
    {
      id: 10001,
      name: 'Test1',
      role: 'Develop',
      date: '',
      time: '',
      year: '',
      quarter: '',
      month: '',
      week: '',
      datetime: '',
      address: 'test abc'
    },
    {
      id: 10002,
      name: 'Test2',
      role: 'Test',
      date: '',
      time: '',
      year: '',
      quarter: '',
      month: '',
      week: '',
      datetime: '',
      address: 'Guangzhou'
    },
    {
      id: 10003,
      name: 'Test3',
      role: 'PM',
      date: '2024-06-06',
      time: '10:30',
      year: '2024',
      quarter: '2024-01-01',
      month: '2024-06',
      week: '2024-06-03',
      datetime: '2024-06-06 10:30:45',
      address: 'Shanghai'
    }
  ]
})
</script>

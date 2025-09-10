<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #groupContent="{ groupContent }">
        {{ groupContent }}
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const gridOptions = reactive({
  height: 400,
  columns: [
    {
      type: 'checkbox',
      width: 40,
      align: 'center'
    },
    {
      field: 'role',
      title: 'role',
      slots: { groupContent: 'groupContent', default: 'nameDefault' }
    },

    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' }
  ],
  aggregateConfig: {
    groupFields: ['role'],
    expandAll: true,
    showChildCount: false,
    aggregate: false,
    groupSort: false,
    showToggleButton: true
  },
  checkboxConfig: {
    reserve: true,
    highlight: true,
    checkMethod: ({ row }) => {
      return row.delete === 1
    }
  },
  data: [
    {
      delete: 1,
      id: 10001,
      name: 'Test1',
      role: 'Develop',
      sex: 'Man',
      age: 28,
      address: 'test abc'
    },
    {
      id: 10002,
      delete: 1,
      name: 'Test2',
      role: 'Test',
      sex: 'Women',
      age: 22,
      address: 'Guangzhou'
    },
    {
      id: 10003,
      name: 'Test3',
      delete: 1,
      role: 'PM',
      sex: 'Man',
      age: 32,
      address: 'Shanghai'
    },
    {
      id: 10004,
      name: 'Test4',
      role: 'Designer',
      sex: 'Women',
      delete: 0,
      age: 24,
      address: 'Shanghai'
    },
    {
      id: 10005,
      name: 'Test4',
      role: 'Develop',
      sex: 'Women',
      delete: 0,
      age: 24,
      address: 'Shanghai'
    },
    {
      id: 10006,
      name: 'Test4',
      role: 'Develop',
      sex: 'Women',
      delete: 1,
      age: 24,
      address: 'Shanghai'
    },
    {
      id: 10007,
      name: 'Test4',
      role: 'role2',
      sex: 'Women',
      delete: 1,
      age: 24,
      address: 'Shanghai'
    }
  ]
})
</script>

<style scoped></style>

<template>
  <div>
    <vxe-table
      border="inner"
      show-overflow
      :column-config="{ resizable: true }"
      :data="gridOptions.tableData"
    >
      <vxe-column type="seq" width="60" fixed="left"></vxe-column>
      <vxe-column field="name" title="Name" width="500"></vxe-column>
      <vxe-column field="sex" title="Sex" width="500"></vxe-column>
      <vxe-column field="date" title="Date" width="500"></vxe-column>
      <vxe-column
        field="address"
        title="Address"
        width="100"
        fixed="right"
      ></vxe-column>
      <!-- <vxe-column
        field="address2"
        title="Address"
        width="100"
        fixed="right"
      ></vxe-column> -->
    </vxe-table>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const gridOptions = reactive({
  height: 400,
  tableData: [
    {
      id: 10001,
      name: 'Test1',
      role: 'Develop',
      sex: 'Man',
      age: 38,
      address: 'test abc'
    },
    {
      id: 10002,
      name: 'Test2',
      role: 'Test',
      sex: 'Women',
      age: 22,
      address: 'Guangzhou'
    },
    {
      id: 10003,
      name: 'Test3',
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
      age: 24,
      address: 'Shanghai'
    }
  ]
})
</script>

<style scoped></style>

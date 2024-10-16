<template>
  <div>
    <vxe-button @click="scrollCol">滚动列</vxe-button>
    <vxe-table
      border
      ref="tableRef"
      height="400"
      :data="tableData">
      <vxe-column type="seq" width="70"></vxe-column>
      <vxe-column field="name" title="Name" width="180"></vxe-column>
      <vxe-column field="role" title="Role" width="300"></vxe-column>
      <vxe-column field="age" title="Age" width="200"></vxe-column>
      <vxe-column field="sex" title="Sex" width="200"></vxe-column>
      <vxe-column field="num" title="Num" width="260"></vxe-column>
      <vxe-column field="num11" title="Num11" width="200"></vxe-column>
      <vxe-column field="num22" title="Num22" width="250"></vxe-column>
      <vxe-column field="num33" title="Num33" width="100"></vxe-column>
      <vxe-column field="num44" title="Num44" width="180"></vxe-column>
      <vxe-column field="num55" title="Num55" width="260"></vxe-column>
      <vxe-column field="num66" title="Num66" width="360"></vxe-column>
      <vxe-column field="date3" title="Date" width="140"></vxe-column>
      <vxe-column field="num77" title="Num77" width="260"></vxe-column>
      <vxe-column field="num88" title="Num88" width="260"></vxe-column>
      <vxe-column field="address" title="Address" width="200" show-overflow></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { VxeTableInstance } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const tableRef = ref<VxeTableInstance>()

const tableData = ref<RowVO[]>([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
  { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
  { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
  { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
  { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 26, address: 'test abc' },
  { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 38, address: 'test abc' },
  { id: 10011, name: 'Test11', role: 'Test', sex: 'Women', age: 29, address: 'test abc' },
  { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 27, address: 'test abc' },
  { id: 10013, name: 'Test13', role: 'Test', sex: 'Women', age: 24, address: 'test abc' },
  { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, address: 'test abc' },
  { id: 10015, name: 'Test15', role: 'Test', sex: 'Man', age: 21, address: 'test abc' },
  { id: 10016, name: 'Test16', role: 'Develop', sex: 'Women', age: 20, address: 'test abc' },
  { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, address: 'test abc' },
  { id: 10018, name: 'Test18', role: 'Develop', sex: 'Women', age: 32, address: 'test abc' },
  { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, address: 'test abc' },
  { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, address: 'test abc' }
])

const scrollCol = () => {
  const $table = tableRef.value
  if ($table) {
    $table.scrollToColumn('num33')
  }
}
</script>

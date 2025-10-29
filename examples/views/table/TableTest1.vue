<template>
  <div>
    <vxe-table
      border
      height="400"
      :data="tableData">
      <vxe-column type="seq" width="70"></vxe-column>
      <vxe-column type="expand" width="60">
        <template #content="{ row }">
          <div class="expand-wrapper">
            <vxe-table border :data="row.childList" height="200">
              <vxe-column field="name" title="Name"></vxe-column>
              <vxe-column field="sex" title="Sex"></vxe-column>
              <vxe-column field="age" title="Age"></vxe-column>
            </vxe-table>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
  childList?: RowVO[]
}

const tableData = ref<RowVO[]>([
  {
    id: 10001,
    name: 'Test1',
    role: 'Develop',
    sex: 'Man',
    age: 28,
    address: 'test abc',
    childList: [
      { id: 10011, name: 'Test112', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
      { id: 10012, name: 'Test134', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' }
    ]
  },
  {
    id: 10002,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Guangzhou',
    childList: [
      { id: 10021, name: 'Test233', role: 'Designer', sex: 'Man', age: 34, address: 'test 234324' }
    ]
  },
  {
    id: 10003,
    name: 'Test3',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai',
    childList: [
      { id: 10031, name: 'Test366', role: 'Test', sex: 'Man', age: 76, address: 'test rtyty' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' }
    ]
  },
  {
    id: 10004,
    name: 'Test4',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
    childList: [
      { id: 10041, name: 'Test456', role: 'Designer', sex: 'Man', age: 19, address: 'test 3444444' },
      { id: 10042, name: 'Test457', role: 'Test', sex: 'Women', age: 29, address: 'rtyty sdfsdf' }
    ]
  },
  {
    id: 10005,
    name: 'Test5',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
    childList: [
      { id: 10041, name: 'Test456', role: 'Designer', sex: 'Man', age: 19, address: 'test 3444444' },
      { id: 10042, name: 'Test457', role: 'Test', sex: 'Women', age: 29, address: 'rtyty sdfsdf' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' }
    ]
  },
  {
    id: 10006,
    name: 'Test6',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
    childList: [
      { id: 10041, name: 'Test456', role: 'Designer', sex: 'Man', age: 19, address: 'test 3444444' },
      { id: 10042, name: 'Test457', role: 'Test', sex: 'Women', age: 29, address: 'rtyty sdfsdf' }
    ]
  },
  {
    id: 10007,
    name: 'Test7',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
    childList: [
      { id: 10041, name: 'Test456', role: 'Designer', sex: 'Man', age: 19, address: 'test 3444444' },
      { id: 10042, name: 'Test457', role: 'Test', sex: 'Women', age: 29, address: 'rtyty sdfsdf' }
    ]
  },
  {
    id: 10008,
    name: 'Test8',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
    childList: [
      { id: 10041, name: 'Test456', role: 'Designer', sex: 'Man', age: 19, address: 'test 3444444' },
      { id: 10042, name: 'Test457', role: 'Test', sex: 'Women', age: 29, address: 'rtyty sdfsdf' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' }
    ]
  },
  {
    id: 10009,
    name: 'Test9',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
    childList: [
      { id: 10041, name: 'Test456', role: 'Designer', sex: 'Man', age: 19, address: 'test 3444444' },
      { id: 10042, name: 'Test457', role: 'Test', sex: 'Women', age: 29, address: 'rtyty sdfsdf' }
    ]
  },
  {
    id: 10010,
    name: 'Test10',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
    childList: [
      { id: 10041, name: 'Test456', role: 'Designer', sex: 'Man', age: 19, address: 'test 3444444' },
      { id: 10042, name: 'Test457', role: 'Test', sex: 'Women', age: 29, address: 'rtyty sdfsdf' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' },
      { id: 10032, name: 'Test345', role: 'Develop', sex: 'Women', age: 56, address: 'Guangzhou' },
      { id: 10032, name: 'Test361', role: 'Test', sex: 'Women', age: 21, address: 'Guangzhou' },
      { id: 10033, name: 'Test367', role: 'Develop', sex: 'Women', age: 28, address: 'Guangzhou' },
      { id: 10034, name: 'Test3213', role: 'Test', sex: 'Man', age: 35, address: 'Guangzhou' }
    ]
  }
])
</script>

<style lang="scss" scoped>
.expand-wrapper {
  padding: 16px;
}
</style>

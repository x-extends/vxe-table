<template>
  <div>
    <vxe-table
      border
      show-footer
      height="400"
      :merge-footer-items="mergeFooterItems"
      :footer-data="footerData"
      :data="tableData">
      <vxe-column field="seq" type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable></vxe-column>
      <vxe-column field="role" title="Role" sortable></vxe-column>
      <vxe-column field="rate" title="Rate" footer-align="center"></vxe-column>
      <vxe-column field="age" title="Age" footer-align="center"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { VxeTablePropTypes } from '../../../types'

interface RowVO {
  id: number
  name: string
  nickname: string
  role: string
  sex: string
  age: number
  address: string
}

const mergeFooterItems = ref<VxeTablePropTypes.MergeFooterItems>([
  { row: 0, col: 1, rowspan: 2, colspan: 1 },
  { row: 1, col: 3, rowspan: 2, colspan: 2 }
])

const tableData = ref<RowVO[]>([
  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
])

const footerData = ref<VxeTablePropTypes.FooterData>([
  { seq: '平均', name: '合并了', role: '33', rate: '56' },
  { seq: '和值', name: 'aa', role: 'bb', rate: '合并了' },
  { seq: '其他', name: 'aa', role: 'bb', rate: '1235' }
])
</script>

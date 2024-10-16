<template>
  <div>树形表格</div>
  <vxe-table
    ref="tableRef1"
    :tree-config="{ rowField: 'id' }"
    :checkbox-config="{ labelField: 'id' }"
    :data="tableData1"
  >
    <vxe-column type="checkbox" field="id" title="id" tree-node></vxe-column>
  </vxe-table>
  <button @click="selectRow1">选中第一行（有bug）</button>

  <div>非树形表格</div>
  <vxe-table
    ref="tableRef2"
    :checkbox-config="{ labelField: 'id' }"
    :data="tableData2"
  >
    <vxe-column type="checkbox" field="id" title="id"></vxe-column>
  </vxe-table>
  <button @click="selectRow2">选中第一行（可以正常工作）</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableRef1 = ref()

const selectRow1 = () => {
  tableRef1.value.setCheckboxRow([tableData1.value[0]], true)
}

const tableData1 = ref([
  { id: 10000 },
  { id: 10050, children: [{ id: 24300, children: [{ id: 20045 }] }] }
])

const tableRef2 = ref()

const selectRow2 = () => {
  tableRef2.value.setCheckboxRow([tableData2.value[0]], true)
}

const tableData2 = ref([
  { id: 10000 },
  { id: 10050, children: [{ id: 24300, children: [{ id: 20045 }] }] }
])
</script>

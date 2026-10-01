<template>
  <div>
    <vxe-button @click="insertEvent">新增</vxe-button>
    <vxe-toolbar ref="toolbarRef" custom></vxe-toolbar>
    <vxe-table
      id="id"
      border
      height="600"
      show-overflow
      ref="tableRef"
      :edit-config="editConfig"
      :data="tableData"
      :toolbar-config="{
        custom: true,
      }"
      :column-config="{
        resizable: true,
      }"
      :custom-config="{
          storage: true,
          storeOptions: {
            resizable: false,
          },
        }"
      @edit-activated="editActivatedEvent">
      <vxe-column type="seq" width="70"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { VxeTableInstance, VxeTablePropTypes, VxeToolbarInstance } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const tableRef = ref<VxeTableInstance<RowVO>>()

const tableData = ref<RowVO[]>([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
])

const editConfig = ref<VxeTablePropTypes.EditConfig>({
  trigger: 'click',
  mode: 'row'
})

const insertEvent = async () => {
  const $table = tableRef.value
  if ($table) {
    const record = {
      sex: '1',
      date12: '2021-01-01'
    }
    const { row: newRow } = await $table.insert(record)
    await $table.setEditCell(newRow, 'name')
  }
}

const editActivatedEvent = (params: any) => {
  console.log(params)
}

const toolbarRef = ref<VxeToolbarInstance>()

onMounted(() => {
  const $toolbar = toolbarRef.value
  const $table = tableRef.value
  if ($toolbar && $table) {
    $table.connect($toolbar)
  }
})
</script>

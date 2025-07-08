<template>
  <div>
    <vxe-button @click="printEvent">自定义打印</vxe-button>

    <vxe-table
      border
      height="500"
      ref="tableRef"
      :data="tableData">
      <vxe-column type="seq" width="70"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="address" title="Address"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { VxeUI } from 'vxe-pc-ui'
import { VxeTableInstance } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  address: string
}

const tableRef = ref<VxeTableInstance>()

const list: RowVO[] = []
for (let i = 0; i < 100; i++) {
  list.push({
    id: 10000 + i,
    name: 'Test1',
    role: 'Develop',
    sex: 'Man',
    address: 'test abc'
  })
}

const tableData = ref(list)

const printEvent = () => {
  const $table = tableRef.value
  if ($table) {
    $table.getPrintHtml().then(({ html }) => {
      VxeUI.print({
        title: '标题1',
        html: html
      })
    })
  }
}
</script>

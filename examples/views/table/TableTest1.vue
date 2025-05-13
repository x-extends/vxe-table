<template>
      <vxe-toolbar>
        <template #buttons>
          <vxe-button @click="hideColEvent('role')">隐藏role</vxe-button>
          <vxe-button @click="showColEvent('role')">显示role</vxe-button>
          <vxe-button @click="showColEvent('sex')">显示sex</vxe-button>
          <vxe-button @click="resetColEvent">重置</vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-table border ref="xTable" height="200" :data="tableData" :size="size">
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="role" title="Role"></vxe-column>
        <vxe-column field="sex" title="Sex" :visible="false"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
        <vxe-column field="active" title="操作" width="180" fixed="right">
          <template #default>
            <vxe-button trigger="click" translate>
              <template #default>下拉按钮</template>
              <template #dropdowns>
                <vxe-button mode="text" content="修改"></vxe-button>
                <vxe-button mode="text" content="删除"></vxe-button>
              </template>
            </vxe-button>
          </template>
        </vxe-column>
      </vxe-table>
</template>

<script setup>
import { ref } from 'vue'

const xTable = ref()
const tableData = ref([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
  { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
  { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
  { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
])
const hideColEvent = field => {
  const $table = xTable.value
  if ($table) {
    $table.hideColumn(field)
  }
}
const showColEvent = field => {
  const $table = xTable.value
  if ($table) {
    $table.showColumn(field)
  }
}
const resetColEvent = () => {
  const $table = xTable.value
  if ($table) {
    $table.resetColumn()
  }
}
</script>

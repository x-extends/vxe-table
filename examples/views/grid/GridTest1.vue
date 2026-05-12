<template>
  <div>
    <vxe-button status="primary" @click="addEvent">新增</vxe-button>
    <vxe-button status="success" @click="getInsertEvent">获取新增的数据</vxe-button>

    <vxe-button status="error" @click="removeSelectEvent">批量删除</vxe-button>
    <vxe-button status="success" @click="getRemoveEvent">获取已删除数据</vxe-button>

    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #action="{ row }">
        <vxe-button mode="text" status="error" @click="removeRow(row)">删除</vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeGridInstance, VxeGridProps } from '../../../types'
import { VxeUI } from '../../../packages'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showOverflow: true,
  height: 500,
  keepSource: true,
  mouseConfig: {
    selected: true
  },
  keyboardConfig: {
    isEdit: true,
    isArrow: true,
    isEnter: true,
    isTab: true,
    isDel: true,
    isBack: true,
    isEsc: true,
    isUndoRedo: true
  },
  editConfig: {
    trigger: 'dblclick',
    mode: 'cell'
  },
  columns: [
    { type: 'checkbox', width: 70 },
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name', editRender: { name: 'VxeInput' } },
    { field: 'sex', title: 'Sex', editRender: { name: 'VxeInput' } },
    { field: 'age', title: 'Age', editRender: { name: 'VxeInput' } },
    { field: 'action', title: '操作', width: 140, slots: { default: 'action' } }
  ],
  data: [
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
  ]
})

const addEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const record = {
      name: `Name_${new Date().getTime()}`
    }
    const { row: newRow } = await $grid.insert(record)
    $grid.setEditRow(newRow)
  }
}

const getInsertEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    const insertRecords = $grid.getInsertRecords()
    VxeUI.modal.alert(`新增：${insertRecords.length} 行`)
  }
}

const removeRow = async (row: RowVO) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.remove(row)
    VxeUI.modal.message({
      content: '数据已删除',
      status: 'success'
    })
  }
}

const removeSelectEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const selectRecords = $grid.getCheckboxRecords()
    if (selectRecords.length > 0) {
      $grid.removeCheckboxRow()
      VxeUI.modal.message({
        content: '已删除选中',
        status: 'success'
      })
    } else {
      VxeUI.modal.message({
        content: '未选择数据',
        status: 'info'
      })
    }
  }
}

const getRemoveEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    const removeRecords = $grid.getRemoveRecords()
    VxeUI.modal.alert(`删除：${removeRecords.length} 行`)
  }
}
</script>

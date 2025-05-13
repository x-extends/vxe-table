<template>
  <div>
    <p>
      <vxe-button @click="toggleSelectRow(gridOptions.data[1])">切换第二行选中</vxe-button>
      <vxe-button @click="setSelectRow([gridOptions.data[2], gridOptions.data[3]], true)">设置第三、四行选中</vxe-button>
      <vxe-button @click="selectAllEvent">设置所有行选中</vxe-button>
      <vxe-button @click="clearSelectEvent">清除所有行选中</vxe-button>
      <vxe-button @click="getSelectEvent">获取选中</vxe-button>
    </p>

    <vxe-grid
      ref="gridRef"
      v-bind="gridOptions"
      @checkbox-all="selectAllChangeEvent"
      @checkbox-change="selectChangeEvent">
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeUI } from '../../../packages'
import { VxeGridInstance, VxeGridProps, VxeGridEvents } from '../../../types'

interface RowVO {
  id: string
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const gridOptions = reactive<VxeGridProps<RowVO> & {
  data: RowVO[]
}>({
  border: true,
  height: 300,
  rowConfig: {
    isCurrent: true,
    isHover: true,
    keyField: 'id'
  },
  radioConfig: {
    labelField: 'name',
    trigger: 'row'
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' },
    { field: 'address', title: 'Address', showOverflow: true }
  ],
  data: [
    { id: '10001', name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: '10002', name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: '10 0值03', name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: '10+00$-4', name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
    { id: '100-#0值5', name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' }
  ]
})

const selectAllChangeEvent: VxeGridEvents.CheckboxAll<RowVO> = ({ checked }) => {
  const $grid = gridRef.value
  if ($grid) {
    const records = $grid.getCheckboxRecords()
    console.log(checked ? '所有勾选事件' : '所有取消事件', records)
  }
}

const selectChangeEvent: VxeGridEvents.CheckboxChange<RowVO> = ({ checked }) => {
  const $grid = gridRef.value
  if ($grid) {
    const records = $grid.getCheckboxRecords()
    console.log(checked ? '勾选事件' : '取消事件', records)
  }
}

const toggleSelectRow = (row: RowVO) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.toggleCheckboxRow(row)
  }
}

const setSelectRow = (rows: RowVO[], checked: boolean) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setCheckboxRow(rows, checked)
  }
}

const selectAllEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.setAllCheckboxRow(true)
  }
}

const clearSelectEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.clearCheckboxRow()
  }
}

const getSelectEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    const selectRecords = $grid.getCheckboxRecords()
    VxeUI.modal.alert(`${selectRecords.length}条数据`)
  }
}
</script>

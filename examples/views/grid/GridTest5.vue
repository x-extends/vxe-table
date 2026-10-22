<template>
  <div>
    <vxe-button status="primary" @click="addEvent">新增</vxe-button>
    <vxe-button status="success" @click="saveEvent">保存</vxe-button>

    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #name_default="slotParams">
        <vxe-input v-if="slotParams.row.isEdit" v-model="slotParams.row.name" @change="changeEditEvent(slotParams)"></vxe-input>
        <span v-else>{{ slotParams.row.name }}</span>
      </template>

      <template #sex_default="slotParams">
        <vxe-select v-if="slotParams.row.isEdit" v-model="slotParams.row.sex" :options="sexList" @change="changeEditEvent(slotParams)"></vxe-select>
        <span v-else>{{ slotParams.row.sex }}</span>
      </template>

      <template #age_default="slotParams">
        <vxe-input v-if="slotParams.row.isEdit" v-model="slotParams.row.age" @change="changeEditEvent(slotParams)"></vxe-input>
        <span v-else>{{ slotParams.row.age }}</span>
      </template>

      <template #action="{ row }">
        <vxe-button v-if="row.isEdit" mode="text" status="success" :loading="row.isLoading" @click.stop="handleRowSave(row)">保存</vxe-button>
        <vxe-button v-else mode="text" status="primary" @click.stop="handleRowEdit(row)">编辑</vxe-button>
        <vxe-button v-if="row.isEdit" mode="text" @click.stop="cancelRowEdit(row)">取消</vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeUI } from 'vxe-pc-ui'
import type { VxeGridInstance, VxeGridProps } from '../../../types'
import XEUtils from 'xe-utils'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
  isEdit: boolean
  isLoading: boolean
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const sexList = ref([
  { label: '男', value: 'Man' },
  { label: '女', value: 'Women' }
])

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showOverflow: true,
  keepSource: true,
  rowConfig: {
    keyField: 'id'
  },
  editConfig: {
    trigger: 'manual',
    mode: 'row',
    showStatus: true
  },
  validConfig: {
    msgMode: 'full'
  },
  editRules: {
    name: [
      { required: true, message: '必须填写' }
    ],
    sex: [
      { required: true, message: '必须填写' }
    ]
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name', editRender: { name: 'VxeInput' }, slots: { default: 'name_default' } },
    { field: 'sex', title: 'Sex', editRender: { name: 'VxeSelect', options: sexList.value }, slots: { default: 'sex_default' } },
    { field: 'age', title: 'Age', editRender: { name: 'VxeInput' }, slots: { default: 'age_default' } },
    { field: 'action', title: '操作', width: 140, slots: { default: 'action' } }
  ],
  data: []
})

const loadList = () => {
  // 模拟后端接口
  gridOptions.loading = true
  setTimeout(() => {
    gridOptions.data = [
      { id: 10001, name: '', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', isEdit: false, isLoading: false },
      { id: 10002, name: 'Test2', role: 'Test', sex: '', age: 22, address: 'Guangzhou', isEdit: false, isLoading: false },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', isEdit: false, isLoading: false },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai', isEdit: false, isLoading: false }
    ]
    gridOptions.loading = false
  }, 200)
}

const handleRowEdit = (row: RowVO) => {
  row.isEdit = true
}

const cancelRowEdit = (row: RowVO) => {
  const $grid = gridRef.value
  if (!$grid) {
    return
  }
  row.isEdit = false
  $grid.clearValidate(row)
}

const handleRowSave = async (row: RowVO) => {
  const $grid = gridRef.value
  if (!$grid) {
    return
  }
  const errMap = await $grid.fullValidate(row)
  if (errMap) {
    // 将校验不通过行显示编辑状态
    XEUtils.each(errMap, errRules => {
      errRules.forEach(errRule => {
        handleRowEdit(errRule.row)
      })
    })
    VxeUI.modal.message({
      status: 'error',
      content: '校验不通过！'
    })
    return
  }
  row.isLoading = true
  // 模拟后端接口
  setTimeout(() => {
    row.isEdit = false
    row.isLoading = false
  }, 300)
}

const addEvent = async () => {
  const $grid = gridRef.value
  if (!$grid) {
    return
  }
  const record = {}
  const { row: newRow } = await $grid.insert(record)
  handleRowEdit(newRow)
}

const saveEvent = async () => {
  const $grid = gridRef.value
  if (!$grid) {
    return
  }
  const errMap = await $grid.fullValidate(true)
  if (errMap) {
    // 将校验不通过行显示编辑状态
    XEUtils.each(errMap, errRules => {
      errRules.forEach(errRule => {
        handleRowEdit(errRule.row)
      })
    })
    VxeUI.modal.message({
      status: 'error',
      content: '校验不通过！'
    })
    return
  }
  const updateRecords = $grid.getUpdateRecords()
  if (updateRecords.length > 0) {
    console.log('保存数据', updateRecords)
    loadList()
    VxeUI.modal.message({
      content: '保存成功',
      status: 'success'
    })
  } else {
    VxeUI.modal.message({
      content: '数据未改动',
      status: 'warning'
    })
  }
}

const changeEditEvent = (slotParams: any) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.updateStatus(slotParams)
  }
}

loadList()
</script>

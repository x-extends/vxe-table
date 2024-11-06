<template>
  <div>
    <p>
      <vxe-button @click="insertEvent">新增</vxe-button>
      <vxe-button @click="validEvent">快速校验变动数据</vxe-button>
      <vxe-button @click="getInsertEvent">获取新增</vxe-button>
      <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
      <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
    </p>

    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeUI } from '../..//../packages'
import { VxeGridProps, VxeGridInstance } from '../..//../types'

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
  keepSource: true,
  height: 300,
  editConfig: {
    trigger: 'click',
    mode: 'cell',
    showStatus: true
  },
  editRules: {
    name: [
      { required: true, message: '请输入名称' },
      {
        validator ({ cellValue }) {
          // 模拟服务端校验
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (cellValue && (cellValue.length < 3 || cellValue.length > 50)) {
                reject(new Error('名称长度在 3 到 50 个字符之间'))
              } else {
                resolve()
              }
            }, 100)
          })
        }
      }
    ],
    role: [
      {
        validator ({ cellValue }) {
          if (cellValue && !['Develop', 'Test', 'Designer', 'PM'].includes(cellValue)) {
            return new Error('角色输入不正确')
          }
        }
      }
    ],
    sex: [
      { required: true, message: '性别必须填写' },
      { pattern: /^[0,1]{1}$/, message: '格式不正确' }
    ],
    age: [
      { pattern: '^[0-9]{0,3}$', message: '格式不正确' }
    ]
  },
  columns: [
    { type: 'seq', width: 50 },
    { field: 'name', title: 'Name', editRender: { name: 'VxeInput' } },
    { field: 'sex', title: 'Sex', editRender: { name: 'VxeInput' } },
    { field: 'age', title: 'Age', editRender: { name: 'VxeInput', props: { type: 'integer' } } },
    { field: 'address', title: 'Address', editRender: { name: 'VxeInput' } }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
    { id: 10002, name: '', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: '', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: '', age: 23, address: 'test abc' },
    { id: 10005, name: '', role: '', sex: '1', age: 30, address: 'Shanghai' },
    { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
  ]
})

const validEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const errMap = await $grid.validate()
    if (errMap) {
      VxeUI.modal.message({ status: 'error', content: '校验不通过！' })
    } else {
      VxeUI.modal.message({ status: 'success', content: '校验成功！' })
    }
  }
}

const insertEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const { row: newRow } = await $grid.insert({})
    // 插入一条数据并触发校验
    const errMap = await $grid.validate(newRow)
    if (errMap) {
      // 校验失败
    }
  }
}

const getInsertEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    const insertRecords = $grid.getInsertRecords()
    VxeUI.modal.alert(insertRecords.length)
  }
}

const getRemoveEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    const removeRecords = $grid.getRemoveRecords()
    VxeUI.modal.alert(removeRecords.length)
  }
}

const getUpdateEvent = () => {
  const $grid = gridRef.value
  if ($grid) {
    const updateRecords = $grid.getUpdateRecords()
    VxeUI.modal.alert(updateRecords.length)
  }
}
</script>

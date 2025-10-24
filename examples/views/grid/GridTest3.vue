<template>
  <div>
    <vxe-grid v-bind="gridOptions" v-on="gridEvents">
      <template #top>
        <div>fdgdfg</div>
      </template>
      <template #form>
        <div>fdgdfg</div>
      </template>
      <template #bottom>
        <div>fff</div>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { VxeUI } from 'vxe-pc-ui'
import type { VxeGridProps, VxeGridListeners } from '../../../types'

interface RowVO {
  id: number
  name: string
  nickname: string
  role: string
  sex: string
  age: number
  address: string
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showFooter: true,
  rowConfig: {
    isCurrent: true
  },
  columnConfig: {
    resizable: true
  },
  columns: [
    { field: 'checkbox', type: 'checkbox', width: 50 },
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'nickname', title: 'Nickname' },
    { field: 'age', title: 'Age' },
    { field: 'role', title: 'Role' },
    { field: 'address', title: 'Address', showOverflow: true }
  ],
  data: [
    { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
    { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
    { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' }
  ],
  menuConfig: {
    header: {
      options: [
        [
          { code: 'custom1', name: '自定义前缀图标', suffixConfig: { icon: 'vxe-icon-download' } },
          { code: 'custom2', name: '自定义前缀内容', suffixConfig: { content: 'Ctrl+S' } }
        ]
      ]
    },
    body: {
      options: [
        [
          { code: 'custom3', name: '自定义前缀图标', suffixConfig: { icon: 'vxe-icon-download' } },
          { code: 'custom4', name: '自定义前缀内容', suffixConfig: { content: 'Ctrl+S' } }
        ],
        [
          {
            code: 'custom5',
            name: '二级菜单',
            children: [
              { code: 'custom6', name: '自定义前缀图标', suffixConfig: { icon: 'vxe-icon-download' } },
              { code: 'custom7', name: '自定义前缀内容', suffixConfig: { content: 'Ctrl+S' } }
            ]
          }
        ]
      ]
    },
    footer: {
      options: [
        [
          { code: 'custom8', name: '前缀图标', suffixConfig: { icon: 'vxe-icon-download' } },
          { code: 'custom9', name: '前缀内容', suffixConfig: { content: 'Ctrl+S' } }
        ]
      ]
    }
  },
  footerData: [
    { checkbox: '合计', age: 135 }
  ]
})

const gridEvents: VxeGridListeners<RowVO> = {
  menuClick ({ menu }) {
    VxeUI.modal.alert(`点击了 ${menu.name} 选项`)
  }
}
</script>

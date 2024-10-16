<template>
  <div>
    <vxe-button @click="scrollToCol('attr1')">定位 Attr1 列</vxe-button>
    <vxe-button @click="scrollToCol('attr4')">定位 Attr4 列</vxe-button>
    <vxe-button @click="scrollToCol('attr8')">定位 Attr8 列</vxe-button>
    <vxe-button @click="scrollToRow(gridOptions.data[3])">定位第4行</vxe-button>
    <vxe-button @click="scrollToRow(gridOptions.data[9])">定位第10行</vxe-button>
    <vxe-button @click="scrollToRow(gridOptions.data[15])">定位第16行</vxe-button>
    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeGridInstance, VxeGridProps } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
  attr1: string
  attr2: string
  attr3: string
  attr4: string
  attr5: string
  attr6: string
  attr7: string
  attr8: string
  attr9: string
  attr10: string
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const gridOptions = reactive<VxeGridProps<RowVO> & { data: RowVO[] }>({
  border: true,
  showOverflow: true,
  height: 400,
  columns: [
    { type: 'seq', width: 70, fixed: 'left' },
    { field: 'name', title: 'Name', fixed: 'left', width: 200 },
    { field: 'role', title: 'Role', width: 300 },
    { field: 'attr1', title: 'Attr1', width: 400 },
    { field: 'attr2', title: 'Attr2', width: 300 },
    { field: 'attr3', title: 'Attr3', width: 700 },
    { field: 'attr4', title: 'Attr4', width: 600 },
    { field: 'attr5', title: 'Attr5', width: 500 },
    { field: 'attr6', title: 'Attr6', width: 400 },
    { field: 'attr7', title: 'Attr7', width: 200 },
    { field: 'attr8', title: 'Attr8', width: 500 },
    { field: 'attr9', title: 'Attr9', width: 600 },
    { field: 'attr10', title: 'Attr10', width: 500 },
    { field: 'age', title: 'Age', width: 200 },
    { field: 'sex', title: 'Sex', fixed: 'right', width: 100 },
    { field: 'address', title: 'Address', fixed: 'right', width: 140 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 26, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 38, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10011, name: 'Test11', role: 'Test', sex: 'Women', age: 29, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 27, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10013, name: 'Test13', role: 'Test', sex: 'Women', age: 24, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10015, name: 'Test15', role: 'Test', sex: 'Man', age: 21, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10016, name: 'Test16', role: 'Develop', sex: 'Women', age: 20, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10018, name: 'Test18', role: 'Develop', sex: 'Women', age: 32, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' },
    { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, address: 'test abc', attr1: '', attr2: '', attr3: '', attr4: '', attr5: '', attr6: '', attr7: '', attr8: '', attr9: '', attr10: '' }
  ]
})

const scrollToCol = (field: string) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.scrollToColumn(field)
  }
}

const scrollToRow = (row: RowVO) => {
  const $grid = gridRef.value
  if ($grid) {
    $grid.scrollToRow(row)
  }
}
</script>

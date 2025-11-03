<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { VxeGridProps } from '../../../types'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
  col90: string
  col91: string
  col92: string
  col93: string
  col94: string
  col95: string
  col96: string
  col97: string
  col98: string
  col99: string
  col100: string
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  // showOverflow: true,
  // showHeaderOverflow: true,
  // showFooterOverflow: true,
  showFooter: true,
  height: 600,
  virtualYConfig: {
    enabled: true,
    gt: 0
  },
  virtualXConfig: {
    enabled: true,
    gt: 0
  },
  mergeCells: [
    { row: 2, col: 1, rowspan: 4, colspan: 2 },
    { row: 16, col: 2, rowspan: 12, colspan: 3 },
    { row: 30, col: 2, rowspan: 5, colspan: 2 },
    { row: 100, col: 1, rowspan: 18, colspan: 3 },
    { row: 0, col: 50, rowspan: 1, colspan: 2 }
  ],
  mergeFooterItems: [
    { row: 0, col: 1, rowspan: 2, colspan: 1 }
  ],
  columns: [
    { field: 'seq', type: 'seq', width: 70, fixed: 'left' },
    { field: 'name', title: 'Name', minWidth: 300, fixed: '' },
    {
      title: '分组1',
      children: [
        { field: 'role', title: 'Role', minWidth: 300 },
        { field: 'sex', title: 'Sex', minWidth: 300 },
        { field: 'age', title: 'Age', minWidth: 300 }
      ]
    },
    {
      title: '分组2',
      children: [
        { title: '列3', field: 'col3', width: 200 },
        { title: '列4', field: 'col4', width: 140 },
        { title: '列5', field: 'col5', width: 300 },
        { title: '列6', field: 'col6', width: 160 },
        { title: '列7', field: 'col7', width: 120 },
        { title: '列8', field: 'col8', width: 400 },
        { title: '列9', field: 'col9', width: 160 },
        { title: '列10', field: 'col10', width: 160 },
        { title: '列11', field: 'col11', width: 180 },
        { title: '列12', field: 'col12', width: 160 },
        { title: '列13', field: 'col13', width: 80 },
        { title: '列14', field: 'col14', width: 120 },
        { title: '列15', field: 'col15', width: 360 },
        { title: '列16', field: 'col16', width: 150 },
        { title: '列17', field: 'col17', width: 380 },
        { title: '列18', field: 'col18', width: 100 },
        { title: '列19', field: 'col19', width: 290 },
        { title: '列20', field: 'col20', width: 80 },
        { title: '列21', field: 'col21', width: 100 },
        { title: '列22', field: 'col22', width: 120 },
        { title: '列23', field: 'col23', width: 270 },
        { title: '列24', field: 'col24', width: 330 },
        { title: '列25', field: 'col25', width: 460 },
        { title: '列26', field: 'col26', width: 280 },
        { title: '列27', field: 'col27', width: 220 },
        { title: '列28', field: 'col28', width: 120 },
        { title: '列29', field: 'col29', width: 180 },
        { title: '列30', field: 'col30', width: 500 },
        { title: '列31', field: 'col31', width: 600 },
        { title: '列32', field: 'col32', width: 100 },
        { title: '列33', field: 'col33', width: 490 },
        { title: '列34', field: 'col34', width: 100 },
        { title: '列35', field: 'col35', width: 150 },
        { title: '列36', field: 'col36', width: 800 },
        { title: '列37', field: 'col37', width: 400 },
        { title: '列38', field: 'col38', width: 800 },
        { title: '列39', field: 'col39', width: 360 },
        { title: '列40', field: 'col40', width: 420 },
        { title: '列41', field: 'col41', width: 100 },
        { title: '列42', field: 'col42', width: 120 },
        { title: '列43', field: 'col43', width: 280 },
        { title: '列44', field: 'col44', width: 170 },
        { title: '列45', field: 'col45', width: 370 },
        { title: '列46', field: 'col46', width: 420 },
        { title: '列47', field: 'col47', width: 170 },
        { title: '列48', field: 'col48', width: 400 },
        { title: '列49', field: 'col49', width: 220 },
        { title: '列50', field: 'col50', width: 170 },
        { title: '列51', field: 'col51', width: 160 },
        { title: '列52', field: 'col52', width: 500 },
        { title: '列53', field: 'col53', width: 280 },
        { title: '列54', field: 'col54', width: 170 },
        { title: '列55', field: 'col55', width: 370 },
        { title: '列56', field: 'col56', width: 120 },
        { title: '列57', field: 'col57', width: 170 },
        { title: '列58', field: 'col58', width: 400 },
        { title: '列59', field: 'col59', width: 220 },
        { title: '列60', field: 'col60', width: 650 },
        { title: '列61', field: 'col61', width: 600 },
        { title: '列62', field: 'col62', width: 100 },
        { title: '列63', field: 'col63', width: 490 },
        { title: '列64', field: 'col64', width: 100 },
        { title: '列65', field: 'col65', width: 150 },
        { title: '列66', field: 'col66', width: 800 },
        { title: '列67', field: 'col67', width: 400 },
        { title: '列68', field: 'col68', width: 800 },
        { title: '列69', field: 'col69', width: 360 },
        { title: '列70', field: 'col70', width: 650 },
        { title: '列71', field: 'col71', width: 600 },
        { title: '列72', field: 'col72', width: 100 },
        { title: '列73', field: 'col73', width: 490 },
        { title: '列74', field: 'col74', width: 100 },
        { title: '列75', field: 'col75', width: 150 },
        { title: '列76', field: 'col76', width: 800 },
        { title: '列77', field: 'col77', width: 400 },
        { title: '列78', field: 'col78', width: 800 },
        { title: '列79', field: 'col79', width: 360 },
        { title: '列80', field: 'col80', width: 650 },
        { title: '列81', field: 'col81', width: 600 },
        { title: '列82', field: 'col82', width: 100 },
        { title: '列83', field: 'col83', width: 490 },
        { title: '列84', field: 'col84', width: 100 },
        { title: '列85', field: 'col85', width: 150 },
        { title: '列86', field: 'col86', width: 800 },
        { title: '列87', field: 'col87', width: 400 },
        { title: '列88', field: 'col88', width: 800 },
        { title: '列89', field: 'col89', width: 360 },
        { title: '列90', field: 'col90', width: 650 },
        { title: '列91', field: 'col91', width: 600 },
        { title: '列92', field: 'col92', width: 100 },
        { title: '列93', field: 'col93', width: 490 }
      ]
    },
    { title: '列94', field: 'col94', width: 100 },
    { title: '列95', field: 'col95', width: 150 },
    { title: '列96', field: 'col96', width: 800 },
    { title: '列97', field: 'col97', width: 100 },
    { title: '列98', field: 'col98', width: 150 },
    { title: '列99', field: 'col99', width: 200 },
    { title: '列100', field: 'col100', width: 100, fixed: 'right' }
  ],
  data: [],
  footerData: [
    { seq: '合计', name: '666', role: '888', sex: '999', age: '234', address: '453' },
    { seq: '均值', name: '222', role: '333', sex: '777', age: '876', address: '134' }
  ]
})

// 模拟行数据
const loadList = (size = 200) => {
  const dataList: RowVO[] = []
  for (let i = 0; i < size; i++) {
    dataList.push({
      id: 10000 + i,
      name: 'Test' + i,
      role: i % 3 ? 'Developer' : ' DeveloperDeveloper DeveloperDeveloper DeveloperDeveloper DeveloperDeveloper DeveloperDeveloper',
      sex: '男',
      age: 20,
      address: 'Address abc',
      col90: '90-' + i,
      col91: '91-' + i,
      col92: '92-' + i,
      col93: '93-' + i,
      col94: '94-' + i,
      col95: '95-' + i,
      col96: '96-' + i,
      col97: '97-' + i,
      col98: '98-' + i,
      col99: '99-' + i,
      col100: '100-' + i
    })
  }
  gridOptions.data = dataList
}

loadList(500)
</script>

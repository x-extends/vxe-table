<template>
  <div>
    <vxe-select v-model="rowSize" :options="dataOptions" @change="loadList()"></vxe-select>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { VxeUI } from '../../../packages'
import { VxeGridProps, VxeColumnPropTypes } from '../../../types'

interface RowVO {
  id: number
  [key: string]: string | number | boolean | any[]
}

const rowSize = ref(100)
const dataOptions = ref([
  { label: '加载 3 行', value: 3 },
  { label: '加载 20 行', value: 20 },
  { label: '加载 100 行', value: 100 },
  { label: '加载 500 行', value: 500 },
  { label: '加载 1000 行', value: 1000 },
  { label: '加载 5000 行', value: 5000 },
  { label: '加载 10000 行', value: 10000 },
  { label: '加载 30000 行', value: 30000 }
])

const imgUrlCellRender = reactive<VxeColumnPropTypes.CellRender>({
  name: 'VxeImage',
  props: {
    width: 36,
    height: 36
  }
})

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  loading: false,
  showOverflow: false,
  height: 800,
  columnConfig: {
    resizable: true
  },
  virtualYConfig: {
    enabled: true,
    gt: 0
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { title: '列0', field: 'col0', width: 100 },
    { title: '列1', field: 'imgUrl', width: 80, cellRender: imgUrlCellRender },
    { title: '列2', field: 'col2', width: 90 },
    { title: '列3', field: 'col3', width: 200 },
    { title: '列4', field: 'col4', width: 140 },
    { title: '列5', field: 'col5', width: 300 },
    { title: '列6', field: 'col6', minWidth: 160 },
    { title: '列7', field: 'col7', minWidth: 120 },
    { title: '列8', field: 'col8', minWidth: 120 }
  ],
  data: []
})

// 模拟行数据
const loadList = () => {
  gridOptions.loading = true
  setTimeout(() => {
    const dataList: RowVO[] = []
    for (let i = 0; i < rowSize.value; i++) {
      const item: RowVO = {
        id: 10000 + i,
        imgUrl: i % 3 === 0 ? 'https://vxeui.com/resource/img/546.gif' : 'https://vxeui.com/resource/img/673.gif'
      }
      for (let j = 0; j < 10; j++) {
        if (i % 9 === 0) {
          item[`col${j}`] = `值_${i}_${j} 内容9内容9 内容9内容9内容9 内容9内容9内容9内容9 内容9内容9内容9内容9 内容9内容9内容9 内容9内容9`
        } else if (i % 8 === 0) {
          item[`col${j}`] = `值_${i}_${j} 内容8内容8内容8内容8`
        } else if (i % 7 === 0) {
          item[`col${j}`] = `值_${i}_${j} 内容7内容7`
        } else if (i % 6 === 0) {
          item[`col${j}`] = `值_${i}_${j} 内容6内容6内容6内容6内容6内容6内容6内容6`
        } else if (i % 5 === 0) {
          item[`col${j}`] = `值_${i}_${j} 内容5内容5内容5内容5内容5`
        } else if (i % 4 === 0) {
          item[`col${j}`] = `值_${i}_${j} 内容4内容4内容4内容4内容4内容4内容4内容4内容4内容4内容4内容4`
        } else {
          item[`col${j}`] = `值_${i}_${j}`
        }
      }
      dataList.push(item)
    }

    const startTime = Date.now()
    gridOptions.data = dataList
    gridOptions.loading = false
    nextTick(() => {
      VxeUI.modal.message({
        content: `加载时间 ${Date.now() - startTime} 毫秒`,
        status: 'success'
      })
    })
  }, 350)
}

loadList()
</script>

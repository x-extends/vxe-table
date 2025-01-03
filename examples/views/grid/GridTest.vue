<template>
  <div>
    <vxe-select v-model="rowSize" :options="dataOptions" @change="loadData()"></vxe-select>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { VxeUI } from '../../../packages'
import { VxeGridProps, VxeColumnPropTypes } from '../../../types'

interface RowVO {
  id: number
  [key: string]: string | number | boolean | any[]
}

export default Vue.extend({
  data () {
    const rowSize = 100
    const dataOptions = [
      { label: '加载 3 行', value: 3 },
      { label: '加载 20 行', value: 20 },
      { label: '加载 100 行', value: 100 },
      { label: '加载 500 行', value: 500 },
      { label: '加载 1000 行', value: 1000 },
      { label: '加载 5000 行', value: 5000 },
      { label: '加载 10000 行', value: 10000 },
      { label: '加载 30000 行', value: 30000 }
    ]

    const imgUrlCellRender: VxeColumnPropTypes.CellRender = {
      name: 'VxeImage',
      props: {
        width: 36,
        height: 36
      }
    }

    const gridOptions: VxeGridProps<RowVO> = {
      border: true,
      loading: false,
      height: 800,
      columnConfig: {
        resizable: true
      },
      scrollX: {
        enabled: true,
        gt: 0
      },
      scrollY: {
        enabled: true,
        gt: 0
      },
      columns: [
        { type: 'checkbox', width: 60 },
        { title: '列0', field: 'col0', width: 100 },
        { title: '列1', field: 'imgUrl', width: 80, cellRender: imgUrlCellRender },
        { title: '列2', field: 'col2', width: 160 },
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
        { title: '列93', field: 'col93', width: 490 },
        { title: '列94', field: 'col94', width: 100 },
        { title: '列95', field: 'col95', width: 150 },
        { title: '列96', field: 'col96', width: 800 },
        { title: '列97', field: 'col97', width: 400 },
        { title: '列98', field: 'col98', width: 800 },
        { title: '列99', field: 'col99', width: 360 },
        { title: '列100', field: 'col100', width: 360 }
      ],
      data: []
    }

    return {
      rowSize,
      dataOptions,
      gridOptions,
      imgUrlCellRender
    }
  },
  methods: {
    // 模拟行数据
    loadData () {
      this.gridOptions.loading = true
      setTimeout(() => {
        const dataList: RowVO[] = []
        for (let i = 0; i < this.rowSize; i++) {
          const item: RowVO = {
            id: 10000 + i,
            imgUrl: i % 3 === 0 ? 'https://vxeui.com/resource/img/546.gif' : 'https://vxeui.com/resource/img/673.gif'
          }
          for (let j = 0; j < 100; j++) {
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
        this.gridOptions.data = dataList
        this.gridOptions.loading = false
        this.$nextTick(() => {
          VxeUI.modal.message({
            content: `加载时间 ${Date.now() - startTime} 毫秒`,
            status: 'success'
          })
        })
      }, 350)
    }
  },
  created () {
    this.loadData()
  }
})
</script>

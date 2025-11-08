<template>
  <div>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { VxeGridProps } from '../../../types'
import XEUtils from 'xe-utils'

interface RowVO {
  id: number
  name: string
  bankCard: string
  sex: string
  time: number
  date: string
  amount: number
  num: number
  num7: number
  num8: number
  num9: number
}

const sexList = [
  { label: '女', value: '0' },
  { label: '男', value: '1' }
]

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showFooter: true,
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    {
      field: 'num',
      title: 'Num',
      formatter ({ cellValue }) {
        return XEUtils.commafy(Number(cellValue), { digits: 2 })
      },
      footerFormatter ({ itemValue }) {
        return XEUtils.commafy(Number(itemValue), { digits: 2 })
      }
    },
    {
      field: 'sex',
      title: 'Sex',
      formatter ({ cellValue }) {
        const item = sexList.find(item => item.value === cellValue)
        return item ? item.label : cellValue
      }
    },
    {
      field: 'time',
      title: 'Time',
      formatter ({ cellValue }) {
        return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
      }
    }
  ],
  data: [
    { id: 10001, name: 'Test1', bankCard: '6222525678789432', sex: '0', time: 1599320111520, date: '2020-11-14T07:14:41.000Z', amount: 998.3, num: 863.345, num7: 863.345, num8: 863.345, num9: 863.345 },
    { id: 10002, name: 'Test2', bankCard: '6222525675674564', sex: '1', time: 1590820967410, date: '2022-10-24T08:14:18.000Z', amount: 777776536.3, num: 854.7789, num7: 854.7789, num8: 854.7789, num9: 854.7789 },
    { id: 10003, name: 'Test3', bankCard: '6222525477686963', sex: '0', time: 1599390785410, date: '2020-09-04T06:08:25.000Z', amount: 253.486, num: 963.1456, num7: 963.1456, num8: 963.1456, num9: 963.1456 },
    { id: 10004, name: 'Test4', bankCard: '6222525678678946', sex: '1', time: 1597385230710, date: '2019-10-20T20:40:20.000Z', amount: 9990000.66, num: 963.9856, num7: 963.9856, num8: 963.9856, num9: 963.9856 }
  ],
  footerData: [
    { seq: '合计', num: 15236.9844 }
  ]
})
</script>

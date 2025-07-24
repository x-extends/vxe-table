<template>
  <div class="demo-page-wrapper">
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents">
      <template #toolbarButtons>
        <span>数据：</span>
        <vxe-select v-model="gridOptions.pagerConfig.pageSize" :options="dataOptions" @change="changeRowSizeEvent"></vxe-select>
      </template>

      <template #emailDefault="{ row }">
        <vxe-text :content="row.email" click-to-copy></vxe-text>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { VxeGridInstance, VxeGridProps, VxeGridPropTypes, VxeColumnPropTypes, VxeGridListeners } from '../../../types'
import { VxeFormItemPropTypes, VxeSelectProps } from 'vxe-pc-ui'
import XEUtils from 'xe-utils'

interface RowVO {
  id: number
  name: string
  nickname: string
  sex: string
  age: number
  email: string
  city: string
  avatarUrl: string
  levelNum: number
  annualStatement: {
    m1: number | null,
    m2: number | null,
    m3: number | null,
    m4: number | null,
    m5: number | null,
    m6: number | null,
    m7: number | null,
    m8: number | null,
    m9: number | null,
    m10: number | null,
    m11: number | null,
    m12: number | null
  }
  flag: boolean
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const dataOptions = ref([
  { label: '加载 3 行', value: 3 },
  { label: '加载 20 行', value: 20 },
  { label: '加载 100 行', value: 100 },
  { label: '加载 500 行', value: 500 },
  { label: '加载 1000 行', value: 1000 },
  { label: '加载 5000 行', value: 5000 },
  { label: '加载 10000 行', value: 10000 },
  { label: '加载 50000 行', value: 50000 },
  { label: '加载 100000 行', value: 100000 }
])

const avatarUrlCellRender = reactive<VxeColumnPropTypes.CellRender>({
  name: 'VxeImage',
  props: {
    circle: true,
    width: 36,
    height: 36
  }
})

const levelNumCellRender = reactive<VxeColumnPropTypes.CellRender>({
  name: 'VxeRate',
  props: {
    readonly: true
  }
})

const flag1CellRender = reactive<VxeColumnPropTypes.CellRender>({
  name: 'VxeSwitch',
  props: {
    readonly: true
  }
})

const sexItemRender = reactive<VxeFormItemPropTypes.ItemRender<RowVO, VxeSelectProps>>({
  name: 'VxeSelect',
  options: [
    { label: '女', value: '0' },
    { label: '男', value: '1' }
  ]
})

const cityOptions = [
  { label: '广东省深圳市', value: 'sz' },
  { label: '广东省广州市', value: 'gz' },
  { label: '北京市', value: 'bj' },
  { label: '上海市', value: 'sh' },
  { label: '浙江省杭州市', value: 'hz' }
]

const cityItemRender = reactive<VxeFormItemPropTypes.ItemRender<RowVO, VxeSelectProps>>({
  name: 'VxeSelect',
  options: cityOptions
})

const formatSex: VxeColumnPropTypes.Formatter<RowVO> = ({ cellValue }) => {
  if (cellValue) {
    return cellValue === '1' ? '男' : '女'
  }
  return ''
}

const formatCity: VxeColumnPropTypes.Formatter<RowVO> = ({ cellValue }) => {
  const item = cityOptions.find(item => item.value === cellValue)
  return item ? item.label : cellValue
}

const formatAmount: VxeColumnPropTypes.Formatter<RowVO> = ({ cellValue }) => {
  if (cellValue) {
    return `￥${XEUtils.commafy(cellValue, { digits: 2 })}`
  }
  return ''
}

const countRow = reactive({
  seq: '合计',
  name: 0,
  annualStatement: {
    m1: 0,
    m2: 0,
    m3: 0,
    m4: 0,
    m5: 0,
    m6: 0,
    m7: 0,
    m8: 0,
    m9: 0,
    m10: 0,
    m11: 0,
    m12: 0
  }
})

const meanRow = reactive({
  seq: '平均',
  name: 0,
  annualStatement: {
    m1: 0,
    m2: 0,
    m3: 0,
    m4: 0,
    m5: 0,
    m6: 0,
    m7: 0,
    m8: 0,
    m9: 0,
    m10: 0,
    m11: 0,
    m12: 0
  }
})

const gridOptions = reactive<VxeGridProps<RowVO> & { pagerConfig: VxeGridPropTypes.PagerConfig }>({
  border: true,
  loading: false,
  stripe: true,
  showOverflow: true,
  showFooter: true,
  height: 600,
  columnConfig: {
    resizable: true,
    drag: true
  },
  columnDragConfig: {
    trigger: 'cell',
    showIcon: false,
    showGuidesStatus: true
  },
  rowConfig: {
    isHover: true
  },
  resizableConfig: {
    isDblclickAutoWidth: true
  },
  formConfig: {
    titleWidth: 80,
    titleAlign: 'right',
    items: [
      { field: 'name', title: '名字', span: 6, itemRender: { name: 'VxeInput' } },
      { field: 'sex', title: '性别', span: 6, itemRender: sexItemRender },
      { field: 'age', title: '年龄', span: 6, itemRender: { name: 'VxeNumberInput' } },
      { field: 'email', title: '邮箱', span: 6, itemRender: { name: 'VxeInput' } },
      { field: 'nickname', title: '昵称', span: 6, folding: true, itemRender: { name: 'VxeInput' } },
      { field: 'city', title: '所在地', span: 6, folding: true, itemRender: cityItemRender },
      { field: 'flag', title: '是否启用', span: 6, folding: true, itemRender: { name: 'VxeSwitch' } },
      { field: 'levelNum', title: '评分', span: 6, folding: true, itemRender: { name: 'VxeRate' } },
      { field: 'startTime', title: '开始时间', span: 6, folding: true, itemRender: { name: 'VxeDatePicker' } },
      { field: 'endTime', title: '结束时间', span: 6, folding: true, itemRender: { name: 'VxeDatePicker' } },
      {
        span: 24,
        align: 'center',
        collapseNode: true,
        itemRender: {
          name: 'VxeButtonGroup',
          options: [
            { type: 'submit', content: '查询', status: 'primary', icon: 'vxe-icon-search' },
            { type: 'reset', content: '重置', icon: 'vxe-icon-repeat' }
          ]
        }
      }
    ]
  },
  toolbarConfig: {
    custom: true,
    refresh: true,
    zoom: true,
    slots: {
      buttons: 'toolbarButtons'
    }
  },
  checkboxConfig: {
    range: true
  },
  mouseConfig: {
    selected: true
  },
  keyboardConfig: {
    isEdit: true,
    isArrow: true,
    isEnter: true,
    isBack: true,
    isDel: true,
    isEsc: true
  },
  pagerConfig: {
    pageSize: 100,
    pageSizes: [3, 20, 100, 500, 1000, 5000, 10000, 50000, 100000]
  },
  scrollX: {
    gt: 0,
    enabled: true
  },
  scrollY: {
    gt: 0,
    enabled: true
  },
  columns: [
    { field: 'seq', type: 'seq', width: 80 },
    { field: 'checkbox', type: 'checkbox', width: 80 },
    { field: 'avatarUrl', title: '头像', width: 80, cellRender: avatarUrlCellRender },
    { field: 'name', title: '名字', minWidth: 200, dragSort: true },
    {
      title: '基本信息',
      field: 'info',
      children: [
        { field: 'city', title: '所在地', width: 140, formatter: formatCity },
        { field: 'age', title: '年龄', width: 120 },
        { field: 'sex', title: '性别', width: 120, formatter: formatSex },
        { field: 'email', title: '邮箱', width: 220, slots: { default: 'emailDefault' } }
      ]
    },
    { field: 'flag', title: '是否启用', width: 120, cellRender: flag1CellRender },
    { field: 'levelNum', title: '评分', width: 160, cellRender: levelNumCellRender },
    {
      title: '年度账单',
      field: 'annualStatement',
      children: [
        { field: 'annualStatement.m1', title: '一月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m2', title: '二月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m3', title: '三月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m4', title: '四月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m5', title: '五月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m6', title: '六月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m7', title: '七月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m8', title: '八月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m9', title: '九月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m10', title: '十月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m11', title: '十一月', width: 140, formatter: formatAmount },
        { field: 'annualStatement.m12', title: '十二月', width: 140, formatter: formatAmount }
      ]
    }
  ],
  proxyConfig: {
    form: true,
    response: {
      result: 'data',
      total: 'total'
    },
    ajax: {
      query ({ page }) {
        return loadMockData(page.pageSize)
      }
    }
  },
  footerData: [
    countRow,
    meanRow
  ]
})

const gridEvents: VxeGridListeners = {
  pageChange ({ pageSize }) {
    gridOptions.pagerConfig.pageSize = pageSize
  },
  proxyQuery () {
    updateFooterCount()
  }
}

const arList = XEUtils.shuffle(XEUtils.range(1, 21).map(num => `https://vxeui.com/resource/avatarImg/avatar${num}.jpeg`))
const neList = XEUtils.shuffle(['张三', '李四', '王五', '小徐', '老张', '老六', '小明', '老徐', '小张', '小赵', '老高', '老铁', '赵高', '小王', '老王'])
const cyList = XEUtils.shuffle(['sz', 'gz', 'bj', 'sh', 'hz'])
const sxList = XEUtils.shuffle(XEUtils.range(1, 60).map(num => `${num % 2}`))
const aeList = XEUtils.shuffle(XEUtils.range(18, 66))
const elList = XEUtils.range(1, 60).map(num => `${XEUtils.sample('qwertyuiopasdfghjklzxcvbnm'.split(''), XEUtils.random(6, 16)).join('')}@163.com`)
const lnList = XEUtils.shuffle(XEUtils.range(0, 5))
const asmMpas = {
  m1: XEUtils.shuffle(XEUtils.range(1000, 1500)),
  m2: XEUtils.shuffle(XEUtils.range(1100, 1400)),
  m3: XEUtils.shuffle(XEUtils.range(800, 1200)),
  m4: XEUtils.shuffle(XEUtils.range(3000, 3600)),
  m5: XEUtils.shuffle(XEUtils.range(2000, 2100)),
  m6: XEUtils.shuffle(XEUtils.range(1600, 1700)),
  m7: XEUtils.shuffle(XEUtils.range(1200, 1300)),
  m8: XEUtils.shuffle(XEUtils.range(1100, 1200)),
  m9: XEUtils.shuffle(XEUtils.range(1700, 1800)),
  m10: XEUtils.shuffle(XEUtils.range(1300, 1700)),
  m11: XEUtils.shuffle(XEUtils.range(1000, 1300)),
  m12: XEUtils.shuffle(XEUtils.range(800, 1200))
}
const fgList = XEUtils.shuffle(XEUtils.range(1, 60).map(num => (num % 2) === 0))
const cacheList: RowVO[] = []

const loadMockData = (rSize: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      for (let i = cacheList.length; i < rSize; i++) {
        const item: RowVO = {
          id: 1000000 + i,
          name: neList[i % neList.length],
          nickname: '',
          sex: sxList[i % sxList.length],
          age: aeList[i % aeList.length],
          email: elList[i % elList.length],
          city: cyList[i % cyList.length],
          avatarUrl: arList[i % arList.length],
          levelNum: lnList[i % lnList.length],
          annualStatement: {
            m1: asmMpas.m1[i % asmMpas.m1.length],
            m2: asmMpas.m2[i % asmMpas.m2.length],
            m3: asmMpas.m3[i % asmMpas.m3.length],
            m4: asmMpas.m4[i % asmMpas.m4.length],
            m5: asmMpas.m5[i % asmMpas.m5.length],
            m6: asmMpas.m6[i % asmMpas.m6.length],
            m7: asmMpas.m7[i % asmMpas.m7.length],
            m8: asmMpas.m8[i % asmMpas.m8.length],
            m9: asmMpas.m9[i % asmMpas.m9.length],
            m10: asmMpas.m10[i % asmMpas.m10.length],
            m11: asmMpas.m11[i % asmMpas.m11.length],
            m12: asmMpas.m12[i % asmMpas.m12.length]
          },
          flag: fgList[i % fgList.length]
        }
        cacheList.push(item)
      }
      const data = cacheList.slice(0, rSize)
      resolve({
        data,
        total: data.length
      })
    }, 150)
  })
}

const changeRowSizeEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    await nextTick()
    await $grid.commitProxy('reload')
  }
}

const updateFooterCount = () => {
  const $grid = gridRef.value
  if ($grid) {
    const tableData = $grid.getFullData()
    let countM1 = 0
    let countM2 = 0
    let countM3 = 0
    let countM4 = 0
    let countM5 = 0
    let countM6 = 0
    let countM7 = 0
    let countM8 = 0
    let countM9 = 0
    let countM10 = 0
    let countM11 = 0
    let countM12 = 0
    let countLN = 0
    tableData.forEach(row => {
      countM1 += XEUtils.toNumber(row.annualStatement.m1)
      countM2 += XEUtils.toNumber(row.annualStatement.m2)
      countM3 += XEUtils.toNumber(row.annualStatement.m3)
      countM4 += XEUtils.toNumber(row.annualStatement.m4)
      countM5 += XEUtils.toNumber(row.annualStatement.m5)
      countM6 += XEUtils.toNumber(row.annualStatement.m6)
      countM7 += XEUtils.toNumber(row.annualStatement.m7)
      countM8 += XEUtils.toNumber(row.annualStatement.m8)
      countM9 += XEUtils.toNumber(row.annualStatement.m9)
      countM10 += XEUtils.toNumber(row.annualStatement.m10)
      countM11 += XEUtils.toNumber(row.annualStatement.m11)
      countM12 += XEUtils.toNumber(row.annualStatement.m12)
      countLN += XEUtils.toNumber(row.levelNum)
    })
    countRow.name = tableData.length
    countRow.annualStatement.m1 = countM1
    countRow.annualStatement.m2 = countM2
    countRow.annualStatement.m3 = countM3
    countRow.annualStatement.m4 = countM4
    countRow.annualStatement.m5 = countM5
    countRow.annualStatement.m6 = countM6
    countRow.annualStatement.m7 = countM7
    countRow.annualStatement.m8 = countM8
    countRow.annualStatement.m9 = countM9
    countRow.annualStatement.m10 = countM10
    countRow.annualStatement.m11 = countM11
    countRow.annualStatement.m12 = countM12

    meanRow.name = 12
    meanRow.annualStatement.m1 = XEUtils.round(countM1 / tableData.length, 2)
    meanRow.annualStatement.m1 = XEUtils.round(countM1 / tableData.length, 2)
    meanRow.annualStatement.m2 = XEUtils.round(countM2 / tableData.length, 2)
    meanRow.annualStatement.m3 = XEUtils.round(countM3 / tableData.length, 2)
    meanRow.annualStatement.m4 = XEUtils.round(countM4 / tableData.length, 2)
    meanRow.annualStatement.m5 = XEUtils.round(countM5 / tableData.length, 2)
    meanRow.annualStatement.m6 = XEUtils.round(countM6 / tableData.length, 2)
    meanRow.annualStatement.m7 = XEUtils.round(countM7 / tableData.length, 2)
    meanRow.annualStatement.m8 = XEUtils.round(countM8 / tableData.length, 2)
    meanRow.annualStatement.m9 = XEUtils.round(countM9 / tableData.length, 2)
    meanRow.annualStatement.m10 = XEUtils.round(countM10 / tableData.length, 2)
    meanRow.annualStatement.m11 = XEUtils.round(countM11 / tableData.length, 2)
    meanRow.annualStatement.m12 = XEUtils.round(countM12 / tableData.length, 2)
  }
}
</script>

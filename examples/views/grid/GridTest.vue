<template>
  <div class="demo-page-wrapper">
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents">
      <template #toolbarButtons>
        <span>数据：</span>
        <vxe-select v-model="selectSize" :options="dataOptions" @change="changeRowSizeEvent"></vxe-select>
      </template>

      <template #emailDefault="{ row }">
        <vxe-text :content="row.email" click-to-copy></vxe-text>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VxeGridInstance, VxeGridProps, VxeColumnPropTypes, VxeGridListeners } from '../../../types'
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
  flag: boolean
}

const gridRef = ref<VxeGridInstance<RowVO>>()

const selectSize = ref(20)
const dataOptions = ref([
  { label: '加载 3 行', value: 3 },
  { label: '加载 20 行', value: 20 },
  { label: '加载 100 行', value: 100 },
  { label: '加载 1000 行', value: 1000 },
  { label: '加载 1w 行', value: 10000 },
  { label: '加载 10w 行', value: 100000 },
  { label: '加载 50w 行', value: 5000000 },
  { label: '加载 100w 行', value: 10000000 },
  { label: '加载 200w 行', value: 20000000 }
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

const cityOptions = [
  { label: '广东省深圳市', value: 'sz' },
  { label: '广东省广州市', value: 'gz' },
  { label: '北京市', value: 'bj' },
  { label: '上海市', value: 'sh' },
  { label: '浙江省杭州市', value: 'hz' }
]

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

const countRow = reactive({
  seq: '合计',
  name: 0
})

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  loading: false,
  stripe: true,
  showOverflow: true,
  showFooter: true,
  height: 800,
  columnConfig: {
    resizable: true // 启用列宽拖拽调整大小
  },
  resizableConfig: {
    isDblclickAutoWidth: true // 启用双击自适应列宽
  },
  rowConfig: {
    isHover: true
  },
  exportConfig: {
    types: ['xlsx']
  },
  toolbarConfig: {
    custom: true,
    zoom: true,
    refresh: true,
    export: true,
    slots: {
      buttons: 'toolbarButtons'
    }
  },
  checkboxConfig: {
    range: true
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
    { field: 'seq', type: 'seq', width: 100 },
    { field: 'checkbox', type: 'checkbox', width: 80 },
    { field: 'avatarUrl', title: '头像', width: 80, cellRender: avatarUrlCellRender },
    { field: 'name', title: '名字', minWidth: 200, dragSort: true },
    { field: 'city', title: '所在地', width: 140, formatter: formatCity },
    { field: 'age', title: '年龄', width: 120 },
    { field: 'sex', title: '性别', width: 120, formatter: formatSex },
    { field: 'email', title: '邮箱', width: 220, slots: { default: 'emailDefault' } },
    { field: 'flag', title: '是否启用', width: 120, cellRender: flag1CellRender },
    { field: 'levelNum', title: '评分', width: 160, cellRender: levelNumCellRender }
  ],
  footerData: [
    countRow
  ]
})

const gridEvents: VxeGridListeners = {
  cellAreaPaste () {
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
const fgList = XEUtils.shuffle(XEUtils.range(1, 60).map(num => (num % 2) === 0))

const loadMockData = (rSize: number) => {
  gridOptions.loading = true
  setTimeout(() => {
    const list: RowVO[] = []
    const s = Date.now()
    for (let i = 0; i < rSize; i++) {
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
        flag: fgList[i % fgList.length]
      }
      list.push(item)
    }
    console.log(Date.now() - s)
    const $grid = gridRef.value
    if ($grid) {
      $grid.loadData(list).then(() => {
        gridOptions.loading = false
        updateFooterCount()
      })
      gridOptions.loading = false
    } else {
      gridOptions.loading = false
    }
  }, 300)
}

const changeRowSizeEvent = async () => {
  loadMockData(selectSize.value)
}

const updateFooterCount = () => {
  const $grid = gridRef.value
  if ($grid) {
    const tableData = $grid.getFullData()
    countRow.name = tableData.length
  }
}

loadMockData(selectSize.value)
</script>

<template>
  <div class="demo-page-wrapper">
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents">
      <template #toolbarButtons>
        <vxe-select v-model="selectRowSize" :options="dataOptions" @change="changeRowSizeEvent"></vxe-select>
        <vxe-button status="primary" icon="vxe-icon-add" @click="addEvent">新增</vxe-button>
        <vxe-button status="error" icon="vxe-icon-no-drop" @click="pendingSelect(true)">标记删除</vxe-button>
        <vxe-button status="error" icon="vxe-icon-no-drop" @click="pendingSelect(false)">取消标记</vxe-button>
        <vxe-button status="success" icon="vxe-icon-save" @click="saveEvent">保存</vxe-button>
      </template>

      <template #active="{ row }">
        <vxe-button mode="text" status="error" icon="vxe-icon-delete" @click="removeRow(row)"></vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { VxeGridInstance, VxeGridProps, VxeColumnPropTypes, VxeGridListeners } from '../../../types'
import { VxeUI, VxeSelectProps, VxeUploadProps } from 'vxe-pc-ui'
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
  imgList: any[]
  fileList: any[]
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

const countRow = reactive({
  seq: '合计',
  name: '',
  levelNum: 0,
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

const selectRowSize = ref(100)
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

const avatarUrlCellRender = reactive<VxeColumnPropTypes.CellRender<RowVO, VxeUploadProps>>({
  name: 'VxeUpload',
  props: {
    mode: 'image',
    singleMode: true,
    urlMode: true,
    showButtonText: false,
    pasteToUpload: true,
    autoHiddenButton: true,
    progressText: '{percent}%',
    imageConfig: {
      circle: true,
      width: 40,
      height: 40
    }
  }
})

const imgListCellRender = reactive<VxeColumnPropTypes.CellRender<RowVO, VxeUploadProps>>({
  name: 'VxeUpload',
  props: {
    mode: 'image',
    multiple: true,
    urlMode: true,
    showButtonText: false,
    pasteToUpload: true,
    dragSort: true,
    progressText: '{percent}%',
    moreConfig: {
      maxCount: 1
    },
    imageConfig: {
      width: 40,
      height: 40
    }
  }
})

const fileListCellRender = reactive<VxeColumnPropTypes.CellRender<RowVO, VxeUploadProps>>({
  name: 'VxeUpload',
  props: {
    multiple: true,
    urlMode: true,
    showButtonText: false,
    pasteToUpload: true,
    dragSort: true,
    progressText: '{percent}%',
    moreConfig: {
      maxCount: 1,
      layout: 'horizontal'
    }
  }
})

const levelNumCellRender = reactive<VxeColumnPropTypes.CellRender>({
  name: 'VxeRate',
  events: {
    change: () => {
      updateFooterCount()
    }
  }
})

const flag1CellRender = reactive<VxeColumnPropTypes.CellRender>({
  name: 'VxeSwitch'
})

const sexEditRender = reactive<VxeColumnPropTypes.EditRender<RowVO, VxeSelectProps>>({
  name: 'VxeSelect',
  options: [
    { label: '女', value: '0' },
    { label: '男', value: '1' }
  ]
})

const cityEditRender = reactive<VxeColumnPropTypes.EditRender<RowVO, VxeSelectProps>>({
  name: 'VxeSelect',
  options: [
    { label: '广东省深圳市', value: 'sz' },
    { label: '广东省广州市', value: 'gz' },
    { label: '北京市', value: 'bj' },
    { label: '上海市', value: 'sh' },
    { label: '浙江省杭州市', value: 'hz' }
  ]
})

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  loading: false,
  stripe: true,
  showOverflow: true,
  showFooterOverflow: true,
  showFooter: true,
  keepSource: true,
  height: 800,
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
    useKey: true,
    isHover: true
  },
  resizableConfig: {
    isDblclickAutoWidth: true
  },
  toolbarConfig: {
    custom: true,
    zoom: true,
    slots: {
      buttons: 'toolbarButtons'
    }
  },
  checkboxConfig: {
    range: true
  },
  editConfig: {
    mode: 'cell',
    trigger: 'dblclick',
    showStatus: true
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
  scrollX: {
    gt: 0,
    enabled: true
  },
  scrollY: {
    gt: 0,
    enabled: true
  },
  editRules: {
    name: [
      { required: true, content: '请输入名字' }
    ]
  },
  columns: [
    { field: 'seq', type: 'seq', fixed: 'left', width: 60 },
    { field: 'checkbox', type: 'checkbox', fixed: 'left', width: 60 },
    { field: 'avatarUrl', title: '头像', width: 80, cellRender: avatarUrlCellRender },
    { field: 'name', title: '名字', minWidth: 200, dragSort: true, editRender: { name: 'VxeInput' } },
    {
      title: '基本信息',
      field: 'info',
      children: [
        { field: 'city', title: '所在地', width: 140, editRender: cityEditRender },
        { field: 'age', title: '年龄', width: 120, editRender: { name: 'VxeNumberInput', props: { type: 'integer' } } },
        { field: 'sex', title: '性别', width: 120, editRender: sexEditRender },
        { field: 'email', title: '邮箱', width: 220, editRender: { name: 'VxeInput' } }
      ]
    },
    { field: 'flag', title: '是否启用', width: 140, cellRender: flag1CellRender },
    { field: 'levelNum', title: '评分', width: 160, cellRender: levelNumCellRender },
    {
      title: '存档信息',
      field: 'archive',
      children: [
        { field: 'imgList', title: '图片列表', width: 210, cellRender: imgListCellRender },
        { field: 'fileList', title: '附件列表', width: 300, cellRender: fileListCellRender }
      ]
    },
    {
      title: '年度账单',
      field: 'annualStatement',
      children: [
        { field: 'annualStatement.m1', title: '一月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m2', title: '二月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m3', title: '三月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m4', title: '四月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m5', title: '五月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m6', title: '六月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m7', title: '七月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m8', title: '八月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m9', title: '九月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m10', title: '十月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m11', title: '十一月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } },
        { field: 'annualStatement.m12', title: '十二月', width: 140, editRender: { name: 'VxeNumberInput', props: { type: 'amount' } } }
      ]
    },
    { field: 'active', title: '操作', fixed: 'right', width: 80, slots: { default: 'active' } }
  ],
  footerData: [
    countRow
  ]
})

const gridEvents: VxeGridListeners = {
  editClosed () {
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
const allFileList = ['https://vxeui.com/resource/img/fj586.png', 'https://vxeui.com/resource/img/fj577.jpg', 'https://vxeui.com/resource/img/fj562.png', 'https://vxeui.com/resource/img/fj124.jpeg']
const flList = XEUtils.shuffle(XEUtils.range(1, 20).map(num => XEUtils.sample(allFileList, XEUtils.random(0, 3))))
const allImageList = ['https://vxeui.com/resource/img/fj577.jpg', 'https://vxeui.com/resource/img/fj562.png', 'https://vxeui.com/resource/img/fj579.png', 'https://vxeui.com/resource/img/fj573.jpeg', 'https://vxeui.com/resource/img/fj586.png']
const igList = XEUtils.shuffle(XEUtils.range(1, 20).map(num => XEUtils.sample(allImageList, XEUtils.random(0, 3))))
const cacheList: RowVO[] = []

const loadMockData = (rSize: number) => {
  gridOptions.loading = true
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
        imgList: igList[i % igList.length],
        fileList: XEUtils.clone(flList[i % flList.length], true),
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
    const $grid = gridRef.value
    if ($grid) {
      $grid.reloadData(cacheList.slice(0, rSize)).then(() => {
        updateFooterCount()
      })
    }
    gridOptions.loading = false
  }, 150)
}

const changeRowSizeEvent = () => {
  loadMockData(selectRowSize.value)
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
    countRow.name = `${tableData.length}人`
    countRow.levelNum = countLN
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
  }
}

const addEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const record = {
      name: XEUtils.sample(neList)
    }
    const { row: newRow } = await $grid.insertAt(record, null)
    await $grid.setEditRow(newRow)
    updateFooterCount()
  }
}

const pendingSelect = async (checked: boolean) => {
  const $grid = gridRef.value
  if ($grid) {
    const selectRecords = $grid.getCheckboxRecords()
    if (selectRecords.length) {
      $grid.setPendingRow(selectRecords, checked)
      $grid.clearCheckboxRow()
    } else {
      VxeUI.modal.message({
        content: '未选中数据',
        status: 'info'
      })
    }
  }
}

const removeRow = async (row: RowVO) => {
  const $grid = gridRef.value
  if ($grid) {
    await $grid.remove(row)
    updateFooterCount()
  }
}

const saveEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const errMap = await $grid.validate(true)
    if (errMap) {
      return
    }
    const { insertRecords, updateRecords, removeRecords } = $grid.getRecordset()
    const pendingRecords = $grid.getPendingRecords()
    VxeUI.modal.alert({
      title: 'CRUD 管理器',
      content: `新增：${insertRecords.length} 行，已删除：${removeRecords.length} 行，待删除：${pendingRecords.length} 行，修改：${updateRecords.length} 行`
    })
  }
}

nextTick(() => {
  loadMockData(selectRowSize.value)
})
</script>

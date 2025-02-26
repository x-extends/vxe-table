<template>
  <div class="demo-page-wrapper">
    <vxe-grid v-bind="gridOptions" v-on="gridEvents">
      <template #productNameDefault="{ row }">
        <vxe-text-ellipsis status="primary" line-clamp="3" :content="row.productName" href="https://vxeui.com" target="_blank"></vxe-text-ellipsis>
        <div>颜色：{{ row.productColor }} 尺寸：{{ row.productSize }}</div>
      </template>

      <template #productSKUDefault="{ row }">
        <div>SKU：<vxe-text :content="row.productSKU" click-to-copy></vxe-text></div>
        <div>编码：<vxe-text :content="row.productCode" click-to-copy></vxe-text></div>
      </template>

      <template #productAmountDefault="{ row }">
        <div>现价：￥{{ row.productAmount }}</div>
        <div>折扣价：￥{{ row.productDiscountAmount }}</div>
        <div>秒杀价：￥{{ row.productLkAmount }}</div>
      </template>

      <template #productNumDefault="{ row }">
        <div>库存：{{ row.productStoreNum }}</div>
        <div>已上架：{{ row.productAddNum }}</div>
        <div>已下架：{{ row.productRemoveNum }}</div>
      </template>

      <template #productStatusDefault="{ row }">
        <vxe-tag :status="row.productStatus" :content="row.productStatus === 'success' ? '已上架' : '已下架'"></vxe-tag>
      </template>

      <template #productOwnerDefault="{ row }">
        <div>负责人：{{ row.productOwner }}</div>
        <div>创建人：{{ row.createBy }}</div>
        <div>更新人：{{ row.updateBy }}</div>
      </template>

      <template #updateDateDefault="{ row }">
        <div>上架时间：{{ row.addDate }}</div>
        <div>下架时间：{{ row.removeDate }}</div>
        <div>更新时间：{{ row.updateDate }}</div>
        <div>更新时间：{{ row.updateDate }}</div>
      </template>

      <template #expandContent="{ row }">
        <vxe-grid v-bind="subGridOptions" :data="row.subList">
          <template #statusDefault="{ row }">
            <vxe-tag :status="row.status" :content="row.status === 'success' ? '成功' : '失败'"></vxe-tag>
          </template>
        </vxe-grid>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { VxeGridProps, VxeGridPropTypes, VxeColumnPropTypes, VxeGridListeners } from '../../../types'
import XEUtils from 'xe-utils'

interface RowVO {
  id: number
  productUrl: string
  productSKU: string
  productCode: string
  productName: string
  productAmount: number
  productDiscountAmount: number
  productLkAmount: number
  productStoreNum: number
  productAddNum: number
  productRemoveNum: number
  productOwner: string
  productStatus: string
  productColor: string
  productSize: string
  updateBy: string
  createBy: string
  updateDate: string
  createDate: string
  addDate: string
  removeDate: string
  subList: any[]
}

const productUrlCellRender = reactive<VxeColumnPropTypes.CellRender>({
  name: 'VxeImage',
  props: {
    width: 100,
    height: 100
  }
})

const countRow = reactive({
  checkbox: '合计',
  productName: 0,
  productAmount: 0
})

const gridOptions = reactive<VxeGridProps<RowVO> & { pagerConfig: VxeGridPropTypes.PagerConfig }>({
  border: true,
  loading: false,
  // stripe: true,
  showOverflow: true,
  showFooter: true,
  height: 900,
  cellConfig: {
    height: 140
  },
  columnConfig: {
    resizable: true
    // drag: true
  },
  columnDragConfig: {
    trigger: 'cell',
    showIcon: false
  },
  rowConfig: {
    // drag: true
  },
  resizableConfig: {
    isDblclickAutoWidth: true
  },
  expandConfig: {
    padding: true
  },
  formConfig: {
    titleWidth: 80,
    titleAlign: 'right',
    items: [
      { field: 'productName', title: '产品名字', span: 6, itemRender: { name: 'VxeInput' } },
      { field: 'productSKU', title: 'SKU', span: 6, itemRender: { name: 'VxeInput' } },
      { field: 'productCode', title: '产品编码', span: 6, itemRender: { name: 'VxeInput' } },
      { field: 'email', title: '邮箱', span: 6, folding: true, itemRender: { name: 'VxeInput' } },
      { field: 'nickname', title: '昵称', span: 6, folding: true, itemRender: { name: 'VxeInput' } },
      { field: 'startTime', title: '开始时间', span: 6, folding: true, itemRender: { name: 'VxeDatePicker' } },
      { field: 'endTime', title: '结束时间', span: 6, folding: true, itemRender: { name: 'VxeDatePicker' } },
      {
        span: 6,
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
    zoom: true
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
    pageSize: 80000,
    pageSizes: [3, 20, 100, 500, 1000, 5000, 10000, 50000, 80000, 100000, 200000, 500000, 1000000, 2000000]
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
    { field: 'checkbox', type: 'checkbox', width: 60, align: 'center' },
    { field: 'seq', type: 'seq', width: 100, align: 'center', dragSort: true },
    { field: 'expand', type: 'expand', width: 60, align: 'center', slots: { content: 'expandContent' } },
    { field: 'productUrl', title: '产品图片', width: 160, align: 'center', cellRender: productUrlCellRender },
    { field: 'productName', title: '产品名称', minWidth: 200, slots: { default: 'productNameDefault' } },
    { field: 'productSKU', title: 'SKU', minWidth: 200, slots: { default: 'productSKUDefault' } },
    { field: 'productAmount', title: '价格', width: 160, slots: { default: 'productAmountDefault' } },
    { field: 'productNum', title: '数量', width: 120, slots: { default: 'productNumDefault' } },
    { field: 'productStatus', title: '状态', width: 100, align: 'center', slots: { default: 'productStatusDefault' } },
    { field: 'productOwner', title: '负责人', width: 160, slots: { default: 'productOwnerDefault' } },
    { field: 'updateDate', title: '更新时间', width: 240, slots: { default: 'updateDateDefault' } }
  ],
  proxyConfig: {
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
    countRow
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

const imgUrlCellRender = reactive<VxeColumnPropTypes.CellRender>({
  name: 'VxeImage',
  props: {
    width: 40,
    height: 40
  }
})

const subGridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showOverflow: true,
  columns: [
    { field: 'imgUrl', title: '关联产品', width: 80, align: 'center', cellRender: imgUrlCellRender },
    { field: 'name', title: '名称' },
    { field: 'storeNum', title: '库存', width: 120, align: 'center' },
    { field: 'status', title: '状态', width: 120, align: 'center', slots: { default: 'statusDefault' } },
    { field: 'color', title: '颜色', width: 120, align: 'center' },
    { field: 'size', title: '尺寸', width: 120, align: 'center' }
  ]
})

const ptList = XEUtils.shuffle(XEUtils.range(1, 13).map(num => `https://vxeui.com/resource/productImg/product${num}.png`))
const pnList = XEUtils.shuffle(['进口夏威夷', '广东精选苹果，超甜多汁好处的特大号苹果', '好吃的板栗仁', '真皮特大沙发定制沙发', '程序员专用键盘', '无线超级AI鼠标，全自动脑电波感应鼠标，解放双手，纳秒级响应速度，竞技超级鼠标、游戏专用鼠标、办公鼠标、静音鼠标、鼠标之王、必备神器、AI智能鼠标、一个超级神奇的智能鼠标、写代码速度翻倍提升超高效率的鼠标', 'AI语音助手闹钟、超人工智能鼠标、全自动叫醒闹钟、懒人必备，脑电波唤醒、超级省电的闹钟、值得拥有的闹钟没有之一'])

const skuList = XEUtils.range(1, 60).map(num => XEUtils.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 14).join(''))
const pcList = XEUtils.range(1, 60).map(num => XEUtils.sample('qwertyuiopasdfghjklzxcvbnm'.split(''), 8).join(''))
const paList = XEUtils.shuffle(XEUtils.range(5000, 90000))
const pdaList = XEUtils.shuffle(XEUtils.range(1000, 9000))
const plkaList = XEUtils.shuffle(XEUtils.range(800, 9000))
const pssList = XEUtils.shuffle(XEUtils.range(1, 10000))
const panList = XEUtils.shuffle(XEUtils.range(1, 20))
const prnList = XEUtils.shuffle(XEUtils.range(1, 20))
const colorList = XEUtils.shuffle(['红色', '蓝色', '紫色', '黑色', '白色'])
const sizeList = XEUtils.shuffle(['特大', '大', '中', '小', '迷你'])
const psList = XEUtils.shuffle(['success', 'error', 'warning'])

const userList = ['张三', '李四', '王五', '小徐', '老张', '老六', '小明', '老徐', '小张', '小赵', '老高', '老铁', '赵高', '小王', '老王']
const poList = XEUtils.shuffle(userList)
const cbList = XEUtils.shuffle(userList)
const ubList = XEUtils.shuffle(userList)

const dateList = ['2025-01-02 10:41:55', '2025-05-10 11:18:19', '2025-06-04 12:09:17', '2025-01-02 22:22:19', '2025-01-02 16:10:08', '2025-01-08 15:22:09']
const udList = XEUtils.shuffle(dateList)
const cdList = XEUtils.shuffle(dateList)
const adList = XEUtils.shuffle(dateList)
const rdList = XEUtils.shuffle(dateList)
const cacheList: RowVO[] = []

const allSubList = XEUtils.range(1, 10).map((num, i) => {
  return {
    imgUrl: ptList[i % ptList.length],
    name: pnList[i % pnList.length],
    storeNum: pssList[i % pssList.length],
    status: psList[i % psList.length],
    color: colorList[i % colorList.length],
    size: sizeList[i % sizeList.length]
  }
})
const slList = XEUtils.range(1, 10).map(num => XEUtils.sample(allSubList, XEUtils.random(2, 5)))

const loadMockData = (rSize: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      for (let i = cacheList.length; i < rSize; i++) {
        const item: RowVO = {
          id: 1000000 + i,
          productUrl: ptList[i % ptList.length],
          productSKU: skuList[i % skuList.length],
          productCode: pcList[i % pcList.length],
          productName: pnList[i % pnList.length],
          productAmount: paList[i % paList.length],
          productDiscountAmount: pdaList[i % pdaList.length],
          productLkAmount: plkaList[i % plkaList.length],
          productStoreNum: pssList[i % pssList.length],
          productAddNum: panList[i % panList.length],
          productRemoveNum: prnList[i % prnList.length],
          productOwner: poList[i % poList.length],
          productStatus: psList[i % psList.length],
          productColor: colorList[i % colorList.length],
          productSize: sizeList[i % sizeList.length],
          updateBy: ubList[i % ubList.length],
          createBy: cbList[i % cbList.length],
          updateDate: udList[i % udList.length],
          createDate: cdList[i % cdList.length],
          addDate: adList[i % adList.length],
          removeDate: rdList[i % rdList.length],
          subList: slList[i % slList.length]
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

const updateFooterCount = () => {
  countRow.productName = XEUtils.random(9999, 999999)
  countRow.productAmount = XEUtils.random(9999, 999999)
}
</script>

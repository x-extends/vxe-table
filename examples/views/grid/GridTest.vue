<template>
  <div>
    <vxe-select v-model="rowSize" :options="dataOptions" @change="loadData()"></vxe-select>
    <vxe-table
      border
      height="800"
      :loading="loading"
      :column-config="{resizable: true}"
      :scroll-x="{enabled: true, gt: 0}"
      :scroll-y="{enabled: true, gt: 0}"
      :data="tableData">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="col0" title="列0" width="100"></vxe-column>
      <vxe-column field="imgUrl" title="列1" width="80" :cell-render="imgUrlCellRender"></vxe-column>
      <vxe-column field="col2" title="列2" width="160"></vxe-column>
      <vxe-column field="col3" title="列3" width="200"></vxe-column>
      <vxe-column field="col4" title="列4" width="140"></vxe-column>
      <vxe-column field="col5" title="列5" width="300"></vxe-column>
      <vxe-column field="col6" title="列6" width="160"></vxe-column>
      <vxe-column field="col7" title="列7" width="120"></vxe-column>
      <vxe-column field="col8" title="列8" width="400"></vxe-column>
      <vxe-column field="col9" title="列9" width="160"></vxe-column>
      <vxe-column field="col10" title="列10" width="160"></vxe-column>
      <vxe-column field="col11" title="列11" width="180"></vxe-column>
      <vxe-column field="col12" title="列12" width="160"></vxe-column>
      <vxe-column field="col13" title="列13" width="80"></vxe-column>
      <vxe-column field="col14" title="列14" width="120"></vxe-column>
      <vxe-column field="col15" title="列15" width="360"></vxe-column>
      <vxe-column field="col16" title="列16" width="150"></vxe-column>
      <vxe-column field="col17" title="列17" width="380"></vxe-column>
      <vxe-column field="col18" title="列18" width="100"></vxe-column>
      <vxe-column field="col19" title="列19" width="290"></vxe-column>
      <vxe-column field="col20" title="列20" width="80"></vxe-column>
      <vxe-column field="col21" title="列21" width="100"></vxe-column>
      <vxe-column field="col22" title="列22" width="120"></vxe-column>
      <vxe-column field="col23" title="列23" width="270"></vxe-column>
      <vxe-column field="col24" title="列24" width="330"></vxe-column>
      <vxe-column field="col25" title="列25" width="460"></vxe-column>
      <vxe-column field="col26" title="列26" width="280"></vxe-column>
      <vxe-column field="col27" title="列27" width="220"></vxe-column>
      <vxe-column field="col28" title="列28" width="120"></vxe-column>
      <vxe-column field="col29" title="列29" width="180"></vxe-column>
      <vxe-column field="col30" title="列30" width="500"></vxe-column>
      <vxe-column field="col31" title="列31" width="600"></vxe-column>
      <vxe-column field="col32" title="列32" width="100"></vxe-column>
      <vxe-column field="col33" title="列33" width="490"></vxe-column>
      <vxe-column field="col34" title="列34" width="100"></vxe-column>
      <vxe-column field="col35" title="列35" width="150"></vxe-column>
      <vxe-column field="col36" title="列36" width="800"></vxe-column>
      <vxe-column field="col37" title="列37" width="400"></vxe-column>
      <vxe-column field="col38" title="列38" width="800"></vxe-column>
      <vxe-column field="col39" title="列39" width="360"></vxe-column>
      <vxe-column field="col40" title="列40" width="420"></vxe-column>
      <vxe-column field="col41" title="列41" width="100"></vxe-column>
      <vxe-column field="col42" title="列42" width="120"></vxe-column>
      <vxe-column field="col43" title="列43" width="280"></vxe-column>
      <vxe-column field="col44" title="列44" width="170"></vxe-column>
      <vxe-column field="col45" title="列45" width="370"></vxe-column>
      <vxe-column field="col46" title="列46" width="120"></vxe-column>
      <vxe-column field="col47" title="列47" width="170"></vxe-column>
      <vxe-column field="col48" title="列48" width="400"></vxe-column>
      <vxe-column field="col49" title="列49" width="220"></vxe-column>
      <vxe-column field="col50" title="列50" width="170"></vxe-column>
      <vxe-column field="col51" title="列51" width="160"></vxe-column>
      <vxe-column field="col52" title="列52" width="100"></vxe-column>
      <vxe-column field="col53" title="列53" width="280"></vxe-column>
      <vxe-column field="col54" title="列54" width="170"></vxe-column>
      <vxe-column field="col55" title="列55" width="370"></vxe-column>
      <vxe-column field="col56" title="列56" width="120"></vxe-column>
      <vxe-column field="col57" title="列57" width="170"></vxe-column>
      <vxe-column field="col58" title="列58" width="400"></vxe-column>
      <vxe-column field="col59" title="列59" width="220"></vxe-column>
      <vxe-column field="col60" title="列60" width="500"></vxe-column>
      <vxe-column field="col61" title="列61" width="600"></vxe-column>
      <vxe-column field="col62" title="列62" width="100"></vxe-column>
      <vxe-column field="col63" title="列63" width="490"></vxe-column>
      <vxe-column field="col64" title="列64" width="100"></vxe-column>
      <vxe-column field="col65" title="列65" width="150"></vxe-column>
      <vxe-column field="col66" title="列66" width="800"></vxe-column>
      <vxe-column field="col67" title="列67" width="400"></vxe-column>
      <vxe-column field="col68" title="列68" width="800"></vxe-column>
      <vxe-column field="col69" title="列69" width="360"></vxe-column>
      <vxe-column field="col70" title="列70" width="500"></vxe-column>
      <vxe-column field="col71" title="列71" width="600"></vxe-column>
      <vxe-column field="col72" title="列72" width="100"></vxe-column>
      <vxe-column field="col73" title="列73" width="490"></vxe-column>
      <vxe-column field="col74" title="列74" width="100"></vxe-column>
      <vxe-column field="col75" title="列75" width="150"></vxe-column>
      <vxe-column field="col76" title="列76" width="800"></vxe-column>
      <vxe-column field="col77" title="列77" width="400"></vxe-column>
      <vxe-column field="col78" title="列78" width="800"></vxe-column>
      <vxe-column field="col79" title="列79" width="360"></vxe-column>
      <vxe-column field="col80" title="列80" width="500"></vxe-column>
      <vxe-column field="col81" title="列81" width="600"></vxe-column>
      <vxe-column field="col82" title="列82" width="100"></vxe-column>
      <vxe-column field="col83" title="列83" width="490"></vxe-column>
      <vxe-column field="col84" title="列84" width="100"></vxe-column>
      <vxe-column field="col85" title="列85" width="150"></vxe-column>
      <vxe-column field="col86" title="列86" width="800"></vxe-column>
      <vxe-column field="col87" title="列87" width="400"></vxe-column>
      <vxe-column field="col88" title="列88" width="800"></vxe-column>
      <vxe-column field="col89" title="列89" width="360"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from 'vue'
import { VxeUI } from '../../../packages'
import { VxeColumnPropTypes } from '../../../types'

interface RowVO {
  id: number
  [key: string]: string | number | boolean | any[]
}

const tableData = ref<RowVO[]>([])
const loading = ref(false)

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

// 模拟行数据
const loadData = () => {
  loading.value = true
  setTimeout(() => {
    const dataList: RowVO[] = []
    for (let i = 0; i < rowSize.value; i++) {
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
    tableData.value = dataList
    loading.value = false
    nextTick(() => {
      VxeUI.modal.message({
        content: `加载时间 ${Date.now() - startTime} 毫秒`,
        status: 'success'
      })
    })
  }, 100)
}

loadData()
</script>

<template>
  <div>
    <vxe-table border="" show-footer="" show-overflow="" show-header-overflow=""  height="500" :row-config="{ useKey: true, isHover: true }" :column-config="{ useKey: true }" :tooltip-config="tooltipConfig" :header-tooltip-config="headerTooltipConfig" :data="tableData">
      <vxe-column field="seq" type="seq" width="70"></vxe-column>
      <vxe-column field="name" title="名称"></vxe-column>
      <vxe-column field="role" title="长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
      <vxe-colgroup title="基本信息">
        <vxe-colgroup field="age">
          <template #header="">
            <span>ffffffffffffffffffffffffffffffffffffffffffffffffffff</span>
          </template>
        </vxe-colgroup>
        <vxe-colgroup title="详细信息">
          <vxe-column type="html" field="address" title="详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息" width="160"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
    </vxe-table>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const longText = 'long '.repeat(20)

const tableData = ref([
  { id: 10001, name: longText, role: longText, sex: 'Man', age: 'long '.repeat(12), address: longText },
  { id: 10002, name: longText, role: 'Test', sex: 'Women', age: 22, address: longText },
  { id: 10003, name: longText, role: 'PM', sex: 'Man', age: 32, address: longText },
  { id: 10004, name: longText, role: 'Designer', sex: 'Women', age: 23, address: longText },
  { id: 10005, name: longText, role: 'Develop', sex: 'Women', age: 30, address: longText },
  { id: 10006, name: longText, role: 'Designer', sex: 'Women', age: 21, address: longText },
  { id: 10007, name: longText, role: 'Test', sex: 'Man', age: 29, address: longText },
  { id: 10008, name: longText, role: 'Develop', sex: 'Man', age: 35, address: longText }
])
const headerTooltipConfig = reactive({
  enterable: true
})
const tooltipConfig = reactive({
  enterable: true
})
</script>

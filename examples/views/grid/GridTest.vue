<template>
  <div>
    <!-- 加高该元素 bug会消失 -->
    <div style="width: 100%; height: 200px"></div>
    <vxe-table
      max-height="448"
      :data="tableData"
      :cell-config="{ height: 88 }"
      @scroll-boundary="handleScrollBoundary"
      style="--vxe-ui-table-cell-padding-default: 16px 24px 16px 16px"
    >
      <vxe-column field="name" title="名称" min-width="150"> </vxe-column>
      <vxe-column field="amount" title="价格" min-width="150" align="right">
      </vxe-column>
    </vxe-table>
    <!-- 加高该元素 bug会消失 -->
    <div style="width: 100%; height: 200px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const loading = ref(false)
const tableData = ref([])
const findList = (field, order) => {
  loading.value = true
  // 模拟接口
  return new Promise((resolve) => {
    setTimeout(() => {
      loading.value = false
      const mockList = [
        {
          id: 10001,
          name: 'A',
          price: 1201.58
        },
        {
          id: 10002,
          name: 'B',
          price: 0.1257
        },
        {
          id: 10003,
          name: 'C',
          price: 1201.58
        },
        {
          id: 10004,
          name: 'D',
          price: 0.1257
        },
        {
          id: 10005,
          name: 'E',
          price: 1201.58
        },
        {
          id: 10006,
          name: 'F',
          price: 0.1257
        },
        {
          id: 10007,
          name: 'G',
          price: 1201.58
        },
        {
          id: 10008,
          name: 'H',
          price: 0.1257
        }
      ]
      tableData.value = tableData.value.concat(mockList)
    }, 1000)
  })
}

onMounted(() => {
  findList()
})

function handleScrollBoundary ({ isBottom }) {
  if (isBottom && !loading.value) {
    findList()
  }
}
</script>

<template>
  <div>
    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script>
import { VxeUI } from '../../../packages'

export default {
  data () {
    const gridOptions = {
      border: true,
      loading: false,
      showOverflow: true,
      height: 600,
      virtualYConfig: {
        enabled: true,
        gt: 0
      },
      virtualXConfig: {
        enabled: true,
        gt: 0
      }
    }

    return {
      gridOptions
    }
  },
  methods: {
    // 模拟行与列数据
    loadDataAndColumns (rowSize, colSize) {
      this.gridOptions.loading = true
      setTimeout(() => {
        const $grid = this.$refs.gridRef
        const colList = []
        for (let i = 0; i < colSize; i++) {
          colList.push({
            field: `col${i}`,
            title: i % 5 === 0 ? `长长长标题长长长标题长长长标题长长长标题${i}` : (i % 3 === 0 ? `标题标题标题标题${i}` : `标题${i}`),
            width: 160
          })
        }
        const dataList = []
        for (let i = 0; i < rowSize; i++) {
          const item = {
            id: 10000 + i
          }
          for (let j = 0; j < 20; j++) {
            item[`col${j}`] = `值_${i}_${j}`
          }
          dataList.push(item)
        }
        if ($grid) {
          const startTime = Date.now()
          $grid.loadColumn(colList).then(() => {
            return $grid.loadData(dataList)
          }).then(() => {
            VxeUI.modal.message({
              content: `加载时间 ${Date.now() - startTime} 毫秒`,
              status: 'success'
            })
            this.gridOptions.loading = false
          })
        }
      }, 50)
    }
  },
  created () {
    this.loadDataAndColumns(200, 100)
  }
}
</script>

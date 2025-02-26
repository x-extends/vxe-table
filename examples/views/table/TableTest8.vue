<template>
  <div>
    <p>
      <vxe-button @click="loadDataAndColumns(10, 5)">100行50列</vxe-button>
      <vxe-button @click="loadDataAndColumns(1000, 80)">1k行80列</vxe-button>
      <vxe-button @click="loadDataAndColumns(5000, 100)">5k行100列</vxe-button>
      <vxe-button @click="loadDataAndColumns(10000, 150)">1w行150列</vxe-button>
      <vxe-button @click="loadDataAndColumns(30000, 200)">3w行200列</vxe-button>
      <vxe-button @click="loadDataAndColumns(50000, 20)">5w行20列</vxe-button>
      <vxe-button @click="loadDataAndColumns(100000, 20)">10w行20列</vxe-button>
      <vxe-button @click="loadDataAndColumns(300000, 20)">30w行20列</vxe-button>
      <vxe-button @click="loadDataAndColumns(500000, 20)">50w行20列</vxe-button>
      <vxe-button @click="loadDataAndColumns(1000000, 20)">100w行20列</vxe-button>
    </p>
    <p>
      <vxe-button @click="loadDataAndColumns(5, 10)">50行100列</vxe-button>
      <vxe-button @click="loadDataAndColumns(80, 1000)">80行1k列</vxe-button>
      <vxe-button @click="loadDataAndColumns(100, 5000)">100行5k列</vxe-button>
      <vxe-button @click="loadDataAndColumns(150, 10000)">200行1w列</vxe-button>
      <vxe-button @click="loadDataAndColumns(200, 30000)">200行3w列</vxe-button>
      <vxe-button @click="loadDataAndColumns(20, 50000)">20行5w列</vxe-button>
      <vxe-button @click="loadDataAndColumns(20, 100000)">20行10w列</vxe-button>
      <vxe-button @click="loadDataAndColumns(20, 200000)">20行20w列</vxe-button>
      <vxe-button @click="loadDataAndColumns(20, 500000)">20行50w列</vxe-button>
      <vxe-button @click="loadDataAndColumns(20, 1000000)">20行100w列</vxe-button>
    </p>
    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { VxeGridInstance, VxeGridProps, VxeGridPropTypes } from '../../../types'
import { VxeUI } from '../../../packages'

interface RowVO {
  id: number
  [key: string]: string | number
}

export default Vue.extend({
  data () {
    const gridOptions: VxeGridProps<RowVO> = {
      border: true,
      showOverflow: true,
      height: 800,
      loading: false,
      scrollY: {
        enabled: true,
        gt: 0
      },
      columns: [
        { type: 'checkbox', width: 60 },
        { type: 'seq', title: '序号', width: 100 },
        { field: 'name', title: 'Name', minWidth: 180 },
        { field: 'role', title: 'Role', width: 200 },
        { field: 'num', title: 'Num', width: 200 },
        { field: 'address', title: 'Address', width: 200 }
      ],
      data: []
    }

    return {
      gridOptions
    }
  },
  methods: {
    loadDataAndColumns (rowSize: number, colSize: number) {
      this.gridOptions.loading = true
      setTimeout(() => {
        const $grid = this.$refs.gridRef as VxeGridInstance<RowVO>
        const colList: VxeGridPropTypes.Columns = []
        for (let i = 0; i < colSize; i++) {
          colList.push({
            field: `col${i}`,
            title: `标题${i}`,
            width: 160
          })
        }
        const dataList: RowVO[] = []
        for (let i = 0; i < rowSize; i++) {
          const item: RowVO = {
            id: 10000 + i
          }
          for (let j = 0; j < Math.min(100, colList.length); j++) {
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
    this.loadDataAndColumns(50, 50)
  }
})
</script>

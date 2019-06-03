<template>
  <div>
    <p>可视渲染，加载 10 万行 1 万列，左右固定列，表尾合计</p>
    <p><grid-api-link name="vxe-grid"/> 的性能比 <table-api-link name="vxe-table"/> 快 n 倍，因为不需要为每个 <table-column-api-link name="vxe-table-column"/>  创建实例，列越多越能体现出来</p>
    <p>大数据不建议使用双向绑定的 <table-api-link name="data"/> 属性（vue 监听会大数据会短暂的卡顿），建议使用 <table-api-link prop="loadData"/>/<table-api-link prop="reloadData"/> 函数</p>
    <p>对于多选 type=<table-column-api-link prop="selection"/> 当数据量海量时应该绑定 <table-api-link prop="checkProp"/> 属性渲染速度可以提升n倍以上</p>
    <p>数据超大情况下必须使用：<table-api-link prop="show-all-overflow"/>，<table-api-link prop="show-header-all-overflow"/> 参数以及调整好 <table-api-link prop="optimization"/> ：{<table-api-link prop="scrollX"/>,<table-api-link prop="scrollY"/>} 适合的参数可以更加流畅</p>

    <vxe-grid
      ref="xTable"
      border
      resizable
      show-footer
      show-all-overflow
      show-header-all-overflow
      height="600"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :loading="loading"
      :columns="tableColumn"
      :select-config="{checkProp: 'checked'}"
      :optimization ="{scrollX: {gt: 20, oSize: 4, rSize: 8}, scrollY: {gt: 500, oSize: 20, rSize: 60}}">
    </vxe-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableColumn: [],
      footerData: []
    }
  },
  created () {
    this.loading = true
    this.$nextTick(() => {
      this.$refs.xTable.reloadData([])
      setTimeout(() => {
        if (this.$refs.xTable) {
          this.tableData = window.MOCK_DATA_LIST.slice(0, 100000)
          this.tableColumn = window.MOCK_COLUMN_LIST.slice(0, 10000)
          this.$refs.xTable.reloadData(this.tableData)
          // 此为演示用，由于数据太过庞大，前端计算耗时太久
          this.footerData = [
            Array.from(new Array(10000)).map(item => '-'),
            Array.from(new Array(10000)).map(item => '-')
          ]
        }
        this.loading = false
      }, 300)
    })
  },
  methods: {
    footerCellClassName ({ rowIndex, column, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return 'col-blue'
        } else {
          return 'col-red'
        }
      }
    },
    footerMethod ({ columns, data }) {
      return this.footerData
    }
  }
}
</script>

<template>
  <div>
    <p class="tip">
      通过表尾来实现合计功能，设置 <table-api-link prop="show-footer"/> show-footer 和 <table-api-link prop="footer-method"/> 设置表尾数据，结果返回一个二维数组<br>
      需要注意的是表尾的调用并非实时的，而是在 data 初始化时才会触发执行；如果要达到实时调用请手动调用 <table-api-link prop="updateFooter"/> 方法<br>
      <span class="red">（注：<table-api-link prop="footer-method"/> 表尾的数据都是自行生成的，该示例仅供参考）</span>
    </p>

    <vxe-table
      class="mytable-footer"
      border
      highlight-hover-row
      show-footer
      max-height="400"
      :footer-method="footerMethod"
      :data="tableData1">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">还可以配合 <table-api-link prop="footer-cell-class-name"/> 自定义不同列颜色</p>

    <vxe-table
      class="mytable-footer"
      border
      show-footer
      height="400"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">还可以固定列</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="showHeader = !showHeader">显示/隐藏表头</vxe-button>
        <vxe-button @click="showFooter = !showFooter">显示/隐藏表尾</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      class="mytable-footer"
      border
      height="400"
      show-overflow
      :show-header="showHeader"
      :show-footer="showFooter"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :data="tableData">
      <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column title="基本信息">
        <vxe-table-column field="name" title="Name" min-width="600" sortable></vxe-table-column>
        <vxe-table-column field="age" title="Age" min-width="600"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="date" title="Date" min-width="600"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" width="200" fixed="right"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      showHeader: true,
      showFooter: true,
      tableData1: [],
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          class="mytable-footer"
          border
          highlight-hover-row
          show-footer
          max-height="400"
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
          },
          methods: {
            footerMethod ({ columns, data }) {
              const means = []
              const sums = []
              const others = []
              columns.forEach((column, columnIndex) => {
                if (columnIndex === 0) {
                  means.push('平均')
                  sums.push('和值')
                  others.push('其他')
                } else {
                  let meanCell = null
                  let sumCell = null
                  let otherCell = '-'
                  switch (column.property) {
                    case 'age':
                    case 'rate':
                      meanCell = parseInt(XEUtils.mean(data, column.property))
                      sumCell = XEUtils.sum(data, column.property)
                      break
                    case 'sex':
                      otherCell = '无'
                      break
                  }
                  means.push(meanCell)
                  sums.push(sumCell)
                  others.push(otherCell)
                }
              })
              // 返回一个二维数组的表尾合计
              return [ means, sums, others ]
            }
          }
        }
        `,
        `
        <vxe-table
          class="mytable-footer"
          border
          show-footer
          height="400"
          :footer-method="footerMethod"
          :footer-cell-class-name="footerCellClassName"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            footerCellClassName ({ $rowIndex, column, columnIndex }) {
              if (columnIndex === 0) {
                if ($rowIndex === 0) {
                  return 'col-blue'
                } else {
                  return 'col-red'
                }
              }
            },
            footerMethod ({ columns, data }) {
              const means = []
              const sums = []
              const others = []
              columns.forEach((column, columnIndex) => {
                if (columnIndex === 0) {
                  means.push('平均')
                  sums.push('和值')
                  others.push('其他')
                } else {
                  let meanCell = null
                  let sumCell = null
                  let otherCell = '-'
                  switch (column.property) {
                    case 'age':
                    case 'rate':
                      meanCell = parseInt(XEUtils.mean(data, column.property))
                      sumCell = XEUtils.sum(data, column.property)
                      break
                    case 'sex':
                      otherCell = '无'
                      break
                  }
                  means.push(meanCell)
                  sums.push(sumCell)
                  others.push(otherCell)
                }
              })
              // 返回一个二维数组的表尾合计
              return [ means, sums, others ]
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="showHeader = !showHeader">显示/隐藏表头</vxe-button>
            <vxe-button @click="showFooter = !showFooter">显示/隐藏表尾</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          class="mytable-footer"
          border
          height="400"
          show-overflow
          :show-header="showHeader"
          :show-footer="showFooter"
          :footer-method="footerMethod"
          :footer-cell-class-name="footerCellClassName"
          :data="tableData">
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column title="基本信息">
            <vxe-table-column field="name" title="Name" min-width="600" sortable></vxe-table-column>
            <vxe-table-column field="age" title="Age" min-width="600"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column field="date" title="Date" min-width="600"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" width="200" fixed="right"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              showFooter: true,
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            footerCellClassName ({ $rowIndex, columnIndex }) {
              if (columnIndex === 0) {
                if ($rowIndex === 0) {
                  return 'col-blue'
                } else {
                  return 'col-red'
                }
              }
            },
            footerMethod ({ columns, data }) {
              const means = []
              const sums = []
              const others = []
              columns.forEach((column, columnIndex) => {
                if (columnIndex === 0) {
                  means.push('平均')
                  sums.push('和值')
                  others.push('其他')
                } else {
                  let meanCell = null
                  let sumCell = null
                  let otherCell = '-'
                  switch (column.property) {
                    case 'age':
                    case 'rate':
                      meanCell = parseInt(XEUtils.mean(data, column.property))
                      sumCell = XEUtils.sum(data, column.property)
                      break
                    case 'sex':
                      otherCell = '无'
                      break
                  }
                  means.push(meanCell)
                  sums.push(sumCell)
                  others.push(otherCell)
                }
              })
              // 返回一个二维数组的表尾合计
              return [means, sums, others]
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData1 = window.MOCK_DATA_LIST.slice(0, 3)
    this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    footerCellClassName ({ $rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if ($rowIndex === 0) {
          return 'col-blue'
        } else {
          return 'col-red'
        }
      }
    },
    footerMethod ({ columns, data }) {
      const means = []
      const sums = []
      const others = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push('平均')
          sums.push('和值')
          others.push('其他')
        } else {
          let meanCell = null
          let sumCell = null
          let otherCell = '-'
          switch (column.property) {
            case 'age':
            case 'rate':
              meanCell = parseInt(XEUtils.mean(data, column.property))
              sumCell = XEUtils.sum(data, column.property)
              break
            case 'sex':
              otherCell = '无'
              break
          }
          means.push(meanCell)
          sums.push(sumCell)
          others.push(otherCell)
        }
      })
      // 返回一个二维数组的表尾合计
      return [means, sums, others]
    }
  }
}
</script>

<style>
.mytable-footer .vxe-footer--column.col-blue {
  background-color: #2db7f5;
  color: #fff;
}
.mytable-footer .vxe-footer--column.col-red {
  background-color: red;
  color: #fff;
}
</style>

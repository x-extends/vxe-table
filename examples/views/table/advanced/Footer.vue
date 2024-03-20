<template>
  <div>
    <p class="tip">
      通过表尾来实现合计功能，设置 <table-api-link prop="show-footer"/> show-footer 和 <table-api-link prop="footer-method"/> 设置表尾数据，结果返回一个二维数组<br>
      需要注意的是表尾的调用并非实时的，而是在 data 初始化时才会触发执行；如果要达到实时调用请手动调用 <table-api-link prop="updateFooter"/> 方法<br>
      <span class="red">（注：<table-api-link prop="footer-method"/> 表尾的数据都是自行生成的，该示例仅供参考）</span>
    </p>

    <vxe-table
      border
      highlight-hover-row
      show-footer
      class="mytable-footer"
      max-height="400"
      :footer-data="demo1.footerData1"
      :data="demo1.tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="amount" title="Amount"></vxe-column>
    </vxe-table>

    <p class="tip">还可以配合 <table-api-link prop="footer-cell-class-name"/> 自定义不同列颜色</p>

    <vxe-table
      border
      show-footer
      class="mytable-footer"
      max-height="400"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName2"
      :data="demo2.tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="amount" title="Amount"></vxe-column>
    </vxe-table>

    <p class="tip">还可以固定列</p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="demo3.showHeader = !demo3.showHeader">显示/隐藏表头</vxe-button>
        <vxe-button @click="demo3.showFooter = !demo3.showFooter">显示/隐藏表尾</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      class="mytable-footer"
      height="400"
      :show-header="demo3.showHeader"
      :show-footer="demo3.showFooter"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName3"
      :data="demo3.tableData">
      <vxe-column type="seq" width="60" fixed="left"></vxe-column>
      <vxe-colgroup title="基本信息">
        <vxe-column field="name" title="Name" min-width="600" sortable></vxe-column>
        <vxe-column field="age" title="Age" min-width="600"></vxe-column>
      </vxe-colgroup>
      <vxe-column field="date" title="Date" min-width="600"></vxe-column>
      <vxe-column field="amount" title="Amount" width="200" fixed="right"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'test abc' }
      ],
      footerData1: [
        { name: '1', role: 3 }
      ]
    })

    const demo2 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, amount: 999, address: 'test abc' }
      ]
    })

    const footerCellClassName2: VxeTablePropTypes.FooterCellClassName = ({ $rowIndex, columnIndex }) => {
      if (columnIndex === 0) {
        if ($rowIndex === 0) {
          return 'col-blue'
        } else {
          return 'col-red'
        }
      }
    }

    const demo3 = reactive({
      showHeader: true,
      showFooter: true,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, amount: 999, address: 'test abc' }
      ]
    })

    const footerCellClassName3: VxeTablePropTypes.FooterCellClassName = ({ $rowIndex, column }) => {
      if (column.type === 'seq') {
        if ($rowIndex === 0) {
          return 'col-blue'
        } else {
          return 'col-red'
        }
      } else if (column.property === 'age') {
        if ($rowIndex === 1) {
          return 'col-red'
        }
      }
    }

    const meanNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    }

    const sumNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    }

    const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
      const means: any[] = []
      const sums: any[] = []
      const others: any[] = []
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
            case 'amount':
              meanCell = meanNum(data, column.property)
              sumCell = sumNum(data, column.property)
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

    return {
      demo1,
      demo2,
      footerCellClassName2,
      demo3,
      footerCellClassName3,
      footerMethod
    }
  }
})
</script>

<style scoped>
.mytable-footer:deep() .col-blue {
  background-color: #2db7f5;
  color: #fff;
}
.mytable-footer:deep() .col-red {
  background-color: red;
  color: #fff;
}
</style>

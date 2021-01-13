<template>
  <div>
    <p class="tip">
      通过表尾来实现合计功能，数据发生变化时实时统计，对于某些场景下如果需要频繁计算的可以手动调用 <table-api-link prop="updateFooter"/> 函数<br>
      如果是内置的渲染器，可以设置 <table-column-api-link prop="immediate"/> 属性和相关事件去实时更新<br>
      <span class="red">（注：实时更新是非常糟糕的做法，运算量越大卡顿就越久，非特殊场景不建议使用）</span>
    </p>

    <vxe-toolbar export>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="removeEvent">删除</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-footer
      show-overflow
      highlight-hover-row
      ref="xTable"
      height="400"
      class="editable-footer"
      :export-config="{}"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="统计信息">
        <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true}"></vxe-table-column>
        <vxe-table-column field="age" title="Age" :edit-render="{name: '$input', immediate: true, props: {type: 'number', min: 1, max: 120}, events: {change: updateFooterEvent}}"></vxe-table-column>
        <vxe-table-column field="num1" title="Num" :edit-render="{name: 'input', immediate: true, events: {input: updateFooterEvent}}"></vxe-table-column>
        <vxe-table-column field="rate" title="Rate" :edit-render="{name: 'input', immediate: true, events: {input: updateFooterEvent}}"></vxe-table-column>
      </vxe-table-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, rate: 22 },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 23, age: 22, rate: 34 },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, rate: 18 },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, rate: 13 },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, rate: 6 },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, rate: 33 },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, rate: 4 },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, rate: 55 }
      ],
      demoCodes: [
        `
        <vxe-toolbar export>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="removeEvent">删除</vxe-button>
            <vxe-button @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-footer
          show-overflow
          highlight-hover-row
          ref="xTable"
          height="400"
          class="editable-footer"
          :export-config="{}"
          :footer-method="footerMethod"
          :footer-cell-class-name="footerCellClassName"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="统计信息">
            <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true}"></vxe-table-column>
            <vxe-table-column field="age" title="Age" :edit-render="{name: '$input', immediate: true, props: {type: 'number', min: 1, max: 120}, events: {change: updateFooterEvent}}"></vxe-table-column>
            <vxe-table-column field="num1" title="Num" :edit-render="{name: 'input', immediate: true, events: {input: updateFooterEvent}}"></vxe-table-column>
            <vxe-table-column field="rate" title="Rate" :edit-render="{name: 'input', immediate: true, events: {input: updateFooterEvent}}"></vxe-table-column>
          </vxe-table-colgroup>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, rate: 22 },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 23, age: 22, rate: 34 },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, rate: 18 },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, rate: 13 },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, rate: 6 },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, rate: 33 },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, rate: 4 },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, rate: 55 }
              ]
            }
          },
          methods: {
            footerCellClassName ({ $rowIndex, columnIndex }) {
              if (columnIndex === 1) {
                if ($rowIndex === 0) {
                  return 'col-blue'
                }
              }
              if (columnIndex === 2) {
                if ($rowIndex === 1) {
                  return 'col-red'
                }
              }
            },
            // 在值发生改变时更新表尾合计
            updateFooterEvent (params) {
              let xTable = this.$refs.xTable
              xTable.updateFooter()
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age'].includes(column.property)) {
                    return XEUtils.toInteger(XEUtils.mean(data, column.property))
                  } else if (['rate', 'num1'].includes(column.property)) {
                    return XEUtils.mean(data, column.property)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['rate', 'num1'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return null
                })
              ]
            },
            insertEvent () {
              let record = {
                name: 'New name'
              }
              this.$refs.xTable.insert(record)
                .then(({ row }) => this.$refs.xTable.setActiveCell(row, 'age'))
            },
            removeEvent () {
              this.$refs.xTable.removeCheckboxRow()
            },
            saveEvent () {
              const { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getRecordset()
              this.$XModal.alert(\`insertRecords=\${insertRecords.length} removeRecords=\${removeRecords.length} updateRecords=\${updateRecords.length}\`)
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    footerCellClassName ({ $rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if ($rowIndex === 0) {
          return 'col-blue'
        }
      }
      if (columnIndex === 2) {
        if ($rowIndex === 1) {
          return 'col-red'
        }
      }
    },
    // 在值发生改变时更新表尾合计
    updateFooterEvent () {
      const xTable = this.$refs.xTable
      xTable.updateFooter()
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age'].includes(column.property)) {
            return XEUtils.toInteger(XEUtils.mean(data, column.property))
          } else if (['rate', 'num1'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['rate', 'num1'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        })
      ]
    },
    insertEvent () {
      const record = {
        name: 'New name'
      }
      this.$refs.xTable.insert(record)
        .then(({ row }) => this.$refs.xTable.setActiveCell(row, 'age'))
    },
    removeEvent () {
      this.$refs.xTable.removeCheckboxRow()
    },
    saveEvent () {
      const { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getRecordset()
      this.$XModal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
    }
  }
}
</script>

<style>
.editable-footer .vxe-footer--column.col-blue {
  background-color: #2db7f5;
  color: #fff;
}
.editable-footer .vxe-footer--column.col-red {
  background-color: red;
  color: #fff;
}
</style>

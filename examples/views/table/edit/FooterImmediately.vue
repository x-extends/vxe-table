<template>
  <div>
    <p class="tip">
      通过表尾来实现合计功能，数据发生变化时实时统计，对于某些场景下如果需要频繁计算的可以手动调用 <table-api-link prop="updateFooter"/> 函数<br>
      如果是内置的渲染器，可以设置 <table-column-api-link prop="immediate"/> 属性和相关事件去实时更新<br>
      <span class="red">（注：<table-api-link prop="footer-method"/> 表尾的数据都是自行生成的，该示例仅供参考）</span>
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
      export-config
      ref="xTable"
      height="400"
      class="editable-footer"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column title="统计信息">
        <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true}"></vxe-table-column>
        <vxe-table-column field="age1" title="Age" :edit-render="{name: '$input', props: {type: 'number', min: 1, max: 120}, events: {input: updateFooterEvent}}"></vxe-table-column>
        <vxe-table-column field="num6" title="Num" :edit-render="{name: 'input', immediate: true, events: {input: updateFooterEvent}}"></vxe-table-column>
        <vxe-table-column field="rate1" title="Rate" :edit-render="{name: 'input', immediate: true, events: {input: updateFooterEvent}}"></vxe-table-column>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
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
          export-config
          ref="xTable"
          height="400"
          class="editable-footer"
          :footer-method="footerMethod"
          :footer-cell-class-name="footerCellClassName"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column title="统计信息">
            <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true}"></vxe-table-column>
            <vxe-table-column field="age1" title="Age" :edit-render="{name: '$input', props: {type: 'number', min: 1, max: 120}, events: {input: updateFooterEvent}}"></vxe-table-column>
            <vxe-table-column field="num6" title="Num" :edit-render="{name: 'input', immediate: true, events: {input: updateFooterEvent}}"></vxe-table-column>
            <vxe-table-column field="rate1" title="Rate" :edit-render="{name: 'input', immediate: true, events: {input: updateFooterEvent}}"></vxe-table-column>
          </vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
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
                  if (['age1', 'rate1', 'num6'].includes(column.property)) {
                    return XEUtils.mean(data, column.property)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['rate1', 'num6'].includes(column.property)) {
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
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
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
          if (['age1', 'rate1', 'num6'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['rate1', 'num6'].includes(column.property)) {
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

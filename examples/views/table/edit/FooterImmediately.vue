<template>
  <div>
    <p class="tip">统计编辑列的表尾合计，数据发生变化时实时统计</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
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
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age1" title="Age" :edit-render="{name: 'input', events: {input: updateFooterEvent}}"></vxe-table-column>
      <vxe-table-column field="num6" title="Num" :edit-render="{name: 'input', events: {input: updateFooterEvent}}"></vxe-table-column>
      <vxe-table-column field="rate1" title="Rate" :edit-render="{name: 'input', events: {input: updateFooterEvent}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
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
          :footer-method="footerMethod"
          :footer-cell-class-name="footerCellClassName"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age1" title="Age" :edit-render="{name: 'input', events: {input: updateFooterEvent}}"></vxe-table-column>
          <vxe-table-column field="num6" title="Num" :edit-render="{name: 'input', events: {input: updateFooterEvent}}"></vxe-table-column>
          <vxe-table-column field="rate1" title="Rate" :edit-render="{name: 'input', events: {input: updateFooterEvent}}"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
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
                    return this.$utils.mean(data, column.property)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['rate1', 'num6'].includes(column.property)) {
                    return this.$utils.sum(data, column.property)
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
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 20)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
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
            return this.$utils.mean(data, column.property)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['rate1', 'num6'].includes(column.property)) {
            return this.$utils.sum(data, column.property)
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
    getInsertEvent () {
      let insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
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

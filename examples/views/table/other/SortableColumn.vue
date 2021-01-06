<template>
  <div>
    <p class="tip">
      表格不支持拖动功能；例如 <table-api-link name="vxe-table"/> 简单示例： <a class="link" href="https://www.npmjs.com/package/sortablejs" target="_blank">sortablejs</a> 等库实现列移动<br>
      由于直接操作了 Dom 节点，需要与 Vue 的数据同步，必须设置 <table-api-link prop="column-key"/>，并且自行根据 vue 的规则自行实现数据同步<br>
      <span class="red">（注：该示例仅供参考，具体请自行实现）</span>
    </p>

    <vxe-table
      border
      column-key
      ref="xTable1"
      class="sortable-column-demo"
      :scroll-x="{enabled: false}"
      :data="tableData">
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="150"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="250"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>

    <p class="tip">
      例如 <table-api-link name="vxe-grid"/> 简单示例：<br>
      <span class="red">（注：该示例仅供参考，具体请自行实现）</span>
    </p>

    <vxe-grid
      border
      column-key
      show-footer
      ref="xTable2"
      class="sortable-column-demo"
      :scroll-x="{enabled: false}"
      :footer-method="footerMethod"
      :toolbar-config="tableToolbar"
      :columns="tableColumn"
      :data="tableData"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[3] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[4] }}</pre-code>
      <pre-code class="css">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import Sortable from 'sortablejs'

export default {
  data () {
    return {
      tableColumn: [
        { field: 'name', title: 'Name', fixed: 'left', minWidth: 200 },
        { field: 'role', title: 'Role', minWidth: 220 },
        { field: 'sex', title: 'Sex', minWidth: 100 },
        { field: 'age', title: 'Age', minWidth: 150 },
        { field: 'date3', title: 'Date', minWidth: 200 },
        { field: 'address', title: 'Address', minWidth: 200, showOverflow: true }
      ],
      tableToolbar: {
        custom: true
      },
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          column-key
          ref="xTable1"
          class="sortable-column-demo"
          :scroll-x="{enabled: false}"
          :data="tableData">
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="150"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="250"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          },
          created () {
            this.columnDrop1()
          },
          beforeDestroy () {
            if (this.sortable1) {
              this.sortable1.destroy()
            }
          },
          methods: {
            columnDrop1 () {
              this.$nextTick(() => {
                const xTable = this.$refs.xTable1
                this.sortable1 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
                  handle: '.vxe-header--column:not(.col--fixed)',
                  onEnd: ({ item, newIndex, oldIndex }) => {
                    const { fullColumn, tableColumn } = xTable.getTableColumn()
                    const targetThElem = item
                    const wrapperElem = targetThElem.parentNode
                    const newColumn = fullColumn[newIndex]
                    if (newColumn.fixed) {
                      // 错误的移动
                      if (newIndex > oldIndex) {
                        wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
                      } else {
                        wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
                      }
                      return this.$XModal.message({ message: '固定列不允许拖动！', status: 'error' })
                    }
                    // 转换真实索引
                    const oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
                    const newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
                    // 移动到目标列
                    const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
                    fullColumn.splice(newColumnIndex, 0, currRow)
                    xTable.loadColumn(fullColumn)
                  }
                })
              })
            }
          }
        }
        `,
        `
        .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
        .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
          background-color: #dfecfb;
        }
        `,
        `
        <vxe-grid
          border
          column-key
          show-footer
          ref="xTable2"
          class="sortable-column-demo"
          :scroll-x="{enabled: false}"
          :footer-method="footerMethod"
          :toolbar-config="tableToolbar"
          :columns="tableColumn"
          :data="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { field: 'name', title: 'Name', fixed: 'left', minWidth: 200 },
                { field: 'role', title: 'Role', minWidth: 220 },
                { field: 'sex', title: 'Sex', minWidth: 100 },
                { field: 'age', title: 'Age', minWidth: 150 },
                { field: 'date3', title: 'Date', minWidth: 200 },
                { field: 'address', title: 'Address', minWidth: 200, showOverflow: true }
              ],
              tableToolbar: {
                custom: true
              },
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          },
          created () {
            this.columnDrop2()
          },
          beforeDestroy () {
            if (this.sortable2) {
              this.sortable2.destroy()
            }
          },
          methods: {
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'sex'].includes(column.property)) {
                    return XEUtils.mean(data, column.property)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'sex'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return null
                })
              ]
            },
            columnDrop2 () {
              this.$nextTick(() => {
                const xTable = this.$refs.xTable2
                this.sortable2 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
                  handle: '.vxe-header--column:not(.col--fixed)',
                  onEnd: ({ item, newIndex, oldIndex }) => {
                    const { fullColumn, tableColumn } = xTable.getTableColumn()
                    const targetThElem = item
                    const wrapperElem = targetThElem.parentNode
                    const newColumn = fullColumn[newIndex]
                    if (newColumn.fixed) {
                      // 错误的移动
                      if (newIndex > oldIndex) {
                        wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
                      } else {
                        wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
                      }
                      return this.$XModal.message({ message: '固定列不允许拖动！', status: 'error' })
                    }
                    // 转换真实索引
                    const oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
                    const newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
                    // 移动到目标列
                    const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
                    fullColumn.splice(newColumnIndex, 0, currRow)
                    xTable.loadColumn(fullColumn)
                  }
                })
              })
            }
          }
        }
        `,
        `
        .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
        .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
          background-color: #dfecfb;
        }
        .sortable-column-demo .vxe-header--row .vxe-header--column.col--fixed {
          cursor: no-drop;
        }
        `
      ]
    }
  },
  created () {
    this.columnDrop1()
    this.columnDrop2()
  },
  beforeDestroy () {
    if (this.sortable1) {
      this.sortable1.destroy()
    }
    if (this.sortable2) {
      this.sortable2.destroy()
    }
  },
  methods: {
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'sex'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'sex'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        })
      ]
    },
    columnDrop1 () {
      this.$nextTick(() => {
        const xTable = this.$refs.xTable1
        this.sortable1 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
          handle: '.vxe-header--column:not(.col--fixed)',
          onEnd: ({ item, newIndex, oldIndex }) => {
            const { fullColumn, tableColumn } = xTable.getTableColumn()
            const targetThElem = item
            const wrapperElem = targetThElem.parentNode
            const newColumn = fullColumn[newIndex]
            if (newColumn.fixed) {
              // 错误的移动
              if (newIndex > oldIndex) {
                wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
              } else {
                wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
              }
              return this.$XModal.message({ message: '固定列不允许拖动！', status: 'error' })
            }
            // 转换真实索引
            const oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
            const newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
            // 移动到目标列
            const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
            fullColumn.splice(newColumnIndex, 0, currRow)
            xTable.loadColumn(fullColumn)
          }
        })
      })
    },
    columnDrop2 () {
      this.$nextTick(() => {
        const xTable = this.$refs.xTable2
        this.sortable2 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
          handle: '.vxe-header--column:not(.col--fixed)',
          onEnd: ({ item, newIndex, oldIndex }) => {
            const { fullColumn, tableColumn } = xTable.getTableColumn()
            const targetThElem = item
            const wrapperElem = targetThElem.parentNode
            const newColumn = fullColumn[newIndex]
            if (newColumn.fixed) {
              // 错误的移动
              if (newIndex > oldIndex) {
                wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
              } else {
                wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
              }
              return this.$XModal.message({ message: '固定列不允许拖动！', status: 'error' })
            }
            // 转换真实索引
            const oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex])
            const newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex])
            // 移动到目标列
            const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
            fullColumn.splice(newColumnIndex, 0, currRow)
            xTable.loadColumn(fullColumn)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
  background-color: #dfecfb;
}
.sortable-column-demo .vxe-header--row .vxe-header--column.col--fixed {
  cursor: no-drop;
}
</style>

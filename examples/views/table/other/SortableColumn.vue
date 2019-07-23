<template>
  <div>
    <p><table-api-link name="vxe-table"/> 方式：使用 <a class="link" href="https://www.npmjs.com/package/sortablejs" target="_blank">sortablejs</a> 实现列移动</p>
    <p class="red">由于操作了 Dom 节点，请根据需要指定唯一的 <table-column-api-link prop="column-key"/></p>

    <vxe-table
      border
      ref="xTable1"
      class="sortable-column-demo"
      :data.sync="tableData">
      <vxe-table-column field="name" title="Name" column-key="name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" column-key="sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age" column-key="age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" column-key="address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>

    <p><grid-api-link name="vxe-grid"/> 方式，更加简单的配置式调用</p>

    <vxe-grid
      border
      ref="xTable2"
      class="sortable-column-demo"
      :columns="tableColumn"
      :data.sync="tableData"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
      <code class="css">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import Sortable from 'sortablejs'

export default {
  data () {
    return {
      tableColumn: [
        { field: 'name', title: 'Name', fixed: 'left', columnKey: 'name', width: 200 },
        { field: 'role', title: 'Role', columnKey: 'role', width: 220 },
        { field: 'sex', title: 'Sex', columnKey: 'sex', width: 220 },
        { field: 'age', title: 'Age', columnKey: 'age', width: 220 },
        { field: 'date3', title: 'Date', columnKey: 'date3', width: 220 },
        { field: 'address', title: 'Address', columnKey: 'address', width: 300, showOverflow: true }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          ref="xTable"
          class="sortable-column-demo"
          :data.sync="tableData">
          <vxe-table-column field="name" title="Name" column-key="name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" column-key="sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age" column-key="age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" column-key="address" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          beforeDestroy () {
            if (this.sortable) {
              this.sortable.destroy()
            }
          },
          methods: {
            columnDrop () {
              this.$nextTick(() => {
                let xTable = this.$refs.xTable
                this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
                  handle: '.vxe-header--column:not(.col--fixed)',
                  onEnd: ({ newIndex, oldIndex }) => {
                    let { tableColumn } = xTable.getTableColumn()
                    let targetThElem = item
                    let wrapperElem = targetThElem.parentNode
                    let newColumn = tableColumn[newIndex]
                    if (newColumn.fixed) {
                      // 错误的移动
                      if (newIndex > oldIndex) {
                        wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
                      } else {
                        wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
                      }
                      return this.$XMsg.message({ message: '固定列不允许拖动！', status: 'error' })
                    }
                    // 移动到目标列
                    let currRow = tableColumn.splice(oldIndex, 1)[0]
                    tableColumn.splice(newIndex, 0, currRow)
                    xTable.loadColumn(tableColumn)
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
          ref="xTable"
          class="sortable-column-demo"
          :columns="tableColumn"
          :data.sync="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { field: 'name', title: 'Name', fixed: 'left', columnKey: 'name', width: 200 },
                { field: 'role', title: 'Role', columnKey: 'role', width: 220 },
                { field: 'sex', title: 'Sex', columnKey: 'sex', width: 220 },
                { field: 'age', title: 'Age', columnKey: 'age', width: 220 },
                { field: 'date3', title: 'Date', columnKey: 'date3', width: 220 },
                { field: 'address', title: 'Address', columnKey: 'address', width: 300, showOverflow: true }
              ],
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          beforeDestroy () {
            if (this.sortable) {
              this.sortable.destroy()
            }
          },
          methods: {
            columnDrop () {
              this.$nextTick(() => {
                let xTable = this.$refs.xTable
                this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
                  handle: '.vxe-header--column:not(.col--fixed)',
                  onEnd: ({ newIndex, oldIndex }) => {
                    let { tableColumn } = xTable.getTableColumn()
                    let targetThElem = item
                    let wrapperElem = targetThElem.parentNode
                    let newColumn = tableColumn[newIndex]
                    if (newColumn.fixed) {
                      // 错误的移动
                      if (newIndex > oldIndex) {
                        wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
                      } else {
                        wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
                      }
                      return this.$XMsg.message({ message: '固定列不允许拖动！', status: 'error' })
                    }
                    // 移动到目标列
                    let currRow = this.tableColumn.splice(oldIndex, 1)[0]
                    this.tableColumn.splice(newIndex, 0, currRow)
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
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
    this.columnDrop1()
    this.columnDrop2()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
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
    columnDrop1 () {
      this.$nextTick(() => {
        let xTable = this.$refs.xTable1
        this.sortable1 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
          handle: '.vxe-header--column:not(.col--fixed)',
          onEnd: ({ item, newIndex, oldIndex }) => {
            let { tableColumn } = xTable.getTableColumn()
            let targetThElem = item
            let wrapperElem = targetThElem.parentNode
            let newColumn = tableColumn[newIndex]
            if (newColumn.fixed) {
              // 错误的移动
              if (newIndex > oldIndex) {
                wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
              } else {
                wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
              }
              return this.$XMsg.message({ message: '固定列不允许拖动！', status: 'error' })
            }
            // 移动到目标列
            let currRow = tableColumn.splice(oldIndex, 1)[0]
            tableColumn.splice(newIndex, 0, currRow)
            xTable.loadColumn(tableColumn)
          }
        })
      })
    },
    columnDrop2 () {
      this.$nextTick(() => {
        let xTable = this.$refs.xTable2
        this.sortable2 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
          handle: '.vxe-header--column:not(.col--fixed)',
          onEnd: ({ item, newIndex, oldIndex }) => {
            let { tableColumn } = xTable.getTableColumn()
            let targetThElem = item
            let wrapperElem = targetThElem.parentNode
            let newColumn = tableColumn[newIndex]
            if (newColumn.fixed) {
              // 错误的移动
              if (newIndex > oldIndex) {
                wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
              } else {
                wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
              }
              return this.$XMsg.message({ message: '固定列不允许拖动！', status: 'error' })
            }
            // 移动到目标列
            let currRow = this.tableColumn.splice(oldIndex, 1)[0]
            this.tableColumn.splice(newIndex, 0, currRow)
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
</style>

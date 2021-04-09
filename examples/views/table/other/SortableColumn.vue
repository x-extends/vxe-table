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
      :data="demo1.tableData">
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="150"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="250"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>

    <p class="tip">
      例如 <table-api-link name="vxe-grid"/> 简单示例：<br>
      <span class="red">（注：该示例仅供参考，具体请自行实现）</span>
    </p>

    <vxe-grid ref="xGrid2" v-bind="gridOptions2"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[3] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[4] }}</pre-code>
      <pre-code class="css">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onUnmounted, nextTick } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeGridInstance, VxeGridProps, VxeTableInstance } from '../../../../types/index'
import Sortable from 'sortablejs'

export default defineComponent({
  setup () {
    const xTable1 = ref({} as VxeTableInstance)

    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ]
    })

    let sortable1: any

    const columnDrop1 = () => {
      const $table = xTable1.value
      sortable1 = Sortable.create($table.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row') as HTMLElement, {
        handle: '.vxe-header--column:not(.col--fixed)',
        onEnd: (sortableEvent) => {
          const targetThElem = sortableEvent.item
          const newIndex = sortableEvent.newIndex as number
          const oldIndex = sortableEvent.oldIndex as number
          const { fullColumn, tableColumn } = $table.getTableColumn()
          const wrapperElem = targetThElem.parentNode as HTMLElement
          const newColumn = fullColumn[newIndex]
          if (newColumn.fixed) {
            // 错误的移动
            const oldTrElement = wrapperElem.children[oldIndex] as HTMLElement
            if (newIndex > oldIndex) {
              wrapperElem.insertBefore(targetThElem, oldTrElement)
            } else {
              wrapperElem.insertBefore(oldTrElement, targetThElem)
            }
            return VXETable.modal.message({ content: '固定列不允许拖动！', status: 'error' })
          }
          // 转换真实索引
          const oldColumnIndex = $table.getColumnIndex(tableColumn[oldIndex])
          const newColumnIndex = $table.getColumnIndex(tableColumn[newIndex])
          // 移动到目标列
          const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
          fullColumn.splice(newColumnIndex, 0, currRow)
          $table.loadColumn(fullColumn)
        }
      })
    }

    const xGrid2 = ref({} as VxeGridInstance)

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

    const gridOptions2 = reactive({
      border: true,
      columnKey: true,
      showFooter: true,
      class: 'sortable-column-demo',
      scrollX: {
        enabled: false
      },
      toolbarConfig: {
        custom: true
      },
      columns: [
        { field: 'name', title: 'Name', fixed: 'left', minWidth: 200 },
        { field: 'role', title: 'Role', minWidth: 220 },
        { field: 'sex', title: 'Sex', minWidth: 100 },
        { field: 'age', title: 'Age', minWidth: 150 },
        { field: 'date3', title: 'Date', minWidth: 200 },
        { field: 'address', title: 'Address', minWidth: 200, showOverflow: true }
      ],
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ],
      footerMethod ({ columns, data }) {
        return [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return '平均'
            }
            if (['age', 'sex'].includes(column.property)) {
              return meanNum(data, column.property)
            }
            return null
          }),
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return '和值'
            }
            if (['age', 'sex'].includes(column.property)) {
              return sumNum(data, column.property)
            }
            return null
          })
        ]
      }
    } as VxeGridProps)

    let sortable2: any

    const columnDrop2 = () => {
      const $grid = xGrid2.value
      sortable2 = Sortable.create($grid.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
        handle: '.vxe-header--column:not(.col--fixed)',
        onEnd: (sortableEvent) => {
          const targetThElem = sortableEvent.item
          const newIndex = sortableEvent.newIndex as number
          const oldIndex = sortableEvent.oldIndex as number
          const { fullColumn, tableColumn } = $grid.getTableColumn()
          const wrapperElem = targetThElem.parentNode as HTMLElement
          const newColumn = fullColumn[newIndex]
          if (newColumn.fixed) {
            // 错误的移动
            const oldTrElement = wrapperElem.children[oldIndex] as HTMLElement
            if (newIndex > oldIndex) {
              wrapperElem.insertBefore(targetThElem, oldTrElement)
            } else {
              wrapperElem.insertBefore(oldTrElement, targetThElem)
            }
            return VXETable.modal.message({ content: '固定列不允许拖动！', status: 'error' })
          }
          // 转换真实索引
          const oldColumnIndex = $grid.getColumnIndex(tableColumn[oldIndex])
          const newColumnIndex = $grid.getColumnIndex(tableColumn[newIndex])
          // 移动到目标列
          const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
          fullColumn.splice(newColumnIndex, 0, currRow)
          $grid.loadColumn(fullColumn)
        }
      })
    }

    let initTime: any
    nextTick(() => {
      // 加载完成之后在绑定拖动事件
      initTime = setTimeout(() => {
        columnDrop1()
        columnDrop2()
      }, 500)
    })

    onUnmounted(() => {
      clearTimeout(initTime)
      if (sortable1) {
        sortable1.destroy()
      }
      if (sortable2) {
        sortable2.destroy()
      }
    })

    return {
      xTable1,
      demo1,
      columnDrop1,
      xGrid2,
      gridOptions2,
      columnDrop2,
      demoCodes: [
        `
        <vxe-table
          border
          column-key
          ref="xTable1"
          class="sortable-column-demo"
          :scroll-x="{enabled: false}"
          :data="demo1.tableData">
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="150"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="250"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, onUnmounted, nextTick } from 'vue'
        import { VXETable, VxeGridInstance, VxeGridProps, VxeTableInstance } from 'vxe-table'
        import Sortable from 'sortablejs'

        export default defineComponent({
          setup () {
            const xTable1 = ref({} as VxeTableInstance)

            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            })

            let sortable1: any

            const columnDrop1 = () => {
              const $table = xTable1.value
              sortable1 = Sortable.create($table.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row') as HTMLElement, {
                handle: '.vxe-header--column:not(.col--fixed)',
                onEnd: (sortableEvent) => {
                  const targetThElem = sortableEvent.item
                  const newIndex = sortableEvent.newIndex as number
                  const oldIndex = sortableEvent.oldIndex as number
                  const { fullColumn, tableColumn } = $table.getTableColumn()
                  const wrapperElem = targetThElem.parentNode as HTMLElement
                  const newColumn = fullColumn[newIndex]
                  if (newColumn.fixed) {
                    // 错误的移动
                    const oldTrElement = wrapperElem.children[oldIndex] as HTMLElement
                    if (newIndex > oldIndex) {
                      wrapperElem.insertBefore(targetThElem, oldTrElement)
                    } else {
                      wrapperElem.insertBefore(oldTrElement, targetThElem)
                    }
                    return VXETable.modal.message({ content: '固定列不允许拖动！', status: 'error' })
                  }
                  // 转换真实索引
                  const oldColumnIndex = $table.getColumnIndex(tableColumn[oldIndex])
                  const newColumnIndex = $table.getColumnIndex(tableColumn[newIndex])
                  // 移动到目标列
                  const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
                  fullColumn.splice(newColumnIndex, 0, currRow)
                  $table.loadColumn(fullColumn)
                }
              })
            }

            let initTime: any
            nextTick(() => {
              // 加载完成之后在绑定拖动事件
              initTime = setTimeout(() => {
                columnDrop1()
              }, 500)
            })

            onUnmounted(() => {
              clearTimeout(initTime)
              if (sortable1) {
                sortable1.destroy()
              }
            })

            return {
              xTable1,
              demo1,
              columnDrop1
            }
          }
        })
        `,
        `
        .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
        .sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
          background-color: #dfecfb;
        }
        `,
        `
        <vxe-grid ref="xGrid2" v-bind="gridOptions2"></vxe-grid>
        `,
        `
        import { defineComponent, reactive, ref, onUnmounted, nextTick } from 'vue'
        import { VXETable, VxeGridInstance, VxeGridProps, VxeTableInstance } from 'vxe-table'
        import Sortable from 'sortablejs'

        export default defineComponent({
          setup () {
            const xGrid2 = ref({} as VxeGridInstance)

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

            const gridOptions2 = reactive({
              border: true,
              columnKey: true,
              showFooter: true,
              class: 'sortable-column-demo',
              scrollX: {
                enabled: false
              },
              toolbarConfig: {
                custom: true
              },
              columns: [
                { field: 'name', title: 'Name', fixed: 'left', minWidth: 200 },
                { field: 'role', title: 'Role', minWidth: 220 },
                { field: 'sex', title: 'Sex', minWidth: 100 },
                { field: 'age', title: 'Age', minWidth: 150 },
                { field: 'date3', title: 'Date', minWidth: 200 },
                { field: 'address', title: 'Address', minWidth: 200, showOverflow: true }
              ],
              data: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ],
              footerMethod ({ columns, data }) {
                return [
                  columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                      return '平均'
                    }
                    if (['age', 'sex'].includes(column.property)) {
                      return meanNum(data, column.property)
                    }
                    return null
                  }),
                  columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                      return '和值'
                    }
                    if (['age', 'sex'].includes(column.property)) {
                      return sumNum(data, column.property)
                    }
                    return null
                  })
                ]
              }
            } as VxeGridProps)

            let sortable2: any

            const columnDrop2 = () => {
              const $grid = xGrid2.value
              sortable2 = Sortable.create($grid.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
                handle: '.vxe-header--column:not(.col--fixed)',
                onEnd: (sortableEvent) => {
                  const targetThElem = sortableEvent.item
                  const newIndex = sortableEvent.newIndex as number
                  const oldIndex = sortableEvent.oldIndex as number
                  const { fullColumn, tableColumn } = $grid.getTableColumn()
                  const wrapperElem = targetThElem.parentNode as HTMLElement
                  const newColumn = fullColumn[newIndex]
                  if (newColumn.fixed) {
                    // 错误的移动
                    const oldTrElement = wrapperElem.children[oldIndex] as HTMLElement
                    if (newIndex > oldIndex) {
                      wrapperElem.insertBefore(targetThElem, oldTrElement)
                    } else {
                      wrapperElem.insertBefore(oldTrElement, targetThElem)
                    }
                    return VXETable.modal.message({ content: '固定列不允许拖动！', status: 'error' })
                  }
                  // 转换真实索引
                  const oldColumnIndex = $grid.getColumnIndex(tableColumn[oldIndex])
                  const newColumnIndex = $grid.getColumnIndex(tableColumn[newIndex])
                  // 移动到目标列
                  const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
                  fullColumn.splice(newColumnIndex, 0, currRow)
                  $grid.loadColumn(fullColumn)
                }
              })
            }

            let initTime: any
            nextTick(() => {
              // 加载完成之后在绑定拖动事件
              initTime = setTimeout(() => {
                columnDrop2()
              }, 500)
            })

            onUnmounted(() => {
              clearTimeout(initTime)
              if (sortable2) {
                sortable2.destroy()
              }
            })

            return {
              xGrid2,
              gridOptions2,
              columnDrop2
            }
          }
        })
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
  }
})
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

<template>
  <div>
    <p class="tip">
      使用 v-for 去循环列是不建议的<span class="green">（建议动态场景使用 <grid-api-link name="vxe-grid"/> 进行渲染）</span><br>
      如果列信息发生变动，则需要通过调用 <table-api-link prop="refreshColumn"/> 方法刷新列信息<br>
      <span class="red">（注：动态更新属性必须要先定义，否则将失去自动响应）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="addColumn()">最后增加一列</vxe-button>
        <vxe-button @click="removeColumn()">删除最后一列</vxe-button>
        <vxe-button @click="updateSexFilter()">修改sex列筛选条件</vxe-button>
        <vxe-button @click="toggleFixedColumn(0, 'left')">切换第一列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn(1, 'left')">切换第二列固定</vxe-button>
        <vxe-button @click="updateWidthColumn(2, 500)">修改第三列宽度</vxe-button>
        <vxe-button @click="updateWidthColumn(3, 500)">修改第四列宽度</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border="inner"
      highlight-hover-row
      highlight-current-row
      ref="xTable"
      height="300"
      :data="demo1.tableData">
      <vxe-table-column v-for="(config, index) in demo1.tableColumn" :key="index" v-bind="config"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick } from 'vue'
import { VxeTableInstance } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableColumn: [
        { type: 'seq', width: 60, fixed: null },
        { type: 'checkbox', width: 50, fixed: null },
        { field: 'name', title: 'Name', width: 200 },
        { field: 'nickname', title: 'Nickname', width: 300 },
        { field: 'sex', title: 'Sex', width: 200, filters: [{ value: '1', label: '男' }] },
        { field: 'role', title: 'Role', width: 200 },
        { field: 'address', title: 'Address', width: 300, showOverflow: true }
      ] as any[],
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const xTable = ref({} as VxeTableInstance)

    const addColumn = () => {
      const uniqueId = XEUtils.uniqueId()
      demo1.tableColumn.push({
        field: `new_${uniqueId}`,
        title: `新列_${uniqueId}`,
        width: 100
      })
    }

    const removeColumn = () => {
      demo1.tableColumn.pop()
    }

    const updateSexFilter = async () => {
      const $table = xTable.value
      const column = $table.getColumnByField('sex')
      // 修改筛选列表，并默认设置为选中状态
      await $table.setFilter(column, [
        { value: '1', label: '男' },
        { value: '0', label: '女', checked: true }
      ])
      // 修改条件之后，需要手动调用 updateData 处理表格数据
      await $table.updateData()
    }

    const toggleFixedColumn = async (index: number, value: string) => {
      const $table = xTable.value
      // 更改了列属性，需要手动刷新列
      demo1.tableColumn[index].fixed = demo1.tableColumn[index].fixed ? null : value
      // 由于固定列的动态切换是无状态的，所以需要手动刷新滚动位置
      await nextTick()
      await $table.refreshColumn()
      await $table.refreshScroll()
    }

    const updateWidthColumn = async (index: number, value: number) => {
      const $table = xTable.value
      demo1.tableColumn[index].width = value
      // 更改了列属性，需要手动刷新列
      await nextTick()
      await $table.refreshColumn()
    }

    return {
      xTable,
      demo1,
      addColumn,
      removeColumn,
      updateSexFilter,
      toggleFixedColumn,
      updateWidthColumn,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="addColumn()">最后增加一列</vxe-button>
            <vxe-button @click="removeColumn()">删除最后一列</vxe-button>
            <vxe-button @click="updateSexFilter()">修改sex列筛选条件</vxe-button>
            <vxe-button @click="toggleFixedColumn(0, 'left')">切换第一列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn(1, 'left')">切换第二列固定</vxe-button>
            <vxe-button @click="updateWidthColumn(2, 500)">修改第三列宽度</vxe-button>
            <vxe-button @click="updateWidthColumn(3, 500)">修改第四列宽度</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border="inner"
          highlight-hover-row
          highlight-current-row
          ref="xTable"
          height="300"
          :data="demo1.tableData">
          <vxe-table-column v-for="(config, index) in demo1.tableColumn" :key="index" v-bind="config"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref, reactive, nextTick } from 'vue'
        import { VxeTableInstance } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableColumn: [
                { type: 'seq', width: 60, fixed: null },
                { type: 'checkbox', width: 50, fixed: null },
                { field: 'name', title: 'Name', width: 200 },
                { field: 'nickname', title: 'Nickname', width: 300 },
                { field: 'sex', title: 'Sex', width: 200, filters: [{ value: '1', label: '男' }] },
                { field: 'role', title: 'Role', width: 200 },
                { field: 'address', title: 'Address', width: 300, showOverflow: true }
              ] as any[],
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            const xTable = ref({} as VxeTableInstance)

            const addColumn = () => {
              const uniqueId = XEUtils.uniqueId()
              demo1.tableColumn.push({
                field: \`new_\${uniqueId}\`,
                title: \`新列_\${uniqueId}\`,
                width: 100
              })
            }

            const removeColumn = () => {
              demo1.tableColumn.pop()
            }

            const updateSexFilter = async () => {
              const $table = xTable.value
              const column = $table.getColumnByField('sex')
              // 修改筛选列表，并默认设置为选中状态
              await $table.setFilter(column, [
                { value: '1', label: '男' },
                { value: '0', label: '女', checked: true }
              ])
              // 修改条件之后，需要手动调用 updateData 处理表格数据
              await $table.updateData()
            }

            const toggleFixedColumn = async (index: number, value: string) => {
              const $table = xTable.value
              // 更改了列属性，需要手动刷新列
              demo1.tableColumn[index].fixed = demo1.tableColumn[index].fixed ? null : value
              // 由于固定列的动态切换是无状态的，所以需要手动刷新滚动位置
              await nextTick()
              await $table.refreshColumn()
              await $table.refreshScroll()
            }

            const updateWidthColumn = async (index: number, value: number) => {
              const $table = xTable.value
              demo1.tableColumn[index].width = value
              // 更改了列属性，需要手动刷新列
              await nextTick()
              await $table.refreshColumn()
            }

            return {
              xTable,
              demo1,
              addColumn,
              removeColumn,
              updateSexFilter,
              toggleFixedColumn,
              updateWidthColumn
            }
          }
        })
        `
      ]
    }
  }
})
</script>

<template>
  <div>
    <p class="tip">可编辑的合并行<br><span class="red">（注：<table-api-link prop="span-method"/> ，不能用于树形结构、展开行、固定列，合并的逻辑都是自行实现的，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="500"
      :span-method="rowspanMethod"
      :data="tableData"
      :edit-rules="demo1.validRules"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', props: {placeholder: '请输入角色'}}"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', props: {placeholder: '请输入名称'}}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'input', props: {placeholder: '请输入地址'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)

    const tableData = ref([
      { id: 10001, name: 'Test1', nickname: 'T1', role: 'Designer', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
      { id: 10005, name: 'Test5', nickname: 'T5', role: 'Test', sex: '1', sex2: ['1'], num1: 18, age: 26, address: 'Shenzhen', date12: '', date13: '' },
      { id: 10006, name: 'Test6', nickname: 'T6', role: 'Test', sex: '1', sex2: ['1'], num1: 35, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' },
      { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', sex2: ['1'], num1: 11, age: 24, address: 'BeiJing', date12: '2020-08-10', date13: '2020-04-22' },
      { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', sex2: ['1'], num1: 30, age: 21, address: 'Shenzhen', date12: '', date13: '' },
      { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', sex2: ['0'], num1: 25, age: 31, address: 'Guangzhou', date12: '', date13: '2020-04-10' },
      { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '1', sex2: ['1'], num1: 30, age: 29, address: 'BeiJing', date12: '2020-04-18', date13: '2020-04-10' },
      { id: 100011, name: 'Test11', nickname: 'T11', role: 'Test', sex: '0', sex2: ['1'], num1: 33, age: 30, address: 'Shenzhen', date12: '', date13: '' },
      { id: 100012, name: 'Test12', nickname: 'T12', role: 'Designer', sex: '1', sex2: ['1'], num1: 22, age: 20, address: 'Guangzhou', date12: '', date13: '2020-04-11' },
      { id: 100013, name: 'Test13', nickname: 'T13', role: 'Designer', sex: '1', sex2: ['1'], num1: 19, age: 34, address: 'BeiJing', date12: '', date13: '2020-01-10' }
    ])

    const demo1 = reactive({
      validRules: {
        role: [
          { required: true, message: '角色值必须填写' }
        ],
        name: [
          { required: true, message: '名称必须填写' }
        ],
        address: [
          { required: true, message: '地址必须填写' }
        ]
      }
    })

    const insertEvent = async () => {
      const $table = xTable.value
      const record = {}
      const { row: newRow } = await $table.insert(record)
      $table.setActiveCell(newRow, 'role')
    }

    const saveEvent = () => {
      const $table = xTable.value
      const body = $table.getRecordset()
      const { insertRecords, removeRecords, updateRecords } = body
      if (insertRecords.length || removeRecords.length || updateRecords.length) {
        $table.validate((errMap) => {
          if (errMap) {
            VXETable.modal.message({ status: 'error', content: '校验不通过！' })
          } else {
            VXETable.modal.message({ content: '保存成功！', status: 'success' })
          }
        })
      } else {
        VXETable.modal.message({ content: '数据未改动！', status: 'warning' })
      }
    }

    // 通用行合并函数（将相同多列数据合并为一行）
    const rowspanMethod: VxeTablePropTypes.SpanMethod = ({ row, _rowIndex, column, visibleData }) => {
      const fields = ['role']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    }

    return {
      demo1,
      xTable,
      tableData,
      insertEvent,
      saveEvent,
      rowspanMethod,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          ref="xTable"
          height="500"
          :span-method="rowspanMethod"
          :data="tableData"
          :edit-rules="demo1.validRules"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', props: {placeholder: '请输入角色'}}"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', props: {placeholder: '请输入名称'}}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'input', props: {placeholder: '请输入地址'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const tableData = ref([
              { id: 10001, name: 'Test1', nickname: 'T1', role: 'Designer', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
              { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
              { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
              { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
              { id: 10005, name: 'Test5', nickname: 'T5', role: 'Test', sex: '1', sex2: ['1'], num1: 18, age: 26, address: 'Shenzhen', date12: '', date13: '' },
              { id: 10006, name: 'Test6', nickname: 'T6', role: 'Test', sex: '1', sex2: ['1'], num1: 35, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' },
              { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', sex2: ['1'], num1: 11, age: 24, address: 'BeiJing', date12: '2020-08-10', date13: '2020-04-22' },
              { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', sex2: ['1'], num1: 30, age: 21, address: 'Shenzhen', date12: '', date13: '' },
              { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', sex2: ['0'], num1: 25, age: 31, address: 'Guangzhou', date12: '', date13: '2020-04-10' },
              { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '1', sex2: ['1'], num1: 30, age: 29, address: 'BeiJing', date12: '2020-04-18', date13: '2020-04-10' },
              { id: 100011, name: 'Test11', nickname: 'T11', role: 'Test', sex: '0', sex2: ['1'], num1: 33, age: 30, address: 'Shenzhen', date12: '', date13: '' },
              { id: 100012, name: 'Test12', nickname: 'T12', role: 'Designer', sex: '1', sex2: ['1'], num1: 22, age: 20, address: 'Guangzhou', date12: '', date13: '2020-04-11' },
              { id: 100013, name: 'Test13', nickname: 'T13', role: 'Designer', sex: '1', sex2: ['1'], num1: 19, age: 34, address: 'BeiJing', date12: '', date13: '2020-01-10' }
            ])

            const demo1 = reactive({
              validRules: {
                role: [
                  { required: true, message: '角色值必须填写' }
                ],
                name: [
                  { required: true, message: '名称必须填写' }
                ],
                address: [
                  { required: true, message: '地址必须填写' }
                ]
              }
            })

            const insertEvent = async () => {
              const $table = xTable.value
              const record = {}
              const { row: newRow } = await $table.insert(record)
              $table.setActiveCell(newRow, 'role')
            }

            const saveEvent = () => {
              const $table = xTable.value
              const body = $table.getRecordset()
              const { insertRecords, removeRecords, updateRecords } = body
              if (insertRecords.length || removeRecords.length || updateRecords.length) {
                $table.validate((errMap) => {
                  if (errMap) {
                    VXETable.modal.message({ status: 'error', content: '校验不通过！' })
                  } else {
                    VXETable.modal.message({ content: '保存成功！', status: 'success' })
                  }
                })
              } else {
                VXETable.modal.message({ content: '数据未改动！', status: 'warning' })
              }
            }

            // 通用行合并函数（将相同多列数据合并为一行）
            const rowspanMethod: VxeTablePropTypes.SpanMethod = ({ row, _rowIndex, column, visibleData }) => {
              const fields = ['role']
              const cellValue = row[column.property]
              if (cellValue && fields.includes(column.property)) {
                const prevRow = visibleData[_rowIndex - 1]
                let nextRow = visibleData[_rowIndex + 1]
                if (prevRow && prevRow[column.property] === cellValue) {
                  return { rowspan: 0, colspan: 0 }
                } else {
                  let countRowspan = 1
                  while (nextRow && nextRow[column.property] === cellValue) {
                    nextRow = visibleData[++countRowspan + _rowIndex]
                  }
                  if (countRowspan > 1) {
                    return { rowspan: countRowspan, colspan: 1 }
                  }
                }
              }
            }

            return {
              demo1,
              xTable,
              tableData,
              insertEvent,
              saveEvent,
              rowspanMethod
            }
          }
        })
        `
      ]
    }
  }
})
</script>

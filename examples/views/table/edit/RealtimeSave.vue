<template>
  <div>
    <p class="tip">通过监听 <table-api-link prop="edit-closed"/> 事件实现编辑完成即时保存功能，再配合 <table-api-link prop="reloadRow"/> 局部刷新函数<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-table
      border
      resizable
      keep-source
      show-overflow
      ref="xTable"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil'}"
      @edit-closed="editClosedEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="num1" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="date13" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeTableEvents } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)

    const tableData = ref([
      { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
      { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
      { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
      { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
      { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
    ])

    const sexList = ref([
      { label: '男', value: '1' },
      { label: '女', value: '0' }
    ])

    const editClosedEvent: VxeTableEvents.EditClosed = ({ row, column }) => {
      const $table = xTable.value
      const field = column.property
      const cellValue = row[field]
      // 判断单元格值是否被修改
      if ($table.isUpdateByRow(row, field)) {
        setTimeout(() => {
          VXETable.modal.message({
            content: `局部保存成功！ ${field}=${cellValue}`,
            status: 'success'
          })
          // 局部更新单元格为已保存状态
          $table.reloadRow(row, null, field)
        }, 300)
      }
    }

    return {
      xTable,
      tableData,
      sexList,
      editClosedEvent,
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          keep-source
          show-overflow
          ref="xTable"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil'}"
          @edit-closed="editClosedEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="num1" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="date13" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTableEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const tableData = ref([
              { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
              { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
              { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
              { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
              { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
              { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
              { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
              { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
            ])

            const sexList = ref([
              { label: '男', value: '1' },
              { label: '女', value: '0' }
            ])

            const editClosedEvent: VxeTableEvents.EditClosed = ({ row, column }) => {
              const $table = xTable.value
              const field = column.property
              const cellValue = row[field]
              // 判断单元格值是否被修改
              if ($table.isUpdateByRow(row, field)) {
                setTimeout(() => {
                  VXETable.modal.message({
                    content: \`局部保存成功！ \${field}=\${cellValue}\`,
                    status: 'success'
                  })
                  // 局部更新单元格为已保存状态
                  $table.reloadRow(row, null, field)
                }, 300)
              }
            }

            return {
              xTable,
              tableData,
              sexList,
              editClosedEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>

<template>
  <div>
    <p class="tip">实现简单的唯一下拉选项列表<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="insertEvent()">新增</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      ref="xTable"
      max-height="400"
      :data="demo1.tableData"
      :edit-config="{trigger: 'click', mode: 'row'}"
      @edit-actived="editActivedEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="role1" title="Role" :edit-render="{name: '$select', options: demo1.roleList, props: {clearable: true}, events: {change: roleChangeEvent}}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue'
import { VxeTableInstance } from '../../../../types/vxe-table'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)

    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
      ],
      roleList: [
        { label: '前端', value: '1', disabled: false },
        { label: '后端', value: '2', disabled: false },
        { label: '项目经理', value: '3', disabled: false },
        { label: '设计师', value: '4', disabled: false },
        { label: '运维', value: '5', disabled: false }
      ]
    })

    const insertEvent = () => {
      const $table = xTable.value
      const record = {}
      $table.insert(record)
    }

    const updateRoleList = () => {
      const $table = xTable.value
      // 获取表格中的全量数据
      const { fullData } = $table.getTableData()
      demo1.roleList.forEach(item => {
        if (item.value) {
          // 如果当前选项已经被选过，则禁用
          item.disabled = fullData.some(row => row.role1 === item.value)
        }
      })
    }

    const roleChangeEvent = () => {
      updateRoleList()
    }

    const editActivedEvent = () => {
      // 激活编辑时检查剩余选项是否可选择
      updateRoleList()
    }

    nextTick(() => {
      updateRoleList()
    })

    return {
      xTable,
      demo1,
      insertEvent,
      roleChangeEvent,
      editActivedEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="insertEvent()">新增</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          ref="xTable"
          max-height="400"
          :data="demo1.tableData"
          :edit-config="{trigger: 'click', mode: 'row'}"
          @edit-actived="editActivedEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="role1" title="Role" :edit-render="{name: '$select', options: demo1.roleList, props: {clearable: true}, events: {change: roleChangeEvent}}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, nextTick, reactive, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
              ],
              roleList: [
                { label: '前端', value: '1', disabled: false },
                { label: '后端', value: '2', disabled: false },
                { label: '项目经理', value: '3', disabled: false },
                { label: '设计师', value: '4', disabled: false },
                { label: '运维', value: '5', disabled: false }
              ]
            })

            const insertEvent = () => {
              const $table = xTable.value
              const record = {}
              $table.insert(record)
            }

            const updateRoleList = () => {
              const $table = xTable.value
              // 获取表格中的全量数据
              const { fullData } = $table.getTableData()
              demo1.roleList.forEach(item => {
                if (item.value) {
                  // 如果当前选项已经被选过，则禁用
                  item.disabled = fullData.some(row => row.role1 === item.value)
                }
              })
            }

            const roleChangeEvent = () => {
              updateRoleList()
            }

            const editActivedEvent = () => {
              // 激活编辑时检查剩余选项是否可选择
              updateRoleList()
            }

            nextTick(() => {
              updateRoleList()
            })

            return {
              xTable,
              demo1,
              insertEvent,
              roleChangeEvent,
              editActivedEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>

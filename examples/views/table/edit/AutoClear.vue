<template>
  <div>
    <p class="tip">
      通过设置 <table-api-link prop="edit-config"/>.<table-api-link prop="autoClear"/> 关闭默认的单元格清除激活行为<br>
      <span class="red">（注：如果设置为手动模式则不会自动关闭激活状态，需要手动调用 clearActived 关闭编辑状态）</span>
    </p>

    <vxe-table
      border
      show-overflow
      keep-source
      ref="xTable"
      :loading="demo1.loading"
      :data="demo1.tableData"
      :edit-config="demo1.tableEditConfig">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', options: demo1.sexList}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: 'input', immediate: true, attrs: { type: 'date' }}"></vxe-table-column>
      <vxe-table-column field="num" title="Num" :edit-render="{name: 'input', immediate: true, attrs: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'textarea'}"></vxe-table-column>
      <vxe-table-column title="操作">
        <template #default="{ row }">
          <template v-if="$refs.xTable.isActiveByRow(row)">
            <vxe-button @click="saveRowEvent(row)">保存</vxe-button>
            <vxe-button @click="cancelRowEvent(row)">取消</vxe-button>
          </template>
          <template v-else>
            <vxe-button @click="editRowEvent(row)">编辑</vxe-button>
          </template>
        </template>
      </vxe-table-column>
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
import { VXETable } from '../../../../packages/vxe-table'
import { VxeTableInstance, VxeTablePropTypes } from '../../../../types/vxe-table'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      loading: false,
      tableData: [] as any[],
      sexList: [] as any[],
      tableEditConfig: {
        trigger: 'manual',
        mode: 'row',
        autoClear: false
      } as VxeTablePropTypes.EditConfig
    })

    const xTable = ref({} as VxeTableInstance)

    const editRowEvent = async (row: any) => {
      const $table = xTable.value
      await $table.setActiveRow(row)
    }

    const saveRowEvent = async () => {
      const $table = xTable.value
      await $table.clearActived()
      VXETable.modal.alert('success')
    }

    const cancelRowEvent = async (row: any) => {
      const $table = xTable.value
      await $table.clearActived()
      await $table.revertData(row)
    }

    demo1.loading = true
    setTimeout(() => {
      const list = [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 26, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 30, address: 'BeiJing', date12: '', date13: '2020-04-10' }
      ]
      demo1.loading = false
      demo1.tableData = list
      demo1.sexList = [
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ]
    }, 100)

    return {
      demo1,
      xTable,
      editRowEvent,
      saveRowEvent,
      cancelRowEvent,
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          keep-source
          ref="xTable"
          :loading="demo1.loading"
          :data="demo1.tableData"
          :edit-config="demo1.tableEditConfig">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', options: demo1.sexList}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: 'input', immediate: true, attrs: { type: 'date' }}"></vxe-table-column>
          <vxe-table-column field="num" title="Num" :edit-render="{name: 'input', immediate: true, attrs: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'textarea'}"></vxe-table-column>
          <vxe-table-column title="操作">
            <template #default="{ row }">
              <template v-if="$refs.xTable.isActiveByRow(row)">
                <vxe-button @click="saveRowEvent(row)">保存</vxe-button>
                <vxe-button @click="cancelRowEvent(row)">取消</vxe-button>
              </template>
              <template v-else>
                <vxe-button @click="editRowEvent(row)">编辑</vxe-button>
              </template>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              loading: false,
              tableData: [] as any[],
              sexList: [] as any[],
              tableEditConfig: {
                trigger: 'manual',
                mode: 'row',
                autoClear: false
              } as VxeTablePropTypes.EditConfig
            })

            const xTable = ref({} as VxeTableInstance)

            const editRowEvent = async (row: any) => {
              const $table = xTable.value
              await $table.setActiveRow(row)
            }

            const saveRowEvent = async () => {
              const $table = xTable.value
              await $table.clearActived()
              VXETable.modal.alert('success')
            }

            const cancelRowEvent = async (row: any) => {
              const $table = xTable.value
              await $table.clearActived()
              await $table.revertData(row)
            }

            demo1.loading = true
            setTimeout(() => {
              const list = [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 26, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 30, address: 'BeiJing', date12: '', date13: '2020-04-10' }
              ]
              demo1.loading = false
              demo1.tableData = list
              demo1.sexList = [
                { label: '女', value: '0' },
                { label: '男', value: '1' }
              ]
            }, 100)

            return {
              demo1,
              xTable,
              editRowEvent,
              saveRowEvent,
              cancelRowEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>

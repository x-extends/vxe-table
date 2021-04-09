<template>
  <div>
    <p class="tip">设置 <table-api-link prop="edit-config"/>={trigger: 'manual', mode: 'row'} 启用行编辑的功能，还可以配合 <table-api-link prop="revertData"/> 函数实现取消就还原数据<br></p>

    <vxe-table
      border
      resizable
      show-overflow
      keep-source
      ref="xTable"
      :loading="demo1.loading1"
      :data="demo1.tableData1"
      :edit-config="{trigger: 'manual', mode: 'row'}">
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="nickname" title="Role" :edit-render="{name: 'input', attrs: {type: 'text', placeholder: '请输入昵称'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: demo1.sexList1}"></vxe-table-column>
      <vxe-table-column field="sex2" title="多选下拉" :edit-render="{name: '$select', options: demo1.sexList1, props: {multiple: true}}"></vxe-table-column>
      <vxe-table-column field="num1" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2, placeholder: '请输入数值'}}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
      <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week', placeholder: '请选择日期'}}"></vxe-table-column>
      <vxe-table-column title="操作" width="160">
        <template #default="{ row }">
          <template v-if="isActiveStatus(row)">
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
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)

    interface ItemVO {
      id: number;
      name: string;
      nickname: string;
      [key: string]: any;
    }

    const demo1 = reactive({
      loading1: false,
      tableData1: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
      ] as ItemVO[],
      sexList1: [
        { label: '', value: '' },
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ]
    })

    const isActiveStatus = (row: ItemVO) => {
      const $table = xTable.value
      return $table.isActiveByRow(row)
    }

    const editRowEvent = (row: ItemVO) => {
      const $table = xTable.value
      $table.setActiveRow(row)
    }

    const saveRowEvent = () => {
      const $table = xTable.value
      $table.clearActived().then(() => {
        demo1.loading1 = true
        setTimeout(() => {
          demo1.loading1 = false
          VXETable.modal.message({ content: '保存成功！', status: 'success' })
        }, 300)
      })
    }

    const cancelRowEvent = (row: ItemVO) => {
      const $table = xTable.value
      $table.clearActived().then(() => {
        // 还原行数据
        $table.revertData(row)
      })
    }

    return {
      xTable,
      demo1,
      isActiveStatus,
      editRowEvent,
      saveRowEvent,
      cancelRowEvent,
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          keep-source
          ref="xTable"
          :loading="demo1.loading1"
          :data="demo1.tableData1"
          :edit-config="{trigger: 'manual', mode: 'row'}">
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="nickname" title="Role" :edit-render="{name: 'input', attrs: {type: 'text', placeholder: '请输入昵称'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: demo1.sexList1}"></vxe-table-column>
          <vxe-table-column field="sex2" title="多选下拉" :edit-render="{name: '$select', options: demo1.sexList1, props: {multiple: true}}"></vxe-table-column>
          <vxe-table-column field="num1" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2, placeholder: '请输入数值'}}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
          <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week', placeholder: '请选择日期'}}"></vxe-table-column>
          <vxe-table-column title="操作" width="160">
            <template #default="{ row }">
              <template v-if="isActiveStatus(row)">
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
        import { VXETable, VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const demo1 = reactive({
              loading1: false,
              tableData1: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
              ],
              sexList1: [
                { label: '', value: '' },
                { label: '男', value: '1' },
                { label: '女', value: '0' }
              ]
            })

            const isActiveStatus = (row: any) => {
              const $table = xTable.value
              return $table.isActiveByRow(row)
            }

            const editRowEvent = (row: any) => {
              const $table = xTable.value
              $table.setActiveRow(row)
            }

            const saveRowEvent = () => {
              const $table = xTable.value
              $table.clearActived().then(() => {
                demo1.loading1 = true
                setTimeout(() => {
                  demo1.loading1 = false
                  VXETable.modal.message({ content: '保存成功！', status: 'success' })
                }, 300)
              })
            }

            const cancelRowEvent = (row: any) => {
              const $table = xTable.value
              $table.clearActived().then(() => {
                // 还原行数据
                $table.revertData(row)
              })
            }

            return {
              xTable,
              demo1,
              isActiveStatus,
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

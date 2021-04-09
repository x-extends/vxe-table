<template>
  <div>
    <p class="tip">
      设置 <table-api-link prop="keep-source"/> 开启保持原始值状态，通过调用 <table-api-link prop="revertData"/> 还原数据<br>
      <span class="red">（注：开启 keep-source 将会影响性能，具体取决于数据量）</span>
    </p>

    <vxe-toolbar perfect>
      <template #buttons>
        <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent">新增</vxe-button>
        <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent">移除</vxe-button>
        <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent">保存</vxe-button>
        <vxe-button icon="fa fa-mail-reply" status="perfect" @click="revertEvent">还原</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      show-overflow
      keep-source
      :data="demo1.tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column title="操作">
        <template #default="{ row }">
          <vxe-button v-if="!$refs.xTable.isInsertByRow(row)" @click="$refs.xTable.revertData(row)">还原</vxe-button>
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
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const xTable = ref({} as VxeTableInstance)

    const insertEvent = async () => {
      const $table = xTable.value
      const record = {
        sex: '1'
      }
      const { row: newRow } = await $table.insert(record)
      $table.setActiveCell(newRow, 'sex')
    }

    const removeEvent = () => {
      const $table = xTable.value
      const selectRecords = $table.getCheckboxRecords()
      if (selectRecords.length) {
        VXETable.modal.confirm('您确定要删除选中的数据吗?').then(type => {
          if (type === 'confirm') {
            $table.removeCheckboxRow()
          }
        })
      } else {
        VXETable.modal.message({ content: '请至少选择一条数据', status: 'error' })
      }
    }

    const revertEvent = () => {
      const $table = xTable.value
      VXETable.modal.confirm('您确定要还原数据吗?').then(type => {
        if (type === 'confirm') {
          $table.revertData()
        }
      })
    }

    const saveEvent = () => {
      const $table = xTable.value
      const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
      VXETable.modal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
    }

    return {
      demo1,
      xTable,
      insertEvent,
      removeEvent,
      revertEvent,
      saveEvent,
      demoCodes: [
        `
        <vxe-toolbar perfect>
          <template #buttons>
            <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent">新增</vxe-button>
            <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent">移除</vxe-button>
            <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent">保存</vxe-button>
            <vxe-button icon="fa fa-mail-reply" status="perfect" @click="revertEvent">还原</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          border
          show-overflow
          keep-source
          :data="demo1.tableData"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column title="操作">
            <template #default="{ row }">
              <vxe-button v-if="!$refs.xTable.isInsertByRow(row)" @click="$refs.xTable.revertData(row)">还原</vxe-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
              ]
            })

            const xTable = ref({} as VxeTableInstance)

            const insertEvent = async () => {
              const $table = xTable.value
              const record = {
                sex: '1'
              }
              const { row: newRow } = await $table.insert(record)
              $table.setActiveCell(newRow, 'sex')
            }

            const removeEvent = () => {
              const $table = xTable.value
              const selectRecords = $table.getCheckboxRecords()
              if (selectRecords.length) {
                VXETable.modal.confirm('您确定要删除选中的数据吗?').then(type => {
                  if (type === 'confirm') {
                    $table.removeCheckboxRow()
                  }
                })
              } else {
                VXETable.modal.message({ content: '请至少选择一条数据', status: 'error' })
              }
            }

            const revertEvent = () => {
              const $table = xTable.value
              VXETable.modal.confirm('您确定要还原数据吗?').then(type => {
                if (type === 'confirm') {
                  $table.revertData()
                }
              })
            }

            const saveEvent = () => {
              const $table = xTable.value
              const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
              VXETable.modal.alert(\`insertRecords=\${insertRecords.length} removeRecords=\${removeRecords.length} updateRecords=\${updateRecords.length}\`)
            }

            return {
              demo1,
              xTable,
              insertEvent,
              removeEvent,
              revertEvent,
              saveEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>

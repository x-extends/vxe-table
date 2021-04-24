<template>
  <div>
    <p class="tip">
      设置 <table-api-link prop="keep-source"/> 开启保持原始值状态和 <table-api-link prop="edit-config"/>={showStatus, showUpdateStatus, showInsertStatus} 开启编辑状态显示功能，还可以通过 icon 自定义编辑状态的图标，例如第三方图标库：font-awesome、inconfont<br>
      对于某些需要局部保存的场景，可以在数据保存完成后调用 <table-api-link prop="reloadRow"/> 方法加载行数据并恢复到初始状态<br>
      <span class="red">（注：开启 showStatus 后如果使用自定义渲染需要配合 <table-api-link prop="updateStatus"/> 方法使用，在对应单元格的值发生改变时调用更新状态）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent">新增</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      keep-source
      ref="xTable"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil-square-o'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{}">
        <template #edit="scope">
          <textarea v-model="scope.row.address" @input="$refs.xTable.updateStatus(scope)"></textarea>
        </template>
      </vxe-table-column>
      <vxe-table-column field="date12" title="Date" :formatter="formatDate" :edit-render="{}">
        <template #edit="scope">
          <input type="date" v-model="scope.row.date12" @input="$refs.xTable.updateStatus(scope)">
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="200">
        <template #default="{ row, rowIndex }">
          <template v-if="!row.date12">
            <vxe-button @click="saveEvent2(row)" :loading="row.loading">更新并替换新数据</vxe-button>
          </template>
          <template v-else-if="rowIndex % 2 === 0">
            <vxe-button @click="saveEvent(row)" :loading="row.loading">更新行数据</vxe-button>
          </template>
          <template v-else>
            <vxe-button status="primary" @click="saveEvent(row, 'name')" :loading="row.loading">更新 Name 列</vxe-button>
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
import { defineComponent, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeColumnPropTypes } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const tableData = ref([
      { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
    ])

    const xTable = ref({} as VxeTableInstance)

    const formatDate: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
    }

    const insertEvent = async () => {
      const $table = xTable.value
      const record = {}
      const { row: newRow } = await $table.insert(record)
      await $table.setActiveCell(newRow, 'name')
    }

    const submitSave = (row: any): Promise<any> => {
      return new Promise(resolve => {
        const rest = {
          name: '',
          sex: '',
          date12: XEUtils.toDateString(new Date())
        }
        if (row.name) {
          rest.name = row.name
        }
        if (row.sex) {
          rest.sex = row.sex
        }
        setTimeout(() => resolve(rest), 500)
      })
    }

    const saveEvent = async (row: any, field?: string) => {
      const $table = xTable.value
      if ($table.isUpdateByRow(row)) {
        row.loading = true
        await submitSave(row)
        // 局部保存，并将行数据恢复到初始状态（如果 record 为空则不改动行数据，只恢复状态）
        await $table.reloadRow(row, null, field)
        VXETable.modal.message({ content: '保存成功！', status: 'success' })
        row.loading = false
      } else {
        VXETable.modal.message({ content: '数据未改动！', status: 'info' })
      }
    }

    const saveEvent2 = async (row: any) => {
      const $table = xTable.value
      if ($table.isUpdateByRow(row)) {
        row.loading = true
        const data = await submitSave(row)
        // 局部保存，并更新本地数据
        await $table.reloadRow(row, data)
        VXETable.modal.message({ content: '保存成功！', status: 'success' })
        row.loading = false
      } else {
        VXETable.modal.message({ content: '数据未改动！', status: 'info' })
      }
    }

    const getInsertEvent = () => {
      const $table = xTable.value
      const insertRecords = $table.getInsertRecords()
      VXETable.modal.alert(`新增：${insertRecords.length}`)
    }

    const getRemoveEvent = () => {
      const $table = xTable.value
      const removeRecords = $table.getRemoveRecords()
      VXETable.modal.alert(`删除：${removeRecords.length}`)
    }

    const getUpdateEvent = () => {
      const $table = xTable.value
      const updateRecords = $table.getUpdateRecords()
      VXETable.modal.alert(`更新：${updateRecords.length}`)
    }

    return {
      xTable,
      tableData,
      formatDate,
      insertEvent,
      saveEvent,
      saveEvent2,
      getInsertEvent,
      getRemoveEvent,
      getUpdateEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button icon="fa fa-plus" @click="insertEvent">新增</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          keep-source
          ref="xTable"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil-square-o'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{}">
            <template #edit="scope">
              <textarea v-model="scope.row.address" @input="$refs.xTable.updateStatus(scope)"></textarea>
            </template>
          </vxe-table-column>
          <vxe-table-column field="date12" title="Date" :formatter="formatDate" :edit-render="{}">
            <template #edit="scope">
              <input type="date" v-model="scope.row.date12" @input="$refs.xTable.updateStatus(scope)">
            </template>
          </vxe-table-column>
          <vxe-table-column title="操作" width="200">
            <template #default="{ row, rowIndex }">
              <template v-if="!row.date12">
                <vxe-button @click="saveEvent2(row)" :loading="row.loading">更新并替换新数据</vxe-button>
              </template>
              <template v-else-if="rowIndex % 2 === 0">
                <vxe-button @click="saveEvent(row)" :loading="row.loading">更新行数据</vxe-button>
              </template>
              <template v-else>
                <vxe-button status="primary" @click="saveEvent(row, 'name')" :loading="row.loading">更新 Name 列</vxe-button>
              </template>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeColumnPropTypes } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const tableData = ref([
              { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
              { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
              { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
              { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
            ])

            const xTable = ref({} as VxeTableInstance)

            const formatDate: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
              return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
            }

            const insertEvent = async () => {
              const $table = xTable.value
              const record = {}
              const { row: newRow } = await $table.insert(record)
              await $table.setActiveCell(newRow, 'name')
            }

            const submitSave = (row: any): Promise<any> => {
              return new Promise(resolve => {
                const rest = {
                  name: '',
                  sex: '',
                  date12: XEUtils.toDateString(new Date())
                }
                if (row.name) {
                  rest.name = row.name
                }
                if (row.sex) {
                  rest.sex = row.sex
                }
                setTimeout(() => resolve(rest), 500)
              })
            }

            const saveEvent = async (row: any, field?: string) => {
              const $table = xTable.value
              if ($table.isUpdateByRow(row)) {
                row.loading = true
                await submitSave(row)
                // 局部保存，并将行数据恢复到初始状态（如果 record 为空则不改动行数据，只恢复状态）
                await $table.reloadRow(row, null, field)
                VXETable.modal.message({ content: '保存成功！', status: 'success' })
                row.loading = false
              } else {
                VXETable.modal.message({ content: '数据未改动！', status: 'info' })
              }
            }

            const saveEvent2 = async (row: any) => {
              const $table = xTable.value
              if ($table.isUpdateByRow(row)) {
                row.loading = true
                const data = await submitSave(row)
                // 局部保存，并更新本地数据
                await $table.reloadRow(row, data)
                VXETable.modal.message({ content: '保存成功！', status: 'success' })
                row.loading = false
              } else {
                VXETable.modal.message({ content: '数据未改动！', status: 'info' })
              }
            }

            const getInsertEvent = () => {
              const $table = xTable.value
              const insertRecords = $table.getInsertRecords()
              VXETable.modal.alert(\`新增：\${insertRecords.length}\`)
            }

            const getRemoveEvent = () => {
              const $table = xTable.value
              const removeRecords = $table.getRemoveRecords()
              VXETable.modal.alert(\`删除：\${removeRecords.length}\`)
            }

            const getUpdateEvent = () => {
              const $table = xTable.value
              const updateRecords = $table.getUpdateRecords()
              VXETable.modal.alert(\`更新：\${updateRecords.length}\`)
            }

            return {
              xTable,
              tableData,
              formatDate,
              insertEvent,
              saveEvent,
              saveEvent2,
              getInsertEvent,
              getRemoveEvent,
              getUpdateEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>

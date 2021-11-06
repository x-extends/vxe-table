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
        <vxe-button @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      keep-source
      ref="xTable"
      :loading="loading"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil-square-o'}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{autofocus: '.myinput'}">
        <template #edit="scope">
          <input type="text" class="myinput" v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"/>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{autofocus: '.myinput'}">
        <template #edit="scope">
          <input type="text" class="myinput" v-model="scope.row.sex" @input="$refs.xTable.updateStatus(scope)"/>
        </template>
      </vxe-column>
      <vxe-column field="address" title="Address" :edit-render="{}">
        <template #edit="scope">
          <input type="text" v-model="scope.row.address" @input="$refs.xTable.updateStatus(scope)"/>
        </template>
      </vxe-column>
      <vxe-column field="date12" title="Date" :formatter="formatDate" :edit-render="{}">
        <template #edit="scope">
          <input type="date" v-model="scope.row.date12" @input="$refs.xTable.updateStatus(scope)">
        </template>
      </vxe-column>
      <vxe-column title="操作" width="200">
        <template #default="{ row }">
          <template v-if="$refs.xTable.isUpdateByRow(row)">
            <vxe-button @click="saveUpdateEvent(row)" :loading="row.loading">局部保存</vxe-button>
          </template>
        </template>
      </vxe-column>
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
    const loading = ref(false)
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

    const saveUpdateEvent = (row: any) => {
      const $table = xTable.value
      if ($table.isUpdateByRow(row)) {
        row.loading = true
        // 模拟异步
        setTimeout(() => {
          row.loading = false
          // 保存完成后将行恢复到初始状态
          $table.reloadRow(row, {})
          VXETable.modal.message({ content: '保存成功！', status: 'success' })
        }, 300)
      } else {
        VXETable.modal.message({ content: '数据未改动！', status: 'info' })
      }
    }

    const saveEvent = () => {
      loading.value = true
      // 默认异步
      setTimeout(() => {
        loading.value = false
        // 保存完成后重新刷新数据
        tableData.value = [
          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
        ]
      }, 300)
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
      loading,
      formatDate,
      insertEvent,
      saveEvent,
      saveUpdateEvent,
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
            <vxe-button @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          keep-source
          ref="xTable"
          :loading="loading"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true, icon: 'fa fa-pencil-square-o'}">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{autofocus: '.myinput'}">
            <template #edit="scope">
              <input type="text" class="myinput" v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"/>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex" :edit-render="{autofocus: '.myinput'}">
            <template #edit="scope">
              <input type="text" class="myinput" v-model="scope.row.sex" @input="$refs.xTable.updateStatus(scope)"/>
            </template>
          </vxe-column>
          <vxe-column field="address" title="Address" :edit-render="{}">
            <template #edit="scope">
              <input type="text" v-model="scope.row.address" @input="$refs.xTable.updateStatus(scope)"/>
            </template>
          </vxe-column>
          <vxe-column field="date12" title="Date" :formatter="formatDate" :edit-render="{}">
            <template #edit="scope">
              <input type="date" v-model="scope.row.date12" @input="$refs.xTable.updateStatus(scope)">
            </template>
          </vxe-column>
          <vxe-column title="操作" width="200">
            <template #default="{ row }">
              <template v-if="$refs.xTable.isUpdateByRow(row)">
                <vxe-button @click="saveUpdateEvent(row)" :loading="row.loading">局部保存</vxe-button>
              </template>
            </template>
          </vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeColumnPropTypes } from '../../../../types/index'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const loading = ref(false)
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

            const saveUpdateEvent = (row: any) => {
              const $table = xTable.value
              if ($table.isUpdateByRow(row)) {
                row.loading = true
                // 模拟异步
                setTimeout(() => {
                  row.loading = false
                  // 保存完成后将行恢复到初始状态
                  $table.reloadRow(row, {})
                  VXETable.modal.message({ content: '保存成功！', status: 'success' })
                }, 300)
              } else {
                VXETable.modal.message({ content: '数据未改动！', status: 'info' })
              }
            }

            const saveEvent = () => {
              loading.value = true
              // 默认异步
              setTimeout(() => {
                loading.value = false
                // 保存完成后重新刷新数据
                tableData.value = [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
                ]
              }, 300)
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
              loading,
              formatDate,
              insertEvent,
              saveEvent,
              saveUpdateEvent,
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

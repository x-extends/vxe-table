<template>
  <div>
    <p class="tip">增删改查完整示例</p>

    <vxe-toolbar ref="xToolbar" :loading="demo1.loading">
      <template #buttons>
        <vxe-button status="primary" content="临时新增" @click="insertEvent"></vxe-button>
        <vxe-button status="warning" content="临时删除" @click="removeSelectEvent"></vxe-button>
        <vxe-button status="danger" content="直接删除" @click="deleteSelectEvent"></vxe-button>
        <vxe-button content="提交（将临时操作持久化）" @click="saveEvent"></vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      keep-source
      ref="xTable"
      height="500"
      :loading="demo1.loading"
      :data="demo1.tableData"
      :edit-rules="demo1.validRules"
      :edit-config="{trigger: 'click', mode: 'row', showUpdateStatus: true, showInsertStatus: true}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-column>
      <vxe-column field="nickname" title="Nickname" :edit-render="{name: 'input', attrs: {type: 'text', placeholder: '请输入昵称'}}"></vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{name: '$select', options: demo1.sexList}"></vxe-column>
      <vxe-column field="amount" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-column>
      <vxe-column field="updateDate" title="Date" :edit-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}"></vxe-column>
      <vxe-column title="操作" width="240">
        <template #default="{ row }">
          <vxe-button status="warning" content="临时删除" @click="removeRowEvent(row)"></vxe-button>
          <vxe-button status="danger" content="直接删除" @click="deleteRowEvent(row)"></vxe-button>
        </template>
      </vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeToolbarInstance } from '../../../../types/index'
import XEAjax from 'xe-ajax'

export default defineComponent({
  setup () {
    const xToolbar = ref({} as VxeToolbarInstance)
    const xTable = ref({} as VxeTableInstance)

    const demo1 = reactive({
      loading: false,
      tableData: [],
      validRules: {
        name: [
          { required: true, message: '名称必须填写' }
        ]
      },
      sexList: [
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ]
    })

    const loadList = async () => {
      demo1.loading = true
      try {
        const res = await fetch('https://api.vxetable.cn/demo/api/pub/all').then(response => response.json())
        demo1.tableData = res
      } catch (e) {
        demo1.tableData = []
      }
      demo1.loading = false
    }

    const insertEvent = async () => {
      const $table = xTable.value
      const newRecord = {}
      const { row: newRow } = await $table.insert(newRecord)
      await $table.setActiveRow(newRow)
    }

    const removeSelectEvent = async () => {
      const $table = xTable.value
      await $table.removeCheckboxRow()
    }

    const deleteSelectEvent = async () => {
      const type = await VXETable.modal.confirm('您确定要删除选中的数据?')
      if (type !== 'confirm') {
        return
      }
      const $table = xTable.value
      const checkboxRecords = $table.getCheckboxRecords()
      demo1.loading = true
      try {
        const body = { removeRecords: checkboxRecords }
        await XEAjax.post('https://api.vxetable.cn/demo/api/pub/save', body)
        await loadList()
      } catch (e) {}
      demo1.loading = false
    }

    const removeRowEvent = async (row: any) => {
      const $table = xTable.value
      await $table.remove(row)
    }

    const deleteRowEvent = async (row: any) => {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      if (type !== 'confirm') {
        return
      }
      demo1.loading = true
      try {
        const body = { removeRecords: [row] }
        await XEAjax.post('https://api.vxetable.cn/demo/api/pub/save', body)
        await loadList()
      } catch (e) {}
    }

    const saveEvent = async () => {
      const $table = xTable.value
      const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
      if (insertRecords.length <= 0 && removeRecords.length <= 0 && updateRecords.length <= 0) {
        VXETable.modal.message({ content: '数据未改动！', status: 'warning' })
        return
      }
      const errMap = await $table.validate().catch(errMap => errMap)
      if (errMap) {
        return
      }
      demo1.loading = true
      try {
        const body = { insertRecords, removeRecords, updateRecords }
        await XEAjax.post('https://api.vxetable.cn/demo/api/pub/save', body)
        await loadList()
        VXETable.modal.message({ content: `操作成功，新增 ${insertRecords.length} 条，更新 ${updateRecords.length} 条，删除 ${removeRecords.length} 条`, status: 'success' })
      } catch (e: any) {
        if (e && e.message) {
          VXETable.modal.message({ content: e.message, status: 'error' })
        }
      }
      demo1.loading = false
    }

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTable.value
      const $toolbar = xToolbar.value
      $table.connect($toolbar)
    })

    loadList()

    return {
      demo1,
      xToolbar,
      xTable,
      insertEvent,
      removeSelectEvent,
      deleteSelectEvent,
      removeRowEvent,
      deleteRowEvent,
      saveEvent,
      demoCodes: [
        `
        <vxe-toolbar ref="xToolbar" :loading="demo1.loading">
          <template #buttons>
            <vxe-button status="primary" content="临时新增" @click="insertEvent"></vxe-button>
            <vxe-button status="warning" content="临时删除" @click="removeSelectEvent"></vxe-button>
            <vxe-button status="danger" content="直接删除" @click="deleteSelectEvent"></vxe-button>
            <vxe-button content="提交（将临时操作持久化）" @click="saveEvent"></vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          keep-source
          ref="xTable"
          height="500"
          :loading="demo1.loading"
          :data="demo1.tableData"
          :edit-rules="demo1.validRules"
          :edit-config="{trigger: 'click', mode: 'row', showUpdateStatus: true, showInsertStatus: true}">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-column>
          <vxe-column field="nickname" title="Nickname" :edit-render="{name: 'input', attrs: {type: 'text', placeholder: '请输入昵称'}}"></vxe-column>
          <vxe-column field="sex" title="Sex" :edit-render="{name: '$select', options: demo1.sexList}"></vxe-column>
          <vxe-column field="amount" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-column>
          <vxe-column field="updateDate" title="Date" :edit-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}"></vxe-column>
          <vxe-column title="操作" width="240">
            <template #default="{ row }">
              <vxe-button status="warning" content="临时删除" @click="removeRowEvent(row)"></vxe-button>
              <vxe-button status="danger" content="直接删除" @click="deleteRowEvent(row)"></vxe-button>
            </template>
          </vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VXETable, VxeTableInstance, VxeToolbarInstance } from 'vxe-table'
        import XEAjax from 'xe-ajax'

        export default defineComponent({
          setup () {
            const xToolbar = ref({} as VxeToolbarInstance)
            const xTable = ref({} as VxeTableInstance)

            const demo1 = reactive({
              loading: false,
              tableData: [],
              validRules: {
                name: [
                  { required: true, message: '名称必须填写' }
                ]
              },
              sexList: [
                { label: '男', value: '1' },
                { label: '女', value: '0' }
              ]
            })

            const loadList = async () => {
              demo1.loading = true
              try {
                const res = await fetch('https://api.vxetable.cn/demo/api/pub/all').then(response => response.json())
                demo1.tableData = res
              } catch (e) {
                demo1.tableData = []
              }
              demo1.loading = false
            }

            const insertEvent = async () => {
              const $table = xTable.value
              const newRecord = {}
              const { row: newRow } = await $table.insert(newRecord)
              await $table.setActiveRow(newRow)
            }

            const removeSelectEvent = async () => {
              const $table = xTable.value
              await $table.removeCheckboxRow()
            }

            const deleteSelectEvent = async () => {
              const type = await VXETable.modal.confirm('您确定要删除选中的数据?')
              if (type !== 'confirm') {
                return
              }
              const $table = xTable.value
              const checkboxRecords = $table.getCheckboxRecords()
              demo1.loading = true
              try {
                const body = { removeRecords: checkboxRecords }
                await XEAjax.post('https://api.vxetable.cn/demo/api/pub/save', body)
                await loadList()
              } catch (e) {}
              demo1.loading = false
            }

            const removeRowEvent = async (row: any) => {
              const $table = xTable.value
              await $table.remove(row)
            }

            const deleteRowEvent = async (row: any) => {
              const type = await VXETable.modal.confirm('您确定要删除该数据?')
              if (type !== 'confirm') {
                return
              }
              demo1.loading = true
              try {
                const body = { removeRecords: [row] }
                await XEAjax.post('https://api.vxetable.cn/demo/api/pub/save', body)
                await loadList()
              } catch (e) {}
            }

            const saveEvent = async () => {
              const $table = xTable.value
              const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
              if (insertRecords.length <= 0 && removeRecords.length <= 0 && updateRecords.length <= 0) {
                VXETable.modal.message({ content: '数据未改动！', status: 'warning' })
                return
              }
              const errMap = await $table.validate().catch(errMap => errMap)
              if (errMap) {
                return
              }
              demo1.loading = true
              try {
                const body = { insertRecords, removeRecords, updateRecords }
                await XEAjax.post('https://api.vxetable.cn/demo/api/pub/save', body)
                await loadList()
                VXETable.modal.message({ content: \`操作成功，新增 \${insertRecords.length} 条，更新 \${updateRecords.length} 条，删除 \${removeRecords.length} 条\`, status: 'success' })
              } catch (e) {
                if (e && e.message) {
                  VXETable.modal.message({ content: e.message, status: 'error' })
                }
              }
              demo1.loading = false
            }

            nextTick(() => {
              // 将表格和工具栏进行关联
              const $table = xTable.value
              const $toolbar = xToolbar.value
              $table.connect($toolbar)
            })

            loadList()

            return {
              demo1,
              xToolbar,
              xTable,
              insertEvent,
              removeSelectEvent,
              deleteSelectEvent,
              removeRowEvent,
              deleteRowEvent,
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

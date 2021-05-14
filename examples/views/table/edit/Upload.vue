<template>
  <div>
    <p class="tip">文件上传，可以通过调用 <table-api-link prop="readFile"/> 读取本地文件<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar ref="xToolbar">
      <template #buttons>
        <vxe-button status="primary" @click="insertEvent(false)">选择文件</vxe-button>
        <vxe-button status="primary" @click="insertEvent(true)">选择多个</vxe-button>
        <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
        <vxe-button @click="getInsertEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="400"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="type" title="Type"></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeToolbarInstance } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)
    const xToolbar = ref({} as VxeToolbarInstance)

    const insertEvent = async (isMultiple: boolean) => {
      const $table = xTable.value
      const { files } = await $table.readFile({ multiple: isMultiple })
      const records = Array.from(files).map(file => {
        const ns = file.name.split('.')
        const name = ns.slice(0, ns.length - 1).join('')
        const type = ns[ns.length - 1]
        return {
          name: name,
          size: file.size,
          type: type,
          date: XEUtils.toDateString(new Date())
        }
      })
      $table.insert(records)
    }

    const getInsertEvent = () => {
      const $table = xTable.value
      const insertRecords = $table.getInsertRecords()
      VXETable.modal.alert(insertRecords.length)
    }

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTable.value
      const $toolbar = xToolbar.value
      $table.connect($toolbar)
    })

    return {
      xTable,
      xToolbar,
      tableData: [],
      insertEvent,
      getInsertEvent,
      demoCodes: [
        `
        <vxe-toolbar ref="xToolbar">
          <template #buttons>
            <vxe-button status="primary" @click="insertEvent(false)">选择文件</vxe-button>
            <vxe-button status="primary" @click="insertEvent(true)">选择多个</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="getInsertEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          ref="xTable"
          height="400"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="type" title="Type"></vxe-column>
          <vxe-column field="size" title="Size"></vxe-column>
          <vxe-column field="date" title="Date"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref, nextTick } from 'vue'
        import { VXETable, VxeTableInstance, VxeToolbarInstance } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)
            const xToolbar = ref({} as VxeToolbarInstance)

            const insertEvent = async (isMultiple: boolean) => {
              const $table = xTable.value
              const { files } = await $table.readFile({ multiple: isMultiple })
              const records = Array.from(files).map(file => {
                const ns = file.name.split('.')
                const name = ns.slice(0, ns.length - 1).join('')
                const type = ns[ns.length - 1]
                return {
                  name: name,
                  size: file.size,
                  type: type,
                  date: XEUtils.toDateString(new Date())
                }
              })
              $table.insert(records)
            }

            const getInsertEvent = () => {
              const $table = xTable.value
              const insertRecords = $table.getInsertRecords()
              VXETable.modal.alert(insertRecords.length)
            }

            nextTick(() => {
              // 将表格和工具栏进行关联
              const $table = xTable.value
              const $toolbar = xToolbar.value
              $table.connect($toolbar)
            })

            return {
              xTable,
              xToolbar,
              tableData: [],
              insertEvent,
              getInsertEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>

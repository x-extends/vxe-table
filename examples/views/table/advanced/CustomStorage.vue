<template>
  <div>
    <p class="tip">
      显示/隐藏列功能，通过表格设置 <table-api-link prop="id"/> 和 <table-api-link prop="custom-config"/>={storage: true} 参数开启将列个性化 localStorage 保存功能<br>
      通过 <table-api-link prop="custom"/> 事件实现显示/隐藏列服务端保存，通过 <table-api-link prop="resizable-change"/> 事件实现列宽状态服务端保存
    </p>

    <vxe-toolbar ref="xToolbar" custom>
      <template #buttons>
        <vxe-button @click="$refs.xTable.setColumnFixed('xx4x', 'left')">按钮1</vxe-button>
        <vxe-button @click="$refs.xTable.setColumnFixed('b56', 'left')">按钮2</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable"
      height="400"
      id="toolbar_demo3"
      :custom-config="{storage: true}"
      :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-colgroup field="xx4x">
        <vxe-column field="name" title="Name" width="200"></vxe-column>
        <vxe-column field="role" title="Role" width="200"></vxe-column>
      </vxe-colgroup>
      <vxe-column field="sex" title="Sex" width="200"></vxe-column>
      <vxe-column field="age" title="Age" width="200"></vxe-column>
      <vxe-column field="z1" title="Age" width="200"></vxe-column>
      <vxe-colgroup field="vvb5">
        <vxe-column field="jk7" title="Age" width="200"></vxe-column>
        <vxe-colgroup field="vv5">
          <vxe-column field="b56" title="Age" width="200"></vxe-column>
          <vxe-column field="m77" title="Age" width="200"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-column field="j7" title="Age" width="200"></vxe-column>
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
import { VxeTableInstance, VxeToolbarInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)
    const xToolbar = ref({} as VxeToolbarInstance)

    const tableData = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
      { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
    ])

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTable.value
      const $toolbar = xToolbar.value
      $table.connect($toolbar)
    })

    return {
      xTable,
      xToolbar,
      tableData,
      demoCodes: [
        `
        <vxe-toolbar ref="xToolbar" custom>
          <template #buttons>
            <vxe-button>按钮1</vxe-button>
            <vxe-button>按钮2</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable"
          height="400"
          id="toolbar_demo3"
          :custom-config="{storage: true}"
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name"></vxe-column>
          <vxe-column field="role" title="Role"></vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref, nextTick } from 'vue'
        import { VxeTableInstance, VxeToolbarInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)
            const xToolbar = ref({} as VxeToolbarInstance)

            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
            ])

            nextTick(() => {
              // 将表格和工具栏进行关联
              const $table = xTable.value
              const $toolbar = xToolbar.value
              $table.connect($toolbar)
            })

            return {
              xTable,
              xToolbar,
              tableData
            }
          }
        })
        `
      ]
    }
  }
})
</script>

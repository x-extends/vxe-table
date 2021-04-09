<template>
  <div>
    <p class="tip">
      使用自带的工具栏 <toolbar-api-link name="vxe-toolbar"/>，配合模板可以非常简单的实现强大的功能<br>
      支持显示/隐藏列、列宽拖动状态的保存功能，还可以配合 <table-api-link prop="custom"/> 事件实现显示/隐藏列的服务端保存
    </p>

    <vxe-toolbar ref="xToolbar1" custom print></vxe-toolbar>

    <vxe-table
      border
      height="300"
      ref="xTable1"
      :print-config="{}"
      :data="demo1.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="分组信息">
        <vxe-table-colgroup title="基本信息">
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
      <vxe-table-colgroup title="其他信息">
        <vxe-table-column field="rate" title="Rate"></vxe-table-column>
      </vxe-table-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">工具栏和表格默认是上下相邻关系，通过调用 <table-api-link prop="connect"/>() 方法与表格进行关联，就可以开启相关的功能</p>

    <vxe-table
      border
      ref="xTable2"
      height="300"
      :print-config="{}"
      :loading="demo2.loading"
      :data="demo2.tableData"
      @custom="toolbarCustomEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
      <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
    </vxe-table>

    <div>
      <p>工具栏位置随意放</p>
      <div>
        <vxe-toolbar
          custom
          print
          ref="xToolbar2"
          :buttons="demo2.toolbarButtons"
          :refresh="{query: findList}">
        </vxe-toolbar>
      </div>
      <p>工具栏位置随意放</p>
    </div>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeToolbarInstance, VxeTableEvents } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable1 = ref({} as VxeTableInstance)
    const xToolbar1 = ref({} as VxeToolbarInstance)

    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTable1.value
      const $toolbar = xToolbar1.value
      $table.connect($toolbar)
    })

    const xTable2 = ref({} as VxeTableInstance)
    const xToolbar2 = ref({} as VxeToolbarInstance)

    const demo2 = reactive({
      loading: false,
      tableData: [] as any[],
      toolbarButtons: [
        { code: 'btn1', name: 'app.body.button.insert' },
        {
          name: '下拉按钮',
          dropdowns: [
            { name: '按钮111', code: 'btn2' },
            { name: '按钮222', code: 'btn3' }
          ]
        }
      ]
    })

    const findList = () => {
      demo2.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          demo2.tableData = [
            { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
            { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
            { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
            { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
            { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
            { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
            { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
            { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
          ]
          demo2.loading = false
          resolve([])
        }, 300)
      })
    }

    const toolbarCustomEvent: VxeTableEvents.Custom = (params) => {
      const $table = xTable2.value
      const visibleColumn = $table.getColumns()
      switch (params.type) {
        case 'confirm': {
          VXETable.modal.message({ content: `点击了确认，显示为 ${visibleColumn.length} 列`, status: 'info' })
          break
        }
        case 'reset': {
          VXETable.modal.message({ content: `点击了重置，显示为 ${visibleColumn.length} 列`, status: 'info' })
          break
        }
        case 'close': {
          VXETable.modal.message({ content: `关闭了面板，显示为 ${visibleColumn.length} 列`, status: 'info' })
          break
        }
      }
    }

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTable2.value
      const $toolbar = xToolbar2.value
      $table.connect($toolbar)
    })

    findList()

    return {
      xTable1,
      xToolbar1,
      demo1,
      xTable2,
      xToolbar2,
      demo2,
      findList,
      toolbarCustomEvent,
      demoCodes: [
        `
        <vxe-toolbar ref="xToolbar1" custom print></vxe-toolbar>

        <vxe-table
          border
          height="300"
          ref="xTable1"
          :print-config="{}"
          :data="demo1.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="分组信息">
            <vxe-table-colgroup title="基本信息">
              <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
              <vxe-table-column field="role" title="Role"></vxe-table-column>
            </vxe-table-colgroup>
            <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
          <vxe-table-colgroup title="其他信息">
            <vxe-table-column field="rate" title="Rate"></vxe-table-column>
          </vxe-table-colgroup>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VxeTableInstance, VxeToolbarInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable1 = ref({} as VxeTableInstance)
            const xToolbar1 = ref({} as VxeToolbarInstance)

            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            nextTick(() => {
              // 将表格和工具栏进行关联
              const $table = xTable1.value
              const $toolbar = xToolbar1.value
              $table.connect($toolbar)
            })

            return {
              xTable1,
              xToolbar1,
              demo1
            }
          }
        })
        `,
        `
        <vxe-table
          border
          ref="xTable2"
          height="300"
          :print-config="{}"
          :loading="demo2.loading"
          :data="demo2.tableData"
          @custom="toolbarCustomEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="sex" title="app.body.label.sex"></vxe-table-column>
          <vxe-table-column field="age" title="app.body.label.age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>

        <div>
          <p>工具栏位置随意放</p>
          <div>
            <vxe-toolbar
              custom
              print
              ref="xToolbar2"
              :buttons="demo2.toolbarButtons"
              :refresh="{query: findList}">
            </vxe-toolbar>
          </div>
          <p>工具栏位置随意放</p>
        </div>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VXETable, VxeTableInstance, VxeToolbarInstance, VxeTableEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable2 = ref({} as VxeTableInstance)
            const xToolbar2 = ref({} as VxeToolbarInstance)

            const demo2 = reactive({
              loading: false,
              tableData: [] as any[],
              toolbarButtons: [
                { code: 'btn1', name: 'app.body.button.insert' },
                {
                  name: '下拉按钮',
                  dropdowns: [
                    { name: '按钮111', code: 'btn2' },
                    { name: '按钮222', code: 'btn3' }
                  ]
                }
              ]
            })

            const findList = () => {
              demo2.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  demo2.tableData = [
                    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                    { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                    { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                    { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                    { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
                  ]
                  demo2.loading = false
                  resolve([])
                }, 300)
              })
            }

            const toolbarCustomEvent: VxeTableEvents.Custom = (params) => {
              const $table = xTable2.value
              const visibleColumn = $table.getColumns()
              switch (params.type) {
                case 'confirm': {
                  VXETable.modal.message({ content: \`点击了确认，显示为 \${visibleColumn.length} 列\`, status: 'info' })
                  break
                }
                case 'reset': {
                  VXETable.modal.message({ content: \`点击了重置，显示为 \${visibleColumn.length} 列\`, status: 'info' })
                  break
                }
                case 'close': {
                  VXETable.modal.message({ content: \`关闭了面板，显示为 \${visibleColumn.length} 列\`, status: 'info' })
                  break
                }
              }
            }

            nextTick(() => {
              // 将表格和工具栏进行关联
              const $table = xTable2.value
              const $toolbar = xToolbar2.value
              $table.connect($toolbar)
            })

            findList()

            return {
              xTable2,
              xToolbar2,
              demo2,
              findList,
              toolbarCustomEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>

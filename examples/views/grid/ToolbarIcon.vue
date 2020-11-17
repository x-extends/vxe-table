<template>
  <div>
    <p class="tip">自定义工具栏按钮图标，例如第三方图标库：font-awesome、inconfont，可以局部替换也可以 <router-link :to="{name: 'StartIcons'}">全部替换</router-link></p>

    <vxe-grid v-bind="gridOptions"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeGridOptions } from '../../../types/vxe-table'

export default defineComponent({
  setup () {
    const gridOptions = reactive({
      border: true,
      resizable: true,
      keepSource: true,
      height: 500,
      printConfig: {},
      importConfig: {},
      exportConfig: {},
      pagerConfig: {
        perfect: true,
        pageSize: 15
      },
      editConfig: {
        trigger: 'click',
        mode: 'row',
        showStatus: true
      },
      toolbarConfig: {
        buttons: [
          { code: 'insert_actived', name: '新增', status: 'perfect', icon: 'fa fa-plus' },
          { code: 'mark_cancel', name: 'app.body.button.markCancel', status: 'perfect', icon: 'fa fa-trash-o' },
          { code: 'save', name: 'app.body.button.save', status: 'perfect', icon: 'fa fa-save' }
        ],
        perfect: true,
        refresh: {
          icon: 'fa fa-refresh',
          iconLoading: 'fa fa-spinner fa-spin'
        },
        import: {
          icon: 'fa fa-upload'
        },
        export: {
          icon: 'fa fa-download'
        },
        print: {
          icon: 'fa fa-print'
        },
        zoom: {
          iconIn: 'fa fa-arrows-alt',
          iconOut: 'fa fa-expand'
        },
        custom: {
          icon: 'fa fa-cog'
        }
      },
      columns: [
        { type: 'checkbox', width: 50 },
        { type: 'seq', width: 60 },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
        { field: 'role', title: 'Role', editRender: { name: 'input' } },
        { field: 'address', title: 'Address', showOverflow: true, editRender: { name: 'input' } }
      ],
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' }
      ]
    } as VxeGridOptions)

    return {
      gridOptions,
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions"></vxe-grid>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeGridOptions } from 'vxe-table'

        export default defineComponent({
          setup () {
            const gridOptions = reactive({
              border: true,
              resizable: true,
              keepSource: true,
              height: 500,
              printConfig: {},
              importConfig: {},
              exportConfig: {},
              pagerConfig: {
                perfect: true,
                pageSize: 15
              },
              editConfig: {
                trigger: 'click',
                mode: 'row',
                showStatus: true
              },
              toolbarConfig: {
                buttons: [
                  { code: 'insert_actived', name: '新增', status: 'perfect', icon: 'fa fa-plus' },
                  { code: 'mark_cancel', name: 'app.body.button.markCancel', status: 'perfect', icon: 'fa fa-trash-o' },
                  { code: 'save', name: 'app.body.button.save', status: 'perfect', icon: 'fa fa-save' }
                ],
                perfect: true,
                refresh: {
                  icon: 'fa fa-refresh',
                  iconLoading: 'fa fa-spinner fa-spin'
                },
                import: {
                  icon: 'fa fa-upload'
                },
                export: {
                  icon: 'fa fa-download'
                },
                print: {
                  icon: 'fa fa-print'
                },
                zoom: {
                  iconIn: 'fa fa-arrows-alt',
                  iconOut: 'fa fa-expand'
                },
                custom: {
                  icon: 'fa fa-cog'
                }
              },
              columns: [
                { type: 'checkbox', width: 50 },
                { type: 'seq', width: 60 },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                { field: 'nickname', title: 'Nickname', editRender: { name: 'input' } },
                { field: 'role', title: 'Role', editRender: { name: 'input' } },
                { field: 'address', title: 'Address', showOverflow: true, editRender: { name: 'input' } }
              ],
              data: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' }
              ]
            } as VxeGridOptions)

            return {
              gridOptions
            }
          }
        })
        `
      ]
    }
  }
})
</script>

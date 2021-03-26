<template>
  <div>
    <p class="tip">表单，可以通过设置 <grid-api-link prop="form-config"/>={data, items} 渲染表单</p>

    <vxe-grid v-bind="gridOptions" v-on="gridEvents"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeGridProps, VxeGridListeners } from '../../../types/index'

export default defineComponent({
  setup () {
    const gridOptions = reactive({
      resizable: true,
      border: true,
      showOverflow: true,
      loading: false,
      height: 400,
      exportConfig: {},
      formConfig: {
        data: {
          name: '',
          sex: ''
        },
        items: [
          { field: 'name', title: 'app.body.label.name', itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
          { field: 'sex', title: '性别', titlePrefix: { message: '帮助信息！！！', icon: 'fa fa-info-circle' }, itemRender: { name: '$select', options: [] } },
          { itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
        ]
      },
      toolbarConfig: {
        export: true,
        custom: true
      },
      columns: [
        { type: 'seq', width: 60 },
        { type: 'checkbox', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'nickname', title: 'Nickname' },
        { field: 'age', title: 'Age' },
        { field: 'sex', title: 'Sex' },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      data: []
    } as VxeGridProps)

    const findList = () => {
      gridOptions.loading = true
      setTimeout(() => {
        gridOptions.data = [
          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0 ', age: 23, address: 'Shenzhen' },
          { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0 ', age: 30, address: 'Shanghai' }
        ]
        gridOptions.loading = false
      }, 500)
    }

    const gridEvents: VxeGridListeners = {
      formSubmit () {
        findList()
      }
    }

    findList()

    // 异步更新下拉选项
    setTimeout(() => {
      const { formConfig } = gridOptions
      if (formConfig && formConfig.items) {
        const items1 = formConfig.items[1]
        if (items1 && items1.itemRender) {
          items1.itemRender.options = [
            { value: '1', label: '男' },
            { value: '0', label: '女' }
          ]
        }
      }
    }, 200)

    return {
      gridOptions,
      gridEvents,
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions" v-on="gridEvents"></vxe-grid>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeGridProps, VxeGridListeners } from 'vxe-table'

        export default defineComponent({
          setup () {
            const gridOptions = reactive({
              resizable: true,
              border: true,
              showOverflow: true,
              loading: false,
              height: 400,
              exportConfig: {},
              formConfig: {
                data: {
                  name: '',
                  sex: ''
                },
                items: [
                  { field: 'name', title: 'app.body.label.name', itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
                  { field: 'sex', title: '性别', titlePrefix: { message: '帮助信息！！！', icon: 'fa fa-info-circle' }, itemRender: { name: '$select', options: [] } },
                  { itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
                ]
              },
              toolbarConfig: {
                export: true,
                custom: true
              },
              columns: [
                { type: 'seq', width: 60 },
                { type: 'checkbox', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'nickname', title: 'Nickname' },
                { field: 'age', title: 'Age' },
                { field: 'sex', title: 'Sex' },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              data: []
            } as VxeGridProps)

            const findList = () => {
              gridOptions.loading = true
              setTimeout(() => {
                gridOptions.data = [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0 ', age: 23, address: 'Shenzhen' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0 ', age: 30, address: 'Shanghai' }
                ]
                gridOptions.loading = false
              }, 500)
            }

            const gridEvents: VxeGridListeners = {
              formSubmit () {
                findList()
              }
            }

            findList()

            // 异步更新下拉选项
            setTimeout(() => {
              const { formConfig } = gridOptions
              if (formConfig && formConfig.items) {
                const items1 = formConfig.items[1]
                if (items1 && items1.itemRender) {
                  items1.itemRender.options = [
                    { value: '1', label: '男' },
                    { value: '0', label: '女' }
                  ]
                }
              }
            }, 200)

            return {
              gridOptions,
              gridEvents
            }
          }
        })
        `
      ]
    }
  }
})
</script>

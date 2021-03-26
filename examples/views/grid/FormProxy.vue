<template>
  <div>
    <p class="tip">表单数据代理，可以通过设置 <grid-api-link prop="form-config"/>={<grid-api-link prop="items"/>} 渲染表单</p>

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
import { VxeGridProps } from '../../../types/index'

export default defineComponent({
  setup () {
    const gridOptions = reactive({
      resizable: true,
      border: true,
      showOverflow: true,
      height: 400,
      exportConfig: {},
      pagerConfig: {
        pageSize: 10
      },
      formConfig: {
        items: [
          { field: 'name', title: '名称', itemRender: { name: 'input', attrs: { placeholder: '请输入名称' } } },
          { field: 'sex', title: '性别', itemRender: { name: '$select', options: [] } },
          { itemRender: { name: '$button', props: { content: '查询', type: 'submit', status: 'primary' } } },
          { itemRender: { name: '$button', props: { content: '重置', type: 'reset' } } }
        ]
      },
      toolbarConfig: {
        export: true,
        custom: true
      },
      proxyConfig: {
        form: true, // 启用表单代理
        ajax: {
          // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
          query: ({ page, form }) => {
            return new Promise(resolve => {
              setTimeout(() => {
                const list = [
                  { id: 10001, name: 'Test1' + form.name, nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
                  { id: 10002, name: 'Test2' + form.name, nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3' + form.name, nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4' + form.name, nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
                  { id: 10005, name: 'Test5' + form.name, nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
                  { id: 10006, name: 'Test6' + form.name, nickname: 'T6', role: 'Develop', sex: '0', age: 27, address: 'Shanghai' },
                  { id: 10007, name: 'Test7' + form.name, nickname: 'T7', role: 'Develop', sex: '1', age: 29, address: 'Shenzhen' },
                  { id: 10008, name: 'Test8' + form.name, nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
                  { id: 10009, name: 'Test9' + form.name, nickname: 'T9', role: 'Develop', sex: '1', age: 30, address: 'Shenzhen' },
                  { id: 10010, name: 'Test10' + form.name, nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' }
                ]
                resolve({
                  result: list,
                  page: {
                    totle: page.pageSize * 20
                  }
                })
              }, 500)
            })
          }
        }
      },
      columns: [
        { type: 'seq', width: 60 },
        { type: 'checkbox', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'nickname', title: 'Nickname' },
        { field: 'age', title: 'Age' },
        { field: 'sex', title: 'Sex' },
        { field: 'describe', title: 'Describe', showOverflow: true }
      ]
    } as VxeGridProps)

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
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions"></vxe-grid>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeGridProps } from 'vxe-table'

        export default defineComponent({
          setup () {
            const gridOptions = reactive({
              resizable: true,
              border: true,
              showOverflow: true,
              height: 400,
              exportConfig: {},
              pagerConfig: {
                pageSize: 10
              },
              formConfig: {
                items: [
                  { field: 'name', title: '名称', itemRender: { name: 'input', attrs: { placeholder: '请输入名称' } } },
                  { field: 'sex', title: '性别', itemRender: { name: '$select', options: [] } },
                  { itemRender: { name: '$button', props: { content: '查询', type: 'submit', status: 'primary' } } },
                  { itemRender: { name: '$button', props: { content: '重置', type: 'reset' } } }
                ]
              },
              toolbarConfig: {
                export: true,
                custom: true
              },
              proxyConfig: {
                form: true, // 启用表单代理
                ajax: {
                  // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
                  query: ({ page, form }) => {
                    return new Promise(resolve => {
                      setTimeout(() => {
                        const list = [
                          { id: 10001, name: 'Test1' + form.name, nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
                          { id: 10002, name: 'Test2' + form.name, nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
                          { id: 10003, name: 'Test3' + form.name, nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
                          { id: 10004, name: 'Test4' + form.name, nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
                          { id: 10005, name: 'Test5' + form.name, nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
                          { id: 10006, name: 'Test6' + form.name, nickname: 'T6', role: 'Develop', sex: '0', age: 27, address: 'Shanghai' },
                          { id: 10007, name: 'Test7' + form.name, nickname: 'T7', role: 'Develop', sex: '1', age: 29, address: 'Shenzhen' },
                          { id: 10008, name: 'Test8' + form.name, nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
                          { id: 10009, name: 'Test9' + form.name, nickname: 'T9', role: 'Develop', sex: '1', age: 30, address: 'Shenzhen' },
                          { id: 10010, name: 'Test10' + form.name, nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' }
                        ]
                        resolve({
                          result: list,
                          page: {
                            totle: page.pageSize * 20
                          }
                        })
                      }, 500)
                    })
                  }
                }
              },
              columns: [
                { type: 'seq', width: 60 },
                { type: 'checkbox', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'nickname', title: 'Nickname' },
                { field: 'age', title: 'Age' },
                { field: 'sex', title: 'Sex' },
                { field: 'describe', title: 'Describe', showOverflow: true }
              ]
            } as VxeGridProps)

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

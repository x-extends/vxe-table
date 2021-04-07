<template>
  <div>
    <p class="tip">设置 <table-column-api-link prop="edit-render"/>.<table-column-api-link prop="placeholder"/> 启用占位符，但单元格内容为空时，则显示占位符的内容</p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData1"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', placeholder: '请点击输入...', attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="nickname" title="Role" :edit-render="{name: 'input', placeholder: '请输入昵称', attrs: {type: 'text', placeholder: '请输入昵称'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', placeholder: '请选择', options: sexList1}"></vxe-table-column>
      <vxe-table-column field="sex2" title="多选下拉" :edit-render="{name: '$select', placeholder: '请选择', options: sexList1, props: {multiple: true, placeholder: '请选择'}}"></vxe-table-column>
      <vxe-table-column field="num1" title="Amount" :edit-render="{name: '$input', placeholder: '请输入数值', props: {type: 'float', digits: 2, placeholder: '请输入数值'}}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', placeholder: '请选择日期', props: {type: 'date', placeholder: '请选择日期'}}"></vxe-table-column>
      <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week', placeholder: '请选择日期'}}"></vxe-table-column>
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

export default defineComponent({
  setup () {
    const tableData1 = ref([
      { id: 10001, name: '', nickname: 'T1', role: 'Develop', sex: '', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
      { id: 10003, name: '', nickname: 'T3', role: '', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: '', sex: '', sex2: [], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
      { id: 10005, name: 'Test5', nickname: '', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
      { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
      { id: 10007, name: '', nickname: '', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
      { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '', sex2: [], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
    ])

    const sexList1 = ref([
      { label: '', value: '' },
      { label: '男', value: '1' },
      { label: '女', value: '0' }
    ])

    return {
      tableData1,
      sexList1,
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData1"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', placeholder: '请点击输入...', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="nickname" title="Role" :edit-render="{name: 'input', placeholder: '请输入昵称', attrs: {type: 'text', placeholder: '请输入昵称'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', placeholder: '请选择', options: sexList1}"></vxe-table-column>
          <vxe-table-column field="sex2" title="多选下拉" :edit-render="{name: '$select', placeholder: '请选择', options: sexList1, props: {multiple: true, placeholder: '请选择'}}"></vxe-table-column>
          <vxe-table-column field="num1" title="Amount" :edit-render="{name: '$input', placeholder: '请输入数值', props: {type: 'float', digits: 2, placeholder: '请输入数值'}}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', placeholder: '请选择日期', props: {type: 'date', placeholder: '请选择日期'}}"></vxe-table-column>
          <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week', placeholder: '请选择日期'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData1 = ref([
              { id: 10001, name: '', nickname: 'T1', role: 'Develop', sex: '', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
              { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
              { id: 10003, name: '', nickname: 'T3', role: '', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
              { id: 10004, name: 'Test4', nickname: 'T4', role: '', sex: '', sex2: [], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
              { id: 10005, name: 'Test5', nickname: '', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
              { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
              { id: 10007, name: '', nickname: '', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
              { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '', sex2: [], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
            ])

            const sexList1 = ref([
              { label: '', value: '' },
              { label: '男', value: '1' },
              { label: '女', value: '0' }
            ])

            return {
              tableData1,
              sexList1
            }
          }
        })
        `
      ]
    }
  }
})
</script>

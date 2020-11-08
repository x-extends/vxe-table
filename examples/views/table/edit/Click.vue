<template>
  <div>
    <p class="tip">设置 <table-api-link prop="edit-config"/>={trigger: 'click', mode: 'cell'} 启用单元格点击编辑的功能</p>

    <vxe-table
      border
      resizable
      :data="tableData1"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="nickname" title="Role" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList1}"></vxe-table-column>
      <vxe-table-column field="sex2" title="多选下拉" :edit-render="{name: '$select', options: sexList1, props: {multiple: true}}"></vxe-table-column>
      <vxe-table-column field="num1" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
      <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">设置 <table-api-link prop="edit-config"/>={trigger: 'click', mode: 'row'} 启用行点击编辑的功能</p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData2"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="分组1">
        <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
        <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList2}"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="分组2">
        <vxe-table-column field="num1" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
        <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'textarea'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const tableData1 = ref([
      { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
    ])

    const sexList1 = ref([
      { label: '', value: '' },
      { label: '男', value: '1' },
      { label: '女', value: '0' }
    ])

    const tableData2 = ref([
      { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
    ])

    const sexList2 = ref([
      { label: '', value: '' },
      { label: '男', value: '1' },
      { label: '女', value: '0' }
    ])

    return {
      tableData1,
      sexList1,
      tableData2,
      sexList2,
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          :data="tableData1"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="nickname" title="Role" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList1}"></vxe-table-column>
          <vxe-table-column field="sex2" title="多选下拉" :edit-render="{name: '$select', options: sexList1, props: {multiple: true}}"></vxe-table-column>
          <vxe-table-column field="num1" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
          <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData1 = ref([
              { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
              { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
              { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
              { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
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
        `,
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData2"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="分组1">
            <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
            <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList2}"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="分组2">
            <vxe-table-column field="num1" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
            <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
            <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'textarea'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData2 = ref([
              { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
              { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
              { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
              { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
            ])

            const sexList2 = ref([
              { label: '', value: '' },
              { label: '男', value: '1' },
              { label: '女', value: '0' }
            ])

            return {
              tableData2,
              sexList2
            }
          }
        })
        `
      ]
    }
  }
})
</script>

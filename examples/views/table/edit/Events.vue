<template>
  <div>
    <p class="tip">通过 <table-column-api-link prop="events"/> 自定义目标组件的事件<br><span class="red">（注：具体请查看目标组件所支持的事件）</span></p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="demo1.tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input', events: {input: nameChangeEvent}}"></vxe-column>
      <vxe-column field="role" title="Role" :edit-render="{name: '$input', events: {input: roleChangeEvent}}"></vxe-column>
      <vxe-column
        field="nickname"
        title="Nickname"
        :filters="demo1.nicknameOptions"
        :filter-render="{name: 'input', attrs: {placeholder: '按回车确认筛选'}, events: {keyup: enterFilterEvent}}"
        :edit-render="{name: 'input', events: {focus: roleFocusEvent}}"></vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{name: '$select', options: demo1.sexList, events: {change: sexChangeEvent}}"></vxe-column>
      <vxe-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}, events: {change: dateChangeEvent}}"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
      ],
      sexList: [
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ],
      nicknameOptions: [{ data: '' }]
    })

    const enterFilterEvent = ({ $panel }: any, event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        console.log('筛选回车事件')
        $panel.confirmFilter()
      }
    }

    const nameChangeEvent = ({ column }: any) => {
      console.log(`${column.title} 触发 input 事件`)
    }

    const roleChangeEvent = ({ column }: any) => {
      console.log(`${column.title} 触发 input 事件`)
    }

    const roleFocusEvent = ({ column }: any) => {
      console.log(`${column.title} 触发 focus 事件`)
    }

    const sexChangeEvent = ({ column }: any) => {
      console.log(`${column.title} 触发 change 事件`)
    }

    const dateChangeEvent = ({ column }: any) => {
      console.log(`${column.title} 触发 change 事件`)
    }

    return {
      demo1,
      enterFilterEvent,
      nameChangeEvent,
      roleChangeEvent,
      roleFocusEvent,
      sexChangeEvent,
      dateChangeEvent,
      demoCodes: []
    }
  }
})
</script>

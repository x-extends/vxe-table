<template>
  <div>
    <p class="tip">通过 <table-column-api-link prop="events"/> 自定义目标组件的事件<br><span class="red">（注：具体请查看目标组件所支持的事件）</span></p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', events: {input: nameChangeEvent}}"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{name: '$input', events: {input: roleChangeEvent}}"></vxe-table-column>
      <vxe-table-column
        field="nickname"
        title="Nickname"
        :filters="[{ data: '' }]"
        :filter-render="{name: 'input', attrs: {placeholder: '按回车确认筛选'}, events: {keyup: enterFilterEvent}}"
        :edit-render="{name: 'input', events: {focus: roleFocusEvent}}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList, events: {change: sexChangeEvent}}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}, events: {change: dateChangeEvent}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
      ],
      sexList: [
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', events: {input: nameChangeEvent}}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: '$input', events: {input: roleChangeEvent}}"></vxe-table-column>
          <vxe-table-column
            field="nickname"
            title="Nickname"
            :filters="[{ data: '' }]"
            :filter-render="{name: 'input', attrs: {placeholder: '按回车确认筛选'}, events: {keyup: enterFilterEvent}}"
            :edit-render="{name: 'input', events: {focus: roleFocusEvent}}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList, events: {change: sexChangeEvent}}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}, events: {change: dateChangeEvent}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
              ],
              sexList: [
                { label: '女', value: '0' },
                { label: '男', value: '1' }
              ]
            }
          },
          methods: {
            enterFilterEvent ({ $panel, column }, event) {
              if (event.keyCode === 13) {
                console.log('筛选回车事件')
                $panel.confirmFilter()
              }
            },
            nameChangeEvent ({ column }) {
              console.log(\`\${column.title} 触发 input 事件\`)
            },
            roleChangeEvent ({ column }) {
              console.log(\`\${column.title} 触发 input 事件\`)
            },
            roleFocusEvent ({ column }) {
              console.log(\`\${column.title} 触发 focus 事件\`)
            },
            sexChangeEvent ({ column }) {
              console.log(\`\${column.title} 触发 change 事件\`)
            },
            dateChangeEvent ({ column }) {
              console.log(\`\${column.title} 触发 change 事件\`)
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    enterFilterEvent ({ $panel }, event) {
      if (event.keyCode === 13) {
        console.log('筛选回车事件')
        $panel.confirmFilter()
      }
    },
    nameChangeEvent ({ column }) {
      console.log(`${column.title} 触发 input 事件`)
    },
    roleChangeEvent ({ column }) {
      console.log(`${column.title} 触发 input 事件`)
    },
    roleFocusEvent ({ column }) {
      console.log(`${column.title} 触发 focus 事件`)
    },
    sexChangeEvent ({ column }) {
      console.log(`${column.title} 触发 change 事件`)
    },
    dateChangeEvent ({ column }) {
      console.log(`${column.title} 触发 change 事件`)
    }
  }
}
</script>

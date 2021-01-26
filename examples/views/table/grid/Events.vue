<template>
  <div>
    <p class="tip">通过 <table-column-api-link prop="events"/> 自定义目标组件的事件<br><span class="red">（注：具体请查看目标组件所支持的事件）</span></p>

    <vxe-grid v-bind="gridOptions"></vxe-grid>

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
      gridOptions: {
        border: true,
        resizable: true,
        showOverflow: true,
        editConfig: {
          trigger: 'click',
          mode: 'cell'
        },
        columns: [
          { type: 'seq', width: 60 },
          { field: 'name', title: 'Name', editRender: { name: 'input', events: { input: this.nameChangeEvent } } },
          { field: 'role', title: 'Role', editRender: { name: '$input', events: { input: this.roleChangeEvent } } },
          {
            field: 'age',
            title: 'Age',
            filters: [{ data: '' }],
            filterRender: { name: 'input', attrs: { placeholder: '按回车确认筛选' }, events: { keyup: this.enterFilterEvent } },
            editRender: { name: 'input', events: { focus: this.ageFocusEvent } }
          },
          {
            field: 'sex',
            title: 'Sex',
            editRender: {
              name: '$select',
              options: [
                { label: '女', value: '0' },
                { label: '男', value: '1' }
              ],
              events: {
                change: this.sexChangeEvent
              }
            }
          },
          { field: 'date', title: 'Date', editRender: { name: '$input', props: { type: 'date' }, events: { change: this.dateChangeEvent } } }
        ],
        data: [
          { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, date: '2021-03-13' },
          { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, date: '2021-01-05' },
          { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, date: '2021-04-13' },
          { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, date: '2021-09-13' },
          { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, date: '2021-10-13' },
          { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, date: '2021-01-33' }
        ]
      },
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              gridOptions: {
                border: true,
                resizable: true,
                showOverflow: true,
                editConfig: {
                  trigger: 'click',
                  mode: 'cell'
                },
                columns: [
                  { type: 'seq', width: 60 },
                  { field: 'name', title: 'Name', editRender: { name: 'input', events: { input: this.nameChangeEvent } } },
                  { field: 'role', title: 'Role', editRender: { name: '$input', events: { input: this.roleChangeEvent } } },
                  {
                    field: 'age',
                    title: 'Age',
                    filters: [{ data: '' }],
                    filterRender: { name: 'input', attrs: { placeholder: '按回车确认筛选' }, events: { keyup: this.enterFilterEvent } },
                    editRender: { name: 'input', events: { focus: this.ageFocusEvent } }
                  },
                  {
                    field: 'sex',
                    title: 'Sex',
                    editRender: {
                      name: '$select',
                      options: [
                        { label: '女', value: '0' },
                        { label: '男', value: '1' }
                      ],
                      events: {
                        change: this.sexChangeEvent
                      }
                    }
                  },
                  { field: 'date', title: 'Date', editRender: { name: '$input', props: { type: 'date' }, events: { change: this.dateChangeEvent } } }
                ],
                data: [
                  { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, date: '2021-03-13' },
                  { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, date: '2021-01-05' },
                  { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, date: '2021-04-13' },
                  { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, date: '2021-09-13' },
                  { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, date: '2021-10-13' },
                  { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, date: '2021-01-33' }
                ]
              }
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
            ageFocusEvent ({ column }) {
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
    ageFocusEvent ({ column }) {
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

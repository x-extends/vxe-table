<template>
  <div>
    <p class="tip">通过 <table-column-api-link prop="events"/> 自定义目标组件的事件<br><span class="red">（注：具体请查看目标组件所支持的事件）</span></p>

    <vxe-table
      border
      resizable
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
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      sexList: [],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
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
              tableData: [],
              sexList: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
            this.findSexList()
          },
          methods: {
            findSexList () {
              return XEAjax.get('/api/conf/sex/list').then(data => {
                this.sexList = data
              })
            },
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
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
    this.findSexList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findSexList () {
      return XEAjax.get('/api/conf/sex/list').then(data => {
        this.sexList = data
      })
    },
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

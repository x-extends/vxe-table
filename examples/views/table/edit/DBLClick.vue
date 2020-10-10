<template>
  <div>
    <p class="tip">设置 <table-api-link prop="edit-config"/>={trigger: 'dblclick', mode: 'cell'} 启用单元格双击编辑的功能<br></p>

    <vxe-table
      border
      resizable
      :data="tableData"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="sex6" title="Sex" :edit-render="{name: '$select', options: sexList, optionProps: {value: 'value2', label: 'label'}}"></vxe-table-column>
      <vxe-table-column field="sex1" title="多选下拉" :edit-render="{name: '$select', options: sexList, props: {multiple: true}}"></vxe-table-column>
      <vxe-table-column field="num1" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
      <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">设置 <table-api-link prop="edit-config"/>={trigger: 'dblclick', mode: 'row'} 启用行双击编辑的功能</p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'dblclick', mode: 'row'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="sex4" title="Sex" :edit-render="{name: '$select', options: sexList, optionProps: {value: 'value2', label: 'spell'}}"></vxe-table-column>
      <vxe-table-column field="num6" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="date13" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
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
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="sex6" title="Sex" :edit-render="{name: '$select', options: sexList, optionProps: {value: 'value2', label: 'label'}}"></vxe-table-column>
          <vxe-table-column field="sex1" title="多选下拉" :edit-render="{name: '$select', options: sexList, props: {multiple: true}}"></vxe-table-column>
          <vxe-table-column field="num1" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
          <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
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
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'dblclick', mode: 'row'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="sex4" title="Sex" :edit-render="{name: '$select', options: sexList, optionProps: {value: 'value2', label: 'spell'}}"></vxe-table-column>
          <vxe-table-column field="num6" title="Number" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="date13" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'input', immediate: true, attrs: {type: 'text'}}"></vxe-table-column>
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
    }
  }
}
</script>

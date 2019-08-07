<template>
  <div>
    <p>具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a> 适配插件的 API</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      class="vxe-table-element"
      height="400"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="ElInput" :filters="[{data: ''}]" :filter-render="{name: 'ElInput', props: {placeholder: '请输入名称'}}"></vxe-table-column>
      <vxe-table-column field="age" title="ElInputNumber" sortable :filters="[{data: 0}]" :filter-render="{name: 'ElInputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
      <vxe-table-column field="role" title="ElAutocomplete" :filters="[{data: ''}]" :filter-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions, placeholder: '请输入角色名称'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="ElSelect" :filters="[{data: null}]" :filter-render="{name: 'ElSelect', options: sexList, props: {placeholder: '请选择'}}"></vxe-table-column>
      <vxe-table-column field="sex1" title="ElSelect" :filters="[{data: []}]" :filter-render="{name: 'ElSelect', options: sexList, props: {multiple: true, placeholder: '请选择'}}"></vxe-table-column>
      <vxe-table-column field="date3" title="ElDatePicker" :filters="[{data: []}]" :filter-render="{name: 'ElDatePicker', props: {type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期'}}"></vxe-table-column>
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
      restaurants: [
        { value: '前端', name: '前端' },
        { value: '后端', name: '后端' },
        { value: '开发', name: '开发' },
        { value: '测试', name: '测试' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          class="vxe-table-element"
          height="400"
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="ElInput" :filters="[{data: ''}]" :filter-render="{name: 'ElInput', props: {placeholder: '请输入名称'}}"></vxe-table-column>
          <vxe-table-column field="age" title="ElInputNumber" sortable :filters="[{data: 0}]" :filter-render="{name: 'ElInputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
          <vxe-table-column field="role" title="ElAutocomplete" :filters="[{data: ''}]" :filter-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions, placeholder: '请输入角色名称'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="ElSelect" :filters="[{data: null}]" :filter-render="{name: 'ElSelect', options: sexList, props: {placeholder: '请选择'}}"></vxe-table-column>
          <vxe-table-column field="sex1" title="ElSelect" :filters="[{data: []}]" :filter-render="{name: 'ElSelect', options: sexList, props: {multiple: true, placeholder: '请选择'}}"></vxe-table-column>
          <vxe-table-column field="date3" title="ElDatePicker" :filters="[{data: []}]" :filter-render="{name: 'ElDatePicker', props: {type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              sexList: [],
              restaurants: [
                { value: '前端', name: '前端' },
                { value: '后端', name: '后端' },
                { value: '开发', name: '开发' },
                { value: '测试', name: '测试' }
              ]
            }
          },
          created () {
            this.findSexList()
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
          },
          methods: {
            findSexList () {
              return XEAjax.doGet('/api/conf/sex/list').then(({ data }) => {
                this.sexList = data
                return data
              })
            },
            roleFetchSuggestions (queryString, cb) {
              var restaurants = this.restaurants
              var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
              clearTimeout(this.timeout)
              this.timeout = setTimeout(() => {
                cb(results)
              }, 1000 * Math.random())
            },
            createStateFilter (queryString) {
              return (state) => {
                return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findSexList()
    this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findSexList () {
      return XEAjax.doGet('/api/conf/sex/list').then(({ data }) => {
        this.sexList = data
        return data
      })
    },
    roleFetchSuggestions (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>

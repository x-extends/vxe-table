<template>
  <div>
    <p class="tip">具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a> 适配插件的 API</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      height="400"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="ElInput" width="100" :filters="[{data: ''}]" :filter-render="{name: 'ElInput', props: {placeholder: '请输入名称'}}"></vxe-table-column>
      <vxe-table-column field="age" title="ElInputNumber" sortable width="180" :filters="[{data: 0}]" :filter-render="{name: 'ElInputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
      <vxe-table-column field="role" title="ElAutocomplete" width="160" :filters="[{data: ''}]" :filter-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions, placeholder: '请输入角色名称'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="ElSelect" width="100" :formatter="formatterSex" :filters="[{data: null}]" :filter-render="{name: 'ElSelect', options: sexList, props: {placeholder: '请选择'}}"></vxe-table-column>
      <vxe-table-column field="sex1" title="ElSelect" width="100" :formatter="formatterSexs" :filters="[{data: []}]" :filter-render="{name: 'ElSelect', options: sexList, props: {multiple: true, placeholder: '请选择'}}"></vxe-table-column>
      <vxe-table-column field="date3" title="ElDatePicker" width="140" :filters="[{data: []}]" :filter-render="{name: 'ElDatePicker', props: {type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期'}}"></vxe-table-column>
      <vxe-table-column field="flag" title="ElSwitch" width="100" :filters="[{data: null}]" :filter-render="{name: 'ElSwitch'}" :cell-render="{name: 'ElSwitch', props: {disabled: true}}"></vxe-table-column>
      <vxe-table-column field="rate" title="ElRate" width="180" sortable :filters="[{data: 0}]" :filter-render="{name: 'ElRate'}" :cell-render="{name: 'ElRate', props: {disabled: true}}"></vxe-table-column>
      <vxe-table-column field="slider" title="ElSlider" width="180" sortable :filters="[{data: 0}]" :filter-render="{name: 'ElSlider'}" :cell-render="{name: 'ElSlider', props: {disabled: true}}"></vxe-table-column>
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
          height="400"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="ElInput" width="100" :filters="[{data: ''}]" :filter-render="{name: 'ElInput', props: {placeholder: '请输入名称'}}"></vxe-table-column>
          <vxe-table-column field="age" title="ElInputNumber" sortable width="180" :filters="[{data: 0}]" :filter-render="{name: 'ElInputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
          <vxe-table-column field="role" title="ElAutocomplete" width="160" :filters="[{data: ''}]" :filter-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions, placeholder: '请输入角色名称'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="ElSelect" width="100" :formatter="formatterSex" :filters="[{data: null}]" :filter-render="{name: 'ElSelect', options: sexList, props: {placeholder: '请选择'}}"></vxe-table-column>
          <vxe-table-column field="sex1" title="ElSelect" width="100" :formatter="formatterSexs" :filters="[{data: []}]" :filter-render="{name: 'ElSelect', options: sexList, props: {multiple: true, placeholder: '请选择'}}"></vxe-table-column>
          <vxe-table-column field="date3" title="ElDatePicker" width="140" :filters="[{data: []}]" :filter-render="{name: 'ElDatePicker', props: {type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期'}}"></vxe-table-column>
          <vxe-table-column field="flag" title="ElSwitch" width="100" :filters="[{data: null}]" :filter-render="{name: 'ElSwitch'}" :cell-render="{name: 'ElSwitch', props: {disabled: true}}"></vxe-table-column>
          <vxe-table-column field="rate" title="ElRate" width="180" sortable :filters="[{data: 0}]" :filter-render="{name: 'ElRate'}" :cell-render="{name: 'ElRate', props: {disabled: true}}"></vxe-table-column>
          <vxe-table-column field="slider" title="ElSlider" width="180" sortable :filters="[{data: 0}]" :filter-render="{name: 'ElSlider'}" :cell-render="{name: 'ElSlider', props: {disabled: true}}"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
          },
          methods: {
            findSexList () {
              return XEAjax.get('/api/conf/sex/list').then(data => {
                this.sexList = data
                return data
              })
            },
            formatterSex ({ cellValue }) {
              return cellValue === '1' ? '男' : cellValue === '0' ? '女' : ''
            },
            formatterSexs ({ cellValue }) {
              return cellValue ? cellValue.map(value => value === '1' ? '男' : value === '0' ? '女' : '').join(';') : ''
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
    this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
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
        return data
      })
    },
    formatterSex ({ cellValue }) {
      return cellValue === '1' ? '男' : cellValue === '0' ? '女' : ''
    },
    formatterSexs ({ cellValue }) {
      return cellValue ? cellValue.map(value => value === '1' ? '男' : value === '0' ? '女' : '').join(';') : ''
    },
    roleFetchSuggestions (queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
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

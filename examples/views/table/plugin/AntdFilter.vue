<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://github.com/xuliangzhan/vxe-table-plugin-iview" target="_blank">vxe-table-plugin-iview</a> 适配插件的 API<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      height="400"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="AInput" :filters="[{data: ''}]" :filter-render="{name: 'AInput', props: {placeholder: '请输入名称'}}"></vxe-table-column>
      <vxe-table-column field="age" title="AInputNumber" sortable width="160" :filters="[{data: 0}]" :filter-render="{name: 'AInputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
      <vxe-table-column field="sex" title="ASelect" :formatter="formatterSex" :filters="[{data: null}]" :filter-render="{name: 'ASelect', options: sexList, props: {placeholder: '请选择'}}"></vxe-table-column>
      <vxe-table-column field="sex1" title="ASelect" :formatter="formatterSexs" :filters="[{data: []}]" :filter-render="{name: 'ASelect', options: sexList, props: {mode: 'multiple', placeholder: '请选择'}}"></vxe-table-column>
      <vxe-table-column field="role" title="AAutoComplete" width="160" :filters="[{data: ''}]" :filter-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-table-column>
      <vxe-table-column field="flag" title="ASwitch" width="100" :filters="[{data: null}]" :filter-render="{name: 'ASwitch'}" :cell-render="{name: 'ASwitch', props: {disabled: true}}"></vxe-table-column>
      <vxe-table-column field="rate" title="ARate" width="180" sortable :filters="[{data: 0}]" :filter-render="{name: 'ARate'}" :cell-render="{name: 'ARate', props: {disabled: true}}"></vxe-table-column>
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
      restaurants: ['前端', '后端', '开发', '测试'],
      ACProps: {
        dataSource: [],
        placeholder: '请输入角色名称'
      },
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          height="400"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="AInput" :filters="[{data: ''}]" :filter-render="{name: 'AInput', props: {placeholder: '请输入名称'}}"></vxe-table-column>
          <vxe-table-column field="age" title="AInputNumber" sortable width="160" :filters="[{data: 0}]" :filter-render="{name: 'AInputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
          <vxe-table-column field="sex" title="ASelect" :formatter="formatterSex" :filters="[{data: null}]" :filter-render="{name: 'ASelect', options: sexList, props: {placeholder: '请选择'}}"></vxe-table-column>
          <vxe-table-column field="sex1" title="ASelect" :formatter="formatterSexs" :filters="[{data: []}]" :filter-render="{name: 'ASelect', options: sexList, props: {mode: 'multiple', placeholder: '请选择'}}"></vxe-table-column>
          <vxe-table-column field="role" title="AAutoComplete" width="160" :filters="[{data: ''}]" :filter-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-table-column>
          <vxe-table-column field="flag" title="ASwitch" width="100" :filters="[{data: null}]" :filter-render="{name: 'ASwitch'}" :cell-render="{name: 'ASwitch', props: {disabled: true}}"></vxe-table-column>
          <vxe-table-column field="rate" title="ARate" width="180" sortable :filters="[{data: 0}]" :filter-render="{name: 'ARate'}" :cell-render="{name: 'ARate', props: {disabled: true}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              restaurants: ['前端', '后端', '开发', '测试'],
              ACProps: {
                dataSource: [],
                placeholder: '请输入角色名称'
              }
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
            roleSearchEvent ({ row }, value) {
              this.ACProps.dataSource = this.restaurants.filter(option => option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
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
    roleSearchEvent (params, value) {
      this.ACProps.dataSource = this.restaurants.filter(option => option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
    }
  }
}
</script>

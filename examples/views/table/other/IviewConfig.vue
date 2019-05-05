<template>
  <div>
    <p>使用配置式的插件</p>

    <pre>
      <code>
        import VXETable from 'vxe-table'
        import VXETableIViewPlugin from 'vxe-table/lib/plugins/iview'

        VXETable.setup(VXETableIViewPlugin)
      </code>
    </pre>

    <p>使用 edit-render 简化配置</p>

    <vxe-table
      border
      show-footer
      class="vxe-table-iview"
      height="400"
      :loading="loading"
      :data.sync="tableData"
      :footer-method="footerMethod"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Input"  min-width="140" :edit-render="{name: 'Input'}"></vxe-table-column>
      <vxe-table-column prop="age" label="InputNumber"  width="140" :edit-render="{name: 'InputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Select"  width="140" :edit-render="{name: 'Select', options: sexList}"></vxe-table-column>
      <vxe-table-column prop="region" label="Cascader"  width="200" :edit-render="{name: 'Cascader', props: {data: regionList}}"> </vxe-table-column>
      <vxe-table-column prop="date" label="DatePicker"  width="200" :edit-render="{name: 'DatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
      <vxe-table-column prop="date2" label="TimePicker"  width="200" :edit-render="{name: 'TimePicker', props: {type: 'time'}}"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200" :edit-render="{name: 'Rate', type: 'visible'}"></vxe-table-column>
      <vxe-table-column prop="flag" label="iSwitch" width="100" fixed="right" :edit-render="{name: 'iSwitch', type: 'visible'}"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      sexList: [],
      regionList: []
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      let list = window.CACHE_DATA_LIST.slice(0, 50)
      this.tableData = list
      this.loading = false
    }, 500)
    this.findSexList()
    this.findRegionList()
  },
  mounted () {
    this.$el.querySelectorAll('pre').forEach((block) => {
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
    findRegionList () {
      return XEAjax.doGet('/api/conf/region/list').then(({ data }) => {
        this.regionList = data
        return data
      })
    },
    formatDate (value, format) {
      return XEUtils.toDateString(value, format)
    },
    getSelectLabel (value, list, valueProp = 'value', labelProp = 'label') {
      let item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelProp] : null
    },
    getCascaderLabel (value, list) {
      let values = value || []
      let labels = []
      let matchCascaderData = function (index, list) {
        let val = values[index]
        if (list && values.length > index) {
          list.forEach(item => {
            if (item.value === val) {
              labels.push(item.label)
              matchCascaderData(++index, item.children)
            }
          })
        }
      }
      matchCascaderData(0, list)
      return labels.join(' / ')
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return '-'
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return '-'
        })
      ]
    }
  }
}
</script>

<style>
/*使用 iview 需要覆盖以下样式*/
.vxe-table-iview .vxe-cell > .ivu-input-wrapper,
.vxe-table-iview .vxe-cell > .ivu-input-number,
.vxe-table-iview .vxe-cell > .ivu-select,
.vxe-table-iview .vxe-cell > .ivu-cascader,
.vxe-table-iview .vxe-cell > .ivu-date-picker-editor {
  width: 100%;
}
</style>

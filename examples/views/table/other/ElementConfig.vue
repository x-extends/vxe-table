<template>
  <div>
    <p>使用配置式的插件</p>

    <pre>
      <code>
        import VXETable from 'vxe-table'
        import VXETableElementPlugin from 'vxe-table/lib/plugins/element'

        VXETable.setup(VXETableElementPlugin)
      </code>
    </pre>

    <p>使用 edit-render 简化配置</p>

    <vxe-table
      border
      class="vxe-table-element"
      height="400"
      :loading="loading"
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="ElInput" min-width="140" :edit-render="{name: 'ElInput'}"></vxe-table-column>
      <vxe-table-column prop="age" label="ElInputNumber"  width="140" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column prop="sex" label="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList}"></vxe-table-column>
      <vxe-table-column prop="region" label="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: regionList}}"></vxe-table-column>
      <vxe-table-column prop="date" label="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
      <vxe-table-column prop="date1" label="DateTimePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss'}}"></vxe-table-column>
      <vxe-table-column prop="date2" label="ElTimeSelect"  width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-table-column>
      <vxe-table-column prop="rate" label="ElRate" width="200" :edit-render="{name: 'ElRate', type: 'visible'}"></vxe-table-column>
      <vxe-table-column prop="flag" label="ElSwitch" width="100" fixed="right" :edit-render="{name: 'ElSwitch', type: 'visible'}"></vxe-table-column>
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
/*使用 element-ui 需要覆盖以下样式*/
.vxe-table-element .vxe-cell > .el-input,
.vxe-table-element .vxe-cell > .el-input-number,
.vxe-table-element .vxe-cell > .el-select,
.vxe-table-element .vxe-cell > .el-cascader,
.vxe-table-element .vxe-cell > .el-date-editor {
  width: 100%;
}
</style>

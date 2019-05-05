<template>
  <div>
    <p>自定义渲染 iview 组件</p>

    <vxe-table
      border
      show-footer
      class="vxe-table-iview"
      height="600"
      :loading="loading"
      :data.sync="tableData"
      :footer-method="footerMethod"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Input"  min-width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <Input v-model="row.name"/>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="age" label="InputNumber"  width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <InputNumber v-model="row.age" :max="35" :min="18"></InputNumber>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="sex" label="Select"  width="140" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <Select v-model="row.sex">
            <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </template>
        <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
      </vxe-table-column>
      <vxe-table-column prop="region" label="Cascader"  width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <Cascader v-model="row.region" :data="regionList"></Cascader>
        </template>
        <template v-slot="{ row }">{{ getCascaderLabel(row.region, regionList) }}</template>
      </vxe-table-column>
      <vxe-table-column prop="date" label="DatePicker"  width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <DatePicker v-model="row.date" type="date" format="yyyy/MM/dd"></DatePicker>
        </template>
        <template v-slot="{ row }">{{ formatDate(row.date, 'yyyy/MM/dd') }}</template>
      </vxe-table-column>
      <vxe-table-column prop="date2" label="TimePicker"  width="200" :edit-render="{type: 'default'}">
        <template v-slot:edit="{ row }">
          <TimePicker v-model="row.date2" type="time"></TimePicker>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <Rate v-model="row.rate" />
        </template>
      </vxe-table-column>
      <vxe-table-column prop="flag" label="iSwitch" width="100" fixed="right" :edit-render="{type: 'visible'}">
        <template v-slot:edit="{ row }">
          <iSwitch v-model="row.flag"/>
        </template>
      </vxe-table-column>
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

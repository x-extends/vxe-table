<template>
  <div>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-input class="search-input" v-model="filterName" type="search" :placeholder="`vxe-${$route.params.name} API 搜索`"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      highlight-current-row
      highlight-hover-row
      :data.sync="apiList"
      :tree-config="{key: 'id', children: 'list', expandAll: !!filterName, expandRowKeys: defaultExpandRowKeys, trigger: 'cell'}">
      <vxe-table-column prop="name" label="属性" width="280" tree-node>
        <template v-slot="{ row }">
          <span v-html="row.name"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="desc" label="说明">
        <template v-slot="{ row }">
          <span v-html="row.desc"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="type" label="类型 / 返回类型" width="160">
        <template v-slot="{ row }">
          <span v-html="row.type"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="enum" label="可选值" width="180">
        <template v-slot="{ row }">
          <span v-html="row.enum"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="defVal" label="默认值 / 参数" width="180">
        <template v-slot="{ row }">
          <span v-html="row.defVal"></span>
        </template>
      </vxe-table-column>
      <template v-slot:empty>
        <span>找不对应 API，请输入正确的关键字！</span>
      </template>
    </vxe-table>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import tableAPI from '../../../api/table'
import tableColumnAPI from '../../../api/table-column'
import toolbarAPI from '../../../api/toolbar'
import gridAPI from '../../../api/grid'
import excelAPI from '../../../api/excel'
import pagerAPI from '../../../api/pager'
import radioAPI from '../../../api/radio'
import checkboxAPI from '../../../api/checkbox'
import inputAPI from '../../../api/input'
import buttonAPI from '../../../api/button'
import alertAPI from '../../../api/alert'
import tooltipAPI from '../../../api/tooltip'

export default {
  data () {
    return {
      filterName: this.$route.query.filterName,
      tableData: [],
      defaultExpandRowKeys: []
    }
  },
  computed: {
    apiList () {
      if (this.filterName) {
        let filterName = this.filterName.toLowerCase()
        let filterRE = new RegExp(filterName, 'gi')
        let rest = XEUtils.searchTree(this.tableData, item => item.name.toLowerCase().indexOf(filterName) > -1 || item.desc.toLowerCase().indexOf(filterName) > -1 || item.type.toLowerCase().indexOf(filterName) > -1 || item.enum.toLowerCase().indexOf(filterName) > -1 || item.defVal.toLowerCase().indexOf(filterName) > -1, { children: 'list' })
        XEUtils.eachTree(rest, item => {
          item.name = item.name.replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          item.desc = item.desc.replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          item.type = item.type.replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          item.enum = item.enum.replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          item.defVal = item.defVal.replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
        }, { children: 'list' })
        return rest
      }
      return this.tableData
    }
  },
  created () {
    this.loadAPI()
  },
  methods: {
    loadAPI () {
      let apis = []
      switch (this.$route.params.name) {
        case 'table':
          apis = tableAPI
          break
        case 'table-column':
          apis = tableColumnAPI
          break
        case 'toolbar':
          apis = toolbarAPI
          break
        case 'grid':
          apis = gridAPI
          break
        case 'excel':
          apis = excelAPI
          break
        case 'pager':
          apis = pagerAPI
          break
        case 'radio':
          apis = radioAPI
          break
        case 'checkbox':
          apis = checkboxAPI
          break
        case 'input':
          apis = inputAPI
          break
        case 'button':
          apis = buttonAPI
          break
        case 'alert':
          apis = alertAPI
          break
        case 'tooltip':
          apis = tooltipAPI
          break
      }

      // 生成唯一 id
      let index = 1
      XEUtils.eachTree(apis, item => {
        item.id = index++
      }, { children: 'list' })

      // 默认展开一级
      this.defaultExpandRowKeys = apis.filter(item => item.list && item.list.length).map(item => item.id)
      this.tableData = apis
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.filterName = ''
    this.loadAPI()
  }
}
</script>

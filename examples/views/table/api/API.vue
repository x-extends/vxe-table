<template>
  <div>
    <div class="search-wrapper">
      <vxe-input class="search-input" v-model="filterName" type="search" placeholder="API 搜索"></vxe-input>
    </div>
    <vxe-table
      highlight-hover-row
      :data.sync="apiList"
      :tree-config="{key: 'id', children: 'list', expandAll: !!filterName, expandRowKeys: defaultExpandRowKeys, trigger: 'cell'}">
      <vxe-table-column prop="name" label="属性" width="280" tree-node></vxe-table-column>
      <vxe-table-column prop="desc" label="说明"></vxe-table-column>
      <vxe-table-column prop="type" label="类型 / 返回类型" width="160"></vxe-table-column>
      <vxe-table-column prop="enum" label="可选值" width="180"></vxe-table-column>
      <vxe-table-column prop="defVal" label="默认值 / 参数" width="180"></vxe-table-column>
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
import gridAPI from '../../../api/grid'
import excelAPI from '../../../api/excel'
import paginationAPI from '../../../api/pagination'
import radioAPI from '../../../api/radio'
import checkboxAPI from '../../../api/checkbox'
import inputAPI from '../../../api/input'

export default {
  data () {
    return {
      filterName: '',
      tableData: [],
      defaultExpandRowKeys: []
    }
  },
  computed: {
    apiList () {
      if (this.filterName) {
        let filterName = this.filterName.toLowerCase()
        return XEUtils.searchTree(this.tableData, item => item.name.toLowerCase().indexOf(filterName) > -1 || item.desc.toLowerCase().indexOf(filterName) > -1 || item.type.toLowerCase().indexOf(filterName) > -1, { children: 'list' })
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
        case 'grid':
          apis = gridAPI
          break
        case 'excel':
          apis = excelAPI
          break
        case 'pagination':
          apis = paginationAPI
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
      }

      // 生成唯一 id
      let index = 1
      XEUtils.eachTree(apis, item => {
        item.id = index++
      }, { children: 'list' })

      // 默认展开一级
      this.filterName = ''
      this.defaultExpandRowKeys = apis.filter(item => item.list && item.list.length).map(item => item.id)
      this.tableData = apis
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.loadAPI()
  }
}
</script>

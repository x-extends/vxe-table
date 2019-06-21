<template>
  <div>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-input class="search-input" v-model="filterName" type="search" :placeholder="`vxe-${$route.params.name} ${$t('app.api.form.apiSearch')}`"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      highlight-current-row
      highlight-hover-row
      highlight-current-column
      highlight-hover-column
      ref="xTable"
      class="api-table"
      :row-class-name="rowClassNameFunc"
      :data.sync="apiList"
      :tree-config="{key: 'id', children: 'list', expandAll: !!filterName, expandRowKeys: defaultExpandRowKeys, trigger: 'cell'}"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus},}"
      @context-menu-click="contextMenuClickEvent">
      <vxe-table-column prop="name" :label="$t('app.api.title.prop')" width="280" tree-node>
        <template v-slot="{ row }">
          <span v-html="row.name"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="desc" :label="$t('app.api.title.desc')">
        <template v-slot="{ row }">
          <span v-html="row.desc"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="type" :label="$t('app.api.title.type')" width="160">
        <template v-slot="{ row }">
          <span v-html="row.type"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="enum" :label="$t('app.api.title.enum')" width="180">
        <template v-slot="{ row }">
          <span v-html="row.enum"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="defVal" :label="$t('app.api.title.defVal')" width="180">
        <template v-slot="{ row }">
          <span v-html="row.defVal"></span>
        </template>
      </vxe-table-column>
      <template v-slot:empty>
        <span class="red">找不对应 API，请输入正确的关键字！</span>
      </template>
    </vxe-table>
  </div>
</template>

<script>
import pack from '../../../../package.json'
import XEUtils from 'xe-utils'
import XEClipboard from 'xe-clipboard'
import tableAPI from '../../../api/table'
import tableColumnAPI from '../../../api/column'
import toolbarAPI from '../../../api/toolbar'
import gridAPI from '../../../api/grid'
import excelAPI from '../../../api/excel'
import pagerAPI from '../../../api/pager'
import radioAPI from '../../../api/radio'
import checkboxAPI from '../../../api/checkbox'
import inputAPI from '../../../api/input'
import buttonAPI from '../../../api/button'
import tooltipAPI from '../../../api/tooltip'
import messageBoxAPI from '../../../api/message'

export default {
  data () {
    return {
      filterName: this.$route.query.filterName,
      defaultExpandRowKeys: [],
      headerMenus: [
        [
          {
            code: 'exportAll',
            name: '导出完整文档'
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'copy',
            name: '复制内容'
          },
          {
            code: 'export',
            name: '导出文档'
          }
        ]
      ]
    }
  },
  computed: {
    tableData () {
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
        case 'tooltip':
          apis = tooltipAPI
          break
        case 'message-box':
          apis = messageBoxAPI
          break
      }
      // 生成唯一 id
      let index = 1
      XEUtils.eachTree(apis, item => {
        item.id = index++
        item.desc = item.descKey ? this.$t(item.descKey) : item.desc
      }, { children: 'list' })
      return apis
    },
    apiList () {
      let filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
      if (filterName) {
        let filterRE = new RegExp(filterName, 'gi')
        let options = { children: 'list' }
        let searchProps = ['name', 'desc', 'type', 'enum', 'defVal']
        let rest = XEUtils.searchTree(this.tableData, item => searchProps.some(key => item[key].toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = item[key].replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        return rest
      }
      return this.tableData
    }
  },
  created () {
    // 默认展开一级
    this.defaultExpandRowKeys = this.tableData.filter(item => item.list && item.list.length).map(item => item.id)
  },
  methods: {
    rowClassNameFunc ({ row }) {
      return row.disabled ? 'api--disabled' : null
    },
    contextMenuClickEvent ({ menu, row, column }) {
      switch (menu.code) {
        case 'copy':
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              this.$XMsg.alert({
                message: '已复制到剪贴板',
                maskClosable: true
              })
            }
          }
          break
        case 'export':
          this.$refs.xTable.exportCsv({
            filename: `vxe-${this.$route.params.name}_v${pack.version}.csv`
          })
          break
        case 'exportAll':
          this.$refs.xTable.exportCsv({
            data: XEUtils.toTreeArray(this.tableData, { children: 'list' }),
            filename: `vxe-${this.$route.params.name}_v${pack.version}.csv`
          })
          break
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.filterName = ''
  }
}
</script>

<style lang="scss">
.api-table {
  .api--disabled {
    color: #cb2431;
    text-decoration: line-through;
  }
}
</style>

<template>
  <div>
    <vxe-toolbar
      id="document_api"
      :loading="loading"
      :refresh="{query: loadList}"
      :resizable="{storage: true}"
      :setting="{storage: true}">
      <template v-slot:buttons>
        <vxe-input class="search-input" v-model="filterName" type="search" :placeholder="`vxe-${apiName} ${$t('app.api.form.apiSearch')}`" @keyup="searchEvent"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      highlight-current-row
      highlight-hover-row
      highlight-current-column
      ref="xTable"
      class="api-table"
      row-id="id"
      :loading="loading"
      :cell-class-name="cellClassNameFunc"
      :data.sync="apiList"
      :tree-config="{children: 'list', expandAll: !!filterName, expandRowKeys: defaultExpandRowKeys, trigger: 'cell'}"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus},}"
      @header-cell-context-menu="headerCellContextMenuEvent"
      @cell-context-menu="cellContextMenuEvent"
      @context-menu-click="contextMenuClickEvent">
      <vxe-table-column field="name" title="app.api.title.prop" min-width="280" :filters="nameFilters" tree-node>
        <template v-slot="{ row }">
          <span v-html="row.name || '&#12288;'"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="desc" title="app.api.title.desc" min-width="200">
        <template v-slot="{ row }">
          <span v-html="row.desc || '&#12288;'"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="type" title="app.api.title.type" min-width="140">
        <template v-slot="{ row }">
          <span v-html="row.type || '&#12288;'"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="enum" :title="$t('app.api.title.enum')" min-width="150">
        <template v-slot="{ row }">
          <span v-html="row.enum || '&#12288;'"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="defVal" :title="$t('app.api.title.defVal')" min-width="160">
        <template v-slot="{ row }">
          <span v-html="row.defVal || '&#12288;'"></span>
        </template>
      </vxe-table-column>
      <template v-slot:empty>
        <span class="red">找不对应 API，请输入正确的关键字！</span>
      </template>
    </vxe-table>
  </div>
</template>

<script>
import pack from '../../../package.json'
import XEUtils from 'xe-utils'
import XEClipboard from 'xe-clipboard'
import tableAPI from '../../api/table'
import tableColumnAPI from '../../api/column'
import toolbarAPI from '../../api/toolbar'
import gridAPI from '../../api/grid'
import excelAPI from '../../api/excel'
import pagerAPI from '../../api/pager'
import radioAPI from '../../api/radio'
import checkboxAPI from '../../api/checkbox'
import inputAPI from '../../api/input'
import textareaAPI from '../../api/textarea'
import buttonAPI from '../../api/button'
import tooltipAPI from '../../api/tooltip'
import modalAPI from '../../api/modal'

export default {
  data () {
    return {
      filterName: this.$route.query.filterName,
      apiList: [],
      defaultExpandRowKeys: [],
      loading: false,
      tableData: [],
      nameFilters: [
        { label: 'Props', value: 'Props' },
        { label: 'Slots', value: 'Slots' },
        { label: 'Events', value: 'Events' },
        { label: 'Methods', value: 'Methods' }
      ],
      headerMenus: [
        [
          {
            code: 'hideColumn',
            name: '隐藏列'
          },
          {
            code: 'showAllColumn',
            name: '取消所有隐藏列'
          },
          {
            code: 'resetColumn',
            name: '重置个性化数据'
          }
        ],
        [
          {
            code: 'exportAll',
            name: '导出完整文档',
            prefixIcon: 'fa fa-download'
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'copy',
            name: '复制内容',
            prefixIcon: 'fa fa-copy'
          }
        ],
        [
          {
            code: 'resize',
            name: '重新加载'
          },
          {
            code: 'export',
            name: '导出文档',
            prefixIcon: 'fa fa-download'
          }
        ],
        [
          {
            code: 'allExpand',
            name: '全部展开'
          },
          {
            code: 'allShrink',
            name: '全部收起'
          }
        ]
      ]
    }
  },
  computed: {
    apiName () {
      return this.$route.params.name
    }
  },
  watch: {
    apiName () {
      this.loadList()
    },
    '$i18n.locale' () {
      // 由于使用 v-html 无法自动翻译，需要重新加载
      this.loadList()
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      this.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
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
            case 'grid': {
              apis = gridAPI
              break
            }
            case 'excel': {
              apis = excelAPI
              break
            }
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
            case 'textarea':
              apis = textareaAPI
              break
            case 'button':
              apis = buttonAPI
              break
            case 'tooltip':
              apis = tooltipAPI
              break
            case 'modal':
              apis = modalAPI
              break
          }
          // 生成唯一 id
          let index = 1
          let searchProps = ['name', 'desc', 'type', 'enum', 'defVal']
          XEUtils.eachTree(apis, item => {
            item.id = index++
            item.desc = item.descKey ? this.$t(item.descKey) : item.desc
            searchProps.forEach(key => {
              item[key] = XEUtils.escape(item[key])
            })
          }, { children: 'list' })
          this.tableData = apis
          // 默认展开一级
          this.defaultExpandRowKeys = apis.filter(item => item.list && item.list.length).map(item => item.id)
          this.loading = false
          this.handleSearch()
          resolve()
        }, 100)
      })
    },
    cellClassNameFunc ({ row, column }) {
      return {
        'api-disabled': row.disabled,
        'disabled-line-through': row.disabled && column.property === 'name'
      }
    },
    headerCellContextMenuEvent ({ column }) {
      this.$refs.xTable.setCurrentColumn(column)
    },
    cellContextMenuEvent ({ row }) {
      this.$refs.xTable.setCurrentRow(row)
    },
    contextMenuClickEvent ({ menu, row, column }) {
      let xTable = this.$refs.xTable
      switch (menu.code) {
        case 'hideColumn':
          xTable.hideColumn(column)
          break
        case 'showAllColumn':
          xTable.resetCustoms()
          break
        case 'resetColumn':
          xTable.resetAll()
          break
        case 'exportAll':
          xTable.exportCsv({
            data: XEUtils.toTreeArray(this.tableData, { children: 'list' }),
            filename: `vxe-${this.apiName}_v${pack.version}.csv`
          })
          break
        case 'copy':
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              this.$XModal.message({ message: this.$t('app.body.msg.copyToClipboard'), status: 'success' })
            }
          }
          break
        case 'resize':
          this.filterName = ''
          this.tableData = []
          this.$nextTick(() => {
            xTable.clearAll()
            this.loadList()
          })
          break
        case 'export':
          xTable.exportCsv({
            filename: `vxe-${this.apiName}_v${pack.version}.csv`
          })
          break
        case 'allExpand':
          xTable.setAllTreeExpansion(true)
          break
        case 'allShrink':
          xTable.clearTreeExpand()
          break
      }
    },
    handleSearch () {
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
        this.apiList = rest
      } else {
        this.apiList = this.tableData
      }
    },
    // 创建一个防反跳策略函数，间隔 500 毫秒的执行赔率
    searchEvent: XEUtils.debounce(function () {
      this.handleSearch()
    }, 500, { leading: false, trailing: true })
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.filterName = ''
    if (this.$refs.xTable) {
      this.$refs.xTable.clearAll()
    }
  }
}
</script>

<style lang="scss">
.api-table {
  .api-disabled {
    color: #cb2431;
  }
  .disabled-line-through {
    text-decoration: line-through;
  }
}
</style>

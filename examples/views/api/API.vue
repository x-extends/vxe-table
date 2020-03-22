<template>
  <div>
    <vxe-toolbar
      id="document_api"
      :loading="loading"
      :refresh="{query: loadList}"
      :resizable="{storage: true}"
      :custom="{storage: true, checkMethod: checkColumnMethod}">
      <template v-slot:buttons>
        <vxe-input clearable class="search-input" v-model="filterName" type="search" :placeholder="`vxe-${apiName} ${$t('app.api.apiSearch')}`" @keyup="searchEvent" @clear="searchEvent"></vxe-input>
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
      :data="apiList"
      :tree-config="{children: 'list', expandRowKeys: defaultExpandRowKeys, trigger: 'cell'}"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus},}"
      @header-cell-context-menu="headerCellContextMenuEvent"
      @cell-context-menu="cellContextMenuEvent"
      @context-menu-click="contextMenuClickEvent">
      <vxe-table-column field="name" title="app.api.title.prop" type="html" min-width="280" :filters="nameFilters" tree-node></vxe-table-column>
      <vxe-table-column field="desc" title="app.api.title.desc" type="html" min-width="200"></vxe-table-column>
      <vxe-table-column field="type" title="app.api.title.type" type="html" min-width="140"></vxe-table-column>
      <vxe-table-column field="enum" :title="$t('app.api.title.enum')" type="html" min-width="150"></vxe-table-column>
      <vxe-table-column field="defVal" :title="$t('app.api.title.defVal')" type="html" min-width="160"></vxe-table-column>
      <vxe-table-column field="version" :title="$t('app.api.title.version')" width="120">
        <template v-slot="{ row }">
          <span v-show="row.version" class="compatibility">v{{  row.version }}</span>
        </template>
      </vxe-table-column>
      <template v-slot:empty>
        <span class="red">找不对应 API，请输入正确的关键字！</span>
      </template>
    </vxe-table>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import pack from '../../../package.json'
import XEClipboard from 'xe-clipboard'
import tableAPI from '../../api/table'
import tableColumnAPI from '../../api/column'
import toolbarAPI from '../../api/toolbar'
import gridAPI from '../../api/grid'
import virtualTreeAPI from '../../api/virtual-tree'
import excelAPI from '../../api/excel'
import pagerAPI from '../../api/pager'
import radioAPI from '../../api/radio'
import checkboxAPI from '../../api/checkbox'
import inputAPI from '../../api/input'
import selectAPI from '../../api/select'
import optionAPI from '../../api/option'
import textareaAPI from '../../api/textarea'
import buttonAPI from '../../api/button'
import tooltipAPI from '../../api/tooltip'
import modalAPI from '../../api/modal'
import formAPI from '../../api/form'
import formItemAPI from '../../api/form-item'

export default {
  data () {
    return {
      filterName: this.$route.query.filterName ? decodeURIComponent(this.$route.query.filterName) : '',
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
            code: 'exportXLSXAPI',
            name: '完整文档',
            prefixIcon: 'fa fa-download'
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'copy',
            name: 'app.body.label.copy',
            prefixIcon: 'fa fa-copy'
          }
        ],
        [
          {
            code: 'resize',
            name: '重新加载'
          },
          {
            code: 'exportHTMLAPI',
            name: '导出 HTML 文档',
            prefixIcon: 'fa fa-download'
          },
          {
            code: 'exportXLSXAPI',
            name: '导出 XLSX 文档',
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
            case 'grid':
              apis = gridAPI
              break
            case 'virtual-tree':
              apis = virtualTreeAPI
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
            case 'textarea':
              apis = textareaAPI
              break
            case 'select':
              apis = selectAPI
              break
            case 'option':
              apis = optionAPI
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
            case 'form':
              apis = formAPI
              break
            case 'form-item':
              apis = formItemAPI
              break
          }
          // 生成唯一 id
          let index = 1
          const searchProps = ['name', 'desc', 'type', 'enum', 'defVal']
          this.tableData = XEUtils.clone(apis, true)
          XEUtils.eachTree(this.tableData, item => {
            item.id = index++
            item.desc = item.descKey ? this.$t(item.descKey) : item.desc
            searchProps.forEach(key => {
              item[key] = XEUtils.escape(item[key])
            })
          }, { children: 'list' })
          // 默认展开一级
          this.defaultExpandRows = this.tableData.filter(item => item.list && item.list.length)
          this.defaultExpandRowKeys = this.defaultExpandRows.map(item => item.id)
          this.loading = false
          this.handleSearch()
          resolve()
        }, 100)
      })
    },
    cellClassNameFunc ({ row, column }) {
      return {
        'api-disabled': row.disabled,
        'api-abandoned': row.abandoned,
        'disabled-line-through': (row.disabled || row.abandoned) && column.property === 'name'
      }
    },
    checkColumnMethod ({ column }) {
      if (['name', 'desc'].includes(column.property)) {
        return false
      }
      return true
    },
    headerCellContextMenuEvent ({ column }) {
      this.$refs.xTable.setCurrentColumn(column)
    },
    cellContextMenuEvent ({ row }) {
      this.$refs.xTable.setCurrentRow(row)
    },
    contextMenuClickEvent ({ menu, row, column }) {
      const xTable = this.$refs.xTable
      switch (menu.code) {
        case 'hideColumn':
          xTable.hideColumn(column)
          break
        case 'showAllColumn':
          xTable.resetColumn()
          break
        case 'resetColumn':
          xTable.resetAll()
          break
        case 'exportHTMLAPI':
          xTable.exportData({
            type: 'html',
            data: XEUtils.toTreeArray(this.tableData, { children: 'list' }),
            filename: `vxe-${this.apiName}_v${pack.version}`
          })
          break
        case 'exportXLSXAPI':
          xTable.exportData({
            type: 'xlsx',
            data: XEUtils.toTreeArray(this.tableData, { children: 'list' }),
            filename: `vxe-${this.apiName}_v${pack.version}`
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
        case 'exportAPI':
          xTable.exportData({
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
      const filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const options = { children: 'list' }
        const searchProps = ['name', 'desc', 'type', 'enum', 'defVal']
        const rest = XEUtils.searchTree(this.tableData, item => searchProps.some(key => item[key].toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = item[key].replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        this.apiList = rest
        this.$nextTick(() => {
          if (this.$refs.xTable) {
            this.$refs.xTable.setAllTreeExpansion(true)
          }
        })
      } else {
        this.apiList = this.tableData
        this.$nextTick(() => {
          if (this.$refs.xTable) {
            this.$refs.xTable.setTreeExpansion(this.defaultExpandRows, true)
          }
        })
      }
    },
    // 调用频率间隔 500 毫秒
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
    this.handleSearch()
  }
}
</script>

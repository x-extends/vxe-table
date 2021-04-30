<template>
  <div>
    <vxe-toolbar
      custom
      ref="xToolbar"
      :loading="apiData.loading"
      :refresh="{query: loadList}">
      <template #buttons>
        <vxe-input clearable class="search-input" v-model="apiData.filterName" type="search" :placeholder="`vxe-${apiName} ${$t('app.api.apiSearch')}`" @keyup="searchEvent" @clear="searchEvent"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      auto-resize
      show-header-overflow
      highlight-current-row
      highlight-hover-row
      highlight-current-column
      ref="xTable"
      id="document_api"
      class="api-table"
      row-id="id"
      :loading="apiData.loading"
      :cell-class-name="cellClassNameFunc"
      :data="apiData.apiList"
      :custom-config="{storage: true, checkMethod: checkColumnMethod}"
      :tree-config="{children: 'list', expandRowKeys: apiData.defaultExpandRowKeys}"
      :menu-config="{header: {options: apiData.headerMenus}, body: {options: apiData.bodyMenus}, visibleMethod: menuVisibleMethod}"
      :tooltip-config="{contentMethod: showTooltipMethod}"
      @header-cell-menu="headerCellContextMenuEvent"
      @cell-menu="cellContextMenuEvent"
      @menu-click="contextMenuClickEvent">
      <vxe-table-column field="name" title="app.api.title.prop" type="html" min-width="280" show-overflow :title-help="{message: '参数名称及使用，如果是在 CDN 环境中使用 kebab-case（短横线式），如果项目基于 vue-cli 脚手架可以使用 camelCase（驼峰式）'}" :filters="apiData.nameFilters" tree-node></vxe-table-column>
      <vxe-table-column field="desc" title="app.api.title.desc" type="html" min-width="200"></vxe-table-column>
      <vxe-table-column field="type" title="app.api.title.type" type="html" min-width="140"></vxe-table-column>
      <vxe-table-column field="enum" :title="$t('app.api.title.enum')" type="html" min-width="150"></vxe-table-column>
      <vxe-table-column field="defVal" :title="$t('app.api.title.defVal')" type="html" min-width="160" :title-help="{message: '部分参数可支持全局设置，具体请查阅相关说明'}"></vxe-table-column>
      <vxe-table-column field="version" :title="$t('app.api.title.version')" width="120" :title-help="{message: '该文档与最新版本保持同步，如果遇到参数无效时，需要检查当前使用的版本号是否支持该参数'}">
        <template #default="{ row }">
          <template v-if="row.version === 'pro'">
            <a class="link pro" href="https://xuliangzhan_admin.gitee.io/vxe-table/plugins/#/pro" target="_blank">pro</a>
          </template>
           <template v-else-if="row.disabled">
            <span class="disabled">已废弃</span>
          </template>
           <template v-else-if="row.abandoned">
            <span class="abandoned">评估阶段</span>
          </template>
          <template v-else>
            <span v-show="row.version" class="compatibility">v{{  row.version }}</span>
          </template>
        </template>
      </vxe-table-column>
      <template #empty>
        <span class="red">找不对应 API，请输入正确的关键字！</span>
      </template>
    </vxe-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, watch, ref } from 'vue'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { VXETable } from '../../../packages/all'
import i18n from '@/i18n'
import router from '@/router'
import XEUtils from 'xe-utils'
import pack from '../../../package.json'

import { VxeTableInstance, VxeToolbarInstance } from '../../../types/index'

import XEClipboard from 'xe-clipboard'
import tableAPI from '../../api/table'
import colgroupAPI from '../../api/colgroup'
import columnAPI from '../../api/column'
import toolbarAPI from '../../api/toolbar'
import gridAPI from '../../api/grid'
import virtualTreeAPI from '../../api/virtual-tree'
import pagerAPI from '../../api/pager'
import radioAPI from '../../api/radio'
import radioGroupAPI from '../../api/radio-group'
import radioButtonAPI from '../../api/radio-button'
import checkboxAPI from '../../api/checkbox'
import checkboxGroupAPI from '../../api/checkbox-group'
import inputAPI from '../../api/input'
import selectAPI from '../../api/select'
import optgroupAPI from '../../api/optgroup'
import optionAPI from '../../api/option'
import textareaAPI from '../../api/textarea'
import buttonAPI from '../../api/button'
import tooltipAPI from '../../api/tooltip'
import modalAPI from '../../api/modal'
import formAPI from '../../api/form'
import formItemAPI from '../../api/form-item'
import formGatherAPI from '../../api/form-gather'
import switchAPI from '../../api/switch'
import listAPI from '../../api/list'
import pulldownAPI from '../../api/pulldown'

// declare global {
//   interface Window {
//     attributes: any;
//     tags: any;
//   }
// }

// const attributes: any = window.attributes = {}
// const tags: any = window.tags = {}

// const tagMaps = [
//   ['vxe-table', tableAPI, { subtags: ['vxe-colgroup', 'vxe-table-colgroup', 'vxe-column', 'vxe-table-column'], description: '基础表格' }],
//   ['vxe-colgroup', colgroupAPI, { subtags: ['vxe-column'], description: '基础表格 - 分组列' }],
//   ['vxe-table-colgroup', colgroupAPI, { subtags: ['vxe-table-column'], description: '基础表格 - 分组列' }],
//   ['vxe-column', columnAPI, { description: '基础表格 - 列' }],
//   ['vxe-table-column', columnAPI, { description: '基础表格 - 列' }],
//   ['vxe-grid', gridAPI, { description: '高级表格' }],
//   ['vxe-toolbar', toolbarAPI, { description: '工具栏' }],
//   ['vxe-pager', pagerAPI, { description: '分页' }],
//   ['vxe-radio', radioAPI, { description: '单选框' }],
//   ['vxe-radio-group', radioGroupAPI, { subtags: ['vxe-radio', 'vxe-radio-button'], description: '单选组' }],
//   ['vxe-radio-button', radioButtonAPI, { description: '单选按钮' }],
//   ['vxe-checkbox', checkboxAPI, { description: '复选框' }],
//   ['vxe-checkbox-group', checkboxGroupAPI, { subtags: ['vxe-checkbox'], description: '复选组' }],
//   ['vxe-switch', switchAPI, { description: '开关按钮' }],
//   ['vxe-input', inputAPI, { description: '输入框' }],
//   ['vxe-select', selectAPI, { subtags: ['vxe-optgroup', 'vxe-option'], description: '下拉框' }],
//   ['vxe-optgroup', optgroupAPI, { subtags: ['vxe-option'], description: '下拉框 - 分组' }],
//   ['vxe-option', optionAPI, { description: '下拉框 - 选项' }],
//   ['vxe-button', buttonAPI, { description: '按钮' }],
//   ['vxe-tooltip', tooltipAPI, { description: '工具提示' }],
//   ['vxe-modal', modalAPI, { description: '弹窗' }],
//   ['vxe-form', formAPI, { subtags: ['vxe-form-item'], description: '表单' }],
//   ['vxe-form-item', formItemAPI, { description: '表单 - 项' }],
//   ['vxe-form-gather', formGatherAPI, { description: '表单 - 项集合' }],
//   ['vxe-list', listAPI, { description: '列表' }],
//   ['vxe-pulldown', pulldownAPI, { description: '下拉容器' }]
// ]

// tagMaps.forEach(confs => {
//   const props = confs[1].find((item: any) => item.name === 'Props').list
//   const keys: any[] = []
//   props.forEach((item: any) => {
//     const name = XEUtils.kebabCase(item.name)
//     attributes[`${confs[0]}/${name}`] = {
//       type: XEUtils.toValueString(item.type).toLowerCase(),
//       description: item.descKey ? i18n.global.t(item.descKey) : item.desc
//     }
//     keys.push(name)
//   })
//   tags[confs[0]] = Object.assign({ attributes: keys }, confs[2])
// })

export default defineComponent({
  setup () {
    const q = (router.currentRoute.value.query.q || router.currentRoute.value.query.filterName) as string
    const apiData = reactive({
      filterName: q ? decodeURIComponent(q) : '',
      apiList: [] as any[],
      defaultExpandRows: [] as string[],
      defaultExpandRowKeys: [] as string[],
      loading: false,
      tableData: [] as any[],
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
            name: '隐藏列',
            disabled: false
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
            name: '导出文档.xlsx',
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
            name: '导出文档.html',
            prefixIcon: 'fa fa-download'
          },
          {
            code: 'exportXLSXAPI',
            name: '导出文档.xlsx',
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
    })

    const xTable = ref({} as VxeTableInstance)
    const xToolbar = ref({} as VxeToolbarInstance)

    const apiName = computed(() => {
      const $route = router.currentRoute.value
      return $route.params.name
    })

    const cellClassNameFunc = ({ row, column }: any) => {
      return {
        'api-pro': row.version === 'pro',
        'api-disabled': row.disabled,
        'api-abandoned': row.abandoned,
        'disabled-line-through': (row.disabled) && column.property === 'name'
      }
    }

    const checkColumnMethod = ({ column }: any) => {
      if (['name', 'desc'].includes(column.property)) {
        return false
      }
      return true
    }

    const showTooltipMethod = ({ type, row, column }: any) => {
      if (type === 'body') {
        if (column.property === 'name') {
          if (row.disabled) {
            return '该参数已经被废弃了，除非不打算更新版本，否则不应该被使用'
          } else if (row.abandoned) {
            return '该参数属于评估阶段，谨慎使用，后续有可能会被废弃的风险'
          } else if (row.version === 'pro') {
            return '该参数属于 PRO 扩展插件的功能，需获取授权，如有需要可联系邮件：xu_liangzhan@163.com'
          }
        }
      }
      return null
    }

    const headerCellContextMenuEvent = ({ column }: any) => {
      const $table = xTable.value
      $table.setCurrentColumn(column)
    }

    const cellContextMenuEvent = ({ row }: any) => {
      const $table = xTable.value
      $table.setCurrentRow(row)
    }

    const handleSearch = () => {
      const filterName = XEUtils.toValueString(apiData.filterName).trim()
      if (filterName) {
        const options = { children: 'list' }
        if (/pro/i.test(filterName)) {
          const rest = XEUtils.searchTree(apiData.tableData, item => item.version === 'pro', options)
          apiData.apiList = rest
        } else {
          const filterRE = new RegExp(`${filterName}|${XEUtils.camelCase(filterName)}|${XEUtils.kebabCase(filterName)}`, 'i')
          const searchProps = ['name', 'desc', 'type', 'enum', 'defVal', 'version']
          const rest = XEUtils.searchTree(apiData.tableData, item => searchProps.some(key => filterRE.test(item[key])), options)
          XEUtils.eachTree(rest, item => {
            searchProps.forEach(key => {
              if (key !== 'version') {
                item[key] = item[key].replace(filterRE, (match: string) => `<span class="keyword-lighten">${match}</span>`)
              }
            })
          }, options)
          apiData.apiList = rest
        }
        setTimeout(() => {
          const $table = xTable.value
          if ($table) {
            $table.setAllTreeExpand(true)
          }
        }, 300)
      } else {
        apiData.apiList = apiData.tableData
        nextTick(() => {
          const $table = xTable.value
          if ($table) {
            $table.setTreeExpand(apiData.defaultExpandRows, true)
          }
        })
      }
    }

    // 调用频率间隔 500 毫秒
    const searchEvent = XEUtils.debounce(handleSearch, 500, { leading: false, trailing: true })

    const loadList = () => {
      const $route = router.currentRoute.value
      apiData.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          let apis: any[] = []
          switch ($route.params.name) {
            case 'table':
              apis = tableAPI
              break
            case 'colgroup':
              apis = colgroupAPI
              break
            case 'column':
              apis = columnAPI
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
            case 'pager':
              apis = pagerAPI
              break
            case 'radio':
              apis = radioAPI
              break
            case 'radio-group':
              apis = radioGroupAPI
              break
            case 'radio-button':
              apis = radioButtonAPI
              break
            case 'checkbox':
              apis = checkboxAPI
              break
            case 'checkbox-group':
              apis = checkboxGroupAPI
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
            case 'optgroup':
              apis = optgroupAPI
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
            case 'form-gather':
              apis = formGatherAPI
              break
            case 'switch':
              apis = switchAPI
              break
            case 'list':
              apis = listAPI
              break
            case 'pulldown':
              apis = pulldownAPI
              break
          }
          // 生成唯一 id
          let index = 1
          const searchProps = ['name', 'desc', 'type', 'enum', 'defVal']
          apiData.tableData = XEUtils.clone(apis, true)
          XEUtils.eachTree(apiData.tableData, (item: any) => {
            item.id = index++
            item.desc = item.descKey ? i18n.global.t(item.descKey) : item.desc
            searchProps.forEach(key => {
              item[key] = XEUtils.escape(item[key])
            })
          }, { children: 'list' })
          // 默认展开一级
          apiData.defaultExpandRows = apiData.tableData.filter((item: any) => item.list && item.list.length)
          apiData.defaultExpandRowKeys = apiData.defaultExpandRows.map((item: any) => item.id)
          apiData.loading = false
          handleSearch()
          resolve(null)
        }, 100)
      })
    }

    const contextMenuClickEvent = ({ menu, row, column }: any) => {
      const $table = xTable.value
      switch (menu.code) {
        case 'hideColumn':
          $table.hideColumn(column)
          break
        case 'showAllColumn':
          $table.resetColumn({ visible: true })
          break
        case 'resetColumn':
          $table.resetColumn(true)
          break
        case 'exportHTMLAPI':
          $table.exportData({
            type: 'html',
            data: XEUtils.toTreeArray(apiData.tableData, { children: 'list' }),
            filename: `vxe-${apiName.value}_v${pack.version}`
          })
          break
        case 'exportXLSXAPI':
          $table.exportData({
            type: 'xlsx',
            data: XEUtils.toTreeArray(apiData.tableData, { children: 'list' }),
            filename: `vxe-${apiName.value}_v${pack.version}`
          })
          break
        case 'copy':
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              VXETable.modal.message({ content: i18n.global.t('app.body.msg.copyToClipboard'), status: 'success' })
            }
          }
          break
        case 'resize':
          apiData.filterName = ''
          apiData.tableData = []
          nextTick(() => {
            $table.clearAll()
            loadList()
          })
          break
        case 'exportAPI':
          $table.exportData({
            filename: `vxe-${apiName.value}_v${pack.version}.csv`
          })
          break
        case 'allExpand':
          $table.setAllTreeExpand(true)
          break
        case 'allShrink':
          $table.clearTreeExpand()
          break
      }
    }

    const menuVisibleMethod = ({ options, column }: any) => {
      const isDisabled = !checkColumnMethod({ column })
      options.forEach((list: any) => {
        list.forEach((item: any) => {
          if (['hideColumn'].includes(item.code)) {
            item.disabled = isDisabled
          }
        })
      })
      return true
    }

    watch(apiName, () => {
      loadList()
    })

    watch(() => i18n.global.locale, () => {
      loadList()
    })

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTable.value
      const $toolbar = xToolbar.value
      $table.connect($toolbar)
      loadList()
    })

    return {
      xTable,
      xToolbar,
      apiData,
      apiName,

      loadList,
      cellClassNameFunc,
      checkColumnMethod,
      showTooltipMethod,
      headerCellContextMenuEvent,
      cellContextMenuEvent,
      contextMenuClickEvent,
      menuVisibleMethod,
      searchEvent,
      handleSearch
    }
  },
  beforeRouteUpdate (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    next()
    this.apiData.filterName = ''
    const xTable: any = this.$refs.xTable
    if (xTable) {
      xTable.clearAll()
    }
    this.handleSearch()
  }
})
</script>

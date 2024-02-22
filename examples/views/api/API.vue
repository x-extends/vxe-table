<template>
  <div class="api-view">
    <vxe-grid
      ref="xGrid"
      id="document_api"
      class="api-table"
      v-bind="gridOptions"
      @header-cell-menu="headerCellContextMenuEvent"
      @cell-menu="cellContextMenuEvent"
      @menu-click="contextMenuClickEvent">
      <template #toolbar_buttons>
        <vxe-input clearable class="search-input" v-model="apiData.filterName" type="search" :placeholder="`vxe-${apiData.apiName} ${$t('app.api.apiSearch')}`" @keyup="searchEvent" @clear="searchEvent"></vxe-input>
      </template>

      <template #default_version="{ row }">
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

      <template #empty>
        <span class="red">找不对应 API，请输入正确的关键字！</span>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, watch, ref } from 'vue'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import i18n from '@/i18n'
import router from '@/router'
import XEUtils from 'xe-utils'
import pack from '../../../package.json'

import { VxeGridInstance, VxeGridProps } from '../../../types/index'

import tableAPI from '../../api/table'
import colgroupAPI from '../../api/colgroup'
import columnAPI from '../../api/column'
import toolbarAPI from '../../api/toolbar'
import gridAPI from '../../api/grid'
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
//   ['vxe-table', tableAPI, { subtags: ['vxe-colgroup', 'vxe-column'], description: '基础表格' }],
//   ['vxe-colgroup', colgroupAPI, { subtags: ['vxe-column'], description: '基础表格 - 分组列' }],
//   ['vxe-column', columnAPI, { description: '基础表格 - 列' }],
//   ['vxe-grid', gridAPI, { description: '配置式表格' }],
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
      defaultExpandRows: [] as string[],
      tableData: [] as any[]
    })

    const xGrid = ref({} as VxeGridInstance)

    const apiName = computed(() => {
      const $route = router.currentRoute.value
      return $route.params.name
    })

    const checkColumnMethod = ({ column }: any) => {
      if (['name', 'desc'].includes(column.property)) {
        return false
      }
      return true
    }

    const headerCellContextMenuEvent = ({ column }: any) => {
      const $grid = xGrid.value
      $grid.setCurrentColumn(column)
    }

    const cellContextMenuEvent = ({ row }: any) => {
      const $grid = xGrid.value
      $grid.setCurrentRow(row)
    }

    const handleSearch = () => {
      const filterName = XEUtils.toValueString(apiData.filterName).trim()
      if (filterName) {
        const options = { children: 'list' }
        if (/pro/i.test(filterName)) {
          const rest = XEUtils.searchTree(apiData.tableData, item => item.version === 'pro', options)
          gridOptions.data = rest
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
          gridOptions.data = rest
        }
        setTimeout(() => {
          const $grid = xGrid.value
          if ($grid) {
            $grid.setAllTreeExpand(true)
          }
        }, 300)
      } else {
        gridOptions.data = apiData.tableData.slice(0)
        nextTick(() => {
          const $grid = xGrid.value
          if ($grid) {
            $grid.setTreeExpand(apiData.defaultExpandRows, true)
          }
        })
      }
    }

    // 调用频率间隔 500 毫秒
    const searchEvent = XEUtils.debounce(handleSearch, 500, { leading: false, trailing: true })

    const loadList = () => {
      const $route = router.currentRoute.value
      gridOptions.loading = true
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
          const treeData = XEUtils.clone(apis, true)
          XEUtils.eachTree(treeData, (item: any) => {
            item.id = index++
            item.desc = item.descKey ? i18n.global.t(item.descKey) : item.desc
            searchProps.forEach(key => {
              item[key] = XEUtils.escape(item[key])
            })
          }, { children: 'list' })
          apiData.tableData = treeData
          // 默认展开一级
          apiData.defaultExpandRows = treeData.filter((item: any) => item.list && item.list.length)
          if (gridOptions.treeConfig) {
            gridOptions.treeConfig.expandRowKeys = apiData.defaultExpandRows.map((item: any) => item.id)
          }
          gridOptions.loading = false
          handleSearch()
          resolve(null)
        }, 100)
      })
    }

    const contextMenuClickEvent = ({ menu, column }: any) => {
      const $grid = xGrid.value
      switch (menu.code) {
        case 'hideColumn':
          $grid.hideColumn(column)
          break
        case 'showAllColumn':
          $grid.resetColumn({ visible: true })
          break
        case 'resetColumn':
          $grid.resetColumn(true)
          break
        case 'exportHTMLAPI':
          $grid.exportData({
            type: 'html',
            data: XEUtils.toTreeArray(apiData.tableData, { children: 'list' }),
            filename: `vxe-${apiName.value}_v${pack.version}`
          })
          break
        case 'exportXLSXAPI':
          $grid.exportData({
            type: 'xlsx',
            data: XEUtils.toTreeArray(apiData.tableData, { children: 'list' }),
            filename: `vxe-${apiName.value}_v${pack.version}`
          })
          break
        case 'resize':
          apiData.filterName = ''
          apiData.tableData = []
          nextTick(() => {
            $grid.clearAll()
            loadList()
          })
          break
        case 'exportAPI':
          $grid.exportData({
            filename: `vxe-${apiName.value}_v${pack.version}.csv`
          })
          break
        case 'allExpand':
          $grid.setAllTreeExpand(true)
          break
        case 'allShrink':
          $grid.clearTreeExpand()
          break
      }
    }

    const gridOptions = reactive<VxeGridProps>({
      resizable: true,
      autoResize: true,
      highlightCurrentRow: true,
      highlightHoverRow: true,
      highlightCurrentColumn: true,
      height: 'auto',
      rowId: 'id',
      loading: false,
      cellClassName ({ row, column }) {
        return {
          'api-pro': row.version === 'pro',
          'api-disabled': row.disabled,
          'api-abandoned': row.abandoned,
          'disabled-line-through': (row.disabled) && column.property === 'name'
        }
      },
      customConfig: {
        storage: true,
        checkMethod: checkColumnMethod
      },
      treeConfig: {
        children: 'list',
        expandRowKeys: []
      },
      menuConfig: {
        header: {
          options: [
            [
              { code: 'hideColumn', name: '隐藏列', disabled: false },
              { code: 'showAllColumn', name: '取消所有隐藏列' },
              { code: 'resetColumn', name: '重置个性化数据' }
            ],
            [
              { code: 'exportXLSXAPI', name: '导出文档.xlsx', prefixIcon: 'fa fa-download' }
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'resize', name: '重新加载' },
              { code: 'exportHTMLAPI', name: '导出文档.html', prefixIcon: 'fa fa-download' },
              { code: 'exportXLSXAPI', name: '导出文档.xlsx', prefixIcon: 'fa fa-download' }
            ],
            [
              { code: 'allExpand', name: '全部展开' },
              { code: 'allShrink', name: '全部收起' }
            ]
          ]
        },
        visibleMethod: ({ options, column }) => {
          const isDisabled = !checkColumnMethod({ column })
          options.forEach(list => {
            list.forEach(item => {
              if (item.code && ['hideColumn'].includes(item.code)) {
                item.disabled = isDisabled
              }
            })
          })
          return true
        }
      },
      tooltipConfig: {
        contentMethod ({ type, row, column }) {
          if (type === 'body') {
            if (column.property === 'name') {
              if (row.disabled) {
                return '该参数已经被废弃了，除非不打算更新版本，否则不应该被使用'
              } else if (row.abandoned) {
                return '该参数属于评估阶段，谨慎使用，后续有可能会被废弃的风险'
              } else if (row.version === 'pro') {
                return '该参数属于 pro 扩展插件的功能'
              }
            }
          }
          return null
        }
      },
      toolbarConfig: {
        custom: true,
        refresh: {
          query: loadList
        },
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      columns: [
        {
          field: 'name',
          title: 'app.api.title.prop',
          type: 'html',
          treeNode: true,
          minWidth: 280,
          titleHelp: {
            message: '参数名称及使用，如果是在 CDN 环境中使用 kebab-case（短横线式），\n如果项目基于 vue-cli 脚手架可以使用 camelCase（驼峰式）'
          },
          filters: [
            { label: 'Props', value: 'Props' },
            { label: 'Slots', value: 'Slots' },
            { label: 'Events', value: 'Events' },
            { label: 'Methods', value: 'Methods' }
          ]
        },
        { field: 'desc', title: 'app.api.title.desc', type: 'html', minWidth: 200 },
        { field: 'type', title: 'app.api.title.type', type: 'html', minWidth: 140 },
        { field: 'enum', title: 'app.api.title.enum', type: 'html', minWidth: 150 },
        { field: 'defVal', title: 'app.api.title.defVal', type: 'html', minWidth: 160, titleHelp: { message: '部分参数可支持全局设置，具体请查阅相关说明' } },
        { field: 'version', title: 'app.api.title.version', type: 'html', minWidth: 120, titleHelp: { message: '该文档与最新版本保持同步，如果遇到参数无效时，\n请检查当前使用的版本号是否支持该参数' }, slots: { default: 'default_version' } }
      ],
      data: []
    })

    watch(apiName, () => {
      loadList()
    })

    watch(() => i18n.global.locale, () => {
      loadList()
    })

    nextTick(() => {
      loadList()
    })

    return {
      xGrid,
      apiData,
      apiName,
      gridOptions,

      headerCellContextMenuEvent,
      cellContextMenuEvent,
      contextMenuClickEvent,
      searchEvent,
      handleSearch
    }
  },
  beforeRouteUpdate (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    next()
    this.apiData.filterName = ''
    const xGrid: any = this.$refs.xGrid
    if (xGrid) {
      xGrid.clearAll()
    }
    this.handleSearch()
  }
})
</script>

<style lang="scss" scoped>
.api-view {
  height: 100%;
}
</style>

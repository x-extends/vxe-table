import XEUtils from 'xe-utils'
import { getI18n, formats, log } from '@vxe-ui/core'
import { toFilters } from './util'
import { getFuncText } from '../../ui/src/utils'

import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types'

export class ColumnInfo {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  constructor ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, _vm: any, { renderHeader, renderCell, renderFooter, renderData }: any = {}) {
    const $xeGrid = $xeTable.xegrid
    const formatter: string | any[] = _vm.formatter
    const visible = XEUtils.isBoolean(_vm.visible) ? _vm.visible : true

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      const types = ['seq', 'checkbox', 'radio', 'expand', 'html']
      if (_vm.type && types.indexOf(_vm.type) === -1) {
        log.warn('vxe.error.errProp', [`type=${_vm.type}`, types.join(', ')])
      }
      if (XEUtils.isBoolean(_vm.cellRender) || (_vm.cellRender && !XEUtils.isObject(_vm.cellRender))) {
        log.warn('vxe.error.errProp', [`column.cell-render=${_vm.cellRender}`, 'column.cell-render={}'])
      }
      if (XEUtils.isBoolean(_vm.editRender) || (_vm.editRender && !XEUtils.isObject(_vm.editRender))) {
        log.warn('vxe.error.errProp', [`column.edit-render=${_vm.editRender}`, 'column.edit-render={}'])
      }
      if (_vm.cellRender && _vm.editRender) {
        log.warn('vxe.error.errConflicts', ['column.cell-render', 'column.edit-render'])
      }
      if (_vm.type === 'expand') {
        const { props: tableProps } = $xeTable
        const { treeConfig } = tableProps
        const { computeTreeOpts } = $xeTable.getComputeMaps()
        const treeOpts = computeTreeOpts.value
        if (treeConfig && (treeOpts.showLine || treeOpts.line)) {
          log.err('vxe.error.errConflicts', ['tree-config.showLine', 'column.type=expand'])
        }
      }
      if (formatter) {
        if (XEUtils.isString(formatter)) {
          const gFormatOpts = formats.get(formatter) || XEUtils[formatter]
          if (!gFormatOpts || !XEUtils.isFunction(gFormatOpts.cellFormatMethod)) {
            log.err('vxe.error.notFormats', [formatter])
          }
        } else if (XEUtils.isArray(formatter)) {
          const gFormatOpts = formats.get(formatter[0]) || XEUtils[formatter[0]]
          if (!gFormatOpts || !XEUtils.isFunction(gFormatOpts.cellFormatMethod)) {
            log.err('vxe.error.notFormats', [formatter[0]])
          }
        }
      }
    }

    Object.assign(this, {
      // 基本属性
      type: _vm.type,
      property: _vm.field,
      field: _vm.field,
      title: _vm.title,
      width: _vm.width,
      minWidth: _vm.minWidth,
      maxWidth: _vm.maxWidth,
      resizable: _vm.resizable,
      fixed: _vm.fixed,
      align: _vm.align,
      headerAlign: _vm.headerAlign,
      footerAlign: _vm.footerAlign,
      showOverflow: _vm.showOverflow,
      showHeaderOverflow: _vm.showHeaderOverflow,
      showFooterOverflow: _vm.showFooterOverflow,
      className: _vm.className,
      headerClassName: _vm.headerClassName,
      footerClassName: _vm.footerClassName,
      formatter: formatter,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      sortType: _vm.sortType,
      filters: toFilters(_vm.filters),
      filterMultiple: XEUtils.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
      filterMethod: _vm.filterMethod,
      filterResetMethod: _vm.filterResetMethod,
      filterRecoverMethod: _vm.filterRecoverMethod,
      filterRender: _vm.filterRender,
      treeNode: _vm.treeNode,
      cellType: _vm.cellType,
      cellRender: _vm.cellRender,
      editRender: _vm.editRender,
      contentRender: _vm.contentRender,
      headerExportMethod: _vm.headerExportMethod,
      exportMethod: _vm.exportMethod,
      footerExportMethod: _vm.footerExportMethod,
      titleHelp: _vm.titleHelp,
      titlePrefix: _vm.titlePrefix,
      titleSuffix: _vm.titleSuffix,
      // 自定义参数
      params: _vm.params,
      // 渲染属性
      id: _vm.colId || XEUtils.uniqueId('col_'),
      parentId: null,
      visible,
      // 内部属性（一旦被使用，将导致不可升级版本）
      halfVisible: false,
      defaultVisible: visible,
      defaultFixed: _vm.fixed,
      checked: false,
      halfChecked: false,
      disabled: false,
      // 分组层级
      level: 1,
      // 跨行
      rowSpan: 1,
      // 跨列
      colSpan: 1,

      // 数据排序
      order: null, // 用于记录排序类型，升序和倒序
      sortTime: 0, // 用于多列的先后顺序

      // 列排序
      sortNumber: 0, // 用于记录自定义列顺序
      renderSortNumber: 0, // 用于记录自定义列顺序

      renderWidth: 0,
      renderHeight: 0,
      resizeWidth: 0, // 手动调整
      renderLeft: 0,
      renderArgs: [], // 渲染参数可用于扩展
      model: {},
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderFooter: renderFooter || _vm.renderFooter,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: _vm.slots
    })
    if ($xeGrid) {
      const { computeProxyOpts } = $xeGrid.getComputeMaps()
      const proxyOpts = computeProxyOpts.value
      if (proxyOpts.beforeColumn) {
        proxyOpts.beforeColumn({ $grid: $xeGrid, column: this })
      }
    }
  }

  getTitle () {
    return getFuncText(this.title || (this.type === 'seq' ? getI18n('vxe.table.seqTitle') : ''))
  }

  getKey () {
    return this.field || (this.type ? `type=${this.type}` : null)
  }

  update (name: string, value: any) {
    // 不支持直接修改的属性
    if (name !== 'filters') {
      if (name === 'field') {
        // 兼容旧属性
        this.property = value
      }
      this[name] = value
    }
  }

  [key: string]: any
}

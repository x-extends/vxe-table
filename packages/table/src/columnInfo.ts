import XEUtils from 'xe-utils'
import { VxeUI } from '../../ui'
import { toFilters } from './util'
import { isEnableConf, getFuncText } from '../../ui/src/utils'
import { isPx } from '../../ui/src/dom'
import { createComponentLog } from '../../ui/src/log'

import type { VxeTableConstructor, VxeTablePrivateMethods, VxeTableDefines, VxeColumnProps } from '../../../types'

const { warnLog, errLog } = createComponentLog('table')

const { getI18n, formats, renderer } = VxeUI

export class ColumnInfo {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  constructor ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, colConfs: VxeColumnProps & { renderHeader?: any, renderCell?: any, renderFooter?: any, slots?: any }, { renderHeader, renderCell, renderFooter, renderData }: any = {}) {
    const tableProps = $xeTable.props
    const $xeGrid = $xeTable.xeGrid
    const $xeGantt = $xeTable.xeGantt
    const $xeGGWrapper = $xeGrid || $xeGantt

    const { type, field, width, visible, aggFunc, formatter, filterMultiple, cellRender, editRender, filterRender } = colConfs

    const colId = colConfs.colId || XEUtils.uniqueId('col_')

    const defaultVisible = XEUtils.isBoolean(visible) ? visible : true
    const defaultRenderWidth = width && isPx(width) && width !== 'auto' ? Math.max(0, XEUtils.toInteger(width)) : 0

    const flCompConf = filterRender && isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
    const ctFilterOptions = flCompConf ? flCompConf.createTableFilterOptions : null

    const filters = toFilters(colConfs.filters, colId)

    const types = ['seq', 'checkbox', 'radio', 'expand', 'html']
    if (type && types.indexOf(type) === -1) {
      warnLog('vxe.error.errProp', [`type=${type}`, types.join(', ')])
    }
    if (XEUtils.isBoolean(cellRender) || (cellRender && !XEUtils.isObject(cellRender))) {
      warnLog('vxe.error.errProp', [`column.cell-render=${cellRender}`, 'column.cell-render={}'])
    }
    if (XEUtils.isBoolean(editRender) || (editRender && !XEUtils.isObject(editRender))) {
      warnLog('vxe.error.errProp', [`column.edit-render=${editRender}`, 'column.edit-render={}'])
    }
    if (type === 'expand') {
      const { treeConfig } = tableProps
      const { computeTreeOpts } = $xeTable.getComputeMaps()
      const treeOpts = computeTreeOpts.value
      if (treeConfig && (treeOpts.showLine || treeOpts.line)) {
        errLog('vxe.error.errConflicts', ['tree-config.showLine', 'column.type=expand'])
      }
    }
    if (formatter) {
      if (XEUtils.isString(formatter)) {
        const gFormatOpts = formats.get(formatter) || XEUtils[formatter]
        if (!gFormatOpts || !XEUtils.isFunction(gFormatOpts.tableCellFormatMethod || gFormatOpts.cellFormatMethod)) {
          errLog('vxe.error.notFormats', [formatter])
        }
      } else if (XEUtils.isArray(formatter)) {
        const gFormatOpts = formats.get(formatter[0]) || XEUtils[formatter[0]]
        if (!gFormatOpts || !XEUtils.isFunction(gFormatOpts.tableCellFormatMethod || gFormatOpts.cellFormatMethod)) {
          errLog('vxe.error.notFormats', [formatter[0]])
        }
      }
    }
    if (aggFunc) {
      if (!$xeTable.handlePivotTableAggData && aggFunc !== true) {
        errLog('vxe.error.errProp', [`column.agg-func=${aggFunc}`, 'column.agg-func=true'])
      }
    }

    if (field && editRender) {
      if (editRender.startField && `${editRender.startField}`.indexOf(field) >= 0) {
        errLog('vxe.error.modelConflicts', [`field=${field}`, `edit-render.startField=${editRender.startField}`])
      }
      if (editRender.endField && `${editRender.endField}`.indexOf(field) >= 0) {
        errLog('vxe.error.modelConflicts', [`field=${field}`, `edit-render.endField=${editRender.endField}`])
      }
    }

    Object.assign(this, {
      // 基本属性
      type: colConfs.type,
      property: colConfs.field,
      field: field,
      title: colConfs.title,
      width: colConfs.width,
      minWidth: colConfs.minWidth,
      maxWidth: colConfs.maxWidth,
      resizable: colConfs.resizable,
      fixed: colConfs.fixed,
      align: colConfs.align,
      headerAlign: colConfs.headerAlign,
      footerAlign: colConfs.footerAlign,
      showOverflow: colConfs.showOverflow,
      showHeaderOverflow: colConfs.showHeaderOverflow,
      showFooterOverflow: colConfs.showFooterOverflow,
      className: colConfs.className,
      headerClassName: colConfs.headerClassName,
      footerClassName: colConfs.footerClassName,
      formatter: formatter,
      headerFormatter: colConfs.headerFormatter,
      footerFormatter: colConfs.footerFormatter,
      padding: colConfs.padding,
      verticalAlign: colConfs.verticalAlign,
      sortable: colConfs.sortable,
      sortBy: colConfs.sortBy,
      sortType: colConfs.sortType,
      filters: filters,
      filterMultiple: XEUtils.isBoolean(filterMultiple) ? filterMultiple : true,
      filterMethod: colConfs.filterMethod,
      filterResetMethod: colConfs.filterResetMethod,
      filterRecoverMethod: colConfs.filterRecoverMethod,
      filterRender: filterRender,
      floatingFilters: colConfs.floatingFilters,
      rules: colConfs.rules,
      rowGroupNode: colConfs.rowGroupNode,
      treeNode: colConfs.treeNode,
      dragSort: colConfs.dragSort,
      rowResize: colConfs.rowResize,
      cellType: colConfs.cellType,
      cellRender: cellRender,
      editRender: editRender,
      contentRender: colConfs.contentRender,
      headerExportMethod: colConfs.headerExportMethod,
      exportMethod: colConfs.exportMethod,
      footerExportMethod: colConfs.footerExportMethod,
      titleHelp: colConfs.titleHelp,
      titlePrefix: colConfs.titlePrefix,
      titleSuffix: colConfs.titleSuffix,

      aggFunc: colConfs.aggFunc,
      copyMethod: colConfs.copyMethod,
      cutMethod: colConfs.cutMethod,
      pasteMethod: colConfs.pasteMethod,

      // 自定义参数
      params: colConfs.params,
      // 渲染属性
      id: colId,
      parentId: null,
      visible: defaultVisible,
      // 内部属性（一旦被使用，将导致不可升级版本）
      defaultParentId: null,
      halfVisible: false,
      defaultVisible: defaultVisible,
      defaultFixed: colConfs.fixed,

      defaultAggFunc: colConfs.aggFunc,

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

      renderAggFn: '',
      renderAggDigits: null,
      renderAggFormat: null,

      renderFixed: '',
      renderVisible: false,

      renderWidth: defaultRenderWidth,
      renderHeight: 0,
      renderResizeWidth: 0,
      renderAutoWidth: 0,
      resizeWidth: 0, // 手动调整

      renderLeft: 0,
      renderArgs: [], // 渲染参数可用于扩展
      model: {},
      renderHeader: renderHeader || colConfs.renderHeader,
      renderCell: renderCell || colConfs.renderCell,
      renderFooter: renderFooter || colConfs.renderFooter,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: colConfs.slots
    })
    if (ctFilterOptions && (!filters || !filters.length)) {
      (this as any).filters = toFilters(ctFilterOptions({ $table: $xeTable, column: this as unknown as VxeTableDefines.ColumnInfo }), colId)
    }
    if ($xeGGWrapper) {
      const { computeProxyOpts } = $xeGGWrapper.getComputeMaps()
      const proxyOpts = computeProxyOpts.value
      if (proxyOpts.beforeColumn) {
        proxyOpts.beforeColumn({ $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt, column: this as unknown as VxeTableDefines.ColumnInfo })
      }
    }
  }

  getTitle () {
    return getFuncText(this.title || (this.type === 'seq' ? getI18n('vxe.table.seqTitle') : ''))
  }

  getKey () {
    const { type, field } = this
    return field || (type ? `type=${type}` : null)
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

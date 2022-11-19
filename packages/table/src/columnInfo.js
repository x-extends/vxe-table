import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { formats } from '../../v-x-e-table/src/formats'
import { toFilters } from './util'
import { getFuncText } from '../../tools/utils'
import { warnLog, errLog } from '../../tools/log'

export class ColumnInfo {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  constructor ($xetable, _vm, { renderHeader, renderCell, renderFooter, renderData } = {}) {
    const $xegrid = $xetable.$xegrid
    const proxyOpts = $xegrid ? $xegrid.proxyOpts : null
    const formatter = _vm.formatter
    const visible = XEUtils.isBoolean(_vm.visible) ? _vm.visible : true

    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      const types = ['seq', 'checkbox', 'radio', 'expand', 'html']
      if (_vm.type && types.indexOf(_vm.type) === -1) {
        warnLog('vxe.error.errProp', [`type=${_vm.type}`, types.join(', ')])
      }
      if (XEUtils.isBoolean(_vm.cellRender) || (_vm.cellRender && !XEUtils.isObject(_vm.cellRender))) {
        warnLog('vxe.error.errProp', [`column.cell-render=${_vm.cellRender}`, 'column.cell-render={}'])
      }
      if (XEUtils.isBoolean(_vm.editRender) || (_vm.editRender && !XEUtils.isObject(_vm.editRender))) {
        warnLog('vxe.error.errProp', [`column.edit-render=${_vm.editRender}`, 'column.edit-render={}'])
      }
      if (_vm.cellRender && _vm.editRender) {
        warnLog('vxe.error.errConflicts', ['column.cell-render', 'column.edit-render'])
      }
      if (_vm.type === 'expand') {
        if ($xetable.treeConfig && $xetable.treeOpts.line) {
          errLog('vxe.error.errConflicts', ['tree-config.line', 'column.type=expand'])
        }
      }
      if (_vm.remoteSort) {
        warnLog('vxe.error.delProp', ['column.remote-sort', 'sort-config.remote'])
      }
      if (_vm.sortMethod) {
        warnLog('vxe.error.delProp', ['column.sort-method', 'sort-config.sortMethod'])
      }
      if (formatter) {
        if (XEUtils.isString(formatter)) {
          const globalFunc = formats.get(formatter) || XEUtils[formatter]
          if (!XEUtils.isFunction(globalFunc)) {
            errLog('vxe.error.notFunc', [formatter])
          }
        } else if (XEUtils.isArray(formatter)) {
          const globalFunc = formats.get(formatter[0]) || XEUtils[formatter[0]]
          if (!XEUtils.isFunction(globalFunc)) {
            errLog('vxe.error.notFunc', [formatter[0]])
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
      sortMethod: _vm.sortMethod,
      remoteSort: _vm.remoteSort,
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
      exportMethod: _vm.exportMethod,
      footerExportMethod: _vm.footerExportMethod,
      titleHelp: _vm.titleHelp,
      titlePrefix: _vm.titlePrefix,
      // 自定义参数
      params: _vm.params,
      // 渲染属性
      id: _vm.colId || XEUtils.uniqueId('col_'),
      parentId: null,
      visible,
      // 内部属性（一旦被使用，将导致不可升级版本）
      halfVisible: false,
      defaultVisible: visible,
      checked: false,
      halfChecked: false,
      disabled: false,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      order: null,
      sortTime: 0,
      renderWidth: 0,
      renderHeight: 0,
      resizeWidth: 0,
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
    if (proxyOpts && proxyOpts.beforeColumn) {
      proxyOpts.beforeColumn({ $grid: $xegrid, column: this })
    }
  }

  getTitle () {
    return getFuncText(this.title || (this.type === 'seq' ? GlobalConfig.i18n('vxe.table.seqTitle') : ''))
  }

  getKey () {
    return this.field || (this.type ? `type=${this.type}` : null)
  }

  update (name, value) {
    // 不支持双向的属性
    if (name !== 'filters') {
      if (name === 'field') {
        // 兼容旧属性
        this.property = value
      }
      this[name] = value
    }
  }
}

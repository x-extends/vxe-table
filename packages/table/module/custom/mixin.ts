import XEUtils from 'xe-utils'

import type { VxeColumnPropTypes } from '../../../../types'

export default {
  methods: {
    _openCustom () {
      const $xeTable = this
      const reactData = $xeTable

      const { initStore, customStore } = reactData
      customStore.visible = true
      initStore.custom = true
      $xeTable.handleUpdateCustomColumn()
      $xeTable.checkCustomStatus()
      $xeTable.calcMaxHeight()
      return this.$nextTick().then(() => this.calcMaxHeight())
    },
    _closeCustom () {
      const { customStore, customOpts } = this
      if (customStore.visible) {
        customStore.visible = false
        if (!customOpts.immediate) {
          this.handleCustom()
        }
      }
      return this.$nextTick()
    },
    _saveCustom () {
      const $xeTable = this
      const reactData = $xeTable

      const { customOpts, customColumnList } = this
      const { allowVisible, allowSort, allowFixed, allowResizable } = customOpts
      XEUtils.eachTree(customColumnList, (column, index, items, path, parentColumn) => {
        if (parentColumn) {
          // 更新子列信息
          column.fixed = parentColumn.fixed
        } else {
          if (allowSort) {
            const sortIndex = index + 1
            column.renderSortNumber = sortIndex
          }
          if (allowFixed) {
            column.fixed = column.renderFixed
          }
        }
        if (allowResizable) {
          if (column.renderVisible && (!column.children || column.children.length)) {
            if (column.renderResizeWidth !== column.renderWidth) {
              column.resizeWidth = column.renderResizeWidth
              column.renderWidth = column.renderResizeWidth
            }
          }
        }
        if (allowVisible) {
          column.visible = column.renderVisible
        }
      })
      reactData.isCustomStatus = true
      reactData.isDragColMove = true
      setTimeout(() => {
        reactData.isDragColMove = false
      }, 1000)
      return $xeTable.saveCustomStore('confirm')
    },
    _cancelCustom () {
      const $xeTable = this

      const { customStore, customOpts, customColumnList } = $xeTable
      const { oldSortMaps, oldFixedMaps, oldVisibleMaps } = customStore
      const { allowVisible, allowSort, allowFixed, allowResizable } = customOpts
      XEUtils.eachTree(customColumnList, column => {
        const colid = column.getKey()
        const visible = !!oldVisibleMaps[colid]
        const fixed = oldFixedMaps[colid] || ''
        if (allowVisible) {
          column.renderVisible = visible
          column.visible = visible
        }
        if (allowFixed) {
          column.renderFixed = fixed
          column.fixed = fixed
        }
        if (allowSort) {
          column.renderSortNumber = oldSortMaps[colid] || 0
        }
        if (allowResizable) {
          column.renderResizeWidth = column.renderWidth
        }
      }, { children: 'children' })
      return $xeTable.$nextTick()
    },
    _resetCustom (options: any) {
      const $xeTable = this
      const reactData = $xeTable
      const internalData = $xeTable

      const { collectColumn, customOpts } = internalData
      const { checkMethod } = customOpts
      const opts = Object.assign({
        visible: true,
        resizable: options === true,
        fixed: options === true,
        sort: options === true
      }, options)
      XEUtils.eachTree(collectColumn, (column) => {
        if (opts.resizable) {
          column.resizeWidth = 0
        }
        if (opts.fixed) {
          column.fixed = column.defaultFixed
        }
        if (opts.sort) {
          column.renderSortNumber = column.sortNumber
        }
        if (!checkMethod || checkMethod({ column })) {
          column.visible = column.defaultVisible
        }
        column.renderResizeWidth = column.renderWidth
      })
      reactData.isCustomStatus = false
      $xeTable.saveCustomStore('reset')
      return $xeTable.handleCustom()
    },
    _toggleCustomAllCheckbox () {
      const { customStore } = this
      const isAll = !customStore.isAll
      return this.setCustomAllCheckbox(isAll)
    },
    _setCustomAllCheckbox (checked: boolean) {
      const $xeTable = this
      const reactData = $xeTable

      const { customStore } = this
      const { customColumnList, customOpts } = this
      const { checkMethod, visibleMethod } = customOpts
      const isAll = !!checked
      if (customOpts.immediate) {
        XEUtils.eachTree(customColumnList, (column) => {
          if (visibleMethod && !visibleMethod({ column })) {
            return
          }
          if (checkMethod && !checkMethod({ column })) {
            return
          }
          column.visible = isAll
          column.renderVisible = isAll
          column.halfVisible = false
        })
        customStore.isAll = isAll
        reactData.isCustomStatus = true
        $xeTable.handleCustom()
        $xeTable.saveCustomStore('update:visible')
      } else {
        XEUtils.eachTree(customColumnList, (column) => {
          if (visibleMethod && !visibleMethod({ column })) {
            return
          }
          if (checkMethod && !checkMethod({ column })) {
            return
          }
          column.renderVisible = isAll
          column.halfVisible = false
        })
        customStore.isAll = isAll
      }
      $xeTable.checkCustomStatus()
    },
    calcMaxHeight  () {
      const { $el, customStore } = this
      // 判断面板不能大于表格高度
      let tableHeight = 0
      if ($el) {
        tableHeight = $el.clientHeight - 28
      }
      customStore.maxHeight = Math.max(88, tableHeight)
    },
    checkCustomStatus () {
      const { customStore, collectColumn, customOpts } = this
      const { checkMethod } = customOpts
      customStore.isAll = collectColumn.every((column: any) => (checkMethod ? !checkMethod({ column }) : false) || column.renderVisible)
      customStore.isIndeterminate = !customStore.isAll && collectColumn.some((column: any) => (!checkMethod || checkMethod({ column })) && (column.renderVisible || column.halfVisible))
    },
    emitCustomEvent (type: any, evnt: any) {
      const comp = this.$xegrid || this
      comp.$emit('custom', { type, $table: this, $grid: this.$xegrid, $event: evnt })
    },
    triggerCustomEvent (evnt: any) {
      const { customStore } = this
      if (customStore.visible) {
        this.closeCustom()
        this.emitCustomEvent('close', evnt)
      } else {
        customStore.btnEl = evnt.target
        this.openCustom()
        this.emitCustomEvent('open', evnt)
      }
    },
    customOpenEvent (evnt: any) {
      const { customStore } = this
      if (!customStore.visible) {
        customStore.activeBtn = true
        customStore.btnEl = evnt.target
        this.openCustom()
        this.emitCustomEvent('open', evnt)
      }
    },
    customCloseEvent (evnt: any) {
      const { customStore } = this
      if (customStore.visible) {
        customStore.activeBtn = false
        this.closeCustom()
        this.emitCustomEvent('close', evnt)
      }
    },
    handleUpdateCustomColumn () {
      const $xeTable = this
      const reactData = $xeTable
      const internalData = $xeTable

      const { customStore } = reactData
      const { collectColumn } = internalData
      if (customStore.visible) {
        const sortMaps: Record<string, number> = {}
        const fixedMaps: Record<string, VxeColumnPropTypes.Fixed> = {}
        const visibleMaps: Record<string, boolean> = {}
        XEUtils.eachTree(collectColumn, column => {
          const colid = column.getKey()
          column.renderFixed = column.fixed
          column.renderVisible = column.visible
          column.renderResizeWidth = column.renderWidth
          sortMaps[colid] = column.renderSortNumber
          fixedMaps[colid] = column.fixed
          visibleMaps[colid] = column.visible
        })
        customStore.oldSortMaps = sortMaps
        customStore.oldFixedMaps = fixedMaps
        customStore.oldVisibleMaps = visibleMaps
        reactData.customColumnList = collectColumn.slice(0)
      }
    }
  } as any
}

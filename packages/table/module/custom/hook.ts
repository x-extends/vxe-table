import { nextTick } from 'vue'
import { VxeUI } from '../../../ui'
import XEUtils from 'xe-utils'

import type { TableCustomMethods, TableCustomPrivateMethods, VxeColumnPropTypes, VxeTableDefines } from '../../../../types'

const tableCustomMethodKeys: (keyof TableCustomMethods)[] = ['openCustom', 'closeCustom', 'saveCustom', 'cancelCustom', 'resetCustom', 'toggleCustomAllCheckbox', 'setCustomAllCheckbox']

VxeUI.hooks.add('tableCustomModule', {
  setupTable ($xeTable) {
    const { reactData, internalData } = $xeTable
    const { computeCustomOpts } = $xeTable.getComputeMaps()
    const { refElem } = $xeTable.getRefMaps()

    const $xeGrid = $xeTable.xegrid

    const calcMaxHeight = () => {
      const { customStore } = reactData
      const el = refElem.value
      // 判断面板不能大于表格高度
      let tableHeight = 0
      if (el) {
        tableHeight = el.clientHeight - 28
      }
      customStore.maxHeight = Math.max(88, tableHeight)
    }

    const openCustom = () => {
      const { initStore, customStore } = reactData
      customStore.visible = true
      initStore.custom = true
      handleUpdateCustomColumn()
      checkCustomStatus()
      calcMaxHeight()
      return nextTick().then(() => calcMaxHeight())
    }

    const handleUpdateCustomColumn = () => {
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

    const closeCustom = () => {
      const { customStore } = reactData
      const customOpts = computeCustomOpts.value
      if (customStore.visible) {
        customStore.visible = false
        if (!customOpts.immediate) {
          $xeTable.handleCustom()
        }
      }
      return nextTick()
    }

    const saveCustom = () => {
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
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
    }

    const cancelCustom = () => {
      const { customColumnList, customStore } = reactData
      const { oldSortMaps, oldFixedMaps, oldVisibleMaps } = customStore
      const customOpts = computeCustomOpts.value
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
      return nextTick()
    }

    const setCustomAllCheckbox = (checked: boolean) => {
      const { customStore } = reactData
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
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
      return nextTick()
    }

    const customMethods: TableCustomMethods = {
      openCustom,
      closeCustom,
      saveCustom,
      cancelCustom,
      resetCustom (options) {
        const { collectColumn } = internalData
        const customOpts = computeCustomOpts.value
        const { checkMethod } = customOpts
        const opts: VxeTableDefines.VxeTableCustomStorageObj = Object.assign({
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
      toggleCustomAllCheckbox () {
        const { customStore } = reactData
        const isAll = !customStore.isAll
        return setCustomAllCheckbox(isAll)
      },
      setCustomAllCheckbox
    }

    const checkCustomStatus = () => {
      const { customStore } = reactData
      const { collectColumn } = internalData
      const customOpts = computeCustomOpts.value
      const { checkMethod } = customOpts
      customStore.isAll = collectColumn.every((column) => (checkMethod ? !checkMethod({ column }) : false) || column.renderVisible)
      customStore.isIndeterminate = !customStore.isAll && collectColumn.some((column) => (!checkMethod || checkMethod({ column })) && (column.renderVisible || column.halfVisible))
    }

    const emitCustomEvent = (type: VxeTableDefines.CustomType, evnt: Event) => {
      const comp = $xeGrid || $xeTable
      comp.dispatchEvent('custom', { type }, evnt)
    }

    const customPrivateMethods: TableCustomPrivateMethods = {
      checkCustomStatus,
      emitCustomEvent,
      triggerCustomEvent (evnt) {
        const { customStore } = $xeTable.reactData
        if (customStore.visible) {
          closeCustom()
          emitCustomEvent('close', evnt)
        } else {
          customStore.btnEl = evnt.target as HTMLDivElement
          openCustom()
          emitCustomEvent('open', evnt)
        }
      },
      customOpenEvent (evnt) {
        const { customStore } = reactData
        if (!customStore.visible) {
          customStore.activeBtn = true
          customStore.btnEl = evnt.target as HTMLDivElement
          $xeTable.openCustom()
          $xeTable.emitCustomEvent('open', evnt)
        }
      },
      customCloseEvent (evnt) {
        const { customStore } = reactData
        if (customStore.visible) {
          customStore.activeBtn = false
          $xeTable.closeCustom()
          $xeTable.emitCustomEvent('close', evnt)
        }
      },
      handleUpdateCustomColumn
    }

    return { ...customMethods, ...customPrivateMethods }
  },
  setupGrid ($xeGrid) {
    return $xeGrid.extendTableMethods(tableCustomMethodKeys)
  }
})

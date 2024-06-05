import { nextTick } from 'vue'
import { VxeUI } from '../../../ui'
import XEUtils from 'xe-utils'

import type { TableCustomMethods, TableCustomPrivateMethods, VxeColumnPropTypes } from '../../../../types'

const tableCustomMethodKeys: (keyof TableCustomMethods)[] = ['openCustom', 'closeCustom']

VxeUI.hooks.add('tableCustomModule', {
  setupTable ($xeTable) {
    const { reactData, internalData } = $xeTable
    const { computeCustomOpts } = $xeTable.getComputeMaps()
    const { refTableHeader, refTableBody, refTableCustom } = $xeTable.getRefMaps()

    const $xeGrid = $xeTable.xegrid

    const calcMaxHeight = () => {
      const { customStore } = reactData
      const tableHeader = refTableHeader.value
      const tableBody = refTableBody.value
      const tableCustom = refTableCustom.value
      const customWrapperElem = tableCustom ? tableCustom.$el as HTMLDivElement : null
      const headElem = tableHeader.$el as HTMLDivElement
      const bodyElem = tableBody.$el as HTMLDivElement
      // 判断面板不能大于表格高度
      let tableHeight = 0
      if (headElem) {
        tableHeight += headElem.clientHeight
      }
      if (bodyElem) {
        tableHeight += bodyElem.clientHeight
      }
      customStore.maxHeight = Math.max(0, customWrapperElem ? Math.min(customWrapperElem.clientHeight, tableHeight - 80) : 0)
    }

    const openCustom = () => {
      const { initStore, customStore } = reactData
      const { collectColumn } = internalData
      const sortMaps: Record<string, number> = {}
      const fixedMaps: Record<string, VxeColumnPropTypes.Fixed> = {}
      const visibleMaps: Record<string, boolean> = {}
      XEUtils.eachTree(collectColumn, column => {
        const colid = column.getKey()
        column.renderFixed = column.fixed
        column.renderVisible = column.visible
        sortMaps[colid] = column.renderSortNumber
        fixedMaps[colid] = column.fixed
        visibleMaps[colid] = column.visible
      }, { children: 'children' })
      customStore.oldSortMaps = sortMaps
      customStore.oldFixedMaps = fixedMaps
      customStore.oldVisibleMaps = visibleMaps
      reactData.customColumnList = collectColumn.slice(0)
      customStore.visible = true
      initStore.custom = true
      checkCustomStatus()
      calcMaxHeight()
      return nextTick().then(() => calcMaxHeight())
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

    const customMethods: TableCustomMethods = {
      openCustom,
      closeCustom
    }

    const checkCustomStatus = () => {
      const { customStore } = reactData
      const { collectColumn } = internalData
      const customOpts = computeCustomOpts.value
      const { checkMethod } = customOpts
      customStore.isAll = collectColumn.every((column) => (checkMethod ? !checkMethod({ column }) : false) || column.visible)
      customStore.isIndeterminate = !customStore.isAll && collectColumn.some((column) => (!checkMethod || checkMethod({ column })) && (column.visible || column.halfVisible))
    }

    const emitCustomEvent = (type: string, evnt: Event) => {
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
      }
    }

    return { ...customMethods, ...customPrivateMethods }
  },
  setupGrid ($xeGrid) {
    return $xeGrid.extendTableMethods(tableCustomMethodKeys)
  }
})

import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { getDomNode, getAbsolutePos, getEventTargetNode } from '../../../ui/src/dom'
import { isEnableConf, hasChildrenList } from '../../../ui/src/utils'
import { warnLog } from '../../../ui/src/log'

import type { VxeTableConstructor, VxeTablePrivateMethods, TableInternalData, TableReactData } from '../../../../types'

const { menus, globalEvents, GLOBAL_EVENT_KEYS } = VxeUI

export default {
  methods: {
    /**
     * 关闭快捷菜单
     */
    _closeMenu () {
      const $xeTable = this as unknown as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      Object.assign(reactData.ctxMenuStore, {
        visible: false,
        selected: null,
        selectChild: null,
        showChild: false
      })
      return $xeTable.$nextTick()
    },
    // 处理菜单的移动
    moveCtxMenu (evnt: KeyboardEvent, ctxMenuStore: any, property: 'selectChild' | 'selected', hasOper: boolean, operRest: any, menuList: any[]) {
      const $xeTable = this as unknown as VxeTableConstructor & VxeTablePrivateMethods

      let selectItem
      const selectIndex = XEUtils.findIndexOf(menuList, item => ctxMenuStore[property] === item)
      if (hasOper) {
        if (operRest && hasChildrenList(ctxMenuStore.selected)) {
          ctxMenuStore.showChild = true
        } else {
          ctxMenuStore.showChild = false
          ctxMenuStore.selectChild = null
        }
      } else if (globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)) {
        for (let len = selectIndex - 1; len >= 0; len--) {
          if (menuList[len].visible !== false) {
            selectItem = menuList[len]
            break
          }
        }
        ctxMenuStore[property] = selectItem || menuList[menuList.length - 1]
      } else if (globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)) {
        for (let index = selectIndex + 1; index < menuList.length; index++) {
          if (menuList[index].visible !== false) {
            selectItem = menuList[index]
            break
          }
        }
        ctxMenuStore[property] = selectItem || menuList[0]
      } else if (ctxMenuStore[property] && (globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ENTER) || globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.SPACEBAR))) {
        $xeTable.ctxMenuLinkEvent(evnt, ctxMenuStore[property])
      }
    },
    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent (evnt: any) {
      const $xeTable = this as unknown as VxeTableConstructor & VxeTablePrivateMethods
      const $xeGrid = $xeTable.$xeGrid
      const $xeGantt = $xeTable.$xeGantt
      const props = $xeTable
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { xID } = $xeTable

      const { mouseConfig, menuConfig } = props
      const { editStore, ctxMenuStore } = reactData
      const { visibleColumn } = internalData
      const tableFilter = $xeTable.$refs.refTableFilter
      const tableMenu = $xeTable.$refs.refTableMenu
      const mouseOpts = $xeTable.computeMouseOpts
      const menuOpts = $xeTable.computeMenuOpts
      const el = $xeTable.$refs.refElem as HTMLDivElement
      const { selected } = editStore
      const layoutList = ['header', 'body', 'footer']
      if (isEnableConf(menuConfig)) {
        if (ctxMenuStore.visible && tableMenu && getEventTargetNode(evnt, (tableMenu as any).$el).flag) {
          evnt.preventDefault()
          return
        }
        if (internalData._keyCtx) {
          const type = 'body'
          const params: any = { type, $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt, keyboard: true, columns: visibleColumn.slice(0), $event: evnt }
          // 如果开启单元格区域
          if (mouseConfig && mouseOpts.area) {
            const activeArea = $xeTable.getActiveCellArea()
            if (activeArea && activeArea.row && activeArea.column) {
              params.row = activeArea.row
              params.column = activeArea.column
              $xeTable.handleOpenMenuEvent(evnt, type, params)
              return
            }
          } else if (mouseConfig && mouseOpts.selected) {
            // 如果启用键盘导航且已选中单元格
            if (selected.row && selected.column) {
              params.row = selected.row
              params.column = selected.column
              $xeTable.handleOpenMenuEvent(evnt, type, params)
              return
            }
          }
        }
        // 分别匹配表尾、内容、表尾的快捷菜单
        for (let index = 0; index < layoutList.length; index++) {
          const layout = layoutList[index] as 'header' | 'body' | 'footer'
          const columnTargetNode = getEventTargetNode(evnt, el, `vxe-${layout}--column`, (target: any) => {
            // target=td|th，直接向上找 table 去匹配即可
            return target.parentNode.parentNode.parentNode.getAttribute('xid') === xID
          })
          const params: any = { type: layout, $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt, columns: visibleColumn.slice(0), $event: evnt }
          if (columnTargetNode.flag) {
            const cell = columnTargetNode.targetElem
            const columnNodeRest = $xeTable.getColumnNode(cell)
            const column = columnNodeRest ? columnNodeRest.item : null
            let typePrefix = `${layout}-`
            if (column) {
              Object.assign(params, { column, columnIndex: $xeTable.getColumnIndex(column), cell })
            }
            if (layout === 'body') {
              const rowNodeRest = $xeTable.getRowNode(cell.parentNode)
              const row = rowNodeRest ? rowNodeRest.item : null
              typePrefix = ''
              if (row) {
                params.row = row
                params.rowIndex = $xeTable.getRowIndex(row)
              }
            }
            const eventType = `${typePrefix}cell-menu` as 'cell-menu' | 'header-cell-menu' | 'footer-cell-menu'
            $xeTable.handleOpenMenuEvent(evnt, layout, params)
            // 在 v4 中废弃事件 cell-context-menu、header-cell-context-menu、footer-cell-context-menu
            if ($xeTable.$listeners[`${typePrefix}cell-context-menu`]) {
              warnLog('vxe.error.delEvent', [`${typePrefix}cell-context-menu`, `${typePrefix}cell-menu`])
              $xeTable.dispatchEvent(`${typePrefix}cell-context-menu` as any, params, evnt)
            } else {
              $xeTable.dispatchEvent(eventType, params, evnt)
            }
            return
          } else if (getEventTargetNode(evnt, $xeTable.$el, `vxe-table--${layout}-wrapper`, target => target.getAttribute('xid') === xID).flag) {
            if (menuOpts.trigger === 'cell') {
              evnt.preventDefault()
            } else {
              $xeTable.handleOpenMenuEvent(evnt, layout, params)
            }
            return
          }
        }
      }
      if (tableFilter && !getEventTargetNode(evnt, (tableFilter as any).$el).flag) {
        $xeTable.closeFilter()
      }
      $xeTable.closeMenu()
    },
    /**
     * 显示快捷菜单
     */
    handleOpenMenuEvent (evnt: any, type: 'header' | 'body' | 'footer', params: any) {
      const $xeTable = this as unknown as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { ctxMenuStore } = reactData
      const isMenu = $xeTable.computeIsMenu
      const menuOpts = $xeTable.computeMenuOpts
      const config = menuOpts[type]
      const visibleMethod = menuOpts.visibleMethod
      if (config) {
        const { options, disabled } = config
        if (disabled) {
          evnt.preventDefault()
        } else if (isMenu && options && options.length) {
          params.options = options
          $xeTable.preventEvent(evnt, 'event.showMenu', params, () => {
            if (!visibleMethod || visibleMethod(params)) {
              evnt.preventDefault()
              $xeTable.updateZindex()
              const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = getDomNode()
              let top = evnt.clientY + scrollTop
              let left = evnt.clientX + scrollLeft
              const handleVisible = () => {
                internalData._currMenuParams = params
                Object.assign(ctxMenuStore, {
                  visible: true,
                  list: options,
                  selected: null,
                  selectChild: null,
                  showChild: false,
                  style: {
                    zIndex: internalData.tZindex,
                    top: `${top}px`,
                    left: `${left}px`
                  }
                })
                $xeTable.$nextTick(() => {
                  const tableMenu = $xeTable.$refs.refTableMenu
                  const ctxElem = (tableMenu as any).$el
                  const clientHeight = ctxElem.clientHeight
                  const clientWidth = ctxElem.clientWidth
                  const { boundingTop, boundingLeft } = getAbsolutePos(ctxElem)
                  const offsetTop = boundingTop + clientHeight - visibleHeight
                  const offsetLeft = boundingLeft + clientWidth - visibleWidth
                  if (offsetTop > -10) {
                    ctxMenuStore.style.top = `${Math.max(scrollTop + 2, top - clientHeight - 2)}px`
                  }
                  if (offsetLeft > -10) {
                    ctxMenuStore.style.left = `${Math.max(scrollLeft + 2, left - clientWidth - 2)}px`
                  }
                })
              }
              const { keyboard, row, column } = params
              if (keyboard && row && column) {
                $xeTable.scrollToRow(row, column).then(() => {
                  const cell = $xeTable.getCellElement(row, column)
                  if (cell) {
                    const { boundingTop, boundingLeft } = getAbsolutePos(cell)
                    top = boundingTop + scrollTop + Math.floor(cell.offsetHeight / 2)
                    left = boundingLeft + scrollLeft + Math.floor(cell.offsetWidth / 2)
                  }
                  handleVisible()
                })
              } else {
                handleVisible()
              }
            } else {
              $xeTable.closeMenu()
            }
          })
        }
      }
      $xeTable.closeFilter()
    },
    ctxMenuMouseoverEvent (evnt: any, item: any, child: any) {
      const $xeTable = this as unknown as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const menuElem = evnt.currentTarget
      const { ctxMenuStore } = reactData
      evnt.preventDefault()
      evnt.stopPropagation()
      ctxMenuStore.selected = item
      ctxMenuStore.selectChild = child
      if (!child) {
        ctxMenuStore.showChild = hasChildrenList(item)
        if (ctxMenuStore.showChild) {
          $xeTable.$nextTick(() => {
            const childWrapperElem = menuElem.nextElementSibling
            if (childWrapperElem) {
              const { boundingTop, boundingLeft, visibleHeight, visibleWidth } = getAbsolutePos(menuElem)
              const posTop = boundingTop + menuElem.offsetHeight
              const posLeft = boundingLeft + menuElem.offsetWidth
              let left = ''
              let right = ''
              // 是否超出右侧
              if (posLeft + childWrapperElem.offsetWidth > visibleWidth - 10) {
                left = 'auto'
                right = `${menuElem.offsetWidth}px`
              }
              // 是否超出底部
              let top = ''
              let bottom = ''
              if (posTop + childWrapperElem.offsetHeight > visibleHeight - 10) {
                top = 'auto'
                bottom = '0'
              }
              childWrapperElem.style.left = left
              childWrapperElem.style.right = right
              childWrapperElem.style.top = top
              childWrapperElem.style.bottom = bottom
            }
          })
        }
      }
    },
    ctxMenuMouseoutEvent (evnt: any, item: any) {
      const $xeTable = this as unknown as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { ctxMenuStore } = reactData
      if (!item.children) {
        ctxMenuStore.selected = null
      }
      ctxMenuStore.selectChild = null
    },
    /**
     * 快捷菜单点击事件
     */
    ctxMenuLinkEvent (evnt: any, menu: any) {
      const $xeTable = this as unknown as VxeTableConstructor & VxeTablePrivateMethods
      const $xeGrid = $xeTable.$xeGrid
      const $xeGantt = $xeTable.$xeGantt
      const internalData = $xeTable as unknown as TableInternalData

      // 如果一级菜单有配置 code 则允许点击，否则不能点击
      if (!menu.disabled && (menu.code || !menu.children || !menu.children.length)) {
        const gMenuOpts = menus.get(menu.code)
        const params = Object.assign({}, internalData._currMenuParams, { menu, $table: $xeTable, $grid: $xeGrid, $gantt: $xeGantt, $event: evnt })
        if (gMenuOpts && gMenuOpts.menuMethod) {
          gMenuOpts.menuMethod(params, evnt)
        }
        // 在 v4 中废弃事件 context-menu-click
        if ($xeTable.$listeners['context-menu-click']) {
          warnLog('vxe.error.delEvent', ['context-menu-click', 'menu-click'])
          $xeTable.dispatchEvent('context-menu-click' as any, params, evnt)
        } else {
          $xeTable.dispatchEvent('menu-click', params, evnt)
        }
        $xeTable.closeMenu()
      }
    }
  }
}

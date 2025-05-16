import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { getDomNode, getAbsolutePos, getEventTargetNode } from '../../../ui/src/dom'
import { isEnableConf, hasChildrenList } from '../../../ui/src/utils'
import { warnLog } from '../../../ui/src/log'

import type { VxeTableConstructor, VxeTablePrivateMethods, VxeGridConstructor, GridPrivateMethods, TableInternalData } from '../../../../types'

const { menus, globalEvents, GLOBAL_EVENT_KEYS } = VxeUI

export default {
  methods: {
    /**
     * 关闭快捷菜单
     */
    _closeMenu () {
      Object.assign(this.ctxMenuStore, {
        visible: false,
        selected: null,
        selectChild: null,
        showChild: false
      })
      return this.$nextTick()
    },
    // 处理菜单的移动
    moveCtxMenu (evnt: KeyboardEvent, ctxMenuStore: any, property: 'selectChild' | 'selected', hasOper: boolean, operRest: any, menuList: any[]) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

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
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods
      const internalData = $xeTable as unknown as TableInternalData

      const { $refs, tId, editStore, menuConfig, contextMenu, ctxMenuStore, ctxMenuOpts, mouseConfig, mouseOpts } = this
      const { selected } = editStore
      const tableFilter = $xeTable.$refs.refTableFilter
      const layoutList = ['header', 'body', 'footer']
      if (isEnableConf(menuConfig) || contextMenu) {
        if (ctxMenuStore.visible && $refs.refTableMenu && getEventTargetNode(evnt, $refs.refTableMenu.$el).flag) {
          evnt.preventDefault()
          return
        }
        if (internalData._keyCtx) {
          const type = 'body'
          const params: any = { type, $grid: $xeGrid, $table: this, keyboard: true, columns: this.visibleColumn.slice(0), $event: evnt }
          // 如果开启单元格区域
          if (mouseConfig && mouseOpts.area) {
            const activeArea = this.getActiveCellArea()
            if (activeArea && activeArea.row && activeArea.column) {
              params.row = activeArea.row
              params.column = activeArea.column
              this.handleOpenMenuEvent(evnt, type, params)
              return
            }
          } else if (mouseConfig && mouseOpts.selected) {
            // 如果启用键盘导航且已选中单元格
            if (selected.row && selected.column) {
              params.row = selected.row
              params.column = selected.column
              this.handleOpenMenuEvent(evnt, type, params)
              return
            }
          }
        }
        // 分别匹配表尾、内容、表尾的快捷菜单
        for (let index = 0; index < layoutList.length; index++) {
          const layout = layoutList[index]
          const columnTargetNode = getEventTargetNode(evnt, this.$el, `vxe-${layout}--column`, (target: any) => {
            // target=td|th，直接向上找 table 去匹配即可
            return target.parentNode.parentNode.parentNode.getAttribute('xid') === tId
          })
          const params: any = { type: layout, $grid: $xeGrid, $table: this, columns: this.visibleColumn.slice(0), $event: evnt }
          if (columnTargetNode.flag) {
            const cell = columnTargetNode.targetElem
            const column = this.getColumnNode(cell).item
            let typePrefix = `${layout}-`
            Object.assign(params, { column, columnIndex: this.getColumnIndex(column), cell })
            if (layout === 'body') {
              const row = this.getRowNode(cell.parentNode).item
              typePrefix = ''
              params.row = row
              params.rowIndex = this.getRowIndex(row)
            }
            this.handleOpenMenuEvent(evnt, layout, params)
            // 在 v4 中废弃事件 cell-context-menu、header-cell-context-menu、footer-cell-context-menu
            if (this.$listeners[`${typePrefix}cell-context-menu`]) {
              warnLog('vxe.error.delEvent', [`${typePrefix}cell-context-menu`, `${typePrefix}cell-menu`])
              this.emitEvent(`${typePrefix}cell-context-menu`, params, evnt)
            } else {
              this.emitEvent(`${typePrefix}cell-menu`, params, evnt)
            }
            return
          } else if (getEventTargetNode(evnt, this.$el, `vxe-table--${layout}-wrapper`, target => target.getAttribute('xid') === tId).flag) {
            if (ctxMenuOpts.trigger === 'cell') {
              evnt.preventDefault()
            } else {
              this.handleOpenMenuEvent(evnt, layout, params)
            }
            return
          }
        }
      }
      if (tableFilter && !getEventTargetNode(evnt, (tableFilter as any).$el).flag) {
        this.closeFilter()
      }
      this.closeMenu()
    },
    /**
     * 显示快捷菜单
     */
    handleOpenMenuEvent (evnt: any, type: any, params: any) {
      const { isCtxMenu, ctxMenuStore, ctxMenuOpts } = this
      const config = ctxMenuOpts[type]
      const visibleMethod = ctxMenuOpts.visibleMethod
      if (config) {
        const { options, disabled } = config
        if (disabled) {
          evnt.preventDefault()
        } else if (isCtxMenu && options && options.length) {
          params.options = options
          this.preventEvent(evnt, 'event.showMenu', params, () => {
            if (!visibleMethod || visibleMethod(params)) {
              evnt.preventDefault()
              this.updateZindex()
              const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = getDomNode()
              let top = evnt.clientY + scrollTop
              let left = evnt.clientX + scrollLeft
              const handleVisible = () => {
                Object.assign(ctxMenuStore, {
                  args: params,
                  visible: true,
                  list: options,
                  selected: null,
                  selectChild: null,
                  showChild: false,
                  style: {
                    zIndex: this.tZindex,
                    top: `${top}px`,
                    left: `${left}px`
                  }
                })
                this.$nextTick(() => {
                  const ctxElem = this.$refs.refTableMenu.$el
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
                this.scrollToRow(row, column).then(() => {
                  const cell = this.getCellElement(row, column)
                  const { boundingTop, boundingLeft } = getAbsolutePos(cell)
                  top = boundingTop + scrollTop + Math.floor(cell.offsetHeight / 2)
                  left = boundingLeft + scrollLeft + Math.floor(cell.offsetWidth / 2)
                  handleVisible()
                })
              } else {
                handleVisible()
              }
            } else {
              this.closeMenu()
            }
          })
        }
      }
      this.closeFilter()
    },
    ctxMenuMouseoverEvent (evnt: any, item: any, child: any) {
      const menuElem = evnt.currentTarget
      const ctxMenuStore = this.ctxMenuStore
      evnt.preventDefault()
      evnt.stopPropagation()
      ctxMenuStore.selected = item
      ctxMenuStore.selectChild = child
      if (!child) {
        ctxMenuStore.showChild = hasChildrenList(item)
        if (ctxMenuStore.showChild) {
          this.$nextTick(() => {
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
      const ctxMenuStore = this.ctxMenuStore
      if (!item.children) {
        ctxMenuStore.selected = null
      }
      ctxMenuStore.selectChild = null
    },
    /**
     * 快捷菜单点击事件
     */
    ctxMenuLinkEvent (evnt: any, menu: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const $xeGrid = $xeTable.$xeGrid as VxeGridConstructor & GridPrivateMethods

      // 如果一级菜单有配置 code 则允许点击，否则不能点击
      if (!menu.disabled && (menu.code || !menu.children || !menu.children.length)) {
        const gMenuOpts = menus.get(menu.code)
        const params = Object.assign({ menu, $grid: $xeGrid, $table: this, $event: evnt }, this.ctxMenuStore.args)
        if (gMenuOpts && gMenuOpts.menuMethod) {
          gMenuOpts.menuMethod(params, evnt)
        }
        // 在 v4 中废弃事件 context-menu-click
        if (this.$listeners['context-menu-click']) {
          warnLog('vxe.error.delEvent', ['context-menu-click', 'menu-click'])
          this.emitEvent('context-menu-click', params, evnt)
        } else {
          this.emitEvent('menu-click', params, evnt)
        }
        this.closeMenu()
      }
    }
  } as any
}

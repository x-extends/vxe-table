import { nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { VXETable } from '../../v-x-e-table'
import { getDomNode, getAbsolutePos, getEventTargetNode } from '../../tools/dom'
import { hasChildrenList } from '../../tools/utils'

import { VxeGlobalHooksHandles, TableMenuMethods, TableMenuPrivateMethods } from '../../../types/all'

const tableMenuMethodKeys: (keyof TableMenuMethods)[] = ['closeMenu']

const tableMenuHook: VxeGlobalHooksHandles.HookOptions = {
  setupTable ($xetable) {
    const { xID, props, reactData, internalData } = $xetable
    const { refElem, refTableFilter, refTableMenu } = $xetable.getRefMaps()
    const { computeMouseOpts, computeIsMenu, computeMenuOpts } = $xetable.getComputeMaps()

    let menuMethods = {} as TableMenuMethods
    let menuPrivateMethods = {} as TableMenuPrivateMethods

    /**
     * 显示快捷菜单
     */
    const openContextMenu = (evnt: any, type: 'header' | 'body' | 'footer', params: any) => {
      const { ctxMenuStore } = reactData
      const isMenu = computeIsMenu.value
      const menuOpts = computeMenuOpts.value
      const config = menuOpts[type]
      const visibleMethod = menuOpts.visibleMethod
      if (config) {
        const { options, disabled } = config
        if (disabled) {
          evnt.preventDefault()
        } else if (isMenu && options && options.length) {
          params.options = options
          $xetable.preventEvent(evnt, 'event.showMenu', params, null, () => {
            if (!visibleMethod || visibleMethod(params)) {
              evnt.preventDefault()
              $xetable.updateZindex()
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
                nextTick(() => {
                  const tableMenu = refTableMenu.value
                  const ctxElem = tableMenu.getRefMaps().refElem.value
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
                $xetable.scrollToRow(row, column).then(() => {
                  const cell = $xetable.getCell(row, column)
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
              menuMethods.closeMenu()
            }
          })
        }
      }
      $xetable.closeFilter()
    }

    menuMethods = {
      /**
       * 关闭快捷菜单
       */
      closeMenu () {
        Object.assign(reactData.ctxMenuStore, {
          visible: false,
          selected: null,
          selectChild: null,
          showChild: false
        })
        return nextTick()
      }
    }

    menuPrivateMethods = {
      /**
       * 处理菜单的移动
       * @param evnt
       * @param keyCode
       * @param ctxMenuStore
       * @param property
       * @param operKey
       * @param operRest
       * @param menuList
       */
      moveCtxMenu (evnt, keyCode, ctxMenuStore, property, operKey, operRest, menuList) {
        let selectItem
        const selectIndex = XEUtils.findIndexOf(menuList, item => ctxMenuStore[property] === item)
        if (keyCode === operKey) {
          if (operRest && hasChildrenList(ctxMenuStore.selected)) {
            ctxMenuStore.showChild = true
          } else {
            ctxMenuStore.showChild = false
            ctxMenuStore.selectChild = null
          }
        } else if (keyCode === 38) {
          for (let len = selectIndex - 1; len >= 0; len--) {
            if (menuList[len].visible !== false) {
              selectItem = menuList[len]
              break
            }
          }
          ctxMenuStore[property] = selectItem || menuList[menuList.length - 1]
        } else if (keyCode === 40) {
          for (let index = selectIndex + 1; index < menuList.length; index++) {
            if (menuList[index].visible !== false) {
              selectItem = menuList[index]
              break
            }
          }
          ctxMenuStore[property] = selectItem || menuList[0]
        } else if (ctxMenuStore[property] && (keyCode === 13 || keyCode === 32)) {
          menuPrivateMethods.ctxMenuLinkEvent(evnt, ctxMenuStore[property])
        }
      },
      /**
       * 快捷菜单事件处理
       */
      handleGlobalContextmenuEvent (evnt) {
        const { mouseConfig, menuConfig } = props
        const { editStore, ctxMenuStore } = reactData
        const { visibleColumn } = internalData
        const tableFilter = refTableFilter.value
        const tableMenu = refTableMenu.value
        const mouseOpts = computeMouseOpts.value
        const menuOpts = computeMenuOpts.value
        const el = refElem.value
        const { selected } = editStore
        const layoutList = ['header', 'body', 'footer']
        if (menuConfig) {
          if (ctxMenuStore.visible && tableMenu && getEventTargetNode(evnt, tableMenu.getRefMaps().refElem.value).flag) {
            evnt.preventDefault()
            return
          }
          if (internalData._keyCtx) {
            const type = 'body'
            const params: any = { type, $table: $xetable, keyboard: true, columns: visibleColumn.slice(0), $event: evnt }
            // 如果开启单元格区域
            if (mouseConfig && mouseOpts.area) {
              const activeArea = $xetable.getActiveCellArea()
              if (activeArea && activeArea.row && activeArea.column) {
                params.row = activeArea.row
                params.column = activeArea.column
                openContextMenu(evnt, type, params)
                return
              }
            } else if (mouseConfig && mouseOpts.selected) {
              // 如果启用键盘导航且已选中单元格
              if (selected.row && selected.column) {
                params.row = selected.row
                params.column = selected.column
                openContextMenu(evnt, type, params)
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
            const params: any = { type: layout, $table: $xetable, columns: visibleColumn.slice(0), $event: evnt }
            if (columnTargetNode.flag) {
              const cell = columnTargetNode.targetElem
              const columnNodeRest = $xetable.getColumnNode(cell)
              const column = columnNodeRest ? columnNodeRest.item : null
              let typePrefix = `${layout}-`
              if (column) {
                Object.assign(params, { column, columnIndex: $xetable.getColumnIndex(column), cell })
              }
              if (layout === 'body') {
                const rowNodeRest = $xetable.getRowNode(cell.parentNode)
                const row = rowNodeRest ? rowNodeRest.item : null
                typePrefix = ''
                if (row) {
                  params.row = row
                  params.rowIndex = $xetable.getRowIndex(row)
                }
              }
              const eventType = `${typePrefix}cell-menu` as 'cell-menu' | 'header-cell-menu' | 'footer-cell-menu'
              openContextMenu(evnt, layout, params)
              $xetable.dispatchEvent(eventType, params, evnt)
              return
            } else if (getEventTargetNode(evnt, el, `vxe-table--${layout}-wrapper`, target => target.getAttribute('xid') === xID).flag) {
              if (menuOpts.trigger === 'cell') {
                evnt.preventDefault()
              } else {
                openContextMenu(evnt, layout, params)
              }
              return
            }
          }
        }
        if (tableFilter && !getEventTargetNode(evnt, tableFilter.$el).flag) {
          $xetable.closeFilter()
        }
        menuMethods.closeMenu()
      },
      ctxMenuMouseoverEvent (evnt, item, child) {
        const menuElem = evnt.currentTarget
        const { ctxMenuStore } = reactData
        evnt.preventDefault()
        evnt.stopPropagation()
        ctxMenuStore.selected = item
        ctxMenuStore.selectChild = child
        if (!child) {
          ctxMenuStore.showChild = hasChildrenList(item)
          if (ctxMenuStore.showChild) {
            nextTick(() => {
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
      ctxMenuMouseoutEvent (evnt, item) {
        const { ctxMenuStore } = reactData
        if (!item.children) {
          ctxMenuStore.selected = null
        }
        ctxMenuStore.selectChild = null
      },
      /**
       * 快捷菜单点击事件
       */
      ctxMenuLinkEvent (evnt, menu) {
        // 如果一级菜单有配置 code 则允许点击，否则不能点击
        if (!menu.disabled && (menu.code || !menu.children || !menu.children.length)) {
          const ctxMenuMethod = VXETable.menus.get(menu.code)
          const params = Object.assign({}, internalData._currMenuParams, { menu, $table: $xetable, $event: evnt })
          if (ctxMenuMethod) {
            ctxMenuMethod(params, evnt)
          }
          $xetable.dispatchEvent('menu-click', params, evnt)
          menuMethods.closeMenu()
        }
      }
    }

    return { ...menuMethods, ...menuPrivateMethods }
  },
  setupGrid ($xegrid) {
    return $xegrid.extendTableMethods(tableMenuMethodKeys)
  }
}

export default tableMenuHook

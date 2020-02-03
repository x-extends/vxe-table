import XEUtils from 'xe-utils/methods/xe-utils'
import { UtilTools, DomTools } from '../../tools'
import VXETable from '../../v-x-e-table'

export default {
  methods: {
    /**
     * 关闭快捷菜单
     */
    _closeMenu () {
      Object.assign(this.ctxMenuStore, {
        visible: false,
        selected: null,
        childPos: null,
        selectChild: null,
        showChild: false
      })
      return this.$nextTick()
    },
    // 处理菜单的移动
    moveCtxMenu (evnt, keyCode, ctxMenuStore, property, operKey, operRest, menuList) {
      let selectItem
      let selectIndex = XEUtils.findIndexOf(menuList, item => ctxMenuStore[property] === item)
      if (keyCode === operKey) {
        if (operRest && UtilTools.hasChildrenList(ctxMenuStore.selected)) {
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
        this.ctxMenuLinkEvent(evnt, ctxMenuStore[property])
      }
    },
    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent (evnt) {
      let { $refs, id, contextMenu, isCtxMenu, ctxMenuStore, ctxMenuOpts } = this
      let layoutList = ['header', 'body', 'footer']
      if (contextMenu && isCtxMenu) {
        if (ctxMenuStore.visible) {
          if (ctxMenuStore.visible && $refs.ctxWrapper && DomTools.getEventTargetNode(evnt, $refs.ctxWrapper.$el).flag) {
            evnt.preventDefault()
            return
          }
        }
        // 分别匹配表尾、内容、表尾的快捷菜单
        for (let index = 0; index < layoutList.length; index++) {
          let layout = layoutList[index]
          let columnTargetNode = DomTools.getEventTargetNode(evnt, this.$el, `vxe-${layout}--column`, target => {
            // target=td|th，直接向上找 table 去匹配即可
            return target.parentNode.parentNode.parentNode.getAttribute('data-tid') === id
          })
          let params = { type: layout, $table: this, columns: this.visibleColumn.slice(0) }
          if (columnTargetNode.flag) {
            let cell = columnTargetNode.targetElem
            let column = this.getColumnNode(cell).item
            let typePrefix = `${layout}-`
            Object.assign(params, { column, columnIndex: this.getColumnIndex(column), cell })
            if (layout === 'body') {
              let row = this.getRowNode(cell.parentNode).item
              typePrefix = ''
              params.row = row
              params.rowIndex = this.getRowIndex(row)
            }
            this.openContextMenu(evnt, layout, params)
            UtilTools.emitEvent(this, `${typePrefix}cell-context-menu`, [params, evnt])
            return
          } else if (DomTools.getEventTargetNode(evnt, this.$el, `vxe-table--${layout}-wrapper`, target => {
            return target.getAttribute('data-tid') === id
          }).flag) {
            if (ctxMenuOpts.trigger === 'cell') {
              evnt.preventDefault()
            } else {
              this.openContextMenu(evnt, layout, params)
            }
            return
          }
        }
      }
      if ($refs.filterWrapper && !DomTools.getEventTargetNode(evnt, $refs.filterWrapper.$el).flag) {
        this.closeFilter()
      }
      this.closeMenu()
    },
    /**
     * 显示快捷菜单
     */
    openContextMenu (evnt, type, params) {
      let { ctxMenuStore, ctxMenuOpts } = this
      let config = ctxMenuOpts[type]
      let visibleMethod = ctxMenuOpts.visibleMethod
      if (config) {
        let { options, disabled } = config
        if (disabled) {
          evnt.preventDefault()
        } else if (options && options.length) {
          params.options = options
          this.preventEvent(evnt, 'event.showMenu', params, null, () => {
            if (!visibleMethod || visibleMethod(params, evnt)) {
              evnt.preventDefault()
              this.updateZindex()
              let { scrollTop, scrollLeft, visibleHeight, visibleWidth } = DomTools.getDomNode()
              let top = evnt.clientY + scrollTop
              let left = evnt.clientX + scrollLeft
              Object.assign(ctxMenuStore, {
                args: params,
                visible: true,
                list: options,
                selected: null,
                selectChild: null,
                showChild: false,
                childPos: null,
                style: {
                  zIndex: this.tZindex,
                  top: `${top}px`,
                  left: `${left}px`
                }
              })
              this.$nextTick(() => {
                let ctxElem = this.$refs.ctxWrapper.$el
                let clientHeight = ctxElem.clientHeight
                let clientWidth = ctxElem.clientWidth
                let offsetTop = evnt.clientY + clientHeight - visibleHeight
                let offsetLeft = evnt.clientX + clientWidth - visibleWidth
                if (offsetTop > -10) {
                  ctxMenuStore.style.top = `${Math.max(scrollTop + 2, top - clientHeight - 2)}px`
                }
                if (offsetLeft > -10) {
                  ctxMenuStore.style.left = `${Math.max(scrollLeft + 2, left - clientWidth - 2)}px`
                }
                if (offsetLeft > -220) {
                  ctxMenuStore.childPos = 'left'
                }
              })
            } else {
              this.closeMenu()
            }
          })
        }
      }
      this.closeFilter()
    },
    ctxMenuMouseoverEvent (evnt, item, child) {
      let ctxMenuStore = this.ctxMenuStore
      evnt.preventDefault()
      evnt.stopPropagation()
      ctxMenuStore.selected = item
      ctxMenuStore.selectChild = child
      if (!child) {
        ctxMenuStore.showChild = UtilTools.hasChildrenList(item)
      }
    },
    ctxMenuMouseoutEvent (evnt, item, child) {
      let ctxMenuStore = this.ctxMenuStore
      if (!item.children) {
        ctxMenuStore.selected = null
      }
      ctxMenuStore.selectChild = null
    },
    /**
     * 快捷菜单点击事件
     */
    ctxMenuLinkEvent (evnt, menu) {
      if (!menu.disabled && (!menu.children || !menu.children.length)) {
        let ctxMenuMethod = VXETable.menus.get(menu.code)
        let params = Object.assign({ menu, $table: this }, this.ctxMenuStore.args)
        if (ctxMenuMethod) {
          ctxMenuMethod.call(this, params, evnt)
        }
        UtilTools.emitEvent(this, 'context-menu-click', [params, evnt])
        this.closeMenu()
      }
    }
  }
}

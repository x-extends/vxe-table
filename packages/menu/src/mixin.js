import XEUtils from 'xe-utils/ctor'
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
        selectChild: null,
        showChild: false
      })
      return this.$nextTick()
    },
    // 处理菜单的移动
    moveCtxMenu (evnt, keyCode, ctxMenuStore, property, operKey, operRest, menuList) {
      let selectItem
      const selectIndex = XEUtils.findIndexOf(menuList, item => ctxMenuStore[property] === item)
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
      const { $refs, tId, editStore, contextMenu, ctxMenuStore, ctxMenuOpts, mouseConfig, mouseOpts } = this
      const { selected } = editStore
      const layoutList = ['header', 'body', 'footer']
      if (contextMenu) {
        if (ctxMenuStore.visible && $refs.ctxWrapper && DomTools.getEventTargetNode(evnt, $refs.ctxWrapper.$el).flag) {
          evnt.preventDefault()
          return
        }
        if (this._keyCtx) {
          const type = 'body'
          const params = { type, $grid: this.$xegrid, $table: this, keyboard: true, columns: this.visibleColumn.slice(0), $event: evnt }
          // 如果开启单元格区域
          if (mouseConfig && mouseOpts.area) {
            const activeArea = this.getActiveCellArea()
            if (activeArea && activeArea.row && activeArea.column) {
              params.row = activeArea.row
              params.column = activeArea.column
              this.openContextMenu(evnt, type, params)
              return
            }
          } else if (mouseConfig && mouseOpts.selected) {
            // 如果启用键盘导航且已选中单元格
            if (selected.row && selected.column) {
              params.row = selected.row
              params.column = selected.column
              this.openContextMenu(evnt, type, params)
              return
            }
          }
        }
        // 分别匹配表尾、内容、表尾的快捷菜单
        for (let index = 0; index < layoutList.length; index++) {
          const layout = layoutList[index]
          const columnTargetNode = DomTools.getEventTargetNode(evnt, this.$el, `vxe-${layout}--column`, target => {
            // target=td|th，直接向上找 table 去匹配即可
            return target.parentNode.parentNode.parentNode.getAttribute('data-tid') === tId
          })
          const params = { type: layout, $grid: this.$xegrid, $table: this, columns: this.visibleColumn.slice(0), $event: evnt }
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
            this.openContextMenu(evnt, layout, params)
            this.emitEvent(`${typePrefix}cell-context-menu`, params, evnt)
            return
          } else if (DomTools.getEventTargetNode(evnt, this.$el, `vxe-table--${layout}-wrapper`, target => target.getAttribute('data-tid') === tId).flag) {
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
      const { ctxMenuStore, ctxMenuOpts } = this
      const config = ctxMenuOpts[type]
      const visibleMethod = ctxMenuOpts.visibleMethod
      if (config) {
        const { options, disabled } = config
        if (disabled) {
          evnt.preventDefault()
        } else if (options && options.length) {
          params.options = options
          this.preventEvent(evnt, 'event.showMenu', params, null, () => {
            if (!visibleMethod || visibleMethod(params, evnt)) {
              evnt.preventDefault()
              this.updateZindex()
              const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = DomTools.getDomNode()
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
                  const ctxElem = this.$refs.ctxWrapper.$el
                  const clientHeight = ctxElem.clientHeight
                  const clientWidth = ctxElem.clientWidth
                  const { boundingTop, boundingLeft } = DomTools.getAbsolutePos(ctxElem)
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
                  const cell = this.getCell(row, column)
                  const { boundingTop, boundingLeft } = DomTools.getAbsolutePos(cell)
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
    ctxMenuMouseoverEvent (evnt, item, child) {
      const menuElem = evnt.currentTarget
      const ctxMenuStore = this.ctxMenuStore
      evnt.preventDefault()
      evnt.stopPropagation()
      ctxMenuStore.selected = item
      ctxMenuStore.selectChild = child
      if (!child) {
        ctxMenuStore.showChild = UtilTools.hasChildrenList(item)
        if (ctxMenuStore.showChild) {
          this.$nextTick(() => {
            const childWrapperElem = menuElem.nextElementSibling
            if (childWrapperElem) {
              const { boundingTop, boundingLeft, visibleHeight, visibleWidth } = DomTools.getAbsolutePos(menuElem)
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
      const ctxMenuStore = this.ctxMenuStore
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
        const ctxMenuMethod = VXETable.menus.get(menu.code)
        const params = Object.assign({ menu, $grid: this.$xegrid, $table: this, $event: evnt }, this.ctxMenuStore.args)
        if (ctxMenuMethod) {
          ctxMenuMethod.call(this, params, evnt)
        }
        this.emitEvent('context-menu-click', params, evnt)
        this.closeMenu()
      }
    }
  }
}

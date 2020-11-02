"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _tools = require("../../tools");

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  methods: {
    /**
     * 关闭快捷菜单
     */
    _closeMenu: function _closeMenu() {
      Object.assign(this.ctxMenuStore, {
        visible: false,
        selected: null,
        selectChild: null,
        showChild: false
      });
      return this.$nextTick();
    },
    // 处理菜单的移动
    moveCtxMenu: function moveCtxMenu(evnt, keyCode, ctxMenuStore, property, operKey, operRest, menuList) {
      var selectItem;

      var selectIndex = _ctor.default.findIndexOf(menuList, function (item) {
        return ctxMenuStore[property] === item;
      });

      if (keyCode === operKey) {
        if (operRest && _tools.UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          ctxMenuStore.showChild = true;
        } else {
          ctxMenuStore.showChild = false;
          ctxMenuStore.selectChild = null;
        }
      } else if (keyCode === 38) {
        for (var len = selectIndex - 1; len >= 0; len--) {
          if (menuList[len].visible !== false) {
            selectItem = menuList[len];
            break;
          }
        }

        ctxMenuStore[property] = selectItem || menuList[menuList.length - 1];
      } else if (keyCode === 40) {
        for (var index = selectIndex + 1; index < menuList.length; index++) {
          if (menuList[index].visible !== false) {
            selectItem = menuList[index];
            break;
          }
        }

        ctxMenuStore[property] = selectItem || menuList[0];
      } else if (ctxMenuStore[property] && (keyCode === 13 || keyCode === 32)) {
        this.ctxMenuLinkEvent(evnt, ctxMenuStore[property]);
      }
    },

    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent: function handleGlobalContextmenuEvent(evnt) {
      var $refs = this.$refs,
          tId = this.tId,
          editStore = this.editStore,
          contextMenu = this.contextMenu,
          ctxMenuStore = this.ctxMenuStore,
          ctxMenuOpts = this.ctxMenuOpts,
          mouseConfig = this.mouseConfig,
          mouseOpts = this.mouseOpts;
      var selected = editStore.selected;
      var layoutList = ['header', 'body', 'footer'];

      if (contextMenu) {
        if (ctxMenuStore.visible && $refs.ctxWrapper && _tools.DomTools.getEventTargetNode(evnt, $refs.ctxWrapper.$el).flag) {
          evnt.preventDefault();
          return;
        }

        if (this._keyCtx) {
          var type = 'body';
          var params = {
            type: type,
            $grid: this.$xegrid,
            $table: this,
            keyboard: true,
            columns: this.visibleColumn.slice(0),
            $event: evnt
          }; // 如果开启单元格区域

          if (mouseConfig && mouseOpts.area) {
            var activeArea = this.getActiveCellArea();

            if (activeArea && activeArea.row && activeArea.column) {
              params.row = activeArea.row;
              params.column = activeArea.column;
              this.openContextMenu(evnt, type, params);
              return;
            }
          } else if (mouseConfig && mouseOpts.selected) {
            // 如果启用键盘导航且已选中单元格
            if (selected.row && selected.column) {
              params.row = selected.row;
              params.column = selected.column;
              this.openContextMenu(evnt, type, params);
              return;
            }
          }
        } // 分别匹配表尾、内容、表尾的快捷菜单


        for (var index = 0; index < layoutList.length; index++) {
          var layout = layoutList[index];

          var columnTargetNode = _tools.DomTools.getEventTargetNode(evnt, this.$el, "vxe-".concat(layout, "--column"), function (target) {
            // target=td|th，直接向上找 table 去匹配即可
            return target.parentNode.parentNode.parentNode.getAttribute('data-tid') === tId;
          });

          var _params = {
            type: layout,
            $grid: this.$xegrid,
            $table: this,
            columns: this.visibleColumn.slice(0),
            $event: evnt
          };

          if (columnTargetNode.flag) {
            var cell = columnTargetNode.targetElem;
            var column = this.getColumnNode(cell).item;
            var typePrefix = "".concat(layout, "-");
            Object.assign(_params, {
              column: column,
              columnIndex: this.getColumnIndex(column),
              cell: cell
            });

            if (layout === 'body') {
              var row = this.getRowNode(cell.parentNode).item;
              typePrefix = '';
              _params.row = row;
              _params.rowIndex = this.getRowIndex(row);
            }

            this.openContextMenu(evnt, layout, _params);
            this.emitEvent("".concat(typePrefix, "cell-context-menu"), _params, evnt);
            return;
          } else if (_tools.DomTools.getEventTargetNode(evnt, this.$el, "vxe-table--".concat(layout, "-wrapper"), function (target) {
            return target.getAttribute('data-tid') === tId;
          }).flag) {
            if (ctxMenuOpts.trigger === 'cell') {
              evnt.preventDefault();
            } else {
              this.openContextMenu(evnt, layout, _params);
            }

            return;
          }
        }
      }

      if ($refs.filterWrapper && !_tools.DomTools.getEventTargetNode(evnt, $refs.filterWrapper.$el).flag) {
        this.closeFilter();
      }

      this.closeMenu();
    },

    /**
     * 显示快捷菜单
     */
    openContextMenu: function openContextMenu(evnt, type, params) {
      var _this = this;

      var ctxMenuStore = this.ctxMenuStore,
          ctxMenuOpts = this.ctxMenuOpts;
      var config = ctxMenuOpts[type];
      var visibleMethod = ctxMenuOpts.visibleMethod;

      if (config) {
        var options = config.options,
            disabled = config.disabled;

        if (disabled) {
          evnt.preventDefault();
        } else if (options && options.length) {
          params.options = options;
          this.preventEvent(evnt, 'event.showMenu', params, null, function () {
            if (!visibleMethod || visibleMethod(params)) {
              evnt.preventDefault();

              _this.updateZindex();

              var _DomTools$getDomNode = _tools.DomTools.getDomNode(),
                  scrollTop = _DomTools$getDomNode.scrollTop,
                  scrollLeft = _DomTools$getDomNode.scrollLeft,
                  visibleHeight = _DomTools$getDomNode.visibleHeight,
                  visibleWidth = _DomTools$getDomNode.visibleWidth;

              var top = evnt.clientY + scrollTop;
              var left = evnt.clientX + scrollLeft;

              var handleVisible = function handleVisible() {
                Object.assign(ctxMenuStore, {
                  args: params,
                  visible: true,
                  list: options,
                  selected: null,
                  selectChild: null,
                  showChild: false,
                  style: {
                    zIndex: _this.tZindex,
                    top: "".concat(top, "px"),
                    left: "".concat(left, "px")
                  }
                });

                _this.$nextTick(function () {
                  var ctxElem = _this.$refs.ctxWrapper.$el;
                  var clientHeight = ctxElem.clientHeight;
                  var clientWidth = ctxElem.clientWidth;

                  var _DomTools$getAbsolute = _tools.DomTools.getAbsolutePos(ctxElem),
                      boundingTop = _DomTools$getAbsolute.boundingTop,
                      boundingLeft = _DomTools$getAbsolute.boundingLeft;

                  var offsetTop = boundingTop + clientHeight - visibleHeight;
                  var offsetLeft = boundingLeft + clientWidth - visibleWidth;

                  if (offsetTop > -10) {
                    ctxMenuStore.style.top = "".concat(Math.max(scrollTop + 2, top - clientHeight - 2), "px");
                  }

                  if (offsetLeft > -10) {
                    ctxMenuStore.style.left = "".concat(Math.max(scrollLeft + 2, left - clientWidth - 2), "px");
                  }
                });
              };

              var keyboard = params.keyboard,
                  row = params.row,
                  column = params.column;

              if (keyboard && row && column) {
                _this.scrollToRow(row, column).then(function () {
                  var cell = _this.getCell(row, column);

                  var _DomTools$getAbsolute2 = _tools.DomTools.getAbsolutePos(cell),
                      boundingTop = _DomTools$getAbsolute2.boundingTop,
                      boundingLeft = _DomTools$getAbsolute2.boundingLeft;

                  top = boundingTop + scrollTop + Math.floor(cell.offsetHeight / 2);
                  left = boundingLeft + scrollLeft + Math.floor(cell.offsetWidth / 2);
                  handleVisible();
                });
              } else {
                handleVisible();
              }
            } else {
              _this.closeMenu();
            }
          });
        }
      }

      this.closeFilter();
    },
    ctxMenuMouseoverEvent: function ctxMenuMouseoverEvent(evnt, item, child) {
      var menuElem = evnt.currentTarget;
      var ctxMenuStore = this.ctxMenuStore;
      evnt.preventDefault();
      evnt.stopPropagation();
      ctxMenuStore.selected = item;
      ctxMenuStore.selectChild = child;

      if (!child) {
        ctxMenuStore.showChild = _tools.UtilTools.hasChildrenList(item);

        if (ctxMenuStore.showChild) {
          this.$nextTick(function () {
            var childWrapperElem = menuElem.nextElementSibling;

            if (childWrapperElem) {
              var _DomTools$getAbsolute3 = _tools.DomTools.getAbsolutePos(menuElem),
                  boundingTop = _DomTools$getAbsolute3.boundingTop,
                  boundingLeft = _DomTools$getAbsolute3.boundingLeft,
                  visibleHeight = _DomTools$getAbsolute3.visibleHeight,
                  visibleWidth = _DomTools$getAbsolute3.visibleWidth;

              var posTop = boundingTop + menuElem.offsetHeight;
              var posLeft = boundingLeft + menuElem.offsetWidth;
              var left = '';
              var right = ''; // 是否超出右侧

              if (posLeft + childWrapperElem.offsetWidth > visibleWidth - 10) {
                left = 'auto';
                right = "".concat(menuElem.offsetWidth, "px");
              } // 是否超出底部


              var top = '';
              var bottom = '';

              if (posTop + childWrapperElem.offsetHeight > visibleHeight - 10) {
                top = 'auto';
                bottom = '0';
              }

              childWrapperElem.style.left = left;
              childWrapperElem.style.right = right;
              childWrapperElem.style.top = top;
              childWrapperElem.style.bottom = bottom;
            }
          });
        }
      }
    },
    ctxMenuMouseoutEvent: function ctxMenuMouseoutEvent(evnt, item) {
      var ctxMenuStore = this.ctxMenuStore;

      if (!item.children) {
        ctxMenuStore.selected = null;
      }

      ctxMenuStore.selectChild = null;
    },

    /**
     * 快捷菜单点击事件
     */
    ctxMenuLinkEvent: function ctxMenuLinkEvent(evnt, menu) {
      if (!menu.disabled && (!menu.children || !menu.children.length)) {
        var ctxMenuMethod = _vXETable.default.menus.get(menu.code);

        var params = Object.assign({
          menu: menu,
          $grid: this.$xegrid,
          $table: this,
          $event: evnt
        }, this.ctxMenuStore.args);

        if (ctxMenuMethod) {
          ctxMenuMethod.call(this, params, evnt);
        }

        this.emitEvent('context-menu-click', params, evnt);
        this.closeMenu();
      }
    }
  }
};
exports.default = _default;
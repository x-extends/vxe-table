"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _tools = require("../../tools");

var _vXETable = require("../../v-x-e-table");

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

      var selectIndex = _xeUtils.default.findIndexOf(menuList, function (item) {
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
      var isCtxMenu = this.isCtxMenu,
          ctxMenuStore = this.ctxMenuStore,
          ctxMenuOpts = this.ctxMenuOpts;
      var layoutList = ['header', 'body', 'footer'];

      if (isCtxMenu) {
        if (ctxMenuStore.visible) {
          if (ctxMenuStore.visible && this.$refs.ctxWrapper && _tools.DomTools.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
            evnt.preventDefault();
            return;
          }
        }

        for (var index = 0; index < layoutList.length; index++) {
          var layout = layoutList[index];

          var columnTargetNode = _tools.DomTools.getEventTargetNode(evnt, this.$el, "vxe-".concat(layout, "--column"));

          var params = {
            type: layout,
            $table: this,
            columns: this.visibleColumn.slice(0)
          };

          if (columnTargetNode.flag) {
            var cell = columnTargetNode.targetElem;
            var column = this.getColumnNode(cell).item;
            var typePrefix = "".concat(layout, "-");
            Object.assign(params, {
              column: column,
              columnIndex: this.getColumnIndex(column),
              cell: cell
            });

            if (layout === 'body') {
              var row = this.getRowNode(cell.parentNode).item;
              typePrefix = '';
              params.row = row;
              params.rowIndex = this.getRowIndex(row);
            }

            this.openContextMenu(evnt, layout, params);

            _tools.UtilTools.emitEvent(this, "".concat(typePrefix, "cell-context-menu"), [params, evnt]);

            return;
          } else if (_tools.DomTools.getEventTargetNode(evnt, this.$el, "vxe-table--".concat(layout, "-wrapper")).flag) {
            if (ctxMenuOpts.trigger === 'cell') {
              evnt.preventDefault();
            } else {
              this.openContextMenu(evnt, layout, params);
            }

            return;
          }
        }
      }

      this.closeMenu();
      this.closeFilter();
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
          this.preventEvent(evnt, 'event.show_menu', params, null, function () {
            if (!visibleMethod || visibleMethod(params, evnt)) {
              evnt.preventDefault();

              _this.updateZindex();

              var _DomTools$getDomNode = _tools.DomTools.getDomNode(),
                  scrollTop = _DomTools$getDomNode.scrollTop,
                  scrollLeft = _DomTools$getDomNode.scrollLeft,
                  visibleHeight = _DomTools$getDomNode.visibleHeight,
                  visibleWidth = _DomTools$getDomNode.visibleWidth;

              var top = evnt.clientY + scrollTop;
              var left = evnt.clientX + scrollLeft;
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
                var offsetTop = evnt.clientY + clientHeight - visibleHeight;
                var offsetLeft = evnt.clientX + clientWidth - visibleWidth;

                if (offsetTop > -10) {
                  ctxMenuStore.style.top = "".concat(top - clientHeight, "px");
                }

                if (offsetLeft > -10) {
                  ctxMenuStore.style.left = "".concat(left - clientWidth, "px");
                }
              });
            } else {
              _this.closeMenu();
            }
          });
        }
      }

      this.closeFilter();
    },
    ctxMenuMouseoverEvent: function ctxMenuMouseoverEvent(evnt, item, child) {
      var ctxMenuStore = this.ctxMenuStore;
      evnt.preventDefault();
      evnt.stopPropagation();
      ctxMenuStore.selected = item;
      ctxMenuStore.selectChild = child;

      if (!child) {
        ctxMenuStore.showChild = _tools.UtilTools.hasChildrenList(item);
      }
    },
    ctxMenuMouseoutEvent: function ctxMenuMouseoutEvent(evnt, item, child) {
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
        var ctxMenuMethod = _vXETable.Menus.get(menu.code);

        var params = Object.assign({
          menu: menu,
          $table: this
        }, this.ctxMenuStore.args);

        if (ctxMenuMethod) {
          ctxMenuMethod.call(this, params, evnt);
        }

        _tools.UtilTools.emitEvent(this, 'context-menu-click', [params, evnt]);

        this.closeMenu();
      }
    }
  }
};
exports.default = _default;
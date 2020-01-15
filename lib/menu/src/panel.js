"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'VxeTableContextMenu',
  props: {
    ctxMenuStore: Object
  },
  render: function render(h) {
    var $xetable = this.$parent;
    var _e = this._e,
        ctxMenuStore = this.ctxMenuStore;
    return h('div', {
      class: ['vxe-table--ctxmenu-wrapper', _defineProperty({
        'is--show': ctxMenuStore.visible
      }, "child-pos--".concat(ctxMenuStore.childPos), ctxMenuStore.childPos)],
      style: ctxMenuStore.style
    }, ctxMenuStore.list.map(function (options, gIndex) {
      return h('ul', {
        class: 'vxe-ctxmenu--option-wrapper',
        key: gIndex
      }, options.map(function (item, index) {
        var hasChildMenus = item.children && item.children.length;
        return item.visible === false ? _e() : h('li', {
          class: {
            'link--disabled': item.disabled,
            'link--active': item === ctxMenuStore.selected
          },
          key: "".concat(gIndex, "_").concat(index)
        }, [h('a', {
          class: 'vxe-ctxmenu--link',
          on: {
            click: function click(evnt) {
              $xetable.ctxMenuLinkEvent(evnt, item);
            },
            mouseover: function mouseover(evnt) {
              $xetable.ctxMenuMouseoverEvent(evnt, item);
            },
            mouseout: function mouseout(evnt) {
              $xetable.ctxMenuMouseoutEvent(evnt, item);
            }
          }
        }, [h('i', {
          class: ['vxe-ctxmenu--link-prefix', item.prefixIcon]
        }), h('span', {
          class: 'vxe-ctxmenu--link-content'
        }, _tools.UtilTools.getFuncText(item.name)), h('i', {
          class: ['vxe-ctxmenu--link-suffix', hasChildMenus ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
        })]), hasChildMenus ? h('ul', {
          class: ['vxe-table--ctxmenu-clild-wrapper', {
            'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
          }]
        }, item.children.map(function (child, cIndex) {
          return child.visible === false ? _e() : h('li', {
            class: {
              'link--disabled': child.disabled,
              'link--active': child === ctxMenuStore.selectChild
            },
            key: "".concat(gIndex, "_").concat(index, "_").concat(cIndex)
          }, [h('a', {
            class: 'vxe-ctxmenu--link',
            on: {
              click: function click(evnt) {
                $xetable.ctxMenuLinkEvent(evnt, child);
              },
              mouseover: function mouseover(evnt) {
                $xetable.ctxMenuMouseoverEvent(evnt, item, child);
              },
              mouseout: function mouseout(evnt) {
                $xetable.ctxMenuMouseoutEvent(evnt, item, child);
              }
            }
          }, [h('i', {
            class: ['vxe-ctxmenu--link-prefix', child.prefixIcon]
          }), h('span', {
            class: 'vxe-ctxmenu--link-content'
          }, _tools.UtilTools.getFuncText(child.name))])]);
        })) : _e()]);
      }));
    }));
  }
};
exports.default = _default;
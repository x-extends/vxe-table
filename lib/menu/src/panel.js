"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

var _default = {
  name: 'VxeTableContextMenu',
  props: {
    ctxMenuStore: Object,
    ctxMenuOpts: Object
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    var $el = this.$el;

    if ($el.parentNode) {
      $el.parentNode.removeChild($el);
    }
  },
  render: function render(h) {
    var $xetable = this.$parent;
    var ctxMenuOpts = this.ctxMenuOpts,
        ctxMenuStore = this.ctxMenuStore;
    return h('div', {
      class: ['vxe-table--context-menu-wrapper', ctxMenuOpts.className],
      style: ctxMenuStore.style
    }, ctxMenuStore.list.map(function (options, gIndex) {
      return h('ul', {
        class: 'vxe-context-menu--option-wrapper',
        key: gIndex
      }, options.map(function (item, index) {
        var hasChildMenus = item.children && item.children.length;
        return item.visible === false ? null : h('li', {
          class: [item.className, {
            'link--disabled': item.disabled,
            'link--active': item === ctxMenuStore.selected
          }],
          key: "".concat(gIndex, "_").concat(index)
        }, [h('a', {
          class: 'vxe-context-menu--link',
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
          class: ['vxe-context-menu--link-prefix', item.prefixIcon]
        }), h('span', {
          class: 'vxe-context-menu--link-content'
        }, _tools.UtilTools.getFuncText(item.name)), h('i', {
          class: ['vxe-context-menu--link-suffix', hasChildMenus ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
        })]), hasChildMenus ? h('ul', {
          class: ['vxe-table--context-menu-clild-wrapper', {
            'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
          }]
        }, item.children.map(function (child, cIndex) {
          return child.visible === false ? null : h('li', {
            class: [child.className, {
              'link--disabled': child.disabled,
              'link--active': child === ctxMenuStore.selectChild
            }],
            key: "".concat(gIndex, "_").concat(index, "_").concat(cIndex)
          }, [h('a', {
            class: 'vxe-context-menu--link',
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
            class: ['vxe-context-menu--link-prefix', child.prefixIcon]
          }), h('span', {
            class: 'vxe-context-menu--link-content'
          }, _tools.UtilTools.getFuncText(child.name))])]);
        })) : null]);
      }));
    }));
  }
};
exports.default = _default;
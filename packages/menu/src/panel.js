import { UtilTools } from '../../tools'

export default {
  name: 'VxeTableContextMenu',
  props: {
    ctxMenuStore: Object,
    ctxMenuOpts: Object
  },
  render (h) {
    const $xetable = this.$parent
    const { _e, ctxMenuOpts, ctxMenuStore } = this
    return h('div', {
      class: ['vxe-table--context-menu-wrapper', ctxMenuOpts.className, {
        'is--show': ctxMenuStore.visible
      }],
      style: ctxMenuStore.style
    }, ctxMenuStore.list.map((options, gIndex) => {
      return h('ul', {
        class: 'vxe-context-menu--option-wrapper',
        key: gIndex
      }, options.map((item, index) => {
        const hasChildMenus = item.children && item.children.length
        return item.visible === false ? _e() : h('li', {
          class: [item.className, {
            'link--disabled': item.disabled,
            'link--active': item === ctxMenuStore.selected
          }],
          key: `${gIndex}_${index}`
        }, [
          h('a', {
            class: 'vxe-context-menu--link',
            on: {
              click (evnt) {
                $xetable.ctxMenuLinkEvent(evnt, item)
              },
              mouseover (evnt) {
                $xetable.ctxMenuMouseoverEvent(evnt, item)
              },
              mouseout (evnt) {
                $xetable.ctxMenuMouseoutEvent(evnt, item)
              }
            }
          }, [
            h('i', {
              class: ['vxe-context-menu--link-prefix', item.prefixIcon]
            }),
            h('span', {
              class: 'vxe-context-menu--link-content'
            }, UtilTools.getFuncText(item.name)),
            h('i', {
              class: ['vxe-context-menu--link-suffix', hasChildMenus ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
            })
          ]),
          hasChildMenus ? h('ul', {
            class: ['vxe-table--context-menu-clild-wrapper', {
              'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
            }]
          }, item.children.map((child, cIndex) => {
            return child.visible === false ? _e() : h('li', {
              class: [child.className, {
                'link--disabled': child.disabled,
                'link--active': child === ctxMenuStore.selectChild
              }],
              key: `${gIndex}_${index}_${cIndex}`
            }, [
              h('a', {
                class: 'vxe-context-menu--link',
                on: {
                  click (evnt) {
                    $xetable.ctxMenuLinkEvent(evnt, child)
                  },
                  mouseover (evnt) {
                    $xetable.ctxMenuMouseoverEvent(evnt, item, child)
                  },
                  mouseout (evnt) {
                    $xetable.ctxMenuMouseoutEvent(evnt, item, child)
                  }
                }
              }, [
                h('i', {
                  class: ['vxe-context-menu--link-prefix', child.prefixIcon]
                }),
                h('span', {
                  class: 'vxe-context-menu--link-content'
                }, UtilTools.getFuncText(child.name))
              ])
            ])
          })) : _e()
        ])
      }))
    }))
  }
}

import { UtilTools } from '../../tools'

export default {
  name: 'VxeTableContextMenu',
  props: {
    ctxMenuStore: Object
  },
  render (h) {
    let $xetable = this.$parent
    let { _e, ctxMenuStore } = this
    return h('div', {
      class: ['vxe-table--ctxmenu-wrapper', {
        'is--show': ctxMenuStore.visible,
        [`child-pos--${ctxMenuStore.childPos}`]: ctxMenuStore.childPos
      }],
      style: ctxMenuStore.style
    }, ctxMenuStore.list.map((options, gIndex) => {
      return h('ul', {
        class: 'vxe-ctxmenu--option-wrapper',
        key: gIndex
      }, options.map((item, index) => {
        let hasChildMenus = item.children && item.children.length
        return item.visible === false ? _e() : h('li', {
          class: {
            'link--disabled': item.disabled,
            'link--active': item === ctxMenuStore.selected
          },
          key: `${gIndex}_${index}`
        }, [
          h('a', {
            class: 'vxe-ctxmenu--link',
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
              class: ['vxe-ctxmenu--link-prefix', item.prefixIcon]
            }),
            h('span', {
              class: 'vxe-ctxmenu--link-content'
            }, UtilTools.getFuncText(item.name)),
            h('i', {
              class: ['vxe-ctxmenu--link-suffix', hasChildMenus ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
            })
          ]),
          hasChildMenus ? h('ul', {
            class: ['vxe-table--ctxmenu-clild-wrapper', {
              'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
            }]
          }, item.children.map((child, cIndex) => {
            return child.visible === false ? _e() : h('li', {
              class: {
                'link--disabled': child.disabled,
                'link--active': child === ctxMenuStore.selectChild
              },
              key: `${gIndex}_${index}_${cIndex}`
            }, [
              h('a', {
                class: 'vxe-ctxmenu--link',
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
                  class: ['vxe-ctxmenu--link-prefix', child.prefixIcon]
                }),
                h('span', {
                  class: 'vxe-ctxmenu--link-content'
                }, UtilTools.getFuncText(child.name))
              ])
            ])
          })) : _e()
        ])
      }))
    }))
  }
}

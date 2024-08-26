import { getFuncText } from '../../tools/utils'
import GlobalConfig from '../../v-x-e-table/src/conf'

export default {
  name: 'VxeTableMenuPanel',
  props: {
    ctxMenuStore: Object,
    ctxMenuOpts: Object
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    const { $el } = this
    if ($el.parentNode) {
      $el.parentNode.removeChild($el)
    }
  },
  render (h) {
    const $xetable = this.$parent
    const { _e, ctxMenuOpts, ctxMenuStore } = this
    return h('div', {
      class: ['vxe-table--context-menu-wrapper', ctxMenuOpts.className, {
        'is--visible': ctxMenuStore.visible
      }],
      style: ctxMenuStore.style
    }, ctxMenuStore.list.map((options, gIndex) => {
      return options.every(item => item.visible === false) ? _e() : h('ul', {
        class: 'vxe-context-menu--option-wrapper',
        key: gIndex
      }, options.map((item, index) => {
        const hasChildMenus = item.children && item.children.some((child) => child.visible !== false)
        const prefixOpts = Object.assign({}, item.prefixConfig)
        const suffixOpts = Object.assign({}, item.suffixConfig)
        return item.visible === false ? null : h('li', {
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
            h('div', {
              class: ['vxe-context-menu--link-prefix', prefixOpts.className || '']
            }, [
              h('i', {
                class: prefixOpts.icon || item.prefixIcon
              }),
              prefixOpts.content ? h('span', {}, `${prefixOpts.content}`) : _e()
            ]),
            h('span', {
              class: 'vxe-context-menu--link-content'
            }, getFuncText(item.name)),
            h('div', {
              class: ['vxe-context-menu--link-suffix', suffixOpts.className || '']
            }, [
              h('i', {
                class: (suffixOpts.icon || item.suffixIcon) || (hasChildMenus ? GlobalConfig.icon.TABLE_MENU_OPTIONS : '')
              }),
              suffixOpts.content ? h('span', `${suffixOpts.content}`) : _e()
            ])
          ]),
          hasChildMenus ? h('ul', {
            class: ['vxe-table--context-menu-clild-wrapper', {
              'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
            }]
          }, item.children.map((child, cIndex) => {
            const childPrefixOpts = Object.assign({}, child.prefixConfig)
            const childSuffixOpts = Object.assign({}, child.suffixConfig)
            return child.visible === false ? null : h('li', {
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
                h('div', {
                  class: ['vxe-context-menu--link-prefix', childPrefixOpts.className || '']
                }, [
                  h('i', {
                    class: childPrefixOpts.icon || child.prefixIcon
                  }),
                  childPrefixOpts.content ? h('span', `${childPrefixOpts.content}`) : _e()
                ]),
                h('span', {
                  class: 'vxe-context-menu--link-content'
                }, getFuncText(child.name)),
                h('div', {
                  class: ['vxe-context-menu--link-suffix', childSuffixOpts.className || '']
                }, [
                  h('i', {
                    class: childSuffixOpts.icon
                  }),
                  childSuffixOpts.content ? h('span', `${childSuffixOpts.content}`) : _e()
                ])
              ])
            ])
          })) : null
        ])
      }))
    }))
  }
}

import { CreateElement } from 'vue'
import { VxeUI } from '../../../ui'
import { getFuncText } from '../../../ui/src/utils'

import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../../types'

const { getIcon } = VxeUI

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
  render (this: any, h: CreateElement) {
    const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods

    const { _e, ctxMenuOpts, ctxMenuStore } = this
    return h('div', {
      class: ['vxe-table--context-menu-wrapper', ctxMenuOpts.className, {
        'is--visible': ctxMenuStore.visible
      }],
      style: ctxMenuStore.style
    }, ctxMenuStore.list.map((options: any, gIndex: any) => {
      return options.every((item: any) => item.visible === false)
        ? _e()
        : h('ul', {
          class: 'vxe-context-menu--option-wrapper',
          key: gIndex
        }, options.map((item: any, index: any) => {
          const hasChildMenus = item.children && item.children.some((child: any) => child.visible !== false)
          const prefixOpts = Object.assign({}, item.prefixConfig)
          const suffixOpts = Object.assign({}, item.suffixConfig)
          const menuContent = getFuncText(item.name)
          return item.visible === false
            ? null
            : h('li', {
              class: [item.className, {
                'link--disabled': item.disabled,
                'link--active': item === ctxMenuStore.selected
              }],
              key: `${gIndex}_${index}`
            }, [
              h('a', {
                class: 'vxe-context-menu--link',
                on: {
                  click (evnt: any) {
                    $xeTable.ctxMenuLinkEvent(evnt, item)
                  },
                  mouseover (evnt: any) {
                    $xeTable.ctxMenuMouseoverEvent(evnt, item)
                  },
                  mouseout (evnt: any) {
                    $xeTable.ctxMenuMouseoutEvent(evnt, item)
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
                  class: 'vxe-context-menu--link-content',
                  attrs: {
                    title: menuContent
                  }
                }, menuContent),
                h('div', {
                  class: ['vxe-context-menu--link-suffix', suffixOpts.className || '']
                }, [
                  h('i', {
                    class: (suffixOpts.icon || item.suffixIcon) || (hasChildMenus ? getIcon().TABLE_MENU_OPTIONS : '')
                  }),
                  suffixOpts.content ? h('span', `${suffixOpts.content}`) : _e()
                ])
              ]),
              hasChildMenus
                ? h('ul', {
                  class: ['vxe-table--context-menu-clild-wrapper', {
                    'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
                  }]
                }, item.children.map((child: any, cIndex: any) => {
                  const childPrefixOpts = Object.assign({}, child.prefixConfig)
                  const childSuffixOpts = Object.assign({}, child.suffixConfig)
                  const childMenuContent = getFuncText(child.name)
                  return child.visible === false
                    ? null
                    : h('li', {
                      class: [child.className, {
                        'link--disabled': child.disabled,
                        'link--active': child === ctxMenuStore.selectChild
                      }],
                      key: `${gIndex}_${index}_${cIndex}`
                    }, [
                      h('a', {
                        class: 'vxe-context-menu--link',
                        on: {
                          click (evnt: any) {
                            $xeTable.ctxMenuLinkEvent(evnt, child)
                          },
                          mouseover (evnt: any) {
                            $xeTable.ctxMenuMouseoverEvent(evnt, item, child)
                          },
                          mouseout (evnt: any) {
                            $xeTable.ctxMenuMouseoutEvent(evnt, item)
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
                          class: 'vxe-context-menu--link-content',
                          attrs: {
                            title: childMenuContent
                          }
                        }, childMenuContent),
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
                }))
                : null
            ])
        }))
    }))
  }
} as any

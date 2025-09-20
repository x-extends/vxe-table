import { CreateElement } from 'vue'
import { VxeUI } from '../../../ui'
import { getFuncText } from '../../../ui/src/utils'

import type { VxeTableConstructor, VxeTablePrivateMethods, TableReactData } from '../../../../types'

const { getIcon, renderEmptyElement } = VxeUI

export default {
  name: 'VxeTableMenuPanel',
  props: {
    ctxMenuStore: Object,
    ctxMenuOpts: Object
  },
  inject: {
    $xeTable: {
      default: null
    }
  },
  mounted () {
    const $xeMenuPanel = this
    const $xeTable = $xeMenuPanel.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
    const menuOpts = $xeTable.computeMenuOpts
    const { transfer } = menuOpts
    const el = this.$refs.refElem as HTMLDivElement

    if (transfer && el) {
      document.body.appendChild(el)
    }
  },
  beforeDestroy () {
    const el = this.$refs.refElem as HTMLDivElement

    if (el && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  },
  render (this: any, h: CreateElement) {
    const $xeMenuPanel = this
    const $xeTable = $xeMenuPanel.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
    const tableReactData = $xeTable as unknown as TableReactData

    const { ctxMenuStore } = tableReactData
    const menuOpts = $xeTable.computeMenuOpts
    const { destroyOnClose } = menuOpts
    const { visible, list, className } = ctxMenuStore
    return h('div', {
      ref: 'refElem',
      class: ['vxe-table--context-menu-wrapper', className, {
        'is--visible': visible
      }],
      style: ctxMenuStore.style
    }, (destroyOnClose ? visible : true)
      ? list.map((options, gIndex) => {
        return options.every((item) => item.visible === false)
          ? renderEmptyElement($xeTable)
          : h('ul', {
            class: 'vxe-context-menu--option-wrapper',
            key: gIndex
          }, options.map((item, index) => {
            const hasChildMenus = item.children && item.children.some((child: any) => child.visible !== false)
            const prefixOpts = Object.assign({}, item.prefixConfig)
            const suffixOpts = Object.assign({}, item.suffixConfig)
            const menuContent = getFuncText(item.name)
            return item.visible === false
              ? renderEmptyElement($xeTable)
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
                    prefixOpts.content ? h('span', {}, `${prefixOpts.content}`) : renderEmptyElement($xeTable)
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
                    suffixOpts.content ? h('span', `${suffixOpts.content}`) : renderEmptyElement($xeTable)
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
                            childPrefixOpts.content ? h('span', `${childPrefixOpts.content}`) : renderEmptyElement($xeTable)
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
                            childSuffixOpts.content ? h('span', `${childSuffixOpts.content}`) : renderEmptyElement($xeTable)
                          ])
                        ])
                      ])
                  }))
                  : null
              ])
          }))
      })
      : [])
  }
} as any

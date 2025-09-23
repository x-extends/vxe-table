import { CreateElement } from 'vue'
import { VxeUI } from '../../../ui'
import XEUtils from 'xe-utils'
import { getFuncText } from '../../../ui/src/utils'
import { getSlotVNs } from '../../../ui/src/vn'

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
            const hasChildMenus = item.children && item.children.some((child) => child.visible !== false)
            const prefixOpts = Object.assign({}, item.prefixConfig)
            const prefixIcon = prefixOpts.icon || item.prefixIcon
            const suffixOpts = Object.assign({}, item.suffixConfig)
            const suffixIcon = suffixOpts.icon || item.suffixIcon
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
                    click (evnt: Event) {
                      $xeTable.ctxMenuLinkEvent(evnt, item)
                    },
                    mouseover (evnt: Event) {
                      $xeTable.ctxMenuMouseoverEvent(evnt, item)
                    },
                    mouseout (evnt: Event) {
                      $xeTable.ctxMenuMouseoutEvent(evnt, item)
                    }
                  }
                }, [
                  h('div', {
                    class: ['vxe-context-menu--link-prefix', prefixOpts.className || '']
                  }, [
                    prefixIcon && XEUtils.isFunction(prefixIcon)
                      ? h('span', {}, getSlotVNs(prefixIcon.call($xeTable, {})))
                      : h('i', {
                        class: prefixIcon
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
                    suffixIcon && XEUtils.isFunction(suffixIcon)
                      ? h('span', {}, getSlotVNs(suffixIcon.call($xeTable, {})))
                      : h('i', {
                        class: suffixIcon || (hasChildMenus ? getIcon().TABLE_MENU_OPTIONS : '')
                      }),
                    suffixOpts.content ? h('span', `${suffixOpts.content}`) : renderEmptyElement($xeTable)
                  ])
                ]),
                hasChildMenus && item.children
                  ? h('ul', {
                    class: ['vxe-table--context-menu-clild-wrapper', {
                      'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
                    }]
                  }, item.children.map((child, cIndex) => {
                    const childPrefixOpts = Object.assign({}, child.prefixConfig)
                    const childPrefixIcon = childPrefixOpts.icon || child.prefixIcon
                    const childSuffixOpts = Object.assign({}, child.suffixConfig)
                    const childSuffixIcon = childSuffixOpts.icon || child.suffixIcon
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
                            click (evnt: Event) {
                              $xeTable.ctxMenuLinkEvent(evnt, child)
                            },
                            mouseover (evnt: Event) {
                              $xeTable.ctxMenuMouseoverEvent(evnt, item, child)
                            },
                            mouseout (evnt: Event) {
                              $xeTable.ctxMenuMouseoutEvent(evnt, item)
                            }
                          }
                        }, [
                          h('div', {
                            class: ['vxe-context-menu--link-prefix', childPrefixOpts.className || '']
                          }, [
                            childPrefixIcon && XEUtils.isFunction(childPrefixIcon)
                              ? h('span', {}, getSlotVNs(childPrefixIcon.call($xeTable, {})))
                              : h('i', {
                                class: childPrefixIcon
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
                            childSuffixIcon && XEUtils.isFunction(childSuffixIcon)
                              ? h('span', {}, getSlotVNs(childSuffixIcon.call($xeTable, {})))
                              : h('i', {
                                class: childSuffixIcon
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

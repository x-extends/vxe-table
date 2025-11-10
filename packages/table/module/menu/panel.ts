import { h, Teleport, inject, ref, Ref } from 'vue'
import { defineVxeComponent } from '../../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { getFuncText } from '../../../ui/src/utils'
import { getSlotVNs } from '../../../ui/src/vn'

import type { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods } from '../../../../types'

const { getIcon, getI18n, renderEmptyElement } = VxeUI

export default defineVxeComponent({
  name: 'VxeTableMenuPanel',
  setup (props, context) {
    const xID = XEUtils.uniqueId()

    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { reactData: tableReactData } = $xeTable

    const refElem = ref() as Ref<HTMLDivElement>

    const refMaps = {
      refElem
    }

    const $xeMenuPanel: any = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    }

    const renderVN = () => {
      const { ctxMenuStore } = tableReactData
      const { computeMenuOpts } = $xeTable.getComputeMaps()
      const menuOpts = computeMenuOpts.value
      const { transfer, destroyOnClose } = menuOpts
      const { visible, list, className } = ctxMenuStore

      return h(Teleport, {
        to: 'body',
        disabled: !transfer
      }, [
        h('div', {
          ref: refElem,
          class: ['vxe-table--context-menu-wrapper', className, {
            'is--visible': visible
          }],
          style: ctxMenuStore.style
        }, (destroyOnClose ? visible : true)
          ? list.map((options, gIndex) => {
            return options.every(item => item.visible === false)
              ? renderEmptyElement($xeTable)
              : h('ul', {
                class: 'vxe-context-menu--option-wrapper',
                key: gIndex
              }, options.map((item, index) => {
                const { children, loading } = item
                const hasChildMenus = children && children.some((child) => child.visible !== false)
                const prefixOpts = Object.assign({}, item.prefixConfig)
                const prefixIcon = prefixOpts.icon || item.prefixIcon
                const suffixOpts = Object.assign({}, item.suffixConfig)
                const suffixIcon = suffixOpts.icon || item.suffixIcon
                const menuContent = getFuncText(item.name)
                return item.visible === false
                  ? renderEmptyElement($xeTable)
                  : h('li', {
                    class: [item.className, {
                      'link--loading': loading,
                      'link--disabled': item.disabled,
                      'link--active': item === ctxMenuStore.selected
                    }],
                    key: `${gIndex}_${index}`
                  }, [
                    h('a', {
                      class: 'vxe-context-menu--link',
                      onClick (evnt: Event) {
                        $xeTable.ctxMenuLinkEvent(evnt, item)
                      },
                      onMouseover (evnt: Event) {
                        $xeTable.ctxMenuMouseoverEvent(evnt, item)
                      },
                      onMouseout (evnt: Event) {
                        $xeTable.ctxMenuMouseoutEvent(evnt, item)
                      }
                    }, [
                      h('div', {
                        class: ['vxe-context-menu--link-prefix', prefixOpts.className || '']
                      }, [
                        loading
                          ? h('span', {
                            class: getIcon('TABLE_MENU_OPTION_LOADING')
                          })
                          : (prefixIcon && XEUtils.isFunction(prefixIcon)
                              ? h('span', {}, getSlotVNs(prefixIcon({})))
                              : h('span', {}, [
                                h('i', {
                                  class: prefixIcon
                                })
                              ])),
                        prefixOpts.content ? h('span', {}, `${prefixOpts.content}`) : renderEmptyElement($xeTable)
                      ]),
                      h('div', {
                        class: 'vxe-context-menu--link-content',
                        title: menuContent
                      }, loading ? getI18n('vxe.table.menuLoading') : menuContent),
                      h('div', {
                        class: ['vxe-context-menu--link-suffix', suffixOpts.className || '']
                      }, [
                        suffixIcon && XEUtils.isFunction(suffixIcon)
                          ? h('span', {}, getSlotVNs(suffixIcon({})))
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
                        const { loading: childLoading } = child
                        const childPrefixOpts = Object.assign({}, child.prefixConfig)
                        const childPrefixIcon = childPrefixOpts.icon || child.prefixIcon
                        const childSuffixOpts = Object.assign({}, child.suffixConfig)
                        const childSuffixIcon = childSuffixOpts.icon || child.suffixIcon
                        const childMenuContent = getFuncText(child.name)
                        return child.visible === false
                          ? null
                          : h('li', {
                            class: [child.className, {
                              'link--loading': childLoading,
                              'link--disabled': child.disabled,
                              'link--active': child === ctxMenuStore.selectChild
                            }],
                            key: `${gIndex}_${index}_${cIndex}`
                          }, [
                            h('a', {
                              class: 'vxe-context-menu--link',
                              onClick (evnt: Event) {
                                $xeTable.ctxMenuLinkEvent(evnt, child)
                              },
                              onMouseover (evnt: Event) {
                                $xeTable.ctxMenuMouseoverEvent(evnt, item, child)
                              },
                              onMouseout (evnt: Event) {
                                $xeTable.ctxMenuMouseoutEvent(evnt, item)
                              }
                            }, [
                              h('div', {
                                class: ['vxe-context-menu--link-prefix', childPrefixOpts.className || '']
                              }, [
                                child.loading
                                  ? h('span', {
                                    class: getIcon('TABLE_MENU_OPTION_LOADING')
                                  })
                                  : (childPrefixIcon && XEUtils.isFunction(childPrefixIcon)
                                      ? h('span', {}, getSlotVNs(childPrefixIcon({})))
                                      : h('span', {}, [
                                        h('i', {
                                          class: childPrefixIcon
                                        })
                                      ])),
                                childPrefixOpts.content ? h('span', `${childPrefixOpts.content}`) : renderEmptyElement($xeTable)
                              ]),
                              h('div', {
                                class: 'vxe-context-menu--link-content',
                                title: childMenuContent
                              }, childLoading ? getI18n('vxe.table.menuLoading') : childMenuContent),
                              h('div', {
                                class: ['vxe-context-menu--link-suffix', childSuffixOpts.className || '']
                              }, [
                                childSuffixIcon && XEUtils.isFunction(childSuffixIcon)
                                  ? h('span', {}, getSlotVNs(childSuffixIcon({})))
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
      ])
    }

    $xeMenuPanel.renderVN = renderVN

    return $xeMenuPanel
  },
  render () {
    return this.renderVN()
  }
})

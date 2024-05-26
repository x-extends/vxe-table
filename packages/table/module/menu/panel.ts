import { defineComponent, h, Teleport, inject, ref, Ref, createCommentVNode } from 'vue'
import { getFuncText } from '../../../ui/src/utils'
import XEUtils from 'xe-utils'

import type { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods } from '../../../../types'

export default defineComponent({
  name: 'VxeTableMenuPanel',
  setup (props, context) {
    const xID = XEUtils.uniqueId()

    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { reactData: tableReactData } = $xeTable

    const refElem = ref() as Ref<HTMLDivElement>

    const refMaps = {
      refElem
    }

    const $xemenupanel: any = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    }

    const renderVN = () => {
      const { ctxMenuStore } = tableReactData
      const { computeMenuOpts } = $xeTable.getComputeMaps()
      const menuOpts = computeMenuOpts.value

      return h(Teleport, {
        to: 'body',
        disabled: false
      }, [
        h('div', {
          ref: refElem,
          class: ['vxe-table--context-menu-wrapper', menuOpts.className, {
            'is--visible': ctxMenuStore.visible
          }],
          style: ctxMenuStore.style
        }, ctxMenuStore.list.map((options, gIndex) => {
          return options.every(item => item.visible === false)
            ? createCommentVNode()
            : h('ul', {
              class: 'vxe-context-menu--option-wrapper',
              key: gIndex
            }, options.map((item, index) => {
              const hasChildMenus = item.children && item.children.some((child: any) => child.visible !== false)
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
                    h('i', {
                      class: ['vxe-context-menu--link-prefix', item.prefixIcon]
                    }),
                    h('span', {
                      class: 'vxe-context-menu--link-content'
                    }, getFuncText(item.name)),
                    h('i', {
                      class: ['vxe-context-menu--link-suffix', hasChildMenus ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
                    })
                  ]),
                  hasChildMenus
                    ? h('ul', {
                      class: ['vxe-table--context-menu-clild-wrapper', {
                        'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
                      }]
                    }, item.children.map((child: any, cIndex: any) => {
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
                            h('i', {
                              class: ['vxe-context-menu--link-prefix', child.prefixIcon]
                            }),
                            h('span', {
                              class: 'vxe-context-menu--link-content'
                            }, getFuncText(child.name))
                          ])
                        ])
                    }))
                    : null
                ])
            }))
        }))
      ])
    }

    $xemenupanel.renderVN = renderVN

    return $xemenupanel
  },
  render () {
    return this.renderVN()
  }
})

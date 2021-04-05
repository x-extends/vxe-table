import { defineComponent, h, Teleport, inject, ref, Ref } from 'vue'
import { getFuncText } from '../../tools/utils'
import XEUtils from 'xe-utils'

import { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeMenuPanelConstructor, VxeMenuPanelPrivateRef } from '../../../types/all'

export default defineComponent({
  name: 'VxeTableContextMenu',
  setup (props, context) {
    const xID = XEUtils.uniqueId()

    const $xetable = inject('$xetable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { reactData: tableReactData } = $xetable

    const refElem = ref() as Ref<HTMLDivElement>

    const refMaps: VxeMenuPanelPrivateRef = {
      refElem
    }

    const $xemenupanel = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    } as VxeMenuPanelConstructor

    const renderVN = () => {
      const { ctxMenuStore } = tableReactData
      const { computeMenuOpts } = $xetable.getComputeMaps()
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
          return h('ul', {
            class: 'vxe-context-menu--option-wrapper',
            key: gIndex
          }, options.map((item, index) => {
            const hasChildMenus = item.children && item.children.length
            return item.visible === false ? null : h('li', {
              class: [item.className, {
                'link--disabled': item.disabled,
                'link--active': item === ctxMenuStore.selected
              }],
              key: `${gIndex}_${index}`
            }, [
              h('a', {
                class: 'vxe-context-menu--link',
                onClick (evnt: Event) {
                  $xetable.ctxMenuLinkEvent(evnt, item)
                },
                onMouseover (evnt: Event) {
                  $xetable.ctxMenuMouseoverEvent(evnt, item)
                },
                onMouseout (evnt: Event) {
                  $xetable.ctxMenuMouseoutEvent(evnt, item)
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
              hasChildMenus ? h('ul', {
                class: ['vxe-table--context-menu-clild-wrapper', {
                  'is--show': item === ctxMenuStore.selected && ctxMenuStore.showChild
                }]
              }, item.children.map((child: any, cIndex: any) => {
                return child.visible === false ? null : h('li', {
                  class: [child.className, {
                    'link--disabled': child.disabled,
                    'link--active': child === ctxMenuStore.selectChild
                  }],
                  key: `${gIndex}_${index}_${cIndex}`
                }, [
                  h('a', {
                    class: 'vxe-context-menu--link',
                    onClick (evnt: Event) {
                      $xetable.ctxMenuLinkEvent(evnt, child)
                    },
                    onMouseover (evnt: Event) {
                      $xetable.ctxMenuMouseoverEvent(evnt, item, child)
                    },
                    onMouseout (evnt: Event) {
                      $xetable.ctxMenuMouseoutEvent(evnt, item)
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
              })) : null
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

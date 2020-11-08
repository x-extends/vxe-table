import { defineComponent, h, Teleport, inject } from 'vue'
import { UtilTools } from '../../tools'

import { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods } from '../../../types/vxe-table'

export default defineComponent({
  name: 'VxeTableContextMenu',
  props: {
    ctxMenuStore: Object as any,
    menuOpts: Object as any
  },
  setup (props) {
    const $xetable = inject('$xetable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const renderVN = () => {
      const { menuOpts, ctxMenuStore } = props

      return h(Teleport, {
        to: 'body',
        disabled: false
      }, [
        h('div', {
          class: ['vxe-table--context-menu-wrapper', menuOpts.className],
          style: ctxMenuStore.style
        }, ctxMenuStore.list.map((options: any, gIndex: any) => {
          return h('ul', {
            class: 'vxe-context-menu--option-wrapper',
            key: gIndex
          }, options.map((item: any, index: any) => {
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
                on: {
                  click (evnt: Event) {
                    $xetable.ctxMenuLinkEvent(evnt, item)
                  },
                  mouseover (evnt: Event) {
                    $xetable.ctxMenuMouseoverEvent(evnt, item)
                  },
                  mouseout (evnt: Event) {
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
                    on: {
                      click (evnt: Event) {
                        $xetable.ctxMenuLinkEvent(evnt, child)
                      },
                      mouseover (evnt: Event) {
                        $xetable.ctxMenuMouseoverEvent(evnt, item, child)
                      },
                      mouseout (evnt: Event) {
                        $xetable.ctxMenuMouseoutEvent(evnt, item)
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
              })) : null
            ])
          }))
        }))
      ])
    }

    return renderVN
  }
})

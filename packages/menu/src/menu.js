export default {
  name: 'VxeTableContextMenu',
  props: {
    ctxMenuStore: Object
  },
  render (h) {
    let $table = this.$parent
    let { _e, ctxMenuStore } = this
    return h('div', {
      class: ['vxe-table--ctxmenu-wrapper', {
        show: ctxMenuStore.visible
      }],
      style: ctxMenuStore.style
    }, ctxMenuStore.list.map((options, gIndex) => {
      return h('ul', {
        class: ['vxe-ctxmenu--option-wrapper'],
        key: gIndex
      }, options.map((item, index) => {
        let hasChild = item.children && item.children.length
        return item.visible === false ? _e() : h('li', {
          class: [{
            'link--disabled': item.disabled,
            'link--active': item === ctxMenuStore.selected
          }],
          key: `${gIndex}_${index}`
        }, [
          h('a', {
            class: ['vxe-ctxmenu--link'],
            on: {
              click (evnt) {
                $table.ctxMenuLinkEvent(evnt, item)
              },
              mouseover (evnt) {
                $table.ctxMenuMouseoverEvent(evnt, item)
              },
              mouseout (evnt) {
                $table.ctxMenuMouseoutEvent(evnt, item)
              }
            }
          }, [
            h('i', {
              class: ['vxe-ctxmenu--link-prefix', item.prefixIcon]
            }),
            h('span', {
              class: ['vxe-ctxmenu--link-content']
            }, item.name),
            h('i', {
              class: ['vxe-ctxmenu--link-suffix', hasChild ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
            })
          ]),
          hasChild ? h('ul', {
            class: ['vxe-table--ctxmenu-clild-wrapper', {
              show: item === ctxMenuStore.selected && ctxMenuStore.showChild
            }]
          }, item.children.map((child, cIndex) => {
            return child.visible === false ? _e() : h('li', {
              class: [{
                'link--disabled': child.disabled,
                'link--active': child === ctxMenuStore.selectChild
              }],
              key: `${gIndex}_${index}_${cIndex}`
            }, [
              h('a', {
                class: ['vxe-ctxmenu--link'],
                on: {
                  click (evnt) {
                    $table.ctxMenuLinkEvent(evnt, child)
                  },
                  mouseover (evnt) {
                    $table.ctxMenuMouseoverEvent(evnt, item, child)
                  },
                  mouseout (evnt) {
                    $table.ctxMenuMouseoutEvent(evnt, item, child)
                  }
                }
              }, [
                h('i', {
                  class: ['vxe-ctxmenu--link-prefix', child.prefixIcon]
                }),
                h('span', {
                  class: ['vxe-ctxmenu--link-content']
                }, child.name)
              ])
            ])
          })) : _e()
        ])
      }))
    }))
  }
}

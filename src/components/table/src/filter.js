import GlobalConfig from '../../../conf'

export default {
  props: {
    filterStore: Object,
    optimizeOpts: Object
  },
  render (h) {
    let $table = this.$parent
    let { filterStore, optimizeOpts, filterCheckAllEvent, filterOptionRadioEvent, filterOptionCheckEvent } = this
    let { multiple } = filterStore
    let filterRens = [
      h('li', {
        class: ['vxe-table--filter-option', {
          'is--active': !filterStore.options.some(item => item.checked)
        }]
      }, [
        multiple
          ? h('label', {
            class: ['vxe-checkbox', {
              'is--indeterminate': filterStore.isIndeterminate
            }]
          }, [
            h('input', {
              attrs: {
                type: 'checkbox'
              },
              domProps: {
                checked: filterStore.isAllSelected
              },
              on: {
                change (evnt) {
                  filterCheckAllEvent(evnt, evnt.target.checked)
                }
              }
            }),
            h('span', {
              class: ['checkbox--icon']
            }),
            h('span', {
              class: ['checkbox--label']
            }, GlobalConfig.i18n('vxe.table.allFilter'))
          ])
          : h('span', {
            class: 'vxe-table--filter-label',
            on: {
              click: $table.resetFilterEvent
            }
          }, GlobalConfig.i18n('vxe.table.allFilter'))
      ])
    ]
    filterStore.options.forEach((item, index) => {
      filterRens.push(
        h('li', {
          class: ['vxe-table--filter-option', {
            'is--active': item.checked
          }],
          key: index
        }, [
          multiple
            ? h('label', {
              class: 'vxe-checkbox'
            }, [
              h('input', {
                attrs: {
                  type: 'checkbox'
                },
                domProps: {
                  checked: item.checked
                },
                on: {
                  change (evnt) {
                    filterOptionCheckEvent(evnt, evnt.target.checked, item)
                  }
                }
              }),
              h('span', {
                class: ['checkbox--icon']
              }),
              h('span', {
                class: ['checkbox--label']
              }, item.label)
            ])
            : h('span', {
              class: 'vxe-table--filter-label',
              on: {
                click (evnt) {
                  filterOptionRadioEvent(evnt, !item.checked, item)
                }
              }
            }, item.label)
        ])
      )
    })
    return h('div', {
      class: ['vxe-table--filter-wrapper', {
        't--animat': optimizeOpts.animat,
        'filter--active': filterStore.visible
      }],
      style: filterStore.style
    }, filterStore.visible ? [
      h('ul', {
        class: ['vxe-table--filter-body']
      }, filterRens),
      multiple ? h('div', {
        class: ['vxe-table--filter-footer']
      }, [
        h('button', {
          class: {
            'is--disabled': !filterStore.isAllSelected && !filterStore.isIndeterminate
          },
          attrs: {
            disabled: !filterStore.isAllSelected && !filterStore.isIndeterminate
          },
          on: {
            click: $table.confirmFilterEvent
          }
        }, GlobalConfig.i18n('vxe.table.confirmFilter')),
        h('button', {
          on: {
            click: $table.resetFilterEvent
          }
        }, GlobalConfig.i18n('vxe.table.resetFilter'))
      ]) : null
    ] : [])
  },
  methods: {
    // 全部筛选事件
    filterCheckAllEvent (evnt, value) {
      let filterStore = this.filterStore
      filterStore.options.forEach(item => {
        item.checked = value
      })
      filterStore.isAllSelected = value
      filterStore.isIndeterminate = false
    },
    // 筛选选项勾选事件
    filterOptionCheckEvent (evnt, value, item) {
      item.checked = value
      this.checkOptions()
    },
    // 筛选选项单选事件
    filterOptionRadioEvent (evnt, value, item) {
      this.filterStore.options.forEach(item => {
        item.checked = false
      })
      item.checked = value
      this.checkOptions()
      this.$parent.confirmFilterEvent()
    },
    checkOptions () {
      let { filterStore } = this
      filterStore.isAllSelected = filterStore.options.every(item => item.checked)
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(item => item.checked)
    }
  }
}

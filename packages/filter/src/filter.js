import GlobalConfig from '../../conf'
import { Renderer } from '../../v-x-e-table'

export default {
  name: 'VxeTableFilter',
  props: {
    filterStore: Object,
    optimizeOpts: Object
  },
  render (h) {
    let { filterStore, optimizeOpts } = this
    return h('div', {
      class: ['vxe-table--filter-wrapper filter--prevent-default', {
        't--animat': optimizeOpts.animat,
        'filter--active': filterStore.visible
      }],
      style: filterStore.style
    }, filterStore.visible ? [
      h('ul', {
        class: ['vxe-table--filter-body']
      }, this.renderOptions(h)),
      this.renderFooter(h)
    ] : [])
  },
  methods: {
    renderOptions (h) {
      let { $parent: $table, filterStore, filterCheckAllEvent, changeRadioOption, changeMultipleOption } = this
      let { vSize } = $table
      let { args, column, multiple } = filterStore
      let { slots, own } = column
      let filterRender = own.filterRender
      let compConf = filterRender ? Renderer.get(filterRender.name) : null
      if (slots && slots.filter) {
        return slots.filter.call($table, Object.assign({ context: this }, args), h)
      } else if (compConf && compConf.renderFilter) {
        return compConf.renderFilter(h, filterRender, args, this)
      }
      let filterRens = [
        h('li', {
          class: ['vxe-table--filter-option', {
            'is--active': !filterStore.options.some(item => item.checked)
          }]
        }, [
          multiple
            ? h('label', {
              class: ['vxe-checkbox', {
                [`size--${vSize}`]: vSize,
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
                class: ['vxe-checkbox--icon']
              }),
              h('span', {
                class: ['vxe-checkbox--label']
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
                class: ['vxe-checkbox', {
                  [`size--${vSize}`]: vSize
                }]
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
                      changeMultipleOption(evnt, evnt.target.checked, item)
                    }
                  }
                }),
                h('span', {
                  class: 'vxe-checkbox--icon'
                }),
                h('span', {
                  class: 'vxe-checkbox--label'
                }, item.label)
              ])
              : h('span', {
                class: 'vxe-table--filter-label',
                on: {
                  click (evnt) {
                    changeRadioOption(evnt, !item.checked, item)
                  }
                }
              }, item.label)
          ])
        )
      })
      return filterRens
    },
    renderFooter (h) {
      let { filterStore } = this
      let { multiple } = filterStore
      return multiple ? h('div', {
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
            click: this.confirmFilter
          }
        }, GlobalConfig.i18n('vxe.table.confirmFilter')),
        h('button', {
          on: {
            click: this.resetFilter
          }
        }, GlobalConfig.i18n('vxe.table.resetFilter'))
      ]) : null
    },
    // 全部筛选事件
    filterCheckAllEvent (evnt, value) {
      let filterStore = this.filterStore
      filterStore.options.forEach(item => {
        item.checked = value
      })
      filterStore.isAllSelected = value
      filterStore.isIndeterminate = false
    },
    checkOptions () {
      let { filterStore } = this
      filterStore.isAllSelected = filterStore.options.every(item => item.checked)
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(item => item.checked)
    },

    /*************************
     * Publish methods
     *************************/
    // （单选）筛选发生改变
    changeRadioOption (evnt, checked, item) {
      this.filterStore.options.forEach(item => {
        item.checked = false
      })
      item.checked = checked
      this.checkOptions()
      this.$parent.confirmFilterEvent()
    },
    // （多选）筛选发生改变
    changeMultipleOption (evnt, checked, item) {
      item.checked = checked
      this.checkOptions()
    },
    // 筛选发生改变
    changeOption (evnt, checked, item) {
      if (this.filterStore.multiple) {
        this.changeMultipleOption(evnt, checked, item)
      } else {
        this.changeRadioOption(evnt, checked, item)
      }
    },
    // 确认筛选
    confirmFilter () {
      this.$parent.confirmFilterEvent()
    },
    // 重置筛选
    resetFilter () {
      this.$parent.resetFilterEvent()
    }
    /*************************
     * Publish methods
     *************************/
  }
}

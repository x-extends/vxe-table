import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeTableFilter',
  props: {
    filterStore: Object
  },
  computed: {
    hasCheckOption () {
      const { filterStore } = this
      return filterStore && filterStore.options.some(option => option.checked)
    }
  },
  render (h) {
    const { $parent: $xetable, filterStore } = this
    const { column } = filterStore
    const filterRender = column ? column.filterRender : null
    const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
    return h('div', {
      class: ['vxe-table--filter-wrapper', 'filter--prevent-default', compConf && compConf.className ? compConf.className : '', {
        't--animat': $xetable.animat,
        'is--multiple': filterStore.multiple,
        'filter--active': filterStore.visible
      }],
      style: filterStore.style
    }, filterStore.visible ? this.renderOptions(h, filterRender, compConf).concat(this.renderFooter(h)) : [])
  },
  methods: {
    renderOptions (h, filterRender, compConf) {
      const { $parent: $xetable, filterStore } = this
      const { args, column, multiple } = filterStore
      const { slots } = column
      if (slots && slots.filter) {
        return [
          h('div', {
            class: 'vxe-table--filter-template'
          }, slots.filter.call($xetable, Object.assign({ $panel: this, context: this }, args), h))
        ]
      } else if (compConf && compConf.renderFilter) {
        return [
          h('div', {
            class: 'vxe-table--filter-template'
          }, compConf.renderFilter.call($xetable, h, filterRender, Object.assign({ $panel: this, context: this }, args), this))
        ]
      }
      return [
        h('ul', {
          class: 'vxe-table--filter-header'
        }, [
          h('li', {
            class: ['vxe-table--filter-option', {
              'is--checked': multiple ? filterStore.isAllSelected : !filterStore.options.some(item => item._checked),
              'is--indeterminate': multiple && filterStore.isIndeterminate
            }],
            attrs: {
              title: GlobalConfig.i18n(multiple ? 'vxe.table.allTitle' : 'vxe.table.allFilter')
            },
            on: {
              click: evnt => {
                this.changeAllOption(evnt, !filterStore.isAllSelected)
              }
            }
          }, (multiple ? [
            h('span', {
              class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
            }),
            h('span', {
              class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
            }),
            h('span', {
              class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
            })
          ] : []).concat([
            h('span', {
              class: 'vxe-checkbox--label'
            }, GlobalConfig.i18n('vxe.table.allFilter'))
          ]))
        ]),
        h('ul', {
          class: 'vxe-table--filter-body'
        }, filterStore.options.map(item => {
          return h('li', {
            class: ['vxe-table--filter-option', {
              'is--checked': item._checked
            }],
            attrs: {
              title: item.label
            },
            on: {
              click: evnt => {
                this.changeOption(evnt, !item._checked, item)
              }
            }
          }, (multiple ? [
            h('span', {
              class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
            }),
            h('span', {
              class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
            }),
            h('span', {
              class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
            })
          ] : []).concat([
            h('span', {
              class: 'vxe-checkbox--label'
            }, UtilTools.formatText(item.label, 1))
          ]))
        }))
      ]
    },
    renderFooter (h) {
      const { hasCheckOption, filterStore } = this
      const { column, multiple } = filterStore
      const filterRender = column.filterRender
      const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
      const isDisabled = !hasCheckOption && !filterStore.isAllSelected && !filterStore.isIndeterminate
      return multiple && (!compConf || compConf.isFooter !== false) ? [
        h('div', {
          class: 'vxe-table--filter-footer'
        }, [
          h('button', {
            class: {
              'is--disabled': isDisabled
            },
            attrs: {
              disabled: isDisabled
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
        ])
      ] : []
    },
    // 全部筛选事件
    filterCheckAllEvent (evnt, value) {
      const filterStore = this.filterStore
      filterStore.options.forEach(option => {
        option._checked = value
        option.checked = value
      })
      filterStore.isAllSelected = value
      filterStore.isIndeterminate = false
    },

    /*************************
     * Publish methods
     *************************/
    // （单选）筛选发生改变
    changeRadioOption (evnt, checked, item) {
      const { $parent: $xetable, filterStore } = this
      filterStore.options.forEach(option => {
        option._checked = false
      })
      item._checked = checked
      $xetable.checkFilterOptions()
      this.confirmFilter(evnt)
    },
    // （多选）筛选发生改变
    changeMultipleOption (evnt, checked, item) {
      const { $parent: $xetable } = this
      item._checked = checked
      $xetable.checkFilterOptions()
    },
    changeAllOption (evnt, checked) {
      if (this.filterStore.multiple) {
        this.filterCheckAllEvent(evnt, checked)
      } else {
        this.resetFilter(evnt)
      }
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
    confirmFilter (evnt) {
      const { $parent: $xetable, filterStore } = this
      filterStore.options.forEach(option => {
        option.checked = option._checked
      })
      $xetable.confirmFilterEvent(evnt)
    },
    // 重置筛选
    resetFilter (evnt) {
      const { $parent: $xetable } = this
      $xetable.resetFilterEvent(evnt)
    }
    /*************************
     * Publish methods
     *************************/
  }
}

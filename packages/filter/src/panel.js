import GlobalConfig from '../../v-x-e-table/src/conf'
import VXETable from '../../v-x-e-table'
import UtilTools from '../../tools/utils'
import XEUtils from 'xe-utils'
import { getSlotVNs } from '../../tools/vn'

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
    const { args, column } = filterStore
    const filterRender = column ? column.filterRender : null
    const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
    const filterClassName = compConf ? compConf.filterClassName : ''
    return h('div', {
      class: [
        'vxe-table--filter-wrapper',
        'filter--prevent-default',
        compConf && compConf.className ? compConf.className : '',
        UtilTools.getClass(filterClassName, Object.assign({ $panel: this, $table: $xetable }, args)),
        {
          'is--animat': $xetable.animat,
          'is--multiple': filterStore.multiple,
          'is--active': filterStore.visible
        }
      ],
      style: filterStore.style
    }, filterStore.visible ? this.renderOptions(h, filterRender, compConf).concat(this.renderFooter(h)) : [])
  },
  methods: {
    renderOptions (h, filterRender, compConf) {
      const { $parent: $xetable, filterStore } = this
      const { args, column, multiple, maxHeight } = filterStore
      const { slots } = column
      if (slots && slots.filter) {
        return [
          h('div', {
            class: 'vxe-table--filter-template'
          }, $xetable.callSlot(slots.filter, Object.assign({ $panel: this, context: this }, args), h))
        ]
      } else if (compConf && compConf.renderFilter) {
        return [
          h('div', {
            class: 'vxe-table--filter-template'
          }, getSlotVNs(compConf.renderFilter.call($xetable, h, filterRender, Object.assign({ $panel: this, context: this }, args))))
        ]
      }
      const isAllChecked = multiple ? filterStore.isAllSelected : !filterStore.options.some(item => item._checked)
      const isAllIndeterminate = multiple && filterStore.isIndeterminate
      return [
        h('ul', {
          class: 'vxe-table--filter-header'
        }, [
          h('li', {
            class: ['vxe-table--filter-option', {
              'is--checked': isAllChecked,
              'is--indeterminate': isAllIndeterminate
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
              class: ['vxe-checkbox--icon', isAllIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED)]
            })
          ] : []).concat([
            h('span', {
              class: 'vxe-checkbox--label'
            }, GlobalConfig.i18n('vxe.table.allFilter'))
          ]))
        ]),
        h('ul', {
          class: 'vxe-table--filter-body',
          style: maxHeight ? {
            maxHeight: `${maxHeight}px`
          } : {}
        }, filterStore.options.map(item => {
          const isChecked = item._checked
          const isIndeterminate = false
          return h('li', {
            class: ['vxe-table--filter-option', {
              'is--checked': isChecked
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
              class: ['vxe-checkbox--icon', isIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : (isChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED)]
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
      return multiple && (!compConf || (XEUtils.isBoolean(compConf.showFilterFooter) ? compConf.showFilterFooter !== false : compConf.isFooter !== false)) ? [
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

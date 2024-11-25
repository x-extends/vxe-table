import { VxeUI } from '../../../ui'
import { formatText, isEnableConf, getClass } from '../../../ui/src/utils'
import { getSlotVNs } from '../../../ui/src/vn'
import { CreateElement } from 'vue'

const { getI18n, getIcon, renderer } = VxeUI

export default {
  name: 'VxeTableFilterPanel',
  props: {
    filterStore: Object
  },
  computed: {
    hasCheckOption () {
      const { filterStore } = this
      return filterStore && filterStore.options.some((option: any) => option.checked)
    }
  } as any,
  render (this: any, h: CreateElement) {
    const { $parent: $xetable, filterStore } = this
    const { args, column } = filterStore
    const filterRender = column ? column.filterRender : null
    const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
    const filterClassName = compConf ? (compConf.tableFilterClassName || compConf.filterClassName) : ''
    return h('div', {
      class: [
        'vxe-table--filter-wrapper',
        'filter--prevent-default',
        compConf && compConf.className ? compConf.className : '',
        getClass(filterClassName, Object.assign({ $panel: this, $table: $xetable }, args)),
        {
          'is--animat': $xetable.animat,
          'is--multiple': filterStore.multiple,
          'is--active': filterStore.visible
        }
      ],
      style: filterStore.style
    }, filterStore.visible && column ? this.renderOptions(h, filterRender, compConf).concat(this.renderFooter(h)) : [])
  },
  methods: {
    renderOptions (h: CreateElement, filterRender: any, compConf: any) {
      const { $parent: $xetable, filterStore } = this
      const { args, column, multiple, maxHeight } = filterStore
      const slots = column ? column.slots : null
      const rtFilter = compConf ? (compConf.renderTableFilter || compConf.renderFilter) : null
      if (slots && slots.filter) {
        return [
          h('div', {
            class: 'vxe-table--filter-template'
          }, $xetable.callSlot(slots.filter, Object.assign({ $panel: this, context: this }, args), h))
        ]
      } else if (rtFilter) {
        return [
          h('div', {
            class: 'vxe-table--filter-template'
          }, getSlotVNs(rtFilter.call($xetable, h, filterRender, Object.assign({ $panel: this, context: this }, args))))
        ]
      }
      const isAllChecked = multiple ? filterStore.isAllSelected : !filterStore.options.some((item: any) => item._checked)
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
              title: getI18n(multiple ? 'vxe.table.allTitle' : 'vxe.table.allFilter')
            },
            on: {
              click: (evnt: any) => {
                this.changeAllOption(evnt, !filterStore.isAllSelected)
              }
            }
          }, (multiple
            ? [
                h('span', {
                  class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                })
              ]
            : []).concat([
            h('span', {
              class: 'vxe-checkbox--label'
            }, getI18n('vxe.table.allFilter'))
          ]))
        ]),
        h('ul', {
          class: 'vxe-table--filter-body',
          style: maxHeight
            ? {
                maxHeight: `${maxHeight}px`
              }
            : {}
        }, filterStore.options.map((item: any) => {
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
              click: (evnt: any) => {
                this.changeOption(evnt, !item._checked, item)
              }
            }
          }, (multiple
            ? [
                h('span', {
                  class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                })
              ]
            : []).concat([
            h('span', {
              class: 'vxe-checkbox--label'
            }, formatText(item.label, 1))
          ]))
        }))
      ]
    },
    renderFooter (h: CreateElement) {
      const { $parent: $xetable, hasCheckOption, filterStore } = this
      const { filterOpts } = $xetable
      const { column, multiple } = filterStore
      const filterRender = column.filterRender
      const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
      const isDisabled = !hasCheckOption && !filterStore.isAllSelected && !filterStore.isIndeterminate
      return multiple && (compConf ? !(compConf.showTableFilterFooter === false || compConf.showFilterFooter === false || compConf.isFooter === false) : true)
        ? [
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
              }, filterOpts.confirmButtonText || getI18n('vxe.table.confirmFilter')),
              h('button', {
                on: {
                  click: this.resetFilter
                }
              }, filterOpts.resetButtonText || getI18n('vxe.table.resetFilter'))
            ])
          ]
        : []
    },
    // 全部筛选事件
    filterCheckAllEvent (evnt: any, value: any) {
      const filterStore = this.filterStore
      filterStore.options.forEach((option: any) => {
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
    changeRadioOption (evnt: any, checked: any, item: any) {
      const { $parent: $xetable, filterStore } = this
      filterStore.options.forEach((option: any) => {
        option._checked = false
      })
      item._checked = checked
      $xetable.checkFilterOptions()
      this.confirmFilter(evnt)
    },
    // （多选）筛选发生改变
    changeMultipleOption (evnt: any, checked: any, item: any) {
      const { $parent: $xetable } = this
      item._checked = checked
      $xetable.checkFilterOptions()
    },
    changeAllOption (evnt: any, checked: any) {
      if (this.filterStore.multiple) {
        this.filterCheckAllEvent(evnt, checked)
      } else {
        this.resetFilter(evnt)
      }
    },
    // 筛选发生改变
    changeOption (evnt: any, checked: any, item: any) {
      if (this.filterStore.multiple) {
        this.changeMultipleOption(evnt, checked, item)
      } else {
        this.changeRadioOption(evnt, checked, item)
      }
    },
    // 确认筛选
    confirmFilter (evnt: any) {
      const { $parent: $xetable } = this
      $xetable.handleFilterConfirmFilter(evnt)
    },
    // 重置筛选
    resetFilter (evnt: any) {
      const { $parent: $xetable } = this
      $xetable.handleFilterResetFilter(evnt)
    }
    /*************************
     * Publish methods
     *************************/
  } as any
}

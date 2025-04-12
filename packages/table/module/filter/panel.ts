import { VxeUI } from '../../../ui'
import { formatText, isEnableConf, getClass } from '../../../ui/src/utils'
import { getSlotVNs } from '../../../ui/src/vn'
import { CreateElement } from 'vue'

import type { VxeTableConstructor, VxeTablePrivateMethods, TableInternalData } from '../../../../types'

const { getI18n, getIcon, renderer, globalMixins } = VxeUI

function renderOptions ($xeFilterPanel: any, h: CreateElement, filterRender: any, compConf: any) {
  const props = $xeFilterPanel
  const $xeTable = $xeFilterPanel.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
  const tableInternalData = $xeTable as unknown as TableInternalData

  const { filterStore } = props
  const { column, multiple, maxHeight } = filterStore
  const slots = column ? column.slots : null
  const filterSlot = slots ? slots.filter : null
  const params = Object.assign({}, tableInternalData._currFilterParams, { $panel: $xeFilterPanel, $table: $xeTable })
  const rtFilter = compConf ? (compConf.renderTableFilter || compConf.renderFilter) : null
  if (filterSlot) {
    return [
      h('div', {
        class: 'vxe-table--filter-template',
        style: maxHeight
          ? {
              maxHeight: `${maxHeight}px`
            }
          : {}
      }, $xeTable.callSlot(filterSlot, params, h))
    ]
  } else if (rtFilter) {
    return [
      h('div', {
        class: 'vxe-table--filter-template',
        style: maxHeight
          ? {
              maxHeight: `${maxHeight}px`
            }
          : {}
      }, getSlotVNs(rtFilter.call($xeTable, h, filterRender, params)))
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
          click: (evnt: MouseEvent) => {
            $xeFilterPanel.changeAllOption(evnt, !filterStore.isAllSelected)
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
          click: (evnt: MouseEvent) => {
            $xeFilterPanel.changeOption(evnt, !item._checked, item)
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
}

function renderFooter ($xeFilterPanel: any, h: CreateElement) {
  const props = $xeFilterPanel
  const $xeTable = $xeFilterPanel.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

  const { filterStore } = props
  const { column, multiple } = filterStore
  const filterOpts = $xeTable.computeFilterOpts
  const hasCheckOption = $xeFilterPanel.computeHasCheckOption
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
              click: $xeFilterPanel.confirmFilter
            }
          }, filterOpts.confirmButtonText || getI18n('vxe.table.confirmFilter')),
          h('button', {
            on: {
              click: $xeFilterPanel.resetFilter
            }
          }, filterOpts.resetButtonText || getI18n('vxe.table.resetFilter'))
        ])
      ]
    : []
}

export default {
  name: 'VxeTableFilterPanel',
  mixins: [
    globalMixins.sizeMixin
  ],
  props: {
    filterStore: Object
  },
  inject: {
    $xeTable: {
      default: null
    }
  },
  computed: {
    computeHasCheckOption () {
      const { filterStore } = this
      return filterStore && filterStore.options.some((option: any) => option.checked)
    }
  } as any,
  mounted (this: any) {
    const $xeFilterPanel = this
    const $xeTable = $xeFilterPanel.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
    const filterOpts = $xeTable.computeFilterOpts
    const { transfer } = filterOpts
    const el = this.$refs.refElem as HTMLDivElement

    if (transfer && el) {
      document.body.appendChild(el)
    }
  },
  beforeDestroy (this: any) {
    const el = this.$refs.refElem as HTMLDivElement

    if (el && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  },
  render (this: any, h: CreateElement) {
    const $xeFilterPanel = this
    const props = $xeFilterPanel
    const $xeTable = $xeFilterPanel.$xeTable as VxeTableConstructor & VxeTablePrivateMethods
    const tableInternalData = $xeTable as unknown as TableInternalData

    const { filterStore } = props
    const { visible, multiple, column } = filterStore
    const filterRender = column ? column.filterRender : null
    const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
    const filterClassName = compConf ? (compConf.tableFilterClassName || compConf.filterClassName) : ''
    const params = Object.assign({}, tableInternalData._currFilterParams, { $panel: $xeFilterPanel, $table: $xeTable })
    const tableProps = $xeTable
    const vSize = $xeFilterPanel.computeSize
    const filterOpts = $xeTable.computeFilterOpts
    const { destroyOnClose } = filterOpts
    return h('div', {
      ref: 'refElem',
      class: [
        'vxe-table--filter-wrapper',
        'filter--prevent-default',
        compConf && compConf.className ? compConf.className : '',
        getClass(filterClassName, params),
        {
          [`size--${vSize}`]: vSize,
          'is--animat': tableProps.animat,
          'is--multiple': multiple,
          'is--active': visible
        }
      ],
      style: filterStore.style
    }, filterStore.visible && (destroyOnClose ? visible : true) && column ? renderOptions($xeFilterPanel, h, filterRender, compConf).concat(renderFooter($xeFilterPanel, h)) : [])
  },
  methods: {
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
      const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods

      const { filterStore } = this
      filterStore.options.forEach((option: any) => {
        option._checked = false
      })
      item._checked = checked
      $xeTable.checkFilterOptions()
      this.confirmFilter(evnt)
    },
    // （多选）筛选发生改变
    changeMultipleOption (evnt: any, checked: any, item: any) {
      const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods

      item._checked = checked
      $xeTable.checkFilterOptions()
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
      const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods

      $xeTable.handleFilterConfirmFilter(evnt)
    },
    // 重置筛选
    resetFilter (evnt: any) {
      const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods

      $xeTable.handleFilterResetFilter(evnt)
    }
    /*************************
     * Publish methods
     *************************/
  } as any
}

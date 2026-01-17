import { CreateElement, PropType } from 'vue'
import { defineVxeComponent } from '../../../ui/src/comp'
import { VxeUI } from '../../../ui'
import { formatText, isEnableConf } from '../../../ui/src/utils'
import { getPropClass, toCssUnit } from '../../../ui/src/dom'
import { getSlotVNs } from '../../../ui/src/vn'
import { warnLog } from '../../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeGlobalRendererOptions, VxeComponentSizeType } from 'vxe-pc-ui'
import type { VxeTableConstructor, VxeTablePrivateMethods, TableInternalData, VxeTableDefines, VxeColumnPropTypes } from '../../../../types'

const { getI18n, getIcon, renderer, globalMixins, renderEmptyElement } = VxeUI

// 全部筛选事件
function filterCheckAllEvent ($xeFilterPanel: any, evnt: Event, value: any) {
  const props = $xeFilterPanel

  const { filterStore } = props
  const { column } = filterStore
  if (column && column.filters) {
    column.filters.forEach((option: any) => {
      option._checked = value
      option.checked = value
    })
  }
  filterStore.isAllSelected = value
  filterStore.isIndeterminate = false
}

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeTableFilterPanel',
  mixins: [
    globalMixins.sizeMixin
  ],
  props: {
    filterStore: {
      type: Object as PropType<{
        isAllSelected: boolean
        isIndeterminate: boolean
        style: any
        column: VxeTableDefines.ColumnInfo | null | undefined
        visible: boolean
        maxHeight: number | string | null
      }>,
      default: () => ({} as {
        isAllSelected: boolean
        isIndeterminate: boolean
        style: any
        column: VxeTableDefines.ColumnInfo | null | undefined
        visible: boolean
        maxHeight: number | string | null
      })
    }
  },
  inject: {
    $xeTable: {
      default: null
    }
  },
  computed: {
    ...({} as {
      computeSize(): VxeComponentSizeType
      $xeTable(): VxeTableConstructor & VxeTablePrivateMethods
    }),
    computeHasCheckOption () {
      const $xeFilterPanel = this
      const props = $xeFilterPanel

      const { filterStore } = props
      const { column } = filterStore
      return column && column.filters && column.filters.some((option) => option.checked)
    }
  },
  mounted () {
    const $xeFilterPanel = this
    const $xeTable = $xeFilterPanel.$xeTable
    const filterOpts = $xeTable.computeFilterOpts
    const { transfer } = filterOpts
    const el = $xeFilterPanel.$refs.refElem as HTMLDivElement

    if (transfer && el) {
      document.body.appendChild(el)
    }
  },
  beforeDestroy () {
    const $xeFilterPanel = this
    const el = $xeFilterPanel.$refs.refElem as HTMLDivElement

    if (el && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  },
  methods: {
    /*************************
     * Publish methods
     *************************/
    // （单选）筛选发生改变
    changeRadioOption (evnt: any, checked: any, item: any) {
      const $xeFilterPanel = this
      const $xeTable = $xeFilterPanel.$xeTable

      $xeTable.handleFilterChangeRadioOption(evnt, checked, item)
    },
    // （多选）筛选发生改变
    changeMultipleOption (evnt: any, checked: any, item: any) {
      const $xeFilterPanel = this
      const $xeTable = $xeFilterPanel.$xeTable

      item._checked = checked
      $xeTable.checkFilterOptions()
    },
    changeAllOption (evnt: Event, checked: any) {
      const $xeFilterPanel = this
      const props = $xeFilterPanel

      const { filterStore } = props
      const { column } = filterStore
      if (column && column.filterMultiple) {
        filterCheckAllEvent($xeFilterPanel, evnt, checked)
      } else {
        ($xeFilterPanel as any).resetFilter(evnt)
      }
    },
    // 筛选发生改变
    changeOption (evnt: Event, checked: boolean, item: any) {
      const $xeFilterPanel = this
      const $xeTable = $xeFilterPanel.$xeTable

      $xeTable.handleFilterChangeOption(evnt, checked, item)
    },
    // 确认筛选
    confirmFilter (evnt: any) {
      const $xeFilterPanel = this
      const props = $xeFilterPanel
      const $xeTable = $xeFilterPanel.$xeTable

      const { filterStore } = props
      if (!evnt) {
        warnLog('vxe.error.delFunc', ['confirmFilter', 'saveFilterPanelByEvent'])
      }
      $xeTable.handleFilterConfirmFilter(evnt || new Event('click'), filterStore.column || null)
    },
    // 重置筛选
    resetFilter (evnt: Event) {
      const $xeFilterPanel = this
      const props = $xeFilterPanel
      const $xeTable = $xeFilterPanel.$xeTable

      const { filterStore } = props
      $xeTable.handleFilterResetFilter(evnt, filterStore.column || null)
    },
    /*************************
     * Publish methods
     *************************/

    renderOptions (h: CreateElement, filterRender: VxeColumnPropTypes.FilterRender | null, compConf: VxeGlobalRendererOptions | null) {
      const $xeFilterPanel = this
      const props = $xeFilterPanel
      const $xeTable = $xeFilterPanel.$xeTable
      const tableInternalData = $xeTable as unknown as TableInternalData

      const { filterStore } = props
      const { column, maxHeight } = filterStore
      if (!column) {
        return []
      }
      const { filterMultiple, filters, slots } = column
      const filterOptions = (filters || []) as VxeTableDefines.FilterOption[]
      const filterSlot = slots ? slots.filter : null
      const params = Object.assign({}, tableInternalData._currFilterParams, { option: filterOptions[0], $panel: $xeFilterPanel, $table: $xeTable })
      const rtFilter = compConf ? (compConf.renderTableFilter || compConf.renderFilter) : null
      if (filterSlot) {
        return [
          h('div', {
            class: 'vxe-table--filter-template',
            style: maxHeight
              ? {
                  maxHeight: toCssUnit(maxHeight)
                }
              : {}
          }, $xeTable.callSlot(filterSlot, params, h))
        ]
      } else if (filterRender && rtFilter) {
        return [
          h('div', {
            class: 'vxe-table--filter-template',
            style: maxHeight
              ? {
                  maxHeight: toCssUnit(maxHeight)
                }
              : {}
          }, getSlotVNs(rtFilter.call($xeTable, h, filterRender, params)))
        ]
      }
      const isAllChecked = filterMultiple ? filterStore.isAllSelected : !filterOptions.some((item) => item._checked)
      const isAllIndeterminate = filterMultiple && filterStore.isIndeterminate
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
              title: getI18n(filterMultiple ? 'vxe.table.allTitle' : 'vxe.table.allFilter')
            },
            on: {
              click: (evnt: MouseEvent) => {
                ($xeFilterPanel as any).changeAllOption(evnt, !filterStore.isAllSelected)
              }
            }
          }, (filterMultiple
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
                maxHeight: toCssUnit(maxHeight)
              }
            : {}
        }, filterOptions.map((item: any) => {
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
                ($xeFilterPanel as any).changeOption(evnt, !item._checked, item)
              }
            }
          }, (filterMultiple
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
      const $xeFilterPanel = this
      const props = $xeFilterPanel
      const $xeTable = $xeFilterPanel.$xeTable

      const { filterStore } = props
      const { column } = filterStore
      if (!column) {
        return []
      }
      const filterOpts = $xeTable.computeFilterOpts
      const hasCheckOption = $xeFilterPanel.computeHasCheckOption
      const { filterRender, filterMultiple } = column
      const { confirmButtonText, resetButtonText, showFooter } = filterOpts
      const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
      const isDisabled = !hasCheckOption && !filterStore.isAllSelected && !filterStore.isIndeterminate
      let showFlFoot = !!filterMultiple
      if (XEUtils.isBoolean(showFooter)) {
        showFlFoot = showFooter
      } else if (compConf) {
        showFlFoot = !(compConf.showTableFilterFooter === false || compConf.showFilterFooter === false || compConf.isFooter === false)
      }
      return showFlFoot
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
                  click: ($xeFilterPanel as any).confirmFilter
                }
              }, confirmButtonText || getI18n('vxe.table.confirmFilter')),
              h('button', {
                on: {
                  click: ($xeFilterPanel as any).resetFilter
                }
              }, resetButtonText || getI18n('vxe.table.resetFilter'))
            ])
          ]
        : []
    },
    renderVN (h: CreateElement) {
      const $xeFilterPanel = this
      const props = $xeFilterPanel
      const $xeTable = $xeFilterPanel.$xeTable
      const tableInternalData = $xeTable as unknown as TableInternalData

      const { filterStore } = props
      const { visible, column } = filterStore
      if (!column) {
        return renderEmptyElement($xeFilterPanel)
      }
      const filterRender = column ? column.filterRender : null
      const compConf = filterRender && isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
      const filterClassName = compConf ? (compConf.tableFilterClassName || compConf.filterClassName) : ''
      const params = Object.assign({}, tableInternalData._currFilterParams, { $panel: $xeFilterPanel, $table: $xeTable })
      const tableProps = $xeTable
      const vSize = $xeFilterPanel.computeSize
      const filterOpts = $xeTable.computeFilterOpts
      const { destroyOnClose, className } = filterOpts
      return h('div', {
        ref: 'refElem',
        class: [
          'vxe-table--filter-wrapper',
          'filter--prevent-default',
          className,
          compConf && compConf.className ? compConf.className : '',
          getPropClass(filterClassName, params),
          {
            [`size--${vSize}`]: vSize,
            'is--animat': tableProps.animat,
            'is--multiple': column.filterMultiple,
            'is--active': visible
          }
        ],
        style: filterStore.style
      }, filterStore.visible && (destroyOnClose ? visible : true) && column ? ($xeFilterPanel as any).renderOptions(h, filterRender, compConf).concat(($xeFilterPanel as any).renderFooter(h)) : [])
    }
  },
  render (this: any, h: CreateElement) {
    return this.renderVN(h)
  }
}) /* define-vxe-component end */

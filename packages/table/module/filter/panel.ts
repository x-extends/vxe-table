import { h, ref, computed, inject, Teleport, PropType } from 'vue'
import { defineVxeComponent } from '../../../ui/src/comp'
import { VxeUI } from '../../../ui'
import { formatText, isEnableConf } from '../../../ui/src/utils'
import { getPropClass, toCssUnit } from '../../../ui/src/dom'
import { getSlotVNs } from '../../../ui/src/vn'
import { warnLog } from '../../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeGlobalRendererOptions } from 'vxe-pc-ui'
import type { VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods, VxeColumnPropTypes, VxeTableDefines } from '../../../../types'

const { getI18n, getIcon, renderer, renderEmptyElement } = VxeUI

export default defineVxeComponent({
  name: 'VxeTableFilterPanel',
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
      default: () => ({})
    }
  },
  setup (props, context) {
    const xID = XEUtils.uniqueId()

    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)
    const { reactData: tableReactData, internalData: tableInternalData, getComputeMaps } = $xeTable
    const { computeFilterOpts } = getComputeMaps()

    const refElem = ref<HTMLDivElement>()

    const refMaps = {
      refElem
    }

    const $xeFilterPanel: any = {
      xID,
      props,
      context,
      getRefMaps: () => refMaps
    }

    const computeHasCheckOption = computed(() => {
      const { filterStore } = props
      const { column } = filterStore
      return column && column.filters && column.filters.some((option) => option.checked)
    })

    // 全部筛选事件
    const filterCheckAllEvent = (evnt: Event, value: any) => {
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

    /*************************
     * Publish methods
     *************************/
    // 确认筛选
    const confirmFilter = (evnt: Event) => {
      const { filterStore } = props
      if (!evnt) {
        warnLog('vxe.error.delFunc', ['confirmFilter', 'saveFilterPanelByEvent'])
      }
      $xeTable.handleFilterConfirmFilter(evnt || new Event('click'), filterStore.column || null)
    }

    // （单选）筛选发生改变
    const changeRadioOption = (evnt: Event, checked: boolean, item: any) => {
      $xeTable.handleFilterChangeRadioOption(evnt, checked, item)
    }

    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    const resetFilter = (evnt: Event) => {
      const { filterStore } = props
      $xeTable.handleFilterResetFilter(evnt, filterStore.column || null)
    }

    // （多选）筛选发生改变
    const changeMultipleOption = (evnt: Event, checked: boolean, item: any) => {
      $xeTable.handleFilterChangeMultipleOption(evnt, checked, item)
    }

    // 筛选发生改变
    const changeOption = (evnt: Event, checked: boolean, item: any) => {
      $xeTable.handleFilterChangeOption(evnt, checked, item)
    }

    const changeAllOption = (evnt: Event, checked: boolean) => {
      const { filterStore } = props
      const { column } = filterStore
      if (column && column.filterMultiple) {
        filterCheckAllEvent(evnt, checked)
      } else {
        resetFilter(evnt)
      }
    }
    /*************************
     * Publish methods
     *************************/

    const filterPanelMethods = {
      changeRadioOption,
      changeMultipleOption,
      changeAllOption,
      changeOption,
      confirmFilter,
      resetFilter
    }
    Object.assign($xeFilterPanel, filterPanelMethods)

    const renderOptions = (filterRender: VxeColumnPropTypes.FilterRender | null, compConf: VxeGlobalRendererOptions | null) => {
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
          }, $xeTable.callSlot(filterSlot, params))
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
          }, getSlotVNs(rtFilter(filterRender, params)))
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
            title: getI18n(filterMultiple ? 'vxe.table.allTitle' : 'vxe.table.allFilter'),
            onClick: (evnt: MouseEvent) => {
              changeAllOption(evnt, !filterStore.isAllSelected)
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
              'is--checked': item._checked
            }],
            title: item.label,
            onClick: (evnt: MouseEvent) => {
              changeOption(evnt, !item._checked, item)
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
    }

    const renderFooters = () => {
      const { filterStore } = props
      const { column } = filterStore
      if (!column) {
        return []
      }
      const filterOpts = computeFilterOpts.value
      const hasCheckOption = computeHasCheckOption.value
      const { filterRender, filterMultiple } = column
      const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
      const isDisabled = !hasCheckOption && !filterStore.isAllSelected && !filterStore.isIndeterminate
      return (compConf ? !(compConf.showTableFilterFooter === false || compConf.showFilterFooter === false || compConf.isFooter === false) : filterMultiple)
        ? [
            h('div', {
              class: 'vxe-table--filter-footer'
            }, [
              h('button', {
                class: {
                  'is--disabled': isDisabled
                },
                disabled: isDisabled,
                onClick: confirmFilter
              }, filterOpts.confirmButtonText || getI18n('vxe.table.confirmFilter')),
              h('button', {
                onClick: resetFilter
              }, filterOpts.resetButtonText || getI18n('vxe.table.resetFilter'))
            ])
          ]
        : []
    }

    const renderVN = () => {
      const { filterStore } = props
      const { initStore } = tableReactData
      const { visible, column } = filterStore
      if (!column) {
        return renderEmptyElement($xeFilterPanel)
      }
      const filterRender = column ? column.filterRender : null
      const compConf = filterRender && isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
      const filterClassName = compConf ? (compConf.tableFilterClassName || compConf.filterClassName) : ''
      const params = Object.assign({}, tableInternalData._currFilterParams, { $panel: $xeFilterPanel, $table: $xeTable })
      const tableProps = $xeTable.props
      const { computeSize } = $xeTable.getComputeMaps()
      const vSize = computeSize.value
      const filterOpts = computeFilterOpts.value
      const { transfer, destroyOnClose, className } = filterOpts
      return h(Teleport, {
        to: 'body',
        disabled: !transfer
      }, [
        h('div', {
          ref: refElem,
          class: [
            'vxe-table--filter-wrapper',
            'filter--prevent-default',
            className,
            getPropClass(filterClassName, params),
            {
              [`size--${vSize}`]: vSize,
              'is--animat': tableProps.animat,
              'is--multiple': column.filterMultiple,
              'is--active': visible
            }
          ],
          style: filterStore.style
        }, initStore.filter && (destroyOnClose ? visible : true) && column ? renderOptions(filterRender, compConf).concat(renderFooters()) : [])
      ])
    }

    $xeFilterPanel.renderVN = renderVN

    return $xeFilterPanel
  },
  render () {
    return this.renderVN()
  }
})

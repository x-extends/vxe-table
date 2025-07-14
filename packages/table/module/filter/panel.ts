import { h, ref, computed, inject, Teleport } from 'vue'
import { defineVxeComponent } from '../../../ui/src/comp'
import { VxeUI } from '../../../ui'
import { formatText, isEnableConf } from '../../../ui/src/utils'
import { getPropClass } from '../../../ui/src/dom'
import { getSlotVNs } from '../../../ui/src/vn'
import { warnLog } from '../../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods } from '../../../../types'

const { getI18n, getIcon, renderer } = VxeUI

export default defineVxeComponent({
  name: 'VxeTableFilterPanel',
  props: {
    filterStore: Object as any
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
      return filterStore && filterStore.options.some((option: any) => option.checked)
    })

    // 全部筛选事件
    const filterCheckAllEvent = (evnt: Event, value: any) => {
      const { filterStore } = props
      filterStore.options.forEach((option: any) => {
        option._checked = value
        option.checked = value
      })
      filterStore.isAllSelected = value
      filterStore.isIndeterminate = false
    }

    /*************************
     * Publish methods
     *************************/
    // 确认筛选
    const confirmFilter = (evnt: Event) => {
      if (!evnt) {
        warnLog('vxe.error.delFunc', ['confirmFilter', 'saveFilterPanelByEvent'])
      }
      $xeTable.handleFilterConfirmFilter(evnt || new Event('click'))
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
      $xeTable.handleFilterResetFilter(evnt)
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
      if (filterStore.multiple) {
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

    const renderOptions = (filterRender: any, compConf: any) => {
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
          }, $xeTable.callSlot(filterSlot, params))
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
          }, getSlotVNs(rtFilter(filterRender, params)))
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
            title: getI18n(multiple ? 'vxe.table.allTitle' : 'vxe.table.allFilter'),
            onClick: (evnt: MouseEvent) => {
              changeAllOption(evnt, !filterStore.isAllSelected)
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
              'is--checked': item._checked
            }],
            title: item.label,
            onClick: (evnt: MouseEvent) => {
              changeOption(evnt, !item._checked, item)
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

    const renderFooters = () => {
      const { filterStore } = props
      const { column, multiple } = filterStore
      const filterOpts = computeFilterOpts.value
      const hasCheckOption = computeHasCheckOption.value
      const { filterRender } = column
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
      const { visible, multiple, column } = filterStore
      const filterRender = column ? column.filterRender : null
      const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
      const filterClassName = compConf ? (compConf.tableFilterClassName || compConf.filterClassName) : ''
      const params = Object.assign({}, tableInternalData._currFilterParams, { $panel: $xeFilterPanel, $table: $xeTable })
      const tableProps = $xeTable.props
      const { computeSize } = $xeTable.getComputeMaps()
      const vSize = computeSize.value
      const filterOpts = computeFilterOpts.value
      const { transfer, destroyOnClose } = filterOpts
      return h(Teleport, {
        to: 'body',
        disabled: !transfer
      }, [
        h('div', {
          ref: refElem,
          class: [
            'vxe-table--filter-wrapper',
            'filter--prevent-default',
            getPropClass(filterClassName, params),
            {
              [`size--${vSize}`]: vSize,
              'is--animat': tableProps.animat,
              'is--multiple': multiple,
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

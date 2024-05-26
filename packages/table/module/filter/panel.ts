import { defineComponent, h, computed, inject } from 'vue'
import { getI18n, getIcon, renderer } from '@vxe-ui/core'
import { formatText } from '../../../ui/src/utils'
import { getPropClass } from '../../../ui/src/dom'
import { getSlotVNs } from '../../../ui/src/vn'

import type { VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods } from '../../../../types'

export default defineComponent({
  name: 'VxeTableFilterPanel',
  props: {
    filterStore: Object as any
  },
  setup (props) {
    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)
    const { reactData: tableReactData, internalData: tableInternalData, getComputeMaps } = $xeTable
    const { computeFilterOpts } = getComputeMaps()

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
      const { filterStore } = props
      filterStore.options.forEach((option: any) => {
        option.checked = option._checked
      })
      $xeTable.confirmFilterEvent(evnt)
    }

    // （单选）筛选发生改变
    const changeRadioOption = (evnt: Event, checked: boolean, item: any) => {
      const { filterStore } = props
      filterStore.options.forEach((option: any) => {
        option._checked = false
      })
      item._checked = checked
      $xeTable.checkFilterOptions()
      confirmFilter(evnt)
    }

    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    const resetFilter = (evnt: Event) => {
      const { filterStore } = props
      $xeTable.handleClearFilter(filterStore.column)
      $xeTable.confirmFilterEvent(evnt)
    }

    // （多选）筛选发生改变
    const changeMultipleOption = (evnt: Event, checked: boolean, item: any) => {
      item._checked = checked
      $xeTable.checkFilterOptions()
    }

    // 筛选发生改变
    const changeOption = (evnt: Event, checked: boolean, item: any) => {
      const { filterStore } = props
      if (filterStore.multiple) {
        changeMultipleOption(evnt, checked, item)
      } else {
        changeRadioOption(evnt, checked, item)
      }
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

    const $panel = {
      changeRadioOption,
      changeMultipleOption,
      changeAllOption,
      changeOption,
      confirmFilter,
      resetFilter
    }

    const renderOptions = (filterRender: any, compConf: any) => {
      const { filterStore } = props
      const { column, multiple, maxHeight } = filterStore
      const { slots } = column
      const filterSlot = slots ? slots.filter : null
      const params = Object.assign({}, tableInternalData._currFilterParams, { $panel, $table: $xeTable })
      if (filterSlot) {
        return [
          h('div', {
            class: 'vxe-table--filter-template'
          }, $xeTable.callSlot(filterSlot, params))
        ]
      } else if (compConf && compConf.renderFilter) {
        return [
          h('div', {
            class: 'vxe-table--filter-template'
          }, getSlotVNs(compConf.renderFilter(filterRender, params)))
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
      const filterRender = column.filterRender
      const compConf = filterRender ? renderer.get(filterRender.name) : null
      const isDisabled = !hasCheckOption && !filterStore.isAllSelected && !filterStore.isIndeterminate
      return multiple && (!compConf || compConf.showFilterFooter !== false)
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
      const { column } = filterStore
      const filterRender = column ? column.filterRender : null
      const compConf = filterRender ? renderer.get(filterRender.name) : null
      const filterClassName = compConf ? compConf.filterClassName : ''
      const params = Object.assign({}, tableInternalData._currFilterParams, { $panel, $table: $xeTable })
      return h('div', {
        class: [
          'vxe-table--filter-wrapper',
          'filter--prevent-default',
          getPropClass(filterClassName, params),
          {
            'is--animat': $xeTable.props.animat,
            'is--multiple': filterStore.multiple,
            'is--active': filterStore.visible
          }
        ],
        style: filterStore.style
      }, initStore.filter && filterStore.visible ? renderOptions(filterRender, compConf).concat(renderFooters()) : [])
    }

    return renderVN
  }
})

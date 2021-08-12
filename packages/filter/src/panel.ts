import { defineComponent, h, computed, inject } from 'vue'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { VXETable } from '../../v-x-e-table'
import { formatText } from '../../tools/utils'

import { VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods } from '../../../types/all'

export default defineComponent({
  name: 'VxeTableFilter',
  props: {
    filterStore: Object as any
  },
  setup (props) {
    const $xetable = inject('$xetable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)
    const { reactData: tableReactData, internalData: tableInternalData } = $xetable

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
      $xetable.confirmFilterEvent(evnt)
    }

    // （单选）筛选发生改变
    const changeRadioOption = (evnt: Event, checked: boolean, item: any) => {
      const { filterStore } = props
      filterStore.options.forEach((option: any) => {
        option._checked = false
      })
      item._checked = checked
      $xetable.checkFilterOptions()
      confirmFilter(evnt)
    }

    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    const resetFilter = (evnt: Event) => {
      const { filterStore } = props
      $xetable.handleClearFilter(filterStore.column)
      $xetable.confirmFilterEvent(evnt)
    }

    // （多选）筛选发生改变
    const changeMultipleOption = (evnt: Event, checked: boolean, item: any) => {
      item._checked = checked
      $xetable.checkFilterOptions()
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
      const params = Object.assign({}, tableInternalData._currFilterParams, { $panel, $table: $xetable })
      if (filterSlot) {
        return [
          h('div', {
            class: 'vxe-table--filter-template'
          }, $xetable.callSlot(filterSlot, params))
        ]
      } else if (compConf && compConf.renderFilter) {
        return [
          h('div', {
            class: 'vxe-table--filter-template'
          }, compConf.renderFilter(filterRender, params))
        ]
      }
      return [
        h('ul', {
          class: 'vxe-table--filter-header'
        }, [
          h('li', {
            class: ['vxe-table--filter-option', {
              'is--checked': multiple ? filterStore.isAllSelected : !filterStore.options.some((item: any) => item._checked),
              'is--indeterminate': multiple && filterStore.isIndeterminate
            }],
            title: GlobalConfig.i18n(multiple ? 'vxe.table.allTitle' : 'vxe.table.allFilter'),
            onClick: (evnt: MouseEvent) => {
              changeAllOption(evnt, !filterStore.isAllSelected)
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
          class: 'vxe-table--filter-body',
          style: maxHeight ? {
            maxHeight: `${maxHeight}px`
          } : {}
        }, filterStore.options.map((item: any) => {
          return h('li', {
            class: ['vxe-table--filter-option', {
              'is--checked': item._checked
            }],
            title: item.label,
            onClick: (evnt: MouseEvent) => {
              changeOption(evnt, !item._checked, item)
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
            }, formatText(item.label, 1))
          ]))
        }))
      ]
    }

    const renderFooters = () => {
      const { filterStore } = props
      const { column, multiple } = filterStore
      const hasCheckOption = computeHasCheckOption.value
      const filterRender = column.filterRender
      const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
      const isDisabled = !hasCheckOption && !filterStore.isAllSelected && !filterStore.isIndeterminate
      return multiple && (!compConf || compConf.showFilterFooter !== false) ? [
        h('div', {
          class: 'vxe-table--filter-footer'
        }, [
          h('button', {
            class: {
              'is--disabled': isDisabled
            },
            disabled: isDisabled,
            onClick: confirmFilter
          }, GlobalConfig.i18n('vxe.table.confirmFilter')),
          h('button', {
            onClick: resetFilter
          }, GlobalConfig.i18n('vxe.table.resetFilter'))
        ])
      ] : []
    }

    const renderVN = () => {
      const { filterStore } = props
      const { initStore } = tableReactData
      const { column } = filterStore
      const filterRender = column ? column.filterRender : null
      const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
      return h('div', {
        class: ['vxe-table--filter-wrapper', 'filter--prevent-default', compConf && compConf.className ? compConf.className : '', {
          'is--animat': $xetable.props.animat,
          'is--multiple': filterStore.multiple,
          'is--active': filterStore.visible
        }],
        style: filterStore.style
      }, initStore.filter && filterStore.visible ? renderOptions(filterRender, compConf).concat(renderFooters()) : [])
    }

    return renderVN
  }
})

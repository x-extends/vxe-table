import { defineComponent, h, inject, ref, Ref, VNode, PropType, nextTick, TransitionGroup, createCommentVNode } from 'vue'
import { VxeUI } from '../../../ui'
import { formatText } from '../../../ui/src/utils'
import { addClass, removeClass } from '../../../ui/src/dom'
import { errLog } from '../../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeModalComponent, VxeDrawerComponent, VxeButtonComponent, VxeRadioGroupComponent, VxeTooltipComponent, VxeInputComponent, VxeButtonEvents } from 'vxe-pc-ui'
import type { VxeTableDefines, VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeColumnPropTypes } from '../../../../types'

const { getI18n, getIcon, renderEmptyElement } = VxeUI

export default defineComponent({
  name: 'TableCustomPanel',
  props: {
    customStore: {
      type: Object as PropType<VxeTableDefines.VxeTableCustomStoreObj>,
      default: () => ({})
    }
  },
  setup (props) {
    const VxeUIModalComponent = VxeUI.getComponent<VxeModalComponent>('VxeModal')
    const VxeUIDrawerComponent = VxeUI.getComponent<VxeDrawerComponent>('VxeDrawer')
    const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
    const VxeUINumberInputComponent = VxeUI.getComponent<VxeInputComponent>('VxeNumberInput')
    const VxeUITooltipComponent = VxeUI.getComponent<VxeTooltipComponent>('VxeTooltip')
    const VxeUIRadioGroupComponent = VxeUI.getComponent<VxeRadioGroupComponent>('VxeRadioGroup')

    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { reactData } = $xeTable
    const { computeCustomOpts, computeColumnOpts, computeIsMaxFixedColumn, computeResizableOpts } = $xeTable.getComputeMaps()

    const refElem = ref() as Ref<HTMLDivElement>
    const bodyElemRef = ref() as Ref<HTMLDivElement>
    const dragHintElemRef = ref() as Ref<HTMLDivElement>

    const dragColumnRef = ref<VxeTableDefines.ColumnInfo | null>()

    let prevDropTrEl: any

    const handleWrapperMouseenterEvent = (evnt: Event) => {
      const { customStore } = props
      customStore.activeWrapper = true
      $xeTable.customOpenEvent(evnt)
    }

    const handleWrapperMouseleaveEvent = (evnt: Event) => {
      const { customStore } = props
      customStore.activeWrapper = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          $xeTable.customCloseEvent(evnt)
        }
      }, 300)
    }

    const confirmCustomEvent: VxeButtonEvents.Click = ({ $event }) => {
      $xeTable.saveCustom()
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('confirm', $event)
    }

    const cancelCloseEvent: VxeButtonEvents.Click = ({ $event }) => {
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('close', $event)
    }

    const cancelCustomEvent: VxeButtonEvents.Click = ({ $event }) => {
      $xeTable.cancelCustom()
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('cancel', $event)
    }

    const handleResetCustomEvent = (evnt: Event) => {
      $xeTable.resetCustom(true)
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('reset', evnt)
    }

    const resetCustomEvent: VxeButtonEvents.Click = ({ $event }) => {
      if (VxeUI.modal) {
        VxeUI.modal.confirm({
          content: getI18n('vxe.custom.cstmConfirmRestore'),
          className: 'vxe-table--ignore-clear',
          escClosable: true
        }).then(type => {
          if (type === 'confirm') {
            handleResetCustomEvent($event)
          }
        })
      } else {
        handleResetCustomEvent($event)
      }
    }

    const handleOptionCheck = (column: VxeTableDefines.ColumnInfo) => {
      const { customColumnList } = reactData
      const matchObj = XEUtils.findTree(customColumnList, item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.renderVisible = parent.children.every((column) => column.renderVisible)
          parent.halfVisible = !parent.renderVisible && parent.children.some((column) => column.renderVisible || column.halfVisible)
          handleOptionCheck(parent)
        }
      }
    }

    const changeCheckboxOption = (column: VxeTableDefines.ColumnInfo) => {
      const isChecked = !column.renderVisible
      const customOpts = computeCustomOpts.value
      if (customOpts.immediate) {
        XEUtils.eachTree([column], (item) => {
          item.visible = isChecked
          item.renderVisible = isChecked
          item.halfVisible = false
        })
        $xeTable.handleCustom()
        $xeTable.saveCustomStore('update:visible')
      } else {
        XEUtils.eachTree([column], (item) => {
          item.renderVisible = isChecked
          item.halfVisible = false
        })
      }
      handleOptionCheck(column)
      $xeTable.checkCustomStatus()
    }

    const changeFixedOption = (column: VxeTableDefines.ColumnInfo, colFixed: VxeColumnPropTypes.Fixed) => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const customOpts = computeCustomOpts.value
      if (customOpts.immediate) {
        if (column.renderFixed === colFixed) {
          XEUtils.eachTree([column], col => {
            col.fixed = ''
            col.renderFixed = ''
          })
        } else {
          if (!isMaxFixedColumn || column.renderFixed) {
            XEUtils.eachTree([column], col => {
              col.fixed = colFixed
              col.renderFixed = colFixed
            })
          }
        }
        $xeTable.handleCustom()
        $xeTable.saveCustomStore('update:fixed')
      } else {
        if (column.renderFixed === colFixed) {
          XEUtils.eachTree([column], col => {
            col.renderFixed = ''
          })
        } else {
          if (!isMaxFixedColumn || column.renderFixed) {
            XEUtils.eachTree([column], col => {
              col.renderFixed = colFixed
            })
          }
        }
      }
    }

    const allOptionEvent = () => {
      $xeTable.toggleCustomAllCheckbox()
    }

    const sortMousedownEvent = (evnt: DragEvent) => {
      const btnEl = evnt.currentTarget as HTMLElement
      const tdEl = btnEl.parentNode as HTMLElement
      const trEl = tdEl.parentNode as HTMLElement
      const colid = trEl.getAttribute('colid')
      const column = $xeTable.getColumnById(colid)
      trEl.draggable = true
      dragColumnRef.value = column
      addClass(trEl, 'active--drag-origin')
      updateDropHint(evnt)
    }

    const sortMouseupEvent = (evnt: MouseEvent) => {
      const btnEl = evnt.currentTarget as HTMLElement
      const tdEl = btnEl.parentNode as HTMLElement
      const trEl = tdEl.parentNode as HTMLElement
      const dragHintEl = dragHintElemRef.value
      trEl.draggable = false
      dragColumnRef.value = null
      removeClass(trEl, 'active--drag-origin')
      if (dragHintEl) {
        dragHintEl.style.display = ''
      }
    }

    const sortDragstartEvent = (evnt: DragEvent) => {
      const img = new Image()
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage(img, 0, 0)
      }
    }

    const sortDragendEvent = (evnt: DragEvent) => {
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
      const trEl = evnt.currentTarget as HTMLElement
      const dragHintEl = dragHintElemRef.value
      if (prevDropTrEl) {
        // 判断是否有拖动
        if (prevDropTrEl !== trEl) {
          const dragOffset = prevDropTrEl.getAttribute('drag-pos')
          const colid = trEl.getAttribute('colid')
          const column = $xeTable.getColumnById(colid)
          if (!column) {
            return
          }
          const cIndex = XEUtils.findIndexOf(customColumnList, item => item.id === column.id)
          const targetColid = prevDropTrEl.getAttribute('colid')
          const targetColumn = $xeTable.getColumnById(targetColid)
          if (!targetColumn) {
            return
          }
          // 移出源位置
          customColumnList.splice(cIndex, 1)
          const tcIndex = XEUtils.findIndexOf(customColumnList, item => item.id === targetColumn.id)
          // 插新位置
          customColumnList.splice(tcIndex + (dragOffset === 'bottom' ? 1 : 0), 0, column)
        }
        prevDropTrEl.draggable = false
        prevDropTrEl.removeAttribute('drag-pos')
        removeClass(prevDropTrEl, 'active--drag-target')
      }
      dragColumnRef.value = null
      trEl.draggable = false
      trEl.removeAttribute('drag-pos')
      if (dragHintEl) {
        dragHintEl.style.display = ''
      }
      removeClass(trEl, 'active--drag-target')
      removeClass(trEl, 'active--drag-origin')

      if (customOpts.immediate) {
        XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
          if (!parent) {
            const sortIndex = index + 1
            column.renderSortNumber = sortIndex
          }
        })
        $xeTable.handleCustom()
        $xeTable.saveCustomStore('update:sort')
      }
    }

    const sortDragoverEvent = (evnt: DragEvent) => {
      const trEl = evnt.currentTarget as HTMLElement
      if (prevDropTrEl !== trEl) {
        removeClass(prevDropTrEl, 'active--drag-target')
      }
      const colid = trEl.getAttribute('colid')
      const column = $xeTable.getColumnById(colid)
      // 是否移入有效元行
      if (column && column.level === 1) {
        evnt.preventDefault()
        const offsetY = evnt.clientY - trEl.getBoundingClientRect().y
        const dragOffset = offsetY < trEl.clientHeight / 2 ? 'top' : 'bottom'
        addClass(trEl, 'active--drag-target')
        trEl.setAttribute('drag-pos', dragOffset)
        prevDropTrEl = trEl
      }
      updateDropHint(evnt)
    }

    const updateDropHint = (evnt: DragEvent) => {
      const dragHintEl = dragHintElemRef.value
      const bodyEl = bodyElemRef.value
      if (!bodyEl) {
        return
      }
      if (dragHintEl) {
        const wrapperEl = bodyEl.parentNode as HTMLElement
        const wrapperRect = wrapperEl.getBoundingClientRect()
        dragHintEl.style.display = 'block'
        dragHintEl.style.top = `${Math.min(wrapperEl.clientHeight - wrapperEl.scrollTop - dragHintEl.clientHeight, evnt.clientY - wrapperRect.y)}px`
        dragHintEl.style.left = `${Math.min(wrapperEl.clientWidth - wrapperEl.scrollLeft - dragHintEl.clientWidth - 16, evnt.clientX - wrapperRect.x)}px`
      }
    }

    const renderSimplePanel = () => {
      const { customStore } = props
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
      const { maxHeight } = customStore
      const { checkMethod, visibleMethod, allowVisible, allowSort, allowFixed, trigger, placement } = customOpts
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const slots = customOpts.slots || {}
      const headerSlot = slots.header
      const topSlot = slots.top
      const bottomSlot = slots.bottom
      const defaultSlot = slots.default
      const footerSlot = slots.footer
      const colVNs: VNode[] = []
      const customWrapperOns: any = {}
      const isAllChecked = customStore.isAll
      const isAllIndeterminate = customStore.isIndeterminate
      const dragColumn = dragColumnRef.value
      // hover 触发
      if (trigger === 'hover') {
        customWrapperOns.onMouseenter = handleWrapperMouseenterEvent
        customWrapperOns.onMouseleave = handleWrapperMouseleaveEvent
      }
      const params = {
        $table: $xeTable,
        $grid: $xeTable.xegrid,
        columns: customColumnList,
        isAllChecked,
        isAllIndeterminate
      }
      XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({ column }) : true
        if (isVisible) {
          const isChecked = column.renderVisible
          const isIndeterminate = column.halfVisible
          const isColGroup = column.children && column.children.length
          const colTitle = formatText(column.getTitle(), 1)
          const isDisabled = checkMethod ? !checkMethod({ column }) : false
          const isHidden = !isChecked
          colVNs.push(
            h('li', {
              key: column.id,
              colid: column.id,
              class: ['vxe-table-custom--option', `level--${column.level}`, {
                'is--hidden': isDisabled || isHidden,
                'is--group': isColGroup
              }],
              onDragstart: sortDragstartEvent,
              onDragend: sortDragendEvent,
              onDragover: sortDragoverEvent
            }, [
              allowVisible
                ? h('div', {
                  class: ['vxe-table-custom--checkbox-option', {
                    'is--checked': isChecked,
                    'is--indeterminate': isIndeterminate,
                    'is--disabled': isDisabled
                  }],
                  title: getI18n('vxe.custom.setting.colVisible'),
                  onClick: () => {
                    if (!isDisabled) {
                      changeCheckboxOption(column)
                    }
                  }
                }, [
                  h('span', {
                    class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                  })
                ])
                : createCommentVNode(),
              allowSort && column.level === 1
                ? h('div', {
                  class: 'vxe-table-custom--sort-option'
                }, [
                  h('span', {
                    class: ['vxe-table-custom--sort-btn', {
                      'is--disabled': isDisabled || isHidden
                    }],
                    title: getI18n('vxe.custom.setting.sortHelpTip'),
                    ...(isDisabled || isHidden
                      ? {}
                      : {
                          onMousedown: sortMousedownEvent,
                          onMouseup: sortMouseupEvent
                        })
                  }, [
                    h('i', {
                      class: getIcon().TABLE_CUSTOM_SORT
                    })
                  ])
                ])
                : createCommentVNode(),
              column.type === 'html'
                ? h('div', {
                  key: '1',
                  class: 'vxe-table-custom--checkbox-label',
                  innerHTML: colTitle
                })
                : h('div', {
                  key: '0',
                  class: 'vxe-table-custom--checkbox-label'
                }, colTitle),
              !parent && allowFixed
                ? h('div', {
                  class: 'vxe-table-custom--fixed-option'
                }, [
                  VxeUIButtonComponent
                    ? h(VxeUIButtonComponent, {
                      mode: 'text',
                      icon: column.renderFixed === 'left' ? getIcon().TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_LEFT,
                      status: column.renderFixed === 'left' ? 'primary' : '',
                      disabled: isDisabled || isHidden || (isMaxFixedColumn && !column.renderFixed),
                      title: getI18n(column.renderFixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft'),
                      onClick: () => {
                        changeFixedOption(column, 'left')
                      }
                    })
                    : createCommentVNode(),
                  VxeUIButtonComponent
                    ? h(VxeUIButtonComponent, {
                      mode: 'text',
                      icon: column.renderFixed === 'right' ? getIcon().TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_RIGHT,
                      status: column.renderFixed === 'right' ? 'primary' : '',
                      disabled: isDisabled || isHidden || (isMaxFixedColumn && !column.renderFixed),
                      title: getI18n(column.renderFixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight'),
                      onClick: () => {
                        changeFixedOption(column, 'right')
                      }
                    })
                    : createCommentVNode()
                ])
                : createCommentVNode()
            ])
          )
        }
      })
      return h('div', {
        ref: refElem,
        key: 'simple',
        class: ['vxe-table-custom-wrapper', `placement--${placement}`, {
          'is--active': customStore.visible
        }],
        style: maxHeight && !['left', 'right'].includes(placement as string)
          ? {
              maxHeight: `${maxHeight}px`
            }
          : {}
      }, customStore.visible
        ? [
            h('div', {
              class: 'vxe-table-custom--header'
            }, headerSlot
              ? $xeTable.callSlot(headerSlot, params)
              : [
                  h('ul', {
                    class: 'vxe-table-custom--panel-list'
                  }, [
                    h('li', {
                      class: 'vxe-table-custom--option'
                    }, [
                      allowVisible
                        ? h('div', {
                          class: ['vxe-table-custom--checkbox-option', {
                            'is--checked': isAllChecked,
                            'is--indeterminate': isAllIndeterminate
                          }],
                          title: getI18n('vxe.table.allTitle'),
                          onClick: allOptionEvent
                        }, [
                          h('span', {
                            class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                          }),
                          h('span', {
                            class: 'vxe-checkbox--label'
                          }, getI18n('vxe.toolbar.customAll'))
                        ])
                        : h('span', {
                          class: 'vxe-checkbox--label'
                        }, getI18n('vxe.table.customTitle'))
                    ])
                  ])
                ]),
            h('div', {
              ref: bodyElemRef,
              class: 'vxe-table-custom--body'
            }, [
              topSlot
                ? h('div', {
                  class: 'vxe-table-custom--panel-top'
                }, $xeTable.callSlot(topSlot, params))
                : renderEmptyElement($xeTable),
              defaultSlot
                ? h('div', {
                  class: 'vxe-table-custom--panel-body'
                }, $xeTable.callSlot(defaultSlot, params))
                : h(TransitionGroup, {
                  class: 'vxe-table-custom--panel-list',
                  name: 'vxe-table-custom--list',
                  tag: 'ul',
                  ...customWrapperOns
                }, {
                  default: () => colVNs
                }),
              bottomSlot
                ? h('div', {
                  class: 'vxe-table-custom--panel-bottom'
                }, $xeTable.callSlot(bottomSlot, params))
                : renderEmptyElement($xeTable),
              h('div', {
                ref: dragHintElemRef,
                class: 'vxe-table-custom-popup--drag-hint'
              }, getI18n('vxe.custom.cstmDragTarget', [dragColumn && dragColumn.type !== 'html' ? dragColumn.getTitle() : '']))
            ]),
            customOpts.showFooter
              ? h('div', {
                class: 'vxe-table-custom--footer'
              }, footerSlot
                ? $xeTable.callSlot(footerSlot, params)
                : [
                    h('div', {
                      class: 'vxe-table-custom--footer-buttons'
                    }, [
                      VxeUIButtonComponent
                        ? h(VxeUIButtonComponent, {
                          mode: 'text',
                          content: customOpts.resetButtonText || getI18n('vxe.table.customRestore'),
                          onClick: resetCustomEvent
                        })
                        : createCommentVNode(),
                      customOpts.immediate
                        ? (VxeUIButtonComponent
                            ? h(VxeUIButtonComponent, {
                              mode: 'text',
                              content: customOpts.closeButtonText || getI18n('vxe.table.customClose'),
                              onClick: cancelCloseEvent
                            })
                            : createCommentVNode())
                        : (VxeUIButtonComponent
                            ? h(VxeUIButtonComponent, {
                              mode: 'text',
                              content: customOpts.cancelButtonText || getI18n('vxe.table.customCancel'),
                              onClick: cancelCustomEvent
                            })
                            : createCommentVNode()),
                      customOpts.immediate
                        ? createCommentVNode()
                        : (VxeUIButtonComponent
                            ? h(VxeUIButtonComponent, {
                              mode: 'text',
                              status: 'primary',
                              content: customOpts.confirmButtonText || getI18n('vxe.table.customConfirm'),
                              onClick: confirmCustomEvent
                            })
                            : createCommentVNode())
                    ])
                  ])
              : null
          ]
        : [])
    }

    const renderPopupPanel = () => {
      const { customStore } = props
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
      const { modalOptions, drawerOptions, allowVisible, allowSort, allowFixed, allowResizable, checkMethod, visibleMethod } = customOpts
      const columnOpts = computeColumnOpts.value
      const { maxFixedSize } = columnOpts
      const resizableOpts = computeResizableOpts.value
      const { minWidth: reMinWidth, maxWidth: reMaxWidth } = resizableOpts
      const { mode } = customOpts
      const modalOpts = Object.assign({}, modalOptions)
      const drawerOpts = Object.assign({}, drawerOptions)
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const slots = customOpts.slots || {}
      const headerSlot = slots.header
      const topSlot = slots.top
      const bottomSlot = slots.bottom
      const defaultSlot = slots.default
      const footerSlot = slots.footer
      const trVNs: VNode[] = []
      const isAllChecked = customStore.isAll
      const isAllIndeterminate = customStore.isIndeterminate
      const dragColumn = dragColumnRef.value
      const params = {
        $table: $xeTable,
        $grid: $xeTable.xegrid,
        columns: customColumnList,
        isAllChecked,
        isAllIndeterminate
      }
      XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({ column }) : true
        if (isVisible) {
          // 默认继承调整宽度
          let customMinWidth = 0
          let customMaxWidth = 0
          if (allowResizable) {
            const resizeParams = {
              $table: $xeTable,
              column,
              columnIndex: index,
              $columnIndex: index,
              $rowIndex: -1
            }
            if (reMinWidth) {
              customMinWidth = XEUtils.toNumber(XEUtils.isFunction(reMinWidth) ? reMinWidth(resizeParams) : reMinWidth)
            }
            if (reMaxWidth) {
              customMaxWidth = XEUtils.toNumber(XEUtils.isFunction(reMaxWidth) ? reMaxWidth(resizeParams) : reMaxWidth)
            }
          }

          const isChecked = column.renderVisible
          const isIndeterminate = column.halfVisible
          const colTitle = formatText(column.getTitle(), 1)
          const isColGroup = column.children && column.children.length
          const isDisabled = checkMethod ? !checkMethod({ column }) : false
          const isHidden = !isChecked
          trVNs.push(
            h('tr', {
              key: column.id,
              colid: column.id,
              class: [`vxe-table-custom-popup--row level--${column.level}`, {
                'is--group': isColGroup
              }],
              onDragstart: sortDragstartEvent,
              onDragend: sortDragendEvent,
              onDragover: sortDragoverEvent
            }, [
              allowVisible
                ? h('td', {
                  class: 'vxe-table-custom-popup--column-item col--visible'
                }, [
                  h('div', {
                    class: ['vxe-table-custom--checkbox-option', {
                      'is--checked': isChecked,
                      'is--indeterminate': isIndeterminate,
                      'is--disabled': isDisabled
                    }],
                    title: getI18n('vxe.custom.setting.colVisible'),
                    onClick: () => {
                      if (!isDisabled) {
                        changeCheckboxOption(column)
                      }
                    }
                  }, [
                    h('span', {
                      class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                    })
                  ])
                ])
                : createCommentVNode(),
              allowSort
                ? h('td', {
                  class: 'vxe-table-custom-popup--column-item col--sort'
                }, [
                  column.level === 1
                    ? h('span', {
                      class: ['vxe-table-custom-popup--column-sort-btn', {
                        'is--disabled': isDisabled || isHidden
                      }],
                      title: getI18n('vxe.custom.setting.sortHelpTip'),
                      ...(isDisabled || isHidden
                        ? {}
                        : {
                            onMousedown: sortMousedownEvent,
                            onMouseup: sortMouseupEvent
                          })
                    }, [
                      h('i', {
                        class: getIcon().TABLE_CUSTOM_SORT
                      })
                    ])
                    : h('span', '-')
                ])
                : createCommentVNode(),
              h('td', {
                class: 'vxe-table-custom-popup--column-item col--name'
              }, [
                column.type === 'html'
                  ? h('div', {
                    key: '1',
                    class: 'vxe-table-custom-popup--name',
                    innerHTML: colTitle
                  })
                  : h('div', {
                    key: '0',
                    class: 'vxe-table-custom-popup--name',
                    title: colTitle
                  }, colTitle)
              ]),
              allowResizable
                ? h('td', {
                  class: 'vxe-table-custom-popup--column-item col--resizable'
                }, [
                  column.children && column.children.length
                    ? h('span', '-')
                    : (
                        VxeUINumberInputComponent
                          ? h(VxeUINumberInputComponent, {
                            type: 'integer',
                            disabled: isDisabled || isHidden,
                            modelValue: column.renderResizeWidth,
                            min: customMinWidth || undefined,
                            max: customMaxWidth || undefined,
                            'onUpdate:modelValue' (value: any) {
                              column.renderResizeWidth = Math.max(0, Number(value))
                            }
                          })
                          : createCommentVNode()
                      )
                ])
                : createCommentVNode(),
              allowFixed
                ? h('td', {
                  class: 'vxe-table-custom-popup--column-item col--fixed'
                }, [
                  parent
                    ? h('span', '-')
                    : (
                        VxeUIRadioGroupComponent
                          ? h(VxeUIRadioGroupComponent, {
                            modelValue: column.renderFixed || '',
                            type: 'button',
                            size: 'mini',
                            disabled: isDisabled || isHidden,
                            options: [
                              { label: getI18n('vxe.custom.setting.fixedLeft'), value: 'left', disabled: isDisabled || isHidden || isMaxFixedColumn },
                              { label: getI18n('vxe.custom.setting.fixedUnset'), value: '', disabled: isDisabled || isHidden },
                              { label: getI18n('vxe.custom.setting.fixedRight'), value: 'right', disabled: isDisabled || isHidden || isMaxFixedColumn }
                            ],
                            'onUpdate:modelValue' (value: any) {
                              column.renderFixed = value
                            }
                          })
                          : createCommentVNode()
                      )
                ])
                : createCommentVNode()
            ])
          )
        }
      })
      const scopedSlots: Record<string, any> = {
        default: () => {
          if (defaultSlot) {
            return $xeTable.callSlot(defaultSlot, params)
          }
          return h('div', {
            ref: bodyElemRef,
            class: 'vxe-table-custom-popup--body'
          }, [
            topSlot
              ? h('div', {
                class: 'vxe-table-custom-popup--table-top'
              }, $xeTable.callSlot(topSlot, params))
              : renderEmptyElement($xeTable),
            h('div', {
              class: 'vxe-table-custom-popup--table-wrapper'
            }, [
              h('table', {}, [
                h('colgroup', {}, [
                  allowVisible
                    ? h('col', {
                      class: 'vxe-table-custom-popup--table-col-seq'
                    })
                    : createCommentVNode(),
                  allowSort
                    ? h('col', {
                      class: 'vxe-table-custom-popup--table-col-sort'
                    })
                    : createCommentVNode(),
                  h('col', {
                    class: 'vxe-table-custom-popup--table-col-title'
                  }),
                  allowResizable
                    ? h('col', {
                      class: 'vxe-table-custom-popup--table-col-width'
                    })
                    : createCommentVNode(),
                  allowFixed
                    ? h('col', {
                      class: 'vxe-table-custom-popup--table-col-fixed'
                    })
                    : createCommentVNode()
                ]),
                h('thead', {}, [
                  h('tr', {}, [
                    allowVisible
                      ? h('th', {}, [
                        h('div', {
                          class: ['vxe-table-custom--checkbox-option', {
                            'is--checked': isAllChecked,
                            'is--indeterminate': isAllIndeterminate
                          }],
                          title: getI18n('vxe.table.allTitle'),
                          onClick: allOptionEvent
                        }, [
                          h('span', {
                            class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                          }),
                          h('span', {
                            class: 'vxe-checkbox--label'
                          }, getI18n('vxe.toolbar.customAll'))
                        ])
                      ])
                      : createCommentVNode(),
                    allowSort
                      ? h('th', {}, [
                        h('span', {
                          class: 'vxe-table-custom-popup--table-sort-help-title'
                        }, getI18n('vxe.custom.setting.colSort')),
                        VxeUITooltipComponent
                          ? h(VxeUITooltipComponent, {
                            enterable: true,
                            content: getI18n('vxe.custom.setting.sortHelpTip'),
                            popupClassName: 'vxe-table--ignore-clear'
                          }, {
                            default: () => {
                              return h('i', {
                                class: 'vxe-table-custom-popup--table-sort-help-icon vxe-icon-question-circle-fill'
                              })
                            }
                          })
                          : createCommentVNode()
                      ])
                      : createCommentVNode(),
                    h('th', {}, getI18n('vxe.custom.setting.colTitle')),
                    allowResizable
                      ? h('th', {}, getI18n('vxe.custom.setting.colResizable'))
                      : createCommentVNode(),
                    allowFixed
                      ? h('th', {}, getI18n(`vxe.custom.setting.${maxFixedSize ? 'colFixedMax' : 'colFixed'}`, [maxFixedSize]))
                      : createCommentVNode()
                  ])
                ]),
                h(TransitionGroup, {
                  class: 'vxe-table-custom--panel-list',
                  tag: 'tbody',
                  name: 'vxe-table-custom--list'
                }, {
                  default: () => trVNs
                })
              ])
            ]),
            bottomSlot
              ? h('div', {
                class: 'vxe-table-custom-popup--table-bottom'
              }, $xeTable.callSlot(bottomSlot, params))
              : renderEmptyElement($xeTable),
            h('div', {
              ref: dragHintElemRef,
              class: 'vxe-table-custom-popup--drag-hint'
            }, getI18n('vxe.custom.cstmDragTarget', [dragColumn ? dragColumn.getTitle() : '']))
          ])
        },
        footer: () => {
          if (footerSlot) {
            return $xeTable.callSlot(footerSlot, params)
          }
          return h('div', {
            class: 'vxe-table-custom-popup--footer'
          }, [
            VxeUIButtonComponent
              ? h(VxeUIButtonComponent, {
                content: customOpts.resetButtonText || getI18n('vxe.custom.cstmRestore'),
                onClick: resetCustomEvent
              })
              : createCommentVNode(),
            VxeUIButtonComponent
              ? h(VxeUIButtonComponent, {
                content: customOpts.resetButtonText || getI18n('vxe.custom.cstmCancel'),
                onClick: cancelCustomEvent
              })
              : createCommentVNode(),
            VxeUIButtonComponent
              ? h(VxeUIButtonComponent, {
                status: 'primary',
                content: customOpts.confirmButtonText || getI18n('vxe.custom.cstmConfirm'),
                onClick: confirmCustomEvent
              })
              : createCommentVNode()
          ])
        }
      }
      if (headerSlot) {
        scopedSlots.header = () => $xeTable.callSlot(headerSlot, params)
      }
      if (mode === 'drawer') {
        return VxeUIDrawerComponent
          ? h(VxeUIDrawerComponent, {
            key: 'drawer',
            className: ['vxe-table-custom-drawer-wrapper', 'vxe-table--ignore-clear', drawerOpts.className || ''].join(' '),
            modelValue: customStore.visible,
            title: drawerOpts.title || getI18n('vxe.custom.cstmTitle'),
            width: drawerOpts.width || Math.min(880, document.documentElement.clientWidth),
            position: drawerOpts.position,
            escClosable: !!drawerOpts.escClosable,
            destroyOnClose: true,
            showFooter: true,
            'onUpdate:modelValue' (value: any) {
              customStore.visible = value
            }
          }, scopedSlots)
          : createCommentVNode()
      }
      return VxeUIModalComponent
        ? h(VxeUIModalComponent, {
          key: 'modal',
          className: ['vxe-table-custom-modal-wrapper', 'vxe-table--ignore-clear', modalOpts.className || ''].join(' '),
          modelValue: customStore.visible,
          title: modalOpts.title || getI18n('vxe.custom.cstmTitle'),
          width: modalOpts.width || Math.min(880, document.documentElement.clientWidth),
          minWidth: modalOpts.minWidth || 700,
          height: modalOpts.height || Math.min(680, document.documentElement.clientHeight),
          minHeight: modalOpts.minHeight || 400,
          showZoom: modalOpts.showZoom,
          showMaximize: modalOpts.showMaximize,
          showMinimize: modalOpts.showMinimize,
          mask: modalOpts.mask,
          lockView: modalOpts.lockView,
          resize: modalOpts.resize,
          escClosable: !!modalOpts.escClosable,
          destroyOnClose: true,
          showFooter: true,
          'onUpdate:modelValue' (value: any) {
            customStore.visible = value
          }
        }, scopedSlots)
        : createCommentVNode()
    }

    const renderVN = () => {
      const customOpts = computeCustomOpts.value
      if (['modal', 'drawer', 'popup'].includes(`${customOpts.mode}`)) {
        return renderPopupPanel()
      }
      return renderSimplePanel()
    }

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      nextTick(() => {
        const customOpts = computeCustomOpts.value
        const { mode } = customOpts
        if (!VxeUIModalComponent) {
          errLog('vxe.error.reqComp', ['vxe-modal'])
        }
        if (!VxeUIDrawerComponent && (mode === 'drawer')) {
          errLog('vxe.error.reqComp', ['vxe-drawer'])
        }
        if (!VxeUIButtonComponent) {
          errLog('vxe.error.reqComp', ['vxe-button'])
        }
        if (!VxeUINumberInputComponent) {
          errLog('vxe.error.reqComp', ['vxe-number-input'])
        }
        if (!VxeUITooltipComponent) {
          errLog('vxe.error.reqComp', ['vxe-tooltip'])
        }
        if (!VxeUIRadioGroupComponent) {
          errLog('vxe.error.reqComp', ['vxe-radio-group'])
        }
      })
    }

    return renderVN
  }
})

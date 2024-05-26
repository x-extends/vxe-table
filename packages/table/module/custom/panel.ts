import { defineComponent, h, inject, ref, Ref, VNode, PropType, resolveComponent, TransitionGroup } from 'vue'
import { VxeUI, getI18n, getIcon } from '@vxe-ui/core'
import { formatText } from '../../../ui/src/utils'
import { addClass, removeClass } from '../../../ui/src/dom'
import XEUtils from 'xe-utils'

import type { VxeModalComponent, VxeButtonComponent, VxeRadioGroupComponent, VxeTooltipComponent } from 'vxe-pc-ui'
import type { VxeTableDefines, VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeColumnPropTypes } from '../../../../types'

export default defineComponent({
  name: 'TableCustomPanel',
  props: {
    customStore: {
      type: Object as PropType<VxeTableDefines.VxeTableCustomStoreObj>,
      default: () => ({})
    }
  },
  setup (props) {
    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { reactData } = $xeTable
    const { computeCustomOpts, computeColumnOpts, computeIsMaxFixedColumn } = $xeTable.getComputeMaps()

    const refElem = ref() as Ref<HTMLDivElement>
    const bodyElemRef = ref() as Ref<HTMLDivElement>
    const dragHintElemRef = ref() as Ref<HTMLDivElement>

    const dragColumn = ref<VxeTableDefines.ColumnInfo | null>()

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
          $xeTable.customColseEvent(evnt)
        }
      }, 300)
    }

    const confirmCustomEvent = (evnt: Event) => {
      updateColumnSort()
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('confirm', evnt)
    }

    const cancelCustomEvent = (evnt: Event) => {
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('cancel', evnt)
    }

    const resetCustomEvent = (evnt: Event) => {
      $xeTable.resetColumn(true)
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('reset', evnt)
    }

    const resetPopupCustomEvent = (evnt: Event) => {
      if (VxeUI.modal) {
        VxeUI.modal.confirm({
          content: getI18n('vxe.custom.cstmConfirmRestore'),
          className: 'vxe-table--ignore-clear',
          escClosable: true
        }).then(type => {
          if (type === 'confirm') {
            resetCustomEvent(evnt)
          }
        })
      } else {
        resetCustomEvent(evnt)
      }
    }

    const handleOptionCheck = (column: VxeTableDefines.ColumnInfo) => {
      const { customColumnList } = reactData
      const matchObj = XEUtils.findTree(customColumnList, item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every((column) => column.visible)
          parent.halfVisible = !parent.visible && parent.children.some((column) => column.visible || column.halfVisible)
          handleOptionCheck(parent)
        }
      }
    }

    const changeCheckboxOption = (column: VxeTableDefines.ColumnInfo) => {
      const isChecked = !column.visible
      const customOpts = computeCustomOpts.value
      XEUtils.eachTree([column], (item) => {
        item.visible = isChecked
        item.halfVisible = false
      })
      handleOptionCheck(column)
      if (customOpts.immediate) {
        $xeTable.handleCustom()
      }
      $xeTable.checkCustomStatus()
    }

    const changeFixedOption = (column: VxeTableDefines.ColumnInfo, colFixed: VxeColumnPropTypes.Fixed) => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      if (column.fixed === colFixed) {
        $xeTable.clearColumnFixed(column)
      } else {
        if (!isMaxFixedColumn || column.fixed) {
          $xeTable.setColumnFixed(column, colFixed)
        }
      }
    }

    const changePopupFixedOption = (column: VxeTableDefines.ColumnInfo) => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      if (!isMaxFixedColumn) {
        $xeTable.setColumnFixed(column, column.fixed)
      }
    }

    const allCustomEvent = () => {
      const { customStore } = props
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
      const { checkMethod } = customOpts
      const isAll = !customStore.isAll
      XEUtils.eachTree(customColumnList, (column) => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = isAll
          column.halfVisible = false
        }
      })
      customStore.isAll = isAll
      $xeTable.checkCustomStatus()
    }

    const sortMousedownEvent = (evnt: DragEvent) => {
      const btnEl = evnt.currentTarget as HTMLElement
      const tdEl = btnEl.parentNode as HTMLElement
      const trEl = tdEl.parentNode as HTMLElement
      const colid = trEl.getAttribute('colid')
      const column = $xeTable.getColumnById(colid)
      trEl.draggable = true
      dragColumn.value = column
      addClass(trEl, 'active--drag-origin')
    }

    const sortMouseupEvent = (evnt: DragEvent) => {
      const btnEl = evnt.currentTarget as HTMLElement
      const tdEl = btnEl.parentNode as HTMLElement
      const trEl = tdEl.parentNode as HTMLElement
      const dragHintEl = dragHintElemRef.value
      trEl.draggable = false
      dragColumn.value = null
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

    const updateColumnSort = () => {
      const { customColumnList } = reactData
      // 更新顺序
      customColumnList.forEach((column, index) => {
        const sortIndex = index + 1
        column.renderSortNumber = sortIndex
      })
    }

    const sortDragendEvent = (evnt: DragEvent) => {
      const { customColumnList } = reactData
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
      dragColumn.value = null
      trEl.draggable = false
      trEl.removeAttribute('drag-pos')
      if (dragHintEl) {
        dragHintEl.style.display = ''
      }
      removeClass(trEl, 'active--drag-target')
      removeClass(trEl, 'active--drag-origin')
      // 更新顺序
      updateColumnSort()
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
      const { checkMethod, visibleMethod, trigger } = customOpts
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const colVNs: VNode[] = []
      const customWrapperOns: any = {}
      // hover 触发
      if (trigger === 'hover') {
        customWrapperOns.onMouseenter = handleWrapperMouseenterEvent
        customWrapperOns.onMouseleave = handleWrapperMouseleaveEvent
      }
      XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({ column }) : true
        if (isVisible) {
          const isChecked = column.visible
          const isIndeterminate = column.halfVisible
          const isColGroup = column.children && column.children.length
          const colTitle = formatText(column.getTitle(), 1)
          const isDisabled = checkMethod ? !checkMethod({ column }) : false
          colVNs.push(
            h('li', {
              key: column.id,
              class: ['vxe-table-custom--option', `level--${column.level}`, {
                'is--group': isColGroup
              }]
            }, [
              h('div', {
                title: colTitle,
                class: ['vxe-table-custom--checkbox-option', {
                  'is--checked': isChecked,
                  'is--indeterminate': isIndeterminate,
                  'is--disabled': isDisabled
                }],
                onClick: () => {
                  if (!isDisabled) {
                    changeCheckboxOption(column)
                  }
                }
              }, [
                h('span', {
                  class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                }),
                h('span', {
                  class: 'vxe-checkbox--label'
                }, colTitle)
              ]),
              !parent && customOpts.allowFixed
                ? h('div', {
                  class: 'vxe-table-custom--fixed-option'
                }, [
                  h('span', {
                    class: ['vxe-table-custom--fixed-left-option', column.fixed === 'left' ? getIcon().TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_LEFT, {
                      'is--checked': column.fixed === 'left',
                      'is--disabled': isMaxFixedColumn && !column.fixed
                    }],
                    title: getI18n(column.fixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft'),
                    onClick: () => {
                      changeFixedOption(column, 'left')
                    }
                  }),
                  h('span', {
                    class: ['vxe-table-custom--fixed-right-option', column.fixed === 'right' ? getIcon().TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_RIGHT, {
                      'is--checked': column.fixed === 'right',
                      'is--disabled': isMaxFixedColumn && !column.fixed
                    }],
                    title: getI18n(column.fixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight'),
                    onClick: () => {
                      changeFixedOption(column, 'right')
                    }
                  })
                ])
                : null
            ])
          )
        }
      })
      const isAllChecked = customStore.isAll
      const isAllIndeterminate = customStore.isIndeterminate
      return h('div', {
        ref: refElem,
        key: 'simple',
        class: ['vxe-table-custom-wrapper', {
          'is--active': customStore.visible
        }]
      }, [
        h('ul', {
          class: 'vxe-table-custom--header'
        }, [
          h('li', {
            class: 'vxe-table-custom--option'
          }, [
            h('div', {
              class: ['vxe-table-custom--checkbox-option', {
                'is--checked': isAllChecked,
                'is--indeterminate': isAllIndeterminate
              }],
              title: getI18n('vxe.table.allTitle'),
              onClick: allCustomEvent
            }, [
              h('span', {
                class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
              }),
              h('span', {
                class: 'vxe-checkbox--label'
              }, getI18n('vxe.toolbar.customAll'))
            ])
          ])
        ]),
        h('ul', {
          class: 'vxe-table-custom--body',
          style: maxHeight
            ? {
                maxHeight: `${maxHeight}px`
              }
            : {},
          ...customWrapperOns
        }, colVNs),
        customOpts.showFooter
          ? h('div', {
            class: 'vxe-table-custom--footer'
          }, [
            h('button', {
              class: 'btn--reset',
              onClick: resetCustomEvent
            }, customOpts.resetButtonText || getI18n('vxe.toolbar.customRestore')),
            h('button', {
              class: 'btn--confirm',
              onClick: confirmCustomEvent
            }, customOpts.confirmButtonText || getI18n('vxe.toolbar.customConfirm'))
          ])
          : null
      ])
    }

    const renderPopupPanel = () => {
      const { customStore } = props
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
      const { checkMethod, visibleMethod } = customOpts
      const columnOpts = computeColumnOpts.value
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const trVNs: VNode[] = []
      XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({ column }) : true
        if (isVisible) {
          const isChecked = column.visible
          const isIndeterminate = column.halfVisible
          const colTitle = formatText(column.getTitle(), 1)
          const isColGroup = column.children && column.children.length
          const isDisabled = checkMethod ? !checkMethod({ column }) : false
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
              h('td', {
                class: 'vxe-table-custom-popup--column-item col--sort'
              }, [
                column.level === 1
                  ? h('span', {
                    class: 'vxe-table-custom-popup--column-sort-btn',
                    onMousedown: sortMousedownEvent,
                    onMouseup: sortMouseupEvent
                  }, [
                    h('i', {
                      class: 'vxe-icon-sort'
                    })
                  ])
                  : null
              ]),
              h('td', {
                class: 'vxe-table-custom-popup--column-item col--name'
              }, [
                h('div', {
                  class: 'vxe-table-custom-popup--name',
                  title: colTitle
                }, colTitle)
              ]),
              h('td', {
                class: 'vxe-table-custom-popup--column-item col--visible'
              }, [
                h('div', {
                  class: ['vxe-table-custom--checkbox-option', {
                    'is--checked': isChecked,
                    'is--indeterminate': isIndeterminate,
                    'is--disabled': isDisabled
                  }],
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
              ]),
              h('td', {
                class: 'vxe-table-custom-popup--column-item col--fixed'
              }, [
                !parent && customOpts.allowFixed
                  ? h(resolveComponent('vxe-radio-group') as VxeRadioGroupComponent, {
                    modelValue: column.fixed || '',
                    type: 'button',
                    size: 'mini',
                    options: [
                      { label: getI18n('vxe.custom.setting.fixedLeft'), value: 'left', disabled: isMaxFixedColumn },
                      { label: getI18n('vxe.custom.setting.fixedUnset'), value: '' },
                      { label: getI18n('vxe.custom.setting.fixedRight'), value: 'right', disabled: isMaxFixedColumn }
                    ],
                    'onUpdate:modelValue' (value: any) {
                      column.fixed = value
                    },
                    onChange () {
                      changePopupFixedOption(column)
                    }
                  })
                  : null
              ])
            ])
          )
        }
      })
      return h(resolveComponent('vxe-modal') as VxeModalComponent, {
        key: 'popup',
        className: 'vxe-table-custom-popup-wrapper vxe-table--ignore-clear',
        modelValue: customStore.visible,
        title: getI18n('vxe.custom.cstmTitle'),
        width: '40vw',
        minWidth: 520,
        height: '50vh',
        minHeight: 300,
        mask: true,
        lockView: true,
        showFooter: true,
        resize: true,
        escClosable: true,
        destroyOnClose: true,
        'onUpdate:modelValue' (value: any) {
          customStore.visible = value
        }
      }, {
        default: () => {
          return h('div', {
            ref: bodyElemRef,
            class: 'vxe-table-custom-popup--body'
          }, [
            h('div', {
              class: 'vxe-table-custom-popup--table-wrapper'
            }, [
              h('table', {}, [
                h('colgroup', {}, [
                  h('col', {
                    style: {
                      width: '80px'
                    }
                  }),
                  h('col', {}),
                  h('col', {
                    style: {
                      width: '80px'
                    }
                  }),
                  h('col', {
                    style: {
                      width: '200px'
                    }
                  })
                ]),
                h('thead', {}, [
                  h('tr', {}, [
                    h('th', {}, [
                      h('span', {
                        class: 'vxe-table-custom-popup--table-sort-help-title'
                      }, getI18n('vxe.custom.setting.colSort')),
                      h(resolveComponent('vxe-tooltip') as VxeTooltipComponent, {
                        enterable: true,
                        content: getI18n('vxe.custom.setting.sortHelpTip')
                      }, {
                        default: () => {
                          return h('i', {
                            class: 'vxe-table-custom-popup--table-sort-help-icon vxe-icon-question-circle-fill'
                          })
                        }
                      })
                    ]),
                    h('th', {}, getI18n('vxe.custom.setting.colTitle')),
                    h('th', {}, getI18n('vxe.custom.setting.colVisible')),
                    h('th', {}, getI18n('vxe.custom.setting.colFixed', [columnOpts.maxFixedSize || 0]))
                  ])
                ]),
                h(TransitionGroup, {
                  class: 'vxe-table-custom--body',
                  tag: 'tbody',
                  name: 'vxe-table-custom--list'
                }, {
                  default: () => trVNs
                })
              ])
            ]),
            h('div', {
              ref: dragHintElemRef,
              class: 'vxe-table-custom-popup--drag-hint'
            }, getI18n('vxe.custom.cstmDragTarget', [dragColumn.value ? dragColumn.value.getTitle() : '']))
          ])
        },
        footer: () => {
          return h('div', {
            class: 'vxe-table-custom-popup--footer'
          }, [
            h(resolveComponent('vxe-button') as VxeButtonComponent, {
              content: customOpts.resetButtonText || getI18n('vxe.custom.cstmRestore'),
              onClick: resetPopupCustomEvent
            }),
            h(resolveComponent('vxe-button') as VxeButtonComponent, {
              content: customOpts.resetButtonText || getI18n('vxe.custom.cstmCancel'),
              onClick: cancelCustomEvent
            }),
            h(resolveComponent('vxe-button') as VxeButtonComponent, {
              status: 'primary',
              content: customOpts.confirmButtonText || getI18n('vxe.custom.cstmConfirm'),
              onClick: confirmCustomEvent
            })
          ])
        }
      })
    }

    const renderVN = () => {
      const customOpts = computeCustomOpts.value
      if (customOpts.mode === 'popup') {
        return renderPopupPanel()
      }
      return renderSimplePanel()
    }

    return renderVN
  }
})

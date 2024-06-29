import { defineComponent, h, inject, ref, Ref, VNode, PropType, nextTick, TransitionGroup, createCommentVNode } from 'vue'
import { VxeUI } from '../../../ui'
import { formatText } from '../../../ui/src/utils'
import { addClass, removeClass } from '../../../ui/src/dom'
import { errLog } from '../../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeModalComponent, VxeButtonComponent, VxeRadioGroupComponent, VxeTooltipComponent, VxeInputComponent } from 'vxe-pc-ui'
import type { VxeTableDefines, VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeColumnPropTypes } from '../../../../types'

const { getI18n, getIcon } = VxeUI

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
    const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
    const VxeUIInputComponent = VxeUI.getComponent<VxeInputComponent>('VxeInput')
    const VxeUITooltipComponent = VxeUI.getComponent<VxeTooltipComponent>('VxeTooltip')
    const VxeUIRadioGroupComponent = VxeUI.getComponent<VxeRadioGroupComponent>('VxeRadioGroup')

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
          $xeTable.customCloseEvent(evnt)
        }
      }, 300)
    }

    const confirmCustomEvent = (evnt: Event) => {
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
      const { allowVisible, allowSort, allowFixed, allowResizable } = customOpts
      XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
        if (!parent) {
          if (allowSort) {
            const sortIndex = index + 1
            column.renderSortNumber = sortIndex
          }
          if (allowFixed) {
            column.fixed = column.renderFixed
          }
        }
        if (allowResizable) {
          if (column.renderVisible && (!column.children || column.children.length)) {
            if (column.renderResizeWidth !== column.renderWidth) {
              column.resizeWidth = column.renderResizeWidth
              column.renderWidth = column.renderResizeWidth
            }
          }
        }
        if (allowVisible) {
          column.visible = column.renderVisible
        }
      })
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('confirm', evnt)
      $xeTable.saveCustomStore('confirm')
    }

    const cancelCustomEvent = (evnt: Event) => {
      const { customStore } = props
      const { customColumnList } = reactData
      const { oldSortMaps, oldFixedMaps, oldVisibleMaps } = customStore
      const customOpts = computeCustomOpts.value
      const { allowVisible, allowSort, allowFixed, allowResizable } = customOpts
      XEUtils.eachTree(customColumnList, column => {
        const colid = column.getKey()
        const visible = !!oldVisibleMaps[colid]
        const fixed = oldFixedMaps[colid] || ''
        if (allowVisible) {
          column.renderVisible = visible
          column.visible = visible
        }
        if (allowFixed) {
          column.renderFixed = fixed
          column.fixed = fixed
        }
        if (allowSort) {
          column.renderSortNumber = oldSortMaps[colid] || 0
        }
        if (allowResizable) {
          column.renderResizeWidth = column.renderWidth
        }
      }, { children: 'children' })
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('cancel', evnt)
    }

    const handleResetCustomEvent = (evnt: Event) => {
      $xeTable.resetColumn(true)
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('reset', evnt)
    }

    const resetCustomEvent = (evnt: Event) => {
      if (VxeUI.modal) {
        VxeUI.modal.confirm({
          content: getI18n('vxe.custom.cstmConfirmRestore'),
          className: 'vxe-table--ignore-clear',
          escClosable: true
        }).then(type => {
          if (type === 'confirm') {
            handleResetCustomEvent(evnt)
          }
        })
      } else {
        handleResetCustomEvent(evnt)
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
      XEUtils.eachTree([column], (item) => {
        item.renderVisible = isChecked
        item.halfVisible = false
      })
      handleOptionCheck(column)
      if (customOpts.immediate) {
        $xeTable.handleCustom()
        $xeTable.saveCustomStore('update:visible')
      }
      $xeTable.checkCustomStatus()
    }

    const changeFixedOption = (column: VxeTableDefines.ColumnInfo, colFixed: VxeColumnPropTypes.Fixed) => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      if (column.renderFixed === colFixed) {
        column.renderFixed = ''
        // $xeTable.clearColumnFixed(column)
      } else {
        if (!isMaxFixedColumn || column.renderFixed) {
          column.renderFixed = colFixed
          // $xeTable.setColumnFixed(column, colFixed)
        }
      }
    }

    // const changePopupFixedOption = () => {
    //   const isMaxFixedColumn = computeIsMaxFixedColumn.value
    //   if (!isMaxFixedColumn) {
    //     // $xeTable.setColumnFixed(column, column.fixed)
    //   }
    // }

    const allCustomEvent = () => {
      const { customStore } = props
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
      const { checkMethod } = customOpts
      const isAll = !customStore.isAll
      XEUtils.eachTree(customColumnList, (column) => {
        if (!checkMethod || checkMethod({ column })) {
          column.renderVisible = isAll
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
          const isChecked = column.renderVisible
          const isIndeterminate = column.halfVisible
          const isColGroup = column.children && column.children.length
          const colTitle = formatText(column.getTitle(), 1)
          const isDisabled = checkMethod ? !checkMethod({ column }) : false
          colVNs.push(
            h('li', {
              key: column.id,
              colid: column.id,
              class: ['vxe-table-custom--option', `level--${column.level}`, {
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
                    class: 'vxe-table-custom--sort-btn',
                    title: getI18n('vxe.custom.setting.sortHelpTip'),
                    onMousedown: sortMousedownEvent,
                    onMouseup: sortMouseupEvent
                  }, [
                    h('i', {
                      class: getIcon().TABLE_CUSTOM_SORT
                    })
                  ])
                ])
                : createCommentVNode(),
              h('div', {
                class: 'vxe-table-custom--checkbox-label',
                title: colTitle
              }, colTitle),
              !parent && allowFixed
                ? h('div', {
                  class: 'vxe-table-custom--fixed-option'
                }, [
                  h('span', {
                    class: ['vxe-table-custom--fixed-left-option', column.renderFixed === 'left' ? getIcon().TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_LEFT, {
                      'is--checked': column.renderFixed === 'left',
                      'is--disabled': isMaxFixedColumn && !column.renderFixed
                    }],
                    title: getI18n(column.renderFixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft'),
                    onClick: () => {
                      changeFixedOption(column, 'left')
                    }
                  }),
                  h('span', {
                    class: ['vxe-table-custom--fixed-right-option', column.renderFixed === 'right' ? getIcon().TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_RIGHT, {
                      'is--checked': column.renderFixed === 'right',
                      'is--disabled': isMaxFixedColumn && !column.renderFixed
                    }],
                    title: getI18n(column.renderFixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight'),
                    onClick: () => {
                      changeFixedOption(column, 'right')
                    }
                  })
                ])
                : createCommentVNode()
            ])
          )
        }
      })
      const isAllChecked = customStore.isAll
      const isAllIndeterminate = customStore.isIndeterminate
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
            h('ul', {
              class: 'vxe-table-custom--header'
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
                    onClick: allCustomEvent
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
            ]),
            h('div', {
              ref: bodyElemRef,
              class: 'vxe-table-custom--list-wrapper'
            }, [
              h(TransitionGroup, {
                class: 'vxe-table-custom--body',
                name: 'vxe-table-custom--list',
                tag: 'ul',
                ...customWrapperOns
              }, {
                default: () => colVNs
              }),
              h('div', {
                ref: dragHintElemRef,
                class: 'vxe-table-custom-popup--drag-hint'
              }, getI18n('vxe.custom.cstmDragTarget', [dragColumn.value ? dragColumn.value.getTitle() : '']))
            ]),
            customOpts.showFooter
              ? h('div', {
                class: 'vxe-table-custom--footer'
              }, [
                h('button', {
                  class: 'btn--reset',
                  onClick: resetCustomEvent
                }, customOpts.resetButtonText || getI18n('vxe.table.customRestore')),
                customOpts.immediate
                  ? createCommentVNode()
                  : h('button', {
                    class: 'btn--cancel',
                    onClick: cancelCustomEvent
                  }, customOpts.resetButtonText || getI18n('vxe.table.customCancel')),
                h('button', {
                  class: 'btn--confirm',
                  onClick: confirmCustomEvent
                }, customOpts.confirmButtonText || getI18n('vxe.table.customConfirm'))
              ])
              : null
          ]
        : [])
    }

    const renderPopupPanel = () => {
      const { customStore } = props
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
      const { modalOptions, allowVisible, allowSort, allowFixed, allowResizable, checkMethod, visibleMethod } = customOpts
      const columnOpts = computeColumnOpts.value
      const modalOpts = Object.assign({}, modalOptions)
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const trVNs: VNode[] = []
      XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({ column }) : true
        if (isVisible) {
          const isChecked = column.renderVisible
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
                      class: 'vxe-table-custom-popup--column-sort-btn',
                      title: getI18n('vxe.custom.setting.sortHelpTip'),
                      onMousedown: sortMousedownEvent,
                      onMouseup: sortMouseupEvent
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
                h('div', {
                  class: 'vxe-table-custom-popup--name',
                  title: colTitle
                }, colTitle)
              ]),
              allowResizable
                ? h('td', {
                  class: 'vxe-table-custom-popup--column-item col--resizable'
                }, [
                  !isChecked || (column.children && column.children.length)
                    ? h('span', '-')
                    : (
                        VxeUIInputComponent
                          ? h(VxeUIInputComponent, {
                            type: 'integer',
                            min: 40,
                            modelValue: column.renderResizeWidth,
                            'onUpdate:modelValue' (value: any) {
                              column.renderResizeWidth = Math.max(40, Number(value))
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
                            options: [
                              { label: getI18n('vxe.custom.setting.fixedLeft'), value: 'left', disabled: isMaxFixedColumn },
                              { label: getI18n('vxe.custom.setting.fixedUnset'), value: '' },
                              { label: getI18n('vxe.custom.setting.fixedRight'), value: 'right', disabled: isMaxFixedColumn }
                            ],
                            'onUpdate:modelValue' (value: any) {
                              column.renderFixed = value
                            }
                          // onChange () {
                          //   changePopupFixedOption(column)
                          // }
                          })
                          : createCommentVNode()
                      )
                ])
                : createCommentVNode()
            ])
          )
        }
      })
      const isAllChecked = customStore.isAll
      const isAllIndeterminate = customStore.isIndeterminate
      return VxeUIModalComponent
        ? h(VxeUIModalComponent, {
          key: 'popup',
          className: ['vxe-table-custom-popup-wrapper', 'vxe-table--ignore-clear', modalOpts.className || ''].join(' '),
          modelValue: customStore.visible,
          title: modalOpts.title || getI18n('vxe.custom.cstmTitle'),
          width: modalOpts.width || '50vw',
          minWidth: modalOpts.minWidth || 700,
          height: modalOpts.height || '50vh',
          minHeight: modalOpts.minHeight || 400,
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
                    allowVisible
                      ? h('col', {
                        style: {
                          width: '80px'
                        }
                      })
                      : createCommentVNode(),
                    allowSort
                      ? h('col', {
                        style: {
                          width: '80px'
                        }
                      })
                      : createCommentVNode(),
                    h('col', {
                      style: {
                        minWidth: '120px'
                      }
                    }),
                    allowResizable
                      ? h('col', {
                        style: {
                          width: '140px'
                        }
                      })
                      : createCommentVNode(),
                    allowFixed
                      ? h('col', {
                        style: {
                          width: '200px'
                        }
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
                        : createCommentVNode(),
                      allowSort
                        ? h('th', {}, [
                          h('span', {
                            class: 'vxe-table-custom-popup--table-sort-help-title'
                          }, getI18n('vxe.custom.setting.colSort')),
                          VxeUITooltipComponent
                            ? h(VxeUITooltipComponent, {
                              enterable: true,
                              content: getI18n('vxe.custom.setting.sortHelpTip')
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
                        ? h('th', {}, getI18n('vxe.custom.setting.colFixed', [columnOpts.maxFixedSize || 0]))
                        : createCommentVNode()
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
        })
        : createCommentVNode()
    }

    const renderVN = () => {
      const customOpts = computeCustomOpts.value
      if (customOpts.mode === 'popup') {
        return renderPopupPanel()
      }
      return renderSimplePanel()
    }

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      nextTick(() => {
        if (!VxeUIModalComponent) {
          errLog('vxe.error.reqComp', ['vxe-modal'])
        }
        if (!VxeUIButtonComponent) {
          errLog('vxe.error.reqComp', ['vxe-button'])
        }
        if (!VxeUIInputComponent) {
          errLog('vxe.error.reqComp', ['vxe-input'])
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

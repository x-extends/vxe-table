import { CreateElement, VNode } from 'vue'
import { VxeUI } from '../../../ui'
import { formatText } from '../../../ui/src/utils'
import { addClass, removeClass } from '../../../ui/src/dom'
import { errLog } from '../../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeModalComponent, VxeDrawerComponent, VxeButtonComponent, VxeRadioGroupComponent, VxeTooltipComponent, VxeInputComponent } from 'vxe-pc-ui'

const { getI18n, getIcon, renderEmptyElement } = VxeUI

function updateDropHint (_vm: any, evnt: any) {
  const { $refs } = _vm
  const dragHintEl = $refs.dragHintElemRef
  const bodyEl = $refs.bodyElemRef
  if (!bodyEl) {
    return
  }
  if (dragHintEl) {
    const wrapperEl = bodyEl.parentNode
    const wrapperRect = wrapperEl.getBoundingClientRect()
    dragHintEl.style.display = 'block'
    dragHintEl.style.top = `${Math.min(wrapperEl.clientHeight - wrapperEl.scrollTop - dragHintEl.clientHeight, evnt.clientY - wrapperRect.y)}px`
    dragHintEl.style.left = `${Math.min(wrapperEl.clientWidth - wrapperEl.scrollLeft - dragHintEl.clientWidth - 16, evnt.clientX - wrapperRect.x)}px`
  }
}

const renderSimplePanel = (h: CreateElement, _vm: any) => {
  const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')

  const $xeTable = _vm.$xeTable
  const { _e, customStore, dragColumn } = _vm
  const { customColumnList, customOpts, isMaxFixedColumn } = $xeTable
  const { maxHeight } = customStore
  const { checkMethod, visibleMethod, allowVisible, allowSort, allowFixed, trigger, placement } = customOpts
  const slots = customOpts.slots || {}
  const headerSlot = slots.header
  const topSlot = slots.top
  const bottomSlot = slots.bottom
  const defaultSlot = slots.default
  const footerSlot = slots.footer
  const colVNs: any[] = []
  const customWrapperOns: any = {}
  // hover 触发
  if (trigger === 'hover') {
    customWrapperOns.mouseenter = _vm.handleWrapperMouseenterEvent
    customWrapperOns.mouseleave = _vm.handleWrapperMouseleaveEvent
  }
  const isAllChecked = customStore.isAll
  const isAllIndeterminate = customStore.isIndeterminate
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
          attrs: {
            colid: column.id
          },
          class: ['vxe-table-custom--option', `level--${column.level}`, {
            'is--hidden': isDisabled || isHidden,
            'is--group': isColGroup
          }],
          on: {
            dragstart: _vm.sortDragstartEvent,
            dragend: _vm.sortDragendEvent,
            dragover: _vm.sortDragoverEvent
          }
        }, [
          allowVisible
            ? h('div', {
              class: ['vxe-table-custom--checkbox-option', {
                'is--checked': isChecked,
                'is--indeterminate': isIndeterminate,
                'is--disabled': isDisabled
              }],
              attrs: {
                title: getI18n('vxe.custom.setting.colVisible')
              },
              on: {
                click: () => {
                  if (!isDisabled) {
                    _vm.changeCheckboxOption(column)
                  }
                }
              }
            }, [
              h('span', {
                class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
              })
            ])
            : _e(),
          allowSort && column.level === 1
            ? h('div', {
              class: 'vxe-table-custom--sort-option'
            }, [
              h('span', {
                class: ['vxe-table-custom--sort-btn', {
                  'is--disabled': isDisabled || isHidden
                }],
                attrs: {
                  title: getI18n('vxe.custom.setting.sortHelpTip')
                },
                on: isDisabled || isHidden
                  ? {}
                  : {
                      mousedown: _vm.sortMousedownEvent,
                      mouseup: _vm.sortMouseupEvent
                    }
              }, [
                h('i', {
                  class: getIcon().TABLE_CUSTOM_SORT
                })
              ])
            ])
            : _e(),
          column.type === 'html'
            ? h('div', {
              key: '1',
              class: 'vxe-table-custom--checkbox-label',
              domProps: {
                innerHTML: colTitle
              }
            })
            : h('div', {
              key: '0',
              class: 'vxe-table-custom--checkbox-label',
              attrs: {
                title: colTitle
              }
            }, colTitle),
          !parent && allowFixed
            ? h('div', {
              class: 'vxe-table-custom--fixed-option'
            }, [
              h(VxeUIButtonComponent, {
                props: {
                  mode: 'text',
                  icon: column.renderFixed === 'left' ? getIcon().TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_LEFT,
                  status: column.renderFixed === 'left' ? 'primary' : '',
                  disabled: isDisabled || isHidden || (isMaxFixedColumn && !column.renderFixed),
                  title: getI18n(column.renderFixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft')
                },
                on: {
                  click: () => {
                    _vm.changeFixedOption(column, 'left')
                  }
                }
              }),
              h(VxeUIButtonComponent, {
                props: {
                  mode: 'text',
                  icon: column.renderFixed === 'right' ? getIcon().TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_RIGHT,
                  status: column.renderFixed === 'right' ? 'primary' : '',
                  disabled: isDisabled || isHidden || (isMaxFixedColumn && !column.renderFixed),
                  title: getI18n(column.renderFixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight')
                },
                on: {
                  click: () => {
                    _vm.changeFixedOption(column, 'right')
                  }
                }
              })
            ])
            : _e()
        ])
      )
    }
  })
  return h('div', {
    key: 'simple',
    class: ['vxe-table-custom-wrapper', `placement--${placement}`, {
      'is--active': customStore.visible
    }],
    style: maxHeight && !['left', 'right'].includes(placement)
      ? {
          maxHeight: `${maxHeight}px`
        }
      : {}
  }, customStore.visible
    ? [
        h('div', {
          class: 'vxe-table-custom--header'
        }, headerSlot
          ? $xeTable.callSlot(headerSlot, params, h)
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
                      attrs: {
                        title: getI18n('vxe.table.allTitle')
                      },
                      on: {
                        click: _vm.allOptionEvent
                      }
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
          ref: 'bodyElemRef',
          class: 'vxe-table-custom--body'
        }, [
          topSlot
            ? h('div', {
              class: 'vxe-table-custom--panel-top'
            }, $xeTable.callSlot(topSlot, params, h))
            : renderEmptyElement($xeTable),
          defaultSlot
            ? h('div', {
              class: 'vxe-table-custom--panel-body'
            }, $xeTable.callSlot(defaultSlot, params, h))
            : h('transition-group', {
              class: 'vxe-table-custom--panel-list',
              props: {
                name: 'vxe-table-custom--list',
                tag: 'ul'
              },
              on: customWrapperOns
            }, colVNs),
          bottomSlot
            ? h('div', {
              class: 'vxe-table-custom--panel-bottom'
            }, $xeTable.callSlot(bottomSlot, params, h))
            : renderEmptyElement($xeTable),
          h('div', {
            ref: 'dragHintElemRef',
            class: 'vxe-table-custom-popup--drag-hint'
          }, getI18n('vxe.custom.cstmDragTarget', [dragColumn && dragColumn.type !== 'html' ? dragColumn.getTitle() : '']))
        ]),
        customOpts.showFooter
          ? h('div', {
            class: 'vxe-table-custom--footer'
          }, footerSlot
            ? $xeTable.callSlot(footerSlot, params, h)
            : [
                h('div', {
                  class: 'vxe-table-custom--footer-buttons'
                }, [
                  h(VxeUIButtonComponent, {
                    props: {
                      mode: 'text',
                      content: customOpts.resetButtonText || getI18n('vxe.table.customRestore')
                    },
                    on: {
                      click: _vm.resetCustomEvent
                    }
                  }),
                  customOpts.immediate
                    ? h(VxeUIButtonComponent, {
                      props: {
                        mode: 'text',
                        content: customOpts.closeButtonText || getI18n('vxe.table.customClose')
                      },
                      on: {
                        click: _vm.cancelCloseEvent
                      }
                    })
                    : h(VxeUIButtonComponent, {
                      props: {
                        mode: 'text',
                        content: customOpts.resetButtonText || getI18n('vxe.table.customCancel')
                      },
                      on: {
                        click: _vm.cancelCustomEvent
                      }
                    }),
                  customOpts.immediate
                    ? _e()
                    : h(VxeUIButtonComponent, {
                      props: {
                        mode: 'text',
                        status: 'primary',
                        content: customOpts.confirmButtonText || getI18n('vxe.table.customConfirm')
                      },
                      on: {
                        click: _vm.confirmCustomEvent
                      }
                    })
                ])
              ])
          : null
      ]
    : [])
}

const renderPopupPanel = (h: CreateElement, _vm: any) => {
  const VxeUIModalComponent = VxeUI.getComponent<VxeModalComponent>('VxeModal')
  const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
  const VxeUINumberInputComponent = VxeUI.getComponent<VxeInputComponent>('VxeInput')
  const VxeUITooltipComponent = VxeUI.getComponent<VxeTooltipComponent>('VxeTooltip')
  const $xeTableCustomPanel = _vm

  const $xeTable = _vm.$xeTable
  const { _e, customStore } = _vm
  const { resizable: allResizable, customOpts, customColumnList, columnOpts, isMaxFixedColumn } = $xeTable
  const { modalOptions, allowVisible, allowSort, allowFixed, allowResizable, checkMethod, visibleMethod } = customOpts
  const { maxFixedSize } = columnOpts
  const resizableOpts = $xeTable.computeResizableOpts
  const { minWidth: reMinWidth, maxWidth: reMaxWidth } = resizableOpts
  const modalOpts = Object.assign({}, modalOptions)
  const slots = customOpts.slots || {}
  const headerSlot = slots.header
  const topSlot = slots.top
  const bottomSlot = slots.bottom
  const defaultSlot = slots.default
  const footerSlot = slots.footer
  const trVNs: VNode[] = []
  const isAllChecked = customStore.isAll
  const isAllIndeterminate = customStore.isIndeterminate
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
          attrs: {
            colid: column.id
          },
          class: [`vxe-table-custom-popup--row level--${column.level}`, {
            'is--group': isColGroup
          }],
          on: {
            dragstart: _vm.sortDragstartEvent,
            dragend: _vm.sortDragendEvent,
            dragover: _vm.sortDragoverEvent
          }
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
                attrs: {
                  title: getI18n('vxe.custom.setting.colVisible')
                },
                on: {
                  click: () => {
                    if (!isDisabled) {
                      _vm.changeCheckboxOption(column)
                    }
                  }
                }
              }, [
                h('span', {
                  class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                })
              ])
            ])
            : _e(),
          allowSort
            ? h('td', {
              class: 'vxe-table-custom-popup--column-item col--sort'
            }, [
              column.level === 1
                ? h('span', {
                  class: ['vxe-table-custom-popup--column-sort-btn', {
                    'is--disabled': isDisabled || isHidden
                  }],
                  attrs: {
                    title: getI18n('vxe.custom.setting.sortHelpTip')
                  },
                  on: isDisabled || isHidden
                    ? {}
                    : {
                        mousedown: _vm.sortMousedownEvent,
                        mouseup: _vm.sortMouseupEvent
                      }
                }, [
                  h('i', {
                    class: getIcon().TABLE_CUSTOM_SORT
                  })
                ])
                : h('span', '-')
            ])
            : _e(),
          h('td', {
            class: 'vxe-table-custom-popup--column-item col--name'
          }, [
            column.type === 'html'
              ? h('div', {
                key: '1',
                class: 'vxe-table-custom-popup--name',
                domProps: {
                  innerHTML: colTitle
                }
              })
              : h('div', {
                key: '0',
                class: 'vxe-table-custom-popup--name',
                attrs: {
                  title: colTitle
                }
              }, colTitle)
          ]),
          allowResizable
            ? h('td', {
              class: 'vxe-table-custom-popup--column-item col--resizable'
            }, [
              (
                (column.children && column.children.length) ||
                !(XEUtils.isBoolean(column.resizable) ? column.resizable : (columnOpts.resizable || allResizable))
              )
                ? h('span', '-')
                : (VxeUINumberInputComponent
                    ? h(VxeUINumberInputComponent, {
                      props: {
                        type: 'integer',
                        disabled: isDisabled || isHidden,
                        value: column.renderResizeWidth,
                        min: customMinWidth || undefined,
                        max: customMaxWidth || undefined
                      },
                      on: {
                        modelValue (value: any) {
                          column.renderResizeWidth = Math.max(0, Number(value))
                        }
                      }
                    })
                    : renderEmptyElement($xeTableCustomPanel)
                  )
            ])
            : _e(),
          allowFixed
            ? h('td', {
              class: 'vxe-table-custom-popup--column-item col--fixed'
            }, [
              parent
                ? h('span', '-')
                : h('vxe-radio-group', {
                  props: {
                    value: column.renderFixed || '',
                    type: 'button',
                    size: 'mini',
                    disabled: isDisabled || isHidden,
                    options: [
                      { label: getI18n('vxe.custom.setting.fixedLeft'), value: 'left', disabled: isDisabled || isHidden || isMaxFixedColumn },
                      { label: getI18n('vxe.custom.setting.fixedUnset'), value: '', disabled: isDisabled || isHidden },
                      { label: getI18n('vxe.custom.setting.fixedRight'), value: 'right', disabled: isDisabled || isHidden || isMaxFixedColumn }
                    ]
                  },
                  on: {
                    input (value: any) {
                      column.renderFixed = value
                    }
                  }
                })
            ])
            : _e()
        ])
      )
    }
  })
  const scopedSlots: Record<string, any> = {
    default: () => {
      if (defaultSlot) {
        return $xeTable.callSlot(defaultSlot, params, h)
      }
      return h('div', {
        ref: 'bodyElemRef',
        class: 'vxe-table-custom-popup--body'
      }, [
        topSlot
          ? h('div', {
            class: 'vxe-table-custom-popup--table-top'
          }, $xeTable.callSlot(topSlot, params, h))
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
                : _e(),
              allowSort
                ? h('col', {
                  class: 'vxe-table-custom-popup--table-col-sort'
                })
                : _e(),
              h('col', {
                class: 'vxe-table-custom-popup--table-col-title'
              }),
              allowResizable
                ? h('col', {
                  class: 'vxe-table-custom-popup--table-col-width'
                })
                : _e(),
              allowFixed
                ? h('col', {
                  class: 'vxe-table-custom-popup--table-col-fixed'
                })
                : _e()
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
                      attrs: {
                        title: getI18n('vxe.table.allTitle')
                      },
                      on: {
                        click: _vm.allOptionEvent
                      }

                    }, [
                      h('span', {
                        class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                      }),
                      h('span', {
                        class: 'vxe-checkbox--label'
                      }, getI18n('vxe.toolbar.customAll'))
                    ])
                  ])
                  : _e(),
                allowSort
                  ? h('th', {}, [
                    h('span', {
                      class: 'vxe-table-custom-popup--table-sort-help-title'
                    }, getI18n('vxe.custom.setting.colSort')),
                    VxeUITooltipComponent
                      ? h(VxeUITooltipComponent, {
                        props: {
                          enterable: true,
                          content: getI18n('vxe.custom.setting.sortHelpTip'),
                          popupClassName: 'vxe-table--ignore-clear'
                        },
                        scopedSlots: {
                          default: () => {
                            return h('i', {
                              class: 'vxe-table-custom-popup--table-sort-help-icon vxe-icon-question-circle-fill'
                            })
                          }
                        }
                      })
                      : renderEmptyElement($xeTableCustomPanel)
                  ])
                  : _e(),
                h('th', {}, getI18n('vxe.custom.setting.colTitle')),
                allowResizable
                  ? h('th', {}, getI18n('vxe.custom.setting.colResizable'))
                  : _e(),
                allowFixed
                  ? h('th', {}, getI18n(`vxe.custom.setting.${maxFixedSize ? 'colFixedMax' : 'colFixed'}`, [maxFixedSize]))
                  : _e()
              ])
            ]),
            h('transition-group', {
              class: 'vxe-table-custom--panel-list',
              props: {
                tag: 'tbody',
                name: 'vxe-table-custom--list'
              }
            }, trVNs)
          ])
        ]),
        bottomSlot
          ? h('div', {
            class: 'vxe-table-custom-popup--table-bottom'
          }, $xeTable.callSlot(bottomSlot, params, h))
          : renderEmptyElement($xeTable),
        h('div', {
          ref: 'dragHintElemRef',
          class: 'vxe-table-custom-popup--drag-hint'
        }, getI18n('vxe.custom.cstmDragTarget', [_vm.dragColumn ? _vm.dragColumn.getTitle() : '']))
      ])
    },
    footer: () => {
      if (footerSlot) {
        return $xeTable.callSlot(footerSlot, params, h)
      }
      return h('div', {
        class: 'vxe-table-custom-popup--footer'
      }, [
        h(VxeUIButtonComponent, {
          props: {
            content: customOpts.resetButtonText || getI18n('vxe.custom.cstmRestore')
          },
          on: {
            click: _vm.resetCustomEvent
          }
        }),
        h(VxeUIButtonComponent, {
          props: {
            content: customOpts.resetButtonText || getI18n('vxe.custom.cstmCancel')
          },
          on: {
            click: _vm.cancelCustomEvent
          }
        }),
        h(VxeUIButtonComponent, {
          props: {
            status: 'primary',
            content: customOpts.confirmButtonText || getI18n('vxe.custom.cstmConfirm')
          },
          on: {
            click: _vm.confirmCustomEvent
          }
        })
      ])
    }
  }
  if (headerSlot) {
    scopedSlots.header = () => $xeTable.callSlot(headerSlot, params, h)
  }
  return VxeUIModalComponent
    ? h(VxeUIModalComponent, {
      key: 'modal',
      props: {
        className: ['vxe-table-custom-popup-wrapper', 'vxe-table--ignore-clear', modalOpts.className || ''].join(' '),
        value: customStore.visible,
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
        showFooter: true
      },
      on: {
        input (value: any) {
          customStore.visible = value
        }
      },
      scopedSlots
    })
    : renderEmptyElement($xeTableCustomPanel)
}

export default {
  name: 'VxeTableCustomPanel',
  props: {
    customStore: {
      type: Object,
      default: () => ({})
    }
  },
  inject: {
    $xeTable: {
      default: null
    },
    $xetable: {
      default: null
    }
  },
  data () {
    return {
      dragColumn: null
    }
  },
  computed: {
  },
  created (this: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      const VxeUIModalComponent = VxeUI.getComponent<VxeModalComponent>('VxeModal')
      const VxeUIDrawerComponent = VxeUI.getComponent<VxeDrawerComponent>('VxeDrawer')
      const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
      const VxeUINumberInputComponent = VxeUI.getComponent<VxeInputComponent>('VxeNumberInput')
      const VxeUITooltipComponent = VxeUI.getComponent<VxeTooltipComponent>('VxeTooltip')
      const VxeUIRadioGroupComponent = VxeUI.getComponent<VxeRadioGroupComponent>('VxeRadioGroup')

      this.$nextTick(() => {
        const { $xetable } = this
        const { customOpts } = $xetable
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
  },
  render (this: any, h: CreateElement) {
    const { $xetable } = this
    const { customOpts } = $xetable
    if (['modal', 'popup'].includes(`${customOpts.mode}`)) {
      return renderPopupPanel(h, this)
    }
    return renderSimplePanel(h, this)
  },
  methods: {
    handleWrapperMouseenterEvent (evnt: any) {
      const { $xetable, customStore } = this
      customStore.activeWrapper = true
      $xetable.customOpenEvent(evnt)
    },
    handleWrapperMouseleaveEvent  (evnt: any) {
      const { $xetable, customStore } = this
      customStore.activeWrapper = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          $xetable.customCloseEvent(evnt)
        }
      }, 300)
    },
    getStoreData () {
      return {}
    },
    confirmCustomEvent ({ $event }: any) {
      const $xeTable = this.$xeTable

      $xeTable.saveCustom()
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('confirm', $event)
    },
    cancelCloseEvent ({ $event }: any) {
      const $xeTable = this.$xeTable

      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('close', $event)
    },
    cancelCustomEvent ({ $event }: any) {
      const $xeTable = this.$xeTable

      $xeTable.cancelCustom()
      $xeTable.closeCustom()
      $xeTable.emitCustomEvent('cancel', $event)
    },
    handleResetCustomEvent (evnt: any) {
      const { $xetable } = this
      $xetable.resetCustom(true)
      $xetable.closeCustom()
      $xetable.emitCustomEvent('reset', evnt)
    },
    resetCustomEvent  (evnt: any) {
      if (VxeUI.modal) {
        VxeUI.modal.confirm({
          content: getI18n('vxe.custom.cstmConfirmRestore'),
          className: 'vxe-table--ignore-clear',
          escClosable: true
        }).then(type => {
          if (type === 'confirm') {
            this.handleResetCustomEvent(evnt)
          }
        })
      } else {
        this.handleResetCustomEvent(evnt)
      }
    },
    resetPopupCustomEvent  (evnt: any) {
      if (VxeUI.modal) {
        VxeUI.modal.confirm({
          content: getI18n('vxe.custom.cstmConfirmRestore'),
          className: 'vxe-table--ignore-clear',
          escClosable: true
        }).then(type => {
          if (type === 'confirm') {
            this.resetCustomEvent(evnt)
          }
        })
      } else {
        this.resetCustomEvent(evnt)
      }
    },
    handleOptionCheck (column: any) {
      const { $xetable } = this
      const { customColumnList } = $xetable
      const matchObj = XEUtils.findTree(customColumnList, item => item === column) as any
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every((column: any) => column.visible)
          parent.halfVisible = !parent.visible && parent.children.some((column: any) => column.visible || column.halfVisible)
          this.handleOptionCheck(parent)
        }
      }
    },
    changeCheckboxOption (column: any) {
      const { $xetable } = this
      const { customOpts } = $xetable
      const isChecked = !column.renderVisible
      if (customOpts.immediate) {
        XEUtils.eachTree([column], (item) => {
          item.visible = isChecked
          item.renderVisible = isChecked
          item.halfVisible = false
        })
        $xetable.handleCustom()
        $xetable.saveCustomStore('update:visible')
      } else {
        XEUtils.eachTree([column], (item) => {
          item.renderVisible = isChecked
          item.halfVisible = false
        })
      }
      this.handleOptionCheck(column)
      $xetable.checkCustomStatus()
    },
    changeFixedOption  (column: any, colFixed: any) {
      const { $xetable } = this
      const { isMaxFixedColumn, customOpts } = $xetable
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
        $xetable.handleCustom()
        $xetable.saveCustomStore('update:fixed')
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
    },
    allOptionEvent () {
      const { $xetable } = this

      $xetable.toggleCustomAllCheckbox()
    },
    sortMousedownEvent (evnt: MouseEvent) {
      const { $xetable } = this
      const btnEl = evnt.currentTarget as HTMLElement
      const tdEl = btnEl.parentNode as HTMLElement
      const trEl = tdEl.parentNode as HTMLElement
      const colid = trEl.getAttribute('colid')
      const column = $xetable.getColumnById(colid)
      trEl.draggable = true
      this.dragColumn = column
      addClass(trEl, 'active--drag-origin')
      updateDropHint(this, evnt)
    },
    sortMouseupEvent  (evnt: MouseEvent) {
      const btnEl = evnt.currentTarget as HTMLElement
      const tdEl = btnEl.parentNode as HTMLElement
      const trEl = tdEl.parentNode as HTMLElement
      const dragHintEl = this.$refs.dragHintElemRef
      trEl.draggable = false
      this.dragColumn = null
      removeClass(trEl, 'active--drag-origin')
      if (dragHintEl) {
        dragHintEl.style.display = ''
      }
    },
    sortDragstartEvent (evnt: any) {
      const img = new Image()
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage(img, 0, 0)
      }
    },
    sortDragendEvent (evnt: any) {
      const { $xetable, prevDropTrEl } = this
      const { customColumnList, customOpts } = $xetable
      const trEl = evnt.currentTarget
      const dragHintEl = this.$refs.dragHintElemRef
      if (prevDropTrEl) {
        // 判断是否有拖动
        if (prevDropTrEl !== trEl) {
          const dragOffset = prevDropTrEl.getAttribute('drag-pos')
          const colid = trEl.getAttribute('colid')
          const column = $xetable.getColumnById(colid)
          if (!column) {
            return
          }
          const cIndex = XEUtils.findIndexOf(customColumnList, item => item.id === column.id)
          const targetColid = prevDropTrEl.getAttribute('colid')
          const targetColumn = $xetable.getColumnById(targetColid)
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
      this.dragColumn = null
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
        $xetable.handleCustom()
        $xetable.saveCustomStore('update:sort')
      }
    },
    sortDragoverEvent  (evnt: any) {
      const { $xetable, prevDropTrEl } = this
      const trEl = evnt.currentTarget
      if (prevDropTrEl !== trEl) {
        removeClass(prevDropTrEl, 'active--drag-target')
      }
      const colid = trEl.getAttribute('colid')
      const column = $xetable.getColumnById(colid)
      // 是否移入有效元行
      if (column && column.level === 1) {
        evnt.preventDefault()
        const offsetY = evnt.clientY - trEl.getBoundingClientRect().y
        const dragOffset = offsetY < trEl.clientHeight / 2 ? 'top' : 'bottom'
        addClass(trEl, 'active--drag-target')
        trEl.setAttribute('drag-pos', dragOffset)
        this.prevDropTrEl = trEl
      }
      updateDropHint(this, evnt)
    }
  } as any
}

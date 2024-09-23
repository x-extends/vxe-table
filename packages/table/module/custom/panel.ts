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

  const { _e, $xetable, customStore, dragColumn } = _vm
  const { customColumnList, customOpts, isMaxFixedColumn } = $xetable
  const { maxHeight } = customStore
  const { checkMethod, visibleMethod, allowVisible, allowSort, allowFixed, trigger, placement } = customOpts
  const colVNs: any[] = []
  const customWrapperOns: any = {}
  // hover 触发
  if (trigger === 'hover') {
    customWrapperOns.mouseenter = _vm.handleWrapperMouseenterEvent
    customWrapperOns.mouseleave = _vm.handleWrapperMouseleaveEvent
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
            'is--hidden': isHidden,
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
                  'is--disabled': isHidden
                }],
                attrs: {
                  title: getI18n('vxe.custom.setting.sortHelpTip')
                },
                on: isHidden
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
                  disabled: isHidden || (isMaxFixedColumn && !column.renderFixed),
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
                  disabled: isHidden || (isMaxFixedColumn && !column.renderFixed),
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
  const isAllChecked = customStore.isAll
  const isAllIndeterminate = customStore.isIndeterminate
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
        ]),
        h('div', {
          ref: 'bodyElemRef',
          class: 'vxe-table-custom--list-wrapper'
        }, [
          h('transition-group', {
            class: 'vxe-table-custom--body',
            props: {
              name: 'vxe-table-custom--list',
              tag: 'ul'
            },
            on: customWrapperOns
          }, colVNs),
          h('div', {
            ref: 'dragHintElemRef',
            class: 'vxe-table-custom-popup--drag-hint'
          }, getI18n('vxe.custom.cstmDragTarget', [dragColumn && dragColumn.type !== 'html' ? dragColumn.getTitle() : '']))
        ]),
        customOpts.showFooter
          ? h('div', {
            class: 'vxe-table-custom--footer'
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
          : null
      ]
    : [])
}

const renderPopupPanel = (h: CreateElement, _vm: any) => {
  const VxeUIModalComponent = VxeUI.getComponent<VxeModalComponent>('VxeModal')
  const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
  const VxeUIInputComponent = VxeUI.getComponent<VxeInputComponent>('VxeInput')
  const VxeUITooltipComponent = VxeUI.getComponent<VxeTooltipComponent>('VxeTooltip')
  const $xeTableCustomPanel = _vm

  const { _e, $xetable, customStore } = _vm
  const { customOpts, customColumnList, columnOpts, isMaxFixedColumn } = $xetable
  const { modalOptions, allowVisible, allowSort, allowFixed, allowResizable, checkMethod, visibleMethod } = customOpts
  const { maxFixedSize } = columnOpts
  const modalOpts = Object.assign({}, modalOptions)
  const trVNs: VNode[] = []
  XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
    const isVisible = visibleMethod ? visibleMethod({ column }) : true
    if (isVisible) {
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
                    'is--disabled': isHidden
                  }],
                  attrs: {
                    title: getI18n('vxe.custom.setting.sortHelpTip')
                  },
                  on: isHidden
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
              column.children && column.children.length
                ? h('span', '-')
                : (VxeUIInputComponent
                    ? h(VxeUIInputComponent, {
                      props: {
                        type: 'integer',
                        disabled: isHidden,
                        value: column.renderResizeWidth
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
                    disabled: isHidden,
                    options: [
                      { label: getI18n('vxe.custom.setting.fixedLeft'), value: 'left', disabled: isHidden || isMaxFixedColumn },
                      { label: getI18n('vxe.custom.setting.fixedUnset'), value: '', disabled: isHidden },
                      { label: getI18n('vxe.custom.setting.fixedRight'), value: 'right', disabled: isHidden || isMaxFixedColumn }
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
  const isAllChecked = customStore.isAll
  const isAllIndeterminate = customStore.isIndeterminate
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
        showZoom: !!modalOpts.showZoom,
        mask: !!modalOpts.mask,
        lockView: !!modalOpts.lockView,
        resize: !!modalOpts.resize,
        escClosable: !!modalOpts.escClosable,
        destroyOnClose: true,
        showFooter: true
      },
      on: {
        input (value: any) {
          customStore.visible = value
        }
      },
      scopedSlots: {
        default: () => {
          return h('div', {
            ref: 'bodyElemRef',
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
                    : _e(),
                  allowSort
                    ? h('col', {
                      style: {
                        width: '80px'
                      }
                    })
                    : _e(),
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
                    : _e(),
                  allowFixed
                    ? h('col', {
                      style: {
                        width: '200px'
                      }
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
                  class: 'vxe-table-custom--body',
                  props: {
                    tag: 'tbody',
                    name: 'vxe-table-custom--list'
                  }
                }, trVNs)
              ])
            ]),
            h('div', {
              ref: 'dragHintElemRef',
              class: 'vxe-table-custom-popup--drag-hint'
            }, getI18n('vxe.custom.cstmDragTarget', [_vm.dragColumn ? _vm.dragColumn.getTitle() : '']))
          ])
        },
        footer: () => {
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
      const VxeUIInputComponent = VxeUI.getComponent<VxeInputComponent>('VxeInput')
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
          $xetable.customColseEvent(evnt)
        }
      }, 300)
    },
    getStoreData () {
      return {}
    },
    confirmCustomEvent  (evnt: any) {
      const { $xetable } = this
      const { customOpts, customColumnList } = $xetable
      const { allowVisible, allowSort, allowFixed, allowResizable } = customOpts
      XEUtils.eachTree(customColumnList, (column, index, items, path, parent) => {
        if (parent) {
          // 更新子列信息
          column.fixed = parent.fixed
        } else {
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
      $xetable.closeCustom()
      $xetable.emitCustomEvent('confirm', evnt)
      $xetable.saveCustomStore('confirm')
    },
    cancelCloseEvent ({ $event }: any) {
      const { $xetable } = this
      $xetable.closeCustom()
      $xetable.emitCustomEvent('cancel', $event)
    },
    cancelCustomEvent  (evnt: any) {
      const { $xetable } = this
      const { customStore, customOpts, customColumnList } = $xetable
      const { oldSortMaps, oldFixedMaps, oldVisibleMaps } = customStore
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
      $xetable.closeCustom()
      $xetable.emitCustomEvent('cancel', evnt)
    },
    handleResetCustomEvent (evnt: any) {
      const { $xetable } = this
      $xetable.resetColumn(true)
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
      const { $xetable, customStore } = this
      const { customColumnList, customOpts } = $xetable
      const { checkMethod } = customOpts
      const isAll = !customStore.isAll
      if (customOpts.immediate) {
        XEUtils.eachTree(customColumnList, (column) => {
          if (!checkMethod || checkMethod({ column })) {
            column.visible = isAll
            column.renderVisible = isAll
            column.halfVisible = false
          }
        })
        customStore.isAll = isAll
        $xetable.handleCustom()
        $xetable.saveCustomStore('update:visible')
      } else {
        XEUtils.eachTree(customColumnList, (column) => {
          if (!checkMethod || checkMethod({ column })) {
            column.renderVisible = isAll
            column.halfVisible = false
          }
        })
        customStore.isAll = isAll
      }
      $xetable.checkCustomStatus()
    },
    sortMousedownEvent (evnt: any) {
      const { $xetable } = this
      const btnEl = evnt.currentTarget
      const tdEl = btnEl.parentNode
      const trEl = tdEl.parentNode
      const colid = trEl.getAttribute('colid')
      const column = $xetable.getColumnById(colid)
      trEl.draggable = true
      this.dragColumn = column
      addClass(trEl, 'active--drag-origin')
    },
    sortMouseupEvent  (evnt: any) {
      const btnEl = evnt.currentTarget
      const tdEl = btnEl.parentNode
      const trEl = tdEl.parentNode
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

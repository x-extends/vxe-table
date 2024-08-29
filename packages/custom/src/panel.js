import VXETable from '../../v-x-e-table'
import UtilTools from '../../tools/utils'
import DomTools from '../../tools/dom'
import GlobalConfig from '../../v-x-e-table/src/conf'
import XEUtils from 'xe-utils'
import VxeButtonComponent from '../../button/src/button'

const { formatText } = UtilTools
const { addClass, removeClass } = DomTools

function updateDropHint (_vm, evnt) {
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

const renderSimplePanel = (h, _vm) => {
  const { _e, $xetable, customStore, dragColumn } = _vm
  const { customColumnList, customOpts, isMaxFixedColumn } = $xetable
  const { maxHeight } = customStore
  const { checkMethod, visibleMethod, allowVisible, allowSort, allowFixed, trigger, placement } = customOpts
  const colVNs = []
  const customWrapperOns = {}
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
          allowVisible ? h('div', {
            class: ['vxe-table-custom--checkbox-option', {
              'is--checked': isChecked,
              'is--indeterminate': isIndeterminate,
              'is--disabled': isDisabled
            }],
            attrs: {
              title: GlobalConfig.i18n('vxe.custom.setting.colVisible')
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
              class: ['vxe-checkbox--icon', isIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : (isChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED)]
            })
          ]) : _e(),
          allowSort && column.level === 1
            ? h('div', {
              class: 'vxe-table-custom--sort-option'
            }, [
              h('span', {
                class: ['vxe-table-custom--sort-btn', {
                  'is--disabled': isHidden
                }],
                attrs: {
                  title: GlobalConfig.i18n('vxe.custom.setting.sortHelpTip')
                },
                on: isHidden ? {} : {
                  mousedown: _vm.sortMousedownEvent,
                  mouseup: _vm.sortMouseupEvent
                }
              }, [
                h('i', {
                  class: GlobalConfig.icon.TABLE_CUSTOM_SORT
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
            }) : h('div', {
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
              h(VxeButtonComponent, {
                props: {
                  mode: 'text',
                  icon: column.renderFixed === 'left' ? GlobalConfig.icon.TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE : GlobalConfig.icon.TOOLBAR_TOOLS_FIXED_LEFT,
                  status: column.renderFixed === 'left' ? 'primary' : '',
                  disabled: isHidden || (isMaxFixedColumn && !column.renderFixed),
                  title: GlobalConfig.i18n(column.renderFixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft')
                },
                on: {
                  click: () => {
                    _vm.changeFixedOption(column, 'left')
                  }
                }
              }),
              h(VxeButtonComponent, {
                props: {
                  mode: 'text',
                  icon: column.renderFixed === 'right' ? GlobalConfig.icon.TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE : GlobalConfig.icon.TOOLBAR_TOOLS_FIXED_RIGHT,
                  status: column.renderFixed === 'right' ? 'primary' : '',
                  disabled: isHidden || (isMaxFixedColumn && !column.renderFixed),
                  title: GlobalConfig.i18n(column.renderFixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight')
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
                  title: GlobalConfig.i18n('vxe.table.allTitle')
                },
                on: {
                  click: _vm.allOptionEvent
                }
              }, [
                h('span', {
                  class: ['vxe-checkbox--icon', isAllIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED)]
                }),
                h('span', {
                  class: 'vxe-checkbox--label'
                }, GlobalConfig.i18n('vxe.toolbar.customAll'))
              ]) : h('span', {
                class: 'vxe-checkbox--label'
              }, GlobalConfig.i18n('vxe.table.customTitle'))
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
          }, GlobalConfig.i18n('vxe.custom.cstmDragTarget', [dragColumn && dragColumn.type !== 'html' ? dragColumn.getTitle() : '']))
        ]),
        customOpts.showFooter
          ? h('div', {
            class: 'vxe-table-custom--footer'
          }, [
            h(VxeButtonComponent, {
              props: {
                mode: 'text',
                content: customOpts.resetButtonText || GlobalConfig.i18n('vxe.table.customRestore')
              },
              on: {
                click: _vm.resetCustomEvent
              }
            }),
            customOpts.immediate
              ? h(VxeButtonComponent, {
                props: {
                  mode: 'text',
                  content: customOpts.closeButtonText || GlobalConfig.i18n('vxe.table.customClose')
                },
                on: {
                  click: _vm.cancelCloseEvent
                }
              })
              : h(VxeButtonComponent, {
                props: {
                  mode: 'text',
                  content: customOpts.resetButtonText || GlobalConfig.i18n('vxe.table.customCancel')
                },
                on: {
                  click: _vm.cancelCustomEvent
                }
              }),
            customOpts.immediate
              ? _e()
              : h(VxeButtonComponent, {
                props: {
                  mode: 'text',
                  status: 'primary',
                  content: customOpts.confirmButtonText || GlobalConfig.i18n('vxe.table.customConfirm')
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

const renderPopupPanel = (h, _vm) => {
  const { _e, $xetable, customStore } = _vm
  const { customOpts, customColumnList, columnOpts, isMaxFixedColumn } = $xetable
  const { modalOptions, allowVisible, allowSort, allowFixed, allowResizable, checkMethod, visibleMethod } = customOpts
  const { maxFixedSize } = columnOpts
  const modalOpts = Object.assign({}, modalOptions)
  const trVNs = []
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
          allowVisible ? h('td', {
            class: 'vxe-table-custom-popup--column-item col--visible'
          }, [
            h('div', {
              class: ['vxe-table-custom--checkbox-option', {
                'is--checked': isChecked,
                'is--indeterminate': isIndeterminate,
                'is--disabled': isDisabled
              }],
              attrs: {
                title: GlobalConfig.i18n('vxe.custom.setting.colVisible')
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
                class: ['vxe-checkbox--icon', isIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : (isChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED)]
              })
            ])
          ]) : _e(),
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
                    title: GlobalConfig.i18n('vxe.custom.setting.sortHelpTip')
                  },
                  on: isHidden ? {} : {
                    mousedown: _vm.sortMousedownEvent,
                    mouseup: _vm.sortMouseupEvent
                  }
                }, [
                  h('i', {
                    class: GlobalConfig.icon.TABLE_CUSTOM_SORT
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
              }) : h('div', {
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
                : h('vxe-input', {
                  props: {
                    type: 'integer',
                    disabled: isHidden,
                    value: column.renderResizeWidth
                  },
                  on: {
                    modelValue (value) {
                      column.renderResizeWidth = Math.max(0, Number(value))
                    }
                  }
                })
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
                      { label: GlobalConfig.i18n('vxe.custom.setting.fixedLeft'), value: 'left', disabled: isHidden || isMaxFixedColumn },
                      { label: GlobalConfig.i18n('vxe.custom.setting.fixedUnset'), value: '', disabled: isHidden },
                      { label: GlobalConfig.i18n('vxe.custom.setting.fixedRight'), value: 'right', disabled: isHidden || isMaxFixedColumn }
                    ]
                  },
                  on: {
                    input (value) {
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
  return h('vxe-modal', {
    key: 'modal',
    props: {
      className: ['vxe-table-custom-popup-wrapper', 'vxe-table--ignore-clear', modalOpts.className || ''].join(' '),
      value: customStore.visible,
      title: modalOpts.title || GlobalConfig.i18n('vxe.custom.cstmTitle'),
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
      input (value) {
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
                allowVisible ? h('col', {
                  style: {
                    width: '80px'
                  }
                }) : _e(),
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
                  allowVisible ? h('th', {}, [
                    h('div', {
                      class: ['vxe-table-custom--checkbox-option', {
                        'is--checked': isAllChecked,
                        'is--indeterminate': isAllIndeterminate
                      }],
                      attrs: {
                        title: GlobalConfig.i18n('vxe.table.allTitle')
                      },
                      on: {
                        click: _vm.allOptionEvent
                      }

                    }, [
                      h('span', {
                        class: ['vxe-checkbox--icon', isAllIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED)]
                      }),
                      h('span', {
                        class: 'vxe-checkbox--label'
                      }, GlobalConfig.i18n('vxe.toolbar.customAll'))
                    ])
                  ]) : _e(),
                  allowSort
                    ? h('th', {}, [
                      h('span', {
                        class: 'vxe-table-custom-popup--table-sort-help-title'
                      }, GlobalConfig.i18n('vxe.custom.setting.colSort')),
                      h('vxe-tooltip', {
                        props: {
                          enterable: true,
                          content: GlobalConfig.i18n('vxe.custom.setting.sortHelpTip'),
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
                    ])
                    : _e(),
                  h('th', {}, GlobalConfig.i18n('vxe.custom.setting.colTitle')),
                  allowResizable
                    ? h('th', {}, GlobalConfig.i18n('vxe.custom.setting.colResizable'))
                    : _e(),
                  allowFixed
                    ? h('th', {}, GlobalConfig.i18n(`vxe.custom.setting.${maxFixedSize ? 'colFixedMax' : 'colFixed'}`, [maxFixedSize]))
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
          }, GlobalConfig.i18n('vxe.custom.cstmDragTarget', [_vm.dragColumn ? _vm.dragColumn.getTitle() : '']))
        ])
      },
      footer: () => {
        return h('div', {
          class: 'vxe-table-custom-popup--footer'
        }, [
          h(VxeButtonComponent, {
            props: {
              content: customOpts.resetButtonText || GlobalConfig.i18n('vxe.custom.cstmRestore')
            },
            on: {
              click: _vm.resetCustomEvent
            }
          }),
          h(VxeButtonComponent, {
            props: {
              content: customOpts.resetButtonText || GlobalConfig.i18n('vxe.custom.cstmCancel')
            },
            on: {
              click: _vm.cancelCustomEvent
            }
          }),
          h(VxeButtonComponent, {
            props: {
              status: 'primary',
              content: customOpts.confirmButtonText || GlobalConfig.i18n('vxe.custom.cstmConfirm')
            },
            on: {
              click: _vm.confirmCustomEvent
            }
          })
        ])
      }
    }
  })
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
  render (h) {
    const { $xetable } = this
    const { customOpts } = $xetable
    if (['modal', 'popup'].includes(`${customOpts.mode}`)) {
      return renderPopupPanel(h, this)
    }
    return renderSimplePanel(h, this)
  },
  methods: {
    handleWrapperMouseenterEvent (evnt) {
      const { $xetable, customStore } = this
      customStore.activeWrapper = true
      $xetable.customOpenEvent(evnt)
    },
    handleWrapperMouseleaveEvent  (evnt) {
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
    confirmCustomEvent  (evnt) {
      const { $xetable } = this
      const { customOpts, customColumnList } = $xetable
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
      $xetable.closeCustom()
      $xetable.emitCustomEvent('confirm', evnt)
      $xetable.saveCustomStore('confirm')
    },
    cancelCloseEvent ({ $event }) {
      const { $xetable } = this
      $xetable.closeCustom()
      $xetable.emitCustomEvent('cancel', $event)
    },
    cancelCustomEvent  (evnt) {
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
    handleResetCustomEvent (evnt) {
      const { $xetable } = this
      $xetable.resetColumn(true)
      $xetable.closeCustom()
      $xetable.emitCustomEvent('reset', evnt)
    },
    resetCustomEvent  (evnt) {
      if (VXETable.modal) {
        VXETable.modal.confirm({
          content: GlobalConfig.i18n('vxe.custom.cstmConfirmRestore'),
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
    resetPopupCustomEvent  (evnt) {
      if (VXETable.modal) {
        VXETable.modal.confirm({
          content: GlobalConfig.i18n('vxe.custom.cstmConfirmRestore'),
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
    handleOptionCheck (column) {
      const { $xetable } = this
      const { customColumnList } = $xetable
      const matchObj = XEUtils.findTree(customColumnList, item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every((column) => column.visible)
          parent.halfVisible = !parent.visible && parent.children.some((column) => column.visible || column.halfVisible)
          this.handleOptionCheck(parent)
        }
      }
    },
    changeCheckboxOption (column) {
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
    changeFixedOption  (column, colFixed) {
      const { $xetable } = this
      const { isMaxFixedColumn, customOpts } = $xetable
      if (customOpts.immediate) {
        if (column.renderFixed === colFixed) {
          column.fixed = ''
          column.renderFixed = ''
        } else {
          if (!isMaxFixedColumn || column.renderFixed) {
            column.fixed = colFixed
            column.renderFixed = colFixed
          }
        }
        $xetable.handleCustom()
        $xetable.saveCustomStore('update:fixed')
      } else {
        if (column.renderFixed === colFixed) {
          column.renderFixed = ''
        } else {
          if (!isMaxFixedColumn || column.renderFixed) {
            column.renderFixed = colFixed
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
    sortMousedownEvent (evnt) {
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
    sortMouseupEvent  (evnt) {
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
    sortDragstartEvent (evnt) {
      const img = new Image()
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage(img, 0, 0)
      }
    },
    sortDragendEvent (evnt) {
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
    sortDragoverEvent  (evnt) {
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
  }
}

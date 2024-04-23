import UtilTools from '../../tools/utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import XEUtils from 'xe-utils'

function renderSimplePanel (h, _vm) {
  const { $xetable, customStore } = _vm
  const { customOpts, collectColumn, isMaxFixedColumn } = $xetable
  const { maxHeight } = customStore
  const { checkMethod, visibleMethod, trigger } = customOpts
  const colVNs = []
  const customWrapperOns = {}
  // hover 触发
  if (trigger === 'hover') {
    customWrapperOns.onMouseenter = _vm.handleWrapperMouseenterEvent
    customWrapperOns.onMouseleave = _vm.handleWrapperMouseleaveEvent
  }
  XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
    const isVisible = visibleMethod ? visibleMethod({ column }) : true
    if (isVisible) {
      const isChecked = column.visible
      const isIndeterminate = column.halfVisible
      const colTitle = UtilTools.formatText(column.getTitle(), 1)
      const isColGroup = column.children && column.children.length
      const isDisabled = checkMethod ? !checkMethod({ column }) : false
      colVNs.push(
        h('li', {
          key: column.id,
          class: ['vxe-table-custom--option', `level--${column.level}`, {
            'is--group': isColGroup
          }]
        }, [
          h('div', {
            class: ['vxe-table-custom--checkbox-option', {
              'is--checked': isChecked,
              'is--indeterminate': isIndeterminate,
              'is--disabled': isDisabled
            }],
            attrs: {
              title: colTitle
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
            }),
            h('span', {
              class: 'vxe-checkbox--label'
            }, colTitle)
          ]),
          !parent && customOpts.allowFixed ? h('div', {
            class: 'vxe-table-custom--fixed-option'
          }, [
            h('span', {
              class: ['vxe-table-custom--fixed-left-option', column.fixed === 'left' ? GlobalConfig.icon.TOOLBAR_TOOLS_FIXED_LEFT_ACTIVED : GlobalConfig.icon.TOOLBAR_TOOLS_FIXED_LEFT, {
                'is--checked': column.fixed === 'left',
                'is--disabled': isMaxFixedColumn && !column.fixed
              }],
              attrs: {
                title: GlobalConfig.i18n(column.fixed === 'left' ? 'vxe.toolbar.cancelfixed' : 'vxe.toolbar.fixedLeft')
              },
              on: {
                click: () => {
                  _vm.changeFixedOption(column, 'left')
                }
              }
            }),
            h('span', {
              class: ['vxe-table-custom--fixed-right-option', column.fixed === 'right' ? GlobalConfig.icon.TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVED : GlobalConfig.icon.TOOLBAR_TOOLS_FIXED_RIGHT, {
                'is--checked': column.fixed === 'right',
                'is--disabled': isMaxFixedColumn && !column.fixed
              }],
              attrs: {
                title: GlobalConfig.i18n(column.fixed === 'right' ? 'vxe.toolbar.cancelfixed' : 'vxe.toolbar.fixedRight')
              },
              on: {
                click: () => {
                  _vm.changeFixedOption(column, 'right')
                }
              }
            })
          ]) : null
        ])
      )
    }
  })
  const isAllChecked = customStore.isAll
  const isAllIndeterminate = customStore.isIndeterminate
  return h('div', {
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
          attrs: {
            title: GlobalConfig.i18n('vxe.table.allTitle')
          },
          on: {
            click: _vm.allCustomEvent
          }
        }, [
          h('span', {
            class: ['vxe-checkbox--icon', isAllIndeterminate ? GlobalConfig.icon.TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? GlobalConfig.icon.TABLE_CHECKBOX_CHECKED : GlobalConfig.icon.TABLE_CHECKBOX_UNCHECKED)]
          }),
          h('span', {
            class: 'vxe-checkbox--label'
          }, GlobalConfig.i18n('vxe.toolbar.customAll'))
        ])
      ])
    ]),
    h('ul', {
      class: 'vxe-table-custom--body',
      style: maxHeight ? {
        maxHeight: `${maxHeight}px`
      } : {},
      ...customWrapperOns
    }, colVNs),
    customOpts.showFooter ? h('div', {
      class: 'vxe-table-custom--footer'
    }, [
      h('button', {
        class: 'btn--reset',
        on: {
          click: _vm.resetCustomEvent
        }
      }, customOpts.resetButtonText || GlobalConfig.i18n('vxe.toolbar.customRestore')),
      h('button', {
        class: 'btn--confirm',
        on: {
          click: _vm.confirmCustomEvent
        }
      }, customOpts.confirmButtonText || GlobalConfig.i18n('vxe.toolbar.customConfirm'))
    ]) : null
  ])
}

const renderPopupPanel = (h, _vm) => {
  const { $xetable, customStore } = _vm
  const { customOpts, collectColumn, isMaxFixedColumn } = $xetable
  const { checkMethod, visibleMethod } = customOpts
  const trVNs = []
  XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
    const isVisible = visibleMethod ? visibleMethod({ column }) : true
    if (isVisible) {
      const isChecked = column.visible
      const isIndeterminate = column.halfVisible
      const colTitle = UtilTools.formatText(column.getTitle(), 1)
      const isColGroup = column.children && column.children.length
      const isDisabled = checkMethod ? !checkMethod({ column }) : false
      trVNs.push(
        h('tr', {
          key: column.id,
          class: [`vxe-table-custom-popup--row-level${column.level}`, {
            'is--group': isColGroup
          }]
        }, [
          h('td', {
            class: 'vxe-table-custom-popup--column-name'
          }, [
            h('div', {
              class: 'vxe-table-custom-popup--name',
              attrs: {
                title: colTitle
              }
            }, colTitle)
          ]),
          h('td', {
            class: 'vxe-table-custom-popup--column-visiblw'
          }, [
            h('div', {
              class: ['vxe-table-custom--checkbox-option', {
                'is--checked': isChecked,
                'is--indeterminate': isIndeterminate,
                'is--disabled': isDisabled
              }],
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
          ]),
          h('td', {
            class: 'vxe-table-custom-popup--column-fixed'
          }, [
            !parent && customOpts.allowFixed ? h('vxe-radio-group', {
              props: {
                value: column.fixed || '',
                disabled: isMaxFixedColumn,
                type: 'button',
                size: 'mini',
                options: [
                  { label: '左侧', value: 'left' },
                  { label: '不固定', value: '' },
                  { label: '右侧', value: 'right' }
                ]
              },
              on: {
                input (value) {
                  column.fixed = value
                },
                change () {
                  _vm.changePopupFixedOption(column)
                }
              }
            }) : null
          ])
        ])
      )
    }
  })
  return h('vxe-modal', {
    key: 'popup',
    props: {
      className: 'vxe-table-custom-popup-warpper vxe-table--ignore-clear',
      value: customStore.visible,
      title: GlobalConfig.i18n('vxe.custom.cstmTitle'),
      width: 700,
      maxHeight: 500,
      mask: true,
      lockView: true,
      showFooter: true,
      escClosable: true
    },
    on: {
      input (value) {
        customStore.visible = value
      }
    },
    scopedSlots: {
      default: () => {
        return h('div', {
          class: 'vxe-table-custom-popup--body'
        }, [
          h('table', {
          }, [
            h('colgroup', {}, [
              h('col'),
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
                h('th', {}, '标题'),
                h('th', {}, '是否显示'),
                h('th', {}, '是否固定')
              ])
            ]),
            h('tbody', {}, trVNs)
          ])
        ])
      },
      footer: () => {
        return h('div', {
          class: 'vxe-table-custom-popup--footer'
        }, [
          h('vxe-button', {
            props: {
              content: customOpts.resetButtonText || GlobalConfig.i18n('vxe.custom.cstmRestore')
            },
            on: {
              click: _vm.resetPopupCustomEvent
            }
          }),
          h('vxe-button', {
            props: {
              content: customOpts.resetButtonText || GlobalConfig.i18n('vxe.custom.cstmCancel')
            },
            on: {
              click: _vm.cancelCustomEvent
            }
          }),
          h('vxe-button', {
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
  computed: {
  },
  render (h) {
    const { $xetable } = this
    const { customOpts } = $xetable
    if (customOpts.mode === 'popup') {
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
    confirmCustomEvent  (evnt) {
      const { $xetable } = this
      $xetable.closeCustom()
      $xetable.emitCustomEvent('confirm', evnt)
    },
    cancelCustomEvent  (evnt) {
      const { $xetable } = this
      $xetable.closeCustom()
      $xetable.emitCustomEvent('cancel', evnt)
    },
    resetCustomEvent  (evnt) {
      const { $xetable } = this
      $xetable.resetColumn(true)
      $xetable.closeCustom()
      $xetable.emitCustomEvent('reset', evnt)
    },
    resetPopupCustomEvent  (evnt) {
      this.resetCustomEvent(evnt)
    },
    handleOptionCheck (column) {
      const { $xetable } = this
      const { collectColumn } = $xetable
      const matchObj = XEUtils.findTree(collectColumn, item => item === column)
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
      const isChecked = !column.visible
      XEUtils.eachTree([column], (item) => {
        item.visible = isChecked
        item.halfVisible = false
      })
      this.handleOptionCheck(column)
      if (customOpts.immediate) {
        $xetable.handleCustom()
      }
      $xetable.checkCustomStatus()
    },
    changeFixedOption  (column, colFixed) {
      const { $xetable } = this
      const { isMaxFixedColumn } = $xetable
      if (column.fixed === colFixed) {
        $xetable.clearColumnFixed(column)
      } else {
        if (!isMaxFixedColumn || column.fixed) {
          $xetable.setColumnFixed(column, colFixed)
        }
      }
    },
    changePopupFixedOption  (column) {
      const { $xetable } = this
      const { isMaxFixedColumn } = $xetable
      if (!isMaxFixedColumn) {
        $xetable.setColumnFixed(column, column.fixed)
      }
    },
    allCustomEvent () {
      const { $xetable, customStore, collectColumn, customOpts } = this
      const { checkMethod } = customOpts
      const isAll = !customStore.isAll
      XEUtils.eachTree(collectColumn, (column) => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = isAll
          column.halfVisible = false
        }
      })
      customStore.isAll = isAll
      $xetable.checkCustomStatus()
    }
  }
}

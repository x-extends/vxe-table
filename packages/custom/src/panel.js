import UtilTools from '../../tools/utils'
import DomTools from '../../tools/dom'
import GlobalConfig from '../../v-x-e-table/src/conf'
import XEUtils from 'xe-utils'

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
    const warpperEl = bodyEl.parentNode
    const warpperRect = warpperEl.getBoundingClientRect()
    dragHintEl.style.display = 'block'
    dragHintEl.style.top = `${Math.min(warpperEl.clientHeight - warpperEl.scrollTop - dragHintEl.clientHeight, evnt.clientY - warpperRect.y)}px`
    dragHintEl.style.left = `${Math.min(warpperEl.clientWidth - warpperEl.scrollLeft - dragHintEl.clientWidth - 16, evnt.clientX - warpperRect.x)}px`
  }
}

function renderSimplePanel (h, _vm) {
  const { $xetable, customStore } = _vm
  const { customOpts, customColumnList, isMaxFixedColumn } = $xetable
  const { maxHeight } = customStore
  const { checkMethod, visibleMethod, trigger } = customOpts
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
      on: customWrapperOns
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

function renderPopupPanel (h, _vm) {
  const { $xetable, customStore } = _vm
  const { customOpts, customColumnList, isMaxFixedColumn } = $xetable
  const { checkMethod, visibleMethod } = customOpts
  const trVNs = []
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
          class: [`vxe-table-custom-popup--row level--${column.level}`, {
            'is--group': isColGroup
          }],
          attrs: {
            colid: column.id
          },
          on: {
            dragstart: _vm.sortDragstartEvent,
            dragend: _vm.sortDragendEvent,
            dragover: _vm.sortDragoverEvent
          }
        }, [
          h('td', {
            class: 'vxe-table-custom-popup--column-item col--sort'
          }, [
            column.level === 1 ? h('span', {
              class: 'vxe-table-custom-popup--column-sort-btn',
              on: {
                mousedown: _vm.sortMousedownEvent,
                mouseup: _vm.sortMouseupEvent
              }
            }, [
              h('i', {
                class: 'vxe-icon-sort'
              })
            ]) : null
          ]),
          h('td', {
            class: 'vxe-table-custom-popup--column-item col--name'
          }, [
            h('div', {
              class: 'vxe-table-custom-popup--name',
              attrs: {
                title: colTitle
              }
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
            class: 'vxe-table-custom-popup--column-item col--fixed'
          }, [
            !parent && customOpts.allowFixed ? h('vxe-radio-group', {
              props: {
                value: column.fixed || '',
                type: 'button',
                size: 'mini',
                options: [
                  { label: GlobalConfig.i18n('vxe.custom.setting.fixedLeft'), value: 'left', disabled: isMaxFixedColumn },
                  { label: GlobalConfig.i18n('vxe.custom.setting.fixedUnset'), value: '' },
                  { label: GlobalConfig.i18n('vxe.custom.setting.fixedRight'), value: 'right', disabled: isMaxFixedColumn }
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
      value: customStore.visible,
      title: GlobalConfig.i18n('vxe.custom.cstmTitle'),
      className: 'vxe-table-custom-popup-wrapper vxe-table--ignore-clear',
      width: '40vw',
      minWidth: 500,
      height: '50vh',
      minHeight: 300,
      mask: true,
      lockView: true,
      showFooter: true,
      resize: true,
      escClosable: true,
      destroyOnClose: true
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
                h('col', {
                  style: {
                    width: '60px'
                  }
                }),
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
                  h('th', {}, GlobalConfig.i18n('vxe.custom.setting.colSort')),
                  h('th', {}, GlobalConfig.i18n('vxe.custom.setting.colTitle')),
                  h('th', {}, GlobalConfig.i18n('vxe.custom.setting.colVisible')),
                  h('th', {}, GlobalConfig.i18n('vxe.custom.setting.colFixed'))
                ])
              ]),
              h('transition-group', {
                class: 'vxe-table-custom--body',
                props: {
                  tag: 'tbody',
                  name: 'vxe-table-custom--flip'
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
      const { $xetable, customStore } = this
      const { customOpts, customColumnList } = $xetable
      const { checkMethod } = customOpts
      const isAll = !customStore.isAll
      XEUtils.eachTree(customColumnList, (column) => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = isAll
          column.halfVisible = false
        }
      })
      customStore.isAll = isAll
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
      const { customColumnList } = $xetable
      const trEl = evnt.currentTarget
      const dragHintEl = this.$refs.dragHintElemRef
      if (prevDropTrEl) {
        // 判断是否有拖动
        if (prevDropTrEl !== trEl) {
          const dragOffset = prevDropTrEl.getAttribute('dragoffset')
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
        prevDropTrEl.removeAttribute('dragoffset')
        removeClass(prevDropTrEl, 'active--drag-target')
      }
      this.dragColumn = null
      trEl.draggable = false
      trEl.removeAttribute('dragoffset')
      if (dragHintEl) {
        dragHintEl.style.display = ''
      }
      removeClass(trEl, 'active--drag-target')
      removeClass(trEl, 'active--drag-origin')
      // 更新顺序
      customColumnList.forEach((column, index) => {
        column.renderSortNumber = index
      })
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
        trEl.setAttribute('dragoffset', dragOffset)
        this.prevDropTrEl = trEl
      }
      updateDropHint(this, evnt)
    }
  }
}

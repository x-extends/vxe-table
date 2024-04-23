import { defineComponent, h, inject, ref, Ref, VNode, PropType, ComponentOptions } from 'vue'
import { formatText } from '../../tools/utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VxeModalComponent from '../../modal/src/modal'
import VxeButtonComponent from '../../button/src/button'
import VxeRadioGroupComponent from '../../radio/src/group'
import XEUtils from 'xe-utils'

import { VxeTableDefines, VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods, VxeTableCustomStoreObj, VxeColumnPropTypes } from '../../../types/all'

export default defineComponent({
  name: 'VxeTableCustomPanel',
  props: {
    customStore: {
      type: Object as PropType<VxeTableCustomStoreObj>,
      default: () => ({})
    }
  },
  setup (props) {
    const $xetable = inject('$xetable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)

    const { internalData } = $xetable
    const { computeCustomOpts, computeIsMaxFixedColumn } = $xetable.getComputeMaps()

    const refElem = ref() as Ref<HTMLDivElement>

    const handleWrapperMouseenterEvent = (evnt: Event) => {
      const { customStore } = props
      customStore.activeWrapper = true
      $xetable.customOpenEvent(evnt)
    }

    const handleWrapperMouseleaveEvent = (evnt: Event) => {
      const { customStore } = props
      customStore.activeWrapper = false
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          $xetable.customColseEvent(evnt)
        }
      }, 300)
    }

    const confirmCustomEvent = (evnt: Event) => {
      $xetable.closeCustom()
      $xetable.emitCustomEvent('confirm', evnt)
    }

    const cancelCustomEvent = (evnt: Event) => {
      $xetable.closeCustom()
      $xetable.emitCustomEvent('cancel', evnt)
    }

    const resetCustomEvent = (evnt: Event) => {
      $xetable.resetColumn(true)
      $xetable.closeCustom()
      $xetable.emitCustomEvent('reset', evnt)
    }

    const resetPopupCustomEvent = (evnt: Event) => {
      resetCustomEvent(evnt)
    }

    const handleOptionCheck = (column: VxeTableDefines.ColumnInfo) => {
      const { collectColumn } = internalData
      const matchObj = XEUtils.findTree(collectColumn, item => item === column)
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
        $xetable.handleCustom()
      }
      $xetable.checkCustomStatus()
    }

    const changeFixedOption = (column: VxeTableDefines.ColumnInfo, colFixed: VxeColumnPropTypes.Fixed) => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      if (column.fixed === colFixed) {
        $xetable.clearColumnFixed(column)
      } else {
        if (!isMaxFixedColumn || column.fixed) {
          $xetable.setColumnFixed(column, colFixed)
        }
      }
    }

    const changePopupFixedOption = (column: VxeTableDefines.ColumnInfo) => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      if (!isMaxFixedColumn) {
        $xetable.setColumnFixed(column, column.fixed)
      }
    }

    const allCustomEvent = () => {
      const { customStore } = props
      const { collectColumn } = internalData
      const customOpts = computeCustomOpts.value
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

    const renderSimplePanel = () => {
      const { customStore } = props
      const { collectColumn } = internalData
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
      XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
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
                  title: GlobalConfig.i18n(column.fixed === 'left' ? 'vxe.toolbar.cancelfixed' : 'vxe.toolbar.fixedLeft'),
                  onClick: () => {
                    changeFixedOption(column, 'left')
                  }
                }),
                h('span', {
                  class: ['vxe-table-custom--fixed-right-option', column.fixed === 'right' ? GlobalConfig.icon.TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVED : GlobalConfig.icon.TOOLBAR_TOOLS_FIXED_RIGHT, {
                    'is--checked': column.fixed === 'right',
                    'is--disabled': isMaxFixedColumn && !column.fixed
                  }],
                  title: GlobalConfig.i18n(column.fixed === 'right' ? 'vxe.toolbar.cancelfixed' : 'vxe.toolbar.fixedRight'),
                  onClick: () => {
                    changeFixedOption(column, 'right')
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
              title: GlobalConfig.i18n('vxe.table.allTitle'),
              onClick: allCustomEvent
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
            onClick: resetCustomEvent
          }, customOpts.resetButtonText || GlobalConfig.i18n('vxe.toolbar.customRestore')),
          h('button', {
            class: 'btn--confirm',
            onClick: confirmCustomEvent
          }, customOpts.confirmButtonText || GlobalConfig.i18n('vxe.toolbar.customConfirm'))
        ]) : null
      ])
    }

    const renderPopupPanel = () => {
      const { customStore } = props
      const { collectColumn } = internalData
      const customOpts = computeCustomOpts.value
      const { checkMethod, visibleMethod } = customOpts
      const isMaxFixedColumn = computeIsMaxFixedColumn.value
      const trVNs: VNode[] = []
      XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
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
              class: [`vxe-table-custom-popup--row-level${column.level}`, {
                'is--group': isColGroup
              }]
            }, [
              h('td', {
                class: 'vxe-table-custom-popup--column-name'
              }, [
                h('div', {
                  class: 'vxe-table-custom-popup--name',
                  title: colTitle
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
                  onClick: () => {
                    if (!isDisabled) {
                      changeCheckboxOption(column)
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
                !parent && customOpts.allowFixed ? h(VxeRadioGroupComponent, {
                  modelValue: column.fixed || '',
                  disabled: isMaxFixedColumn,
                  type: 'button',
                  size: 'mini',
                  options: [
                    { label: '左侧', value: 'left' },
                    { label: '不固定', value: '' },
                    { label: '右侧', value: 'right' }
                  ],
                  'onUpdate:modelValue' (value: any) {
                    column.fixed = value
                  },
                  onChange () {
                    changePopupFixedOption(column)
                  }
                }) : null
              ])
            ])
          )
        }
      })
      return h(VxeModalComponent as ComponentOptions, {
        key: 'popup',
        className: 'vxe-table-custom-popup-warpper vxe-table--ignore-clear',
        modelValue: customStore.visible,
        title: GlobalConfig.i18n('vxe.custom.cstmTitle'),
        width: 700,
        maxHeight: 500,
        mask: true,
        lockView: true,
        showFooter: true,
        escClosable: true,
        'onUpdate:modelValue' (value: any) {
          customStore.visible = value
        }
      }, {
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
            h(VxeButtonComponent, {
              content: customOpts.resetButtonText || GlobalConfig.i18n('vxe.custom.cstmRestore'),
              onClick: resetPopupCustomEvent
            }),
            h(VxeButtonComponent, {
              content: customOpts.resetButtonText || GlobalConfig.i18n('vxe.custom.cstmCancel'),
              onClick: cancelCustomEvent
            }),
            h(VxeButtonComponent, {
              status: 'primary',
              content: customOpts.confirmButtonText || GlobalConfig.i18n('vxe.custom.cstmConfirm'),
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

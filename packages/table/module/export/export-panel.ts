import { defineComponent, h, createCommentVNode, ref, Ref, computed, reactive, inject, nextTick, resolveComponent } from 'vue'
import { getI18n, getIcon } from '@vxe-ui/core'
import XEUtils from 'xe-utils'
import { formatText } from '../../../ui/src/utils'

import type { VxeModalComponent, VxeInputComponent, VxeCheckboxComponent, VxeSelectComponent, VxeButtonComponent } from 'vxe-pc-ui'
import type { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods } from '../../../../types'

export default defineComponent({
  name: 'VxeTableExportPanel',
  props: {
    defaultOptions: Object as any,
    storeData: Object as any
  },
  setup (props) {
    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)
    const { computeExportOpts, computePrintOpts } = $xeTable.getComputeMaps()

    const reactData = reactive({
      isAll: false,
      isIndeterminate: false,
      loading: false
    })

    const xButtonConfirm = ref() as Ref<HTMLButtonElement>
    const xInputFilename = ref() as Ref<HTMLInputElement>
    const xInputSheetname = ref() as Ref<HTMLInputElement>

    const computeCheckedAll = computed(() => {
      const { storeData } = props
      return storeData.columns.every((column: any) => column.checked)
    })

    const computeShowSheet = computed(() => {
      const { defaultOptions } = props
      return ['html', 'xml', 'xlsx', 'pdf'].indexOf(defaultOptions.type) > -1
    })

    const computeSupportMerge = computed(() => {
      const { storeData, defaultOptions } = props
      return !defaultOptions.original && defaultOptions.mode === 'current' && (storeData.isPrint || ['html', 'xlsx'].indexOf(defaultOptions.type) > -1)
    })

    const computeSupportStyle = computed(() => {
      const { defaultOptions } = props
      return !defaultOptions.original && ['xlsx'].indexOf(defaultOptions.type) > -1
    })

    const handleOptionCheck = (column: any) => {
      const { storeData } = props
      const matchObj = XEUtils.findTree(storeData.columns as any[], item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.checked = parent.children.every((column: any) => column.checked)
          parent.halfChecked = !parent.checked && parent.children.some((column: any) => column.checked || column.halfChecked)
          handleOptionCheck(parent)
        }
      }
    }

    const checkStatus = () => {
      const { storeData } = props
      const columns = storeData.columns
      reactData.isAll = columns.every((column: any) => column.disabled || column.checked)
      reactData.isIndeterminate = !reactData.isAll && columns.some((column: any) => !column.disabled && (column.checked || column.halfChecked))
    }

    const changeOption = (column: any) => {
      const isChecked = !column.checked
      XEUtils.eachTree([column], (item) => {
        item.checked = isChecked
        item.halfChecked = false
      })
      handleOptionCheck(column)
      checkStatus()
    }

    const allColumnEvent = () => {
      const { storeData } = props
      const isAll = !reactData.isAll
      XEUtils.eachTree(storeData.columns, (column: any) => {
        if (!column.disabled) {
          column.checked = isAll
          column.halfChecked = false
        }
      })
      reactData.isAll = isAll
      checkStatus()
    }

    const showEvent = () => {
      nextTick(() => {
        const filenameInp = xInputFilename.value
        const sheetnameInp = xInputSheetname.value
        const confirmBtn = xButtonConfirm.value
        const targetElem = filenameInp || sheetnameInp || confirmBtn
        if (targetElem) {
          targetElem.focus()
        }
      })
      checkStatus()
    }

    const getExportOption = () => {
      const { storeData, defaultOptions } = props
      const { hasMerge, columns } = storeData
      const checkedAll = computeCheckedAll.value
      const supportMerge = computeSupportMerge.value
      const expColumns = XEUtils.searchTree(columns, (column: any) => column.checked, { children: 'children', mapChildren: 'childNodes', original: true })
      return Object.assign({}, defaultOptions, {
        columns: expColumns,
        isMerge: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false
      })
    }

    const printEvent = () => {
      const { storeData } = props
      const printOpts = computePrintOpts.value
      storeData.visible = false
      $xeTable.print(Object.assign({}, printOpts, getExportOption()))
    }

    const exportEvent = () => {
      const { storeData } = props
      const exportOpts = computeExportOpts.value
      reactData.loading = true
      $xeTable.exportData(Object.assign({}, exportOpts, getExportOption())).then(() => {
        reactData.loading = false
        storeData.visible = false
      }).catch(() => {
        reactData.loading = false
      })
    }

    const cancelEvent = () => {
      const { storeData } = props
      storeData.visible = false
    }

    const confirmEvent = () => {
      const { storeData } = props
      if (storeData.isPrint) {
        printEvent()
      } else {
        exportEvent()
      }
    }

    const renderVN = () => {
      const { defaultOptions, storeData } = props
      const { isAll: isAllChecked, isIndeterminate: isAllIndeterminate } = reactData
      const { hasTree, hasMerge, isPrint, hasColgroup } = storeData
      const { isHeader } = defaultOptions
      const cols: any[] = []
      const checkedAll = computeCheckedAll.value
      const showSheet = computeShowSheet.value
      const supportMerge = computeSupportMerge.value
      const supportStyle = computeSupportStyle.value
      XEUtils.eachTree(storeData.columns, (column: any) => {
        const colTitle = formatText(column.getTitle(), 1)
        const isColGroup = column.children && column.children.length
        const isChecked = column.checked
        const indeterminate = column.halfChecked
        cols.push(
          h('li', {
            class: ['vxe-export--panel-column-option', `level--${column.level}`, {
              'is--group': isColGroup,
              'is--checked': isChecked,
              'is--indeterminate': indeterminate,
              'is--disabled': column.disabled
            }],
            title: colTitle,
            onClick: () => {
              if (!column.disabled) {
                changeOption(column)
              }
            }
          }, [
            h('span', {
              class: ['vxe-checkbox--icon', indeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
            }),
            h('span', {
              class: 'vxe-checkbox--label'
            }, colTitle)
          ])
        )
      })
      return h(resolveComponent('vxe-modal') as VxeModalComponent, {
        modelValue: storeData.visible,
        title: getI18n(isPrint ? 'vxe.export.printTitle' : 'vxe.export.expTitle'),
        className: 'vxe-table-export-popup-wrapper',
        width: 660,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: reactData.loading,
        'onUpdate:modelValue' (value: any) {
          storeData.visible = value
        },
        onShow: showEvent
      }, {
        default: () => {
          return h('div', {
            class: 'vxe-export--panel'
          }, [
            h('table', {
              cellspacing: 0,
              cellpadding: 0,
              border: 0
            }, [
              h('tbody', [
                [
                  isPrint
                    ? createCommentVNode()
                    : h('tr', [
                      h('td', getI18n('vxe.export.expName')),
                      h('td', [
                        h(resolveComponent('vxe-input') as VxeInputComponent, {
                          ref: xInputFilename,
                          modelValue: defaultOptions.filename,
                          type: 'text',
                          clearable: true,
                          placeholder: getI18n('vxe.export.expNamePlaceholder'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.filename = value
                          }
                        })
                      ])
                    ]),
                  isPrint
                    ? createCommentVNode()
                    : h('tr', [
                      h('td', getI18n('vxe.export.expType')),
                      h('td', [
                        h(resolveComponent('vxe-select') as VxeSelectComponent, {
                          modelValue: defaultOptions.type,
                          options: storeData.typeList.map((item: any) => {
                            return {
                              value: item.value,
                              label: getI18n(item.label)
                            }
                          }),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.type = value
                          }
                        })
                      ])
                    ]),
                  isPrint || showSheet
                    ? h('tr', [
                      h('td', getI18n('vxe.export.expSheetName')),
                      h('td', [
                        h(resolveComponent('vxe-input') as VxeInputComponent, {
                          ref: xInputSheetname,
                          modelValue: defaultOptions.sheetName,
                          type: 'text',
                          clearable: true,
                          placeholder: getI18n('vxe.export.expSheetNamePlaceholder'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.sheetName = value
                          }
                        })
                      ])
                    ])
                    : createCommentVNode(),
                  h('tr', [
                    h('td', getI18n('vxe.export.expMode')),
                    h('td', [
                      h(resolveComponent('vxe-select') as VxeSelectComponent, {
                        modelValue: defaultOptions.mode,
                        options: storeData.modeList.map((item: any) => {
                          return {
                            value: item.value,
                            label: getI18n(item.label)
                          }
                        }),
                        'onUpdate:modelValue' (value: any) {
                          defaultOptions.mode = value
                        }
                      })
                    ])
                  ]),
                  h('tr', [
                    h('td', [getI18n('vxe.export.expColumn')]),
                    h('td', [
                      h('div', {
                        class: 'vxe-export--panel-column'
                      }, [
                        h('ul', {
                          class: 'vxe-export--panel-column-header'
                        }, [
                          h('li', {
                            class: ['vxe-export--panel-column-option', {
                              'is--checked': isAllChecked,
                              'is--indeterminate': isAllIndeterminate
                            }],
                            title: getI18n('vxe.table.allTitle'),
                            onClick: allColumnEvent
                          }, [
                            h('span', {
                              class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : (isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED)]
                            }),
                            h('span', {
                              class: 'vxe-checkbox--label'
                            }, getI18n('vxe.export.expCurrentColumn'))
                          ])
                        ]),
                        h('ul', {
                          class: 'vxe-export--panel-column-body'
                        }, cols)
                      ])
                    ])
                  ]),
                  h('tr', [
                    h('td', getI18n('vxe.export.expOpts')),
                    h('td', [
                      h('div', {
                        class: 'vxe-export--panel-option-row'
                      }, [
                        h(resolveComponent('vxe-checkbox') as VxeCheckboxComponent, {
                          modelValue: defaultOptions.isHeader,
                          title: getI18n('vxe.export.expHeaderTitle'),
                          content: getI18n('vxe.export.expOptHeader'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.isHeader = value
                          }
                        }),
                        h(resolveComponent('vxe-checkbox') as VxeCheckboxComponent, {
                          modelValue: defaultOptions.isFooter,
                          disabled: !storeData.hasFooter,
                          title: getI18n('vxe.export.expFooterTitle'),
                          content: getI18n('vxe.export.expOptFooter'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.isFooter = value
                          }
                        }),
                        h(resolveComponent('vxe-checkbox') as VxeCheckboxComponent, {
                          modelValue: defaultOptions.original,
                          title: getI18n('vxe.export.expOriginalTitle'),
                          content: getI18n('vxe.export.expOptOriginal'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.original = value
                          }
                        })
                      ]),
                      h('div', {
                        class: 'vxe-export--panel-option-row'
                      }, [
                        h(resolveComponent('vxe-checkbox') as VxeCheckboxComponent, {
                          modelValue: isHeader && hasColgroup && supportMerge ? defaultOptions.isColgroup : false,
                          title: getI18n('vxe.export.expColgroupTitle'),
                          disabled: !isHeader || !hasColgroup || !supportMerge,
                          content: getI18n('vxe.export.expOptColgroup'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.isColgroup = value
                          }
                        }),
                        h(resolveComponent('vxe-checkbox') as VxeCheckboxComponent, {
                          modelValue: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false,
                          title: getI18n('vxe.export.expMergeTitle'),
                          disabled: !hasMerge || !supportMerge || !checkedAll,
                          content: getI18n('vxe.export.expOptMerge'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.isMerge = value
                          }
                        }),
                        isPrint
                          ? createCommentVNode()
                          : h(resolveComponent('vxe-checkbox') as VxeCheckboxComponent, {
                            modelValue: supportStyle ? defaultOptions.useStyle : false,
                            disabled: !supportStyle,
                            title: getI18n('vxe.export.expUseStyleTitle'),
                            content: getI18n('vxe.export.expOptUseStyle'),
                            'onUpdate:modelValue' (value: any) {
                              defaultOptions.useStyle = value
                            }
                          }),
                        h(resolveComponent('vxe-checkbox') as VxeCheckboxComponent, {
                          modelValue: hasTree ? defaultOptions.isAllExpand : false,
                          disabled: !hasTree,
                          title: getI18n('vxe.export.expAllExpandTitle'),
                          content: getI18n('vxe.export.expOptAllExpand'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.isAllExpand = value
                          }
                        })
                      ])
                    ])
                  ])
                ]
              ])
            ]),
            h('div', {
              class: 'vxe-export--panel-btns'
            }, [
              h(resolveComponent('vxe-button') as VxeButtonComponent, {
                content: getI18n('vxe.export.expCancel'),
                onClick: cancelEvent
              }),
              h(resolveComponent('vxe-button') as VxeButtonComponent, {
                ref: xButtonConfirm,
                status: 'primary',
                content: getI18n(isPrint ? 'vxe.export.expPrint' : 'vxe.export.expConfirm'),
                onClick: confirmEvent
              })
            ])
          ])
        }
      })
    }

    return renderVN
  }
})

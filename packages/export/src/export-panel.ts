import { defineComponent, h, createCommentVNode, ref, Ref, computed, reactive, inject, nextTick } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import { formatText } from '../../tools/utils'
import VxeModalConstructor from '../../modal/src/modal'
import VxeInputConstructor from '../../input/src/input'
import VxeCheckboxConstructor from '../../checkbox/src/checkbox'
import VxeSelectConstructor from '../../select/src/select'
import VxeButtonConstructor from '../../button/src/button'

import { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods } from '../../../types/all'

export default defineComponent({
  name: 'VxeExportPanel',
  props: {
    defaultOptions: Object as any,
    storeData: Object as any
  },
  setup (props) {
    const $xetable = inject('$xetable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)
    const { computeExportOpts, computePrintOpts } = $xetable.getComputeMaps()

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
      $xetable.print(Object.assign({}, printOpts, getExportOption()))
    }

    const exportEvent = () => {
      const { storeData } = props
      const exportOpts = computeExportOpts.value
      reactData.loading = true
      $xetable.exportData(Object.assign({}, exportOpts, getExportOption())).then(() => {
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
      const { isAll, isIndeterminate } = reactData
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
        cols.push(
          h('li', {
            class: ['vxe-export--panel-column-option', `level--${column.level}`, {
              'is--group': isColGroup,
              'is--checked': column.checked,
              'is--indeterminate': column.halfChecked,
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
              class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
            }),
            h('span', {
              class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
            }),
            h('span', {
              class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
            }),
            h('span', {
              class: 'vxe-checkbox--label'
            }, colTitle)
          ])
        )
      })
      return h(VxeModalConstructor, {
        modelValue: storeData.visible,
        title: GlobalConfig.i18n(isPrint ? 'vxe.export.printTitle' : 'vxe.export.expTitle'),
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
                  isPrint ? createCommentVNode() : h('tr', [
                    h('td', GlobalConfig.i18n('vxe.export.expName')),
                    h('td', [
                      h(VxeInputConstructor, {
                        ref: xInputFilename,
                        modelValue: defaultOptions.filename,
                        type: 'text',
                        clearable: true,
                        placeholder: GlobalConfig.i18n('vxe.export.expNamePlaceholder'),
                        'onUpdate:modelValue' (value: any) {
                          defaultOptions.filename = value
                        }
                      })
                    ])
                  ]),
                  isPrint ? createCommentVNode() : h('tr', [
                    h('td', GlobalConfig.i18n('vxe.export.expType')),
                    h('td', [
                      h(VxeSelectConstructor, {
                        modelValue: defaultOptions.type,
                        options: storeData.typeList.map((item: any) => {
                          return {
                            value: item.value,
                            label: GlobalConfig.i18n(item.label)
                          }
                        }),
                        'onUpdate:modelValue' (value: any) {
                          defaultOptions.type = value
                        }
                      })
                    ])
                  ]),
                  isPrint || showSheet ? h('tr', [
                    h('td', GlobalConfig.i18n('vxe.export.expSheetName')),
                    h('td', [
                      h(VxeInputConstructor, {
                        ref: xInputSheetname,
                        modelValue: defaultOptions.sheetName,
                        type: 'text',
                        clearable: true,
                        placeholder: GlobalConfig.i18n('vxe.export.expSheetNamePlaceholder'),
                        'onUpdate:modelValue' (value: any) {
                          defaultOptions.sheetName = value
                        }
                      })
                    ])
                  ]) : createCommentVNode(),
                  h('tr', [
                    h('td', GlobalConfig.i18n('vxe.export.expMode')),
                    h('td', [
                      h(VxeSelectConstructor, {
                        modelValue: defaultOptions.mode,
                        options: storeData.modeList.map((item: any) => {
                          return {
                            value: item.value,
                            label: GlobalConfig.i18n(item.label)
                          }
                        }),
                        'onUpdate:modelValue' (value: any) {
                          defaultOptions.mode = value
                        }
                      })
                    ])
                  ]),
                  h('tr', [
                    h('td', [GlobalConfig.i18n('vxe.export.expColumn')]),
                    h('td', [
                      h('div', {
                        class: 'vxe-export--panel-column'
                      }, [
                        h('ul', {
                          class: 'vxe-export--panel-column-header'
                        }, [
                          h('li', {
                            class: ['vxe-export--panel-column-option', {
                              'is--checked': isAll,
                              'is--indeterminate': isIndeterminate
                            }],
                            title: GlobalConfig.i18n('vxe.table.allTitle'),
                            onClick: allColumnEvent
                          }, [
                            h('span', {
                              class: 'vxe-checkbox--icon vxe-checkbox--checked-icon'
                            }),
                            h('span', {
                              class: 'vxe-checkbox--icon vxe-checkbox--unchecked-icon'
                            }),
                            h('span', {
                              class: 'vxe-checkbox--icon vxe-checkbox--indeterminate-icon'
                            }),
                            h('span', {
                              class: 'vxe-checkbox--label'
                            }, GlobalConfig.i18n('vxe.export.expCurrentColumn'))
                          ])
                        ]),
                        h('ul', {
                          class: 'vxe-export--panel-column-body'
                        }, cols)
                      ])
                    ])
                  ]),
                  h('tr', [
                    h('td', GlobalConfig.i18n('vxe.export.expOpts')),
                    h('td', [
                      h('div', {
                        class: 'vxe-export--panel-option-row'
                      }, [
                        h(VxeCheckboxConstructor, {
                          modelValue: defaultOptions.isHeader,
                          title: GlobalConfig.i18n('vxe.export.expHeaderTitle'),
                          content: GlobalConfig.i18n('vxe.export.expOptHeader'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.isHeader = value
                          }
                        }),
                        h(VxeCheckboxConstructor, {
                          modelValue: defaultOptions.isFooter,
                          disabled: !storeData.hasFooter,
                          title: GlobalConfig.i18n('vxe.export.expFooterTitle'),
                          content: GlobalConfig.i18n('vxe.export.expOptFooter'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.isFooter = value
                          }
                        }),
                        h(VxeCheckboxConstructor, {
                          modelValue: defaultOptions.original,
                          title: GlobalConfig.i18n('vxe.export.expOriginalTitle'),
                          content: GlobalConfig.i18n('vxe.export.expOptOriginal'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.original = value
                          }
                        })
                      ]),
                      h('div', {
                        class: 'vxe-export--panel-option-row'
                      }, [
                        h(VxeCheckboxConstructor, {
                          modelValue: isHeader && hasColgroup && supportMerge ? defaultOptions.isColgroup : false,
                          title: GlobalConfig.i18n('vxe.export.expColgroupTitle'),
                          disabled: !isHeader || !hasColgroup || !supportMerge,
                          content: GlobalConfig.i18n('vxe.export.expOptColgroup'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.isColgroup = value
                          }
                        }),
                        h(VxeCheckboxConstructor, {
                          modelValue: hasMerge && supportMerge && checkedAll ? defaultOptions.isMerge : false,
                          title: GlobalConfig.i18n('vxe.export.expMergeTitle'),
                          disabled: !hasMerge || !supportMerge || !checkedAll,
                          content: GlobalConfig.i18n('vxe.export.expOptMerge'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.isMerge = value
                          }
                        }),
                        isPrint ? createCommentVNode() : h(VxeCheckboxConstructor, {
                          modelValue: supportStyle ? defaultOptions.useStyle : false,
                          disabled: !supportStyle,
                          title: GlobalConfig.i18n('vxe.export.expUseStyleTitle'),
                          content: GlobalConfig.i18n('vxe.export.expOptUseStyle'),
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.useStyle = value
                          }
                        }),
                        h(VxeCheckboxConstructor, {
                          modelValue: hasTree ? defaultOptions.isAllExpand : false,
                          disabled: !hasTree,
                          title: GlobalConfig.i18n('vxe.export.expAllExpandTitle'),
                          content: GlobalConfig.i18n('vxe.export.expOptAllExpand'),
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
              h(VxeButtonConstructor, {
                content: GlobalConfig.i18n('vxe.export.expCancel'),
                onClick: cancelEvent
              }),
              h(VxeButtonConstructor, {
                ref: xButtonConfirm,
                status: 'primary',
                content: GlobalConfig.i18n(isPrint ? 'vxe.export.expPrint' : 'vxe.export.expConfirm'),
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

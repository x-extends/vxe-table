import { CreateElement, PropType } from 'vue'
import { defineVxeComponent } from '../../../ui/src/comp'
import { VxeUI } from '../../../ui'
import XEUtils from 'xe-utils'
import { parseFile } from '../../../ui/src/utils'
import { errLog } from '../../../ui/src/log'

import type { VxeComponentSizeType } from 'vxe-pc-ui'
import type { VxeTableConstructor, VxeTablePrivateMethods, VxeTableDefines } from '../../../../types'

const { getI18n, getIcon, globalMixins, renderEmptyElement } = VxeUI

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeTableImportPanel',
  mixins: [
    globalMixins.sizeMixin
  ],
  props: {
    defaultOptions: {
      type: Object as PropType<VxeTableDefines.ImportParamsObj>,
      default: () => ({} as VxeTableDefines.ImportParamsObj)
    },
    storeData: {
      type: Object as PropType<VxeTableDefines.ImportStoreObj>,
      default: () => ({} as VxeTableDefines.ImportStoreObj)
    }
  },
  inject: {
    $xeTable: {
      default: null
    }
  },
  data () {
    const reactData = {
      loading: false
    }

    return {
      reactData
    }
  },
  computed: {
    ...({} as {
      computeSize(): VxeComponentSizeType
      $xeTable(): VxeTableConstructor & VxeTablePrivateMethods
    }),
    computeSelectName () {
      const $xeImportPanel = this
      const props = $xeImportPanel

      const { storeData } = props
      return `${storeData.filename}.${storeData.type}`
    },
    computeHasFile () {
      const $xeImportPanel = this
      const props = $xeImportPanel

      const { storeData } = props
      return storeData.file && storeData.type
    },
    computeParseTypeLabel () {
      const $xeImportPanel = this
      const props = $xeImportPanel

      const { storeData } = props
      const { type, typeList } = storeData
      if (type) {
        const selectItem = XEUtils.find(typeList, item => type === item.value)
        return `${selectItem ? selectItem.label : '*.*'}`
      }
      return `*.${typeList.map((item) => item.value).join(', *.')}`
    }
  },
  created () {
    const $xeTableImportPanel = this

    const VxeUIModalComponent = VxeUI.getComponent('VxeModal')
    const VxeUIButtonComponent = VxeUI.getComponent('VxeButton')
    const VxeUISelectComponent = VxeUI.getComponent('VxeSelect')

    $xeTableImportPanel.$nextTick(() => {
      if (!VxeUIModalComponent) {
        errLog('vxe.error.reqComp', ['vxe-modal'])
      }
      if (!VxeUIButtonComponent) {
        errLog('vxe.error.reqComp', ['vxe-button'])
      }
      if (!VxeUISelectComponent) {
        errLog('vxe.error.reqComp', ['vxe-select'])
      }
    })
  },
  methods: {
    clearFileEvent () {
      Object.assign(this.storeData, {
        filename: '',
        sheetName: '',
        type: ''
      })
    },
    selectFileEvent () {
      const $xeImportPanel = this
      const props = $xeImportPanel
      const $xeTable = $xeImportPanel.$xeTable

      const { storeData, defaultOptions } = props
      $xeTable.readFile(defaultOptions).then((params) => {
        const { file } = params
        Object.assign(storeData, parseFile(file), { file })
      }).catch(() => {})
    },
    showEvent () {
      const $xeImportPanel = this
      $xeImportPanel.$nextTick(() => {
        const targetElem = $xeImportPanel.$refs.fileBtn as HTMLButtonElement
        if (targetElem) {
          targetElem.focus()
        }
      })
    },
    cancelEvent () {
      const $xeImportPanel = this
      const props = $xeImportPanel

      const { storeData } = props
      storeData.visible = false
    },
    importEvent () {
      const $xeImportPanel = this
      const props = $xeImportPanel
      const reactData = $xeImportPanel.reactData
      const $xeTable = $xeImportPanel.$xeTable

      const { storeData, defaultOptions } = props
      const importOpts = $xeTable.computeImportOpts
      reactData.loading = true
      $xeTable.importByFile(storeData.file, Object.assign({}, importOpts, defaultOptions)).then(() => {
        reactData.loading = false
        storeData.visible = false
      }).catch(() => {
        reactData.loading = false
      })
    },
    renderVN (h: CreateElement) {
      const $xeImportPanel = this
      const props = $xeImportPanel
      const reactData = $xeImportPanel.reactData
      const $xeTable = $xeImportPanel.$xeTable
      const $xeGrid = $xeTable.$xeGrid
      const $xeGantt = $xeTable.$xeGantt

      const { defaultOptions, storeData } = props
      const selectName = $xeImportPanel.computeSelectName as string
      const hasFile = $xeImportPanel.computeHasFile
      const parseTypeLabel = $xeImportPanel.computeParseTypeLabel as string
      const slots = defaultOptions.slots || {}
      const topSlot = slots.top
      const bottomSlot = slots.bottom
      const defaultSlot = slots.default
      const footerSlot = slots.footer
      return h('vxe-modal', {
        ref: 'modal',
        props: {
          id: 'VXE_IMPORT_MODAL',
          value: storeData.visible,
          title: getI18n('vxe.import.impTitle'),
          width: 540,
          minWidth: 360,
          minHeight: 240,
          mask: true,
          lockView: true,
          showFooter: true,
          escClosable: true,
          maskClosable: true,
          showMaximize: true,
          resize: true,
          loading: reactData.loading
        },
        on: {
          input (value: any) {
            storeData.visible = value
          },
          show: $xeImportPanel.showEvent
        },
        scopedSlots: {
          default: () => {
            const params = {
              $table: $xeTable,
              $grid: $xeGrid,
              $gantt: $xeGantt,
              options: defaultOptions,
              params: defaultOptions.params as any
            }

            return h('div', {
              class: 'vxe-table-export--panel'
            }, [
              topSlot
                ? h('div', {
                  class: 'vxe-table-export--panel-top'
                }, $xeTable.callSlot(topSlot, params, h))
                : renderEmptyElement($xeTable),
              h('div', {
                class: 'vxe-table-export--panel-body'
              }, defaultSlot
                ? $xeTable.callSlot(defaultSlot, params, h)
                : [
                    h('table', {
                      class: 'vxe-table-export--panel-table',
                      attrs: {
                        cellspacing: 0,
                        cellpadding: 0,
                        border: 0
                      }
                    }, [
                      h('tbody', [
                        h('tr', [
                          h('td', getI18n('vxe.import.impFile')),
                          h('td', [
                            hasFile
                              ? h('div', {
                                class: 'vxe-table-export--selected--file',
                                attrs: {
                                  title: selectName
                                }
                              }, [
                                h('span', selectName),
                                h('i', {
                                  class: getIcon().INPUT_CLEAR,
                                  on: {
                                    click: $xeImportPanel.clearFileEvent
                                  }
                                })
                              ])
                              : h('button', {
                                ref: 'fileBtn',
                                class: 'vxe-table-export--select--file',
                                attrs: {
                                  type: 'button'
                                },
                                on: {
                                  click: $xeImportPanel.selectFileEvent
                                }
                              }, getI18n('vxe.import.impSelect'))
                          ])
                        ]),
                        h('tr', [
                          h('td', getI18n('vxe.import.impType')),
                          h('td', parseTypeLabel)
                        ]),
                        h('tr', [
                          h('td', getI18n('vxe.import.impMode')),
                          h('td', [
                            h('vxe-select', {
                              props: {
                                value: defaultOptions.mode,
                                options: storeData.modeList
                              },
                              on: {
                                modelValue (value: any) {
                                  defaultOptions.mode = value
                                }
                              }
                            })
                          ])
                        ])
                      ])
                    ])
                  ]
              ),
              bottomSlot
                ? h('div', {
                  class: 'vxe-table-export--panel-bottom'
                }, $xeTable.callSlot(bottomSlot, params, h))
                : renderEmptyElement($xeTable)
            ])
          },
          footer: () => {
            const params = {
              $table: $xeTable,
              $grid: $xeGrid,
              $gantt: $xeGantt,
              options: defaultOptions,
              params: defaultOptions.params as any
            }
            return h('div', {
              class: 'vxe-table-export--panel-footer'
            }, footerSlot
              ? $xeTable.callSlot(footerSlot, params, h)
              : [
                  h('div', {
                    class: 'vxe-table-export--panel-btns'
                  }, [
                    h('vxe-button', {
                      on: {
                        click: $xeImportPanel.cancelEvent
                      }
                    }, getI18n('vxe.import.impCancel')),
                    h('vxe-button', {
                      props: {
                        status: 'primary',
                        disabled: !hasFile || reactData.loading
                      },
                      on: {
                        click: $xeImportPanel.importEvent
                      }
                    }, getI18n('vxe.import.impConfirm'))
                  ])
                ]
            )
          }
        }
      })
    }
  },
  render (h: CreateElement) {
    return (this as any).renderVN(h)
  }
}) /* define-vxe-component end */

import { CreateElement } from 'vue'
import { VxeUI } from '../../../ui'
import XEUtils from 'xe-utils'
import { parseFile } from '../../../ui/src/utils'
import { errLog } from '../../../ui/src/log'

import type { VxeModalComponent, VxeSelectComponent, VxeButtonComponent } from 'vxe-pc-ui'
import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../../types'

const { getI18n, getIcon, globalMixins, renderEmptyElement } = VxeUI

export default {
  name: 'VxeTableImportPanel',
  mixins: [
    globalMixins.sizeMixin
  ],
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  components: {
    // VxeModal,
    // VxeRadio
  },
  inject: {
    $xeTable: {
      default: null
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    selectName () {
      return `${this.storeData.filename}.${this.storeData.type}`
    },
    hasFile () {
      return this.storeData.file && this.storeData.type
    },
    parseTypeLabel () {
      const { storeData } = this
      const { type, typeList } = storeData
      if (type) {
        const selectItem = XEUtils.find(typeList, item => type === item.value)
        return selectItem ? selectItem.label : '*.*'
      }
      return `*.${typeList.map((item: any) => item.value).join(', *.')}`
    }
  } as any,
  created (this: any) {
    const $xeTableImportPanel = this

    const VxeUIModalComponent = VxeUI.getComponent<VxeModalComponent>('VxeModal')
    const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
    const VxeUISelectComponent = VxeUI.getComponent<VxeSelectComponent>('VxeSelect')

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
  render (this: any, h: CreateElement) {
    const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods
    const $xeGrid = $xeTable.$xeGrid

    const { hasFile, loading, parseTypeLabel, defaultOptions, storeData, selectName } = this
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
        loading
      },
      on: {
        input (value: any) {
          storeData.visible = value
        },
        show: this.showEvent
      },
      scopedSlots: {
        default: () => {
          const params = {
            $table: $xeTable,
            $grid: $xeGrid,
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
              : renderEmptyElement(this),
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
                                  click: this.clearFileEvent
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
                                click: this.selectFileEvent
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
              : renderEmptyElement(this)
          ])
        },
        footer: () => {
          const params = {
            $table: $xeTable,
            $grid: $xeGrid,
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
                      click: this.cancelEvent
                    }
                  }, getI18n('vxe.import.impCancel')),
                  h('vxe-button', {
                    props: {
                      status: 'primary',
                      disabled: !hasFile || loading
                    },
                    on: {
                      click: this.importEvent
                    }
                  }, getI18n('vxe.import.impConfirm'))
                ])
              ]
          )
        }
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
      const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods

      $xeTable.readFile(this.defaultOptions).then((params: any) => {
        const { file } = params
        Object.assign(this.storeData, parseFile(file), { file })
      }).catch((e: any) => e)
    },
    showEvent () {
      this.$nextTick(() => {
        const { $refs } = this
        const targetElem = $refs.fileBtn
        if (targetElem) {
          targetElem.focus()
        }
      })
    },
    cancelEvent () {
      this.storeData.visible = false
    },
    importEvent () {
      const $xeTable = this.$parent as VxeTableConstructor & VxeTablePrivateMethods

      this.loading = true
      $xeTable.importByFile(this.storeData.file, Object.assign({}, $xeTable.importOpts, this.defaultOptions)).then(() => {
        this.loading = false
        this.storeData.visible = false
      }).catch(() => {
        this.loading = false
      })
    }
  } as any
}

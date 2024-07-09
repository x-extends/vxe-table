import { defineComponent, h, ref, Ref, computed, inject, reactive, nextTick, createCommentVNode } from 'vue'
import { VxeUI } from '../../../ui'
import XEUtils from 'xe-utils'
import { parseFile } from '../../../ui/src/utils'
import { errLog } from '../../../ui/src/log'

import type { VxeButtonComponent, VxeModalComponent, VxeSelectComponent } from 'vxe-pc-ui'
import type { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods } from '../../../../types'

const { getI18n, getIcon } = VxeUI

export default defineComponent({
  name: 'VxeTableImportPanel',
  props: {
    defaultOptions: Object as any,
    storeData: Object as any
  },
  setup (props) {
    const VxeUIModalComponent = VxeUI.getComponent<VxeModalComponent>('VxeModal')
    const VxeUIButtonComponent = VxeUI.getComponent<VxeButtonComponent>('VxeButton')
    const VxeUISelectComponent = VxeUI.getComponent<VxeSelectComponent>('VxeSelect')

    const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)
    const { computeImportOpts } = $xeTable.getComputeMaps()

    const reactData = reactive({
      loading: false
    })

    const refFileBtn = ref() as Ref<HTMLButtonElement>

    const computeSelectName = computed(() => {
      const { storeData } = props
      return `${storeData.filename}.${storeData.type}`
    })

    const computeHasFile = computed(() => {
      const { storeData } = props
      return storeData.file && storeData.type
    })

    const computeParseTypeLabel = computed(() => {
      const { storeData } = props
      const { type, typeList } = storeData
      if (type) {
        const selectItem = XEUtils.find(typeList, item => type === item.value)
        return selectItem ? selectItem.label : '*.*'
      }
      return `*.${typeList.map((item: any) => item.value).join(', *.')}`
    })

    const clearFileEvent = () => {
      const { storeData } = props
      Object.assign(storeData, {
        filename: '',
        sheetName: '',
        type: ''
      })
    }

    const selectFileEvent = () => {
      const { storeData, defaultOptions } = props
      $xeTable.readFile(defaultOptions).then((params: any) => {
        const { file } = params
        Object.assign(storeData, parseFile(file), { file })
      }).catch((e: any) => e)
    }

    const showEvent = () => {
      nextTick(() => {
        const targetElem = refFileBtn.value
        if (targetElem) {
          targetElem.focus()
        }
      })
    }

    const cancelEvent = () => {
      const { storeData } = props
      storeData.visible = false
    }

    const importEvent = () => {
      const { storeData, defaultOptions } = props
      const importOpts = computeImportOpts.value
      reactData.loading = true
      $xeTable.importByFile(storeData.file, Object.assign({}, importOpts, defaultOptions)).then(() => {
        reactData.loading = false
        storeData.visible = false
      }).catch(() => {
        reactData.loading = false
      })
    }

    const renderVN = () => {
      const { defaultOptions, storeData } = props
      const selectName = computeSelectName.value
      const hasFile = computeHasFile.value
      const parseTypeLabel = computeParseTypeLabel.value
      return VxeUIModalComponent
        ? h(VxeUIModalComponent, {
          modelValue: storeData.visible,
          title: getI18n('vxe.import.impTitle'),
          className: 'vxe-table-import-popup-wrapper',
          width: 520,
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
                  h('tr', [
                    h('td', getI18n('vxe.import.impFile')),
                    h('td', [
                      hasFile
                        ? h('div', {
                          class: 'vxe-import-selected--file',
                          title: selectName
                        }, [
                          h('span', selectName),
                          h('i', {
                            class: getIcon().INPUT_CLEAR,
                            onClick: clearFileEvent
                          })
                        ])
                        : h('button', {
                          ref: refFileBtn,
                          class: 'vxe-import-select--file',
                          onClick: selectFileEvent
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
                      VxeUISelectComponent
                        ? h(VxeUISelectComponent, {
                          modelValue: defaultOptions.mode,
                          options: storeData.modeList,
                          'onUpdate:modelValue' (value: any) {
                            defaultOptions.mode = value
                          }
                        })
                        : createCommentVNode()
                    ])
                  ])
                ])
              ]),
              h('div', {
                class: 'vxe-export--panel-btns'
              }, [
                VxeUIButtonComponent
                  ? h(VxeUIButtonComponent, {
                    content: getI18n('vxe.import.impCancel'),
                    onClick: cancelEvent
                  })
                  : createCommentVNode(),
                VxeUIButtonComponent
                  ? h(VxeUIButtonComponent, {
                    status: 'primary',
                    disabled: !hasFile,
                    content: getI18n('vxe.import.impConfirm'),
                    onClick: importEvent
                  })
                  : createCommentVNode()
              ])
            ])
          }
        })
        : createCommentVNode()
    }

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      nextTick(() => {
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
    }

    return renderVN
  }
})

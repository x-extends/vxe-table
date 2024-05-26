import { defineComponent, h, ref, Ref, computed, inject, reactive, nextTick, resolveComponent } from 'vue'
import { getI18n, getIcon } from '@vxe-ui/core'
import XEUtils from 'xe-utils'
import { parseFile } from '../../../ui/src/utils'

import type { VxeButtonComponent, VxeModalComponent, VxeRadioGroupComponent, VxeRadioComponent } from 'vxe-pc-ui'
import type { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods } from '../../../../types'

export default defineComponent({
  name: 'VxeTableImportPanel',
  props: {
    defaultOptions: Object as any,
    storeData: Object as any
  },
  setup (props) {
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
        return selectItem ? getI18n(selectItem.label) : '*.*'
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
      return h(resolveComponent('vxe-modal') as VxeModalComponent, {
        modelValue: storeData.visible,
        title: getI18n('vxe.import.impTitle'),
        className: 'vxe-table-import-popup-wrapper',
        width: 440,
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
                  h('td', getI18n('vxe.import.impOpts')),
                  h('td', [
                    h(resolveComponent('vxe-radio-group') as VxeRadioGroupComponent, {
                      modelValue: defaultOptions.mode,
                      'onUpdate:modelValue' (value: any) {
                        defaultOptions.mode = value
                      }
                    }, {
                      default: () => storeData.modeList.map((item: any) => h(resolveComponent('vxe-radio') as VxeRadioComponent, { label: item.value, content: getI18n(item.label) }))
                    })
                  ])
                ])
              ])
            ]),
            h('div', {
              class: 'vxe-export--panel-btns'
            }, [
              h(resolveComponent('vxe-button') as VxeButtonComponent, {
                content: getI18n('vxe.import.impCancel'),
                onClick: cancelEvent
              }),
              h(resolveComponent('vxe-button') as VxeButtonComponent, {
                status: 'primary',
                disabled: !hasFile,
                content: getI18n('vxe.import.impConfirm'),
                onClick: importEvent
              })
            ])
          ])
        }
      })
    }

    return renderVN
  }
})

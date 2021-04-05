import { defineComponent, h, ref, Ref, computed, inject, reactive, nextTick } from 'vue'
import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import VxeModalConstructor from '../../modal/src/modal'
import VxeRadioGroupConstructor from '../../radio/src/group'
import VxeRadioConstructor from '../../radio/src/radio'
import VxeButtonConstructor from '../../button/src/button'
import { parseFile } from '../../tools/utils'

import { VxeTablePrivateMethods, VxeTableConstructor, VxeTableMethods } from '../../../types/all'

export default defineComponent({
  name: 'VxeImportPanel',
  props: {
    defaultOptions: Object as any,
    storeData: Object as any
  },
  setup (props) {
    const $xetable = inject('$xetable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods)
    const { computeImportOpts } = $xetable.getComputeMaps()

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
        return selectItem ? GlobalConfig.i18n(selectItem.label) : '*.*'
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
      $xetable.readFile(defaultOptions).then((params: any) => {
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
      $xetable.importByFile(storeData.file, Object.assign({}, importOpts, defaultOptions)).then(() => {
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
      return h(VxeModalConstructor, {
        modelValue: storeData.visible,
        title: GlobalConfig.i18n('vxe.import.impTitle'),
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
                  h('td', GlobalConfig.i18n('vxe.import.impFile')),
                  h('td', [
                    hasFile ? h('div', {
                      class: 'vxe-import-selected--file',
                      title: selectName
                    }, [
                      h('span', selectName),
                      h('i', {
                        class: GlobalConfig.icon.INPUT_CLEAR,
                        onClick: clearFileEvent
                      })
                    ]) : h('button', {
                      ref: refFileBtn,
                      class: 'vxe-import-select--file',
                      onClick: selectFileEvent
                    }, GlobalConfig.i18n('vxe.import.impSelect'))
                  ])
                ]),
                h('tr', [
                  h('td', GlobalConfig.i18n('vxe.import.impType')),
                  h('td', parseTypeLabel)
                ]),
                h('tr', [
                  h('td', GlobalConfig.i18n('vxe.import.impOpts')),
                  h('td', [
                    h(VxeRadioGroupConstructor, {
                      modelValue: defaultOptions.mode,
                      'onUpdate:modelValue' (value: any) {
                        defaultOptions.mode = value
                      }
                    }, {
                      default: () => storeData.modeList.map((item: any) => h(VxeRadioConstructor, { label: item.value, content: GlobalConfig.i18n(item.label) }))
                    })
                  ])
                ])
              ])
            ]),
            h('div', {
              class: 'vxe-export--panel-btns'
            }, [
              h(VxeButtonConstructor, {
                content: GlobalConfig.i18n('vxe.import.impCancel'),
                onClick: cancelEvent
              }),
              h(VxeButtonConstructor, {
                status: 'primary',
                disabled: !hasFile,
                content: GlobalConfig.i18n('vxe.import.impConfirm'),
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

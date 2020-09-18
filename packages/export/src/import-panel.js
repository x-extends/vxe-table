import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import VxeModal from '../../modal/src/modal'
import VxeRadio from '../../radio/src/radio'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeImportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  components: {
    VxeModal,
    VxeRadio
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
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
        return selectItem ? GlobalConfig.i18n(selectItem.label) : '*.*'
      }
      return `*.${typeList.map(item => item.value).join(', *.')}`
    }
  },
  render (h) {
    const { hasFile, parseTypeLabel, defaultOptions, storeData, selectName } = this
    return h('vxe-modal', {
      res: 'modal',
      props: {
        value: storeData.visible,
        title: GlobalConfig.i18n('vxe.import.impTitle'),
        width: 440,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: this.loading
      },
      on: {
        input (value) {
          storeData.visible = value
        }
      }
    }, [
      h('div', {
        class: 'vxe-export--panel'
      }, [
        h('table', {
          attrs: {
            cellspacing: 0,
            cellpadding: 0,
            border: 0
          }
        }, [
          h('tbody', [
            h('tr', [
              h('td', GlobalConfig.i18n('vxe.import.impFile')),
              h('td', [
                hasFile ? h('div', {
                  class: 'vxe-import-selected--file',
                  attrs: {
                    title: selectName
                  }
                }, [
                  h('span', selectName),
                  h('i', {
                    class: GlobalConfig.icon.INPUT_CLEAR,
                    on: {
                      click: this.clearFileEvent
                    }
                  })
                ]) : h('span', {
                  class: 'vxe-import-select--file',
                  on: {
                    click: this.selectFileEvent
                  }
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
                h('vxe-radio-group', {
                  props: {
                    value: defaultOptions.mode
                  },
                  on: {
                    input (value) {
                      defaultOptions.mode = value
                    }
                  }
                }, storeData.modeList.map(item => {
                  return h('vxe-radio', {
                    props: {
                      label: item.value
                    }
                  }, GlobalConfig.i18n(item.label))
                }))
              ])
            ])
          ])
        ]),
        h('div', {
          class: 'vxe-export--panel-btns'
        }, [
          h('vxe-button', {
            props: {
              status: 'primary',
              disabled: !hasFile
            },
            on: {
              click: this.importEvent
            }
          }, GlobalConfig.i18n('vxe.import.impConfirm'))
        ])
      ])
    ])
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
      const $xetable = this.$parent
      $xetable.readFile(this.defaultOptions).then(evnt => {
        const file = evnt.target.files[0]
        Object.assign(this.storeData, UtilTools.parseFile(file), { file })
      }).catch(e => e)
    },
    importEvent () {
      const $xetable = this.$parent
      this.loading = true
      $xetable.importByFile(this.storeData.file, Object.assign({}, $xetable.importOpts, this.defaultOptions)).then(() => {
        this.loading = false
        this.storeData.visible = false
      })
    }
  }
}

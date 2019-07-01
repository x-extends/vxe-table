import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

export default {
  name: 'VxeToolbar',
  props: {
    id: String,
    setting: { type: [Boolean, Object], default: () => GlobalConfig.toolbar.setting },
    buttons: { type: Array, default: () => GlobalConfig.toolbar.buttons },
    size: String,
    data: Array,
    customs: Array
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data () {
    return {
      tableCustoms: [],
      settingStore: {
        visible: false
      }
    }
  },
  computed: {
    $table () {
      let { $parent, data } = this
      let { $children } = $parent
      let selfIndex = $children.indexOf(this)
      return $children.find((comp, index) => comp && comp.refreshColumn && index > selfIndex && (data ? comp.data === data : comp.$vnode.componentOptions.tag === 'vxe-table'))
    },
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isStorage () {
      return this.setting && this.setting.storage
    },
    storageKey () {
      return GlobalConfig.toolbar.storageKey || 'VXE_TABLE_CUSTOM_HIDDEN'
    }
  },
  created () {
    let { isStorage, id, customs, setting } = this
    if (customs) {
      this.tableCustoms = customs
    }
    if (isStorage && !id) {
      throw new Error('[vxe-table] Toolbar must have a unique primary id.')
    }
    if (setting) {
      this.$nextTick(() => this.loadStorage())
    }
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
  },
  render (h) {
    let { $scopedSlots, settingStore, setting, buttons = [], vSize, tableCustoms } = this
    let customBtnOns = {}
    let customWrapperOns = {}
    let $buttons = $scopedSlots.buttons
    if (setting) {
      if (setting.trigger === 'manual') {
        // 手动触发
      } else if (setting.trigger === 'hover') {
        // hover 触发
        customBtnOns.mouseenter = this.handleMouseenterSettingEvent
        customBtnOns.mouseleave = this.handleMouseleaveSettingEvent
        customWrapperOns.mouseenter = this.handleWrapperMouseenterEvent
        customWrapperOns.mouseleave = this.handleWrapperMouseleaveEvent
      } else {
        // 点击触发
        customBtnOns.click = this.handleClickSettingEvent
      }
    }
    return h('div', {
      class: ['vxe-toolbar', {
        [`size--${vSize}`]: vSize
      }]
    }, [
      h('div', {
        class: 'vxe-button--wrapper'
      }, $buttons ? $buttons() : buttons.map(item => {
        return h('vxe-button', {
          on: {
            click: evnt => this.btnEvent(item, evnt)
          }
        }, XEUtils.isFunction(item.name) ? item.name() : item.name)
      })),
      setting ? h('div', {
        class: ['vxe-custom--wrapper', {
          'is--active': settingStore.visible
        }],
        ref: 'customWrapper'
      }, [
        h('div', {
          class: 'vxe-custom--setting-btn',
          on: customBtnOns
        }, [
          h('i', {
            class: 'vxe-icon--menu'
          })
        ]),
        h('div', {
          class: 'vxe-custom--option-wrapper'
        }, [
          h('div', {
            class: 'vxe-custom--option',
            on: customWrapperOns
          }, tableCustoms.map(column => {
            let { property, visible, own } = column
            let headerTitle = own.title || own.label
            return property && headerTitle ? h('vxe-checkbox', {
              props: {
                value: visible
              },
              on: {
                change: value => {
                  column.visible = value
                  if (setting && setting.immediate) {
                    this.updateSetting()
                  }
                }
              }
            }, headerTitle) : null
          }))
        ])
      ]) : null
    ])
  },
  methods: {
    openSetting () {
      this.settingStore.visible = true
    },
    closeSetting () {
      let { setting, settingStore } = this
      if (settingStore.visible) {
        settingStore.visible = false
        if (setting && !setting.immediate) {
          this.updateSetting()
        }
      }
    },
    loadStorage () {
      if (this.isStorage) {
        let customStorageMap = this.getStorageMap()
        let customStorage = customStorageMap[this.id]
        if (customStorage) {
          this.updateCustoms(customStorage.split(',').map(prop => ({ prop, visible: false })))
        } else {
          this.updateCustoms(this.tableCustoms)
        }
      } else {
        this.updateCustoms(this.tableCustoms)
      }
    },
    updateCustoms (customs) {
      let { $grid, $table } = this
      let comp = $grid || $table
      if (comp) {
        comp.reloadCustoms(customs).then(customs => {
          this.tableCustoms = customs
        })
      }
    },
    getStorageMap () {
      let version = GlobalConfig.version
      let rest = XEUtils.toStringJSON(localStorage.getItem(this.storageKey))
      return rest && rest._v === version ? rest : { _v: version }
    },
    saveStorageMap () {
      let { id, tableCustoms, isStorage, storageKey } = this
      if (isStorage) {
        let customStorageMap = this.getStorageMap()
        customStorageMap[id] = tableCustoms.filter(column => !column.visible).map(column => column.property).join(',') || undefined
        localStorage.setItem(storageKey, XEUtils.toJSONString(customStorageMap))
      }
      return this.$nextTick()
    },
    hideColumn (column) {
      column.visible = false
      return this.updateSetting()
    },
    showColumn (column) {
      let { tableCustoms } = this
      if (column) {
        column.visible = true
      } else {
        tableCustoms.forEach(column => {
          column.visible = true
        })
      }
      return this.updateSetting()
    },
    updateSetting () {
      let { $grid, $table } = this
      if ($grid || $table) {
        ($grid || $table).refreshColumn()
        return this.saveStorageMap()
      }
      throw new Error('[vxe-toolbar] Not found vxe-table.')
    },
    handleGlobalMousedownEvent (evnt) {
      if (!DomTools.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.closeSetting()
      }
    },
    handleGlobalBlurEvent (evnt) {
      this.closeSetting()
    },
    handleClickSettingEvent (evnt) {
      let { settingStore } = this
      settingStore.visible = !settingStore.visible
    },
    handleMouseenterSettingEvent (evnt) {
      this.settingStore.activeBtn = true
      this.openSetting()
    },
    handleMouseleaveSettingEvent (evnt) {
      let { settingStore } = this
      settingStore.activeBtn = false
      setTimeout(() => {
        if (!settingStore.activeBtn && !settingStore.activeWrapper) {
          this.closeSetting()
        }
      }, 300)
    },
    handleWrapperMouseenterEvent (evnt) {
      this.settingStore.activeWrapper = true
      this.openSetting()
    },
    handleWrapperMouseleaveEvent (evnt) {
      let { settingStore } = this
      settingStore.activeWrapper = false
      setTimeout(() => {
        if (!settingStore.activeBtn && !settingStore.activeWrapper) {
          this.closeSetting()
        }
      }, 300)
    },
    btnEvent (item, evnt) {
      let { $grid } = this
      let { code } = item
      // 只对 gird 环境中有效
      if ($grid) {
        switch (code) {
          case 'insert':
            $grid.insert()
            break
          case 'insert_actived':
            $grid.insert().then(({ row }) => $grid.setActiveRow(row))
            break
          case 'mark_cancel':
            $grid.triggerPendingEvent(code, evnt)
            break
          case 'delete_selection': {
            this.handleDeleteRow($grid, code, 'vxe.grid.deleteSelectRecord', () => $grid.commitProxy('delete'))
            break
          }
          case 'remove_selection': {
            this.handleDeleteRow($grid, code, 'vxe.grid.removeSelectRecord', () => $grid.removeSelecteds())
            break
          }
          case 'save':
            $grid.commitProxy('save')
            break
          case 'reload':
            $grid.commitProxy('reload')
            break
          case 'export':
            $grid.exportCsv()
            break
        }
        UtilTools.emitEvent($grid, 'toolbar-button-click', [{ button: item, $grid }, evnt])
      }
    },
    handleDeleteRow ($grid, code, alertKey, callback) {
      let selectRecords = $grid.getSelectRecords()
      if ($grid.isMsg) {
        if (selectRecords.length) {
          this.$XMsg.confirm(GlobalConfig.i18n(alertKey)).then(callback).catch(e => e)
        } else {
          this.$XMsg.message({ id: code, message: GlobalConfig.i18n('vxe.grid.selectOneRecord'), status: 'warning' })
        }
      } else {
        if (selectRecords.length) {
          callback()
        }
      }
    }
  }
}

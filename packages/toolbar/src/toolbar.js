import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools, GlobalEvent } from '../../tools'

export default {
  name: 'VxeToolbar',
  props: {
    id: String,
    resizable: { type: [Boolean, Object], default: () => GlobalConfig.toolbar.resizable },
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
      $table: null,
      tableFullColumn: [],
      settingStore: {
        visible: false
      }
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    resizableOpts () {
      return Object.assign({ storageKey: 'VXE_TABLE_CUSTOM_COLUMN_WIDTH' }, GlobalConfig.toolbar.resizable, this.resizable)
    },
    settingOpts () {
      return Object.assign({ storageKey: 'VXE_TABLE_CUSTOM_COLUMN_HIDDEN' }, GlobalConfig.toolbar.setting, this.setting)
    }
  },
  created () {
    let { settingOpts, id, customs } = this
    if (customs) {
      this.tableFullColumn = customs
    }
    if (settingOpts.storage && !id) {
      throw new Error('[vxe-table] Toolbar must have a unique primary id.')
    }
    this.$nextTick(() => {
      this.updateConf()
      this.loadStorage()
    })
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
  },
  render (h) {
    let { $scopedSlots, $grid, $table, settingStore, setting, settingOpts, buttons = [], vSize, tableFullColumn } = this
    let customBtnOns = {}
    let customWrapperOns = {}
    let $buttons = $scopedSlots.buttons
    if (setting) {
      if (settingOpts.trigger === 'manual') {
        // 手动触发
      } else if (settingOpts.trigger === 'hover') {
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
      }, $buttons ? $buttons.call($grid || $table || this, { $grid, $table }, h) : buttons.map(item => {
        return h('vxe-button', {
          on: {
            click: evnt => this.btnEvent(item, evnt)
          }
        }, UtilTools.getFuncText(item.name))
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
          }, tableFullColumn.map(column => {
            let { property, visible, own } = column
            let headerTitle = UtilTools.getFuncText(own.title || own.label)
            return property && headerTitle ? h('vxe-checkbox', {
              props: {
                value: visible
              },
              on: {
                change: value => {
                  column.visible = value
                  if (setting && settingOpts.immediate) {
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
    updateConf () {
      let { $parent, data } = this
      let { $children } = $parent
      let selfIndex = $children.indexOf(this)
      this.$table = $children.find((comp, index) => comp && comp.refreshColumn && index > selfIndex && (data ? comp.data === data : comp.$vnode.componentOptions.tag === 'vxe-table'))
    },
    openSetting () {
      this.settingStore.visible = true
    },
    closeSetting () {
      let { setting, settingStore } = this
      if (settingStore.visible) {
        settingStore.visible = false
        if (setting && !settingStore.immediate) {
          this.updateSetting()
        }
      }
    },
    loadStorage () {
      let { $grid, $table, id, resizable, setting, resizableOpts, settingOpts } = this
      if (resizable || setting) {
        if ($grid || $table) {
          ($grid || $table).connect({ toolbar: this })
        } else {
          throw new Error('[vxe-toolbar] Not found vxe-table.')
        }
        let customMap = {}
        if (resizableOpts.storage) {
          let columnWidthStorage = this.getStorageMap(resizableOpts.storageKey)[id]
          if (columnWidthStorage) {
            XEUtils.each(columnWidthStorage, (resizeWidth, field) => {
              customMap[field] = { field, resizeWidth }
            })
          }
        }
        if (settingOpts.storage) {
          let columnHideStorage = this.getStorageMap(settingOpts.storageKey)[id]
          if (columnHideStorage) {
            columnHideStorage.split(',').forEach(field => {
              if (customMap[field]) {
                customMap[field].visible = false
              } else {
                customMap[field] = { field, visible: false }
              }
            })
          }
        }
        let customList = Object.values(customMap)
        this.updateCustoms(customList.length ? customList : this.tableFullColumn)
      }
    },
    updateColumn (fullColumn) {
      this.tableFullColumn = fullColumn
    },
    updateCustoms (customs) {
      let { $grid, $table } = this
      let comp = $grid || $table
      if (comp) {
        comp.reloadCustoms(customs).then(fullColumn => {
          this.tableFullColumn = fullColumn
        })
      }
    },
    getStorageMap (key) {
      let version = GlobalConfig.version
      let rest = XEUtils.toStringJSON(localStorage.getItem(key))
      return rest && rest._v === version ? rest : { _v: version }
    },
    saveColumnHide () {
      let { id, tableFullColumn, settingOpts } = this
      if (settingOpts.storage) {
        let columnHideStorageMap = this.getStorageMap(settingOpts.storageKey)
        let colHides = tableFullColumn.filter(column => column.property && !column.visible)
        columnHideStorageMap[id] = colHides.length ? colHides.map(column => column.property).join(',') : undefined
        localStorage.setItem(settingOpts.storageKey, XEUtils.toJSONString(columnHideStorageMap))
      }
      return this.$nextTick()
    },
    saveColumnWidth (isReset) {
      let { id, tableFullColumn, resizableOpts } = this
      if (resizableOpts.storage) {
        let columnWidthStorageMap = this.getStorageMap(resizableOpts.storageKey)
        let columnWidthStorage
        if (!isReset) {
          columnWidthStorage = XEUtils.isPlainObject(columnWidthStorageMap[id]) ? columnWidthStorageMap[id] : {}
          tableFullColumn.forEach(({ property, resizeWidth, renderWidth }) => {
            if (property && resizeWidth) {
              columnWidthStorage[property] = renderWidth
            }
          })
        }
        columnWidthStorageMap[id] = XEUtils.isEmpty(columnWidthStorage) ? undefined : columnWidthStorage
        localStorage.setItem(resizableOpts.storageKey, XEUtils.toJSONString(columnWidthStorageMap))
      }
      return this.$nextTick()
    },
    hideColumn (column) {
      console.warn('[vxe-table] The function hideColumn is deprecated')
      column.visible = false
      return this.updateSetting()
    },
    showColumn (column) {
      console.warn('[vxe-table] The function showColumn is deprecated')
      column.visible = true
      return this.updateSetting()
    },
    resetCustoms () {
      return this.updateSetting()
    },
    resetResizable () {
      this.updateResizable(this)
    },
    updateResizable (isReset) {
      let { $grid, $table } = this
      let comp = $grid || $table
      this.saveColumnWidth(isReset)
      comp.analyColumnWidth()
      return comp.recalculate(true)
    },
    updateSetting () {
      (this.$grid || this.$table).refreshColumn()
      return this.saveColumnHide()
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
      if ($grid) {
        $grid.commitProxy(item.code)
        UtilTools.emitEvent($grid, 'toolbar-button-click', [{ button: item, $grid }, evnt])
      }
    }
  }
}

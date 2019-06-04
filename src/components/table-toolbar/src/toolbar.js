import GlobalEvent from '../../../tools/event'
import DomTools from '../../../tools/dom'
import UtilTools from '../../../tools/utils'
import GlobalConfig from '../../../conf'

export default {
  name: 'VxeTableToolbar',
  props: {
    setting: [Boolean, Object],
    buttons: Array,
    size: String,
    customs: Array
  },
  inject: {
    $grid: {
      default: null
    }
  },
  data () {
    return {
      settingStore: {
        visible: false
      }
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  created () {
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent)
  },
  destroyed () {
    GlobalEvent.off(this, 'mousedown')
    GlobalEvent.off(this, 'blur')
  },
  render (h) {
    let { $slots, settingStore, setting, buttons = [], vSize, customs } = this
    let customBtnOns = {}
    let customWrapperOns = {}
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
      class: ['vxe-table-toolbar', {
        [`size--${vSize}`]: vSize
      }]
    }, [
      h('div', {
        class: 'vxe-button--wrapper'
      }, $slots.buttons ? $slots.buttons : buttons.map(item => {
        return h('vxe-button', {
          on: {
            click: evnt => this.btnEvent(item, evnt)
          }
        }, item.name)
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
          }, customs.map(column => {
            return column.property && column.label ? h('vxe-checkbox', {
              props: {
                value: column.visible
              },
              on: {
                change: value => {
                  column.visible = value
                  if (setting && setting.immediate) {
                    this.updateSetting()
                  }
                }
              }
            }, column.label) : null
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
    updateSetting () {
      let { $parent, $grid, customs } = this
      if ($grid) {
        $grid.refreshColumn()
      } else {
        let { $children } = $parent
        let selfIndex = $children.indexOf(this)
        let $table = $children.find((comp, index) => comp.refreshColumn && index > selfIndex && comp.customs === customs)
        if ($table) {
          $table.refreshColumn()
        } else {
          console.error('[vxe-table-toolbar] Not found vxe-table.')
        }
      }
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
      // 只对 gird 环境中有效
      if ($grid) {
        switch (item.code) {
          case 'insert':
            $grid.insert()
            break
          case 'insert_actived':
            $grid.insert().then(({ row }) => $grid.setActiveRow(row))
            break
          case 'delete_pending':
            $grid.triggerPendingEvent(evnt)
            break
          case 'delete_selection':
            $grid.commitProxy('delete')
            break
          case 'delete_rows':
            let selectRecords = $grid.getSelectRecords()
            if ($grid.isAlert) {
              if (selectRecords.length) {
                this.$XTool.confirm(GlobalConfig.i18n('vxe.grid.removeSelectRecord')).then(() => $grid.removeSelecteds()).catch(e => e)
              } else {
                this.$XTool.alert(GlobalConfig.i18n('vxe.grid.selectOneRecord')).catch(e => e)
              }
            } else {
              if (selectRecords.length) {
                $grid.removeSelecteds()
              }
            }
            break
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
    }
  }
}

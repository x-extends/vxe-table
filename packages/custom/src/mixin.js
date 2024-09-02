import XEUtils from 'xe-utils'

export default {
  methods: {
    _openCustom () {
      const { initStore, customStore, collectColumn } = this
      const sortMaps = {}
      const fixedMaps = {}
      const visibleMaps = {}
      XEUtils.eachTree(collectColumn, column => {
        const colid = column.getKey()
        column.renderFixed = column.fixed
        column.renderVisible = column.visible
        column.renderResizeWidth = column.renderWidth
        sortMaps[colid] = column.renderSortNumber
        fixedMaps[colid] = column.fixed
        visibleMaps[colid] = column.visible
      }, { children: 'children' })
      customStore.oldSortMaps = sortMaps
      customStore.oldFixedMaps = fixedMaps
      customStore.oldVisibleMaps = visibleMaps
      this.customColumnList = collectColumn.slice(0)
      customStore.visible = true
      initStore.custom = true
      this.checkCustomStatus()
      this.calcMaxHeight()
      return this.$nextTick().then(() => this.calcMaxHeight())
    },
    _closeCustom () {
      const { customStore, customOpts } = this
      if (customStore.visible) {
        customStore.visible = false
        if (!customOpts.immediate) {
          this.handleCustom()
        }
      }
      return this.$nextTick()
    },
    calcMaxHeight  () {
      const { $el, customStore } = this
      // 判断面板不能大于表格高度
      let tableHeight = 0
      if ($el) {
        tableHeight = $el.clientHeight - 28
      }
      customStore.maxHeight = Math.max(4, tableHeight)
    },
    checkCustomStatus () {
      const { customStore, collectColumn, customOpts } = this
      const { checkMethod } = customOpts
      customStore.isAll = collectColumn.every((column) => (checkMethod ? !checkMethod({ column }) : false) || column.renderVisible)
      customStore.isIndeterminate = !customStore.isAll && collectColumn.some((column) => (!checkMethod || checkMethod({ column })) && (column.renderVisible || column.halfVisible))
    },
    emitCustomEvent (type, evnt) {
      const comp = this.$xegrid || this
      comp.$emit('custom', { type, $table: this, $grid: this.$xegrid, $event: evnt })
    },
    triggerCustomEvent (evnt) {
      const { customStore } = this
      if (customStore.visible) {
        this.closeCustom()
        this.emitCustomEvent('close', evnt)
      } else {
        customStore.btnEl = evnt.target
        this.openCustom()
        this.emitCustomEvent('open', evnt)
      }
    },
    customOpenEvent (evnt) {
      const { customStore } = this
      if (!customStore.visible) {
        customStore.activeBtn = true
        customStore.btnEl = evnt.target
        this.openCustom()
        this.emitCustomEvent('open', evnt)
      }
    },
    customColseEvent (evnt) {
      const { customStore } = this
      if (customStore.visible) {
        customStore.activeBtn = false
        this.closeCustom()
        this.emitCustomEvent('close', evnt)
      }
    }
  }
}

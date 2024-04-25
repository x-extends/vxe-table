export default {
  methods: {
    _openCustom () {
      const { initStore, customStore } = this
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
      const { $refs, customStore } = this
      const customWrapperElem = $refs.customWrapper ? $refs.customWrapper.$el : null
      const headElem = $refs.tableHeader ? $refs.tableHeader.$el : null
      const bodyElem = $refs.tableBody ? $refs.tableBody.$el : null
      // 判断面板不能大于表格高度
      let tableHeight = 0
      if (headElem) {
        tableHeight += headElem.clientHeight
      }
      if (bodyElem) {
        tableHeight += bodyElem.clientHeight
      }
      customStore.maxHeight = Math.max(0, customWrapperElem ? Math.min(customWrapperElem.clientHeight, tableHeight - 80) : 0)
    },
    checkCustomStatus () {
      const { customStore, collectColumn, customOpts } = this
      const { checkMethod } = customOpts
      customStore.isAll = collectColumn.every((column) => (checkMethod ? !checkMethod({ column }) : false) || column.visible)
      customStore.isIndeterminate = !customStore.isAll && collectColumn.some((column) => (!checkMethod || checkMethod({ column })) && (column.visible || column.halfVisible))
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

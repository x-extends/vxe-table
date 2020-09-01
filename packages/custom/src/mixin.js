import { UtilTools } from '../../tools'

export default {
  methods: {
    _openCustom () {
      const { customConfig } = this
      if (!customConfig) {
        UtilTools.error('vxe.error.reqProp', ['custom-config'])
      }
      Object.assign(this.customStore, {
        visible: true
      })
      this.initStore.custom = true
      return this.$nextTick()
    }
  }
}

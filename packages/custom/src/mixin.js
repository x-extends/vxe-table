import { UtilTools } from '../../tools'

export default {
  methods: {
    _openCustom () {
      const { customConfig } = this
      if (!customConfig) {
        UtilTools.error('vxe.error.reqProp', ['custom-config'])
      }
      // 更新条件
      Object.assign(this.customStore, {
        visible: true
      })
      return this.$nextTick()
    }
  }
}

import GlobalConfig from '../../v-x-e-table/src/conf'

export default {
  name: 'VxeLoading',
  props: {
    value: Boolean,
    icon: String,
    text: String
  },
  computed: {
    loadingIcon () {
      return this.icon || GlobalConfig.icon.LOADING
    },
    loadingText () {
      const loadingText = GlobalConfig.loadingText
      return this.text || (loadingText === null ? loadingText : GlobalConfig.i18n('vxe.loading.text'))
    }
  },
  render (h) {
    const { $scopedSlots, loadingIcon, loadingText } = this
    const defaultSlot = $scopedSlots.default
    return h('div', {
      class: ['vxe-loading', {
        'is--visible': this.value
      }]
    }, defaultSlot ? [
      h('div', {
        class: 'vxe-loading--warpper'
      }, defaultSlot.call(this, {}))
    ] : [
      h('div', {
        class: 'vxe-loading--chunk'
      }, [
        loadingIcon ? h('i', {
          class: loadingIcon
        }) : h('div', {
          class: 'vxe-loading--spinner'
        }),
        loadingText ? h('div', {
          class: 'vxe-loading--text'
        }, `${loadingText}`) : null
      ])
    ])
  }
}

import GlobalConfig from '../../v-x-e-table/src/conf'

export default {
  name: 'VxeLoading',
  props: {
    loading: Boolean
  },
  render (h) {
    const icon = GlobalConfig.icon.LOADING
    const loadingText = GlobalConfig.loadingText
    const text = loadingText === null ? loadingText : GlobalConfig.i18n('vxe.loading.text')
    return h('div', {
      class: ['vxe-loading', {
        'is--visible': this.loading
      }]
    }, [
      h('div', {
        class: 'vxe-loading--chunk'
      }, [
        icon ? h('i', {
          class: icon
        }) : h('div', {
          class: 'vxe-loading--spinner'
        }),
        text ? h('div', {
          class: 'vxe-loading--text'
        }, `${text}`) : null
      ])
    ])
  }
}

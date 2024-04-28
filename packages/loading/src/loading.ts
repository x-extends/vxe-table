import { defineComponent, h, computed } from 'vue'
import GlobalConfig from '../../v-x-e-table/src/conf'

export default defineComponent({
  name: 'VxeLoading',
  props: {
    modelValue: Boolean,
    icon: String,
    text: String
  },
  setup (props, { slots }) {
    const computeLoadingIcon = computed(() => {
      return props.icon || GlobalConfig.icon.LOADING
    })

    const computeLoadingText = computed(() => {
      const loadingText = GlobalConfig.loadingText
      return props.text || (loadingText === null ? loadingText : GlobalConfig.i18n('vxe.loading.text'))
    })

    return () => {
      const loadingIcon = computeLoadingIcon.value
      const loadingText = computeLoadingText.value
      return h('div', {
        class: ['vxe-loading', {
          'is--visible': props.modelValue
        }]
      }, slots.default ? [
        h('div', {
          class: 'vxe-loading--wrapper'
        }, slots.default({}))
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
})

import { defineComponent, h, onUnmounted, provide, inject, ref, Ref, nextTick } from 'vue'
import { XEOptionInstance, createOption, watchOption, destroyOption, assemOption } from './util'

const optgroupProps = {
  label: { type: [String, Number, Boolean], default: '' },
  visible: { type: Boolean, default: null },
  disabled: Boolean
}

export default defineComponent({
  name: 'VxeOptgroup',
  props: optgroupProps,
  setup (props, { slots }) {
    const elem = ref() as Ref<HTMLDivElement>
    const $xeselect = inject('$xeselect', null as any)
    const option = createOption($xeselect, props)
    const xeoption: XEOptionInstance = { option }
    option.options = []

    provide('xeoptgroup', xeoption)

    watchOption(props, option)

    nextTick(() => {
      assemOption($xeselect, elem.value, option)
    })

    onUnmounted(() => {
      destroyOption($xeselect, option)
    })

    return () => {
      return h('div', {
        ref: elem
      }, slots.default ? slots.default() : [])
    }
  }
})

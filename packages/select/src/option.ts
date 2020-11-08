import { defineComponent, h, onUnmounted, inject, ref, Ref, nextTick } from 'vue'
import { XEOptionInstance, createOption, watchOption, destroyOption, assemOption } from './util'

const optionProps = {
  value: null,
  label: { type: [String, Number, Boolean], default: '' },
  visible: { type: Boolean, default: null },
  disabled: Boolean
}

export default defineComponent({
  name: 'VxeOption',
  props: optionProps,
  setup (props, { slots }) {
    const elem = ref() as Ref<HTMLDivElement>
    const $xeselect = inject('$xeselect', null as any)
    const optgroup = inject('xeoptgroup', null as XEOptionInstance | null)
    const option = createOption($xeselect, props)
    option.slots = slots

    watchOption(props, option)

    nextTick(() => {
      assemOption($xeselect, elem.value, option, optgroup)
    })

    onUnmounted(() => {
      destroyOption($xeselect, option)
    })

    return () => {
      return h('div', {
        ref: elem
      })
    }
  }
})

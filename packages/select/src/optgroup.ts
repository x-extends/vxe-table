import { defineComponent, h, onUnmounted, provide, inject, ref, Ref, onMounted, PropType } from 'vue'
import { XEOptionProvide, createOption, watchOption, destroyOption, assemOption } from './util'

import { VxeSelectConstructor, VxeOptionPropTypes } from '../../../types/all'

export default defineComponent({
  name: 'VxeOptgroup',
  props: {
    label: { type: [String, Number, Boolean] as PropType<VxeOptionPropTypes.Label>, default: '' },
    visible: { type: Boolean as PropType<VxeOptionPropTypes.Visible>, default: null },
    className: [String, Function] as PropType<VxeOptionPropTypes.ClassName>,
    disabled: Boolean as PropType<VxeOptionPropTypes.Disabled>
  },
  setup (props, { slots }) {
    const elem = ref() as Ref<HTMLDivElement>
    const $xeselect = inject('$xeselect', {} as VxeSelectConstructor)
    const option = createOption($xeselect, props)
    const xeoption: XEOptionProvide = { option }
    option.options = []

    provide('xeoptgroup', xeoption)

    watchOption(props, option)

    onMounted(() => {
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

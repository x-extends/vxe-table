import { defineComponent, h, onUnmounted, inject, ref, Ref, onMounted, PropType } from 'vue'
import { XEOptionProvide, createOption, watchOption, destroyOption, assemOption } from './util'

import { VxeSelectConstructor, VxeOptionPropTypes } from '../../../types/all'

export default defineComponent({
  name: 'VxeOption',
  props: {
    value: null,
    label: { type: [String, Number, Boolean] as PropType<VxeOptionPropTypes.Label>, default: '' },
    visible: { type: Boolean as PropType<VxeOptionPropTypes.Visible>, default: null },
    className: [String, Function] as PropType<VxeOptionPropTypes.ClassName>,
    disabled: Boolean as PropType<VxeOptionPropTypes.Disabled>
  },
  setup (props, { slots }) {
    const elem = ref() as Ref<HTMLDivElement>
    const $xeselect = inject('$xeselect', {} as VxeSelectConstructor)
    const optgroup = inject('xeoptgroup', null as XEOptionProvide | null)
    const option = createOption($xeselect, props)
    option.slots = slots

    watchOption(props, option)

    onMounted(() => {
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

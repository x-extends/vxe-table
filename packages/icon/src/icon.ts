import { defineComponent, h, PropType } from 'vue'

import { VxeIconPropTypes, VxeIconEmits } from '../../../types/all'

export default defineComponent({
  name: 'VxeIcon',
  props: {
    name: String as PropType<VxeIconPropTypes.Name>,
    roll: Boolean as PropType<VxeIconPropTypes.Roll>
  },
  emits: [
    'click'
  ] as VxeIconEmits,
  setup (props, { emit }) {
    const clickEvent = (evnt: KeyboardEvent) => {
      emit('click', { $event: evnt })
    }
    return () => {
      return h('i', {
        class: [`vxe-icon-${props.name}`, props.roll ? 'roll' : ''],
        onClick: clickEvent
      })
    }
  }
})

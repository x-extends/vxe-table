import { defineComponent, h, PropType } from 'vue'

import { VxeIconPropTypes, VxeIconEmits } from '../../../types/all'

export default defineComponent({
  name: 'VxeIcon',
  props: {
    name: String as PropType<VxeIconPropTypes.Name>,
    roll: Boolean as PropType<VxeIconPropTypes.Roll>,
    status: String as PropType<VxeIconPropTypes.Status>
  },
  emits: [
    'click'
  ] as VxeIconEmits,
  setup (props, { emit }) {
    const clickEvent = (evnt: KeyboardEvent) => {
      emit('click', { $event: evnt })
    }
    return () => {
      const { name, roll, status } = props
      return h('i', {
        class: [`vxe-icon-${name}`, roll ? 'roll' : '', status ? [`theme--${status}`] : ''],
        onClick: clickEvent
      })
    }
  }
})

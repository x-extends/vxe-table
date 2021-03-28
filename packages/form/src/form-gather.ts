import { defineComponent, h, onUnmounted, inject, ref, Ref, onMounted, provide } from 'vue'
import { createItem, watchItem, destroyItem, assemItem, XEFormItemProvide } from './util'
import { formItemProps } from './form-item'

import { VxeFormConstructor } from '../../../types/all'

export default defineComponent({
  name: 'VxeFormGather',
  props: formItemProps,
  setup (props, { slots }) {
    const refElem = ref() as Ref<HTMLDivElement>
    const $xeform = inject('$xeform', {} as VxeFormConstructor)
    const formGather = inject('xeformgather', null as XEFormItemProvide | null)
    const formItem = createItem($xeform, props)
    const xeformitem: XEFormItemProvide = { formItem }
    formItem.children = []

    provide('xeformgather', xeformitem)

    watchItem(props, formItem)

    onMounted(() => {
      assemItem($xeform, refElem.value, formItem, formGather)
    })

    onUnmounted(() => {
      destroyItem($xeform, formItem)
    })

    const renderVN = () => {
      return h('div', {
        ref: refElem
      }, slots.default ? slots.default() : [])
    }

    return renderVN
  }
})

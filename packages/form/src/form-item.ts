import { defineComponent, h, onUnmounted, inject, ref, Ref, nextTick } from 'vue'
import { createItem, watchItem, destroyItem, assemItem } from './util'

import { VxeFormConstructor } from '../../../types/vxe-table'

const itemProps = {
  title: String,
  field: String,
  size: String,
  span: [String, Number],
  align: String,
  titleAlign: String,
  titleWidth: [String, Number],
  titlePrefix: Object,
  titleSuffix: Object,
  resetValue: { default: null },
  visibleMethod: Function,
  visible: { type: Boolean, default: null },
  folding: Boolean,
  collapseNode: Boolean,
  itemRender: Object
}

export default defineComponent({
  name: 'VxeFormItem',
  props: itemProps,
  setup (props, { slots }) {
    const refElem = ref() as Ref<HTMLDivElement>
    const $xeform = inject('$xeform', {} as VxeFormConstructor)
    const formItem = createItem($xeform, props)
    formItem.slots = slots

    watchItem(props, formItem)

    nextTick(() => {
      assemItem($xeform, refElem.value, formItem)
    })

    onUnmounted(() => {
      destroyItem($xeform, formItem)
    })

    const renderVN = () => {
      return h('div', {
        ref: refElem
      })
    }

    return renderVN
  }
})

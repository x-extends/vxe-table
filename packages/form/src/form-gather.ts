import { defineComponent, h, onUnmounted, inject, ref, Ref, reactive, onMounted, provide, nextTick } from 'vue'
import { errLog } from '../../tools/log'
import { createItem, watchItem, destroyItem, assemItem, XEFormItemProvide } from './util'
import { formItemProps } from './form-item'

import { VxeFormConstructor, VxeFormPrivateMethods } from '../../../types/all'

export default defineComponent({
  name: 'VxeFormGather',
  props: formItemProps,
  setup (props, { slots }) {
    const refElem = ref() as Ref<HTMLDivElement>
    const $xeform = inject('$xeform', {} as VxeFormConstructor & VxeFormPrivateMethods)
    const formGather = inject('$xeformgather', null as XEFormItemProvide | null)
    const defaultSlot = slots.default
    const formItem = reactive(createItem($xeform, props))
    const xeformitem: XEFormItemProvide = { formItem }
    const xeformiteminfo = { itemConfig: formItem }
    formItem.children = []

    provide('$xeformiteminfo', xeformiteminfo)
    provide('$xeformgather', xeformitem)
    provide('$xeformitem', null)

    watchItem(props, formItem)

    onMounted(() => {
      assemItem($xeform, refElem.value, formItem, formGather)
    })

    onUnmounted(() => {
      destroyItem($xeform, formItem)
    })

    if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
      nextTick(() => {
        if ($xeform && $xeform.props.customLayout) {
          errLog('vxe.error.errConflicts', ['custom-layout', '<form-gather ...>'])
        }
      })
    }

    const renderVN = () => {
      return h('div', {
        ref: refElem
      }, defaultSlot ? defaultSlot() : [])
    }

    const $xeformgather = {
      renderVN
    }

    return $xeformgather
  },
  render () {
    return this.renderVN()
  }
})

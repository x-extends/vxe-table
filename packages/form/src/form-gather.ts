import { defineComponent, h, onUnmounted, inject, ref, Ref, reactive, onMounted, provide } from 'vue'
import { createItem, watchItem, destroyItem, assemItem, XEFormItemProvide } from './util'
import { formItemProps } from './form-item'
import XEUtils from 'xe-utils'

import { VxeFormConstructor, VxeFormPrivateMethods } from '../../../types/all'

export default defineComponent({
  name: 'VxeFormGather',
  props: formItemProps,
  setup (props, { slots }) {
    const refElem = ref() as Ref<HTMLDivElement>
    const $xeform = inject('$xeform', {} as VxeFormConstructor & VxeFormPrivateMethods)
    const formGather = inject('$xeformgather', null as XEFormItemProvide | null)
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

    const renderVN = () => {
      const { className, field } = props
      const span = props.span || ($xeform ? $xeform.props.span : null)
      const defaultSlot = slots.default
      return h('div', {
        ref: refElem,
        class: ['vxe-form--gather vxe-form--item-row', formItem.id, span ? `vxe-form--item-col_${span} is--span` : '', className ? (XEUtils.isFunction(className) ? className({ $form: $xeform, data: $xeform ? $xeform.props.data : {}, item: formItem as any, field: field as string, property: field as string }) : className) : '']
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

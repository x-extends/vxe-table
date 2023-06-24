import { defineComponent, h, onUnmounted, provide, inject, ref, Ref, onMounted, Slot } from 'vue'
import { columnProps } from './column'
import { XEColumnInstance, watchColumn, assemColumn, destroyColumn } from '../../table/src/util'
import Cell from '../../table/src/cell'

import { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types/all'

export default defineComponent({
  name: 'VxeColgroup',
  props: columnProps,
  setup (props, { slots }) {
    const refElem = ref() as Ref<HTMLDivElement>
    const $xetable = inject('$xetable', {} as VxeTableConstructor & VxeTablePrivateMethods)
    const colgroup = inject('xecolgroup', null as XEColumnInstance | null)
    const column = Cell.createColumn($xetable, props)
    const columnSlots: {
      header?: Slot;
    } = {}
    if (slots.header) {
      columnSlots.header = slots.header
    }
    const xecolumn: XEColumnInstance = { column }
    column.slots = columnSlots
    column.children = []

    provide('xecolgroup', xecolumn)
    provide('$xegrid', null)

    watchColumn($xetable, props, column)

    onMounted(() => {
      assemColumn($xetable, refElem.value, column, colgroup)
    })

    onUnmounted(() => {
      destroyColumn($xetable, column)
    })

    const renderVN = () => {
      return h('div', {
        ref: refElem
      }, slots.default ? slots.default() : [])
    }

    return renderVN
  }
})

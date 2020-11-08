import { defineComponent, h, onUnmounted, provide, inject, ref, Ref, nextTick } from 'vue'
import { columnProps } from './column'
import { XEColumnInstance, watchColumn, assemColumn, destroyColumn } from '../../table/src/util'
import Cell from '../../table/src/cell'

import { VxeTableConstructor } from '../../../types/vxe-table'

export default defineComponent({
  name: 'VxeTableColgroup',
  props: columnProps,
  setup (props, { slots }) {
    const refElem = ref() as Ref<HTMLDivElement>
    const $xetable = inject('$xetable', {} as VxeTableConstructor)
    const colgroup = inject('xecolgroup', null as XEColumnInstance | null)
    const column = Cell.createColumn($xetable, props)
    const xecolumn: XEColumnInstance = { column }
    column.children = []

    provide('xecolgroup', xecolumn)

    watchColumn(props, column)

    nextTick(() => {
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

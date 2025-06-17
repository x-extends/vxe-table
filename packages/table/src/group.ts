import { h, onUnmounted, provide, inject, ref, onMounted, Slot, createCommentVNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { columnProps } from './column'
import { XEColumnInstance, watchColumn, assembleColumn, destroyColumn } from './util'
import Cell from './cell'

import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeColgroup',
  props: columnProps,
  setup (props, { slots }) {
    const refElem = ref<HTMLDivElement>()
    const $xeTable = inject<(VxeTableConstructor & VxeTablePrivateMethods) | null>('$xeTable', null)
    const $xeParentColgroup = inject<XEColumnInstance | null>('$xeColgroup', null)
    if (!$xeTable) {
      return () => createCommentVNode()
    }
    const columnConfig = Cell.createColumn($xeTable, props)
    const columnSlots: {
      header?: Slot
    } = {}

    if (slots.header) {
      columnSlots.header = slots.header
    }

    columnConfig.slots = columnSlots
    columnConfig.children = []

    watchColumn($xeTable, props, columnConfig)

    onMounted(() => {
      const elem = refElem.value
      if (elem) {
        assembleColumn($xeTable, elem, columnConfig, $xeParentColgroup)
      }
    })

    onUnmounted(() => {
      destroyColumn($xeTable, columnConfig)
    })

    const renderVN = () => {
      return h('div', {
        ref: refElem
      }, slots.default ? slots.default() : [])
    }

    const $xeColgroup = { columnConfig } as XEColumnInstance

    provide('$xeColgroup', $xeColgroup)
    provide('$xeGrid', null)

    return renderVN
  }
})

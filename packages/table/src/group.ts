import { CreateElement } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { assembleColumn, destroyColumn } from './util'
import { columnProps, columnWatch } from './column'
import Cell from './cell'

import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types'

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeColgroup',
  props: columnProps,
  provide () {
    const $xeColgroup = this
    return {
      $xeColumn: $xeColgroup,
      $xeGrid: null,
      $xeGantt: null
    }
  },
  inject: {
    $xeTable: {
      default: null
    },
    $xeColumn: {
      default: null
    }
  },
  watch: columnWatch,
  created () {
    const $xeColgroup = this
    const props = $xeColgroup
    const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

    this.columnConfig = Cell.createColumn($xeTable, props)
  },
  mounted () {
    const $xeColgroup = this

    const { $scopedSlots } = this
    const columnSlots: {
      header?: any
      title?: any
    } = {}

    if ($scopedSlots.header) {
      columnSlots.header = $scopedSlots.header
    }
    if ($scopedSlots.title) {
      columnSlots.title = $scopedSlots.title
    }
    this.columnConfig.slots = columnSlots
    assembleColumn($xeColgroup)
  },
  destroyed () {
    const $xeColgroup = this

    destroyColumn($xeColgroup)
  },
  render (h: CreateElement) {
    return h('div', this.$slots.default)
  },
  methods: Cell as any
}) /* define-vxe-component end */

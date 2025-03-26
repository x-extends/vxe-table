import Cell from './cell'
import { defineVxeComponent } from '../../ui/src/comp'
import { assembleColumn, destroyColumn } from './util'
import { columnProps, columnWatch } from './column'

import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types'

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeColgroup',
  props: columnProps,
  provide () {
    return {
      $xeColumn: this,
      $xeGrid: null
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
  created (this: any) {
    const $xeTable = this.$xeTable as VxeTableConstructor & VxeTablePrivateMethods

    this.columnConfig = this.createColumn($xeTable, this)
  },
  mounted () {
    const { $scopedSlots } = this
    const columnSlots: {
      header?: any
    } = {}

    if ($scopedSlots.header) {
      columnSlots.header = $scopedSlots.header
    }
    this.columnConfig.slots = columnSlots
    assembleColumn(this)
  },
  destroyed () {
    destroyColumn(this)
  },
  render (this: any, h: any) {
    return h('div', this.$slots.default)
  },
  methods: Cell
}) /* define-vxe-component end */

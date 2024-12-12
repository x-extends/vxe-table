import Cell from './cell'
import { defineVxeComponent } from '../../ui/src/comp'
import { assembleColumn, destroyColumn } from './util'
import { columnProps, columnWatch } from './column'

export default defineVxeComponent({
  name: 'VxeColgroup',
  props: columnProps,
  provide () {
    return {
      $xecolumn: this,
      $xegrid: null
    }
  },
  inject: {
    $xetable: {
      default: null
    },
    $xecolumn: {
      default: null
    }
  },
  watch: columnWatch,
  created (this: any) {
    this.columnConfig = this.createColumn(this.$xetable, this)
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
})

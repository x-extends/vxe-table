import { createItem, destroyItem, assemItem } from './util'

const props = {
  title: String,
  field: String,
  size: String,
  span: [String, Number],
  align: String,
  titleAlign: String,
  titleWidth: [String, Number],
  className: [String, Function],
  titleOverflow: { type: [Boolean, String], default: null },
  titlePrefix: Object,
  titleSuffix: Object,
  resetValue: { default: null },
  visible: { type: Boolean, default: null },
  visibleMethod: Function,
  folding: Boolean,
  collapseNode: Boolean,
  itemRender: Object
}

const watch = {}
Object.keys(props).forEach(name => {
  watch[name] = function (value) {
    this.itemConfig.update(name, value)
  }
})

export default {
  name: 'VxeFormItem',
  props,
  inject: {
    $xeform: {
      default: null
    },
    xeformgather: {
      default: null
    }
  },
  watch,
  mounted () {
    assemItem(this)
  },
  created () {
    this.itemConfig = createItem(this.$xeform, this)
  },
  destroyed () {
    destroyItem(this)
  },
  render (h) {
    return h('div')
  }
}

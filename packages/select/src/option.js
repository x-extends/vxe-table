import { createOption, destroyOption, assemOption } from './util'

const props = {
  value: null,
  label: { type: [String, Number, Boolean], default: '' },
  visible: { type: Boolean, default: null },
  disabled: Boolean
}

const watch = {}
Object.keys(props).forEach(name => {
  watch[name] = function (value) {
    this.optionConfig.update(name, value)
  }
})

export default {
  name: 'VxeOption',
  props,
  inject: {
    $xeselect: {
      default: null
    },
    $xeoptgroup: {
      default: null
    }
  },
  watch,
  mounted () {
    assemOption(this)
  },
  created () {
    this.optionConfig = createOption(this.$xeselect, this)
  },
  destroyed () {
    destroyOption(this)
  },
  render (h) {
    return h('div')
  }
}

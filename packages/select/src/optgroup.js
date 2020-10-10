import { createOption, destroyOption, assemOption } from './util'

const props = {
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
  name: 'VxeOptgroup',
  props,
  provide () {
    return {
      $xeoptgroup: this
    }
  },
  inject: {
    $xeselect: {
      default: null
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
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
    return h('div', this.$slots.default)
  }
}

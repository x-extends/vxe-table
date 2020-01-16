import XEUtils from 'xe-utils'

export default {
  name: 'VxeForm',
  props: {
    data: Object,
    size: String,
    span: [String, Number],
    align: String,
    titleAlign: String,
    titleWidth: [String, Number]
  },
  data () {
    return {
      collapseAll: true,
      sourceData: null
    }
  },
  provide () {
    return {
      $vxeform: this
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  watch: {
    data () {
      this.loadForm()
    }
  },
  created () {
    this.loadForm()
  },
  render (h) {
    return h('form', {
      class: ['vxe-form', 'vxe-row', {
        [`size--${this.vSize}`]: this.vSize
      }],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, this.$slots.default)
  },
  methods: {
    loadForm () {
      if (this.data) {
        this.sourceData = XEUtils.clone(this.data, true)
      }
    },
    toggleCollapse () {
      this.collapseAll = !this.collapseAll
      return this.$nextTick()
    },
    submitEvent (evnt) {
      evnt.preventDefault()
      this.$emit('submit', { data: this.data }, evnt)
    },
    resetEvent (evnt) {
      evnt.preventDefault()
      const { data, sourceData } = this
      if (data) {
        this.$children.forEach(({ field }) => {
          if (field) {
            XEUtils.set(data, field, XEUtils.get(sourceData, field, null))
          }
        })
      }
      this.$emit('reset', { data }, evnt)
    }
  }
}

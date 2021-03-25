import VxeFormItem from './form-item'

export default {
  name: 'VxeFormGather',
  extends: VxeFormItem,
  provide () {
    return {
      xeformgather: this
    }
  },
  render (h) {
    return h('div', this.$slots.default)
  }
}

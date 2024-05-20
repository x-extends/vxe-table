import VxeFormItem from './form-item'
import XEUtils from 'xe-utils'

export default {
  name: 'VxeFormGather',
  extends: VxeFormItem,
  provide () {
    return {
      $xeformgather: this,
      xeformitem: null,
      $xeformiteminfo: this
    }
  },
  render (h) {
    const { $xeform, className, field, itemConfig } = this
    const span = this.span || ($xeform ? $xeform.props.span : null)
    return $xeform && $xeform.customLayout ? h('div', {
      class: ['vxe-form--gather vxe-form--item-row', itemConfig.id, span ? `vxe-form--item-col_${span} is--span` : '', className ? (XEUtils.isFunction(className) ? className({ $form: $xeform, data: $xeform ? $xeform.props.data : {}, item: itemConfig, field, property: field }) : className) : '']
    }, this.$slots.default) : h('div')
  }
}

import VXETable from '../../v-x-e-table'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeFormItem',
  props: {
    title: String,
    field: String,
    itemRender: Object
  },
  inject: {
    $vxeform: {
      default: null
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    }
  },
  render (h) {
    const { $vxeform, title, field, itemRender } = this
    const compConf = itemRender ? VXETable.renderer.get(itemRender.name) : null
    return h('div', {
      class: 'vxe-form--item'
    }, [
      title ? h('div', {
        class: 'vxe-form--item-title'
      }, UtilTools.getFuncText(title)) : null,
      h('div', {
        class: 'vxe-form--item-content'
      }, compConf && compConf.renderItem ? compConf.renderItem.call(this, h, itemRender, { data: $vxeform ? $vxeform.data : null, field, property: field }, { $form: $vxeform }) : this.$slots.default)
    ])
  }
}

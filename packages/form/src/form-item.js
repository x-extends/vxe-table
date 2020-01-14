import VXETable from '../../v-x-e-table'
import { UtilTools } from '../../tools'

export default {
  name: 'VxeFormItem',
  props: {
    title: String,
    field: String,
    span: [String, Number],
    titleAlign: String,
    titleWidth: [String, Number],
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
    const span = this.span || $vxeform.span
    const titleAlign = this.titleAlign || $vxeform.titleAlign
    const titleWidth = this.titleWidth || $vxeform.titleWidth
    return h('div', {
      class: ['vxe-form--item', titleAlign ? `align--${titleAlign}` : null, span ? `vxe-col--${span} is--span` : null, title ? `is--title` : null]
    }, [
      h('div', {
        class: 'vxe-form--item-inner'
      }, [
        title ? h('div', {
          class: 'vxe-form--item-title',
          style: titleWidth ? {
            width: isNaN(titleWidth) ? titleWidth : `${titleWidth}px`
          } : null
        }, UtilTools.getFuncText(title)) : null,
        h('div', {
          class: 'vxe-form--item-content'
        }, compConf && compConf.renderItem ? compConf.renderItem.call(this, h, itemRender, { data: $vxeform ? $vxeform.data : null, field, property: field }, { $form: $vxeform }) : this.$slots.default)
      ])
    ])
  }
}

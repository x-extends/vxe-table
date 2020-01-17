import VXETable from '../../v-x-e-table'
import { UtilTools } from '../../tools'
import GlobalConfig from '../../conf'

function renderPrefixIcon (h, titlePrefix) {
  return h('span', {
    class: 'vxe-form--item-title-prefix'
  }, [
    h('i', {
      class: titlePrefix.icon || GlobalConfig.icon.formPrefix
    })
  ])
}

function renderTitle (h, _vm) {
  const { title, titlePrefix } = _vm
  const titles = []
  if (titlePrefix) {
    titles.push(
      titlePrefix.message
        ? h('vxe-tooltip', {
          props: {
            content: titlePrefix.message,
            enterable: titlePrefix.enterable
          }
        }, [
          renderPrefixIcon(h, titlePrefix)
        ])
        : renderPrefixIcon(h, titlePrefix)
    )
  }
  titles.push(
    h('span', UtilTools.getFuncText(title))
  )
  return titles
}

export default {
  name: 'VxeFormItem',
  props: {
    title: String,
    field: String,
    size: String,
    span: [String, Number],
    align: String,
    titleAlign: String,
    titleWidth: [String, Number],
    titlePrefix: Object,
    folding: Boolean,
    collapseNode: Boolean,
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
    const { $scopedSlots, $vxeform, title, folding, field, collapseNode, itemRender } = this
    const compConf = itemRender ? VXETable.renderer.get(itemRender.name) : null
    const span = this.span || $vxeform.span
    const align = this.align || $vxeform.align
    const titleAlign = this.titleAlign || $vxeform.titleAlign
    const titleWidth = this.titleWidth || $vxeform.titleWidth
    const collapseAll = $vxeform.collapseAll
    return h('div', {
      class: ['vxe-form--item', span ? `vxe-col--${span} is--span` : null, {
        'is--title': title,
        'is--hidden': folding && collapseAll
      }]
    }, [
      h('div', {
        class: 'vxe-form--item-inner'
      }, [
        title ? h('div', {
          class: ['vxe-form--item-title', titleAlign ? `align--${titleAlign}` : null],
          style: titleWidth ? {
            width: isNaN(titleWidth) ? titleWidth : `${titleWidth}px`
          } : null
        }, renderTitle(h, this)) : null,
        h('div', {
          class: ['vxe-form--item-content', align ? `align--${align}` : null]
        }, (compConf && compConf.renderItem ? compConf.renderItem.call(this, h, itemRender, { data: $vxeform.data, field, property: field }, { $form: $vxeform }) : ($scopedSlots.default ? $scopedSlots.default.call(this) : [])).concat(
          collapseNode ? [
            h('div', {
              class: 'vxe-form--item-trigger-node',
              on: {
                click: this.toggleCollapseEvent
              }
            }, [
              h('span', {
                class: 'vxe-form--item-trigger-text'
              }, collapseAll ? GlobalConfig.i18n('vxe.form.unfolding') : GlobalConfig.i18n('vxe.form.folding')),
              h('i', {
                class: ['vxe-form--item-trigger-icon', collapseAll ? GlobalConfig.icon.formFolding : GlobalConfig.icon.formUnfolding]
              })
            ])
          ] : [])
        )
      ])
    ])
  },
  methods: {
    toggleCollapseEvent (evnt) {
      this.$vxeform.$emit('toggle-collapse', { data: this.$vxeform.data }, evnt)
      this.$vxeform.toggleCollapse()
    }
  }
}

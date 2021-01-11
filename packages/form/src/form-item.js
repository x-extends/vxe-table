import XEUtils from 'xe-utils/ctor'
import VXETable from '../../v-x-e-table'
import { UtilTools } from '../../tools'
import GlobalConfig from '../../conf'

function renderPrefixIcon (h, titlePrefix) {
  return h('span', {
    class: 'vxe-form--item-title-prefix'
  }, [
    h('i', {
      class: titlePrefix.icon || GlobalConfig.icon.FORM_PREFIX
    })
  ])
}

function renderSuffixIcon (h, titleSuffix) {
  return h('span', {
    class: 'vxe-form--item-title-suffix'
  }, [
    h('i', {
      class: titleSuffix.icon || GlobalConfig.icon.FORM_SUFFIX
    })
  ])
}

function renderTitle (h, _vm) {
  const { title, titlePrefix, titleSuffix } = _vm
  const titles = []
  if (titlePrefix) {
    titles.push(
      titlePrefix.message
        ? h('vxe-tooltip', {
          props: {
            content: UtilTools.getFuncText(titlePrefix.message),
            enterable: titlePrefix.enterable,
            theme: titlePrefix.theme
          }
        }, [
          renderPrefixIcon(h, titlePrefix)
        ])
        : renderPrefixIcon(h, titlePrefix)
    )
  }
  titles.push(
    h('span', {
      class: 'vxe-form--item-title-label'
    }, UtilTools.getFuncText(title))
  )
  if (titleSuffix) {
    titles.push(
      titleSuffix.message
        ? h('vxe-tooltip', {
          props: {
            content: UtilTools.getFuncText(titleSuffix.message),
            enterable: titleSuffix.enterable,
            theme: titleSuffix.theme
          }
        }, [
          renderSuffixIcon(h, titleSuffix)
        ])
        : renderSuffixIcon(h, titleSuffix)
    )
  }
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
    titleSuffix: Object,
    resetValue: { default: null },
    visible: { type: Boolean, default: null },
    visibleMethod: Function,
    folding: Boolean,
    collapseNode: Boolean,
    itemRender: Object
  },
  inject: {
    $vxeform: {
      default: null
    }
  },
  data () {
    return {
      showError: false,
      showRule: null
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isRequired () {
      const { $vxeform, field } = this
      if ($vxeform && $vxeform.rules) {
        const rules = $vxeform.rules[field]
        if (rules) {
          return rules.some(rule => rule.required)
        }
      }
      return false
    },
    errRule () {
      const { $vxeform, field } = this
      if ($vxeform) {
        return XEUtils.find($vxeform.invalids, ({ property }) => field === property)
      }
      return null
    }
  },
  watch: {
    errRule (value) {
      clearTimeout(this.showErrTimeout)
      this.showError = false
      if (value) {
        this.showRule = value.rule
        setTimeout(() => {
          this.showError = true
        }, 30)
      } else {
        this.showErrTimeout = setTimeout(() => {
          this.showRule = null
        }, 350)
      }
    }
  },
  render (h) {
    const { _e, $scopedSlots, $vxeform, title, folding, visible, visibleMethod, field, collapseNode, itemRender, isRequired, showError, showRule } = this
    const compConf = itemRender ? VXETable.renderer.get(itemRender.name) : null
    const span = this.span || $vxeform.span
    const align = this.align || $vxeform.align
    const titleAlign = this.titleAlign || $vxeform.titleAlign
    const titleWidth = this.titleWidth || $vxeform.titleWidth
    const collapseAll = $vxeform.collapseAll
    let itemVisibleMethod = visibleMethod
    const params = { data: $vxeform.data, property: field, item: this, $form: $vxeform }
    if (visible === false) {
      return _e()
    }
    if (!itemVisibleMethod && compConf && compConf.itemVisibleMethod) {
      itemVisibleMethod = compConf.itemVisibleMethod
    }
    let contentVNs = []
    if (compConf && compConf.renderItemContent) {
      contentVNs = compConf.renderItemContent.call(this, h, itemRender, params)
    } else if (compConf && compConf.renderItem) {
      contentVNs = compConf.renderItem.call(this, h, itemRender, params)
    } else if ($scopedSlots && $scopedSlots.default) {
      contentVNs = $scopedSlots.default.call(this, params, h)
    } else if (field) {
      contentVNs = [`${XEUtils.get($vxeform.data, field)}`]
    }
    return h('div', {
      class: ['vxe-form--item', span ? `vxe-col--${span} is--span` : null, {
        'is--title': title,
        'is--required': isRequired,
        'is--hidden': folding && collapseAll,
        'is--active': !itemVisibleMethod || itemVisibleMethod(params),
        'is--error': showError
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
        }, contentVNs.concat(
          [
            collapseNode ? h('div', {
              class: 'vxe-form--item-trigger-node',
              on: {
                click: this.toggleCollapseEvent
              }
            }, [
              h('span', {
                class: 'vxe-form--item-trigger-text'
              }, collapseAll ? GlobalConfig.i18n('vxe.form.unfolding') : GlobalConfig.i18n('vxe.form.folding')),
              h('i', {
                class: ['vxe-form--item-trigger-icon', collapseAll ? GlobalConfig.icon.FORM_FOLDING : GlobalConfig.icon.FORM_UNFOLDING]
              })
            ]) : null,
            showRule && $vxeform.validOpts.showMessage ? h('div', {
              class: 'vxe-form--item-valid',
              style: showRule.maxWidth ? {
                width: `${showRule.maxWidth}px`
              } : null
            }, showRule.message) : null
          ])
        )
      ])
    ])
  },
  methods: {
    toggleCollapseEvent (evnt) {
      const $form = this.$vxeform
      $form.toggleCollapse()
      $form.$emit('toggle-collapse', { collapse: !$form.collapseAll, data: $form.data, $form, $event: evnt }, evnt)
    }
  }
}

import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import vSize from '../../mixins/size'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools, isEnableConf } from '../../tools'
import { createItem } from './util'

class Rule {
  constructor (rule) {
    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.min,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    })
  }

  get message () {
    return UtilTools.getFuncText(this.$options.message)
  }
}

function getResetValue (value, resetValue) {
  if (XEUtils.isArray(value)) {
    resetValue = []
  }
  return resetValue
}

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

function renderTitle (h, _vm, item) {
  const { data } = _vm
  const { slots, field, itemRender, titlePrefix, titleSuffix } = item
  const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
  const params = { data, property: field, item, $form: _vm }
  const tss = []
  if (titlePrefix) {
    tss.push(
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
  tss.push(
    h('span', {
      class: 'vxe-form--item-title-label'
    }, compConf && compConf.renderItemTitle ? compConf.renderItemTitle(itemRender, params) : (slots && slots.title ? _vm.callSlot(slots.title, params) : UtilTools.getFuncText(item.title)))
  )
  if (titleSuffix) {
    tss.push(
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
  return tss
}

function renderItems (h, _vm) {
  const { _e, rules, formItems, data, collapseAll, validOpts } = _vm
  return formItems.map((item, index) => {
    const { slots, title, folding, visible, visibleMethod, field, collapseNode, itemRender, showError, errRule } = item
    const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
    const span = item.span || _vm.span
    const align = item.align || _vm.align
    const titleAlign = item.titleAlign || _vm.titleAlign
    const titleWidth = item.titleWidth || _vm.titleWidth
    let itemVisibleMethod = visibleMethod
    const params = { data, property: field, item, $form: _vm }
    let isRequired
    if (visible === false) {
      return _e()
    }
    if (!itemVisibleMethod && compConf && compConf.itemVisibleMethod) {
      itemVisibleMethod = compConf.itemVisibleMethod
    }
    if (rules) {
      const itemRules = rules[field]
      if (itemRules) {
        isRequired = itemRules.some(rule => rule.required)
      }
    }
    let contentVNs = []
    if (compConf && compConf.renderItemContent) {
      contentVNs = compConf.renderItemContent.call(_vm, h, itemRender, params)
    } else if (compConf && compConf.renderItem) {
      contentVNs = compConf.renderItem.call(_vm, h, itemRender, params)
    } else if (slots && slots.default) {
      contentVNs = _vm.callSlot(slots.default, params, h)
    } else if (field) {
      contentVNs = [`${XEUtils.get(data, field)}`]
    }
    return h('div', {
      class: ['vxe-form--item', item.id, span ? `vxe-col--${span} is--span` : null, {
        'is--title': title,
        'is--required': isRequired,
        'is--hidden': folding && collapseAll,
        'is--active': !itemVisibleMethod || itemVisibleMethod(params),
        'is--error': showError
      }],
      key: index
    }, [
      h('div', {
        class: 'vxe-form--item-inner'
      }, [
        title || (slots && slots.title) ? h('div', {
          class: ['vxe-form--item-title', titleAlign ? `align--${titleAlign}` : null],
          style: titleWidth ? {
            width: isNaN(titleWidth) ? titleWidth : `${titleWidth}px`
          } : null
        }, renderTitle(h, _vm, item)) : null,
        h('div', {
          class: ['vxe-form--item-content', align ? `align--${align}` : null]
        }, contentVNs.concat(
          [
            collapseNode ? h('div', {
              class: 'vxe-form--item-trigger-node',
              on: {
                click: _vm.toggleCollapseEvent
              }
            }, [
              h('span', {
                class: 'vxe-form--item-trigger-text'
              }, collapseAll ? GlobalConfig.i18n('vxe.form.unfolding') : GlobalConfig.i18n('vxe.form.folding')),
              h('i', {
                class: ['vxe-form--item-trigger-icon', collapseAll ? GlobalConfig.icon.FORM_FOLDING : GlobalConfig.icon.FORM_UNFOLDING]
              })
            ]) : null,
            errRule && validOpts.showMessage ? h('div', {
              class: 'vxe-form--item-valid',
              style: errRule.maxWidth ? {
                width: `${errRule.maxWidth}px`
              } : null
            }, errRule.message) : null
          ])
        )
      ])
    ])
  })
}

export default {
  name: 'VxeForm',
  mixins: [vSize],
  props: {
    loading: Boolean,
    data: Object,
    size: { type: String, default: () => GlobalConfig.form.size || GlobalConfig.size },
    span: [String, Number],
    align: { type: String, default: () => GlobalConfig.form.align },
    titleAlign: { type: String, default: () => GlobalConfig.form.titleAlign },
    titleWidth: [String, Number],
    titleColon: { type: Boolean, default: () => GlobalConfig.form.titleColon },
    titleAsterisk: { type: Boolean, default: () => GlobalConfig.form.titleAsterisk },
    items: Array,
    rules: Object,
    preventSubmit: { type: Boolean, default: () => GlobalConfig.form.preventSubmit },
    validConfig: Object
  },
  data () {
    return {
      collapseAll: true,
      staticItems: [],
      formItems: []
    }
  },
  provide () {
    return {
      $xeform: this
    }
  },
  computed: {
    validOpts () {
      return Object.assign({}, GlobalConfig.form.validConfig, this.validConfig)
    }
  },
  created () {
    const { items } = this
    if (items) {
      this.loadItem(items)
    }
  },
  watch: {
    staticItems (value) {
      this.formItems = value
    },
    items (value) {
      this.loadItem(value)
    }
  },
  render (h) {
    const { loading, vSize } = this
    return h('form', {
      class: ['vxe-form', 'vxe-row', {
        [`size--${vSize}`]: vSize,
        'is--colon': this.titleColon,
        'is--asterisk': this.titleAsterisk,
        'is--loading': loading
      }],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, renderItems(h, this).concat([
      h('div', {
        class: 'vxe-form-slots',
        ref: 'hideItem'
      }, this.$slots.default),
      h('div', {
        class: ['vxe-loading', {
          'is--visible': loading
        }]
      }, [
        h('div', {
          class: 'vxe-loading--spinner'
        })
      ])
    ]))
  },
  methods: {
    callSlot (slotFunc, params) {
      if (slotFunc) {
        const { $scopedSlots } = this
        if (XEUtils.isString(slotFunc)) {
          slotFunc = $scopedSlots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return slotFunc.call(this, params)
        }
      }
      return []
    },
    loadItem (list) {
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        const { $scopedSlots } = this
        list.forEach(item => {
          if (item.slots) {
            XEUtils.each(item.slots, (func) => {
              if (!XEUtils.isFunction(func)) {
                if (!$scopedSlots[func]) {
                  UtilTools.error('vxe.error.notSlot', [func])
                }
              }
            })
          }
        })
      }
      this.staticItems = list.map(item => createItem(this, item))
      return this.$nextTick()
    },
    getItems () {
      return this.formItems.slice(0)
    },
    toggleCollapse () {
      this.collapseAll = !this.collapseAll
      return this.$nextTick()
    },
    toggleCollapseEvent (evnt) {
      this.toggleCollapse()
      this.$emit('toggle-collapse', { collapse: !this.collapseAll, data: this.data, $form: this, $event: evnt }, evnt)
    },
    submitEvent (evnt) {
      evnt.preventDefault()
      if (!this.preventSubmit) {
        this.beginValidate().then(() => {
          this.$emit('submit', { data: this.data, $form: this, $event: evnt })
        }).catch(errMap => {
          this.$emit('submit-invalid', { data: this.data, errMap, $form: this, $event: evnt })
        })
      }
    },
    reset () {
      const { data, formItems } = this
      if (data) {
        formItems.forEach(item => {
          const { field, resetValue, itemRender } = item
          if (field && isEnableConf(itemRender)) {
            XEUtils.set(data, field, resetValue === null ? getResetValue(XEUtils.get(data, field), undefined) : resetValue)
            const compConf = VXETable.renderer.get(itemRender.name)
            if (compConf && compConf.itemResetMethod) {
              compConf.itemResetMethod({ data, property: field, item, $form: this })
            }
          }
        })
      }
      return this.clearValidate()
    },
    resetEvent (evnt) {
      evnt.preventDefault()
      this.reset()
      this.$emit('reset', { data: this.data, $form: this, $event: evnt })
    },
    clearValidate (field) {
      const { formItems } = this
      if (field) {
        const item = formItems.find(item => item.field === field)
        if (item) {
          item.showError = false
        }
      } else {
        formItems.forEach(item => {
          item.showError = false
        })
      }
      return this.$nextTick()
    },
    validate (callback) {
      return this.beginValidate(callback)
    },
    beginValidate (type, callback) {
      const { data, rules: formRules, formItems, validOpts } = this
      const validRest = {}
      const validFields = []
      const itemValids = []
      this.clearValidate()
      clearTimeout(this.showErrTime)
      if (data && formRules) {
        formItems.forEach(item => {
          const { field } = item
          if (field) {
            itemValids.push(
              this.validItemRules(type || 'all', field).then(() => {
                item.errRule = null
              }).catch(({ rule, rules }) => {
                const rest = { rule, rules, data, property: field, $form: this }
                if (!validRest[field]) {
                  validRest[field] = []
                }
                validRest[field].push(rest)
                validFields.push(field)
                item.errRule = rule
                return Promise.reject(rest)
              })
            )
          }
        })
        return Promise.all(itemValids).then(() => {
          if (callback) {
            callback()
          }
        }).catch(() => {
          this.showErrTime = setTimeout(() => {
            formItems.forEach(item => {
              if (item.errRule) {
                item.showError = true
              }
            })
          }, 20)
          if (callback) {
            callback(validRest)
          }
          if (validOpts.autoPos) {
            this.$nextTick(() => {
              this.handleFocus(validFields)
            })
          }
          return Promise.reject(validRest)
        })
      }
      if (callback) {
        callback()
      }
      return Promise.resolve()
    },
    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者 Promise<(ErrMap 校验不通过列的信息)>
     * 如果是传回调方式这返回一个 (ErrMap 校验不通过列的信息)
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ itemValue, rule, rules, data, property }) 自定义校验，接收一个 Promise
     *  trigger=change 触发方式
     */
    validItemRules (type, property, val) {
      const { data, rules: formRules } = this
      const errorRules = []
      const syncVailds = []
      if (property && formRules) {
        const rules = XEUtils.get(formRules, property)
        if (rules) {
          const itemValue = XEUtils.isUndefined(val) ? XEUtils.get(data, property) : val
          rules.forEach(rule => {
            if (type === 'all' || !rule.trigger || type === rule.trigger) {
              if (XEUtils.isFunction(rule.validator)) {
                const customValid = rule.validator({
                  itemValue,
                  rule,
                  rules,
                  data,
                  property,
                  $form: this
                })
                if (customValid) {
                  if (XEUtils.isError(customValid)) {
                    errorRules.push(new Rule({ type: 'custom', trigger: rule.trigger, message: customValid.message, rule: new Rule(rule) }))
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(
                      customValid.catch(e => {
                        errorRules.push(new Rule({ type: 'custom', trigger: rule.trigger, message: e ? e.message : rule.message, rule: new Rule(rule) }))
                      })
                    )
                  }
                }
              } else {
                const isNumber = rule.type === 'number'
                const numVal = isNumber ? XEUtils.toNumber(itemValue) : XEUtils.getSize(itemValue)
                if (itemValue === null || itemValue === undefined || itemValue === '') {
                  if (rule.required) {
                    errorRules.push(new Rule(rule))
                  }
                } else if (
                  (isNumber && isNaN(itemValue)) ||
                  (!isNaN(rule.min) && numVal < parseFloat(rule.min)) ||
                  (!isNaN(rule.max) && numVal > parseFloat(rule.max)) ||
                  (rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(itemValue))
                ) {
                  errorRules.push(new Rule(rule))
                }
              }
            }
          })
        }
      }
      return Promise.all(syncVailds).then(() => {
        if (errorRules.length) {
          const rest = { rules: errorRules, rule: errorRules[0] }
          return Promise.reject(rest)
        }
      })
    },
    handleFocus (fields) {
      const { $el, formItems } = this
      fields.some(property => {
        const item = formItems.find(item => item.field === property)
        if (item && isEnableConf(item.itemRender)) {
          const { itemRender } = item
          const compConf = VXETable.renderer.get(itemRender.name)
          let inputElem
          // 如果指定了聚焦 class
          if (itemRender.autofocus) {
            inputElem = $el.querySelector(`.${item.id} ${itemRender.autofocus}`)
          }
          // 渲染器的聚焦处理
          if (!inputElem && compConf && compConf.autofocus) {
            inputElem = $el.querySelector(`.${item.id} ${compConf.autofocus}`)
          }
          if (inputElem) {
            inputElem.focus()
            // 保持一致行为，光标移到末端
            if (DomTools.browse.msie) {
              const textRange = inputElem.createTextRange()
              textRange.collapse(false)
              textRange.select()
            }
            return true
          }
        }
      })
    },
    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    updateStatus (scope, itemValue) {
      const { property } = scope
      if (property) {
        this.validItemRules('change', property, itemValue)
          .then(() => {
            this.clearValidate(property)
          })
          .catch(({ rule }) => {
            const item = this.formItems.find(item => item.field === property)
            if (item) {
              item.showError = true
              item.errRule = rule
            }
          })
      }
    }
  }
}

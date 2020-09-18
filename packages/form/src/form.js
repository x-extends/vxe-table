import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../../conf'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools } from '../../tools'

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

function getItemSlots (_vm, item) {
  const { $scopedSlots } = _vm
  const itemSlots = item.slots
  const slots = {}
  let $default
  if (itemSlots) {
    $default = itemSlots.default
    if ($default && $scopedSlots[$default]) {
      $default = $scopedSlots[$default]
    }
  }
  if ($default) {
    slots.default = $default
  }
  return slots
}

function renderItems (h, _vm) {
  const { items } = _vm
  return items ? items.map(item => {
    return h('vxe-form-item', {
      props: item,
      scopedSlots: getItemSlots(_vm, item)
    })
  }) : []
}

export default {
  name: 'VxeForm',
  props: {
    loading: Boolean,
    data: Object,
    size: { type: String, default: () => GlobalConfig.form.size || GlobalConfig.size },
    span: [String, Number],
    align: String,
    titleAlign: String,
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
      invalids: []
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
    },
    validOpts () {
      return Object.assign({}, GlobalConfig.form.validConfig, this.validConfig)
    }
  },
  render (h) {
    const { $slots, loading, vSize } = this
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
    }, [].concat($slots.default || renderItems(h, this)).concat([
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
    getItems () {
      return this.$children.map(({ field, title, itemRender }) => {
        return {
          field,
          title,
          itemRender
        }
      })
    },
    toggleCollapse () {
      this.collapseAll = !this.collapseAll
      return this.$nextTick()
    },
    submitEvent (evnt) {
      evnt.preventDefault()
      if (!this.preventSubmit) {
        this.beginValidate().then(() => {
          this.$emit('submit', { data: this.data, $form: this, $event: evnt }, evnt)
        }).catch(errMap => {
          this.$emit('submit-invalid', { data: this.data, errMap, $form: this, $event: evnt }, evnt)
        })
      }
    },
    reset () {
      const { data } = this
      if (data) {
        this.$children.forEach(({ field, resetValue, itemRender }) => {
          if (field) {
            XEUtils.set(data, field, resetValue === null ? getResetValue(XEUtils.get(data, field), undefined) : resetValue)
            const compConf = itemRender ? VXETable.renderer.get(itemRender.name) : null
            if (compConf && compConf.itemResetMethod) {
              compConf.itemResetMethod({ data, property: field, $form: this })
            }
          }
        })
      }
      return this.clearValidate()
    },
    resetEvent (evnt) {
      evnt.preventDefault()
      this.reset()
      this.$emit('reset', { data: this.this, $form: this, $event: evnt }, evnt)
    },
    clearValidate (field) {
      if (field) {
        XEUtils.remove(this.invalids, ({ property }) => property === field)
      } else {
        this.invalids = []
      }
      return this.$nextTick()
    },
    validate (callback) {
      return this.beginValidate(callback)
    },
    beginValidate (type, callback) {
      const { data, rules: formRules, validOpts } = this
      const validRest = {}
      const validFields = []
      const itemValids = []
      this.clearValidate()
      if (data && formRules) {
        this.$children.forEach(({ field }) => {
          if (field) {
            itemValids.push(
              this.validItemRules(type || 'all', field)
                .catch(({ rule, rules }) => {
                  const rest = { rule, rules, data, property: field, $form: this }
                  if (!validRest[field]) {
                    validRest[field] = []
                  }
                  validRest[field].push(rest)
                  validFields.push(field)
                  this.invalids.push(rest)
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
          if (callback) {
            callback(validRest)
          }
          if (validOpts.autoPos !== false) {
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
      const { $children } = this
      fields.some(property => {
        const comp = XEUtils.find($children, item => item.field === property)
        if (comp && comp.itemRender) {
          const { $el, itemRender } = comp
          const compConf = VXETable.renderer.get(itemRender.name)
          let inputElem
          // 如果指定了聚焦 class
          if (itemRender.autofocus) {
            inputElem = $el.querySelector(itemRender.autofocus)
          }
          // 渲染器的聚焦处理
          if (!inputElem && compConf && compConf.autofocus) {
            inputElem = $el.querySelector(compConf.autofocus)
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
          .catch(({ rule, rules }) => {
            const rest = XEUtils.find(this.invalids, rest => rest.property === property)
            if (rest) {
              rest.rule = rule
              rest.rules = rules
            } else {
              this.invalids.push({ rule, rules, property })
            }
          })
      }
    }
  }
}

import XEUtils from 'xe-utils/methods/xe-utils'
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
  if (XEUtils.isString(value)) {
    resetValue = ''
  } else if (XEUtils.isArray(value)) {
    resetValue = []
  } else if (XEUtils.isBoolean(value)) {
    resetValue = false
  }
  return resetValue
}

export default {
  name: 'VxeForm',
  props: {
    loading: Boolean,
    data: Object,
    size: String,
    span: [String, Number],
    align: String,
    titleAlign: String,
    titleWidth: [String, Number],
    titleColon: { type: Boolean, default: () => GlobalConfig.form.titleColon },
    rules: Object
  },
  data () {
    return {
      collapseAll: true,
      isLoading: false,
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
    }
  },
  watch: {
    loading () {
      if (!this.isLoading) {
        this.isLoading = true
      }
    }
  },
  created () {
    // 是否加载过 Loading 模块
    this.isLoading = this.loading
    if (!VXETable._loading && XEUtils.isBoolean(this.loading)) {
      throw new Error(UtilTools.getLog('vxe.error.reqModule', ['Loading']))
    }
  },
  render (h) {
    const { titleColon, loading, isLoading, vSize } = this
    const itemSlots = [].concat(this.$slots.default)
    if (VXETable._loading && isLoading) {
      itemSlots.push(
        h('vxe-loading', {
          props: {
            visible: loading
          }
        })
      )
    }
    return h('form', {
      class: ['vxe-form', 'vxe-row', {
        [`size--${vSize}`]: vSize,
        'is--colon': titleColon,
        'is--loading': loading
      }],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, itemSlots)
  },
  methods: {
    toggleCollapse () {
      this.collapseAll = !this.collapseAll
      return this.$nextTick()
    },
    submitEvent (evnt) {
      evnt.preventDefault()
      this.beginValidate().then(() => {
        this.$emit('submit', { data: this.data, $form: this }, evnt)
      }).catch(errMap => {
        this.$emit('submit-invalid', { data: this.data, errMap, $form: this }, evnt)
      })
    },
    resetEvent (evnt) {
      evnt.preventDefault()
      const { data } = this
      if (data) {
        this.$children.forEach(({ field, resetValue }) => {
          if (field) {
            XEUtils.set(data, field, resetValue === null ? getResetValue(XEUtils.get(data, field), resetValue) : resetValue)
          }
        })
      }
      this.clearValidate()
      this.$emit('reset', { data, $form: this }, evnt)
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
      const { data, rules: formRules } = this
      const validRest = {}
      const validFields = []
      const itemValids = []
      let status = true
      this.clearValidate()
      if (data && formRules) {
        this.$children.forEach(({ field }) => {
          if (field) {
            itemValids.push(
              new Promise((resolve, reject) => {
                this.validItemRules(type || 'all', field)
                  .then(resolve)
                  .catch(({ rule, rules }) => {
                    const rest = { rule, rules, property: field }
                    if (!validRest[field]) {
                      validRest[field] = []
                    }
                    validRest[field].push(rest)
                    validFields.push(field)
                    this.invalids.push(rest)
                    return reject(rest)
                  })
              })
            )
          }
        })
        return Promise.all(itemValids).then(() => {
          if (callback) {
            callback(status)
          }
        }).catch(() => {
          status = false
          if (callback) {
            callback(status, validRest)
          }
          this.$nextTick(() => {
            this.handleFocus(validFields)
          })
          return Promise.reject(validRest)
        })
      }
      if (callback) {
        callback(status)
      }
      return Promise.resolve()
    },
    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise，结果返回一个 Boolean 值
     * 如果是传回调方式这返回一个 Boolean 值和校验不通过列的错误消息
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function(rule, value, callback, {rules, property}) 自定义校验
     *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
     */
    validItemRules (type, property, val) {
      const { data, rules: formRules } = this
      const errorRules = []
      const itemVailds = []
      if (property && formRules) {
        const rules = XEUtils.get(formRules, property)
        if (rules) {
          const itemValue = XEUtils.isUndefined(val) ? XEUtils.get(data, property) : val
          rules.forEach(rule => {
            itemVailds.push(
              new Promise(resolve => {
                if (type === 'all' || !rule.trigger || type === rule.trigger) {
                  if (XEUtils.isFunction(rule.validator)) {
                    rule.validator(rule, itemValue, e => {
                      if (XEUtils.isError(e)) {
                        const cusRule = { type: 'custom', trigger: rule.trigger, message: e.message, rule: new Rule(rule) }
                        errorRules.push(new Rule(cusRule))
                      }
                      return resolve()
                    }, { rules, property })
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
                    resolve()
                  }
                } else {
                  resolve()
                }
              })
            )
          })
        }
      }
      return Promise.all(itemVailds).then(() => {
        if (errorRules.length) {
          const rest = { rules: errorRules, rule: errorRules[0] }
          return Promise.reject(rest)
        }
      })
    },
    handleFocus (fields) {
      const { $children } = this
      fields.some(property => {
        const comp = $children.find(item => item.field === property)
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
            const rest = this.invalids.find(rest => rest.property === property)
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

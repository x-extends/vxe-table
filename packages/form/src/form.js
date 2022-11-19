import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import VXETable from '../../v-x-e-table'
import { isEnableConf, eqEmptyValue, getFuncText } from '../../tools/utils'
import DomTools, { browse } from '../../tools/dom'
import { createItem, handleFieldOrItem, isHiddenItem, isActivetem } from './util'
import { errLog } from '../../tools/log'
import VxeFormConfigItem from './form-config-item'
import VxeLoading from '../../loading/index'
import { getSlotVNs } from '../../tools/vn'

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

  get content () {
    return getFuncText(this.$options.content || this.$options.message)
  }

  get message () {
    return this.content
  }
}

function validErrorRuleValue (rule, val) {
  const { type, min, max, pattern } = rule
  const isNumType = type === 'number'
  const numVal = isNumType ? XEUtils.toNumber(val) : XEUtils.getSize(val)
  // 判断数值
  if (isNumType && isNaN(val)) {
    return true
  }
  // 如果存在 min，判断最小值
  if (!XEUtils.eqNull(min) && numVal < XEUtils.toNumber(min)) {
    return true
  }
  // 如果存在 max，判断最大值
  if (!XEUtils.eqNull(max) && numVal > XEUtils.toNumber(max)) {
    return true
  }
  // 如果存在 pattern，正则校验
  if (pattern && !(XEUtils.isRegExp(pattern) ? pattern : new RegExp(pattern)).test(val)) {
    return true
  }
  return false
}

function getResetValue (value, resetValue) {
  if (XEUtils.isArray(value)) {
    resetValue = []
  }
  return resetValue
}

export default {
  name: 'VxeForm',
  mixins: [vSize],
  props: {
    collapseStatus: { type: Boolean, default: true },
    loading: Boolean,
    data: Object,
    size: { type: String, default: () => GlobalConfig.form.size || GlobalConfig.size },
    span: { type: [String, Number], default: () => GlobalConfig.form.span },
    align: { type: String, default: () => GlobalConfig.form.align },
    titleAlign: { type: String, default: () => GlobalConfig.form.titleAlign },
    titleWidth: { type: [String, Number], default: () => GlobalConfig.form.titleWidth },
    titleColon: { type: Boolean, default: () => GlobalConfig.form.titleColon },
    titleAsterisk: { type: Boolean, default: () => GlobalConfig.form.titleAsterisk },
    titleOverflow: { type: [Boolean, String], default: null },
    className: [String, Function],
    readonly: Boolean,
    items: Array,
    rules: Object,
    preventSubmit: { type: Boolean, default: () => GlobalConfig.form.preventSubmit },
    validConfig: Object,
    tooltipConfig: Object,
    customLayout: { type: Boolean, default: () => GlobalConfig.form.customLayout }
  },
  data () {
    return {
      collapseAll: this.collapseStatus,
      staticItems: [],
      formItems: [],

      tooltipTimeout: null,
      tooltipStore: {
        item: null,
        visible: false
      }
    }
  },
  provide () {
    return {
      $xeform: this,
      $xeformgather: null,
      $xeformitem: null,
      $xeformiteminfo: null
    }
  },
  computed: {
    validOpts () {
      return Object.assign({}, GlobalConfig.form.validConfig, this.validConfig)
    },
    tooltipOpts () {
      return Object.assign({}, GlobalConfig.tooltip, GlobalConfig.form.tooltipConfig, this.tooltipConfig)
    }
  },
  watch: {
    staticItems (value) {
      this.formItems = value
    },
    items (value) {
      this.loadItem(value)
    },
    collapseStatus (value) {
      this.collapseAll = !!value
    }
  },
  created () {
    this.$nextTick(() => {
      const { items } = this
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (this.customLayout && this.items) {
          errLog('vxe.error.errConflicts', ['custom-layout', 'items'])
        }
      }
      if (items) {
        this.loadItem(items)
      }
    })
  },
  render (h) {
    const { _e, loading, className, data, vSize, tooltipOpts, formItems, customLayout } = this
    const hasUseTooltip = VXETable._tooltip
    const defaultSlot = this.$scopedSlots.default
    return h('form', {
      class: ['vxe-form', className ? (XEUtils.isFunction(className) ? className({ items: formItems, data, $form: this }) : className) : '', {
        [`size--${vSize}`]: vSize,
        'is--loading': loading
      }],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, [
      h('div', {
        class: 'vxe-form--wrapper vxe-row'
      }, customLayout ? (defaultSlot ? defaultSlot.call(this, h, {}) : []) : formItems.map((item, index) => {
        return h(VxeFormConfigItem, {
          key: index,
          props: {
            itemConfig: item
          }
        })
      })),
      h('div', {
        class: 'vxe-form-slots',
        ref: 'hideItem'
      }, customLayout ? [] : (defaultSlot ? defaultSlot.call(this, h, {}) : [])),
      /**
       * 加载中
       */
      h(VxeLoading, {
        class: 'vxe-form--loading',
        props: {
          value: loading
        }
      }),
      /**
       * 工具提示
       */
      hasUseTooltip ? h('vxe-tooltip', {
        ref: 'tooltip',
        props: tooltipOpts
      }) : _e()
    ])
  },
  methods: {
    callSlot (slotFunc, params, h) {
      if (slotFunc) {
        const { $scopedSlots } = this
        if (XEUtils.isString(slotFunc)) {
          slotFunc = $scopedSlots[slotFunc] || null
        }
        if (XEUtils.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc.call(this, params, h))
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
                  errLog('vxe.error.notSlot', [func])
                }
              }
            })
          }
        })
      }
      this.staticItems = XEUtils.mapTree(list, item => createItem(this, item), { children: 'children' })
      return this.$nextTick()
    },
    getItems () {
      const itemList = []
      XEUtils.eachTree(this.formItems, item => {
        itemList.push(item)
      }, { children: 'children' })
      return itemList
    },
    getItemByField (field) {
      const rest = XEUtils.findTree(this.formItems, item => item.field === field, { children: 'children' })
      return rest ? rest.item : null
    },
    toggleCollapse () {
      const status = !this.collapseAll
      this.collapseAll = status
      this.$emit('update:collapseStatus', status)
      return this.$nextTick()
    },
    toggleCollapseEvent (evnt) {
      this.toggleCollapse()
      const status = this.collapseAll
      this.$emit('toggle-collapse', { status, collapse: status, data: this.data, $form: this, $event: evnt }, evnt)
      this.$emit('collapse', { status, collapse: status, data: this.data, $form: this, $event: evnt }, evnt)
    },
    submitEvent (evnt) {
      evnt.preventDefault()
      if (!this.preventSubmit) {
        this.clearValidate()
        this.beginValidate(this.getItems()).then((errMap) => {
          if (errMap) {
            this.$emit('submit-invalid', { data: this.data, errMap, $form: this, $event: evnt })
          } else {
            this.$emit('submit', { data: this.data, $event: evnt })
          }
        })
      }
    },
    reset () {
      const { data } = this
      if (data) {
        const itemList = this.getItems()
        itemList.forEach(item => {
          const { field, resetValue, itemRender } = item
          if (isEnableConf(itemRender)) {
            const compConf = VXETable.renderer.get(itemRender.name)
            if (compConf && compConf.itemResetMethod) {
              compConf.itemResetMethod({ data, field, property: field, item, $form: this })
            } else if (field) {
              XEUtils.set(data, field, resetValue === null ? getResetValue(XEUtils.get(data, field), undefined) : XEUtils.clone(resetValue, true))
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
    closeTooltip () {
      const { tooltipStore } = this
      const $tooltip = this.$refs.tooltip
      if (tooltipStore.visible) {
        Object.assign(tooltipStore, {
          item: null,
          visible: false
        })
        if ($tooltip) {
          $tooltip.close()
        }
      }
      return this.$nextTick()
    },
    triggerTitleTipEvent (evnt, params) {
      const { item } = params
      const { tooltipStore } = this
      const $tooltip = this.$refs.tooltip
      const overflowElem = evnt.currentTarget.children[0]
      const content = (overflowElem.textContent || '').trim()
      const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth
      clearTimeout(this.tooltipTimeout)
      if (tooltipStore.item !== item) {
        this.closeTooltip()
      }
      if (content && isCellOverflow) {
        Object.assign(tooltipStore, {
          item,
          visible: true
        })
        if ($tooltip) {
          $tooltip.open(overflowElem, content)
        }
      }
    },
    handleTitleTipLeaveEvent () {
      const { tooltipOpts } = this
      let $tooltip = this.$refs.tooltip
      if ($tooltip) {
        $tooltip.setActived(false)
      }
      if (tooltipOpts.enterable) {
        this.tooltipTimeout = setTimeout(() => {
          $tooltip = this.$refs.tooltip
          if ($tooltip && !$tooltip.isActived()) {
            this.closeTooltip()
          }
        }, tooltipOpts.leaveDelay)
      } else {
        this.closeTooltip()
      }
    },
    clearValidate (fieldOrItem) {
      if (fieldOrItem) {
        const item = handleFieldOrItem(this, fieldOrItem)
        if (item) {
          item.showError = false
        }
      } else {
        this.getItems().forEach(item => {
          item.showError = false
        })
      }
      return this.$nextTick()
    },
    validate (callback) {
      this.clearValidate()
      return this.beginValidate(this.getItems(), '', callback)
    },
    validateField (fieldOrItem, callback) {
      const item = handleFieldOrItem(this, fieldOrItem)
      return this.beginValidate(item ? [item] : [], '', callback)
    },
    beginValidate (itemList, type, callback) {
      const { data, rules: formRules, validOpts } = this
      const validRest = {}
      const validFields = []
      const itemValids = []
      clearTimeout(this.showErrTime)
      if (data && formRules) {
        itemList.forEach(item => {
          const { field } = item
          if (field && !isHiddenItem(this, item) && isActivetem(this, item)) {
            itemValids.push(
              this.validItemRules(type || 'all', field).then(() => {
                item.errRule = null
              }).catch(({ rule, rules }) => {
                const rest = { rule, rules, data, field, property: field, $form: this }
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
          return new Promise((resolve) => {
            this.showErrTime = setTimeout(() => {
              itemList.forEach(item => {
                if (item.errRule) {
                  item.showError = true
                }
              })
            }, 20)
            if (validOpts.autoPos) {
              this.$nextTick(() => {
                this.handleFocus(validFields)
              })
            }
            if (callback) {
              callback(validRest)
              resolve()
            } else {
              resolve(validRest)
            }
          })
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
    validItemRules (validType, property, val) {
      const { data, rules: formRules } = this
      const errorRules = []
      const syncVailds = []
      if (property && formRules) {
        const rules = XEUtils.get(formRules, property)
        if (rules) {
          const itemValue = XEUtils.isUndefined(val) ? XEUtils.get(data, property) : val
          rules.forEach(rule => {
            const { type, trigger, required } = rule
            if (validType === 'all' || !trigger || validType === rule.trigger) {
              if (XEUtils.isFunction(rule.validator)) {
                const customValid = rule.validator({
                  itemValue,
                  rule,
                  rules,
                  data,
                  field: property,
                  property,
                  $form: this
                })
                if (customValid) {
                  if (XEUtils.isError(customValid)) {
                    errorRules.push(new Rule({ type: 'custom', trigger, content: customValid.message, rule: new Rule(rule) }))
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(
                      customValid.catch(e => {
                        errorRules.push(new Rule({ type: 'custom', trigger, content: e ? e.message : (rule.content || rule.message), rule: new Rule(rule) }))
                      })
                    )
                  }
                }
              } else {
                const isArrType = type === 'array'
                const hasEmpty = isArrType || XEUtils.isArray(itemValue) ? (!XEUtils.isArray(itemValue) || !itemValue.length) : eqEmptyValue(itemValue)
                if (required ? (hasEmpty || validErrorRuleValue(rule, itemValue)) : (!hasEmpty && validErrorRuleValue(rule, itemValue))) {
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
      const { $el } = this
      for (let i = 0; i < fields.length; i++) {
        const property = fields[i]
        const item = this.getItemByField(property)
        if (item && isEnableConf(item.itemRender)) {
          const { itemRender } = item
          const compConf = VXETable.renderer.get(itemRender.name)
          let inputElem
          // 定位到第一个
          if (!i) {
            DomTools.scrollToView($el.querySelector(`.${item.id}`))
          }
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
            if (browse.msie) {
              const textRange = inputElem.createTextRange()
              textRange.collapse(false)
              textRange.select()
            }
            break
          }
        }
      }
    },
    triggerItemEvent (evnt, field, itemValue) {
      if (field) {
        return this.validItemRules(evnt ? (['blur'].includes(evnt.type) ? 'blur' : 'change') : 'all', field, itemValue)
          .then(() => {
            this.clearValidate(field)
          })
          .catch(({ rule }) => {
            const item = this.getItemByField(field)
            if (item) {
              item.showError = true
              item.errRule = rule
            }
          })
      }
      return this.$nextTick()
    },
    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    updateStatus (scope, itemValue) {
      const { field } = scope
      return this.triggerItemEvent(new Event('change'), field, itemValue)
    }
  }
}

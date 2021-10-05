import XEUtils from 'xe-utils'
import GlobalConfig from '../../v-x-e-table/src/conf'
import vSize from '../../mixins/size'
import VXETable from '../../v-x-e-table'
import { UtilTools, DomTools, isEnableConf } from '../../tools'
import { createItem } from './util'
import { renderTitle } from './render'
import { eqEmptyValue } from '../../tools/src/utils'
import { browse } from '../../tools/src/dom'

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

function renderItems (h, _vm, itemList) {
  const { _e, rules, data, collapseAll, validOpts, titleOverflow: allTitleOverflow } = _vm
  return itemList.map((item, index) => {
    const { slots, title, folding, visible, visibleMethod, field, collapseNode, itemRender, showError, errRule, className, titleOverflow, children } = item
    const compConf = isEnableConf(itemRender) ? VXETable.renderer.get(itemRender.name) : null
    const span = item.span || _vm.span
    const align = item.align || _vm.align
    const titleAlign = item.titleAlign || _vm.titleAlign
    const titleWidth = item.titleWidth || _vm.titleWidth
    let itemVisibleMethod = visibleMethod
    const itemOverflow = (XEUtils.isUndefined(titleOverflow) || XEUtils.isNull(titleOverflow)) ? allTitleOverflow : titleOverflow
    const showEllipsis = itemOverflow === 'ellipsis'
    const showTitle = itemOverflow === 'title'
    const showTooltip = itemOverflow === true || itemOverflow === 'tooltip'
    const hasEllipsis = showTitle || showTooltip || showEllipsis
    const params = { data, property: field, item, $form: _vm }
    let isRequired
    if (visible === false) {
      return _e()
    }
    // 如果为项集合
    const isGather = children && children.length > 0
    if (isGather) {
      const childVNs = renderItems(h, _vm, item.children)
      return childVNs.length ? h('div', {
        class: ['vxe-form--gather vxe-row', item.id, span ? `vxe-col--${span} is--span` : '', className ? (XEUtils.isFunction(className) ? className(params) : className) : '']
      }, childVNs) : _e()
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
    if (slots && slots.default) {
      contentVNs = _vm.callSlot(slots.default, params, h)
    } else if (compConf && compConf.renderItemContent) {
      contentVNs = compConf.renderItemContent.call(_vm, h, itemRender, params)
    } else if (compConf && compConf.renderItem) {
      contentVNs = compConf.renderItem.call(_vm, h, itemRender, params)
    } else if (field) {
      contentVNs = [`${XEUtils.get(data, field)}`]
    }
    const ons = showTooltip ? {
      mouseenter (evnt) {
        _vm.triggerHeaderHelpEvent(evnt, params)
      },
      mouseleave: _vm.handleTargetLeaveEvent
    } : {}
    return h('div', {
      class: ['vxe-form--item', item.id, span ? `vxe-col--${span} is--span` : null, className ? (XEUtils.isFunction(className) ? className(params) : className) : '', {
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
          class: ['vxe-form--item-title', titleAlign ? `align--${titleAlign}` : null, {
            'is--ellipsis': hasEllipsis
          }],
          style: titleWidth ? {
            width: isNaN(titleWidth) ? titleWidth : `${titleWidth}px`
          } : null,
          attrs: {
            title: showTitle ? UtilTools.getFuncText(title) : null
          },
          on: ons
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
    collapseStatus: { type: Boolean, default: true },
    loading: Boolean,
    data: Object,
    size: { type: String, default: () => GlobalConfig.form.size || GlobalConfig.size },
    span: [String, Number],
    align: { type: String, default: () => GlobalConfig.form.align },
    titleAlign: { type: String, default: () => GlobalConfig.form.titleAlign },
    titleWidth: [String, Number],
    titleColon: { type: Boolean, default: () => GlobalConfig.form.titleColon },
    titleAsterisk: { type: Boolean, default: () => GlobalConfig.form.titleAsterisk },
    titleOverflow: { type: [Boolean, String], default: null },
    className: [String, Function],
    items: Array,
    rules: Object,
    preventSubmit: { type: Boolean, default: () => GlobalConfig.form.preventSubmit },
    validConfig: Object,
    customLayout: { type: Boolean, default: () => GlobalConfig.form.customLayout }
  },
  data () {
    return {
      collapseAll: this.collapseStatus,
      staticItems: [],
      formItems: [],

      tooltipTimeout: null,
      tooltipActive: false,
      tooltipStore: {
        item: null,
        visible: false
      }
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
    },
    tooltipOpts () {
      const opts = Object.assign({ leaveDelay: 300 }, GlobalConfig.form.tooltipConfig, this.tooltipConfig)
      if (opts.enterable) {
        opts.leaveMethod = this.handleTooltipLeaveMethod
      }
      return opts
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
          UtilTools.error('vxe.error.errConflicts', ['custom-layout', 'items'])
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
    return h('form', {
      class: ['vxe-form', className ? (XEUtils.isFunction(className) ? className({ items: formItems, data, $form: this }) : className) : '', {
        [`size--${vSize}`]: vSize,
        'is--colon': this.titleColon,
        'is--asterisk': this.titleAsterisk,
        'is--loading': loading
      }],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, [
      h('div', {
        class: 'vxe-form--wrapper vxe-row'
      }, customLayout ? this.$slots.default : renderItems(h, this, formItems)),
      h('div', {
        class: 'vxe-form-slots',
        ref: 'hideItem'
      }, customLayout ? [] : this.$slots.default),
      h('div', {
        class: ['vxe-loading', {
          'is--visible': loading
        }]
      }, [
        h('div', {
          class: 'vxe-loading--spinner'
        })
      ]),
      /**
       * 工具提示
       */
      hasUseTooltip ? h('vxe-tooltip', {
        ref: 'tooltip',
        ...tooltipOpts
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
          return slotFunc.call(this, params, h)
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
        this.beginValidate(this.getItems()).then(() => {
          this.$emit('submit', { data: this.data, $form: this, $event: evnt })
        }).catch(errMap => {
          this.$emit('submit-invalid', { data: this.data, errMap, $form: this, $event: evnt })
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
              compConf.itemResetMethod({ data, property: field, item, $form: this })
            } else if (field) {
              XEUtils.set(data, field, resetValue === null ? getResetValue(XEUtils.get(data, field), undefined) : resetValue)
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
    handleTooltipLeaveMethod () {
      const { tooltipOpts } = this
      setTimeout(() => {
        if (!this.tooltipActive) {
          this.closeTooltip()
        }
      }, tooltipOpts.leaveDelay)
      return false
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
    triggerHeaderHelpEvent (evnt, params) {
      const { item } = params
      const { tooltipStore } = this
      const $tooltip = this.$refs.tooltip
      const overflowElem = evnt.currentTarget.children[0]
      const content = (overflowElem.textContent || '').trim()
      const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth
      clearTimeout(this.tooltipTimeout)
      this.tooltipActive = true
      this.closeTooltip()
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
    handleTargetLeaveEvent () {
      const { tooltipOpts } = this
      this.tooltipActive = false
      if (tooltipOpts.enterable) {
        this.tooltipTimeout = setTimeout(() => {
          const $tooltip = this.$refs.tooltip
          if ($tooltip && !$tooltip.isHover) {
            this.closeTooltip()
          }
        }, tooltipOpts.leaveDelay)
      } else {
        this.closeTooltip()
      }
    },
    clearValidate (field) {
      const itemList = this.getItems()
      if (field) {
        const item = itemList.find(item => item.field === field)
        if (item) {
          item.showError = false
        }
      } else {
        itemList.forEach(item => {
          item.showError = false
        })
      }
      return this.$nextTick()
    },
    validate (callback) {
      return this.beginValidate(this.getItems(), '', callback)
    },
    validateField (field, callback) {
      return this.beginValidate(this.getItems().filter(item => item.field === field), '', callback)
    },
    beginValidate (itemList, type, callback) {
      const { data, rules: formRules, validOpts } = this
      const validRest = {}
      const validFields = []
      const itemValids = []
      this.clearValidate()
      clearTimeout(this.showErrTime)
      if (data && formRules) {
        itemList.forEach(item => {
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
          return new Promise((resolve, reject) => {
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
              reject(validRest)
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
                  property,
                  $form: this
                })
                if (customValid) {
                  if (XEUtils.isError(customValid)) {
                    errorRules.push(new Rule({ type: 'custom', trigger, message: customValid.message, rule: new Rule(rule) }))
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(
                      customValid.catch(e => {
                        errorRules.push(new Rule({ type: 'custom', trigger, message: e ? e.message : rule.message, rule: new Rule(rule) }))
                      })
                    )
                  }
                }
              } else {
                const isArrType = type === 'array'
                const hasEmpty = isArrType ? (!XEUtils.isArray(itemValue) || !itemValue.length) : eqEmptyValue(itemValue)
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
      const itemList = this.getItems()
      fields.some((property, index) => {
        const item = itemList.find(item => item.field === property)
        if (item && isEnableConf(item.itemRender)) {
          const { itemRender } = item
          const compConf = VXETable.renderer.get(itemRender.name)
          let inputElem
          // 定位到第一个
          if (!index) {
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
            const itemList = this.getItems()
            const item = itemList.find(item => item.field === property)
            if (item) {
              item.showError = true
              item.errRule = rule
            }
          })
      }
    }
  }
}

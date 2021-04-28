import XEUtils from 'xe-utils'
import { UtilTools, DomTools } from '../../tools'
import { eqEmptyValue } from '../../tools/src/utils'

/**
 * 校验规则
 */
class Rule {
  constructor (rule) {
    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.max,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    })
  }

  /**
   * 获取校验不通过的消息
   * 支持国际化翻译
   */
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

export default {
  methods: {
    /**
     * 完整校验，和 validate 的区别就是会给有效数据中的每一行进行校验
     */
    _fullValidate (rows, cb) {
      return this.beginValidate(rows, cb, true)
    },
    /**
     * 快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）
     */
    _validate (rows, cb) {
      return this.beginValidate(rows, cb)
    },
    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    handleValidError (params) {
      return new Promise(resolve => {
        if (this.validOpts.autoPos === false) {
          this.emitEvent('valid-error', params)
          resolve()
        } else {
          this.handleActived(params, { type: 'valid-error', trigger: 'call' }).then(() => {
            setTimeout(() => {
              resolve(this.showValidTooltip(params))
            }, 10)
          })
        }
      })
    },
    /**
     * 对表格数据进行校验
     * 如果不指定数据，则默认只校验临时变动的数据，例如新增或修改
     * 如果传 true 则校验当前表格数据
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    beginValidate (rows, cb, isFull) {
      const validRest = {}
      const { editRules, afterFullData, treeConfig, treeOpts } = this
      let vaildDatas
      if (rows === true) {
        vaildDatas = afterFullData
      } else if (rows) {
        if (XEUtils.isFunction(rows)) {
          cb = rows
        } else {
          vaildDatas = XEUtils.isArray(rows) ? rows : [rows]
        }
      }
      if (!vaildDatas) {
        vaildDatas = this.getInsertRecords().concat(this.getUpdateRecords())
      }
      const rowValids = []
      this.lastCallTime = Date.now()
      this.validRuleErr = false // 如果为快速校验，当存在某列校验不通过时将终止执行
      this.clearValidate()
      if (editRules) {
        const columns = this.getColumns()
        const handleVaild = row => {
          if (isFull || !this.validRuleErr) {
            const colVailds = []
            columns.forEach((column) => {
              if ((isFull || !this.validRuleErr) && XEUtils.has(editRules, column.property)) {
                colVailds.push(
                  this.validCellRules('all', row, column)
                    .catch(({ rule, rules }) => {
                      const rest = { rule, rules, rowIndex: this.getRowIndex(row), row, columnIndex: this.getColumnIndex(column), column, $table: this }
                      if (!validRest[column.property]) {
                        validRest[column.property] = []
                      }
                      validRest[column.property].push(rest)
                      if (!isFull) {
                        this.validRuleErr = true
                        return Promise.reject(rest)
                      }
                    })
                )
              }
            })
            rowValids.push(Promise.all(colVailds))
          }
        }
        if (treeConfig) {
          XEUtils.eachTree(vaildDatas, handleVaild, treeOpts)
        } else {
          vaildDatas.forEach(handleVaild)
        }
        return Promise.all(rowValids).then(() => {
          const ruleProps = Object.keys(validRest)
          return this.$nextTick().then(() => {
            if (ruleProps.length) {
              return Promise.reject(validRest[ruleProps[0]][0])
            }
            if (cb) {
              cb()
            }
          })
        }).catch(firstErrParams => {
          return new Promise((resolve, reject) => {
            const finish = () => {
              this.$nextTick(() => {
                if (cb) {
                  cb(validRest)
                  resolve()
                } else {
                  reject(validRest)
                }
              })
            }
            const posAndFinish = () => {
              firstErrParams.cell = this.getCell(firstErrParams.row, firstErrParams.column)
              DomTools.scrollToView(firstErrParams.cell)
              this.handleValidError(firstErrParams).then(finish)
            }
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */
            const row = firstErrParams.row
            const rowIndex = afterFullData.indexOf(row)
            const locatRow = rowIndex > 0 ? afterFullData[rowIndex - 1] : row
            if (this.validOpts.autoPos === false) {
              finish()
            } else {
              if (treeConfig) {
                this.scrollToTreeRow(locatRow).then(posAndFinish)
              } else {
                this.scrollToRow(locatRow).then(posAndFinish)
              }
            }
          })
        })
      }
      return this.$nextTick().then(() => {
        if (cb) {
          cb()
        }
      })
    },
    hasCellRules (type, row, column) {
      const { editRules } = this
      const { property } = column
      if (property && editRules) {
        const rules = XEUtils.get(editRules, property)
        return rules && XEUtils.find(rules, rule => type === 'all' || !rule.trigger || type === rule.trigger)
      }
      return false
    },
    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise<不通过列的错误消息>
     * 如果是传回调方式这返回一个校验不通过列的错误消息
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ cellValue, rule, rules, row, column, rowIndex, columnIndex }) 自定义校验，接收一个 Promise
     *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
     */
    validCellRules (validType, row, column, val) {
      const { editRules } = this
      const { property } = column
      const errorRules = []
      const syncVailds = []
      if (property && editRules) {
        const rules = XEUtils.get(editRules, property)
        if (rules) {
          const cellValue = XEUtils.isUndefined(val) ? XEUtils.get(row, property) : val
          rules.forEach(rule => {
            const { type, trigger, required } = rule
            if (validType === 'all' || !trigger || validType === trigger) {
              if (XEUtils.isFunction(rule.validator)) {
                const customValid = rule.validator({
                  cellValue,
                  rule,
                  rules,
                  row,
                  rowIndex: this.getRowIndex(row),
                  column,
                  columnIndex: this.getColumnIndex(column),
                  $table: this
                })
                if (customValid) {
                  if (XEUtils.isError(customValid)) {
                    this.validRuleErr = true
                    errorRules.push(new Rule({ type: 'custom', trigger, message: customValid.message, rule: new Rule(rule) }))
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(
                      customValid.catch(e => {
                        this.validRuleErr = true
                        errorRules.push(new Rule({ type: 'custom', trigger, message: e && e.message ? e.message : rule.message, rule: new Rule(rule) }))
                      })
                    )
                  }
                }
              } else {
                const isArrType = type === 'array'
                const hasEmpty = isArrType ? (!XEUtils.isArray(cellValue) || !cellValue.length) : eqEmptyValue(cellValue)
                if (required ? (hasEmpty || validErrorRuleValue(rule, cellValue)) : (!hasEmpty && validErrorRuleValue(rule, cellValue))) {
                  this.validRuleErr = true
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
    _clearValidate () {
      const validTip = this.$refs.validTip
      Object.assign(this.validStore, {
        visible: false,
        row: null,
        column: null,
        content: '',
        rule: null
      })
      if (validTip && validTip.visible) {
        validTip.close()
      }
      return this.$nextTick()
    },
    /**
     * 触发校验
     */
    triggerValidate (type) {
      const { editConfig, editStore, editRules, validStore } = this
      const { actived } = editStore
      if (actived.row && editRules) {
        const { row, column, cell } = actived.args
        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(() => {
            if (editConfig.mode === 'row') {
              if (validStore.visible && validStore.row === row && validStore.column === column) {
                this.clearValidate()
              }
            }
          }).catch(({ rule }) => {
            // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
            if (!rule.trigger || type === rule.trigger) {
              const rest = { rule, row, column, cell }
              this.showValidTooltip(rest)
              return Promise.reject(rest)
            }
            return Promise.resolve()
          })
        }
      }
      return Promise.resolve()
    },
    /**
     * 弹出校验错误提示
     */
    showValidTooltip (params) {
      const { $refs, height, tableData, validOpts } = this
      const { rule, row, column, cell } = params
      const validTip = $refs.validTip
      const content = rule.message
      return this.$nextTick(() => {
        Object.assign(this.validStore, {
          row,
          column,
          rule,
          content,
          visible: true
        })
        this.emitEvent('valid-error', params)
        if (validTip && (validOpts.message === 'tooltip' || (validOpts.message === 'default' && !height && tableData.length < 2))) {
          return validTip.open(cell, content)
        }
      })
    }
  }
}

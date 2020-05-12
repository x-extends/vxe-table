import XEUtils from 'xe-utils/methods/xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools, DomTools } from '../../tools'

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

export default {
  methods: {
    /**
     * 与 validate 一致行为，区别就是会校验所有并返回所有不通过的所有列
     */
    _fullValidate (rows, cb) {
      return this.beginValidate(rows, cb, true)
    },
    /**
     * 对表格数据进行校验
     */
    _validate (rows, cb) {
      return this.beginValidate(rows, cb)
    },
    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    handleValidError (params) {
      if (this.validOpts.autoPos === false) {
        this.emitEvent('valid-error', params)
      } else {
        this.handleActived(params, { type: 'valid-error', trigger: 'call' })
          .then(() => this.showValidTooltip(params))
      }
    },
    /**
     * 对表格数据进行校验
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    beginValidate (rows, cb, isAll) {
      const validRest = {}
      let status = true
      const { editRules, afterFullData, treeConfig, treeOpts } = this
      let vaildDatas = afterFullData
      if (rows) {
        if (XEUtils.isFunction(rows)) {
          cb = rows
        } else {
          vaildDatas = XEUtils.isArray(rows) ? rows : [rows]
        }
      }
      const rowValids = []
      this.lastCallTime = Date.now()
      this.clearValidate()
      if (editRules) {
        const columns = this.getColumns()
        const handleVaild = row => {
          const colVailds = []
          columns.forEach((column) => {
            if (XEUtils.has(editRules, column.property)) {
              colVailds.push(
                new Promise((resolve, reject) => {
                  this.validCellRules('all', row, column)
                    .then(resolve)
                    .catch(({ rule, rules }) => {
                      const rest = { rule, rules, [`${treeConfig ? '$' : ''}rowIndex`]: this.getRowIndex(row), row, columnIndex: this.getColumnIndex(column), column, $table: this }
                      if (isAll) {
                        if (!validRest[column.property]) {
                          validRest[column.property] = []
                        }
                        validRest[column.property].push(rest)
                        return resolve()
                      }
                      return reject(rest)
                    })
                })
              )
            }
          })
          rowValids.push(Promise.all(colVailds))
        }
        if (treeConfig) {
          XEUtils.eachTree(vaildDatas, handleVaild, treeOpts)
        } else {
          vaildDatas.forEach(handleVaild)
        }
        return Promise.all(rowValids).then(() => {
          const ruleProps = Object.keys(validRest)
          if (ruleProps.length) {
            return Promise.reject(validRest[ruleProps[0]][0])
          }
          if (cb) {
            // 在 v3.0 中废弃 setup.validArgs
            if (GlobalConfig.validArgs === 'obsolete') {
              cb(status)
            } else {
              cb()
            }
          }
        }).catch(params => {
          const args = isAll ? validRest : { [params.column.property]: params }
          return new Promise((resolve, reject) => {
            const finish = () => {
              status = false
              if (cb) {
                // 在 v3.0 中废弃 setup.validArgs
                if (GlobalConfig.validArgs === 'obsolete') {
                  cb(status, args)
                } else {
                  cb(args)
                }
                resolve()
              } else {
                reject(args)
              }
            }
            const posAndFinish = () => {
              params.cell = DomTools.getCell(this, params)
              this.handleValidError(params)
              finish()
            }
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */
            const row = params.row
            const rowIndex = afterFullData.indexOf(row)
            const locatRow = rowIndex > 0 ? afterFullData[rowIndex - 1] : row
            DomTools.toView(this.$el)
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
      if (cb) {
        // 在 v3.0 中废弃 setup.validArgs
        if (GlobalConfig.validArgs === 'obsolete') {
          cb(status)
        } else {
          cb()
        }
      }
      return Promise.resolve()
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
    validCellRules (type, row, column, val) {
      const { editRules } = this
      const { property } = column
      const errorRules = []
      const cellVailds = []
      if (property && editRules) {
        const rules = XEUtils.get(editRules, property)
        if (rules) {
          const cellValue = XEUtils.isUndefined(val) ? XEUtils.get(row, property) : val
          rules.forEach(rule => {
            cellVailds.push(
              new Promise(resolve => {
                if (type === 'all' || !rule.trigger || type === rule.trigger) {
                  if (XEUtils.isFunction(rule.validator)) {
                    // 在 v3.0 中废弃 setup.validArgs
                    if (GlobalConfig.validArgs === 'obsolete') {
                      rule.validator(rule, cellValue, e => {
                        if (XEUtils.isError(e)) {
                          const cusRule = { type: 'custom', trigger: rule.trigger, message: e.message, rule: new Rule(rule) }
                          errorRules.push(new Rule(cusRule))
                        }
                        return resolve()
                      }, { rule, rules, row, column, rowIndex: this.getRowIndex(row), columnIndex: this.getColumnIndex(column), $table: this })
                    } else {
                      Promise.resolve(rule.validator({
                        cellValue,
                        rule,
                        rules,
                        row,
                        rowIndex: this.getRowIndex(row),
                        column,
                        columnIndex: this.getColumnIndex(column),
                        $table: this
                      })).catch(e => {
                        errorRules.push(new Rule({ type: 'custom', trigger: rule.trigger, message: e ? e.message : rule.message, rule: new Rule(rule) }))
                      }).then(resolve)
                    }
                  } else {
                    const isNumber = rule.type === 'number'
                    const numVal = isNumber ? XEUtils.toNumber(cellValue) : XEUtils.getSize(cellValue)
                    if (cellValue === null || cellValue === undefined || cellValue === '') {
                      if (rule.required) {
                        errorRules.push(new Rule(rule))
                      }
                    } else if (
                      (isNumber && isNaN(cellValue)) ||
                      (!isNaN(rule.min) && numVal < parseFloat(rule.min)) ||
                      (!isNaN(rule.max) && numVal > parseFloat(rule.max)) ||
                      (rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(cellValue))
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
      return Promise.all(cellVailds).then(() => {
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
      this.$nextTick(() => {
        Object.assign(this.validStore, {
          row,
          column,
          rule,
          content,
          visible: true
        })
        if (validTip && (validOpts.message === 'tooltip' || (validOpts.message === 'default' && !height && tableData.length < 2))) {
          validTip.toVisible(cell, content)
        }
        this.emitEvent('valid-error', params)
      })
    }
  }
}

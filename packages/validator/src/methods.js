import XEUtils from 'xe-utils/methods/xe-utils'
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

export default {
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
    this.handleActived(params, { type: 'valid-error', trigger: 'call' })
      .then(() => this.showValidTooltip(params))
  },
  /**
   * 对表格数据进行校验
   * 如果传 row 指定行记录，则只验证传入的行
   * 如果传 rows 为多行记录，则只验证传入的行
   * 如果只传 callback 否则默认验证整个表格数据
   * 返回 Promise 对象，或者使用回调方式
   */
  beginValidate (rows, cb, isAll) {
    let validRest = {}
    let status = true
    let { editRules, tableData, tableFullData, treeConfig, scrollYLoad } = this
    let vaildDatas = scrollYLoad ? tableFullData : tableData
    if (rows) {
      if (XEUtils.isFunction(rows)) {
        cb = rows
      } else {
        vaildDatas = XEUtils.isArray(rows) ? rows : [rows]
      }
    }
    let rowValids = []
    this.lastCallTime = Date.now()
    this.clearValidate()
    if (editRules) {
      let columns = this.getColumns()
      let handleVaild = row => {
        let colVailds = []
        columns.forEach((column, columnIndex) => {
          if (XEUtils.has(editRules, column.property)) {
            colVailds.push(
              new Promise((resolve, reject) => {
                this.validCellRules('all', row, column)
                  .then(resolve)
                  .catch(({ rule, rules }) => {
                    let rest = { rule, rules, [`${treeConfig ? '$' : ''}rowIndex`]: this.getRowIndex(row), row, columnIndex, column, $table: this }
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
        XEUtils.eachTree(vaildDatas, handleVaild, treeConfig)
      } else {
        vaildDatas.forEach(handleVaild)
      }
      return Promise.all(rowValids).then(() => {
        let ruleProps = Object.keys(validRest)
        if (ruleProps.length) {
          return Promise.reject(validRest[ruleProps[0]][0])
        }
        if (cb) {
          cb(status)
        }
      }).catch(params => {
        let args = isAll ? validRest : { [params.column.property]: params }
        return new Promise((resolve, reject) => {
          let finish = () => {
            params.cell = DomTools.getCell(this, params)
            this.handleValidError(params)
            if (cb) {
              status = false
              resolve(cb(status, args))
            } else {
              reject(args)
            }
          }
          if (treeConfig) {
            this.scrollToTreeRow(params.row).then(finish)
          } else if (scrollYLoad) {
            this.scrollToRow(params.row).then(finish)
          } else {
            finish()
          }
        })
      })
    } else {
      if (cb) {
        cb(status)
      }
    }
    return Promise.resolve(true)
  },
  hasCellRules (type, row, column) {
    let { editRules } = this
    let { property } = column
    if (property && editRules) {
      let rules = XEUtils.get(editRules, property)
      return rules && rules.find(rule => type === 'all' || !rule.trigger || type === rule.trigger)
    }
    return false
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
   *  validator=Function(rule, value, callback, {rules, row, column, rowIndex, columnIndex}) 自定义校验
   *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
   */
  validCellRules (type, row, column, val) {
    let { editRules, treeConfig } = this
    let { property } = column
    let errorRules = []
    let cellVailds = []
    if (property && editRules) {
      let rules = XEUtils.get(editRules, property)
      let cellValue = XEUtils.isUndefined(val) ? XEUtils.get(row, property) : val
      if (rules) {
        rules.forEach(rule => {
          cellVailds.push(
            new Promise(resolve => {
              let isRequired = rule.required === true
              if (type === 'all' || !rule.trigger || type === rule.trigger) {
                if (XEUtils.isFunction(rule.validator)) {
                  rule.validator(rule, cellValue, e => {
                    if (XEUtils.isError(e)) {
                      let cusRule = { type: 'custom', trigger: rule.trigger, message: e.message, rule: new Rule(rule) }
                      errorRules.push(new Rule(cusRule))
                    }
                    return resolve()
                  }, { rules, row, column, [`${treeConfig ? '$' : ''}rowIndex`]: this.getRowIndex(row), columnIndex: this.getColumnIndex(column) })
                } else {
                  let len
                  let restVal = cellValue
                  let isNumber = rule.type === 'number'
                  let isEmpty = cellValue === null || cellValue === undefined || cellValue === ''
                  if (isNumber) {
                    restVal = XEUtils.toNumber(cellValue)
                  } else {
                    len = XEUtils.getSize(restVal)
                  }
                  if (isRequired && isEmpty) {
                    errorRules.push(new Rule(rule))
                  } else if (
                    (isNumber && isNaN(cellValue)) ||
                    (XEUtils.isRegExp(rule.pattern) && !rule.pattern.test(cellValue)) ||
                    (XEUtils.isNumber(rule.min) && (isNumber ? restVal < rule.min : len < rule.min)) ||
                    (XEUtils.isNumber(rule.max) && (isNumber ? restVal > rule.max : len > rule.max))
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
        let rest = { rules: errorRules, rule: errorRules[0] }
        return Promise.reject(rest)
      }
    })
  },
  _clearValidate () {
    let validTip = this.$refs.validTip
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
    let { editConfig, editStore, editRules, validStore } = this
    let { actived } = editStore
    if (actived.row && editRules) {
      let { row, column, cell } = actived.args
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
            let rest = { rule, row, column, cell }
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
    let { $refs, height, tableData, validOpts } = this
    let { rule, row, column, cell } = params
    let validTip = $refs.validTip
    let content = rule.message
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
      UtilTools.emitEvent(this, 'valid-error', [params])
    })
  }
}

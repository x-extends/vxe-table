import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { eqEmptyValue, getFuncText } from '../../../ui/src/utils'
import { scrollToView } from '../../../ui/src/dom'
import { handleFieldOrColumn, getRowid } from '../../src/util'
import { warnLog, errLog } from '../../../ui/src/log'

import type { VxeTableDefines, TableInternalData, TableReactData } from '../../../../types'

const { getConfig, validators } = VxeUI

/**
 * 校验规则
 */
class Rule {
  $options: any
  constructor (rule: any) {
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
  get content () {
    return getFuncText(this.$options.content || this.$options.message)
  }

  get message () {
    return this.content
  }
}

// 如果存在 pattern，判断正则
function validREValue (pattern: string | RegExp | undefined, val: string) {
  if (pattern && !(XEUtils.isRegExp(pattern) ? pattern : new RegExp(pattern)).test(val)) {
    return false
  }
  return true
}

// 如果存在 max，判断最大值
function validMaxValue (max: string | number | undefined, num: number) {
  if (!XEUtils.eqNull(max) && num > XEUtils.toNumber(max)) {
    return false
  }
  return true
}

// 如果存在 min，判断最小值
function validMinValue (min: string | number | undefined, num: number) {
  if (!XEUtils.eqNull(min) && num < XEUtils.toNumber(min)) {
    return false
  }
  return true
}

function validRuleValue (rule: VxeTableDefines.ValidatorRule, val: any, required: boolean | undefined) {
  const { type, min, max, pattern } = rule
  const isArrType = type === 'array'
  const isNumType = type === 'number'
  const isStrType = type === 'string'
  const strVal = `${val}`
  if (!validREValue(pattern, strVal)) {
    return false
  }
  if (isArrType) {
    if (!XEUtils.isArray(val)) {
      return false
    }
    if (required) {
      if (!val.length) {
        return false
      }
    }
    if (!validMinValue(min, val.length)) {
      return false
    }
    if (!validMaxValue(max, val.length)) {
      return false
    }
  } else if (isNumType) {
    const numVal = Number(val)
    if (isNaN(numVal)) {
      return false
    }
    if (!validMinValue(min, numVal)) {
      return false
    }
    if (!validMaxValue(max, numVal)) {
      return false
    }
  } else {
    if (isStrType) {
      if (!XEUtils.isString(val)) {
        return false
      }
    }
    if (required) {
      if (!strVal) {
        return false
      }
    }
    if (!validMinValue(min, strVal.length)) {
      return false
    }
    if (!validMaxValue(max, strVal.length)) {
      return false
    }
  }
  return true
}

function checkRuleStatus (rule: VxeTableDefines.ValidatorRule, val: any) {
  const { required } = rule
  const isEmptyVal = XEUtils.isArray(val) ? !val.length : eqEmptyValue(val)
  if (required) {
    if (isEmptyVal) {
      return false
    }
    if (!validRuleValue(rule, val, required)) {
      return false
    }
  } else {
    if (!isEmptyVal) {
      if (!validRuleValue(rule, val, required)) {
        return false
      }
    }
  }
  return true
}

export default {
  methods: {
    /**
     * 完整校验，和 validate 的区别就是会给有效数据中的每一行进行校验
     */
    _fullValidate (rows: any, cb: any) {
      if (XEUtils.isFunction(cb)) {
        warnLog('vxe.error.notValidators', ['fullValidate(rows, callback)', 'fullValidate(rows)'])
      }
      return this.beginValidate(rows, null, cb, true)
    },
    /**
     * 快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）
     */
    _validate (rows: any, cb: any) {
      if (XEUtils.isFunction(cb)) {
        warnLog('vxe.error.notValidators', ['validate(rows, callback)', 'validate(rows)'])
      }
      return this.beginValidate(rows, null, cb)
    },
    /**
     * 完整校验单元格，和 validateField 的区别就是会给有效数据中的每一行进行校验
     */
    _fullValidateField (rows: any, fieldOrColumn: any) {
      const colList = (XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : (fieldOrColumn ? [fieldOrColumn] : [])).map(column => handleFieldOrColumn(this, column))
      if (colList.length) {
        return this.beginValidate(rows, colList, null, true)
      }
      return this.$nextTick()
    },
    /**
     * 快速校验单元格，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）
     */
    _validateField (rows: any, fieldOrColumn: any) {
      const colList = (XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : (fieldOrColumn ? [fieldOrColumn] : [])).map(column => handleFieldOrColumn(this, column))
      if (colList.length) {
        return this.beginValidate(rows, colList, null)
      }
      return this.$nextTick()
    },
    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    handleValidError (params: any) {
      const { validOpts } = this
      return new Promise<void>(resolve => {
        if (validOpts.autoPos === false) {
          this.emitEvent('valid-error', params)
          resolve()
        } else {
          this.handleEdit(params, { type: 'valid-error', trigger: 'call' }).then(() => {
            setTimeout(() => {
              resolve(this.showValidTooltip(params))
            }, 10)
          })
        }
      })
    },
    handleErrMsgMode (validErrMaps: any) {
      const { validOpts } = this
      if (validOpts.msgMode === 'single') {
        const keys = Object.keys(validErrMaps)
        const resMaps: Record<string, {
          row: any;
          column: any;
          rule: any;
          content: any;
        }> = {}
        if (keys.length) {
          const firstKey = keys[0]
          resMaps[firstKey] = validErrMaps[firstKey]
        }
        return resMaps
      }
      return validErrMaps
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
    beginValidate (rows: any, cols: VxeTableDefines.ColumnInfo[] | null, cb: any, isFull: any) {
      const $xeTable = this
      const props = $xeTable
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const validRest: any = {}
      const { editRules, treeConfig } = props
      const { isRowGroupStatus } = reactData
      const { afterFullData, pendingRowMaps, removeRowMaps } = internalData
      const treeOpts = $xeTable.computeTreeOpts
      const aggregateOpts = $xeTable.computeAggregateOpts
      let validList
      if (rows === true) {
        validList = afterFullData
      } else if (rows) {
        if (XEUtils.isFunction(rows)) {
          cb = rows
        } else {
          validList = XEUtils.isArray(rows) ? rows : [rows]
        }
      }
      if (!validList) {
        validList = this.getInsertRecords().concat(this.getUpdateRecords())
      }
      const rowValidErrs: any[] = []
      this.lastCallTime = Date.now()
      this.validRuleErr = false // 如果为快速校验，当存在某列校验不通过时将终止执行
      this.clearValidate()
      const validErrMaps: any = {}
      if (editRules) {
        const columns = cols && cols.length ? cols : this.getColumns()
        const handleVaild = (row: any) => {
          const rowid = getRowid($xeTable, row)
          // 是否删除
          if (removeRowMaps[rowid]) {
            return
          }
          // 是否标记删除
          if (pendingRowMaps[rowid]) {
            return
          }
          if ($xeTable.isAggregateRecord(row)) {
            return
          }
          if (isFull || !this.validRuleErr) {
            const colVailds: any[] = []
            columns.forEach((column: any) => {
              const field = XEUtils.isString(column) ? column : column.field
              if ((isFull || !this.validRuleErr) && XEUtils.has(editRules, field)) {
                colVailds.push(
                  this.validCellRules('all', row, column)
                    .catch(({ rule, rules }: any) => {
                      const rest = {
                        rule,
                        rules,
                        rowIndex: this.getRowIndex(row),
                        row,
                        columnIndex: this.getColumnIndex(column),
                        column,
                        field,
                        $table: this
                      }
                      if (!validRest[field]) {
                        validRest[field] = []
                      }
                      validErrMaps[`${getRowid(this, row)}:${column.id}`] = {
                        column,
                        row,
                        rule,
                        content: rule.content
                      }
                      validRest[field].push(rest)
                      if (!isFull) {
                        this.validRuleErr = true
                        return Promise.reject(rest)
                      }
                    })
                )
              }
            })
            rowValidErrs.push(Promise.all(colVailds))
          }
        }
        if (isRowGroupStatus) {
          XEUtils.eachTree(validList, handleVaild, { children: aggregateOpts.mapChildrenField })
        } else if (treeConfig) {
          const childrenField = treeOpts.children || treeOpts.childrenField
          XEUtils.eachTree(validList, handleVaild, { children: childrenField })
        } else {
          validList.forEach(handleVaild)
        }
        return Promise.all(rowValidErrs).then(() => {
          const ruleProps = Object.keys(validRest)
          this.validErrorMaps = this.handleErrMsgMode(validErrMaps)
          return this.$nextTick().then(() => {
            if (ruleProps.length) {
              return Promise.reject(validRest[ruleProps[0]][0])
            }
            if (cb) {
              cb()
            }
          })
        }).catch(firstErrParams => {
          return new Promise<void>((resolve, reject) => {
            const finish = () => {
              this.$nextTick(() => {
                if (cb) {
                  cb(validRest)
                  resolve()
                } else {
                  if (getConfig().validToReject === 'obsolete') {
                    // 已废弃，校验失败将不会执行catch
                    reject(validRest)
                  } else {
                    resolve(validRest)
                  }
                }
              })
            }
            const posAndFinish = () => {
              firstErrParams.cell = this.getCellElement(firstErrParams.row, firstErrParams.column)
              scrollToView(firstErrParams.cell)
              this.handleValidError(firstErrParams).then(finish)
            }
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */
            if (this.validOpts.autoPos === false) {
              finish()
            } else {
              const row = firstErrParams.row
              const column = firstErrParams.column
              this.scrollToRow(row, column).then(posAndFinish)
            }
          })
        })
      } else {
        this.validErrorMaps = {}
      }
      return this.$nextTick().then(() => {
        if (cb) {
          cb()
        }
      })
    },
    hasCellRules (type: any, row: any, column: any) {
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
    validCellRules (validType: any, row: any, column: any, val: any) {
      const { editRules } = this
      const { property } = column
      const errorRules: any[] = []
      const syncValidList: any[] = []
      if (property && editRules) {
        const rules = XEUtils.get(editRules, property)
        if (rules) {
          const cellValue = XEUtils.isUndefined(val) ? XEUtils.get(row, property) : val
          rules.forEach((rule: any) => {
            const { trigger, validator } = rule
            if (validType === 'all' || !trigger || validType === trigger) {
              if (validator) {
                const validParams: any = {
                  cellValue,
                  rule,
                  rules,
                  row,
                  rowIndex: this.getRowIndex(row),
                  column,
                  columnIndex: this.getColumnIndex(column),
                  field: column.property,
                  $table: this
                }
                let customValid
                if (XEUtils.isString(validator)) {
                  const gvItem = validators.get(validator)
                  if (gvItem) {
                    const tcvMethod = gvItem.tableCellValidatorMethod || gvItem.cellValidatorMethod
                    if (tcvMethod) {
                      customValid = tcvMethod(validParams)
                    } else {
                      errLog('vxe.error.notValidators', [validator])
                    }
                  } else {
                    errLog('vxe.error.notValidators', [validator])
                  }
                } else {
                  customValid = validator(validParams)
                }
                if (customValid) {
                  if (XEUtils.isError(customValid)) {
                    this.validRuleErr = true
                    errorRules.push(new Rule({ type: 'custom', trigger, content: customValid.message, rule: new Rule(rule) }))
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncValidList.push(
                      customValid.catch((e: any) => {
                        this.validRuleErr = true
                        errorRules.push(new Rule({ type: 'custom', trigger, content: e && e.message ? e.message : (rule.content || rule.message), rule: new Rule(rule) }))
                      })
                    )
                  }
                }
              } else {
                if (!checkRuleStatus(rule, cellValue)) {
                  this.validRuleErr = true
                  errorRules.push(new Rule(rule))
                }
              }
            }
          })
        }
      }
      return Promise.all(syncValidList).then(() => {
        if (errorRules.length) {
          const rest = { rules: errorRules, rule: errorRules[0] }
          return Promise.reject(rest)
        }
      })
    },
    _clearValidate  (rows: any, fieldOrColumn: any) {
      const { validOpts, validErrorMaps } = this
      const validTip = this.$refs.refValidTooltip
      const rowList = XEUtils.isArray(rows) ? rows : (rows ? [rows] : [])
      const colList = (XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : (fieldOrColumn ? [fieldOrColumn] : [])).map(column => handleFieldOrColumn(this, column))
      let validErrMaps: any = {}
      if (validTip && validTip.visible) {
        validTip.close()
      }
      // 如果是单个提示模式
      if (validOpts.msgMode === 'single') {
        this.validErrorMaps = {}
        return this.$nextTick()
      }
      if (rowList.length && colList.length) {
        validErrMaps = Object.assign({}, validErrorMaps)
        rowList.forEach(row => {
          colList.forEach((column) => {
            const validKey = `${getRowid(this, row)}:${column.id}`
            if (validErrMaps[validKey]) {
              delete validErrMaps[validKey]
            }
          })
        })
      } else if (rowList.length) {
        const rowIdList = rowList.map(row => `${getRowid(this, row)}`)
        XEUtils.each(validErrorMaps, (item, key) => {
          if (rowIdList.indexOf(key.split(':')[0]) > -1) {
            validErrMaps[key] = item
          }
        })
      } else if (colList.length) {
        const colidList = colList.map(column => `${column.id}`)
        XEUtils.each(validErrorMaps, (item, key) => {
          if (colidList.indexOf(key.split(':')[1]) > -1) {
            validErrMaps[key] = item
          }
        })
      }
      this.validErrorMaps = validErrMaps
      return this.$nextTick()
    },
    /**
     * 触发校验
     */
    triggerValidate (type: any) {
      const { editConfig, editStore, editRules, editOpts, validOpts } = this
      const { actived } = editStore
      // 检查清除校验消息
      if (editRules && validOpts.msgMode === 'single') {
        this.validErrorMaps = {}
      }

      // 校验单元格
      if (editConfig && editRules && actived.row) {
        const { row, column, cell } = actived.args
        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(() => {
            if (editOpts.mode === 'row') {
              this.clearValidate(row, column)
            }
          }).catch(({ rule }: any) => {
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
    showValidTooltip (params: any) {
      const { $refs, height, validStore, validErrorMaps, tableData, validOpts } = this
      const { rule, row, column, cell } = params
      const validTip = $refs.refValidTooltip
      const content = rule.content
      validStore.visible = true
      if (validOpts.msgMode === 'single') {
        this.validErrorMaps = {
          [`${getRowid(this, row)}:${column.id}`]: {
            column,
            row,
            rule,
            content
          }
        }
      } else {
        this.validErrorMaps = Object.assign({}, validErrorMaps, {
          [`${getRowid(this, row)}:${column.id}`]: {
            column,
            row,
            rule,
            content
          }
        })
      }
      this.emitEvent('valid-error', params, null)
      if (validTip) {
        if (validTip && (validOpts.message === 'tooltip' || (validOpts.message === 'default' && !height && tableData.length < 2))) {
          return validTip.open(cell, content)
        }
      }
      return this.$nextTick()
    }
  } as any
}

import { nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { getFuncText, eqEmptyValue } from '../../tools/utils'
import { scrollToView } from '../../tools/dom'

import { VxeGlobalHooksHandles, TableValidatorMethods, TableValidatorPrivateMethods, VxeTableDefines } from '../../../types/all'

/**
 * 校验规则
 */
class Rule {
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
  get message () {
    return getFuncText(this.$options.message)
  }

  [key: string]: any
}

const tableValidatorMethodKeys: (keyof TableValidatorMethods)[] = ['fullValidate', 'validate', 'clearValidate']

const validatorHook: VxeGlobalHooksHandles.HookOptions = {
  setupTable ($xetable) {
    const { props, reactData, internalData } = $xetable
    const { refValidTooltip } = $xetable.getRefMaps()
    const { computeValidOpts, computeTreeOpts, computeEditOpts } = $xetable.getComputeMaps()

    let validatorMethods = {} as TableValidatorMethods
    let validatorPrivateMethods = {} as TableValidatorPrivateMethods

    let validRuleErr: boolean

    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    const handleValidError = (params: any): Promise<void> => {
      return new Promise(resolve => {
        const validOpts = computeValidOpts.value
        if (validOpts.autoPos === false) {
          $xetable.dispatchEvent('valid-error', params, null)
          resolve()
        } else {
          $xetable.handleActived(params, { type: 'valid-error', trigger: 'call' }).then(() => {
            setTimeout(() => {
              resolve(validatorPrivateMethods.showValidTooltip(params))
            }, 10)
          })
        }
      })
    }

    /**
     * 对表格数据进行校验
     * 如果不指定数据，则默认只校验临时变动的数据，例如新增或修改
     * 如果传 true 则校验当前表格数据
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    const beginValidate = (rows: any, cb: any, isFull?: boolean): Promise<any> => {
      const validRest: any = {}
      const { editRules, treeConfig } = props
      const { afterFullData } = internalData
      const treeOpts = computeTreeOpts.value
      const validOpts = computeValidOpts.value
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
        if ($xetable.getInsertRecords) {
          vaildDatas = $xetable.getInsertRecords().concat($xetable.getUpdateRecords())
        } else {
          vaildDatas = []
        }
      }
      const rowValids: any = []
      internalData._lastCallTime = Date.now()
      validRuleErr = false // 如果为快速校验，当存在某列校验不通过时将终止执行
      validatorMethods.clearValidate()
      if (editRules) {
        const columns = $xetable.getColumns()
        const handleVaild = (row: any) => {
          if (isFull || !validRuleErr) {
            const colVailds: any[] = []
            columns.forEach((column: any) => {
              if ((isFull || !validRuleErr) && XEUtils.has(editRules, column.property)) {
                colVailds.push(
                  validatorPrivateMethods.validCellRules('all', row, column)
                    .catch(({ rule, rules }: any) => {
                      const rest = {
                        rule,
                        rules,
                        rowIndex: $xetable.getRowIndex(row),
                        row,
                        columnIndex: $xetable.getColumnIndex(column),
                        column,
                        $table: $xetable
                      }
                      if (!validRest[column.property]) {
                        validRest[column.property] = []
                      }
                      validRest[column.property].push(rest)
                      if (!isFull) {
                        validRuleErr = true
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
          return nextTick().then(() => {
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
              nextTick(() => {
                if (cb) {
                  cb(validRest)
                  resolve()
                } else {
                  reject(validRest)
                }
              })
            }
            const posAndFinish = () => {
              firstErrParams.cell = $xetable.getCell(firstErrParams.row, firstErrParams.column)
              scrollToView(firstErrParams.cell)
              handleValidError(firstErrParams).then(finish)
            }
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */
            const row = firstErrParams.row
            const rowIndex = afterFullData.indexOf(row)
            const locatRow = rowIndex > 0 ? afterFullData[rowIndex - 1] : row
            if (validOpts.autoPos === false) {
              finish()
            } else {
              if (treeConfig) {
                $xetable.scrollToTreeRow(locatRow).then(posAndFinish)
              } else {
                $xetable.scrollToRow(locatRow).then(posAndFinish)
              }
            }
          })
        })
      }
      return nextTick().then(() => {
        if (cb) {
          cb()
        }
      })
    }

    validatorMethods = {
      /**
       * 完整校验，和 validate 的区别就是会给有效数据中的每一行进行校验
       */
      fullValidate (rows, cb) {
        return beginValidate(rows, cb, true)
      },
      /**
       * 快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）
       */
      validate (rows, cb) {
        return beginValidate(rows, cb)
      },
      clearValidate () {
        const { validStore } = reactData
        const validTip = refValidTooltip.value
        Object.assign(validStore, {
          visible: false,
          row: null,
          column: null,
          content: '',
          rule: null
        })
        if (validTip && validTip.reactData.visible) {
          validTip.close()
        }
        return nextTick()
      }
    }

    const validErrorRuleValue = (rule: VxeTableDefines.ValidatorRule, val: any) => {
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

    validatorPrivateMethods = {
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
        const { editRules } = props
        const { property } = column
        const errorRules: Rule[] = []
        const syncVailds: Promise<any>[] = []
        if (property && editRules) {
          const rules = XEUtils.get(editRules, property)
          if (rules) {
            const cellValue = XEUtils.isUndefined(val) ? XEUtils.get(row, property) : val
            rules.forEach((rule: any) => {
              const { type, trigger, required } = rule
              if (validType === 'all' || !trigger || validType === trigger) {
                if (XEUtils.isFunction(rule.validator)) {
                  const customValid = rule.validator({
                    cellValue,
                    rule,
                    rules,
                    row,
                    rowIndex: $xetable.getRowIndex(row),
                    column,
                    columnIndex: $xetable.getColumnIndex(column),
                    $table: $xetable
                  })
                  if (customValid) {
                    if (XEUtils.isError(customValid)) {
                      validRuleErr = true
                      errorRules.push(new Rule({ type: 'custom', trigger, message: customValid.message, rule: new Rule(rule) }))
                    } else if (customValid.catch) {
                      // 如果为异步校验（注：异步校验是并发无序的）
                      syncVailds.push(
                        customValid.catch((e: any) => {
                          validRuleErr = true
                          errorRules.push(new Rule({ type: 'custom', trigger, message: e && e.message ? e.message : rule.message, rule: new Rule(rule) }))
                        })
                      )
                    }
                  }
                } else {
                  const isArrType = type === 'array'
                  const hasEmpty = isArrType ? (!XEUtils.isArray(cellValue) || !cellValue.length) : eqEmptyValue(cellValue)
                  if (required ? (hasEmpty || validErrorRuleValue(rule, cellValue)) : (!hasEmpty && validErrorRuleValue(rule, cellValue))) {
                    validRuleErr = true
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
      hasCellRules (type, row, column) {
        const { editRules } = props
        const { property } = column
        if (property && editRules) {
          const rules = XEUtils.get(editRules, property)
          return rules && !!XEUtils.find(rules, rule => type === 'all' || !rule.trigger || type === rule.trigger)
        }
        return false
      },
      /**
       * 触发校验
       */
      triggerValidate (type) {
        const { editConfig, editRules } = props
        const { editStore, validStore } = reactData
        const { actived } = editStore
        const editOpts = computeEditOpts.value
        if (editConfig && editRules && actived.row) {
          const { row, column, cell } = actived.args
          if (validatorPrivateMethods.hasCellRules(type, row, column)) {
            return validatorPrivateMethods.validCellRules(type, row, column).then(() => {
              if (editOpts.mode === 'row') {
                if (validStore.visible && validStore.row === row && validStore.column === column) {
                  validatorMethods.clearValidate()
                }
              }
            }).catch(({ rule }: any) => {
              // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
              if (!rule.trigger || type === rule.trigger) {
                const rest = { rule, row, column, cell }
                validatorPrivateMethods.showValidTooltip(rest)
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
        const { height } = props
        const { tableData, validStore } = reactData
        const validOpts = computeValidOpts.value
        const { rule, row, column, cell } = params
        const validTip = refValidTooltip.value
        const content = rule.message
        return nextTick().then(() => {
          Object.assign(validStore, {
            row,
            column,
            rule,
            content,
            visible: true
          })
          $xetable.dispatchEvent('valid-error', params, null)
          if (validTip && (validOpts.message === 'tooltip' || (validOpts.message === 'default' && !height && tableData.length < 2))) {
            return validTip.open(cell, content)
          }
        })
      }
    }

    return { ...validatorMethods, ...validatorPrivateMethods }
  },
  setupGrid ($xegrid) {
    return $xegrid.extendTableMethods(tableValidatorMethodKeys)
  }
}

export default validatorHook

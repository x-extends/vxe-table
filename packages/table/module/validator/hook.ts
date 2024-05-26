import { nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { getConfig, validators, hooks, log } from '@vxe-ui/core'
import { getFuncText, eqEmptyValue } from '../../../ui/src/utils'
import { scrollToView } from '../../../ui/src/dom'
import { handleFieldOrColumn, getRowid } from '../../src/util'

import type { TableValidatorMethods, TableValidatorPrivateMethods, VxeTableDefines } from '../../../../types'

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
  get content () {
    return getFuncText(this.$options.content || this.$options.message)
  }

  get message () {
    return this.content
  }

  [key: string]: any
}

const tableValidatorMethodKeys: (keyof TableValidatorMethods)[] = ['fullValidate', 'validate', 'clearValidate']

hooks.add('tableValidatorModule', {
  setupTable ($xeTable) {
    const { props, reactData, internalData } = $xeTable
    const { refValidTooltip } = $xeTable.getRefMaps()
    const { computeValidOpts, computeTreeOpts, computeEditOpts } = $xeTable.getComputeMaps()

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
          $xeTable.dispatchEvent('valid-error', params, null)
          resolve()
        } else {
          $xeTable.handleActived(params, { type: 'valid-error', trigger: 'call' }).then(() => {
            resolve(validatorPrivateMethods.showValidTooltip(params))
          })
        }
      })
    }

    const handleErrMsgMode = (validErrMaps: Record<string, {
      row: any;
      column: any;
      rule: any;
      content: any;
    }>) => {
      const validOpts = computeValidOpts.value
      if (validOpts.msgMode === 'single') {
        const keys = Object.keys(validErrMaps)
        const resMaps: Record<string, {
          row: any;
          column: any;
          rule: any;
          content: any;
        }> = validErrMaps
        if (keys.length) {
          const firstKey = keys[0]
          resMaps[firstKey] = validErrMaps[firstKey]
        }
        return resMaps
      }
      return validErrMaps
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
      const { afterFullData, visibleColumn } = internalData
      const treeOpts = computeTreeOpts.value
      const childrenField = treeOpts.children || treeOpts.childrenField
      const validOpts = computeValidOpts.value
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
        if ($xeTable.getInsertRecords) {
          validList = $xeTable.getInsertRecords().concat($xeTable.getUpdateRecords())
        } else {
          validList = []
        }
      }
      const rowValidErrs: any = []
      internalData._lastCallTime = Date.now()
      validRuleErr = false // 如果为快速校验，当存在某列校验不通过时将终止执行
      validatorMethods.clearValidate()
      const validErrMaps: Record<string, {
        row: any;
        column: any;
        rule: any;
        content: any;
      }> = {}
      if (editRules) {
        const columns = $xeTable.getColumns()
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
                        rowIndex: $xeTable.getRowIndex(row),
                        row,
                        columnIndex: $xeTable.getColumnIndex(column),
                        column,
                        field: column.property,
                        $table: $xeTable
                      }
                      if (!validRest[column.property]) {
                        validRest[column.property] = []
                      }
                      validErrMaps[`${getRowid($xeTable, row)}:${column.id}`] = {
                        column,
                        row,
                        rule,
                        content: rule.content
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
            rowValidErrs.push(Promise.all(colVailds))
          }
        }
        if (treeConfig) {
          XEUtils.eachTree(validList, handleVaild, { children: childrenField })
        } else {
          validList.forEach(handleVaild)
        }
        return Promise.all(rowValidErrs).then(() => {
          const ruleProps = Object.keys(validRest)
          reactData.validErrorMaps = handleErrMsgMode(validErrMaps)
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
              firstErrParams.cell = $xeTable.getCell(firstErrParams.row, firstErrParams.column)
              scrollToView(firstErrParams.cell)
              handleValidError(firstErrParams).then(finish)
            }
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */
            if (validOpts.autoPos === false) {
              finish()
            } else {
              const row = firstErrParams.row
              const column = firstErrParams.column
              const rowIndex = afterFullData.indexOf(row)
              const columnIndex = visibleColumn.indexOf(column)
              const targetRow = rowIndex > 0 ? afterFullData[rowIndex - 1] : row
              const targetColumn = columnIndex > 0 ? visibleColumn[columnIndex - 1] : column
              $xeTable.scrollToRow(targetRow, targetColumn).then(posAndFinish)
            }
          })
        })
      } else {
        reactData.validErrorMaps = {}
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
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (XEUtils.isFunction(cb)) {
            log.warn('vxe.error.notValidators', ['fullValidate(rows, callback)', 'fullValidate(rows)'])
          }
        }
        return beginValidate(rows, cb, true)
      },
      /**
       * 快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）
       */
      validate (rows, cb) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (XEUtils.isFunction(cb)) {
            log.warn('vxe.error.notValidators', ['validate(rows, callback)', 'validate(rows)'])
          }
        }
        return beginValidate(rows, cb)
      },
      clearValidate (rows, fieldOrColumn) {
        const { validErrorMaps } = reactData
        const validTip = refValidTooltip.value
        const validOpts = computeValidOpts.value
        const rowList = XEUtils.isArray(rows) ? rows : (rows ? [rows] : [])
        const colList = (XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : (fieldOrColumn ? [fieldOrColumn] : []).map(column => handleFieldOrColumn($xeTable, column))) as VxeTableDefines.ColumnInfo<any>[]
        let validErrMaps: Record<string, {
          row: any;
          column: any;
          rule: any;
          content: any;
        }> = {}
        if (validTip && validTip.reactData.visible) {
          validTip.close()
        }
        // 如果是单个提示模式
        if (validOpts.msgMode === 'single') {
          reactData.validErrorMaps = {}
          return nextTick()
        }
        if (rowList.length && colList.length) {
          validErrMaps = Object.assign({}, validErrorMaps)
          rowList.forEach(row => {
            colList.forEach((column) => {
              const validKey = `${getRowid($xeTable, row)}:${column.id}`
              if (validErrMaps[validKey]) {
                delete validErrMaps[validKey]
              }
            })
          })
        } else if (rowList.length) {
          const rowIdList = rowList.map(row => `${getRowid($xeTable, row)}`)
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
        reactData.validErrorMaps = validErrMaps
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
        const { field } = column
        const errorRules: Rule[] = []
        const syncValidList: Promise<any>[] = []
        if (field && editRules) {
          const rules = XEUtils.get(editRules, field)
          if (rules) {
            const cellValue = XEUtils.isUndefined(val) ? XEUtils.get(row, field) : val
            rules.forEach((rule) => {
              const { type, trigger, required, validator } = rule
              if (validType === 'all' || !trigger || validType === trigger) {
                if (validator) {
                  const validParams = {
                    cellValue,
                    rule,
                    rules,
                    row,
                    rowIndex: $xeTable.getRowIndex(row),
                    column,
                    columnIndex: $xeTable.getColumnIndex(column),
                    field: column.field,
                    $table: $xeTable,
                    $grid: $xeTable.xegrid
                  }
                  let customValid: any
                  if (XEUtils.isString(validator)) {
                    const gvItem = validators.get(validator)
                    if (gvItem) {
                      if (gvItem.cellValidatorMethod) {
                        customValid = gvItem.cellValidatorMethod(validParams)
                      } else {
                        if (process.env.VUE_APP_VXE_ENV === 'development') {
                          log.warn('vxe.error.notValidators', [validator])
                        }
                      }
                    } else {
                      if (process.env.VUE_APP_VXE_ENV === 'development') {
                        log.err('vxe.error.notValidators', [validator])
                      }
                    }
                  } else {
                    customValid = validator(validParams)
                  }
                  if (customValid) {
                    if (XEUtils.isError(customValid)) {
                      validRuleErr = true
                      errorRules.push(new Rule({ type: 'custom', trigger, content: customValid.message, rule: new Rule(rule) }))
                    } else if (customValid.catch) {
                      // 如果为异步校验（注：异步校验是并发无序的）
                      syncValidList.push(
                        customValid.catch((e: any) => {
                          validRuleErr = true
                          errorRules.push(new Rule({ type: 'custom', trigger, content: e && e.message ? e.message : (rule.content || rule.message), rule: new Rule(rule) }))
                        })
                      )
                    }
                  }
                } else {
                  const isArrType = type === 'array'
                  const isArrVal = XEUtils.isArray(cellValue)
                  let hasEmpty = true
                  if (isArrType || isArrVal) {
                    hasEmpty = !isArrVal || !cellValue.length
                  } else if (XEUtils.isString(cellValue)) {
                    hasEmpty = eqEmptyValue(cellValue.trim())
                  } else {
                    hasEmpty = eqEmptyValue(cellValue)
                  }
                  if (required ? (hasEmpty || validErrorRuleValue(rule, cellValue)) : (!hasEmpty && validErrorRuleValue(rule, cellValue))) {
                    validRuleErr = true
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
      hasCellRules (type, row, column) {
        const { editRules } = props
        const { field } = column
        if (field && editRules) {
          const rules = XEUtils.get(editRules, field)
          return rules && !!XEUtils.find(rules, rule => type === 'all' || !rule.trigger || type === rule.trigger)
        }
        return false
      },
      /**
       * 触发校验
       */
      triggerValidate (type) {
        const { editConfig, editRules } = props
        const { editStore } = reactData
        const { actived } = editStore
        const editOpts = computeEditOpts.value
        const validOpts = computeValidOpts.value
        // 检查清除校验消息
        if (editRules && validOpts.msgMode === 'single') {
          reactData.validErrorMaps = {}
        }

        // 校验单元格
        if (editConfig && editRules && actived.row) {
          const { row, column, cell } = actived.args
          if (validatorPrivateMethods.hasCellRules(type, row, column)) {
            return validatorPrivateMethods.validCellRules(type, row, column).then(() => {
              if (editOpts.mode === 'row') {
                validatorMethods.clearValidate(row, column)
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
        const { tableData, validStore, validErrorMaps } = reactData
        const { rule, row, column, cell } = params
        const validOpts = computeValidOpts.value
        const validTip = refValidTooltip.value
        const content = rule.content
        validStore.visible = true
        if (validOpts.msgMode === 'single') {
          reactData.validErrorMaps = {
            [`${getRowid($xeTable, row)}:${column.id}`]: {
              column,
              row,
              rule,
              content
            }
          }
        } else {
          reactData.validErrorMaps = Object.assign({}, validErrorMaps, {
            [`${getRowid($xeTable, row)}:${column.id}`]: {
              column,
              row,
              rule,
              content
            }
          })
        }
        $xeTable.dispatchEvent('valid-error', params, null)
        if (validTip) {
          if (validTip && (validOpts.message === 'tooltip' || (validOpts.message === 'default' && !height && tableData.length < 2))) {
            return validTip.open(cell, content)
          }
        }
        return nextTick()
      }
    }

    return { ...validatorMethods, ...validatorPrivateMethods }
  },
  setupGrid ($xeGrid) {
    return $xeGrid.extendTableMethods(tableValidatorMethodKeys)
  }
})

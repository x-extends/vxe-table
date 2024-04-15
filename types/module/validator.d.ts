import { VXEComponent } from '../component'
import { VxeTableDefines, VxeTableDataRow, VxeTableConstructor } from '../table'
import { VxeGridConstructor } from '../grid'
import { VxeColumnPropTypes } from '../column'

/* eslint-disable no-use-before-define */

/**
 * 表格模块 - 校验模块
 */
export const VxeTableValidatorModule: VXEComponent<{ [key: string]: any }>
/**
 * 表格模块 - 校验模块
 */
export const Validator: VXEComponent<{ [key: string]: any }>

export interface TableValidatorMethods<D = VxeTableDataRow> {
  /**
   * 手动清除校验
   */
  clearValidate(rows?: any, fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any> | VxeColumnPropTypes.Field[] | VxeTableDefines.ColumnInfo<any>[]): Promise<void>
  /**
   * 完整校验，默认校验当前表格数据，和 validate 的区别就是默认校验当前表格数据并且给有效数据中的每一行进行校验
   * @param rows 指定行
   */
  fullValidate(rows?: boolean | object | any[] | ((errMap: VxeTableDefines.ValidatorErrorMapParams<D>) => void), callback?: (errMap: VxeTableDefines.ValidatorErrorMapParams<D>) => void): Promise<VxeTableDefines.ValidatorErrorMapParams<D>>
  /**
   * 快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）；
   * 如果第一个参数为 true 则校验当前表格数据，如果指定 row 或 rows 则校验指定一行或多行，如果不指定数据，则默认只校验临时变动的数据，例如新增或修改。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise
   * @param rows 指定行
   */
  validate(rows?: boolean | object | any[] | ((errMap?: VxeTableDefines.ValidatorErrorMapParams<D>) => void), callback?: (errMap?: VxeTableDefines.ValidatorErrorMapParams<D>) => void): Promise<VxeTableDefines.ValidatorErrorMapParams<D>>
}

export interface TableValidatorPrivateMethods<D = VxeTableDataRow> {
  validCellRules(type: any, row: any, column: VxeTableDefines.ColumnInfo<any>, val?: any): Promise<any>
  hasCellRules(type: any, row: any, column: VxeTableDefines.ColumnInfo<any>): boolean
  triggerValidate(type: any): Promise<any>
  showValidTooltip(params: any): void
}

declare module '../grid' {
  export interface VxeGridMethods<D = VxeTableDataRow> extends TableValidatorMethods<D> { }
}

declare module '../table' {
  export interface VxeTableMethods<D = VxeTableDataRow> extends TableValidatorMethods<D> { }
  export interface VxeTablePrivateMethods<D = VxeTableDataRow> extends TableValidatorPrivateMethods<D> { }
  export namespace VxeTableDefines {
    export interface ValidatorRule<D = VxeTableDataRow> {
      /**
       * 是否必填
       */
      required?: boolean
      /**
       * 最小长度/值
       */
      min?: number | string
      /**
       * 最大长度/值
       */
      max?: number | string
      /**
       * 数据类型
       */
      type?: 'number' | 'string' | 'array' | '' | null
      /**
       * 使用正则表达式校验
       */
      pattern?: string | RegExp
      /**
       * 使用自定义校验函数，接收一个 Promise
       * @param params 参数
       */
      validator?: string | ((params: RuleValidatorParams<D>) => void | Error | Promise<void>)
      /**
       * 提示消息
       */
      content?: string
      trigger?: 'blur' | 'change' | 'manual' | '' | null
      maxWidth?: number
      /**
       * @deprecated 已废弃，请使用 content
       */
      message?: string
    }
    export interface RuleValidatorParams<D = VxeTableDataRow> {
      $table: VxeTableConstructor<D>
      $grid: VxeGridConstructor<D> | null
      cellValue: any
      rule: ValidatorRule<D>
      rules: ValidatorRule<D>[]
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      row: D
      rowIndex: number
      field: string
    }
    export interface ValidatorErrorParams<D = VxeTableDataRow> {
      $table: VxeTableConstructor<D>
      cellValue: any
      rule: ValidatorRule<D>
      rules: ValidatorRule<D>[]
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      row: D
      rowIndex: number
      field: string
    }
    export interface ValidatorErrorMapParams<D = VxeTableDataRow> {
      [key: string]: VxeTableDefines.ValidatorErrorParams<D>[]
    }
  }
}

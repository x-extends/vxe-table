import { ToolbarButtonConfig } from '../toolbar'
import { Table } from '../table'

/* eslint-disable no-use-before-define */

export namespace VxeGlobalCommandsHandles {
  export interface CommandsOptions {
    commandMethod?: (params: CommandMethodParams, ...args: any[]) => void
  }
  export interface CommandMethodParams {
    $table: Table;
    code: string;
    button?: ToolbarButtonConfig;
  }
}

/**
 * 全局格式化
 */
export interface VxeGlobalCommands {
  mixin(opts: {
    [name: string]: VxeGlobalCommandsHandles.CommandsOptions | ((params: VxeGlobalCommandsHandles.CommandMethodParams, ...args: any[]) => void)
  }): VxeGlobalCommands
  has(name: string): boolean
  get(name: string): VxeGlobalCommandsHandles.CommandsOptions
  add(name: string, options: VxeGlobalCommandsHandles.CommandsOptions | ((params: VxeGlobalCommandsHandles.CommandMethodParams, ...args: any[]) => void)): VxeGlobalCommands
  delete(name: string): void
  forEach(callback: (options: VxeGlobalCommandsHandles.CommandsOptions, name: string) => void): void
}

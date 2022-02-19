import { VxeGridConstructor } from '../grid'
import { VxeToolbarPropTypes } from '../toolbar'
import { VxeTableConstructor, VxeTablePrivateMethods } from '../table'

export namespace VxeGlobalCommandsHandles {
  export type CommandsCallback = (params: CommandsOptions, ...args: any[]) => any
  export interface CommandsOptions {
    $grid?: VxeGridConstructor
    $table: VxeTableConstructor & VxeTablePrivateMethods
    code: string
    button?: VxeToolbarPropTypes.ButtonConfig | null
  }
}

/**
 * 全局指令
 */
export interface VxeGlobalCommands {
  mixin(options: {
    [code: string]: VxeGlobalCommandsHandles.CommandsCallback
  }): VxeGlobalCommands
  has(code: string): boolean
  get(code: string): VxeGlobalCommandsHandles.CommandsCallback
  add(code: string, callback: VxeGlobalCommandsHandles.CommandsCallback): VxeGlobalCommands
  delete(code: string): void
  forEach(callback: (options: VxeGlobalCommandsHandles.CommandsCallback, code: string) => void): void
}

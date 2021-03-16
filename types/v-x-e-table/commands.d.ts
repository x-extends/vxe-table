import { ToolbarButtonConfig } from '../toolbar'
import { GridRenderParams } from './renderer'

declare function commandsFunc(params: CommandsParams, ...args: any[]): any;

/**
 * 全局指令
 */
export class VxeGlobalCommands {
  mixin(map: { [type: string]: typeof commandsFunc }): VxeGlobalCommands;
  get(type: string): typeof commandsFunc;
  add(type: string, callback: typeof commandsFunc): VxeGlobalCommands;
  delete(type: string): VxeGlobalCommands;
}

export interface CommandsParams extends GridRenderParams {
  code: string;
  button?: ToolbarButtonConfig;
}

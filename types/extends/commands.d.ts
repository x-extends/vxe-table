import { ToolbarButtonConfig } from '../toolbar'
import { GridRenderParams } from './renderer'

declare function commandsFunc(params: CommandsParams, ...args: any[]): any;

/**
 * 全局指令
 */
export class commands {
  mixin(map: { [type: string]: typeof commandsFunc }): commands;
  get(type: string): typeof commandsFunc;
  add(type: string, callback: typeof commandsFunc): commands;
  delete(type: string): commands;
}

export interface CommandsParams extends GridRenderParams {
  code: string;
  button?: ToolbarButtonConfig;
}

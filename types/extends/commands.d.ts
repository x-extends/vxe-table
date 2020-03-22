/**
 * 全局指令
 */
export class commands {
  mixin(map: { [type: string]: Function }): commands;
  get(type: string): Function;
  add(type: string, callback: Function): commands;
  delete(type: string): commands;
}

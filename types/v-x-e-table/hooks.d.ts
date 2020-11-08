import { Ref, ComputedRef } from 'vue'
import { VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods } from '../table'

export namespace VxeGlobalHooksHandles {
  export interface HookOptions {
    setup($table: VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods): void | { [key: string]: any };
  }
}

/**
 * 全局格式化
 */
export class VxeGlobalHooks {
  mixin(options: {
    [type: string]: VxeGlobalHooksHandles.HookOptions;
  }): VxeGlobalHooks;
  has(type: string): boolean;
  get(type: string): VxeGlobalHooksHandles.HookOptions;
  add(type: string, options: VxeGlobalHooksHandles.HookOptions): VxeGlobalHooks;
  delete(type: string): void;
  forEach(callback: (options: VxeGlobalHooksHandles.HookOptions, name: string) => void): void;
}

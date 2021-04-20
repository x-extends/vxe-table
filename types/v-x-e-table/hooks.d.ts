import { Ref, ComputedRef } from 'vue'
import { VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods } from '../table'
import { VxeGridConstructor, VxeGridPrivateMethods } from '../grid'

export namespace VxeGlobalHooksHandles {
  export type Name = 'VxeGrid' | 'VxeTable'
  export interface HookOptions {
    setupTable?($table: VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods): void | { [key: string]: any };
    setupGrid?($grid: VxeGridConstructor & VxeGridPrivateMethods): void | { [key: string]: any };
  }
}

export interface VxeGlobalHooks {
  mixin(options: {
    [type: string]: VxeGlobalHooksHandles.HookOptions;
  }): VxeGlobalHooks;
  has(type: string): boolean;
  get(type: string): VxeGlobalHooksHandles.HookOptions;
  add(type: string, options: VxeGlobalHooksHandles.HookOptions): VxeGlobalHooks;
  delete(type: string): void;
  forEach(callback: (options: VxeGlobalHooksHandles.HookOptions, type: string) => void): void;
}

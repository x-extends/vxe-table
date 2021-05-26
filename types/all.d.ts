import Vue from 'vue'

import { ModalController } from './modal'
import { VXETableSetupOptions, VXETableCore, VxeGlobalTranslate, VxeGlobalI18n } from './v-x-e-table'

export function install(app: typeof Vue, options?: VXETableSetupOptions): void;

export interface VXETableClipboard {
  text: string;
  [key: string]: any;
}

export interface VXETableByVueProperty {
  /**
   * 读取内置国际化
   */
  t: VxeGlobalI18n;
  _t: VxeGlobalTranslate;
  /**
   * 全局的弹窗
   */
  modal: ModalController;
  /**
   * 剪贴板
   */
  clipboard: VXETableClipboard;
}

declare module 'vue/types/vue' {
  interface Vue {
    $vxe: VXETableByVueProperty;
  }
}

declare global {
  interface Window {
    VXETable: VXETableCore;
  }
}

// Constructor
export * from './v-x-e-table'
export * from './component'

export * from './header'
export * from './footer'
export * from './icon'
export * from './filter'
export * from './menu'
export * from './edit'
export * from './export'
export * from './keyboard'
export * from './validator'

export * from './table'
export * from './column'
export * from './colgroup'
export * from './grid'
export * from './toolbar'
export * from './pager'
export * from './checkbox'
export * from './checkbox-group'
export * from './radio'
export * from './radio-group'
export * from './radio-button'
export * from './input'
export * from './textarea'
export * from './button'
export * from './select'
export * from './optgroup'
export * from './option'
export * from './modal'
export * from './tooltip'
export * from './form'
export * from './form-item'
export * from './switch'
export * from './list'
export * from './pulldown'

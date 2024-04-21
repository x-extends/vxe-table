import Vue from 'vue'

import { ModalController } from './modal'
import { VXETableConfigOptions, VXETableCore, VxeGlobalTranslate, VxeGlobalI18n } from './v-x-e-table'

export function install(app: typeof Vue, options?: VXETableConfigOptions): void;

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

// Component
export * from './module'

// Table module
export * from './icon'
export * from './loading'
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
export * from './button-group'
export * from './select'
export * from './optgroup'
export * from './option'
export * from './modal'
export * from './tooltip'
export * from './form'
export * from './form-item'
export * from './form-gather'
export * from './switch'
export * from './list'
export * from './pulldown'

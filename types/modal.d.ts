import Vue from 'vue';
import { VXETableModule } from './component';

/**
 * 模态窗口
 */
export declare class Modal extends VXETableModule {
  value?: boolean;
  id?: string;
  type?: string;
  loading?: boolean;
  status?: string;
  iconStatus?: string;
  top?: number | string;
  title?: string;
  duration?: number | string;
  message?: string | Function;
  lockView?: boolean;
  lockScroll?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  escClosable?: boolean;
  resize?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  dblclickZoom?: boolean;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  zIndex?: number;
  marginSize?: number | string;
  fullscreen?: boolean;
  remember?: boolean;
  destroyOnClose?: boolean;
  showTitleOverflow?: boolean;
  transfer?: boolean;
  storage?: boolean;
  storageKey?: string;
  animat?: boolean;

  open(): any;
  close(): any;
  getBox(): HTMLElement;
  maximize(): Promise<any>;
  revert(): Promise<any>;
}

export interface XModalOptions {
  id?: string;
  type?: string;
  loading?: boolean;
  status?: string;
  iconStatus?: string;
  top?: number | string;
  title?: string;
  duration?: number | string;
  message?: string | Function;
  lockView?: boolean;
  lockScroll?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  escClosable?: boolean;
  resize?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  dblclickZoom?: boolean;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  zIndex?: number;
  marginSize?: number | string;
  fullscreen?: boolean;
  remember?: boolean;
  destroyOnClose?: boolean;
  showTitleOverflow?: boolean;
  transfer?: boolean;
  storage?: boolean;
  storageKey?: string;
  animat?: boolean;
  size?: string;
}

export interface XModal {
  /**
   * 弹出窗口
   * @param options 参数
   */
  open (options: XModalOptions): Promise<string>;
  /**
   * 弹出提示框
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  alert (message: string, title?: string, options?: XModalOptions): Promise<string>;
  /**
   * 弹出提示框
   * @param options 参数
   */
  alert (options: XModalOptions): Promise<string>;
  /**
   * 弹出确认框
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  confirm (message: string, title?: string, options?: XModalOptions): Promise<string>;
  /**
   * 弹出确认框
   * @param options 参数
   */
  confirm (options: XModalOptions): Promise<string>;
  /**
   * 弹出消息提示
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  message (message: string, title?: string, options?: XModalOptions): Promise<string>;
  /**
   * 弹出消息提示
   * @param options 参数
   */
  message (options: XModalOptions): Promise<string>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $XModal: XModal
  }
}
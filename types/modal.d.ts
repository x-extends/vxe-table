import Vue from 'vue';
import { VXETableModule } from './module';

/**
 * 模态窗口
 */
export declare class Modal extends VXETableModule {
  /**
   * 表格的尺寸
   * @default 'default'
   * @type string
   */
  size: 'medium' | 'small' | 'mini';
}

export interface XModalOptions {
  id?: string;
  type?: string;
  status?: string;
  top?: number | string;
  title?: string;
  duration?: number | string;
  message: string;
  lockView?: boolean;
  lockScroll?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  escClosable?: boolean;
  resize: boolean;
  width?: number | string;
  height?: number | string;
  zIndex?: number | string;
  marginSize?: number | string;
  animat?: boolean
}

export interface XModal {
  /**
   * 构造函数
   * @param options 参数
   */
  (options: XModalOptions): Promise<string>;
  /**
   * 提示框
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  alert (message: string, title?: string, options?: XModalOptions): Promise<string>;
  /**
   * 提示框
   * @param options 参数
   */
  alert (options: XModalOptions): Promise<string>;
  /**
   * 确认框
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  confirm (message: string, title?: string, options?: XModalOptions): Promise<string>;
  /**
   * 确认框
   * @param options 参数
   */
  confirm (options: XModalOptions): Promise<string>;
  /**
   * 模态窗口
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  message (message: string, title?: string, options?: XModalOptions): Promise<string>;
  /**
   * 模态窗口
   * @param options 参数
   */
  message (options: XModalOptions): Promise<string>;
}

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * 模态窗口
     */
    $XModal: XModal
  }
}
import Vue from 'vue';
import { VXETableModule } from './module';

/**
 * 消息提示框
 */
export declare class Message extends VXETableModule {
  /**
   * 表格的尺寸
   * @default 'default'
   * @type string
   */
  size: 'medium' | 'small' | 'mini';
}

export interface XMessageOptions {
  id?: string,
  type?: string,
  status?: string,
  top?: number,
  title?: string,
  duration?: number,
  message: string,
  lockView?: boolean,
  lockScroll?: boolean,
  mask?: boolean,
  maskClosable?: boolean,
  zIndex?: number,
  animat?: boolean
}

export interface XMessage {
  /**
   * @param options 参数
   */
  (options: XMessageOptions): Promise<string>;
  /**
   * Alert
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  alert (message: string, title?: string, options?: XMessageOptions): Promise<string>;
  /**
   * Alert
   * @param options 
   */
  alert (options: XMessageOptions): Promise<string>;
  /**
   * Confirm
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  confirm (message: string, title?: string, options?: XMessageOptions): Promise<string>;
  /**
   * Confirm
   * @param options 参数
   */
  confirm (options: XMessageOptions): Promise<string>;
  /**
   * Message
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  message (message: string, title?: string, options?: XMessageOptions): Promise<string>;
  /**
   * Message
   * @param options 参数
   */
  message (options: XMessageOptions): Promise<string>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $XMsg: XMessage
  }
}
import Vue from 'vue'
import { VXETableModule } from './component'

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

  /**
   * 手动打开窗口
   */
  open(): any;
  /**
   * 手动关闭窗口
   */
  close(): any;
  /**
   * 获取当前窗口元素
   */
  getBox(): HTMLElement;
  /**
   * 判断是否最大化显示
   */
  isMaximized(): boolean;
  /**
   * 切换窗口最大化/还原
   */
  zoom(): Promise<boolean>;
  /**
   * 如果窗口处于常规状态，则最大化窗口
   */
  maximize(): Promise<any>;
  /**
   * 如果窗口处于最大化状态，则还原窗口
   */
  revert(): Promise<any>;
}

export interface ModalOptions {
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

/**
 * 全局模态窗口控制器
 */
export interface ModalController {
  /**
   * 弹出窗口
   * @param options 参数
   */
  open (options: ModalOptions): Promise<string>;
  /**
   * 弹出提示框
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  alert (message: string, title?: string, options?: ModalOptions): Promise<string>;
  /**
   * 弹出提示框
   * @param options 参数
   */
  alert (options: ModalOptions): Promise<string>;
  /**
   * 弹出确认框
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  confirm (message: string, title?: string, options?: ModalOptions): Promise<string>;
  /**
   * 弹出确认框
   * @param options 参数
   */
  confirm (options: ModalOptions): Promise<string>;
  /**
   * 弹出消息提示
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  message (message: string, title?: string, options?: ModalOptions): Promise<string>;
  /**
   * 弹出消息提示
   * @param options 参数
   */
  message (options: ModalOptions): Promise<string>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $XModal: ModalController
  }
}

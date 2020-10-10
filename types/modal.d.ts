import { CreateElement, VNode } from 'vue'
import { VXETableModule } from './component'

/**
 * 模态窗口
 */
export declare class Modal extends VXETableModule {
  /**
   * 绑定值
   */
  value?: boolean;
  /**
   * 设置窗口唯一标识
   */
  id?: string;
  /**
   * 窗口类型
   */
  type?: 'alert' | 'confirm' | 'message';
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 只对 type=alert | confirm | message 有效，消息状态
   */
  status?: string;
  /**
   * 自定义状态图标
   */
  iconStatus?: string;
  /**
   * 只对 type=message 有效，消息距离顶部的位置
   */
  top?: number | string;
  /**
   * 只对 type=modal 有效，窗口的默认位置
   */
  position?: 'center' | {
    top?: number;
    left?: number;
  };
  /**
   * 窗口的标题
   */
  title?: string;
  /**
   * 只对 type=message 有效，自动关闭的延时
   */
  duration?: number | string;
  /**
   * 窗口的内容
   */
  message?: string | Function;
  /**
   * 是否锁住页面，不允许窗口之外的任何操作
   */
  lockView?: boolean;
  /**
   * 是否锁住滚动条，不允许页面滚动
   */
  lockScroll?: boolean;
  /**
   * 是否显示遮罩层
   */
  mask?: boolean;
  /**
   * 是否允许点击遮罩层关闭窗口
   */
  maskClosable?: boolean;
  /**
   * 是否允许按 Esc 键关闭窗口
   */
  escClosable?: boolean;
  /**
   * 是否允许拖动调整窗口大小
   */
  resize?: boolean;
  /**
   * 是否显示头部
   */
  showHeader?: boolean;
  /**
   * 是否显示底部
   */
  showFooter?: boolean;
  /**
   * 只对 type=modal 有效，是否允许通过双击头部放大或还原窗口
   */
  dblclickZoom?: boolean;
  /**
   * 窗口的宽度
   */
  width?: number | string;
  /**
   * 窗口的高度
   */
  height?: number | string;
  /**
   * 窗口的最小宽度
   */
  minWidth?: number | string;
  /**
   * 窗口的最小高度
   */
  minHeight?: number | string;
  /**
   * 自定义堆叠顺序
   */
  zIndex?: number;
  marginSize?: number | string;
  /**
   * 默认最大化显示
   */
  fullscreen?: boolean;
  /**
   * 记忆功能，会记住最后操作状态，再次打开窗口时还原窗口状态
   */
  remember?: boolean;
  /**
   * 在窗口关闭时销毁内容
   */
  destroyOnClose?: boolean;
  /**
   * 设置标题内容过长时显示为省略号
   */
  showTitleOverflow?: boolean;
  /**
   * 是否将弹框容器插入于 body 内
   */
  transfer?: boolean;
  /**
   * 是否启用 localStorage 本地保存，会将窗口拖动的状态保存到本地
   */
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
   * 获取窗口位置
   */
  getPosition(): {
    top?: number;
    left?: number;
  } | null;
  /**
   * 设置窗口位置
   */
  setPosition(top?: number, left?: number): Promise<any>;
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
  status?: 'info' | 'success' | 'warning' | 'error' | 'loading';
  iconStatus?: string;
  top?: number | string;
  position?: 'center' | {
    top?: number;
    left?: number;
  };
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
  size?: 'medium' | 'small' | 'mini';

  slots?: {
    default?(params: ModalDefaultSlotParams, h: CreateElement): VNode[] | string[];
    header?(params: ModalHeaderSlotParams, h: CreateElement): VNode[] | string[];
    title?(params: ModalTitleSlotParams, h: CreateElement): VNode[] | string[];
    footer?(params: ModalFooterSlotParams, h: CreateElement): VNode[] | string[];
  };

  events?: {
    inserted?(params: ModalEventParams): any;
    show?(params: ModalEventParams): any;
    hide?(params: ModalEventParams): any;
    zoom?(params: ModalEventParams): any;
  };
}

export interface ModalDefaultSlotParams {
  $modal: Modal;
}

export interface ModalHeaderSlotParams extends ModalDefaultSlotParams {}
export interface ModalTitleSlotParams extends ModalDefaultSlotParams {}
export interface ModalFooterSlotParams extends ModalDefaultSlotParams {}

export interface ModalEventParams {
  $modal: Modal;
  type: string;
}

/**
 * 全局窗口控制器
 */
export interface ModalClass {
  /**
   * 创建窗口
   * @param options 参数
   */
  open (options: ModalOptions): Promise<string>;
  /**
   * 创建提示框
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  alert (message: string, title?: string, options?: ModalOptions): Promise<string>;
  /**
   * 创建提示框
   * @param options 参数
   */
  alert (options: ModalOptions): Promise<string>;
  /**
   * 创建确认框
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  confirm (message: string, title?: string, options?: ModalOptions): Promise<string>;
  /**
   * 创建确认框
   * @param options 参数
   */
  confirm (options: ModalOptions): Promise<string>;
  /**
   * 创建消息提示
   * @param message 消息内容
   * @param title 标题
   * @param options 参数
   */
  message (message: string, title?: string, options?: ModalOptions): Promise<string>;
  /**
   * 创建消息提示
   * @param options 参数
   */
  message (options: ModalOptions): Promise<string>;
  /**
   * 获取动态的活动窗口
   * @param id 窗口唯一标识
   */
  get (id: string): Modal;
  /**
   * 关闭动态的活动窗口，如果为空则关闭所有
   * @param id 窗口唯一标识
   */
  close (id?: string): Promise<any>;
}

export declare const ModalController: ModalClass

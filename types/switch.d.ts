import { VXETableModule } from './component'

/**
 * 开关
 */
export declare class Switch extends VXETableModule {
  /**
   * 绑定值
   */
  value?: string | number | boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 打开时显示的文字
   */
  onLabel?: string;
  /**
   * 关闭时显示的文字
   */
  offLabel?: string;
  /**
   * 打开时的值
   */
  onValue?: string | number | boolean;
  /**
   * 关闭时的值
   */
  offValue?: string | number | boolean;
  /**
   * 打开时的图标
   */
  onIcon?: string;
  /**
   * 关闭时的图标
   */
  offIcon?: string;
}

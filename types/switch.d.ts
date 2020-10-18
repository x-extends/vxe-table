import { VXETableComponent } from './component'

/**
 * 开关
 */
export declare class Switch extends VXETableComponent {
  /**
   * 绑定值
   */
  value?: string | number | boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  openLabel?: string;
  closeLabel?: string;
  openValue?: string | number | boolean;
  closeValue?: string | number | boolean;
  openIcon?: string;
  closeIcon?: string;
}

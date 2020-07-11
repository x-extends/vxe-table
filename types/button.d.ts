import { VXETableModule } from './component'

/**
 * 按钮
 */
export declare class Button extends VXETableModule {
  /**
   * 按钮类型
   */
  type?: string;
  /**
   * 用来标识这一项
   */
  name?: string | number;
  /**
   * 内容
   */
  content?: string;
  /**
   * 状态
   */
  status?: string;
  /**
   * 按钮的图标
   */
  icon?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 固定显示下拉面板的方向
   */
  placement?: 'top' | 'bottom';
  /**
   * 是否将弹框容器插入于 body 内
   */
  transfer?: boolean;
}

import { VXETableComponent } from './component'

/**
 * 组件 - 下拉容器
 */
export interface Pulldown extends VXETableComponent {
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 固定显示下拉面板的方向
   */
  placement?: string;
  /**
   * 在下拉容器关闭时销毁内容
   */
  destroyOnClose?: boolean;
  /**
   * 是否将弹框容器插入于 body 内（对于嵌入到表格或者弹窗中被遮挡时需要设置为 true）
   */
  transfer?: boolean;

  /**
   * 判断下拉面板是否可视
   */
  isPanelVisible(): boolean;

  /**
   * 切换下拉面板
   */
  togglePanel(): Promise<any>;
  
  /**
   * 显示下拉面板
   */
  showPanel(): Promise<any>;
  
  /**
   * 隐藏下拉面板
   */
  hidePanel(): Promise<any>;

}

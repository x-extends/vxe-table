import { VXEComponent } from './component'
import { VxeColumnPropTypes } from './column'

/**
 * 组件 - 表格分组列
 * @example import { Colgroup as VxeColgroup } from 'vxe-table'
 */
export const Colgroup: VXEComponent<VxeColgroupProps>;

export type VxeColgroupProps = {
  /**
   * 渲染类型
   */
  type?: VxeColumnPropTypes.Type;
  /**
   * 列字段名
   */
  field?: VxeColumnPropTypes.Field;
  /**
   * 列标题
   */
  title?: VxeColumnPropTypes.Title;
  /**
   * 列宽度
   */
  width?: VxeColumnPropTypes.Width;
  /**
   * 列最小宽度，把剩余宽度按比例分配
   */
  minWidth?: VxeColumnPropTypes.MinWidth;
  /**
   * 是否允许拖动列宽调整大小
   */
  resizable?: VxeColumnPropTypes.Resizable;
  /**
   * 将列固定在左侧或者右侧
   */
  fixed?: VxeColumnPropTypes.Fixed;
  /**
   * 列对其方式
   */
  align?: VxeColumnPropTypes.Align;
  /**
   * 表头对齐方式
   */
  headerAlign?: VxeColumnPropTypes.HeaderAlign;
  /**
   * 当内容过长时显示为省略号
   */
  showOverflow?: VxeColumnPropTypes.ShowOverflow;
  /**
   * 当表头内容过长时显示为省略号
   */
  showHeaderOverflow?: VxeColumnPropTypes.ShowHeaderOverflow;
  /**
   * 给单元格附加 className
   */
  className?: VxeColumnPropTypes.ClassName;
  /**
   * 给表头单元格附加 className
   */
  headerClassName?: VxeColumnPropTypes.HeaderClassName;
  /**
   * 是否可视
   */
  visible?: VxeColumnPropTypes.Visible;
  /**
   * 额外的参数
   */
  params?: VxeColumnPropTypes.Params;
}

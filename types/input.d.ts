import { VXETableModule } from './component'

/**
 * 输入框
 */
export declare class Input extends VXETableModule {
  /**
   * 绑定值
   */
  value?: string | number | Date;
  /**
   * 原生 name 属性
   */
  name?: string;
  /**
   * 渲染类型
   */
  type?: string;
  /**
   * 当有值时，是否在右侧显示清除按钮
   */
  clearable?: boolean;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 当值为空时，显示的占位符
   */
  placeholder?: string;
  /**
   * 原生 maxlength 属性
   */
  maxlength?: string | number;
  /**
   * 原生 autocomplete 属性
   */
  autocomplete?: string;
  /**
   * 原生 form 属性
   */
  form?: string;
  dateConfig?: {
    startWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    labelFormat?: string;
    parseFormat?: string;
    valueFormat?: string;
    editable?: string;
    disabledMethod?(params: { date: Date }): boolean;
  };
  /**
   * 只对 type=number|integer 有效，最小值
   */
  min?: string | number;
  /**
   * 只对 type=number|integer 有效，最大值
   */
  max?: string | number;
  /**
   * 只对 type=number|integer 有效，数字间隔
   */
  step?: string | number;
  /**
   * 头部图标
   */
  prefixIcon?: string;
  /**
   * 尾部图标
   */
  suffixIcon?: string;
  /**
   * 只对 type=date|week|month|year 有效，固定显示弹框容器的方向
   */
  placement?: string;
  /**
   * 只对 type=date|week|month|year 有效，是否将弹框容器插入于 body 内
   */
  transfer?: boolean;

  /**
   * 获取焦点
   */
  focus(): Promise<any>;
  /**
   * 失去焦点
   */
  blur(): Promise<any>;
}

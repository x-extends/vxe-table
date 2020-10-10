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
  type?: 'text' | 'search' | 'number' | 'integer' | 'float' | 'password' | 'date' | 'time' | 'datetime' | 'week' | 'month' | 'year';
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
  /**
   * 只对 type=date|week|month|year 有效，有效，设置日期可选范围的最小值
   */
  minDate?: string | number | Date;
  /**
   * 只对 type=date|week|month|year 有效，有效，设置日期可选范围的最大值
   */
  maxDate?: string | number | Date;
  /**
   * 只对 type=week 有效，设置起始周
   */
  startWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 只对 type=date|week|month|year 有效，输入框中显示的日期格式
   */
  labelFormat?: string;
  /**
   * 只对 type=date|week|month|year 有效，绑定值的解析格式，如果是值为字符串时可能会用到
   */
  parseFormat?: string;
  /**
   * 只对 type=date|week|month|year 有效，绑定值的返回格式，默认返回 Date 类型，如果指定格式则返回字符串
   */
  valueFormat?: string;
  /**
   * 只对 type=date|week|month|year 有效，文本框是否允许输入
   */
  editable?: string;
  /**
   * 只对 type=date|week|month|year 有效，该方法 Function({ date, type }) 用于返回对应日期显示的节日
   */
  festivalMethod?(params: { date: Date, type: string }): DateFestival | void;
  /**
   * 只对 type=date|week|month|year 有效，该方法 Function({date}) 的返回值用来决定该日期是否允许选中
   */
  disabledMethod?(params: { date: Date }): boolean;
  /**
   * 只对 type=number|integer|float 有效，最小值
   */
  min?: string | number;
  /**
   * 只对 type=number|integer|float 有效，最大值
   */
  max?: string | number;
  /**
   * 只对 type=number|integer|float 有效，数字间隔
   */
  step?: string | number;
  /**
   * 只对 type=float 有效，小数位数
   */
  digits?: string | number;
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

/**
 * 日期节日对象
 */
export interface DateFestival {
  /**
   * 节日名称，如果重叠使用逗号隔开
   */
  label?: string;
  /**
   * 标记为重要节日
   */
  important?: boolean;
  /**
   * 显示左上角小圆点通知
   */
  notice?: boolean;
  /**
   * 显示右上角信息
   */
  extra?: string | {
    /**
     * 显示名称
     */
    label?: string;
    /**
     * 标记为重要信息
     */
    important?: boolean;
  };
}

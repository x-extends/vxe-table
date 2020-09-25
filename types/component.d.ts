import Vue from 'vue'

declare type SizeType = null | '' | 'medium' | 'small' | 'mini'

export declare class VXETableComponent extends Vue {
  /**
   * 尺寸
   */
  size?: SizeType;
  vSize?: SizeType;

  static install(vue: typeof Vue): void;
}

export interface RecordInfo {
  [key: string]: any;
}

/**
 * 行对象
 */
export interface RowInfo {
  [key: string]: any;
}

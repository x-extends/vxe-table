import Vue from 'vue'

export declare class VXETableModule extends Vue {
  /**
   * 尺寸
   * @default 'default'
   * @type string
   */
  size?: 'medium' | 'small' | 'mini';

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

import Vue from 'vue';

export declare class VXETableModule extends Vue {
  /**
   * 大小
   * @default 'default'
   * @type string
   */
  size?: 'medium' | 'small' | 'mini';

  static install(vue: typeof Vue): void;
}
import { SizeType } from '../component'

interface DefaultOptions {
  size?: SizeType;
  [key: string]: any;
}

export interface VXETableSetupOptions {
  size?: SizeType;
  zIndex?: number;
  version?: number;
  emptyCell?: string;
  icon?: {
    [key: string]: string;
  };
  table?: any;
  grid?: any;
  export?: {
    types?: {
      [key: string]: 0 | 1 | 2;
    }
    [key: string]: any;
  };
  tooltip?: DefaultOptions;
  pager?: any;
  form?: DefaultOptions;
  input?: DefaultOptions;
  textarea?: DefaultOptions;
  select?: DefaultOptions;
  toolbar?: any;
  button?: DefaultOptions;
  radio?: DefaultOptions;
  checkbox?: DefaultOptions;
  switch?: DefaultOptions;
  modal?: DefaultOptions;
  list?: DefaultOptions;
  translate?(key: string, args?: any): string;
  i18n?(key: string, args?: any): string;
  [key: string]: any;
}

export interface VXETableGlobalConfig extends VXETableSetupOptions {
  size: SizeType;
  zIndex: number;
  version: number;
  emptyCell: string;
  icon: {
    [key: string]: string;
  };
  table: any;
  grid: any;
  export: {
    types: {
      [key: string]: 0 | 1 | 2;
    }
    [key: string]: any;
  };
  tooltip: DefaultOptions;
  pager: any;
  form: DefaultOptions;
  input: DefaultOptions;
  textarea: DefaultOptions;
  select: DefaultOptions;
  toolbar: any;
  button: DefaultOptions;
  radio: DefaultOptions;
  checkbox: DefaultOptions;
  switch: DefaultOptions;
  modal: DefaultOptions;
  list: DefaultOptions;
  i18n(key: string, args?: any): string;
}

export type VxeGlobalSetup = (options?: VXETableSetupOptions) => VXETableGlobalConfig;

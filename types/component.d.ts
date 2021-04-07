import { App, ComponentPublicInstance } from 'vue'

export type SizeType = null | 'medium' | 'small' | 'mini';
export type ValueOf<T> = T extends any[] ? T[number] : T[keyof T];

export type VXEComponent<P = {}, E = {}> = ({
  new (): {
    $props: P & E;
  };
} & {
  install(app: App): void;
})

export interface VxeComponentBase {
  xID: string;
}

export interface RecordInfo {
  [key: string]: any;
}

export interface VxeEvent {
  $event: Event;
  [key: string]: any;
}

export type VNodeStyle = {
  [key: string]: string | number
}

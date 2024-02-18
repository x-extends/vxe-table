import { App, VNode } from 'vue'

export type SizeType = null | '' | 'medium' | 'small' | 'mini'
export type ValueOf<T> = T extends any[] ? T[number] : T[keyof T]

export type VXEComponent<
  P = { [key: string]: any },
  E = { [key: string]: any },
  S = { [key: string]: (...args: any[]) => any }
> = ({
  new (): {
    $props: P & E,
    $slots: S
  }
} & {
  install(app: App): void
})

export interface VxeComponentBase {
  xID: string
}

export interface VxeEvent {
  $event: Event
  [key: string]: any
}

export type VNodeStyle = Record<string, string | number>
export type VNodeClassName = Record<string, boolean>

export type SlotVNodeType = VNode | string | number

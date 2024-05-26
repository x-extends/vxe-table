import { VxeUIExport, setConfig } from 'vxe-pc-ui'
import VxeColumn from 'vxe-pc-ui/types/components/column'
import VxeColgroup from 'vxe-pc-ui/types/components/colgroup'
import VxeTable from 'vxe-pc-ui/types/components/table'
import VxeGrid from 'vxe-pc-ui/types/components/grid'
import VxeToolbar from 'vxe-pc-ui/types/components/toolbar'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VxeColumn: typeof VxeColumn
    VxeColgroup: typeof VxeColgroup
    VxeTable: typeof VxeTable
    VxeGrid: typeof VxeGrid
    VxeToolbar: typeof VxeToolbar
  }
}

declare global {
  interface Window {
    /**
     * @deprecated
     */
    VXETable: VxeUIExport;
  }
}

/**
 * 已废弃，请使用 setConfig
 * @deprecated
 */
export type setup = typeof setConfig
/**
 * 已废弃，请使用 setConfig
 * @deprecated
 */
export type config = typeof setConfig

/**
 * 已废弃，请使用 VxeUI
 * @deprecated
 */
export const VXETable: VxeUIExport

/**
 * 已废弃，请使用 VxeUIExport
 * @deprecated
 */
export type VXETableCore = VxeUIExport

export * from 'vxe-pc-ui'

// Component
export * from 'vxe-pc-ui/types/components/column'
export * from 'vxe-pc-ui/types/components/colgroup'
export * from 'vxe-pc-ui/types/components/table'
export * from 'vxe-pc-ui/types/components/grid'
export * from 'vxe-pc-ui/types/components/toolbar'

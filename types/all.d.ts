import { VxeUIExport } from 'vxe-pc-ui'

declare global {
  interface Window {
    /**
     * @deprecated
     */
    VXETable: VxeUIExport;
  }
}

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

export * from 'vxe-pc-ui/types/ui'

// Vxe Table
export * from 'vxe-pc-ui/types/components/column'
export * from 'vxe-pc-ui/types/components/colgroup'
export * from 'vxe-pc-ui/types/components/table'
export * from 'vxe-pc-ui/types/components/grid'
export * from 'vxe-pc-ui/types/components/toolbar'

import { VXETable } from '../../../packages/all'

import './setup'
import './renderer'
import './formats'

import VXETablePluginMenus from 'vxe-table-plugin-menus'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import VXETablePluginExportPDF from 'vxe-table-plugin-export-pdf'
import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETablePluginAntd from 'vxe-table-plugin-antd'
import VXETablePluginRenderer from 'vxe-table-plugin-renderer'

import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-antd/dist/style.css'
import 'vxe-table-plugin-renderer/dist/style.css'

VXETable.use(VXETablePluginMenus as any)
VXETable.use(VXETablePluginExportXLSX as any)
VXETable.use(VXETablePluginExportPDF as any)
VXETable.use(VXETablePluginElement as any)
VXETable.use(VXETablePluginAntd as any)
VXETable.use(VXETablePluginRenderer as any)

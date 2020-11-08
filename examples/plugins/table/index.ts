import VXETable from '../../../packages/vxe-table'

import './setup'
import './renderer'
import './formats'

import VXETablePluginMenus from 'vxe-table-plugin-menus'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import VXETablePluginExportPDF from 'vxe-table-plugin-export-pdf'

VXETable.use(VXETablePluginMenus)
VXETable.use(VXETablePluginExportXLSX)
VXETable.use(VXETablePluginExportPDF)

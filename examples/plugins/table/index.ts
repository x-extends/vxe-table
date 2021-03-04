import VXETable from '../../../packages/vxe-table'

import './setup'
import './renderer'
import './formats'

import VXETablePluginMenus from 'vxe-table-plugin-menus'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import VXETablePluginExportPDF from 'vxe-table-plugin-export-pdf'
import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETablePluginAntd from 'vxe-table-plugin-antd'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-antd/dist/style.css'

VXETable.use(VXETablePluginMenus)
VXETable.use(VXETablePluginExportXLSX)
VXETable.use(VXETablePluginExportPDF)
VXETable.use(VXETablePluginElement)
VXETable.use(VXETablePluginAntd)

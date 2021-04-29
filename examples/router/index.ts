import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import StartUpgrade from '../views/start/Upgrade.vue'
import StartInstall from '../views/start/Install.vue'
import StartUse from '../views/start/Use.vue'
import StartIcons from '../views/start/Icons.vue'
import StartGlobal from '../views/start/Global.vue'
import StartTheme from '../views/start/Theme.vue'
import StartI18n from '../views/start/I18n.vue'

import RendererAPI from '../views/table/renderer/API.vue'
import RendererFilter from '../views/table/renderer/Filter.vue'
import RendererDefault from '../views/table/renderer/Default.vue'
import RendererEdit from '../views/table/renderer/Edit.vue'
import RendererExpand from '../views/table/renderer/Expand.vue'
import RendererToolbar from '../views/table/renderer/Toolbar.vue'
import RendererForm from '../views/table/renderer/Form.vue'
import RendererEmpty from '../views/table/renderer/Empty.vue'

import CommandsAPI from '../views/table/commands/API.vue'
import MenusAPI from '../views/table/menus/API.vue'
import InterceptorAPI from '../views/table/interceptor/API.vue'
import FormatsAPI from '../views/table/formats/API.vue'

import TableBasic from '../views/table/base/Basic.vue'
import TableSize from '../views/table/base/Size.vue'
import TableAutoBreak from '../views/table/base/AutoBreak.vue'
import TableWidth from '../views/table/base/Width.vue'
import TableOverflow from '../views/table/base/Overflow.vue'
import TableTooltip from '../views/table/base/Tooltip.vue'
import TableStripe from '../views/table/base/Stripe.vue'
import TableBorder from '../views/table/base/Border.vue'
import TableRound from '../views/table/base/Round.vue'
import TableStyle from '../views/table/base/Style.vue'
import TableDynamicStyle from '../views/table/base/DynamicStyle.vue'
import TableScrollStyle from '../views/table/base/ScrollStyle.vue'
import TableHeader from '../views/table/base/Header.vue'
import TableHeaderHighlight from '../views/table/base/HeaderHighlight.vue'
import TableResizable from '../views/table/base/Resizable.vue'
import TableMaxHeight from '../views/table/base/MaxHeight.vue'
import TableHeight from '../views/table/base/Height.vue'
import TableAutoHeight from '../views/table/base/AutoHeight.vue'
import TableFixed from '../views/table/base/Fixed.vue'
import TableFixedFull from '../views/table/base/FixedFull.vue'
import TableGroup from '../views/table/base/Group.vue'
import TableSeq from '../views/table/base/Seq.vue'
import TableCurrent from '../views/table/base/Current.vue'
import TableRadio from '../views/table/base/Radio.vue'
import TableSelection from '../views/table/base/Selection.vue'
import TableSort from '../views/table/base/Sort.vue'
import TableFilter from '../views/table/base/Filter.vue'
import TableEmpty from '../views/table/base/Empty.vue'
import TableLoading from '../views/table/base/Loading.vue'
import TableFormat from '../views/table/base/Format.vue'
import TableData from '../views/table/base/Data.vue'
import TableHTML from '../views/table/base/HTML.vue'
import TableFull from '../views/table/base/Full.vue'

import TableEvent from '../views/table/advanced/Event.vue'
import TableTemplate from '../views/table/advanced/Template.vue'
import TableDynamic from '../views/table/advanced/Dynamic.vue'
import TableCustomCheckbox from '../views/table/advanced/CustomCheckbox.vue'
import TableCustomRadio from '../views/table/advanced/CustomRadio.vue'
import TableSortIcon from '../views/table/advanced/SortIcon.vue'
import TableCustomSort from '../views/table/advanced/CustomSort.vue'
import TableMultiSort from '../views/table/advanced/MultiSort.vue'
import TableManualFilter from '../views/table/advanced/ManualFilter.vue'
import TableFilterIcon from '../views/table/advanced/FilterIcon.vue'
import TableSpan from '../views/table/advanced/Span.vue'
import TableSpanRow from '../views/table/advanced/SpanRow.vue'
import TableMergeCell from '../views/table/advanced/MergeCell.vue'
import TableFooter from '../views/table/advanced/Footer.vue'
import TableFooterSpan from '../views/table/advanced/FooterSpan.vue'
import TableFooterMaxHeight from '../views/table/advanced/MaxHeight.vue'
import TableImport from '../views/table/advanced/Import.vue'
import TableExport from '../views/table/advanced/Export.vue'
import TablePrint from '../views/table/advanced/Print.vue'
import TableCustomPrint from '../views/table/advanced/CustomPrint.vue'
import TableFixedType from '../views/table/advanced/FixedType.vue'
import TableMenu from '../views/table/advanced/Menu.vue'
import TableMenuPrivilege from '../views/table/advanced/MenuPrivilege.vue'
import TableExpand from '../views/table/advanced/Expand.vue'
// import TableExpandIcon from '../views/table/advanced/ExpandIcon.vue'
// import TableExpandLazy from '../views/table/advanced/ExpandLazy.vue'
// import TableExpandAccordion from '../views/table/advanced/ExpandAccordion.vue'
import TableSearch from '../views/table/advanced/Search.vue'
// import TableGroupBy from '../views/table/advanced/GroupBy.vue'
import TableDetails from '../views/table/advanced/Details.vue'
// import TablePopupEdit from '../views/table/advanced/PopupEdit.vue'
import TableToolbar from '../views/table/advanced/Toolbar.vue'
// import TableCustom from '../views/table/advanced/Custom.vue'
import TableCustomStorage from '../views/table/advanced/CustomStorage.vue'
import TableCustomlWidthStorage from '../views/table/advanced/CustomlWidthStorage.vue'
// import TableForm from '../views/table/advanced/Form.vue'
// import TablePage from '../views/table/advanced/Page.vue'
// import TablePageIcon from '../views/table/advanced/PageIcon.vue'
// import TableHighlight from '../views/table/advanced/Highlight.vue'
// import TableRangeSelect from '../views/table/advanced/RangeSelect.vue'
// import TableTabs from '../views/table/advanced/Tabs.vue'
import TableKeepAlives from '../views/table/advanced/KeepAlives.vue'
import TableKeepAliveTable1 from '../views/table/advanced/keepAlives/Table1.vue'
import TableKeepAliveTable2 from '../views/table/advanced/keepAlives/Table2.vue'
import TableKeepAliveTable3 from '../views/table/advanced/keepAlives/Table3.vue'

import GridBasic from '../views/grid/Basic.vue'
import GridEvents from '../views/grid/Events.vue'
import GridGroup from '../views/grid/Group.vue'
import GridReverse from '../views/grid/Reverse.vue'
import GridTemplate from '../views/grid/Template.vue'
import GridFooter from '../views/grid/Footer.vue'
import GridPage from '../views/grid/Page.vue'
import GridFullQuery from '../views/grid/FullQuery.vue'
import GridProxy from '../views/grid/Proxy.vue'
import GridPageProxy from '../views/grid/PageProxy.vue'
// import GridConfigProxy from '../views/grid/ConfigProxy.vue'
import GridEdit from '../views/grid/Edit.vue'
import GridCellDisable from '../views/grid/CellDisable.vue'
import GridRowDisable from '../views/grid/RowDisable.vue'
import GridForm from '../views/grid/Form.vue'
import GridFormProxy from '../views/grid/FormProxy.vue'
import GridToolbar from '../views/grid/Toolbar.vue'
import GridCustomToolbar from '../views/grid/CustomToolbar.vue'
import GridToolbarIcon from '../views/grid/ToolbarIcon.vue'
import GridFullscreen from '../views/grid/Fullscreen.vue'
// import GridDynamic from '../views/grid/Dynamic.vue'
import GridMenu from '../views/grid/Menu.vue'
// import GridSpan from '../views/grid/Span.vue'
// import GridUpload from '../views/grid/Upload.vue'
// import GridTree from '../views/grid/Tree.vue'
// import GridTreeLazy from '../views/grid/TreeLazy.vue'
// import GridTreeLazyEdit from '../views/grid/TreeLazyEdit.vue'
// import GridTreeEdit from '../views/grid/TreeEdit.vue'
import GridFullEdit from '../views/grid/FullEdit.vue'

import TableTreeBasic from '../views/table/tree/Basic.vue'
import TableTreeNormal from '../views/table/tree/Normal.vue'
import TableTreeIcon from '../views/table/tree/Icon.vue'
import TableTreeAccordion from '../views/table/tree/Accordion.vue'
import TableTreeSelection from '../views/table/tree/Selection.vue'
import TableTreeRadio from '../views/table/tree/Radio.vue'
import TableTreeFixed from '../views/table/tree/Fixed.vue'
import TableTreeMaxHeight from '../views/table/tree/MaxHeight.vue'
import TableTreeFilter from '../views/table/tree/Filter.vue'
import TableTreeSort from '../views/table/tree/Sort.vue'
// import TableTreeGroupSummary from '../views/table/tree/GroupSummary.vue'
// import TableTreeGroupSummaryCount from '../views/table/tree/GroupSummaryCount.vue'
import TableTreeExpand from '../views/table/tree/Expand.vue'
import TableTreeExpandLazy from '../views/table/tree/ExpandLazy.vue'
import TableTreeToolbar from '../views/table/tree/Toolbar.vue'
// import TableTreeInsert from '../views/table/tree/Insert.vue'
import TableTreeMenu from '../views/table/tree/Menu.vue'
// import TableTreeSpan from '../views/table/tree/Span.vue'
// import TableTreeHighlight from '../views/table/tree/Highlight.vue'
// import TableTreeKeyboard from '../views/table/tree/Keyboard.vue'
import TableTreeLazy from '../views/table/tree/Lazy.vue'
import TableTreeLazyMenu from '../views/table/tree/LazyMenu.vue'
import TableTreeLazyEdit from '../views/table/tree/LazyEdit.vue'
import TableTreeLine from '../views/table/tree/Line.vue'
import TableTreeEdit from '../views/table/tree/Edit.vue'
// import TableTreeEditCellValid from '../views/table/tree/CellValid.vue'
// import TableTreeEditRowValid from '../views/table/tree/RowValid.vue'
// import TableTreeEditForceCellValid from '../views/table/tree/ForceCellValid.vue'
// import TableTreeEditForceRowValid from '../views/table/tree/ForceRowValid.vue'
import TableTreeTemplate from '../views/table/tree/Template.vue'

import TableScroll from '../views/table/scroll/Scroll.vue'
import TableScrollMode from '../views/table/scroll/Mode.vue'
import TableScrollRows from '../views/table/scroll/ScrollRows.vue'
import TableScrollFullRows from '../views/table/scroll/ScrollFullRows.vue'
import TableScrollCols from '../views/table/scroll/ScrollCols.vue'
import TableScrollFullCols from '../views/table/scroll/ScrollFullCols.vue'
// import TableScrollHighlight from '../views/table/scroll/Highlight.vue'
import TableScrollKeyboard from '../views/table/scroll/Keyboard.vue'
import TableScrollMaxHeight from '../views/table/scroll/MaxHeight.vue'
import TableScrollGroup from '../views/table/scroll/Group.vue'
import TableScrollMerge from '../views/table/scroll/Merge.vue'
import TableScrollEdit from '../views/table/scroll/Edit.vue'
// import TableScrollCellValid from '../views/table/scroll/CellValid.vue'
// import TableScrollRowValid from '../views/table/scroll/RowValid.vue'
// import TableScrollForceCellValid from '../views/table/scroll/ForceCellValid.vue'
// import TableScrollForceRowValid from '../views/table/scroll/ForceRowValid.vue'
import TableScrollPartialLoad from '../views/table/scroll/PartialLoad.vue'
import TableScrollFullPartialLoad from '../views/table/scroll/FullPartialLoad.vue'
import TableScrollFooter from '../views/table/scroll/Footer.vue'
import TableScrollTemplate from '../views/table/scroll/Template.vue'
// import TableScrollTabs from '../views/table/scroll/Tabs.vue'
import TableScrollKeepAlives from '../views/table/scroll/KeepAlives.vue'
import TableScrollKeepAliveTable1 from '../views/table/scroll/keepAlives/Table1.vue'
import TableScrollKeepAliveTable2 from '../views/table/scroll/keepAlives/Table2.vue'
import TableScrollKeepAliveTable3 from '../views/table/scroll/keepAlives/Table3.vue'

// import TableVirtualTreeBasic from '../views/table/virtual-tree/Basic.vue'
// import TableVirtualTreeNormal from '../views/table/virtual-tree/Normal.vue'
// import TableVirtualTreeRadio from '../views/table/virtual-tree/Radio.vue'
// import TableVirtualTreeCheckbox from '../views/table/virtual-tree/Checkbox.vue'
// import TableVirtualTreeIcon from '../views/table/virtual-tree/Icon.vue'
// import TableVirtualTreeFixed from '../views/table/virtual-tree/Fixed.vue'
// import TableVirtualTreeMaxHeight from '../views/table/virtual-tree/MaxHeight.vue'
// import TableVirtualTreeEdit from '../views/table/virtual-tree/Edit.vue'
// import TableVirtualTreeInsert from '../views/table/virtual-tree/Insert.vue'
// import TableVirtualTreeRemove from '../views/table/virtual-tree/Remove.vue'
// import TableVirtualTreeMenu from '../views/table/virtual-tree/Menu.vue'
// import TableVirtualTreeTemplate from '../views/table/virtual-tree/Template.vue'
// import TableVirtualTreeBig from '../views/table/virtual-tree/Big.vue'

import TableEditPopupForm from '../views/table/edit/PopupForm.vue'
import TableEditManual from '../views/table/edit/Manual.vue'
import TableEditClick from '../views/table/edit/Click.vue'
import TableEditDBLClick from '../views/table/edit/DBLClick.vue'
import TableEditSelect from '../views/table/edit/Select.vue'
import TableAutoClearManual from '../views/table/edit/AutoClear.vue'
import TableEditCellPlaceholder from '../views/table/edit/CellPlaceholder.vue'
import TableEditInsert from '../views/table/edit/Insert.vue'
import TableEditRemove from '../views/table/edit/Remove.vue'
import TableEditRevert from '../views/table/edit/Revert.vue'
import TableEditStatus from '../views/table/edit/Status.vue'
// import TableEditCellDisable from '../views/table/edit/CellDisable.vue'
// import TableEditRowDisable from '../views/table/edit/RowDisable.vue'
// import TableEditHighlightCell from '../views/table/edit/HighlightCell.vue'
import TableEditKeyboard from '../views/table/edit/Keyboard.vue'
import TableEditKeyboardEdit from '../views/table/edit/KeyboardEdit.vue'
import TableEditCellValid from '../views/table/edit/CellValid.vue'
import TableEditRowValid from '../views/table/edit/RowValid.vue'
// import TableEditForceCellValid from '../views/table/edit/ForceCellValid.vue'
// import TableEditForceRowValid from '../views/table/edit/ForceRowValid.vue'
import TableEditFooter from '../views/table/edit/Footer.vue'
import TableEditFooterImmediately from '../views/table/edit/FooterImmediately.vue'
import TableEditExpand from '../views/table/edit/Expand.vue'
import TableEditMenu from '../views/table/edit/Menu.vue'
import TableEditSpan from '../views/table/edit/Span.vue'
import TableEditForm from '../views/table/edit/Form.vue'
import TableEditUpload from '../views/table/edit/Upload.vue'
import TableEditRealtimeSave from '../views/table/edit/RealtimeSave.vue'
import TableEditDataCount from '../views/table/edit/DataCount.vue'
import TableEditUniqueSelect from '../views/table/edit/UniqueSelect.vue'
import TableEditCascadingSelect from '../views/table/edit/CascadingSelect.vue'
import TableEditEvents from '../views/table/edit/Events.vue'
import TableEditTemplate from '../views/table/edit/Template.vue'
// import TableEditFull from '../views/table/edit/Full.vue'

// import TableBadEdit from '../views/table/bad/Edit.vue'
// import TableBadNonsupport from '../views/table/bad/Nonsupport.vue'
// import TableBadLineHeight from '../views/table/bad/LineHeight.vue'
import TableBadChange from '../views/table/bad/Change.vue'

import ModuleIcon from '../views/icon/Icon.vue'
import ModuleButton from '../views/button/Button.vue'
import ModuleRadio from '../views/radio/Radio.vue'
import ModuleCheckbox from '../views/checkbox/Checkbox.vue'
import ModuleInput from '../views/input/Input.vue'
import ModuleTextarea from '../views/textarea/Textarea.vue'
import ModuleSelect from '../views/select/Select.vue'
import ModulePager from '../views/pager/Pager.vue'
import ModuleModal from '../views/modal/Modal.vue'
import ModuleTooltip from '../views/tooltip/Tooltip.vue'
import ModuleToolbar from '../views/toolbar/Toolbar.vue'
import ModuleForm from '../views/form/Form.vue'
import ModuleSwitch from '../views/switch/Switch.vue'
import ModuleList from '../views/list/List.vue'
import ModulePulldown from '../views/pulldown/Pulldown.vue'
import ModuleFile from '../views/file/File.vue'
import ModulePrint from '../views/print/Print.vue'

import TableOtherElement from '../views/table/other/Element.vue'
// import TableOtherIview from '../views/table/other/Iview.vue'
import TableOtherAntd from '../views/table/other/Antd.vue'
import TableSortableColumn from '../views/table/other/SortableColumn.vue'
import TableSortableRow from '../views/table/other/SortableRow.vue'
import TableXlsx from '../views/table/other/Xlsx.vue'

import TablePluginElementConfig from '../views/table/plugin/ElementConfig.vue'
import TablePluginElementFilter from '../views/table/plugin/ElementFilter.vue'
import TablePluginElementPage from '../views/table/plugin/ElementPage.vue'
// import TablePluginIviewConfig from '../views/table/plugin/IviewConfig.vue'
// import TablePluginIviewFilter from '../views/table/plugin/IviewFilter.vue'
// import TablePluginIviewPage from '../views/table/plugin/IviewPage.vue'
import TablePluginAntdConfig from '../views/table/plugin/AntdConfig.vue'
import TablePluginAntdFilter from '../views/table/plugin/AntdFilter.vue'
import TablePluginAntdPage from '../views/table/plugin/AntdPage.vue'
// import TablePluginShortcutKey from '../views/table/plugin/ShortcutKey.vue'
// import TablePluginCharts from '../views/table/plugin/Charts.vue'
import TablePluginExportXLSX from '../views/table/plugin/ExportXLSX.vue'
import TablePluginExportPDF from '../views/table/plugin/ExportPDF.vue'
import TablePluginRenderer from '../views/table/plugin/Renderer.vue'
import TablePluginMenus from '../views/table/plugin/Menus.vue'
// import TablePluginTreeRows from '../views/table/plugin/TreeRows'
// import TablePluginTreeCols from '../views/table/plugin/TreeCols'

import VXEAPI from '../views/api/API.vue'
import Donation from '../views/api/Donation.vue'
// import Run from '../views/api/Run.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/*',
    redirect: {
      name: 'StartInstall'
    }
  },
  {
    path: '/',
    redirect: {
      name: 'StartInstall'
    }
  },
  {
    path: '/table/start/upgrade',
    name: 'StartUpgrade',
    component: StartUpgrade
  },
  {
    path: '/table/start/install',
    name: 'StartInstall',
    component: StartInstall
  },
  {
    path: '/table/start/use',
    name: 'StartUse',
    component: StartUse
  },
  {
    path: '/table/start/global',
    name: 'StartGlobal',
    component: StartGlobal
  },
  {
    path: '/table/start/icons',
    name: 'StartIcons',
    component: StartIcons
  },
  {
    path: '/table/start/theme',
    name: 'StartTheme',
    component: StartTheme
  },
  {
    path: '/table/start/i18n',
    name: 'StartI18n',
    component: StartI18n
  },
  {
    path: '/table/renderer/api',
    name: 'RendererAPI',
    component: RendererAPI
  },
  {
    path: '/table/renderer/filter',
    name: 'RendererFilter',
    component: RendererFilter
  },
  {
    path: '/table/renderer/default',
    name: 'RendererDefault',
    component: RendererDefault
  },
  {
    path: '/table/renderer/edit',
    name: 'RendererEdit',
    component: RendererEdit
  },
  {
    path: '/table/renderer/expand',
    name: 'RendererExpand',
    component: RendererExpand
  },
  {
    path: '/table/renderer/toolbar',
    name: 'RendererToolbar',
    component: RendererToolbar
  },
  {
    path: '/table/renderer/form',
    name: 'RendererForm',
    component: RendererForm
  },
  {
    path: '/table/renderer/empty',
    name: 'RendererEmpty',
    component: RendererEmpty
  },
  {
    path: '/table/formats/api',
    name: 'FormatsAPI',
    component: FormatsAPI
  },
  {
    path: '/table/commands/api',
    name: 'CommandsAPI',
    component: CommandsAPI
  },
  {
    path: '/table/menus/api',
    name: 'MenusAPI',
    component: MenusAPI
  },
  {
    path: '/table/interceptor/api',
    name: 'InterceptorAPI',
    component: InterceptorAPI
  },
  {
    path: '/table/base/basic',
    name: 'TableBasic',
    component: TableBasic
  },
  {
    path: '/table/base/size',
    name: 'TableSize',
    component: TableSize
  },
  {
    path: '/table/base/autoBreak',
    name: 'TableAutoBreak',
    component: TableAutoBreak
  },
  {
    path: '/table/base/width',
    name: 'TableWidth',
    component: TableWidth
  },
  {
    path: '/table/base/overflow',
    name: 'TableOverflow',
    component: TableOverflow
  },
  {
    path: '/table/base/tooltip',
    name: 'TableTooltip',
    component: TableTooltip
  },
  {
    path: '/table/base/stripe',
    name: 'TableStripe',
    component: TableStripe
  },
  {
    path: '/table/base/border',
    name: 'TableBorder',
    component: TableBorder
  },
  {
    path: '/table/base/round',
    name: 'TableRound',
    component: TableRound
  },
  {
    path: '/table/base/dynamicStyle',
    name: 'TableDynamicStyle',
    component: TableDynamicStyle
  },
  {
    path: '/table/base/style',
    name: 'TableStyle',
    component: TableStyle
  },
  {
    path: '/table/base/scrollStyle',
    name: 'TableScrollStyle',
    component: TableScrollStyle
  },
  {
    path: '/table/base/header',
    name: 'TableHeader',
    component: TableHeader
  },
  {
    path: '/table/base/highlight',
    name: 'TableHeaderHighlight',
    component: TableHeaderHighlight
  },
  {
    path: '/table/base/resizable',
    name: 'TableResizable',
    component: TableResizable
  },
  {
    path: '/table/base/maxHeight',
    name: 'TableMaxHeight',
    component: TableMaxHeight
  },
  {
    path: '/table/base/height',
    name: 'TableHeight',
    component: TableHeight
  },
  {
    path: '/table/base/autoHeight',
    name: 'TableAutoHeight',
    component: TableAutoHeight
  },
  {
    path: '/table/base/fixed',
    name: 'TableFixed',
    component: TableFixed
  },
  {
    path: '/table/base/fixedFull',
    name: 'TableFixedFull',
    component: TableFixedFull
  },
  {
    path: '/table/base/group',
    name: 'TableGroup',
    component: TableGroup
  },
  {
    path: '/table/base/seq',
    name: 'TableSeq',
    component: TableSeq
  },
  {
    path: '/table/base/current',
    name: 'TableCurrent',
    component: TableCurrent
  },
  {
    path: '/table/base/radio',
    name: 'TableRadio',
    component: TableRadio
  },
  {
    path: '/table/base/selection',
    name: 'TableSelection',
    component: TableSelection
  },
  {
    path: '/table/base/sort',
    name: 'TableSort',
    component: TableSort
  },
  {
    path: '/table/base/filter',
    name: 'TableFilter',
    component: TableFilter
  },
  {
    path: '/table/base/empty',
    name: 'TableEmpty',
    component: TableEmpty
  },
  {
    path: '/table/base/loading',
    name: 'TableLoading',
    component: TableLoading
  },
  {
    path: '/table/base/format',
    name: 'TableFormat',
    component: TableFormat
  },
  {
    path: '/table/base/data',
    name: 'TableData',
    component: TableData
  },
  {
    path: '/table/base/html',
    name: 'TableHTML',
    component: TableHTML
  },
  {
    path: '/table/base/full',
    name: 'TableFull',
    component: TableFull
  },
  {
    path: '/table/advanced/event',
    name: 'TableEvent',
    component: TableEvent
  },
  {
    path: '/table/advanced/template',
    name: 'TableTemplate',
    component: TableTemplate
  },
  {
    path: '/table/advanced/dynamic',
    name: 'TableDynamic',
    component: TableDynamic
  },
  {
    path: '/table/advanced/customCheckbox',
    name: 'TableCustomCheckbox',
    component: TableCustomCheckbox
  },
  {
    path: '/table/advanced/customRadio',
    name: 'TableCustomRadio',
    component: TableCustomRadio
  },
  {
    path: '/table/advanced/sortIcon',
    name: 'TableSortIcon',
    component: TableSortIcon
  },
  {
    path: '/table/advanced/customSort',
    name: 'TableCustomSort',
    component: TableCustomSort
  },
  {
    path: '/table/advanced/multiSort',
    name: 'TableMultiSort',
    component: TableMultiSort
  },
  {
    path: '/table/advanced/manualFilter',
    name: 'TableManualFilter',
    component: TableManualFilter
  },
  {
    path: '/table/advanced/filterIcon',
    name: 'TableFilterIcon',
    component: TableFilterIcon
  },
  {
    path: '/table/advanced/span',
    name: 'TableSpan',
    component: TableSpan
  },
  {
    path: '/table/advanced/spanRow',
    name: 'TableSpanRow',
    component: TableSpanRow
  },
  {
    path: '/table/advanced/mergeCell',
    name: 'TableMergeCell',
    component: TableMergeCell
  },
  {
    path: '/table/advanced/footer',
    name: 'TableFooter',
    component: TableFooter
  },
  {
    path: '/table/advanced/footerSpan',
    name: 'TableFooterSpan',
    component: TableFooterSpan
  },
  {
    path: '/table/advanced/footerMaxHeight',
    name: 'TableFooterMaxHeight',
    component: TableFooterMaxHeight
  },
  {
    path: '/table/advanced/import',
    name: 'TableImport',
    component: TableImport
  },
  {
    path: '/table/advanced/export',
    name: 'TableExport',
    component: TableExport
  },
  {
    path: '/table/advanced/print',
    name: 'TablePrint',
    component: TablePrint
  },
  {
    path: '/table/advanced/customPrint',
    name: 'TableCustomPrint',
    component: TableCustomPrint
  },
  {
    path: '/table/advanced/fixedType',
    name: 'TableFixedType',
    component: TableFixedType
  },
  {
    path: '/table/advanced/menu',
    name: 'TableMenu',
    component: TableMenu
  },
  {
    path: '/table/advanced/menuPrivilege',
    name: 'TableMenuPrivilege',
    component: TableMenuPrivilege
  },
  {
    path: '/table/advanced/expand',
    name: 'TableExpand',
    component: TableExpand
  },
  // {
  //   path: '/table/advanced/expandIcon',
  //   name: 'TableExpandIcon',
  //   component: TableExpandIcon
  // },
  // {
  //   path: '/table/advanced/expandLazy',
  //   name: 'TableExpandLazy',
  //   component: TableExpandLazy
  // },
  // {
  //   path: '/table/advanced/expandAccordion',
  //   name: 'TableExpandAccordion',
  //   component: TableExpandAccordion
  // },
  {
    path: '/table/advanced/search',
    name: 'TableSearch',
    component: TableSearch
  },
  // {
  //   path: '/table/advanced/groupBy',
  //   name: 'TableGroupBy',
  //   component: TableGroupBy
  // },
  {
    path: '/table/advanced/details',
    name: 'TableDetails',
    component: TableDetails
  },
  // {
  //   path: '/table/advanced/popupEdit',
  //   name: 'TablePopupEdit',
  //   component: TablePopupEdit
  // },
  {
    path: '/table/advanced/toolbar',
    name: 'TableToolbar',
    component: TableToolbar
  },
  // {
  //   path: '/table/advanced/custom',
  //   name: 'TableCustom',
  //   component: TableCustom
  // },
  {
    path: '/table/advanced/customStorage',
    name: 'TableCustomStorage',
    component: TableCustomStorage
  },
  {
    path: '/table/advanced/customlWidthStorage',
    name: 'TableCustomlWidthStorage',
    component: TableCustomlWidthStorage
  },
  // {
  //   path: '/table/advanced/form',
  //   name: 'TableForm',
  //   component: TableForm
  // },
  // {
  //   path: '/table/advanced/page',
  //   name: 'TablePage',
  //   component: TablePage
  // },
  // {
  //   path: '/table/advanced/pageIcon',
  //   name: 'TablePageIcon',
  //   component: TablePageIcon
  // },
  // {
  //   path: '/table/advanced/highlight',
  //   name: 'TableHighlight',
  //   component: TableHighlight
  // },
  // {
  //   path: '/table/advanced/rangeSelect',
  //   name: 'TableRangeSelect',
  //   component: TableRangeSelect
  // },
  // {
  //   path: '/table/advanced/tabs',
  //   name: 'TableTabs',
  //   component: TableTabs
  // },
  {
    path: '/table/advanced/keepAlives',
    component: TableKeepAlives,
    children: [
      {
        path: 'table1',
        name: 'TableKeepAliveTable1',
        component: TableKeepAliveTable1
      },
      {
        path: 'table2',
        name: 'TableKeepAliveTable2',
        component: TableKeepAliveTable2
      },
      {
        path: 'table3',
        name: 'TableKeepAliveTable3',
        component: TableKeepAliveTable3
      }
    ]
  },
  {
    path: '/table/tree/basic',
    name: 'TableTreeBasic',
    component: TableTreeBasic
  },
  {
    path: '/table/tree/normal',
    name: 'TableTreeNormal',
    component: TableTreeNormal
  },
  {
    path: '/table/tree/treeIcon',
    name: 'TableTreeIcon',
    component: TableTreeIcon
  },
  {
    path: '/table/tree/accordion',
    name: 'TableTreeAccordion',
    component: TableTreeAccordion
  },
  {
    path: '/table/tree/selection',
    name: 'TableTreeSelection',
    component: TableTreeSelection
  },
  {
    path: '/table/tree/radio',
    name: 'TableTreeRadio',
    component: TableTreeRadio
  },
  {
    path: '/table/tree/fixed',
    name: 'TableTreeFixed',
    component: TableTreeFixed
  },
  {
    path: '/table/tree/maxHeight',
    name: 'TableTreeMaxHeight',
    component: TableTreeMaxHeight
  },
  {
    path: '/table/tree/filter',
    name: 'TableTreeFilter',
    component: TableTreeFilter
  },
  {
    path: '/table/tree/sort',
    name: 'TableTreeSort',
    component: TableTreeSort
  },
  // {
  //   path: '/table/tree/groupSummary',
  //   name: 'TableTreeGroupSummary',
  //   component: TableTreeGroupSummary
  // },
  // {
  //   path: '/table/tree/groupSummaryCount',
  //   name: 'TableTreeGroupSummaryCount',
  //   component: TableTreeGroupSummaryCount
  // },
  {
    path: '/table/tree/expand',
    name: 'TableTreeExpand',
    component: TableTreeExpand
  },
  {
    path: '/table/tree/expandLazy',
    name: 'TableTreeExpandLazy',
    component: TableTreeExpandLazy
  },
  {
    path: '/table/tree/toolbar',
    name: 'TableTreeToolbar',
    component: TableTreeToolbar
  },
  // {
  //   path: '/table/tree/insert',
  //   name: 'TableTreeInsert',
  //   component: TableTreeInsert
  // },
  {
    path: '/table/tree/menu',
    name: 'TableTreeMenu',
    component: TableTreeMenu
  },
  // {
  //   path: '/table/tree/span',
  //   name: 'TableTreeSpan',
  //   component: TableTreeSpan
  // },
  // {
  //   path: '/table/tree/highlight',
  //   name: 'TableTreeHighlight',
  //   component: TableTreeHighlight
  // },
  // {
  //   path: '/table/tree/keyboard',
  //   name: 'TableTreeKeyboard',
  //   component: TableTreeKeyboard
  // },
  {
    path: '/table/tree/lazy',
    name: 'TableTreeLazy',
    component: TableTreeLazy
  },
  {
    path: '/table/tree/lazyMenu',
    name: 'TableTreeLazyMenu',
    component: TableTreeLazyMenu
  },
  {
    path: '/table/tree/lazyEdit',
    name: 'TableTreeLazyEdit',
    component: TableTreeLazyEdit
  },
  {
    path: '/table/tree/line',
    name: 'TableTreeLine',
    component: TableTreeLine
  },
  {
    path: '/table/tree/edit',
    name: 'TableTreeEdit',
    component: TableTreeEdit
  },
  // {
  //   path: '/table/tree/editCellValid',
  //   name: 'TableTreeEditCellValid',
  //   component: TableTreeEditCellValid
  // },
  // {
  //   path: '/table/tree/editRowValid',
  //   name: 'TableTreeEditRowValid',
  //   component: TableTreeEditRowValid
  // },
  // {
  //   path: '/table/tree/editForceCellValid',
  //   name: 'TableTreeEditForceCellValid',
  //   component: TableTreeEditForceCellValid
  // },
  // {
  //   path: '/table/tree/editForceRowValid',
  //   name: 'TableTreeEditForceRowValid',
  //   component: TableTreeEditForceRowValid
  // },
  {
    path: '/table/tree/template',
    name: 'TableTreeTemplate',
    component: TableTreeTemplate
  },
  // {
  //   path: '/table/virtualTree/basic',
  //   name: 'TableVirtualTreeBasic',
  //   component: TableVirtualTreeBasic
  // },
  // {
  //   path: '/table/virtualTree/normal',
  //   name: 'TableVirtualTreeNormal',
  //   component: TableVirtualTreeNormal
  // },
  // {
  //   path: '/table/virtualTree/radio',
  //   name: 'TableVirtualTreeRadio',
  //   component: TableVirtualTreeRadio
  // },
  // {
  //   path: '/table/virtualTree/checkbox',
  //   name: 'TableVirtualTreeCheckbox',
  //   component: TableVirtualTreeCheckbox
  // },
  // {
  //   path: '/table/virtualTree/icon',
  //   name: 'TableVirtualTreeIcon',
  //   component: TableVirtualTreeIcon
  // },
  // {
  //   path: '/table/virtualTree/fixed',
  //   name: 'TableVirtualTreeFixed',
  //   component: TableVirtualTreeFixed
  // },
  // {
  //   path: '/table/virtualTree/maxHeight',
  //   name: 'TableVirtualTreeMaxHeight',
  //   component: TableVirtualTreeMaxHeight
  // },
  // {
  //   path: '/table/virtualTree/edit',
  //   name: 'TableVirtualTreeEdit',
  //   component: TableVirtualTreeEdit
  // },
  // {
  //   path: '/table/virtualTree/insert',
  //   name: 'TableVirtualTreeInsert',
  //   component: TableVirtualTreeInsert
  // },
  // {
  //   path: '/table/virtualTree/remove',
  //   name: 'TableVirtualTreeRemove',
  //   component: TableVirtualTreeRemove
  // },
  // {
  //   path: '/table/virtualTree/menu',
  //   name: 'TableVirtualTreeMenu',
  //   component: TableVirtualTreeMenu
  // },
  // {
  //   path: '/table/virtualTree/template',
  //   name: 'TableVirtualTreeTemplate',
  //   component: TableVirtualTreeTemplate
  // },
  // {
  //   path: '/table/virtualTree/big',
  //   name: 'TableVirtualTreeBig',
  //   component: TableVirtualTreeBig
  // },
  {
    path: '/table/grid/basic',
    name: 'GridBasic',
    component: GridBasic
  },
  {
    path: '/table/grid/events',
    name: 'GridEvents',
    component: GridEvents
  },
  {
    path: '/table/grid/group',
    name: 'GridGroup',
    component: GridGroup
  },
  {
    path: '/table/grid/reverse',
    name: 'GridReverse',
    component: GridReverse
  },
  {
    path: '/table/grid/template',
    name: 'GridTemplate',
    component: GridTemplate
  },
  {
    path: '/table/grid/footer',
    name: 'GridFooter',
    component: GridFooter
  },
  {
    path: '/table/grid/page',
    name: 'GridPage',
    component: GridPage
  },
  {
    path: '/table/grid/proxy',
    name: 'GridProxy',
    component: GridProxy
  },
  {
    path: '/table/grid/pageProxy',
    name: 'GridPageProxy',
    component: GridPageProxy
  },
  // {
  //   path: '/table/grid/configProxy',
  //   name: 'GridConfigProxy',
  //   component: GridConfigProxy
  // },
  {
    path: '/table/grid/edit',
    name: 'GridEdit',
    component: GridEdit
  },
  {
    path: '/table/grid/cellDisable',
    name: 'GridCellDisable',
    component: GridCellDisable
  },
  {
    path: '/table/grid/rowDisable',
    name: 'GridRowDisable',
    component: GridRowDisable
  },
  {
    path: '/table/grid/form',
    name: 'GridForm',
    component: GridForm
  },
  {
    path: '/table/grid/formProxy',
    name: 'GridFormProxy',
    component: GridFormProxy
  },
  {
    path: '/table/grid/toolbar',
    name: 'GridToolbar',
    component: GridToolbar
  },
  {
    path: '/table/grid/customToolbar',
    name: 'GridCustomToolbar',
    component: GridCustomToolbar
  },
  {
    path: '/table/grid/toolbarIcon',
    name: 'GridToolbarIcon',
    component: GridToolbarIcon
  },
  {
    path: '/table/grid/fullscreen',
    name: 'GridFullscreen',
    component: GridFullscreen
  },
  // {
  //   path: '/table/grid/dynamic',
  //   name: 'GridDynamic',
  //   component: GridDynamic
  // },
  {
    path: '/table/grid/menu',
    name: 'GridMenu',
    component: GridMenu
  },
  // {
  //   path: '/table/grid/span',
  //   name: 'GridSpan',
  //   component: GridSpan
  // },
  // {
  //   path: '/table/grid/upload',
  //   name: 'GridUpload',
  //   component: GridUpload
  // },
  // {
  //   path: '/table/grid/tree',
  //   name: 'GridTree',
  //   component: GridTree
  // },
  // {
  //   path: '/table/grid/treeLazy',
  //   name: 'GridTreeLazy',
  //   component: GridTreeLazy
  // },
  // {
  //   path: '/table/grid/treeLazyEdit',
  //   name: 'GridTreeLazyEdit',
  //   component: GridTreeLazyEdit
  // },
  // {
  //   path: '/table/grid/treeEdit',
  //   name: 'GridTreeEdit',
  //   component: GridTreeEdit
  // },
  {
    path: '/table/grid/fullEdit',
    name: 'GridFullEdit',
    component: GridFullEdit
  },
  {
    path: '/table/grid/fullQuery',
    name: 'GridFullQuery',
    component: GridFullQuery
  },
  {
    path: '/table/scroll/scroll',
    name: 'TableScroll',
    component: TableScroll
  },
  {
    path: '/table/scroll/mode',
    name: 'TableScrollMode',
    component: TableScrollMode
  },
  {
    path: '/table/scroll/rows',
    name: 'TableScrollRows',
    component: TableScrollRows
  },
  {
    path: '/table/scroll/fullRows',
    name: 'TableScrollFullRows',
    component: TableScrollFullRows
  },
  {
    path: '/table/scroll/cols',
    name: 'TableScrollCols',
    component: TableScrollCols
  },
  {
    path: '/table/scroll/fullCols',
    name: 'TableScrollFullCols',
    component: TableScrollFullCols
  },
  // {
  //   path: '/table/scroll/highlight',
  //   name: 'TableScrollHighlight',
  //   component: TableScrollHighlight
  // },
  {
    path: '/table/scroll/maxHeight',
    name: 'TableScrollMaxHeight',
    component: TableScrollMaxHeight
  },
  {
    path: '/table/scroll/group',
    name: 'TableScrollGroup',
    component: TableScrollGroup
  },
  {
    path: '/table/scroll/merge',
    name: 'TableScrollMerge',
    component: TableScrollMerge
  },
  {
    path: '/table/scroll/keyboard',
    name: 'TableScrollKeyboard',
    component: TableScrollKeyboard
  },
  {
    path: '/table/scroll/edit',
    name: 'TableScrollEdit',
    component: TableScrollEdit
  },
  // {
  //   path: '/table/scroll/cellValid',
  //   name: 'TableScrollCellValid',
  //   component: TableScrollCellValid
  // },
  // {
  //   path: '/table/scroll/rowValid',
  //   name: 'TableScrollRowValid',
  //   component: TableScrollRowValid
  // },
  // {
  //   path: '/table/scroll/forceCellValid',
  //   name: 'TableScrollForceCellValid',
  //   component: TableScrollForceCellValid
  // },
  // {
  //   path: '/table/scroll/forceRowValid',
  //   name: 'TableScrollForceRowValid',
  //   component: TableScrollForceRowValid
  // },
  {
    path: '/table/scroll/partialLoad',
    name: 'TableScrollPartialLoad',
    component: TableScrollPartialLoad
  },
  {
    path: '/table/scroll/fullPartialLoad',
    name: 'TableScrollFullPartialLoad',
    component: TableScrollFullPartialLoad
  },
  {
    path: '/table/scroll/footer',
    name: 'TableScrollFooter',
    component: TableScrollFooter
  },
  {
    path: '/table/scroll/template',
    name: 'TableScrollTemplate',
    component: TableScrollTemplate
  },
  // {
  //   path: '/table/scroll/tabs',
  //   name: 'TableScrollTabs',
  //   component: TableScrollTabs
  // },
  {
    path: '/table/scroll/keepAlives',
    component: TableScrollKeepAlives,
    children: [
      {
        path: 'table1',
        name: 'TableScrollKeepAliveTable1',
        component: TableScrollKeepAliveTable1
      },
      {
        path: 'table2',
        name: 'TableScrollKeepAliveTable2',
        component: TableScrollKeepAliveTable2
      },
      {
        path: 'table3',
        name: 'TableScrollKeepAliveTable3',
        component: TableScrollKeepAliveTable3
      }
    ]
  },
  {
    path: '/table/edit/popupForm',
    name: 'TableEditPopupForm',
    component: TableEditPopupForm
  },
  {
    path: '/table/edit/manual',
    name: 'TableEditManual',
    component: TableEditManual
  },
  {
    path: '/table/edit/click',
    name: 'TableEditClick',
    component: TableEditClick
  },
  {
    path: '/table/edit/dblclick',
    name: 'TableEditDBLClick',
    component: TableEditDBLClick
  },
  {
    path: '/table/edit/select',
    name: 'TableEditSelect',
    component: TableEditSelect
  },
  {
    path: '/table/edit/autoClear',
    name: 'TableAutoClearManual',
    component: TableAutoClearManual
  },
  {
    path: '/table/edit/cellPlaceholder',
    name: 'TableEditCellPlaceholder',
    component: TableEditCellPlaceholder
  },
  {
    path: '/table/edit/insert',
    name: 'TableEditInsert',
    component: TableEditInsert
  },
  {
    path: '/table/edit/remove',
    name: 'TableEditRemove',
    component: TableEditRemove
  },
  {
    path: '/table/edit/revert',
    name: 'TableEditRevert',
    component: TableEditRevert
  },
  {
    path: '/table/edit/status',
    name: 'TableEditStatus',
    component: TableEditStatus
  },
  // {
  //   path: '/table/edit/cellDisable',
  //   name: 'TableEditCellDisable',
  //   component: TableEditCellDisable
  // },
  // {
  //   path: '/table/edit/rowDisable',
  //   name: 'TableEditRowDisable',
  //   component: TableEditRowDisable
  // },
  // {
  //   path: '/table/edit/highlightCell',
  //   name: 'TableEditHighlightCell',
  //   component: TableEditHighlightCell
  // },
  {
    path: '/table/edit/keyboard',
    name: 'TableEditKeyboard',
    component: TableEditKeyboard
  },
  {
    path: '/table/edit/keyboardEdit',
    name: 'TableEditKeyboardEdit',
    component: TableEditKeyboardEdit
  },
  {
    path: '/table/edit/cellValid',
    name: 'TableEditCellValid',
    component: TableEditCellValid
  },
  {
    path: '/table/edit/rowValid',
    name: 'TableEditRowValid',
    component: TableEditRowValid
  },
  // {
  //   path: '/table/edit/forceCellValid',
  //   name: 'TableEditForceCellValid',
  //   component: TableEditForceCellValid
  // },
  // {
  //   path: '/table/edit/forceRowValid',
  //   name: 'TableEditForceRowValid',
  //   component: TableEditForceRowValid
  // },
  {
    path: '/table/edit/footer',
    name: 'TableEditFooter',
    component: TableEditFooter
  },
  {
    path: '/table/edit/footerImmediately',
    name: 'TableEditFooterImmediately',
    component: TableEditFooterImmediately
  },
  {
    path: '/table/edit/expand',
    name: 'TableEditExpand',
    component: TableEditExpand
  },
  {
    path: '/table/edit/menu',
    name: 'TableEditMenu',
    component: TableEditMenu
  },
  {
    path: '/table/edit/span',
    name: 'TableEditSpan',
    component: TableEditSpan
  },
  {
    path: '/table/edit/form',
    name: 'TableEditForm',
    component: TableEditForm
  },
  {
    path: '/table/edit/upload',
    name: 'TableEditUpload',
    component: TableEditUpload
  },
  {
    path: '/table/edit/realtimeSave',
    name: 'TableEditRealtimeSave',
    component: TableEditRealtimeSave
  },
  {
    path: '/table/edit/dataCount',
    name: 'TableEditDataCount',
    component: TableEditDataCount
  },
  {
    path: '/table/edit/uniqueSelect',
    name: 'TableEditUniqueSelect',
    component: TableEditUniqueSelect
  },
  {
    path: '/table/edit/cascadingSelect',
    name: 'TableEditCascadingSelect',
    component: TableEditCascadingSelect
  },
  {
    path: '/table/edit/events',
    name: 'TableEditEvents',
    component: TableEditEvents
  },
  {
    path: '/table/edit/template',
    name: 'TableEditTemplate',
    component: TableEditTemplate
  },
  // {
  //   path: '/table/edit/full',
  //   name: 'TableEditFull',
  //   component: TableEditFull
  // },
  // {
  //   path: '/table/bad/edit',
  //   name: 'TableBadEdit',
  //   component: TableBadEdit
  // },
  // {
  //   path: '/table/bad/nonsupport',
  //   name: 'TableBadNonsupport',
  //   component: TableBadNonsupport
  // },
  {
    path: '/table/bad/change',
    name: 'TableBadChange',
    component: TableBadChange
  },
  {
    path: '/table/module/icon',
    name: 'ModuleIcon',
    component: ModuleIcon
  },
  {
    path: '/table/module/button',
    name: 'ModuleButton',
    component: ModuleButton
  },
  {
    path: '/table/module/radio',
    name: 'ModuleRadio',
    component: ModuleRadio
  },
  {
    path: '/table/module/checkbox',
    name: 'ModuleCheckbox',
    component: ModuleCheckbox
  },
  {
    path: '/table/module/input',
    name: 'ModuleInput',
    component: ModuleInput
  },
  {
    path: '/table/module/textarea',
    name: 'ModuleTextarea',
    component: ModuleTextarea
  },
  {
    path: '/table/module/select',
    name: 'ModuleSelect',
    component: ModuleSelect
  },
  {
    path: '/table/module/pager',
    name: 'ModulePager',
    component: ModulePager
  },
  {
    path: '/table/module/modal',
    name: 'ModuleModal',
    component: ModuleModal
  },
  {
    path: '/table/module/tooltip',
    name: 'ModuleTooltip',
    component: ModuleTooltip
  },
  {
    path: '/table/module/toolbar',
    name: 'ModuleToolbar',
    component: ModuleToolbar
  },
  {
    path: '/table/module/form',
    name: 'ModuleForm',
    component: ModuleForm
  },
  {
    path: '/table/module/switch',
    name: 'ModuleSwitch',
    component: ModuleSwitch
  },
  {
    path: '/table/module/list',
    name: 'ModuleList',
    component: ModuleList
  },
  {
    path: '/table/module/pulldown',
    name: 'ModulePulldown',
    component: ModulePulldown
  },
  {
    path: '/table/module/file',
    name: 'ModuleFile',
    component: ModuleFile
  },
  {
    path: '/table/module/print',
    name: 'ModulePrint',
    component: ModulePrint
  },
  {
    path: '/table/other/element',
    name: 'TableOtherElement',
    component: TableOtherElement
  },
  // {
  //   path: '/table/other/iview',
  //   name: 'TableOtherIview',
  //   component: TableOtherIview
  // },
  {
    path: '/table/other/antd',
    name: 'TableOtherAntd',
    component: TableOtherAntd
  },
  {
    path: '/table/other/sortableColumn',
    name: 'TableSortableColumn',
    component: TableSortableColumn
  },
  {
    path: '/table/other/sortableRow',
    name: 'TableSortableRow',
    component: TableSortableRow
  },
  {
    path: '/table/other/xlsx',
    name: 'TableXlsx',
    component: TableXlsx
  },
  {
    path: '/table/plugin/elementConfig',
    name: 'TablePluginElementConfig',
    component: TablePluginElementConfig
  },
  {
    path: '/table/plugin/elementFilter',
    name: 'TablePluginElementFilter',
    component: TablePluginElementFilter
  },
  {
    path: '/table/plugin/elementPage',
    name: 'TablePluginElementPage',
    component: TablePluginElementPage
  },
  // {
  //   path: '/table/plugin/iviewConfig',
  //   name: 'TablePluginIviewConfig',
  //   component: TablePluginIviewConfig
  // },
  // {
  //   path: '/table/plugin/iviewFilter',
  //   name: 'TablePluginIviewFilter',
  //   component: TablePluginIviewFilter
  // },
  // {
  //   path: '/table/plugin/iviewPage',
  //   name: 'TablePluginIviewPage',
  //   component: TablePluginIviewPage
  // },
  {
    path: '/table/plugin/antdConfig',
    name: 'TablePluginAntdConfig',
    component: TablePluginAntdConfig
  },
  {
    path: '/table/plugin/antdFilter',
    name: 'TablePluginAntdFilter',
    component: TablePluginAntdFilter
  },
  {
    path: '/table/plugin/antdPage',
    name: 'TablePluginAntdPage',
    component: TablePluginAntdPage
  },
  // {
  //   path: '/table/plugin/shortcutKey',
  //   name: 'TablePluginShortcutKey',
  //   component: TablePluginShortcutKey
  // },
  // {
  //   path: '/table/plugin/charts',
  //   name: 'TablePluginCharts',
  //   component: TablePluginCharts
  // },
  {
    path: '/table/plugin/exportXLSX',
    name: 'TablePluginExportXLSX',
    component: TablePluginExportXLSX
  },
  {
    path: '/table/plugin/exportPDF',
    name: 'TablePluginExportPDF',
    component: TablePluginExportPDF
  },
  {
    path: '/table/plugin/renderer',
    name: 'TablePluginRenderer',
    component: TablePluginRenderer
  },
  {
    path: '/table/plugin/menus',
    name: 'TablePluginMenus',
    component: TablePluginMenus
  },
  // {
  //   path: '/table/plugin/treeRows',
  //   name: 'TablePluginTreeRows',
  //   component: TablePluginTreeRows
  // },
  // {
  //   path: '/table/plugin/treeCols',
  //   name: 'TablePluginTreeCols',
  //   component: TablePluginTreeCols
  // },
  {
    path: '/donation/api',
    name: 'Donation',
    component: Donation
  },
  {
    path: '/:name/api',
    name: 'VXEAPI',
    component: VXEAPI
  // },
  // {
  //   path: '/api/run',
  //   name: 'Run',
  //   component: Run
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'

const StartInstall = () => import(/* webpackChunkName: "start" */ './views/table/start/Install.vue')
const StartUse = () => import(/* webpackChunkName: "start" */ './views/table/start/Use.vue')
const StartIcons = () => import(/* webpackChunkName: "start" */ './views/table/start/Icons.vue')
const StartGlobal = () => import(/* webpackChunkName: "start" */ './views/table/start/Global.vue')
const StartTheme = () => import(/* webpackChunkName: "start" */ './views/table/start/Theme.vue')
const StartI18n = () => import(/* webpackChunkName: "start" */ './views/table/start/I18n.vue')

const RendererAPI = () => import(/* webpackChunkName: "start" */ './views/table/renderer/API.vue')
const RendererFilter = () => import(/* webpackChunkName: "start" */ './views/table/renderer/Filter.vue')
const RendererDefault = () => import(/* webpackChunkName: "start" */ './views/table/renderer/Default.vue')
const RendererEdit = () => import(/* webpackChunkName: "start" */ './views/table/renderer/Edit.vue')
const RendererToolbar = () => import(/* webpackChunkName: "start" */ './views/table/renderer/Toolbar.vue')
const RendererForm = () => import(/* webpackChunkName: "start" */ './views/table/renderer/Form.vue')

const CommandsAPI = () => import(/* webpackChunkName: "start" */ './views/table/commands/API.vue')
const MenusAPI = () => import(/* webpackChunkName: "start" */ './views/table/menus/API.vue')
const InterceptorAPI = () => import(/* webpackChunkName: "start" */ './views/table/interceptor/API.vue')

const TableBasic = () => import(/* webpackChunkName: "base" */ './views/table/base/Basic.vue')
const TableSize = () => import(/* webpackChunkName: "base" */ './views/table/base/Size.vue')
const TableWidth = () => import(/* webpackChunkName: "base" */ './views/table/base/Width.vue')
const TableOverflow = () => import(/* webpackChunkName: "base" */ './views/table/base/Overflow.vue')
const TableStripe = () => import(/* webpackChunkName: "base" */ './views/table/base/Stripe.vue')
const TableBorder = () => import(/* webpackChunkName: "base" */ './views/table/base/Border.vue')
const TableStyle = () => import(/* webpackChunkName: "base" */ './views/table/base/Style.vue')
const TableDynamicStyle = () => import(/* webpackChunkName: "base" */ './views/table/base/DynamicStyle.vue')
const TableHeader = () => import(/* webpackChunkName: "base" */ './views/table/base/Header.vue')
const TableHeaderHighlight = () => import(/* webpackChunkName: "base" */ './views/table/base/HeaderHighlight.vue')
const TableResizable = () => import(/* webpackChunkName: "base" */ './views/table/base/Resizable.vue')
const TableMaxHeight = () => import(/* webpackChunkName: "base" */ './views/table/base/MaxHeight.vue')
const TableHeight = () => import(/* webpackChunkName: "base" */ './views/table/base/Height.vue')
const TableAutoHeight = () => import(/* webpackChunkName: "base" */ './views/table/base/AutoHeight.vue')
const TableFixed = () => import(/* webpackChunkName: "base" */ './views/table/base/Fixed.vue')
const TableFixedFull = () => import(/* webpackChunkName: "base" */ './views/table/base/FixedFull.vue')
const TableGroup = () => import(/* webpackChunkName: "base" */ './views/table/base/Group.vue')
const TableSeq = () => import(/* webpackChunkName: "base" */ './views/table/base/Seq.vue')
const TableCurrent = () => import(/* webpackChunkName: "base" */ './views/table/base/Current.vue')
const TableRadio = () => import(/* webpackChunkName: "base" */ './views/table/base/Radio.vue')
const TableSelection = () => import(/* webpackChunkName: "base" */ './views/table/base/Selection.vue')
const TableSort = () => import(/* webpackChunkName: "base" */ './views/table/base/Sort.vue')
const TableFilter = () => import(/* webpackChunkName: "base" */ './views/table/base/Filter.vue')
const TableEmpty = () => import(/* webpackChunkName: "base" */ './views/table/base/Empty.vue')
const TableLoading = () => import(/* webpackChunkName: "base" */ './views/table/base/Loading.vue')
const TableFormat = () => import(/* webpackChunkName: "base" */ './views/table/base/Format.vue')
const TableData = () => import(/* webpackChunkName: "base" */ './views/table/base/Data.vue')
const TableHTML = () => import(/* webpackChunkName: "base" */ './views/table/base/HTML.vue')
const TableFull = () => import(/* webpackChunkName: "base" */ './views/table/base/Full.vue')

const TableEvent = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Event.vue')
const TableTemplate = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Template.vue')
const TableDynamic = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Dynamic.vue')
const TableSortIcon = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/SortIcon.vue')
const TableCustomSort = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/CustomSort.vue')
const TableManualFilter = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/ManualFilter.vue')
const TableFilterIcon = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/FilterIcon.vue')
const TableSpan = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Span.vue')
const TableSpanRow = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/SpanRow.vue')
const TableFooter = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Footer.vue')
const TableFooterSpan = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/FooterSpan.vue')
const TableFooterMaxHeight = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/MaxHeight.vue')
const TableImport = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Import.vue')
const TableExport = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Export.vue')
const TablePrint = () => import(/* webpackChunkName: "other" */ './views/table/advanced/Print.vue')
const TableFixedType = () => import(/* webpackChunkName: "other" */ './views/table/advanced/FixedType.vue')
const TableMenu = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Menu.vue')
const TableMenuPrivilege = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/MenuPrivilege.vue')
const TableExpand = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Expand.vue')
const TableExpandIcon = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/ExpandIcon.vue')
const TableExpandLazy = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/ExpandLazy.vue')
const TableExpandAccordion = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/ExpandAccordion.vue')
const TableSearch = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Search.vue')
const Toolbar = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Toolbar.vue')
const TableCustom = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Custom.vue')
const TableCustomStorage = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/CustomStorage.vue')
const TableCustomlWidthStorage = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/CustomlWidthStorage.vue')
const TableForm = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Form.vue')
const TablePage = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Page.vue')
const TablePageIcon = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/PageIcon.vue')
const TableHighlight = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Highlight.vue')
const TableRangeSelect = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/RangeSelect.vue')
const TableTabs = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Tabs.vue')
const TableKeepAlives = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/KeepAlives.vue')
const TableKeepAliveTable1 = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/keepAlives/Table1.vue')
const TableKeepAliveTable2 = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/keepAlives/Table2.vue')
const TableKeepAliveTable3 = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/keepAlives/Table3.vue')

const GridBasic = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Basic.vue')
const GridGroup = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Group.vue')
const GridReverse = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Reverse.vue')
const GridTemplate = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Template.vue')
const GridFooter = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Footer.vue')
const GridPage = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Page.vue')
const GridFullQuery = () => import(/* webpackChunkName: "grid" */ './views/table/grid/FullQuery.vue')
const GridProxy = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Proxy.vue')
const GridPageProxy = () => import(/* webpackChunkName: "grid" */ './views/table/grid/PageProxy.vue')
const GridConfigProxy = () => import(/* webpackChunkName: "grid" */ './views/table/grid/ConfigProxy.vue')
const GridEdit = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Edit.vue')
const GridCellDisable = () => import(/* webpackChunkName: "grid" */ './views/table/grid/CellDisable.vue')
const GridRowDisable = () => import(/* webpackChunkName: "grid" */ './views/table/grid/RowDisable.vue')
const GridForm = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Form.vue')
const GridFormProxy = () => import(/* webpackChunkName: "grid" */ './views/table/grid/FormProxy.vue')
const GridToolbar = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Toolbar.vue')
const GridCustomToolbar = () => import(/* webpackChunkName: "grid" */ './views/table/grid/CustomToolbar.vue')
const GridToolbarIcon = () => import(/* webpackChunkName: "grid" */ './views/table/grid/ToolbarIcon.vue')
const GridFullscreen = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Fullscreen.vue')
const GridDynamic = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Dynamic.vue')
const GridMenu = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Menu.vue')
const GridSpan = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Span.vue')
const GridUpload = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Upload.vue')
const GridTree = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Tree.vue')
const GridTreeLazy = () => import(/* webpackChunkName: "grid" */ './views/table/grid/TreeLazy.vue')
const GridTreeLazyEdit = () => import(/* webpackChunkName: "grid" */ './views/table/grid/TreeLazyEdit.vue')
const GridTreeEdit = () => import(/* webpackChunkName: "grid" */ './views/table/grid/TreeEdit.vue')
const GridFullEdit = () => import(/* webpackChunkName: "grid" */ './views/table/grid/FullEdit.vue')

const TableTreeBasic = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Basic.vue')
const TableTreeNormal = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Normal.vue')
const TableTreeIcon = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Icon.vue')
const TableTreeAccordion = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Accordion.vue')
const TableTreeSelection = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Selection.vue')
const TableTreeRadio = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Radio.vue')
const TableTreeFixed = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Fixed.vue')
const TableTreeMaxHeight = () => import(/* webpackChunkName: "tree" */ './views/table/tree/MaxHeight.vue')
const TableTreeFilter = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Filter.vue')
const TableTreeSort = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Sort.vue')
const TableTreeGroupSummary = () => import(/* webpackChunkName: "tree" */ './views/table/tree/GroupSummary.vue')
const TableTreeGroupSummaryCount = () => import(/* webpackChunkName: "tree" */ './views/table/tree/GroupSummaryCount.vue')
const TableTreeExpand = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Expand.vue')
const TableTreeExpandLazy = () => import(/* webpackChunkName: "tree" */ './views/table/tree/ExpandLazy.vue')
const TableTreeToolbar = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Toolbar.vue')
const TableTreeInsert = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Insert.vue')
const TableTreeMenu = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Menu.vue')
const TableTreeSpan = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Span.vue')
const TableTreeHighlight = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Highlight.vue')
const TableTreeKeyboard = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Keyboard.vue')
const TableTreeLazy = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Lazy.vue')
const TableTreeLazyMenu = () => import(/* webpackChunkName: "tree" */ './views/table/tree/LazyMenu.vue')
const TableTreeLazyEdit = () => import(/* webpackChunkName: "tree" */ './views/table/tree/LazyEdit.vue')
const TableTreeLine = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Line.vue')
const TableTreeEdit = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Edit.vue')
const TableTreeEditCellValid = () => import(/* webpackChunkName: "tree" */ './views/table/tree/CellValid.vue')
const TableTreeEditRowValid = () => import(/* webpackChunkName: "tree" */ './views/table/tree/RowValid.vue')
const TableTreeEditForceCellValid = () => import(/* webpackChunkName: "tree" */ './views/table/tree/ForceCellValid.vue')
const TableTreeEditForceRowValid = () => import(/* webpackChunkName: "tree" */ './views/table/tree/ForceRowValid.vue')
const TableTreeTemplate = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Template.vue')

const TableScroll = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/Scroll.vue')
const TableScrollRows = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ScrollRows.vue')
const TableScrollFullRows = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ScrollFullRows.vue')
const TableScrollCols = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ScrollCols.vue')
const TableScrollFullCols = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ScrollFullCols.vue')
const TableScrollHighlight = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/Highlight.vue')
const TableScrollKeyboard = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/Keyboard.vue')
const TableScrollMaxHeight = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/MaxHeight.vue')
const TableScrollEdit = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/Edit.vue')
const TableScrollTree = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/Tree.vue')
const TableScrollCellValid = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/CellValid.vue')
const TableScrollRowValid = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/RowValid.vue')
const TableScrollForceCellValid = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ForceCellValid.vue')
const TableScrollForceRowValid = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ForceRowValid.vue')
const TableScrollPartialLoad = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/PartialLoad.vue')
const TableScrollFullPartialLoad = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/FullPartialLoad.vue')
const TableScrollTemplate = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/Template.vue')
const TableScrollTabs = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/Tabs.vue')
const TableScrollKeepAlives = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/KeepAlives.vue')
const TableScrollKeepAliveTable1 = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/keepAlives/Table1.vue')
const TableScrollKeepAliveTable2 = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/keepAlives/Table2.vue')
const TableScrollKeepAliveTable3 = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/keepAlives/Table3.vue')

const TableVirtualTreeBasic = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Basic.vue')
const TableVirtualTreeNormal = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Normal.vue')
const TableVirtualTreeRadio = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Radio.vue')
const TableVirtualTreeCheckbox = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Checkbox.vue')
const TableVirtualTreeIcon = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Icon.vue')
const TableVirtualTreeFixed = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Fixed.vue')
const TableVirtualTreeMaxHeight = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/MaxHeight.vue')
const TableVirtualTreeEdit = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Edit.vue')
const TableVirtualTreeInsert = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Insert.vue')
const TableVirtualTreeRemove = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Remove.vue')
const TableVirtualTreeMenu = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Menu.vue')
const TableVirtualTreeTemplate = () => import(/* webpackChunkName: "virtual-tree" */ './views/table/virtual-tree/Template.vue')

const TableEditManual = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Manual.vue')
const TableEditClick = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Click.vue')
const TableEditDBLClick = () => import(/* webpackChunkName: "edit" */ './views/table/edit/DBLClick.vue')
const TableEditSelect = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Select.vue')
const TableAutoClearManual = () => import(/* webpackChunkName: "edit" */ './views/table/edit/AutoClear.vue')
const TableEditInsert = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Insert.vue')
const TableEditRemove = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Remove.vue')
const TableEditRevert = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Revert.vue')
const TableEditStatus = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Status.vue')
const TableEditCellDisable = () => import(/* webpackChunkName: "edit" */ './views/table/edit/CellDisable.vue')
const TableEditRowDisable = () => import(/* webpackChunkName: "edit" */ './views/table/edit/RowDisable.vue')
const TableEditHighlightCell = () => import(/* webpackChunkName: "edit" */ './views/table/edit/HighlightCell.vue')
const TableEditKeyboard = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Keyboard.vue')
const TableEditKeyboardEdit = () => import(/* webpackChunkName: "edit" */ './views/table/edit/KeyboardEdit.vue')
const TableEditCellValid = () => import(/* webpackChunkName: "edit" */ './views/table/edit/CellValid.vue')
const TableEditRowValid = () => import(/* webpackChunkName: "edit" */ './views/table/edit/RowValid.vue')
const TableEditForceCellValid = () => import(/* webpackChunkName: "edit" */ './views/table/edit/ForceCellValid.vue')
const TableEditForceRowValid = () => import(/* webpackChunkName: "edit" */ './views/table/edit/ForceRowValid.vue')
const TableEditFooter = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Footer.vue')
const TableEditFooterImmediately = () => import(/* webpackChunkName: "edit" */ './views/table/edit/FooterImmediately.vue')
const TableEditExpand = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Expand.vue')
const TableEditMenu = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Menu.vue')
const TableEditSpan = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Span.vue')
const TableEditForm = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Form.vue')
const TableEditUpload = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Upload.vue')
const TableEditRealtimeSave = () => import(/* webpackChunkName: "edit" */ './views/table/edit/RealtimeSave.vue')
const TableEditDataCount = () => import(/* webpackChunkName: "edit" */ './views/table/edit/DataCount.vue')
const TableEditUniqueSelect = () => import(/* webpackChunkName: "edit" */ './views/table/edit/UniqueSelect.vue')
const TableEditCascadingSelect = () => import(/* webpackChunkName: "edit" */ './views/table/edit/CascadingSelect.vue')
const TableEditEvents = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Events.vue')
const TableEditTemplate = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Template.vue')
const TableEditFull = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Full.vue')

const TableBadEdit = () => import(/* webpackChunkName: "edit" */ './views/table/bad/Edit.vue')

const ModuleIcon = () => import(/* webpackChunkName: "module" */ './views/icon/Icon.vue')
const ModuleButton = () => import(/* webpackChunkName: "module" */ './views/button/Button.vue')
const ModuleRadio = () => import(/* webpackChunkName: "module" */ './views/radio/Radio.vue')
const ModuleCheckbox = () => import(/* webpackChunkName: "module" */ './views/checkbox/Checkbox.vue')
const ModuleInput = () => import(/* webpackChunkName: "module" */ './views/input/Input.vue')
const ModulePager = () => import(/* webpackChunkName: "module" */ './views/pager/Pager.vue')
const ModuleModal = () => import(/* webpackChunkName: "module" */ './views/modal/Modal.vue')
const ModuleTooltip = () => import(/* webpackChunkName: "module" */ './views/tooltip/Tooltip.vue')
const ModuleToolbar = () => import(/* webpackChunkName: "module" */ './views/toolbar/Toolbar.vue')
const ModuleForm = () => import(/* webpackChunkName: "module" */ './views/form/Form.vue')

const TableOtherElement = () => import(/* webpackChunkName: "other" */ './views/table/other/Element.vue')
const TableOtherIview = () => import(/* webpackChunkName: "other" */ './views/table/other/Iview.vue')
const TableOtherAntd = () => import(/* webpackChunkName: "other" */ './views/table/other/Antd.vue')
const TableSortableColumn = () => import(/* webpackChunkName: "other" */ './views/table/other/SortableColumn.vue')
const TableSortableRow = () => import(/* webpackChunkName: "other" */ './views/table/other/SortableRow.vue')
const TableXlsx = () => import(/* webpackChunkName: "other" */ './views/table/other/Xlsx.vue')

const TablePluginElementConfig = () => import(/* webpackChunkName: "plugin" */ './views/table/plugin/ElementConfig.vue')
const TablePluginElementFilter = () => import(/* webpackChunkName: "plugin" */ './views/table/plugin/ElementFilter.vue')
const TablePluginElementPage = () => import(/* webpackChunkName: "plugin" */ './views/table/plugin/ElementPage.vue')
const TablePluginIviewConfig = () => import(/* webpackChunkName: "plugin" */ './views/table/plugin/IviewConfig.vue')
const TablePluginIviewFilter = () => import(/* webpackChunkName: "plugin" */ './views/table/plugin/IviewFilter.vue')
const TablePluginIviewPage = () => import(/* webpackChunkName: "plugin" */ './views/table/plugin/IviewPage.vue')
const TablePluginAntdConfig = () => import(/* webpackChunkName: "plugin" */ './views/table/plugin/AntdConfig.vue')
const TablePluginAntdFilter = () => import(/* webpackChunkName: "plugin" */ './views/table/plugin/AntdFilter.vue')
const TablePluginAntdPage = () => import(/* webpackChunkName: "plugin" */ './views/table/plugin/AntdPage.vue')
const TablePluginShortcutKey = () => import(/* webpackChunkName: "excel" */ './views/table/plugin/ShortcutKey.vue')
const TablePluginCharts = () => import(/* webpackChunkName: "excel" */ './views/table/plugin/Charts.vue')
const TablePluginExportXLSX = () => import(/* webpackChunkName: "excel" */ './views/table/plugin/ExportXLSX.vue')
const TablePluginExportPDF = () => import(/* webpackChunkName: "excel" */ './views/table/plugin/ExportPDF.vue')
const TablePluginRenderer = () => import(/* webpackChunkName: "excel" */ './views/table/plugin/Renderer.vue')
const TablePluginMenus = () => import(/* webpackChunkName: "excel" */ './views/table/plugin/Menus.vue')
const TablePluginExcel = () => import(/* webpackChunkName: "excel" */ './views/table/plugin/Excel.vue')

const VXEAPI = () => import(/* webpackChunkName: "api" */ './views/api/API.vue')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
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
    {
      path: '/table/advanced/expandIcon',
      name: 'TableExpandIcon',
      component: TableExpandIcon
    },
    {
      path: '/table/advanced/expandLazy',
      name: 'TableExpandLazy',
      component: TableExpandLazy
    },
    {
      path: '/table/advanced/expandAccordion',
      name: 'TableExpandAccordion',
      component: TableExpandAccordion
    },
    {
      path: '/table/advanced/search',
      name: 'TableSearch',
      component: TableSearch
    },
    {
      path: '/table/advanced/toolbar',
      name: 'Toolbar',
      component: Toolbar
    },
    {
      path: '/table/advanced/custom',
      name: 'TableCustom',
      component: TableCustom
    },
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
    {
      path: '/table/advanced/form',
      name: 'TableForm',
      component: TableForm
    },
    {
      path: '/table/advanced/page',
      name: 'TablePage',
      component: TablePage
    },
    {
      path: '/table/advanced/pageIcon',
      name: 'TablePageIcon',
      component: TablePageIcon
    },
    {
      path: '/table/advanced/highlight',
      name: 'TableHighlight',
      component: TableHighlight
    },
    {
      path: '/table/advanced/rangeSelect',
      name: 'TableRangeSelect',
      component: TableRangeSelect
    },
    {
      path: '/table/advanced/tabs',
      name: 'TableTabs',
      component: TableTabs
    },
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
    {
      path: '/table/tree/groupSummary',
      name: 'TableTreeGroupSummary',
      component: TableTreeGroupSummary
    },
    {
      path: '/table/tree/groupSummaryCount',
      name: 'TableTreeGroupSummaryCount',
      component: TableTreeGroupSummaryCount
    },
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
    {
      path: '/table/tree/insert',
      name: 'TableTreeInsert',
      component: TableTreeInsert
    },
    {
      path: '/table/tree/menu',
      name: 'TableTreeMenu',
      component: TableTreeMenu
    },
    {
      path: '/table/tree/span',
      name: 'TableTreeSpan',
      component: TableTreeSpan
    },
    {
      path: '/table/tree/highlight',
      name: 'TableTreeHighlight',
      component: TableTreeHighlight
    },
    {
      path: '/table/tree/keyboard',
      name: 'TableTreeKeyboard',
      component: TableTreeKeyboard
    },
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
    {
      path: '/table/tree/editCellValid',
      name: 'TableTreeEditCellValid',
      component: TableTreeEditCellValid
    },
    {
      path: '/table/tree/editRowValid',
      name: 'TableTreeEditRowValid',
      component: TableTreeEditRowValid
    },
    {
      path: '/table/tree/editForceCellValid',
      name: 'TableTreeEditForceCellValid',
      component: TableTreeEditForceCellValid
    },
    {
      path: '/table/tree/editForceRowValid',
      name: 'TableTreeEditForceRowValid',
      component: TableTreeEditForceRowValid
    },
    {
      path: '/table/tree/template',
      name: 'TableTreeTemplate',
      component: TableTreeTemplate
    },
    {
      path: '/table/virtualTree/basic',
      name: 'TableVirtualTreeBasic',
      component: TableVirtualTreeBasic
    },
    {
      path: '/table/virtualTree/normal',
      name: 'TableVirtualTreeNormal',
      component: TableVirtualTreeNormal
    },
    {
      path: '/table/virtualTree/radio',
      name: 'TableVirtualTreeRadio',
      component: TableVirtualTreeRadio
    },
    {
      path: '/table/virtualTree/checkbox',
      name: 'TableVirtualTreeCheckbox',
      component: TableVirtualTreeCheckbox
    },
    {
      path: '/table/virtualTree/icon',
      name: 'TableVirtualTreeIcon',
      component: TableVirtualTreeIcon
    },
    {
      path: '/table/virtualTree/fixed',
      name: 'TableVirtualTreeFixed',
      component: TableVirtualTreeFixed
    },
    {
      path: '/table/virtualTree/maxHeight',
      name: 'TableVirtualTreeMaxHeight',
      component: TableVirtualTreeMaxHeight
    },
    {
      path: '/table/virtualTree/edit',
      name: 'TableVirtualTreeEdit',
      component: TableVirtualTreeEdit
    },
    {
      path: '/table/virtualTree/insert',
      name: 'TableVirtualTreeInsert',
      component: TableVirtualTreeInsert
    },
    {
      path: '/table/virtualTree/remove',
      name: 'TableVirtualTreeRemove',
      component: TableVirtualTreeRemove
    },
    {
      path: '/table/virtualTree/menu',
      name: 'TableVirtualTreeMenu',
      component: TableVirtualTreeMenu
    },
    {
      path: '/table/virtualTree/template',
      name: 'TableVirtualTreeTemplate',
      component: TableVirtualTreeTemplate
    },
    {
      path: '/table/grid/basic',
      name: 'GridBasic',
      component: GridBasic
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
    {
      path: '/table/grid/configProxy',
      name: 'GridConfigProxy',
      component: GridConfigProxy
    },
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
    {
      path: '/table/grid/dynamic',
      name: 'GridDynamic',
      component: GridDynamic
    },
    {
      path: '/table/grid/menu',
      name: 'GridMenu',
      component: GridMenu
    },
    {
      path: '/table/grid/span',
      name: 'GridSpan',
      component: GridSpan
    },
    {
      path: '/table/grid/upload',
      name: 'GridUpload',
      component: GridUpload
    },
    {
      path: '/table/grid/tree',
      name: 'GridTree',
      component: GridTree
    },
    {
      path: '/table/grid/treeLazy',
      name: 'GridTreeLazy',
      component: GridTreeLazy
    },
    {
      path: '/table/grid/treeLazyEdit',
      name: 'GridTreeLazyEdit',
      component: GridTreeLazyEdit
    },
    {
      path: '/table/grid/treeEdit',
      name: 'GridTreeEdit',
      component: GridTreeEdit
    },
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
    {
      path: '/table/scroll/highlight',
      name: 'TableScrollHighlight',
      component: TableScrollHighlight
    },
    {
      path: '/table/scroll/keyboard',
      name: 'TableScrollKeyboard',
      component: TableScrollKeyboard
    },
    {
      path: '/table/scroll/maxHeight',
      name: 'TableScrollMaxHeight',
      component: TableScrollMaxHeight
    },
    {
      path: '/table/scroll/edit',
      name: 'TableScrollEdit',
      component: TableScrollEdit
    },
    {
      path: '/table/scroll/tree',
      name: 'TableScrollTree',
      component: TableScrollTree
    },
    {
      path: '/table/scroll/cellValid',
      name: 'TableScrollCellValid',
      component: TableScrollCellValid
    },
    {
      path: '/table/scroll/rowValid',
      name: 'TableScrollRowValid',
      component: TableScrollRowValid
    },
    {
      path: '/table/scroll/forceCellValid',
      name: 'TableScrollForceCellValid',
      component: TableScrollForceCellValid
    },
    {
      path: '/table/scroll/forceRowValid',
      name: 'TableScrollForceRowValid',
      component: TableScrollForceRowValid
    },
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
      path: '/table/scroll/template',
      name: 'TableScrollTemplate',
      component: TableScrollTemplate
    },
    {
      path: '/table/scroll/tabs',
      name: 'TableScrollTabs',
      component: TableScrollTabs
    },
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
    {
      path: '/table/edit/cellDisable',
      name: 'TableEditCellDisable',
      component: TableEditCellDisable
    },
    {
      path: '/table/edit/rowDisable',
      name: 'TableEditRowDisable',
      component: TableEditRowDisable
    },
    {
      path: '/table/edit/highlightCell',
      name: 'TableEditHighlightCell',
      component: TableEditHighlightCell
    },
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
    {
      path: '/table/edit/forceCellValid',
      name: 'TableEditForceCellValid',
      component: TableEditForceCellValid
    },
    {
      path: '/table/edit/forceRowValid',
      name: 'TableEditForceRowValid',
      component: TableEditForceRowValid
    },
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
    {
      path: '/table/edit/full',
      name: 'TableEditFull',
      component: TableEditFull
    },
    {
      path: '/table/bad/edit',
      name: 'TableBadEdit',
      component: TableBadEdit
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
      path: '/table/other/element',
      name: 'TableOtherElement',
      component: TableOtherElement
    },
    {
      path: '/table/other/iview',
      name: 'TableOtherIview',
      component: TableOtherIview
    },
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
    {
      path: '/table/plugin/iviewConfig',
      name: 'TablePluginIviewConfig',
      component: TablePluginIviewConfig
    },
    {
      path: '/table/plugin/iviewFilter',
      name: 'TablePluginIviewFilter',
      component: TablePluginIviewFilter
    },
    {
      path: '/table/plugin/iviewPage',
      name: 'TablePluginIviewPage',
      component: TablePluginIviewPage
    },
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
    {
      path: '/table/plugin/shortcutKey',
      name: 'TablePluginShortcutKey',
      component: TablePluginShortcutKey
    },
    {
      path: '/table/plugin/charts',
      name: 'TablePluginCharts',
      component: TablePluginCharts
    },
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
    {
      path: '/table/plugin/excel',
      name: 'TablePluginExcel',
      component: TablePluginExcel
    },
    {
      path: '/:name/api',
      name: 'VXEAPI',
      component: VXEAPI
    }
  ]
})

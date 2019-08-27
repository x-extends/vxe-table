import Vue from 'vue'
import Router from 'vue-router'

const StartInstall = () => import(/* webpackChunkName: "start" */ './views/table/start/Install.vue')
const StartUse = () => import(/* webpackChunkName: "start" */ './views/table/start/Use.vue')
const StartGlobal = () => import(/* webpackChunkName: "start" */ './views/table/start/Global.vue')
const StartTheme = () => import(/* webpackChunkName: "start" */ './views/table/start/Theme.vue')
const StartI18n = () => import(/* webpackChunkName: "start" */ './views/table/start/I18n.vue')

const RendererAPI = () => import(/* webpackChunkName: "start" */ './views/table/renderer/API.vue')
const RendererFilter = () => import(/* webpackChunkName: "start" */ './views/table/renderer/Filter.vue')
const RendererDefault = () => import(/* webpackChunkName: "start" */ './views/table/renderer/Default.vue')
const RendererEdit = () => import(/* webpackChunkName: "start" */ './views/table/renderer/Edit.vue')

const MenusAPI = () => import(/* webpackChunkName: "start" */ './views/table/menus/API.vue')
const InterceptorAPI = () => import(/* webpackChunkName: "start" */ './views/table/interceptor/API.vue')

const TableBasic = () => import(/* webpackChunkName: "base" */ './views/table/base/Basic.vue')
const TableSize = () => import(/* webpackChunkName: "base" */ './views/table/base/Size.vue')
const TableOverflow = () => import(/* webpackChunkName: "base" */ './views/table/base/Overflow.vue')
const TableStripe = () => import(/* webpackChunkName: "base" */ './views/table/base/Stripe.vue')
const TableBorder = () => import(/* webpackChunkName: "base" */ './views/table/base/Border.vue')
const TableStyle = () => import(/* webpackChunkName: "base" */ './views/table/base/Style.vue')
const TableHeader = () => import(/* webpackChunkName: "base" */ './views/table/base/Header.vue')
const TableHeaderHighlight = () => import(/* webpackChunkName: "base" */ './views/table/base/HeaderHighlight.vue')
const TableResizable = () => import(/* webpackChunkName: "base" */ './views/table/base/Resizable.vue')
const TableMaxHeight = () => import(/* webpackChunkName: "base" */ './views/table/base/MaxHeight.vue')
const TableHeight = () => import(/* webpackChunkName: "base" */ './views/table/base/Height.vue')
const TableAutoHeight = () => import(/* webpackChunkName: "base" */ './views/table/base/AutoHeight.vue')
const TableFixed = () => import(/* webpackChunkName: "base" */ './views/table/base/Fixed.vue')
const TableFixedFull = () => import(/* webpackChunkName: "base" */ './views/table/base/FixedFull.vue')
const TableGroup = () => import(/* webpackChunkName: "base" */ './views/table/base/Group.vue')
const TableIndex = () => import(/* webpackChunkName: "base" */ './views/table/base/Index.vue')
const TableCurrent = () => import(/* webpackChunkName: "base" */ './views/table/base/Current.vue')
const TableRadio = () => import(/* webpackChunkName: "base" */ './views/table/base/Radio.vue')
const TableSelection = () => import(/* webpackChunkName: "base" */ './views/table/base/Selection.vue')
const TableSort = () => import(/* webpackChunkName: "base" */ './views/table/base/Sort.vue')
const TableFilter = () => import(/* webpackChunkName: "base" */ './views/table/base/Filter.vue')
const TableEmpty = () => import(/* webpackChunkName: "base" */ './views/table/base/Empty.vue')
const TableLoading = () => import(/* webpackChunkName: "base" */ './views/table/base/Loading.vue')
const TableFormat = () => import(/* webpackChunkName: "base" */ './views/table/base/Format.vue')

const TableEvent = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Event.vue')
const TableTemplate = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Template.vue')
const TableCustomSort = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/CustomSort.vue')
const TableManualFilter = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/ManualFilter.vue')
const TableSpan = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Span.vue')
const TableFooter = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Footer.vue')
const TableExport = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Export.vue')
const TableMenu = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Menu.vue')
const TableMenuPrivilege = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/MenuPrivilege.vue')
const TableExpand = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Expand.vue')
const TableSearch = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Search.vue')
const Toolbar = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Toolbar.vue')
const TableCustom = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Custom.vue')
const TableCustomStorage = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/CustomStorage.vue')
const TableCustomlWidthStorage = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/CustomlWidthStorage.vue')
const TablePage = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Page.vue')
const TableKeyboard = () => import(/* webpackChunkName: "advanced" */ './views/table/advanced/Keyboard.vue')

const GridBasic = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Basic.vue')
const GridReverse = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Reverse.vue')
const GridTemplate = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Template.vue')
const GridPage = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Page.vue')
const GridFullQuery = () => import(/* webpackChunkName: "grid" */ './views/table/grid/FullQuery.vue')
const GridProxy = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Proxy.vue')
const GridPageProxy = () => import(/* webpackChunkName: "grid" */ './views/table/grid/PageProxy.vue')
const GridEdit = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Edit.vue')
const GridToolbar = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Toolbar.vue')
const GridCustomToolbar = () => import(/* webpackChunkName: "grid" */ './views/table/grid/CustomToolbar.vue')
const GridDynamic = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Dynamic.vue')
const GridMenu = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Menu.vue')
const GridSpan = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Span.vue')
const GridTree = () => import(/* webpackChunkName: "grid" */ './views/table/grid/Tree.vue')
const GridTreeEdit = () => import(/* webpackChunkName: "grid" */ './views/table/grid/TreeEdit.vue')
const GridFullEdit = () => import(/* webpackChunkName: "grid" */ './views/table/grid/FullEdit.vue')

const TableTreeBasic = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Basic.vue')
const TableTreeSelection = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Selection.vue')
const TableTreeRadio = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Radio.vue')
const TableTreeExpand = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Expand.vue')
const TableTreeToolbar = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Toolbar.vue')
const TableTreeInsert = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Insert.vue')
const TableTreeMenu = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Menu.vue')
const TableTreeSpan = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Span.vue')
const TableTreeKeyboard = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Keyboard.vue')
const TableTreeLazy = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Lazy.vue')
const TableTreeEdit = () => import(/* webpackChunkName: "tree" */ './views/table/tree/Edit.vue')

const TableScroll = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/Scroll.vue')
const TableScrollRows = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ScrollRows.vue')
const TableScrollFullRows = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ScrollFullRows.vue')
const TableScrollCols = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ScrollCols.vue')
const TableScrollFullCols = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ScrollFullCols.vue')
const TableScrollKeyboard = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/Keyboard.vue')
const TableScrollEdit = () => import(/* webpackChunkName: "scroll" */ './views/table/scroll/ScrollEdit.vue')

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
const TableEditKeyboard = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Keyboard.vue')
const TableEditCellValid = () => import(/* webpackChunkName: "edit" */ './views/table/edit/CellValid.vue')
const TableEditRowValid = () => import(/* webpackChunkName: "edit" */ './views/table/edit/RowValid.vue')
const TableEditForceCellValid = () => import(/* webpackChunkName: "edit" */ './views/table/edit/ForceCellValid.vue')
const TableEditForceRowValid = () => import(/* webpackChunkName: "edit" */ './views/table/edit/ForceRowValid.vue')
const TableEditFooter = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Footer.vue')
const TableEditMenu = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Menu.vue')
const TableEditSpan = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Span.vue')
const TableEditTemplate = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Template.vue')
const TableEditFull = () => import(/* webpackChunkName: "edit" */ './views/table/edit/Full.vue')

const TableExcelCell = () => import(/* webpackChunkName: "excel" */ './views/table/excel/Cell.vue')

const ModuleIcon = () => import(/* webpackChunkName: "module" */ './views/icon/Icon.vue')
const ModuleButton = () => import(/* webpackChunkName: "module" */ './views/button/Button.vue')
const ModuleRadio = () => import(/* webpackChunkName: "module" */ './views/radio/Radio.vue')
const ModuleCheckbox = () => import(/* webpackChunkName: "module" */ './views/checkbox/Checkbox.vue')
const ModuleInput = () => import(/* webpackChunkName: "module" */ './views/input/Input.vue')
const ModulePager = () => import(/* webpackChunkName: "module" */ './views/pager/Pager.vue')
const ModuleModal = () => import(/* webpackChunkName: "module" */ './views/modal/Modal.vue')
const ModuleTooltip = () => import(/* webpackChunkName: "module" */ './views/tooltip/Tooltip.vue')
const ModuleToolbar = () => import(/* webpackChunkName: "module" */ './views/toolbar/Toolbar.vue')

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
const TablePluginCharts = () => import(/* webpackChunkName: "excel" */ './views/table/plugin/Charts.vue')
const TablePluginRenderer = () => import(/* webpackChunkName: "excel" */ './views/table/plugin/Renderer.vue')
const TablePluginMenus = () => import(/* webpackChunkName: "excel" */ './views/table/plugin/Menus.vue')

const TableOptimizeScroller = () => import(/* webpackChunkName: "optimize" */ './views/table/optimize/Scroller.vue')
const TableOptimizeEdit = () => import(/* webpackChunkName: "optimize" */ './views/table/optimize/Edit.vue')

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
      path: '/table/base/index',
      name: 'TableIndex',
      component: TableIndex
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
      path: '/table/advanced/span',
      name: 'TableSpan',
      component: TableSpan
    },
    {
      path: '/table/advanced/footer',
      name: 'TableFooter',
      component: TableFooter
    },
    {
      path: '/table/advanced/export',
      name: 'TableExport',
      component: TableExport
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
      path: '/table/advanced/page',
      name: 'TablePage',
      component: TablePage
    },
    {
      path: '/table/advanced/keyboard',
      name: 'TableKeyboard',
      component: TableKeyboard
    },
    {
      path: '/table/tree/basic',
      name: 'TableTreeBasic',
      component: TableTreeBasic
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
      path: '/table/tree/expand',
      name: 'TableTreeExpand',
      component: TableTreeExpand
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
      path: '/table/tree/edit',
      name: 'TableTreeEdit',
      component: TableTreeEdit
    },
    {
      path: '/table/grid/basic',
      name: 'GridBasic',
      component: GridBasic
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
      path: '/table/grid/edit',
      name: 'GridEdit',
      component: GridEdit
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
      path: '/table/grid/tree',
      name: 'GridTree',
      component: GridTree
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
      path: '/table/scroll/keyboard',
      name: 'TableScrollKeyboard',
      component: TableScrollKeyboard
    },
    {
      path: '/table/scroll/edit',
      name: 'TableScrollEdit',
      component: TableScrollEdit
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
      path: '/table/edit/keyboard',
      name: 'TableEditKeyboard',
      component: TableEditKeyboard
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
      path: '/table/excel/cell',
      name: 'TableExcelCell',
      component: TableExcelCell
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
      path: '/table/plugin/charts',
      name: 'TablePluginCharts',
      component: TablePluginCharts
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
      path: '/table/optimize/scroller',
      name: 'TableOptimizeScroller',
      component: TableOptimizeScroller
    },
    {
      path: '/table/optimize/edit',
      name: 'TableOptimizeEdit',
      component: TableOptimizeEdit
    },
    {
      path: '/:name/api',
      name: 'VXEAPI',
      component: VXEAPI
    }
  ]
})
